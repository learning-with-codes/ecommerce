import { Order } from "@/types/retech";
import {
  generateOrderConfirmationSubject,
  generateOrderConfirmationEmailHtml,
} from "./orderEmailTemplate";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface SendOrderEmailResult {
  success: boolean;
  provider: "resend" | "smtp" | "simulated";
  messageId?: string;
  error?: string;
  recipient: string;
  subject: string;
  html: string;
}

/**
 * Server-Side Order Confirmation Email Dispatcher
 * Dispatches an email using Resend, SMTP (Nodemailer), or Simulated Engine.
 * Never throws fatal exceptions to ensure order creation is preserved even if email fails.
 */
export async function sendOrderConfirmationEmail(order: Order): Promise<SendOrderEmailResult> {
  const recipient = order.customerEmail;
  const subject = generateOrderConfirmationSubject(order);
  const html = generateOrderConfirmationEmailHtml(order);

  // 1. Check for Resend API Key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && resendApiKey.trim() !== "") {
    try {
      const resend = new Resend(resendApiKey.trim());
      const fromEmail = process.env.EMAIL_FROM || "ReTech <orders@retech.in>";
      
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: recipient,
        subject,
        html,
      });

      if (error) {
        console.error("[EmailService:Resend Error]", error);
        return {
          success: false,
          provider: "resend",
          error: error.message || "Resend dispatch failed",
          recipient,
          subject,
          html,
        };
      }

      console.log(`[EmailService:Resend Success] Message ID: ${data?.id} to ${recipient}`);
      return {
        success: true,
        provider: "resend",
        messageId: data?.id,
        recipient,
        subject,
        html,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unknown Resend error";
      console.error("[EmailService:Resend Exception]", errMsg);
      return {
        success: false,
        provider: "resend",
        error: errMsg,
        recipient,
        subject,
        html,
      };
    }
  }

  // 2. Check for SMTP credentials
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpFrom = process.env.EMAIL_FROM || process.env.SMTP_FROM || `"ReTech Electronics" <orders@retech.in>`;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        subject,
        html,
      });

      console.log(`[EmailService:SMTP Success] Message ID: ${info.messageId} to ${recipient}`);
      return {
        success: true,
        provider: "smtp",
        messageId: info.messageId,
        recipient,
        subject,
        html,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "SMTP dispatch failed";
      console.error("[EmailService:SMTP Exception]", errMsg);
      return {
        success: false,
        provider: "smtp",
        error: errMsg,
        recipient,
        subject,
        html,
      };
    }
  }

  // 3. Fallback: High-Fidelity Transactional Simulation
  // Creates standard RFC-2822 Message ID and returns full rendered payload for verification
  const simulatedMessageId = `<ret-ord-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@retech.in>`;
  console.log(
    `[EmailService:Simulated] Order: ${order.orderNumber || order.id} | Sent To: ${recipient} | MsgId: ${simulatedMessageId}`
  );

  return {
    success: true,
    provider: "simulated",
    messageId: simulatedMessageId,
    recipient,
    subject,
    html,
  };
}
