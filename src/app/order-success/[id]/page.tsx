import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle, MapPin, Truck, Calendar, ShoppingBag, ArrowLeft } from "lucide-react";
import { getOrderById } from "@/lib/woocommerce";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  return (
    <div className="bg-gray-50 flex-1 py-10 sm:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm text-center">
          {/* Success Animated Badge */}
          <div className="w-20 h-20 bg-emerald-100 text-brand-green rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black mb-3">
            Order Status: Processing
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 mb-2">
            Thank You! Your Order has been Placed
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6">
            Thank you for ordering with Sader Vubon. Our representative will contact you shortly by phone to confirm your order details and delivery.
          </p>

          {/* Order ID Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-800 text-sm sm:text-base font-extrabold mb-8">
            <span>Your Order ID:</span>
            <span className="text-brand-green font-black text-lg">#{id}</span>
          </div>

          {/* Order Details Container */}
          {order ? (
            <div className="text-left space-y-6 border-t border-gray-200 pt-8">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-500">Payment Method</p>
                    <p className="text-sm font-black text-gray-900">
                      {order.payment_method_title || "Cash on Delivery"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-500">Order Date</p>
                    <p className="text-sm font-black text-gray-900">
                      {new Date(order.date_created).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-500">Customer & Delivery Address</p>
                    <p className="text-sm font-black text-gray-900">
                      {order.billing.first_name} ({order.billing.phone})
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {order.billing.address_1}
                      {order.billing.city ? `, ${order.billing.city}` : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Summary Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-gray-100/70 px-4 py-3 font-bold text-xs text-gray-700">
                  Ordered Items
                </div>
                <div className="divide-y divide-gray-100">
                  {order.line_items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-black text-gray-900 shrink-0">৳{item.total}</p>
                    </div>
                  ))}

                  {/* Shipping Fee */}
                  {order.shipping_lines && order.shipping_lines.length > 0 && (
                    <div className="p-4 flex items-center justify-between text-xs sm:text-sm text-gray-600 bg-gray-50/50">
                      <span>{order.shipping_lines[0].method_title || "Shipping"}</span>
                      <span className="font-bold text-gray-900">
                        {Number(order.shipping_lines[0].total) === 0 ? "Free" : `৳${order.shipping_lines[0].total}`}
                      </span>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="p-4 flex items-center justify-between text-base font-black text-gray-950 bg-gray-50">
                    <span>Total Amount</span>
                    <span className="text-xl text-brand-green">৳{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-2xl text-center text-sm text-gray-600">
              Your order has been submitted successfully. Confirmation details will be sent to your phone.
            </div>
          )}

          {/* Hotline & WhatsApp Support Card */}
          <div className="mt-8 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <h4 className="text-sm font-black text-gray-900">Need Assistance? Contact Us</h4>
              <p className="text-xs text-gray-600 mt-0.5">
                Our support team is available everyday from 9:00 AM to 10:00 PM.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-50 transition shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{siteConfig.contact.hotline}</span>
              </a>

              <a
                href={siteConfig.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-green text-white text-xs font-bold hover:bg-brand-green-hover transition shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Action Button: Back to Shopping */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-black px-8 py-3.5 rounded-xl shadow-xs transition active:scale-95 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
