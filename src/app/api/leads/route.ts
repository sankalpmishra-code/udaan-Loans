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
    else resolved = "Website Direct";
  }

  // If UTM source exists and is not generic, append UTM info
  if (utmSource && utmSource.trim() && !["direct", "none", "(direct)"].includes(utmSource.toLowerCase())) {
    resolved = `${resolved} (${utmSource.trim()})`;
  }

  return resolved;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
        { status: 400 }
      );
    }

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, error: "At least one contact method (phone or email) is required." },
        { status: 400 }
      );
    }

    const resolvedSourceName = determineSourceName({
      sourceName,
      sourceUrl,
      landingPage,
      leadType,
      utmSource,
    });

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      leadType,
      name: name || contactPerson || agency,
      phone: phone ? String(phone).replace(/\D/g, "") : "",
      email: email.trim(),
      country,
      course,
      amount: amount ? `₹${Number(amount).toLocaleString("en-IN")}` : "",
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
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          redirect: "follow",
        });
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

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully",
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing application." },
      { status: 500 }
    );
  }
}
