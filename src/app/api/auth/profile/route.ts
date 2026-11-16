import { NextRequest, NextResponse } from "next/server";
import { formatCustomer } from "@/lib/auth";

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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, phone, address, city } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing customer ID." }, { status: 400 });
    }

    const nameParts = (name || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const updatePayload: any = {
      billing: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || "",
        address_1: address || "",
        city: city || "Dhaka",
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || "",
        address_1: address || "",
        city: city || "Dhaka",
      },
    };

    if (firstName) updatePayload.first_name = firstName;
    if (lastName) updatePayload.last_name = lastName;

    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/customers/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(updatePayload),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ success: false, error: data.message || "Failed to update profile." }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully!",
      user: formatCustomer(data),
    });
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json({ success: false, error: err.message || "Internal server error." }, { status: 500 });
  }
}
