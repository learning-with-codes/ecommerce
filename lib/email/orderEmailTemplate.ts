import { Order } from "@/types/retech";

export function generateOrderConfirmationSubject(order: Order): string {
  const orderId = order.orderNumber || order.id;
  return `Order Confirmed - ${orderId} | ReTech`;
}

export function generateOrderConfirmationEmailHtml(order: Order): string {
  const orderId = order.orderNumber || order.id;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://retech.in";
  const viewOrderUrl = `${siteUrl}/#account-orders`;

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="width: 72px; vertical-align: top;">
                <img src="${item.image}" alt="${item.name}" width="64" height="64" style="border-radius: 12px; object-fit: cover; display: block; border: 1px solid #e2e8f0;" />
              </td>
              <td style="padding-left: 14px; vertical-align: top;">
                <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                  ${item.name}
                </p>
                <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">
                  <span style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: 600; color: #334155; margin-right: 6px;">
                    ${item.condition || "Refurbished - Like New"}
                  </span>
                  <span style="color: #059669; font-weight: 600;">
                    ✓ ${item.warranty || "1 Year ReTech Warranty"}
                  </span>
                </div>
                <p style="margin: 0; font-size: 12px; color: #64748b;">
                  Quantity: <strong style="color: #0f172a;">${item.quantity}</strong> × ₹${item.price.toLocaleString("en-IN")}
                </p>
              </td>
              <td style="text-align: right; vertical-align: top; width: 100px;">
                <p style="margin: 0; font-size: 15px; font-weight: 800; color: #0f172a;">
                  ₹${(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join("");

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed - ${orderId} | ReTech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner with ReTech Branding -->
          <tr>
            <td style="background: linear-gradient(135deg, #ea580c 0%, #d97706 100%); padding: 32px 28px; text-align: left;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="margin-bottom: 12px;">
                      <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 6px;">
                        RETECH CERTIFIED STORE
                      </span>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 900; letter-spacing: -0.5px;">
                      Order Confirmed ✓
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #ffedd5; font-size: 15px; line-height: 1.4;">
                      Hi <strong>${order.customerName}</strong>, thank you for your purchase. Your order has been successfully placed.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tracking & Order Metadata Strip -->
          <tr>
            <td style="padding: 20px 28px; background-color: #fff7ed; border-bottom: 1px solid #ffedd5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="vertical-align: top;">
                    <p style="margin: 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #9a3412;">Order ID</p>
                    <p style="margin: 2px 0 0 0; font-size: 14px; font-weight: 800; color: #ea580c; font-family: monospace;">${orderId}</p>
                  </td>
                  <td style="vertical-align: top; text-align: center;">
                    <p style="margin: 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #9a3412;">Bluedart Tracking</p>
                    <p style="margin: 2px 0 0 0; font-size: 13px; font-weight: 800; color: #0f172a; font-family: monospace;">${order.trackingNumber}</p>
                  </td>
                  <td style="vertical-align: top; text-align: right;">
                    <p style="margin: 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #9a3412;">Order Date</p>
                    <p style="margin: 2px 0 0 0; font-size: 12px; font-weight: 600; color: #475569;">${formattedDate}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Status Flow Bar -->
          <tr>
            <td style="padding: 24px 28px 16px 28px;">
              <p style="margin: 0 0 16px 0; font-size: 12px; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.5px;">
                Shipment & Diagnostic Status
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
                <tr>
                  <td style="text-align: center; width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #10b981; color: #ffffff; line-height: 24px; font-size: 12px; font-weight: 800; margin: 0 auto 4px auto;">✓</div>
                    <span style="font-size: 10px; font-weight: 700; color: #0f172a; display: block;">Placed</span>
                  </td>
                  <td style="text-align: center; width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #ea580c; color: #ffffff; line-height: 24px; font-size: 12px; font-weight: 800; margin: 0 auto 4px auto;">2</div>
                    <span style="font-size: 10px; font-weight: 700; color: #ea580c; display: block;">45-Pt Tested</span>
                  </td>
                  <td style="text-align: center; width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #cbd5e1; color: #64748b; line-height: 24px; font-size: 12px; font-weight: 800; margin: 0 auto 4px auto;">3</div>
                    <span style="font-size: 10px; font-weight: 600; color: #64748b; display: block;">Shipped</span>
                  </td>
                  <td style="text-align: center; width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #cbd5e1; color: #64748b; line-height: 24px; font-size: 12px; font-weight: 800; margin: 0 auto 4px auto;">4</div>
                    <span style="font-size: 10px; font-weight: 600; color: #64748b; display: block;">Doorstep Trial</span>
                  </td>
                </tr>
              </table>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #059669; font-weight: 700;">
                ⚡ Estimated Delivery: <strong>Tomorrow by 2:00 PM via Express Air Courier</strong>
              </p>
            </td>
          </tr>

          <!-- Items Ordered List -->
          <tr>
            <td style="padding: 12px 28px;">
              <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.5px;">
                Items in This Order (${order.items.length})
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Price & Savings Summary -->
          <tr>
            <td style="padding: 18px 28px; background-color: #fafaf9; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 5px 0; font-size: 13px; color: #64748b;">Subtotal:</td>
                  <td style="padding: 5px 0; font-size: 13px; color: #0f172a; text-align: right; font-weight: 600;">₹${order.subtotal.toLocaleString("en-IN")}</td>
                </tr>
                ${
                  order.discountAmount > 0
                    ? `
                <tr>
                  <td style="padding: 5px 0; font-size: 13px; color: #ea580c; font-weight: 700;">Discount (Festive Promo):</td>
                  <td style="padding: 5px 0; font-size: 13px; color: #ea580c; text-align: right; font-weight: 700;">-₹${order.discountAmount.toLocaleString("en-IN")}</td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 5px 0; font-size: 13px; color: #059669; font-weight: 600;">Shipping:</td>
                  <td style="padding: 5px 0; font-size: 13px; color: #059669; text-align: right; font-weight: 700;">
                    ${order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee.toLocaleString("en-IN")}`}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0 0 0; font-size: 16px; font-weight: 900; color: #0f172a; border-top: 1px dashed #cbd5e1;">TOTAL:</td>
                  <td style="padding: 14px 0 0 0; font-size: 18px; font-weight: 900; color: #ea580c; text-align: right; border-top: 1px dashed #cbd5e1;">₹${order.totalAmount.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 8px; font-size: 11px; color: #64748b;">
                    Payment Status: <strong style="color: ${order.paymentStatus === "paid" ? "#059669" : "#d97706"}; text-transform: uppercase;">${order.paymentStatus.toUpperCase()}</strong> (${order.paymentMethod.toUpperCase()}) • Order Status: <strong style="color: #0f172a; text-transform: uppercase;">${order.orderStatus.toUpperCase()}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Address & Warranty Info -->
          <tr>
            <td style="padding: 24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="vertical-align: top; width: 50%; padding-right: 12px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Shipping Address</p>
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">${order.shippingAddress.fullName}</p>
                    <p style="margin: 2px 0 0 0; font-size: 12px; color: #475569; line-height: 1.4;">
                      ${order.shippingAddress.street},<br>
                      ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br>
                      Phone: ${order.shippingAddress.phone}
                    </p>
                  </td>
                  <td style="vertical-align: top; width: 50%; padding-left: 12px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase;">ReTech Quality Assurance</p>
                    <p style="margin: 0; font-size: 12px; color: #0f172a; line-height: 1.6;">
                      🛡️ <strong>1-Year Replacement Warranty</strong><br>
                      🔄 <strong>7 Days Doorstep Return Policy</strong><br>
                      📋 <strong>45-Point Lab Diagnostic Certificate</strong><br>
                      🔒 <strong>DoD 5220.22-M Data Cleansed</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View Order CTA Button -->
          <tr>
            <td style="padding: 0 28px 28px 28px; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${viewOrderUrl}" style="display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #d97706 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 800; letter-spacing: 0.3px; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);">
                      VIEW ORDER DETAILS →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer & Support Desk -->
          <tr>
            <td style="padding: 24px 28px; background-color: #0f172a; text-align: center; color: #94a3b8;">
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #ffffff;">
                If you have any questions, contact our support team.
              </p>
              <p style="margin: 0 0 16px 0; font-size: 12px; color: #cbd5e1;">
                Toll Free: <strong>1800-419-RETECH</strong> • Email: <a href="mailto:support@retech.in" style="color: #fb923c; text-decoration: none;">support@retech.in</a>
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #94a3b8;">
                Thank you,<br><strong style="color: #ffffff;">ReTech Team</strong>
              </p>
              <p style="margin: 0; font-size: 10px; color: #64748b;">
                © 2026 ReTech Certified Electronics India Pvt. Ltd. All rights reserved. Registered under e-Waste (Management) Rules, Government of India.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
