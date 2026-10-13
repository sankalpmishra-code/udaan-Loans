import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface LeadEmailPayload {
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
  sourceName?: string;
  additionalNotes?: string;
}

/**
 * Sends an instant internal lead notification email to the Udaan Edu Loans team.
 */
export async function sendLeadAlertEmail(lead: LeadEmailPayload): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.warn("⚠️ Resend API key is not configured. Skipping email alert.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const alertRecipientsRaw = process.env.RESEND_ALERT_EMAIL || "Anshulverma338@gmail.com, sankalp@udaaneduloans.com";
  const alertRecipients = alertRecipientsRaw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Udaan Edu Loans <connect@udaaneduloans.com>";
  const isPartner = lead.leadType === "Partner Registration";

  const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, "") : "";
  const whatsappUrl = cleanPhone.length === 10 ? `https://wa.me/91${cleanPhone}` : `https://wa.me/${cleanPhone}`;
  const telUrl = `tel:+91${cleanPhone}`;

  const title = isPartner
    ? `🤝 New Partner Registration: ${lead.agency || lead.name || "Study Abroad Agency"}`
    : `🎓 New Student Lead: ${lead.name || "Student"} (${lead.country || "Overseas"})`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f8; color: #1e293b; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: #094754; color: #ffffff; padding: 24px 28px; text-align: left; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #99f6e4; }
        .content { padding: 28px; }
        .lead-badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 18px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .table td.label { font-weight: 600; color: #64748b; width: 38%; }
        .table td.value { color: #0f172a; font-weight: 500; }
        .actions { display: flex; gap: 12px; margin-top: 20px; }
        .btn { display: inline-block; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; text-align: center; }
        .btn-wa { background: #25d366; color: #ffffff; }
        .btn-call { background: #094754; color: #ffffff; }
        .footer { background: #f8fafc; padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Udaan Edu Loans Lead Alert</h1>
          <p>Instant notification from udaaneduloans.com</p>
        </div>
        <div class="content">
          <div class="lead-badge">${lead.leadType}</div>
          <table class="table">
            <tr>
              <td class="label">Source Name</td>
              <td class="value"><strong>${lead.sourceName || "Website"}</strong></td>
            </tr>
            <tr>
              <td class="label">${isPartner ? "Agency Name" : "Applicant Name"}</td>
              <td class="value"><strong>${lead.name || lead.agency || "N/A"}</strong></td>
            </tr>
            <tr>
              <td class="label">Mobile Number</td>
              <td class="value">
                <a href="${telUrl}" style="color: #094754; font-weight: 600;">+91 ${cleanPhone}</a>
              </td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td class="value">
                <a href="mailto:${lead.email}" style="color: #0369a1;">${lead.email || "N/A"}</a>
              </td>
            </tr>
            ${
              isPartner
                ? `
            <tr><td class="label">Contact Person</td><td class="value">${lead.contactPerson || "N/A"}</td></tr>
            <tr><td class="label">Operating City</td><td class="value">${lead.city || "N/A"}</td></tr>
            <tr><td class="label">Monthly Volume</td><td class="value">${lead.monthlyStudents || "N/A"}</td></tr>
            `
                : `
            <tr><td class="label">Target Country</td><td class="value"><strong>${lead.country || "N/A"}</strong></td></tr>
            <tr><td class="label">Degree / Course</td><td class="value">${lead.course || "N/A"}</td></tr>
            <tr><td class="label">Estimated Loan</td><td class="value"><strong>${lead.amount || "N/A"}</strong></td></tr>
            <tr><td class="label">Loan Preference</td><td class="value">${lead.loanType || "N/A"}</td></tr>
            <tr><td class="label">Co-Applicant Profile</td><td class="value">${lead.coApplicant || "N/A"}</td></tr>
            <tr><td class="label">Partner Code</td><td class="value">${lead.partnerRef || "Direct (Organic)"}</td></tr>
            `
            }
            ${
              lead.additionalNotes
                ? `<tr><td class="label">Notes</td><td class="value" style="font-size: 13px; color: #475569;">${lead.additionalNotes}</td></tr>`
                : ""
            }
            <tr>
              <td class="label">Timestamp</td>
              <td class="value">${lead.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
            </tr>
          </table>

          ${
            cleanPhone
              ? `
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #cbd5e1;">
            <p style="margin: 0 0 10px; font-size: 13px; font-weight: 600; color: #475569;">Quick Contact Actions:</p>
            <a href="${whatsappUrl}" class="btn btn-wa" style="margin-right: 8px;">💬 Chat on WhatsApp</a>
            <a href="${telUrl}" class="btn btn-call">📞 Call Applicant</a>
          </div>
          `
              : ""
          }
        </div>
        <div class="footer">
          Udaan Edu Loans Facilitators Pvt. Ltd. • Gurugram, India • Confidential Student Lead Data
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    let result = await resend.emails.send({
      from: fromEmail,
      to: alertRecipients,
      subject: title,
      html,
    });

    if (result.error && typeof result.error.message === "string" && result.error.message.includes("You can only send testing emails")) {
      console.warn("Resend test sandbox restriction active: retrying delivery to account owner (sankalp@udaaneduloans.com)");
      result = await resend.emails.send({
        from: "Udaan Edu Loans <onboarding@resend.dev>",
        to: ["sankalp@udaaneduloans.com"],
        subject: title,
        html,
      });
    }

    if (result.error) {
      console.error("Resend API error:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };
  } catch (err: any) {
    console.error("Error sending Resend lead alert email:", err);
    return { success: false, error: err?.message || String(err) };
  }
}

/**
 * Sends a welcome/confirmation email to the student with next steps.
 */
export async function sendStudentConfirmationEmail(lead: LeadEmailPayload): Promise<{ success: boolean; error?: string }> {
  if (!resend || !lead.email || !lead.email.includes("@")) {
    return { success: false, error: "No valid email or Resend not active" };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Udaan Edu Loans <connect@udaaneduloans.com>";
  const firstName = (lead.name || "Student").split(" ")[0];

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f8fafc; color: #1e293b; }
        .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
        .header { background: #094754; color: #ffffff; padding: 28px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 28px; line-height: 1.6; }
        .highlight-box { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px 18px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Udaan Edu Loans</h1>
          <p style="margin: 4px 0 0; color: #99f6e4; font-size: 14px;">Your Study Abroad Education Loan Facilitation</p>
        </div>
        <div class="content">
          <p>Dear ${firstName},</p>
          <p>Thank you for submitting your study abroad loan profile on <strong>Udaan Edu Loans</strong>. We have successfully received your inquiry for <strong>${lead.country || "Overseas Studies"}</strong>.</p>
          
          <div class="highlight-box">
            <strong>What happens next:</strong>
            <ul style="margin: 8px 0 0; padding-left: 20px; font-size: 14px;">
              <li>A dedicated senior loan advisor will review your eligibility across 30+ partner banks & NBFCs.</li>
              <li>We will contact you via WhatsApp / phone on <strong>+91 ${lead.phone}</strong> to guide you through pre-visa sanction letters and document verification.</li>
              <li><strong>Zero advisory fees:</strong> 100% free guidance with no hidden platform charges.</li>
            </ul>
          </div>

          <p>If you have urgent queries or upcoming visa deadlines, reach out directly via WhatsApp:</p>
          <p style="text-align: center; margin: 24px 0;">
            <a href="https://wa.me/917303200803?text=Hi%20Udaan%20Loans,%20I%20just%20submitted%20my%20loan%20profile%20for%20${encodeURIComponent(lead.country || "Abroad")}" style="background: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              💬 Connect on WhatsApp (+91 7303200803)
            </a>
          </p>

          <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
            Warm regards,<br>
            <strong>Admissions & Loan Desk</strong><br>
            Udaan Edu Loans Facilitators Pvt. Ltd.<br>
            <a href="https://www.udaaneduloans.com" style="color: #094754;">www.udaaneduloans.com</a>
          </p>
        </div>
        <div class="footer">
          DLF Cyber City, Phase 2, Gurugram, India • Toll-Free / WhatsApp: +91 7303200803
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [lead.email.trim()],
      subject: `Your Education Loan Inquiry Received | Udaan Edu Loans`,
      html,
    });

    if (result.error) {
      console.warn("Student confirmation email notice (Resend):", result.error.message);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (err: any) {
    // Non-fatal, especially on free tier accounts before domain verification
    console.warn("Could not dispatch student confirmation email:", err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}
