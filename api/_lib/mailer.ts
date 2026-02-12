import nodemailer from "nodemailer";

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendInviteEmail(email: string, name: string, inviteToken: string) {
  // Determine base URL
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 5000}`;

  const joinLink = `${baseUrl}/api/join?token=${inviteToken}`;

  const mailOptions = {
    from: '"Stackhouse Community" <' + process.env.EMAIL_USER + '>',
    to: email,
    subject: "Welcome to Stackhouse - You're In!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; border-radius: 10px; background-color: #000; color: #fff;">
        <h1 style="color: #fff; font-size: 24px; margin-bottom: 20px;">Welcome to Stackhouse, ${name}!</h1>
        <p style="color: #ccc; font-size: 16px; line-height: 1.5;">
          We reviewed your application and we're excited to have you join our community of builders.
        </p>
        <p style="color: #ccc; font-size: 16px; line-height: 1.5;">
          Currently, our specific community features are invite-only to maintain high quality.
        </p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${joinLink}" style="background-color: #ea580c; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block;">
            Join the WhatsApp Community
          </a>
        </div>

        <p style="color: #888; font-size: 14px; margin-top: 30px; text-align: center;">
          Note: This invite link is unique to you and can only be used once. Please do not share it.
        </p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #666; font-size: 12px;">
          &copy; ${new Date().getFullYear()} Stackhouse. Keep Building.
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
