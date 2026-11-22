import { NextResponse } from "next/server";

function determineSourceName({
  sourceName,
  sourceUrl,
  landingPage,
  leadType,
  utmSource,
}: {
  sourceName?: string;
  sourceUrl?: string;
  landingPage?: string;
  leadType?: string;
  utmSource?: string;
}): string {
  let resolved = sourceName?.trim() || "";

  // If no explicit sourceName, derive from sourceUrl or landingPage
  if (!resolved && (sourceUrl || landingPage)) {
    const raw = sourceUrl || landingPage || "";
    try {
      const url = raw.startsWith("http") ? new URL(raw) : new URL(raw, "https://www.udaaneduloans.com");
      const path = url.pathname.replace(/\/$/, "");
      if (!path || path === "") {
        resolved = "Homepage Hero Form";
      } else if (path === "/match") {
        resolved = "Loan Matcher";
      } else if (path === "/apply") {
        resolved = "Apply Page Form";
      } else if (path === "/partners") {
        resolved = "Partner Registration";
      } else if (path === "/calculator") {
        resolved = "EMI Calculator";
      } else if (path === "/tax-calculator") {
        resolved = "Tax Calculator";
      } else if (path.startsWith("/destinations/")) {
        const dest = path.split("/")[2] || "";
        resolved = `Destination Guide (${dest.toUpperCase()})`;
      } else if (path.startsWith("/universities/")) {
        const uni = path.split("/")[2] || "";
        resolved = `University Guide (${uni})`;
      } else {
        resolved = path.replace(/^\//, "").replace(/-/g, " ");
      }
    } catch {
      if (!raw.startsWith("http")) {
        resolved = raw;
      }
    }
  }

  // Fallback based on leadType if still unresolved
  if (!resolved) {
    if (leadType === "Partner Registration") resolved = "Partner Registration";
    else if (leadType === "Hero Loan Options Assessment" || leadType === "Hero Quick Eligibility") resolved = "Homepage Hero Form";
    else if (leadType === "Two-Stage Matcher Application") resolved = "Loan Matcher";
    else if (leadType === "WhatsApp Chat Lead" || leadType === "WhatsApp Inquiry") resolved = "WhatsApp Widget";
    else resolved = "Website Direct";
  }

  // If UTM source exists and is not generic, append UTM info
  if (utmSource && utmSource.trim() && !["direct", "none", "(direct)"].includes(utmSource.toLowerCase())) {
    resolved = `${resolved} (${utmSource.trim()})`;
  }

  return resolved;
}

function getCorsHeaders(request: Request): Record<string, string> {
  const url = new URL(request.url);
  const ampSourceOrigin = url.searchParams.get("__amp_source_origin");
  const origin = request.headers.get("origin") || "*";

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
  };

  if (ampSourceOrigin) {
    headers["AMP-Access-Control-Allow-Source-Origin"] = ampSourceOrigin;
    headers["Access-Control-Expose-Headers"] = "AMP-Access-Control-Allow-Source-Origin";
  }

  return headers;
}

export async function OPTIONS(request: Request) {
  const corsHeaders = getCorsHeaders(request);
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: Request) {
  const corsHeaders = getCorsHeaders(request);

  try {
    let body: Record<string, any> = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        body[key] = typeof value === "string" ? value : value.name;
      });
    } else {
      try {
        body = await request.json();
      } catch {
        body = {};
      }
    }

    const {
      leadType = "Student Loan Application",
      name = "",
      phone = "",
      email = "",
      country = "",
      course = "",
      amount = "",
      loanType = "",
      coApplicant = "",
      agency = "",
      contactPerson = "",
      city = "",
      monthlyStudents = "",
      partnerRef = "",
      sourceName = "",
      sourceUrl = "",
      additionalNotes = "",
      utmSource = "",
      utmMedium = "",
      utmCampaign = "",
      utmTerm = "",
      utmContent = "",
      gclid = "",
      landingPage = "",
    } = body;

    // Basic validation
    if (!name && !agency && !contactPerson) {
      return NextResponse.json(
        { success: false, error: "Name or Agency Name is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, error: "At least one contact method (phone or email) is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    const resolvedSourceName = determineSourceName({
      sourceName,
      sourceUrl,
      landingPage,
      leadType,
      utmSource,
    });

    // Format amount safely without producing "₹NaN"
    let formattedAmount = "";
    if (amount) {
      const strAmount = String(amount).trim();
      const cleanDigits = strAmount.replace(/\D/g, "");
      if (cleanDigits && !strAmount.toLowerCase().includes("lakh") && !strAmount.toLowerCase().includes("crore")) {
        formattedAmount = `₹${Number(cleanDigits).toLocaleString("en-IN")}`;
      } else {
        formattedAmount = strAmount;
      }
    }

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      leadType,
      name: name || contactPerson || agency,
      phone: phone ? String(phone).replace(/\D/g, "") : "",
      email: email.trim(),
      country,
      course,
      amount: formattedAmount,
      loanType,
      coApplicant,
      agency,
      city,
      monthlyStudents,
      partnerRef,
      sourceName: resolvedSourceName,
      sourceUrl: resolvedSourceName, // Keeps backward compatibility with deployed Google Apps Script webhooks
      additionalNotes,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      gclid,
      landingPage,
    };

    // 1. Direct Google Sheets API via Service Account Private Key (Preferred)
    let sheetUpdated = false;
    try {
      const { appendLeadToGoogleSheet } = await import("@/lib/googleSheets");
      sheetUpdated = await appendLeadToGoogleSheet(payload);
    } catch (sheetErr) {
      console.error("Direct Google Sheets API error:", sheetErr);
    }

    // 2. Webhook fallback (if configured)
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!sheetUpdated && webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          redirect: "follow",
        });
        if (!webhookRes.ok) {
          console.warn("Google Sheet webhook returned status:", webhookRes.status);
        }
      } catch (webhookErr) {
        console.error("Webhook fallback error:", webhookErr);
      }
    }

    // 3. Resend Email Notifications (Instant Lead Alert + Student Confirmation)
    try {
      const { sendLeadAlertEmail, sendStudentConfirmationEmail } = await import("@/lib/email");
      await sendLeadAlertEmail(payload);

      if (email && email.includes("@") && leadType !== "Partner Registration") {
        sendStudentConfirmationEmail(payload).catch((e) =>
          console.warn("Student confirmation email notice:", e)
        );
      }
    } catch (emailErr) {
      console.error("Resend email error:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead recorded successfully",
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing application." },
      { status: 500, headers: corsHeaders }
    );
  }
}
