/* eslint-disable @typescript-eslint/no-require-imports */
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  let pageNumber = 1;

  function checkY(spaceNeeded) {
    if (y - spaceNeeded < margin + 40) {
      // Draw footer on current page
      drawFooter(currentPage, pageNumber);
      pageNumber++;
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  }

  function drawFooter(page, num) {
    const footerText = `Page ${num}  |  ReTech E-Commerce: Supabase & Vercel Backend Integration Manual`;
    page.drawText(footerText, {
      x: margin,
      y: 30,
      size: 8,
      font: fontRegular,
      color: rgb(0.5, 0.5, 0.5),
    });
    page.drawLine({
      start: { x: margin, y: 42 },
      end: { x: pageWidth - margin, y: 42 },
      thickness: 0.5,
      color: rgb(0.85, 0.85, 0.85),
    });
  }

  function addCoverHeader() {
    // Header Banner Box
    currentPage.drawRectangle({
      x: margin,
      y: y - 75,
      width: contentWidth,
      height: 85,
      color: rgb(0.98, 0.94, 0.9),
      borderColor: rgb(0.92, 0.45, 0.1),
      borderWidth: 1.5,
    });

    currentPage.drawText("RETECH PLATFORM DOCUMENTATION", {
      x: margin + 18,
      y: y - 16,
      size: 10,
      font: fontBold,
      color: rgb(0.85, 0.35, 0.05),
    });

    currentPage.drawText("Complete Backend & Database Integration Guide", {
      x: margin + 18,
      y: y - 38,
      size: 18,
      font: fontBold,
      color: rgb(0.12, 0.14, 0.18),
    });

    currentPage.drawText("Step-by-step manual for connecting this project to Supabase & deploying on Vercel", {
      x: margin + 18,
      y: y - 56,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.35, 0.38, 0.42),
    });

    y -= 105;
  }

  function addHeading(title) {
    checkY(40);
    y -= 10;
    currentPage.drawRectangle({
      x: margin,
      y: y - 2,
      width: 4,
      height: 18,
      color: rgb(0.9, 0.4, 0.08),
    });
    currentPage.drawText(title, {
      x: margin + 12,
      y: y,
      size: 13,
      font: fontBold,
      color: rgb(0.1, 0.12, 0.16),
    });
    y -= 22;
  }

  function addSubHeading(sub) {
    checkY(25);
    currentPage.drawText(sub, {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: rgb(0.2, 0.25, 0.3),
    });
    y -= 18;
  }

  function addParagraph(text) {
    const words = text.split(" ");
    let line = "";
    const fontSize = 9.5;
    const lineHeight = 14;

    for (const word of words) {
      const testLine = line + (line ? " " : "") + word;
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > contentWidth) {
        checkY(lineHeight);
        currentPage.drawText(line, {
          x: margin,
          y: y,
          size: fontSize,
          font: fontRegular,
          color: rgb(0.2, 0.22, 0.26),
        });
        y -= lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      checkY(lineHeight);
      currentPage.drawText(line, {
        x: margin,
        y: y,
        size: fontSize,
        font: fontRegular,
        color: rgb(0.2, 0.22, 0.26),
      });
      y -= lineHeight + 5;
    }
  }

  function addBullet(bulletText, boldPrefix = "") {
    const fontSize = 9.5;
    const lineHeight = 14;
    const indent = 16;
    checkY(lineHeight);

    currentPage.drawCircle({
      x: margin + 6,
      y: y + 3,
      size: 2,
      color: rgb(0.9, 0.4, 0.08),
    });

    let fullText = (boldPrefix ? boldPrefix + " " : "") + bulletText;
    const words = fullText.split(" ");
    let line = "";

    for (const word of words) {
      const testLine = line + (line ? " " : "") + word;
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > contentWidth - indent) {
        checkY(lineHeight);
        currentPage.drawText(line, {
          x: margin + indent,
          y: y,
          size: fontSize,
          font: fontRegular,
          color: rgb(0.2, 0.22, 0.26),
        });
        y -= lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      checkY(lineHeight);
      currentPage.drawText(line, {
        x: margin + indent,
        y: y,
        size: fontSize,
        font: fontRegular,
        color: rgb(0.2, 0.22, 0.26),
      });
      y -= lineHeight + 3;
    }
  }

  function addCodeBox(codeLines) {
    const lineHeight = 13;
    const boxHeight = codeLines.length * lineHeight + 16;
    checkY(boxHeight + 10);

    currentPage.drawRectangle({
      x: margin,
      y: y - boxHeight,
      width: contentWidth,
      height: boxHeight,
      color: rgb(0.96, 0.97, 0.98),
      borderColor: rgb(0.85, 0.88, 0.92),
      borderWidth: 1,
    });

    let textY = y - 14;
    for (const cl of codeLines) {
      currentPage.drawText(cl, {
        x: margin + 12,
        y: textY,
        size: 8.5,
        font: fontMono,
        color: rgb(0.15, 0.2, 0.28),
      });
      textY -= lineHeight;
    }

    y -= boxHeight + 10;
  }

  // BUILD DOCUMENT CONTENT
  addCoverHeader();

  addHeading("1. Architectural Overview & Stack");
  addParagraph(
    "This e-commerce application is built on modern Next.js 15 (App Router) paired with a Supabase PostgreSQL backend. It delivers a full re-commerce experience: authentication (email/password & Google OAuth), persistent shopping carts, certified device catalog, doorstep valuation scheduling, and express multi-method checkout with order tracking."
  );
  addBullet("Next.js 15 with React 19, TypeScript, and Tailwind CSS", "Frontend Stack:");
  addBullet("Supabase (PostgreSQL with Row Level Security, Auth & JSONB support)", "Database & Auth:");
  addBullet("Next.js App Router API Routes (/api/products, /api/orders, /api/valuations)", "Backend API:");
  addBullet("Vercel Serverless Platform with automated CI/CD and edge proxy", "Hosting & Deployment:");

  addHeading("2. Step 1: Create Your Supabase Project");
  addParagraph(
    "Your friend needs to set up their own database and auth engine on Supabase. Follow these exact steps:"
  );
  addBullet("Go to https://supabase.com and sign up or log in.", "2.1 Account:");
  addBullet("Click 'New Project'. Choose an organization, enter a Project Name (e.g., 'retech-store'), and create a strong Database Password (store this securely).", "2.2 Project Creation:");
  addBullet("Select the cloud region closest to your primary audience (e.g., Singapore 'ap-southeast-1' or Mumbai 'ap-south-1' for low latency).", "2.3 Region:");
  addBullet("Wait approximately 1-2 minutes for Supabase to provision the PostgreSQL instance.", "2.4 Provisioning:");

  addHeading("3. Step 2: Retrieve API Credentials");
  addParagraph(
    "Once the project is ready, navigate to the Project Settings to copy the required connection variables:"
  );
  addBullet("In the Supabase dashboard sidebar, click 'Project Settings' (the gear icon) -> 'API'.", "3.1 Settings Location:");
  addBullet("Copy the 'Project URL' (format: https://<project-ref>.supabase.co).", "3.2 Project URL:");
  addBullet("Copy the 'anon' public key or the modern 'publishable' key (starts with sb_publishable_... or eyJ...).", "3.3 Public Key:");

  addCodeBox([
    "# Required Environment Variables Template",
    "NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-or-publishable-key>",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-anon-or-publishable-key>",
  ]);

  addHeading("4. Step 3: Run Database Schema & Migrations");
  addParagraph(
    "The codebase includes a complete production database schema file located at /supabase/schema.sql. This creates all tables, constraints, foreign keys, RLS security policies, and initial product catalog seed data."
  );
  addBullet("In your Supabase project dashboard, click on 'SQL Editor' in the left menu.", "4.1 Open SQL Editor:");
  addBullet("Click '+ New query' to open a fresh script editor.", "4.2 New Query:");
  addBullet("Copy the entire contents of /supabase/schema.sql and paste it into the editor.", "4.3 Paste Script:");
  addBullet("Click the 'Run' button (or press Ctrl + Enter). All 8 tables and seeds will be instantiated within seconds.", "4.4 Execute:");

  addSubHeading("Tables created by the schema:");
  addBullet("public.profiles: Stores user contact info, phone, and delivery address.", "- profiles:");
  addBullet("public.categories: Smartphones, Laptops, Audio, Tablets, Wearables, Gaming.", "- categories:");
  addBullet("public.products: Hardware specifications, price, tested points, warranty, and stock.", "- products:");
  addBullet("public.orders: Full checkout records, order numbers, shipping address JSON, payment status.", "- orders:");
  addBullet("public.cart_items: Persistent multi-device shopping cart for authenticated users.", "- cart_items:");
  addBullet("public.wishlist_items: Saved products wishlist per user account.", "- wishlist_items:");
  addBullet("public.sell_requests: Doorstep diagnostic device valuation requests and payout records.", "- sell_requests:");
  addBullet("public.reviews: Verified customer ratings and feedback.", "- reviews:");

  addHeading("5. Step 4: Configure Supabase Authentication Providers");
  addParagraph(
    "To allow users to register, sign in, and maintain session tokens:"
  );
  addBullet("Navigate to Authentication -> Providers -> Email. Ensure 'Enable Email provider' is toggled ON.", "5.1 Email Auth:");
  addBullet("(Recommended for prototyping) Toggle OFF 'Confirm email' so users can sign in immediately without waiting for verification emails.", "5.2 Email Confirmations:");
  addBullet("(Optional) To enable Google Sign-In, turn on Google Provider, enter your Google OAuth Client ID and Secret from Google Cloud Console, and register the callback URL shown by Supabase.", "5.3 Google OAuth:");
  addBullet("Navigate to Authentication -> URL Configuration. Set 'Site URL' to your Vercel URL (e.g., https://your-project.vercel.app) and add 'https://your-project.vercel.app/**' and 'http://localhost:3000/**' to Redirect URLs.", "5.4 Redirect URLs:");

  addHeading("6. Step 5: Local Testing with .env.local");
  addParagraph(
    "Before pushing to Vercel, test the application locally on your machine:"
  );
  addBullet("In the project root, create a file named .env.local (this is git-ignored for safety).", "6.1 Create .env.local:");
  addBullet("Add the Supabase URL and Publishable/Anon key copied in Step 2.", "6.2 Add Keys:");
  addBullet("Install all dependencies: npm install", "6.3 Install:");
  addBullet("Run the development server: npm run dev", "6.4 Launch:");
  addBullet("Open http://localhost:3000 in your browser. Click 'Login' on the top navbar, create an account, place a test order, and verify the order appears in Supabase 'orders' table.", "6.5 Verify:");

  addHeading("7. Step 6: Deploying to Vercel (Production)");
  addParagraph(
    "Deploying this Next.js e-commerce app to Vercel is seamless with Git integration:"
  );
  addBullet("Commit your code to Git and push it to a GitHub, GitLab, or Bitbucket repository.", "7.1 Push to Git:");
  addBullet("Log in to https://vercel.com, click 'Add New...' -> 'Project', and select your Git repository.", "7.2 Import Project:");
  addBullet("Under 'Framework Preset', ensure Next.js is selected (Vercel detects this automatically).", "7.3 Preset:");
  addBullet("Expand the 'Environment Variables' section and add the exact same three keys:", "7.4 Environment Variables:");

  addCodeBox([
    "Key: NEXT_PUBLIC_SUPABASE_URL             Value: https://<your-project>.supabase.co",
    "Key: NEXT_PUBLIC_SUPABASE_ANON_KEY        Value: <your-anon-or-publishable-key>",
    "Key: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY Value: <your-anon-or-publishable-key>",
  ]);

  addBullet("Click 'Deploy'. Vercel builds the Next.js pages and API routes in ~60 seconds.", "7.5 Build & Deploy:");
  addBullet("Copy your generated production URL (e.g., https://retech-store.vercel.app).", "7.6 Copy Domain:");
  addBullet("Return to your Supabase Dashboard -> Authentication -> URL Configuration -> Redirect URLs, and add your Vercel URL so authentication redirects work seamlessly.", "7.7 Update Supabase:");

  addHeading("8. Architecture Details & Key Files Reference");
  addParagraph(
    "Here is how the codebase connects the frontend to the database:"
  );
  addBullet("lib/supabase/client.ts: Initializes browser-side Supabase client via @supabase/ssr.", "- Browser Client:");
  addBullet("lib/supabase/server.ts: Initializes server-side authenticated client using Next.js cookies().", "- Server Client:");
  addBullet("lib/supabase/proxy.ts: Manages session refresh while exempting /api routes from redirection.", "- Proxy / Session:");
  addBullet("lib/services/ordersService.ts: Handles order creation in Supabase with automatic local fallback.", "- Orders Service:");
  addBullet("lib/services/valuationsService.ts: Manages doorstep device sell booking submissions.", "- Valuations Service:");
  addBullet("app/api/products/route.ts: Serves filtered, sorted products from Supabase catalog.", "- Products API:");
  addBullet("app/api/orders/route.ts: Securely processes customer checkout submissions and queries user orders.", "- Orders API:");
  addBullet("supabase/schema.sql: Contains full DDL, RLS policies, and product catalog seed rows.", "- Schema Script:");

  addHeading("9. Troubleshooting & FAQ");
  addBullet("Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are added to Vercel Environment Variables, and trigger a Redeploy under Deployments.", "Issue: Products or Auth not working on Vercel:");
  addBullet("In Supabase -> Authentication -> Providers -> Email, disable 'Confirm email' for instant login.", "Issue: Can't sign in after signup:");
  addBullet("Ensure public RLS policies are enabled as defined in schema.sql, or inspect the browser console network tab.", "Issue: Permission denied error from Supabase:");
  addBullet("Ensure the Vercel domain has been added to Supabase Authentication -> URL Configuration -> Redirect URLs.", "Issue: Google login redirects to localhost:");

  // Final footer on last page
  drawFooter(currentPage, pageNumber);

  const pdfBytes = await pdfDoc.save();

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "ReTech_Supabase_Vercel_Setup_Guide.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log("PDF successfully generated at:", outputPath);
}

generatePDF().catch(console.error);
