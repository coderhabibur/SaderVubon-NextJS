import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/woocommerce";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");
    const phone = searchParams.get("phone");

    if (!orderId || !orderId.trim()) {
      return NextResponse.json(
        { success: false, error: "অনুগ্রহ করে আপনার অর্ডার আইডি লিখুন।" },
        { status: 400 }
      );
    }

    const cleanId = orderId.replace(/[^\d]/g, "");
    const order = await getOrderById(cleanId);

    if (!order) {
      return NextResponse.json(
        { success: false, error: `#${cleanId} নম্বরের কোনো অর্ডার খুঁজে পাওয়া যায়নি। আইডিটি সঠিক কিনা যাচাই করুন।` },
        { status: 404 }
      );
    }

    // If phone number was also provided, verify phone matching
    if (phone && phone.trim()) {
      const cleanPhone = phone.replace(/[^\d]/g, "");
      const orderPhone = (order.billing?.phone || "").replace(/[^\d]/g, "");
      if (cleanPhone.length >= 10 && !orderPhone.endsWith(cleanPhone.slice(-10))) {
        return NextResponse.json(
          { success: false, error: "প্রদত্ত মোবাইল নম্বরের সাথে এই অর্ডারের তথ্য মিলছে না।" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        date_created: order.date_created,
        total: order.total,
        currency: order.currency,
        payment_method_title: order.payment_method_title,
        customer_name: order.billing.first_name,
        customer_phone: order.billing.phone,
        address: order.billing.address_1,
        city: order.billing.city,
        items: order.line_items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          total: i.total,
        })),
        shipping_title: order.shipping_lines?.[0]?.method_title || "ডেলিভারি চার্জ",
        shipping_total: order.shipping_lines?.[0]?.total || "0",
      },
    });
  } catch (error: any) {
    console.error("Order tracking error:", error);
    return NextResponse.json(
      { success: false, error: "অর্ডার ট্র্যাকিং তথ্য লোড করতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
