import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");
    const phone = searchParams.get("phone");
    const email = searchParams.get("email");

    if (!customerId && !phone && !email) {
      return NextResponse.json({ success: false, error: "Missing customer identifier." }, { status: 400 });
    }

    let url = `${WORDPRESS_URL}/wp-json/wc/v3/orders?per_page=20&orderby=date&order=desc`;

    if (customerId && parseInt(customerId, 10) > 0) {
      url += `&customer=${customerId}`;
    } else if (email) {
      url += `&search=${encodeURIComponent(email)}`;
    } else if (phone) {
      url += `&search=${encodeURIComponent(phone)}`;
    }

    const res = await fetch(url, {
      headers: getAuthHeader(),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Failed to fetch orders." }, { status: res.status });
    }

    const rawOrders = await res.json();

    const orders = Array.isArray(rawOrders)
      ? rawOrders.map((o: any) => ({
          id: o.id,
          status: o.status,
          dateCreated: o.date_created,
          total: o.total,
          paymentMethod: o.payment_method_title || "Cash on Delivery",
          itemCount: Array.isArray(o.line_items)
            ? o.line_items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
            : 0,
          items: Array.isArray(o.line_items)
            ? o.line_items.map((item: any) => ({
                name: item.name,
                quantity: item.quantity,
                total: item.total,
              }))
            : [],
          shippingAddress: `${o.billing?.address_1 || ""} ${o.billing?.city || ""}`.trim(),
        }))
      : [];

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error("Auth Orders API error:", err);
    return NextResponse.json({ success: false, error: err.message || "Internal server error." }, { status: 500 });
  }
}
