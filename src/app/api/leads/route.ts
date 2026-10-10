import { NextResponse } from "next/server";

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
      sourceUrl = "",
      additionalNotes = "",
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
      sourceUrl,
      additionalNotes,
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
