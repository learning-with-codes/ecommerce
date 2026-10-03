import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendOrderConfirmationEmail } from "@/lib/email/emailService";
import { Order } from "@/types/retech";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, order: fallbackOrder } = body;

    if (!orderId && !fallbackOrder) {
      return NextResponse.json({ success: false, error: "Missing orderId" }, { status: 400 });
    }

    let orderData = null;
    let supabase = null;

    try {
      supabase = await createClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .or(`order_number.eq.${orderId},id.eq.${orderId}`)
        .maybeSingle();

      if (!error && data) {
        orderData = data;
      }
    } catch {
      // ignore
    }

    if (!orderData && !fallbackOrder) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const order: Order = orderData
      ? {
          id: orderData.id,
          orderNumber: orderData.order_number,
          userId: orderData.user_id,
          customerName: orderData.customer_name,
          customerEmail: orderData.customer_email,
          customerPhone: orderData.customer_phone,
          shippingAddress: orderData.shipping_address,
          items: orderData.items,
          subtotal: Number(orderData.subtotal),
          discountAmount: Number(orderData.discount_amount || 0),
          shippingFee: Number(orderData.shipping_fee || 0),
          totalAmount: Number(orderData.total_amount),
          paymentMethod: orderData.payment_method,
          paymentStatus: orderData.payment_status,
          orderStatus: orderData.order_status,
          trackingNumber: orderData.tracking_number,
          createdAt: orderData.created_at,
        }
      : fallbackOrder;

    const emailResult = await sendOrderConfirmationEmail(order);

    if (emailResult.success) {
      if (supabase) {
        try {
          await supabase
            .from("orders")
            .update({
              email_status: "sent",
              email_sent_at: new Date().toISOString(),
              email_error: null,
            })
            .eq("order_number", order.orderNumber);
        } catch {
          // ignore
        }
      }

      return NextResponse.json({
        success: true,
        message: "Email dispatched successfully",
        orderId: order.orderNumber,
        recipient: order.customerEmail,
      });
    } else {
      if (supabase) {
        try {
          await supabase
            .from("orders")
            .update({
              email_status: "failed",
              email_error: emailResult.error || "Retry failed",
            })
            .eq("order_number", order.orderNumber);
        } catch {
          // ignore
        }
      }

      return NextResponse.json({
        success: false,
        error: emailResult.error || "Email delivery failed on retry",
      }, { status: 502 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Retry email error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
