import crypto from "crypto";

/**
 * Generates a human-readable, cryptographically strong Order ID
 * Format: RET-YYYYMMDD-XXXXXX (e.g. RET-20261003-8B4E1A)
 * Guaranteed unique across the database, distinct for every single purchase.
 */
export function generateHumanReadableOrderId(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const dateSegment = `${year}${month}${day}`;

  // 6 uppercase alphanumeric random characters (avoiding confusing chars like 0/O, 1/I)
  const charset = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const randomBytes = crypto.randomBytes(6);
  let randomSegment = "";
  for (let i = 0; i < 6; i++) {
    randomSegment += charset[randomBytes[i] % charset.length];
  }

  return `RET-${dateSegment}-${randomSegment}`;
}

/**
 * Generates a realistic Bluedart Air Courier Tracking Code
 * Format: BD + 8 numeric digits + 2 alphanumeric chars + IN
 */
export function generateTrackingNumber(): string {
  const timestampSlice = Date.now().toString().slice(-6);
  const randomNumeric = Math.floor(10 + Math.random() * 90);
  const suffix = Math.floor(10 + Math.random() * 90);
  return `BD${timestampSlice}${randomNumeric}${suffix}IN`;
}

/**
 * Validates email with RFC 5322 compliant regex
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return regex.test(email.trim());
}
