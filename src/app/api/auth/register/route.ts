import { NextRequest, NextResponse } from "next/server";
import { findCustomer, formatCustomer } from "@/lib/auth";

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://sadervubon.com";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

function getAuthHeader(): Record<string, string> {
  const token = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, password, address, city } = body;

    // 1. Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Please enter your full name." }, { status: 400 });
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, error: "Please enter your mobile phone number." }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[^\d+]/g, "").trim();
    if (cleanPhone.length < 11) {
      return NextResponse.json({ success: false, error: "Please provide a valid 11-digit mobile number." }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Prepare email & username
    const validEmail = email && email.includes("@") ? email.trim().toLowerCase() : `${cleanPhone}@sadervubon.customer`;
    const username = cleanPhone;

    // 2. Check if customer already exists with this email or username
    const existing = await findCustomer(validEmail);
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email or mobile number already exists. Please log in instead." },
        { status: 409 }
      );
    }

    // Split name into first and last
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || name.trim();
    const lastName = nameParts.slice(1).join(" ") || "";

    // 3. Create customer via WooCommerce REST API
    const newCustomerPayload = {
      email: validEmail,
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      billing: {
        first_name: firstName,
        last_name: lastName,
        phone: cleanPhone,
        address_1: address ? address.trim() : "",
        city: city || "Dhaka",
        country: "BD",
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        phone: cleanPhone,
        address_1: address ? address.trim() : "",
        city: city || "Dhaka",
        country: "BD",
      },
    };

    const createRes = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/customers`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(newCustomerPayload),
    });

    const data = await createRes.json();

    if (!createRes.ok) {
      const errorMsg = data.message || "Failed to create account in WooCommerce.";
      return NextResponse.json({ success: false, error: errorMsg }, { status: createRes.status });
    }

    const customerProfile = formatCustomer(data);

    return NextResponse.json({
      success: true,
      message: "Account registered successfully!",
      user: customerProfile,
    });
  } catch (err: any) {
    console.error("Register API error:", err);
    return NextResponse.json({ success: false, error: err.message || "Internal server error." }, { status: 500 });
  }
}
