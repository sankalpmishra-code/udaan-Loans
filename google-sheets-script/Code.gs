/**
 * ============================================================================
 * UDAAN LOANS — AUTOMATED GOOGLE SHEETS LEAD CAPTURE SCRIPT
 * ============================================================================
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Click "Extensions" > "Apps Script"
 * 3. Delete any default code and paste this ENTIRE file into "Code.gs"
 * 4. (Optional) Set NOTIFY_EMAIL below to your email to get instant alerts
 * 5. Click "Deploy" > "New deployment"
 * 6. Under "Select type" (gear icon), select "Web app"
 * 7. Set:
 *    - Description: "Udaan Loans Lead Ingestion Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (crucial for web forms to post)
 * 8. Click "Deploy", review permissions, and COPY the Web App URL.
 * 9. Paste the Web App URL into your .env.local file as:
 *    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 * ============================================================================
 */

// CONFIGURATION: Set to true if you want an email alert for every new lead
const SEND_EMAIL_ALERTS = false;
const NOTIFY_EMAIL = "Anshulverma338@gmail.com"; // Your alert email address

function doPost(e) {
  try {
    const rawContent = e.postData.contents;
    let data;
    try {
      data = JSON.parse(rawContent);
    } catch (parseErr) {
      data = e.parameter;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const leadType = data.leadType || "Student Loan Application";

    if (leadType === "Partner Registration") {
      appendPartnerLead(ss, data);
    } else {
      appendStudentLead(ss, data);
    }

    // Optional email notification
    if (SEND_EMAIL_ALERTS && NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: `🔔 New Lead: ${data.name || data.agency || "Applicant"} (${data.country || data.city || "Overseas"})`,
          body: `New lead received on Udaan Loans:\n\nType: ${leadType}\nName: ${data.name || data.contactPerson}\nPhone: ${data.phone}\nEmail: ${data.email}\nDetails: ${data.course || data.monthlyStudents || ""}\nSource: ${data.sourceName || data.sourceUrl || "Website"}\nTimestamp: ${data.timestamp || new Date().toISOString()}`
        });
      } catch (mailErr) {
        Logger.log("Email alert failed: " + mailErr.toString());
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Lead recorded in Google Sheet" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check endpoint for testing URL in browser
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", service: "Udaan Loans Google Sheet Webhook", timestamp: new Date() })
  ).setMimeType(ContentService.MimeType.JSON);
}

// TEST FUNCTION: Select "testLead" in the editor dropdown and click "▷ Run" to authorize permissions
function testLead() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        leadType: "Student Loan Application",
        name: "Test Verification Student",
        phone: "9876543210",
        email: "test@udaanloans.com",
        country: "United States",
        course: "MS in Computer Science",
        amount: "4500000",
        loanType: "collateral-free",
        coApplicant: "salaried-parent",
        partnerRef: "Direct (Organic)",
        sourceName: "Homepage Hero Form",
        sourceUrl: "Homepage Hero Form"
      })
    }
  };
  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}

function appendStudentLead(ss, data) {
  const sheetName = "Student Leads";
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = [
      "Timestamp",
      "Full Name",
      "Phone Number",
      "Email Address",
      "Target Country",
      "University / Course",
      "Loan Amount",
      "Loan Preference",
      "Co-Applicant",
      "Partner Referral Code",
      "Source Name",
      "Lead Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#094754").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  } else {
    // Auto-migrate existing sheet header from "Source URL" to "Source Name"
    try {
      const lastCol = Math.max(sheet.getLastColumn(), 1);
      const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      for (let i = 0; i < headerRow.length; i++) {
        if (headerRow[i] === "Source URL") {
          sheet.getRange(1, i + 1).setValue("Source Name");
        }
      }
    } catch (e) {
      Logger.log("Auto-migration notice: " + e.toString());
    }
  }

  const row = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.name || "",
    data.phone ? "'" + data.phone : "",
    data.email || "",
    data.country || "",
    data.course || "",
    data.amount || "",
    data.loanType || "",
    data.coApplicant || "",
    data.partnerRef || "Direct (Organic)",
    data.sourceName || data.sourceUrl || "Website",
    "New Lead"
  ];

  sheet.appendRow(row);
}

function appendPartnerLead(ss, data) {
  const sheetName = "Partner Inquiries";
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = [
      "Timestamp",
      "Agency Legal Name",
      "Contact Person",
      "Phone Number",
      "Email Address",
      "Operating City",
      "Monthly Student Volume",
      "Source Name",
      "Partner Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#D97706").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  } else {
    // Auto-migrate existing sheet header from "Source URL" to "Source Name"
    try {
      const lastCol = Math.max(sheet.getLastColumn(), 1);
      const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      for (let i = 0; i < headerRow.length; i++) {
        if (headerRow[i] === "Source URL") {
          sheet.getRange(1, i + 1).setValue("Source Name");
        }
      }
    } catch (e) {
      Logger.log("Auto-migration notice: " + e.toString());
    }
  }

  const row = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.agency || data.name || "",
    data.contactPerson || "",
    data.phone ? "'" + data.phone : "",
    data.email || "",
    data.city || "",
    data.monthlyStudents || "",
    data.sourceName || data.sourceUrl || "Website",
    "Pending Agreement"
  ];

  sheet.appendRow(row);
}
