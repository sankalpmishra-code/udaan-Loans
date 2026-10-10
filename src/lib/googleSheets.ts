import { google } from "googleapis";

interface LeadData {
  timestamp?: string;
  leadType: string;
  name: string;
  phone: string;
  email: string;
  country?: string;
  course?: string;
  amount?: string;
  loanType?: string;
  coApplicant?: string;
  agency?: string;
  contactPerson?: string;
  city?: string;
  monthlyStudents?: string;
  partnerRef?: string;
  sourceUrl?: string;
  additionalNotes?: string;
}

export async function appendLeadToGoogleSheet(data: LeadData): Promise<boolean> {
  let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  // Support pasting the entire service account JSON string if provided
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const parsed = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      clientEmail = clientEmail || parsed.client_email;
      privateKey = privateKey || parsed.private_key;
    } catch (e) {
      console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:", e);
    }
  }

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.warn("⚠️ Google Service Account credentials missing in environment variables.");
    return false;
  }

  // Format private key (replace escaped \n with actual newlines)
  const formattedKey = privateKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: formattedKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const isPartner = data.leadType === "Partner Registration";
  const sheetTabName = isPartner ? "Partner Inquiries" : "Student Leads";

  // First, verify if the sheet tab exists, if not create it with formatted headers
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const existingSheets = spreadsheet.data.sheets || [];
    const tabExists = existingSheets.some(
      (s) => s.properties?.title?.toLowerCase() === sheetTabName.toLowerCase()
    );

    if (!tabExists) {
      // Add the tab
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTabName,
                },
              },
            },
          ],
        },
      });

      // Add headers
      const headers = isPartner
        ? [
            "Timestamp",
            "Agency Legal Name",
            "Contact Person",
            "Phone Number",
            "Email Address",
            "Operating City",
            "Monthly Student Volume",
            "Source URL",
            "Status",
          ]
        : [
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
            "Source URL",
            "Lead Status",
          ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetTabName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (sheetCheckErr) {
    console.error("Error checking/creating sheet tab:", sheetCheckErr);
  }

  // Format row values
  const timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const rowValues = isPartner
    ? [
        timestamp,
        data.agency || data.name || "",
        data.contactPerson || data.name || "",
        data.phone ? `'${data.phone}` : "",
        data.email || "",
        data.city || "",
        data.monthlyStudents || "",
        data.sourceUrl || "",
        "New Partner",
      ]
    : [
        timestamp,
        data.name || "",
        data.phone ? `'${data.phone}` : "",
        data.email || "",
        data.country || "",
        data.course || "",
        data.amount || "",
        data.loanType || "",
        data.coApplicant || "",
        data.partnerRef || "Direct (Organic)",
        data.sourceUrl || "",
        "New Lead",
      ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetTabName}!A:A`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [rowValues],
    },
  });

  return true;
}
