const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(to, code) {
  await transporter.sendMail({
    from: `"YatraVerse" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your YatraVerse verification code",
    text: `Your YatraVerse verification code is ${code}. It expires in 10 minutes. If you didn't request this, you can safely ignore this email.`,
    html: `
      <div style="background: #f4f1ea; padding: 40px 20px; font-family: Georgia, 'Times New Roman', serif;">
        <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e8e2d4;">
          
          <div style="background: #1f2a24; padding: 32px 32px 28px; text-align: center;">
            <p style="margin: 0; color: #d4af6a; font-size: 1.5rem; letter-spacing: 0.08em; font-weight: 600;">
              YatraVerse
            </p>
            <p style="margin: 6px 0 0; color: #a8b5ad; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;">
              Begin Your Journey
            </p>
          </div>

          <div style="padding: 36px 32px;">
            <h1 style="margin: 0 0 16px; color: #1f2a24; font-size: 1.3rem; font-weight: 600;">
              Confirm it's you
            </h1>

            <p style="margin: 0 0 12px; color: #4a4a4a; font-size: 0.95rem; line-height: 1.6;">
              We received a request to sign in to YatraVerse using <strong>${to}</strong>.
            </p>
            <p style="margin: 0 0 28px; color: #4a4a4a; font-size: 0.95rem; line-height: 1.6;">
              Enter the code below to continue your journey:
            </p>

            <div style="background: #f4f1ea; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
              <span style="font-size: 2.2rem; font-weight: 700; letter-spacing: 0.5em; color: #1f2a24; padding-left: 0.5em;">
                ${code}
              </span>
            </div>

            <p style="margin: 0 0 24px; color: #999; font-size: 0.8rem; text-align: center;">
              This code expires in 10 minutes.
            </p>

            <div style="border-top: 1px solid #eee; padding-top: 20px;">
              <p style="margin: 0; color: #999; font-size: 0.8rem; line-height: 1.5;">
                Didn't try to sign in? No action is needed — your account is safe and no access was granted.
              </p>
            </div>
          </div>

          <div style="background: #faf8f3; padding: 18px 32px; text-align: center; border-top: 1px solid #f0ebdf;">
            <p style="margin: 0; color: #b5ab94; font-size: 0.75rem;">
              YatraVerse · Travel Companion
            </p>
          </div>

        </div>
      </div>
    `,
  });
}

async function sendPasswordResetEmail(to, code) {
  await transporter.sendMail({
    from: `"YatraVerse" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your YatraVerse password",
    text: `Your YatraVerse password reset code is ${code}. It expires in 10 minutes. If you didn't request this, you can safely ignore this email.`,
    html: `
      <div style="background: #f4f1ea; padding: 40px 20px; font-family: Georgia, 'Times New Roman', serif;">
        <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e8e2d4;">
          
          <div style="background: #1f2a24; padding: 32px 32px 28px; text-align: center;">
            <p style="margin: 0; color: #d4af6a; font-size: 1.5rem; letter-spacing: 0.08em; font-weight: 600;">
              YatraVerse
            </p>
            <p style="margin: 6px 0 0; color: #a8b5ad; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;">
              Account Recovery
            </p>
          </div>

          <div style="padding: 36px 32px;">
            <h1 style="margin: 0 0 16px; color: #1f2a24; font-size: 1.3rem; font-weight: 600;">
              Reset your password
            </h1>

            <p style="margin: 0 0 12px; color: #4a4a4a; font-size: 0.95rem; line-height: 1.6;">
              We received a request to reset the password for your YatraVerse account (<strong>${to}</strong>).
            </p>
            <p style="margin: 0 0 28px; color: #4a4a4a; font-size: 0.95rem; line-height: 1.6;">
              Enter the code below to reset your password:
            </p>

            <div style="background: #f4f1ea; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
              <span style="font-size: 2.2rem; font-weight: 700; letter-spacing: 0.5em; color: #1f2a24; padding-left: 0.5em;">
                ${code}
              </span>
            </div>

            <p style="margin: 0 0 24px; color: #999; font-size: 0.8rem; text-align: center;">
              This code expires in 10 minutes.
            </p>

            <div style="border-top: 1px solid #eee; padding-top: 20px;">
              <p style="margin: 0; color: #999; font-size: 0.8rem; line-height: 1.5;">
                Didn't request a password reset? No action is needed — your account is safe.
              </p>
            </div>
          </div>

          <div style="background: #faf8f3; padding: 18px 32px; text-align: center; border-top: 1px solid #f0ebdf;">
            <p style="margin: 0; color: #b5ab94; font-size: 0.75rem;">
              YatraVerse · Travel Companion
            </p>
          </div>

        </div>
      </div>
    `,
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };