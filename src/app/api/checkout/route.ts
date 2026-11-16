import { NextResponse } from "next/server";
import { createWooCommerceOrder, CreateOrderPayload } from "@/lib/woocommerce";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, city, deliveryZone, customerNote, items, customerId, customerEmail } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "আপনার সঠিক পূর্ণ নাম লিখুন।" },
        { status: 400 }
      );
    }

    // Clean phone number (allow +8801... or 01...)
    const cleanPhone = phone ? phone.replace(/[^\d+]/g, "") : "";
    const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: "সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)।" },
        { status: 400 }
      );
    }

    if (!address || typeof address !== "string" || address.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "আপনার পূর্ণ ডেলিভারি ঠিকানা লিখুন (রোড, বাসা নং, এলাকা)।" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "আপনার কার্টে কোনো পণ্য নেই।" },
        { status: 400 }
      );
    }

    // 2. Shipping calculation
    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
    const isFreeShipping = subtotal >= 2500;

    let shippingFee = 0;
    let shippingTitle = "ফ্রি ডেলিভারি (২৫০০৳+ অফার)";

    if (!isFreeShipping) {
      if (deliveryZone === "inside_dhaka") {
        shippingFee = 70;
        shippingTitle = "ঢাকার ভেতরে ডেলিভারি চার্জ";
      } else {
        shippingFee = 130;
        shippingTitle = "ঢাকার বাইরে সারা দেশে ডেলিভারি চার্জ";
      }
    }

    // 3. Format line items for WooCommerce
    const line_items = items.map((item) => {
      // Determine productId and variationId
      let prodId = Number(item.productId);
      let varId = item.variationId ? Number(item.variationId) : undefined;

      // Fallback if variation is stored in composite id (e.g. "1234-5678")
      if (!varId && typeof item.id === "string" && item.id.includes("-")) {
        const parts = item.id.split("-");
        prodId = Number(parts[0]);
        varId = Number(parts[1]);
      }

      return {
        product_id: prodId,
        ...(varId && varId > 0 ? { variation_id: varId } : {}),
        quantity: Math.max(1, Number(item.quantity) || 1),
      };
    });

    const determinedCity = city?.trim() || (deliveryZone === "inside_dhaka" ? "Dhaka" : "Outside Dhaka");
    const sanitizedPhone = cleanPhone.startsWith("+88") ? cleanPhone.slice(3) : cleanPhone.startsWith("88") ? cleanPhone.slice(2) : cleanPhone;

    // 4. Construct WooCommerce Order Payload
    const payload: CreateOrderPayload = {
      ...(customerId && Number(customerId) > 0 ? { customer_id: Number(customerId) } : {}),
      payment_method: "cod",
      payment_method_title: "ক্যাশ অন ডেলিভারি (Cash on Delivery)",
      set_paid: false,
      status: "processing",
      billing: {
        first_name: name.trim(),
        phone: sanitizedPhone,
        address_1: address.trim(),
        city: determinedCity,
        country: "BD",
        email: customerEmail && customerEmail.includes("@") ? customerEmail : `customer_${sanitizedPhone}@sadervubon.com`,
      },
      shipping: {
        first_name: name.trim(),
        phone: sanitizedPhone,
        address_1: address.trim(),
        city: determinedCity,
        country: "BD",
      },
      line_items,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: shippingTitle,
          total: shippingFee.toString(),
        },
      ],
      customer_note: customerNote?.trim() || undefined,
    };

    // 5. Submit Order to WooCommerce REST API
    const order = await createWooCommerceOrder(payload);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      total: order.total,
      status: order.status,
    });
  } catch (error: any) {
    console.error("Order creation failed in /api/checkout:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "অর্ডার প্রক্রিয়াকরণে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
      },
      { status: 500 }
    );
  }
}
