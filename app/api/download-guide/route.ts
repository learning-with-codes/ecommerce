import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "public", "ReTech_Supabase_Vercel_Setup_Guide.pdf");

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json({ error: "Guide PDF not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(pdfPath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ReTech_Supabase_Vercel_Setup_Guide.pdf"',
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to download PDF";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
