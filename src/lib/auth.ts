const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://sadervubon.com";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

function getAuthHeader(): Record<string, string> {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    return { "Content-Type": "application/json" };
  }
  const token = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

/**
 * Validates WordPress username/email and password via XML-RPC
 */
export async function verifyWordPressCredentials(
  usernameOrEmail: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const xml = `<?xml version="1.0"?><methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value><string>${escapeXml(
      usernameOrEmail
    )}</string></value></param><param><value><string>${escapeXml(
      password
    )}</string></value></param></params></methodCall>`;

    const res = await fetch(`${WORDPRESS_URL}/xmlrpc.php`, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "Content-Length": Buffer.byteLength(xml).toString(),
      },
      body: xml,
      cache: "no-store",
    });

    const body = await res.text();

    if (body.includes("<fault>")) {
      const match = body.match(/<string>([\s\S]*?)<\/string>/);
      const errorMsg = match ? match[1] : "Incorrect username or password.";
      return { success: false, error: errorMsg };
    }

    if (body.includes("<methodResponse>")) {
      return { success: true };
    }

    return { success: false, error: "Authentication service returned an unexpected response." };
  } catch (err: any) {
    console.error("XML-RPC error:", err);
    return { success: false, error: err.message || "Failed to connect to authentication service." };
  }
}

export interface CustomerProfile {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  dateCreated?: string;
}

/**
 * Searches WooCommerce customers by email, phone, or search string
 */
export async function findCustomer(query: string): Promise<any | null> {
  try {
    const clean = query.trim();
    // 1. Try search by email
    const emailRes = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/customers?email=${encodeURIComponent(clean)}`,
      {
        headers: getAuthHeader(),
        cache: "no-store",
      }
    );
    if (emailRes.ok) {
      const data = await emailRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }
    }

    // 2. Try general search (username or phone)
    const searchRes = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/customers?search=${encodeURIComponent(clean)}&per_page=5`,
      {
        headers: getAuthHeader(),
        cache: "no-store",
      }
    );
    if (searchRes.ok) {
      const data = await searchRes.json();
      if (Array.isArray(data) && data.length > 0) {
        // Find best match by email, username, or billing phone
        const cleanDigits = clean.replace(/[^\d]/g, "");
        const match = data.find((c: any) => {
          if (c.email?.toLowerCase() === clean.toLowerCase()) return true;
          if (c.username?.toLowerCase() === clean.toLowerCase()) return true;
          const phoneDigits = (c.billing?.phone || "").replace(/[^\d]/g, "");
          return cleanDigits && phoneDigits.endsWith(cleanDigits);
        });
        return match || data[0];
      }
    }

    return null;
  } catch (err) {
    console.error("findCustomer error:", err);
    return null;
  }
}

/**
 * Retrieves a customer by their WooCommerce Customer ID
 */
export async function getCustomerById(id: number): Promise<CustomerProfile | null> {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/customers/${id}`, {
      headers: getAuthHeader(),
      cache: "no-store",
    });

    if (!res.ok) return null;
    const c = await res.json();
    return formatCustomer(c);
  } catch (err) {
    console.error("getCustomerById error:", err);
    return null;
  }
}

/**
 * Formats a raw WooCommerce Customer JSON object into clean CustomerProfile
 */
export function formatCustomer(c: any): CustomerProfile {
  const firstName = c.first_name || c.billing?.first_name || "";
  const lastName = c.last_name || c.billing?.last_name || "";
  const name = `${firstName} ${lastName}`.trim() || c.username || c.email?.split("@")[0] || "Customer";

  return {
    id: c.id,
    name,
    firstName,
    lastName,
    email: c.email || "",
    phone: c.billing?.phone || "",
    address: c.billing?.address_1 || "",
    city: c.billing?.city || "Dhaka",
    dateCreated: c.date_created,
  };
}
