import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a reusable transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

/**
 * Wrapper function to send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} html - Optional HTML body
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendEmailWrapper({ to, subject, text, html }) {
  try {
    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { success: false, error: error.message };
  }
}

// Quick test function (like your SMS test)
async function someBackendLogic() {
  await sendEmailWrapper({
    to: "satyam22031@gmail.com",
    subject: "Report Submitted",
    text: "A new report has been submitted successfully.",
    html: "<h2>New Report</h2><p>A new report has been submitted successfully.</p>",
  });
}

someBackendLogic();
