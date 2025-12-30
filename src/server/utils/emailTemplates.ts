// Email template for verification
export const verificationEmailTemplate = (
  userName: string,
  verificationLink: string
) => {
  return {
    subject: 'Verify Your Email Address - Mi-Pal',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
              text-align: center;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 30px;
              line-height: 1.8;
            }
            .button {
              display: inline-block;
              padding: 12px 40px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              margin-bottom: 20px;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .alternative-text {
              font-size: 12px;
              color: #999;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #eee;
            }
            .link {
              word-break: break-all;
              color: #EB5017;
              text-decoration: none;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
            .validity-notice {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 12px;
              margin: 20px 0;
              border-radius: 4px;
              font-size: 13px;
              color: #856404;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi<span class="accent">-Pal</span></p>
            </div>
            
            <div class="content">
              <p class="greeting">Hello ${userName},</p>
              
              <p class="message">
                Welcome to Mi-Pal Technologies! We're excited to have you on board.
                <br><br>
                To complete your registration, please verify your email address by clicking the button below:
              </p>
              
              <a href="${verificationLink}" class="button">Verify Email Address</a>
              
              <div class="validity-notice">
                ⏱️ This verification link will expire in <strong>24 hours</strong>
              </div>
              
              <p class="message">
                If you didn't create this account, please ignore this email. Your email will not be verified unless you click the button above.
              </p>
              
              <div class="alternative-text">
                <p>Or copy and paste this link in your browser:</p>
                <p><a href="${verificationLink}" class="link">${verificationLink}</a></p>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <p>If you have any questions, please contact us at support@mi-pal.com</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hello ${userName},

      Welcome to Mi-Pal Technologies! To complete your registration, please verify your email by visiting:

      ${verificationLink}

      This link will expire in 24 hours.

      If you didn't create this account, please ignore this email.

      Best regards,
      Mi-Pal Technologies Team
    `,
  };
};

// Email template for password reset
export const passwordResetEmailTemplate = (
  userName: string,
  resetLink: string
) => {
  return {
    subject: 'Reset Your Password - Mi-Pal',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
              text-align: center;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 30px;
              line-height: 1.8;
            }
            .button {
              display: inline-block;
              padding: 12px 40px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              margin-bottom: 20px;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .alternative-text {
              font-size: 12px;
              color: #999;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #eee;
            }
            .link {
              word-break: break-all;
              color: #EB5017;
              text-decoration: none;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
            .validity-notice {
              background-color: #f8d7da;
              border-left: 4px solid #f5c6cb;
              padding: 12px;
              margin: 20px 0;
              border-radius: 4px;
              font-size: 13px;
              color: #721c24;
            }
            .security-notice {
              background-color: #d1ecf1;
              border-left: 4px solid #bee5eb;
              padding: 12px;
              margin: 20px 0;
              border-radius: 4px;
              font-size: 13px;
              color: #0c5460;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi<span class="accent">-Pal</span></p>
            </div>
            
            <div class="content">
              <p class="greeting">Hello ${userName},</p>
              
              <p class="message">
                We received a request to reset your Mi-Pal account password.
                <br><br>
                Click the button below to create a new password:
              </p>
              
              <a href="${resetLink}" class="button">Reset Your Password</a>
              
              <div class="validity-notice">
                ⏱️ This password reset link will expire in <strong>30 minutes</strong>
              </div>
              
              <div class="security-notice">
                🔒 For your security, this is the only way to reset your password. Never share this link with anyone.
              </div>
              
              <p class="message">
                If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.
                <br><br>
                If you have trouble clicking the button, you can copy the link below:
              </p>
              
              <div class="alternative-text">
                <p><a href="${resetLink}" class="link">${resetLink}</a></p>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <p>If you have any questions, please contact us at support@mi-pal.com</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hello ${userName},

      We received a request to reset your Mi-Pal account password.

      To reset your password, please visit:

      ${resetLink}

      This link will expire in 30 minutes.

      If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.

      For your security, never share this link with anyone.

      Best regards,
      Mi-Pal Technologies Team
    `,
  };
};

// Email template for welcome after registration
export const welcomeEmailTemplate = (userName: string) => {
  return {
    subject: 'Welcome to Mi-Pal - Let\'s Get Started!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .features {
              background-color: #f8f9fa;
              border-left: 4px solid #EB5017;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .feature-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .feature-list li {
              padding: 8px 0;
              font-size: 14px;
              color: #555;
            }
            .feature-list li:before {
              content: "✓ ";
              color: #EB5017;
              font-weight: bold;
              margin-right: 8px;
            }
            .button {
              display: inline-block;
              padding: 12px 40px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              margin: 20px 0;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi<span class="accent">-Pal</span></p>
            </div>
            
            <div class="content">
              <p class="greeting">Welcome to Mi-Pal, ${userName}! 🎉</p>
              
              <p class="message">
                Your account has been successfully created. We're thrilled to have you join our community of innovative businesses and digital solution seekers.
              </p>
              
              <div class="features">
                <p style="font-weight: 600; color: #111928; margin-top: 0;">Here's what you can do with your account:</p>
                <ul class="feature-list">
                  <li>Request custom software development solutions</li>
                  <li>Get quotes for digital services</li>
                  <li>Track your project requests in real-time</li>
                  <li>Manage your team members and collaborators</li>
                  <li>Access exclusive resources and documentation</li>
                  <li>Communicate directly with our expert team</li>
                </ul>
              </div>
              
              <p class="message">
                To get started, log in to your dashboard and explore our comprehensive suite of digital solutions tailored for your business needs.
              </p>
              
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Your Dashboard</a>
              
              <p class="message">
                If you have any questions or need assistance getting started, our support team is here to help. Don't hesitate to reach out!
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <p>Need help? Email us at support@mi-pal.com or visit our help center</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Mi-Pal, ${userName}!

      Your account has been successfully created. We're thrilled to have you join our community.

      Here's what you can do with your account:
      ✓ Request custom software development solutions
      ✓ Get quotes for digital services
      ✓ Track your project requests in real-time
      ✓ Manage your team members and collaborators
      ✓ Access exclusive resources and documentation
      ✓ Communicate directly with our expert team

      To get started, log in to your dashboard at:
      ${process.env.FRONTEND_URL}/dashboard

      If you have any questions, contact us at support@mi-pal.com

      Best regards,
      Mi-Pal Technologies Team
    `,
  };
};

// Email template for admin notifications (new user registration)
export const adminNewUserNotificationTemplate = (
  userName: string,
  userEmail: string,
  registrationDate: string
) => {
  return {
    subject: 'New User Registration - Mi-Pal Admin Alert',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
            }
            .alert-box {
              background-color: #d1ecf1;
              border-left: 4px solid #0c5460;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
              color: #0c5460;
            }
            .user-info {
              background-color: #f8f9fa;
              border: 1px solid #dee2e6;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #dee2e6;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              font-weight: 600;
              color: #111928;
              min-width: 150px;
            }
            .info-value {
              color: #666;
            }
            .button {
              display: inline-block;
              padding: 10px 30px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              margin: 20px 0;
              transition: background-color 0.3s ease;
              font-size: 14px;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi<span class="accent">-Pal</span></p>
            </div>
            
            <div class="content">
              <div class="alert-box">
                📢 A new user has registered on Mi-Pal!
              </div>
              
              <div class="user-info">
                <div class="info-row">
                  <span class="info-label">Full Name:</span>
                  <span class="info-value">${userName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email:</span>
                  <span class="info-value">${userEmail}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Registration Date:</span>
                  <span class="info-value">${registrationDate}</span>
                </div>
              </div>
              
              <p style="color: #666; margin: 20px 0;">
                You can view their profile and manage their account from the admin dashboard.
              </p>
              
              <a href="${process.env.FRONTEND_URL}/dashboard/users" class="button">View User in Dashboard</a>
            </div>
            
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      A new user has registered on Mi-Pal!

      Full Name: ${userName}
      Email: ${userEmail}
      Registration Date: ${registrationDate}

      View their profile in the admin dashboard at:
      ${process.env.FRONTEND_URL}/dashboard/users
    `,
  };
};

// Email template for admin notification of new contact submission
export const contactAdminNotificationTemplate = (
  contactName: string,
  contactEmail: string,
  contactPhone: string,
  contactMessage: string,
  submissionId: string
) => {
  return {
    subject: 'New Contact Form Submission - Action Required',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .alert-box {
              background-color: #fff3cd;
              border-left: 4px solid #EB5017;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .alert-text {
              color: #856404;
              font-weight: 500;
              margin: 0;
            }
            .content {
              padding: 30px 20px;
            }
            .section-title {
              font-size: 16px;
              font-weight: 600;
              color: #111928;
              margin: 20px 0 10px 0;
              border-bottom: 2px solid #f0f7ff;
              padding-bottom: 8px;
            }
            .detail-row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-label {
              font-weight: 600;
              color: #111928;
              width: 120px;
              min-width: 120px;
            }
            .detail-value {
              color: #666;
              flex: 1;
              word-break: break-word;
            }
            .message-box {
              background-color: #f0f7ff;
              border-left: 4px solid #EB5017;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .message-content {
              color: #444;
              line-height: 1.8;
              white-space: pre-wrap;
              word-wrap: break-word;
              margin: 0;
            }
            .action-buttons {
              text-align: center;
              padding: 20px 0;
              display: flex;
              gap: 10px;
              justify-content: center;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .button-secondary {
              background-color: #6b7280;
            }
            .button-secondary:hover {
              background-color: #4b5563;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
            .footer a {
              color: #EB5017;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi-<span class="accent">Pal</span></p>
            </div>
            <div class="content">
              <div class="alert-box">
                <p class="alert-text">⚠️ New contact form submission requires your attention</p>
              </div>

              <p style="font-size: 16px; color: #111928; margin-bottom: 15px;">
                A new contact message has been submitted through the website.
              </p>

              <div class="section-title">Contact Details</div>
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${contactName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${contactEmail}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">${contactPhone}</div>
              </div>

              <div class="section-title">Message</div>
              <div class="message-box">
                <p class="message-content">${contactMessage}</p>
              </div>

              <p style="font-size: 13px; color: #666; margin: 20px 0;">
                <strong>Submission ID:</strong> ${submissionId}
              </p>

              <div class="action-buttons">
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/dashboard/contact-form-submissions" class="button">
                  View in Dashboard
                </a>
                <a href="mailto:${contactEmail}?subject=Re: Your contact form submission" class="button button-secondary">
                  Reply to Sender
                </a>
              </div>

              <p style="font-size: 13px; color: #666; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                Please respond to this contact submission in a timely manner. You can manage all submissions in the admin dashboard.
              </p>
            </div>
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <p>
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/dashboard">Admin Dashboard</a> | 
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}">Website</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      NEW CONTACT FORM SUBMISSION
      
      A new contact message has been submitted through the website.

      CONTACT DETAILS:
      Name: ${contactName}
      Email: ${contactEmail}
      Phone: ${contactPhone}

      MESSAGE:
      ${contactMessage}

      Submission ID: ${submissionId}

      Please respond to this contact submission in a timely manner.
      View in Dashboard: ${process.env.FRONTEND_URL || 'https://mi-pal.com'}/dashboard/contact-form-submissions
      Reply to Sender: mailto:${contactEmail}?subject=Re: Your contact form submission

      © 2024 Mi-Pal Technologies. All rights reserved.
    `,
  };
};

// Email template for contact status update notification
export const contactStatusUpdateTemplate = (
  contactName: string,
  newStatus: string,
  adminNotes?: string
) => {
  const statusMessages: { [key: string]: string } = {
    new: 'Your contact submission has been received and is being reviewed.',
    pending: 'Your inquiry is in our queue and will be addressed soon.',
    'in-progress': 'Your inquiry is currently being worked on by our team.',
    replied: 'We have provided a response to your inquiry.',
    resolved: 'Your inquiry has been resolved.',
    closed: 'Your case has been closed. Thank you for contacting us!',
  };

  const statusMessage = statusMessages[newStatus] || 'Your submission status has been updated.';

  return {
    subject: 'Update on Your Contact Form Submission - Mi-Pal Technologies',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
            }
            .status-box {
              background-color: #d4edda;
              border-left: 4px solid #28a745;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .status-label {
              font-size: 12px;
              font-weight: 600;
              color: #155724;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .status-value {
              font-size: 16px;
              font-weight: 600;
              color: #155724;
              text-transform: capitalize;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .notes-box {
              background-color: #f0f7ff;
              border-left: 4px solid #EB5017;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .notes-label {
              font-weight: 600;
              color: #111928;
              margin-bottom: 8px;
              font-size: 13px;
            }
            .notes-content {
              color: #444;
              font-size: 13px;
              line-height: 1.7;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .cta-section {
              text-align: center;
              padding: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
            .footer a {
              color: #EB5017;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi-<span class="accent">Pal</span></p>
            </div>
            <div class="content">
              <p class="greeting">Hi ${contactName},</p>
              
              <p class="message">
                We wanted to keep you updated on your contact form submission. Here's the latest status:
              </p>

              <div class="status-box">
                <div class="status-label">Current Status</div>
                <div class="status-value">${newStatus}</div>
              </div>

              <p class="message">
                ${statusMessage}
              </p>

              ${
                adminNotes
                  ? `
                <div class="notes-box">
                  <div class="notes-label">Additional Notes:</div>
                  <div class="notes-content">${adminNotes}</div>
                </div>
              `
                  : ''
              }

              <div class="cta-section">
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/contact" class="button">Contact Us Again</a>
              </div>

              <p class="message" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                If you have any urgent questions regarding this update, please don't hesitate to reach out to us directly.
              </p>
            </div>
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <p>
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/contact">Contact Us</a> | 
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}">Website</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      STATUS UPDATE ON YOUR CONTACT SUBMISSION

      Hi ${contactName},

      We wanted to keep you updated on your contact form submission. Here's the latest status:

      Current Status: ${newStatus}
      ${statusMessage}

      ${adminNotes ? `\nAdditional Notes:\n${adminNotes}\n` : ''}

      If you have any urgent questions regarding this update, please don't hesitate to reach out to us.

      Thank you,
      Mi-Pal Technologies Team

      Visit: ${process.env.FRONTEND_URL || 'https://mi-pal.com'}/contact
    `,
  };
};


// Email template for contact form submission acknowledgment
export const contactSubmissionAcknowledgmentTemplate = (
  contactName: string
) => {
  return {
    subject: 'We Received Your Message - Mi-Pal Technologies',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .highlight-box {
              background-color: #f0f7ff;
              border-left: 4px solid #EB5017;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .highlight-box p {
              margin: 5px 0;
              color: #111928;
              font-weight: 500;
            }
            .timeline {
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .timeline-item {
              display: flex;
              margin-bottom: 12px;
              font-size: 13px;
            }
            .timeline-item:last-child {
              margin-bottom: 0;
            }
            .timeline-icon {
              color: #EB5017;
              font-weight: bold;
              margin-right: 10px;
              min-width: 20px;
            }
            .timeline-text {
              color: #666;
            }
            .cta-section {
              text-align: center;
              padding: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .contact-info {
              background-color: #f0f7ff;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
              font-size: 13px;
            }
            .contact-info p {
              margin: 5px 0;
              color: #666;
            }
            .contact-info strong {
              color: #111928;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
            .footer a {
              color: #EB5017;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi-<span class="accent">Pal</span></p>
            </div>
            <div class="content">
              <p class="greeting">Hi ${contactName},</p>
              
              <p class="message">
                Thank you for reaching out to Mi-Pal Technologies! We've received your message and appreciate you taking the time to contact us.
              </p>

              <div class="highlight-box">
                <p>✓ Your message has been received</p>
                <p>✓ Our team is reviewing your inquiry</p>
                <p>✓ We'll respond within 24-48 business hours</p>
              </div>

              <p class="message">
                We take every inquiry seriously and our dedicated support team will carefully review your message. If you've submitted a project inquiry, we'll assess your requirements and get back to you with tailored solutions.
              </p>

              <div class="timeline">
                <p style="margin: 0 0 12px 0; color: #111928; font-weight: 600; font-size: 13px;">What happens next:</p>
                <div class="timeline-item">
                  <div class="timeline-icon">1.</div>
                  <div class="timeline-text">Our team reviews your message</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">2.</div>
                  <div class="timeline-text">We gather relevant information about your needs</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">3.</div>
                  <div class="timeline-text">We send you a personalized response</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">4.</div>
                  <div class="timeline-text">We discuss next steps and options</div>
                </div>
              </div>

              <p class="message">
                In the meantime, feel free to explore our website to learn more about our services and solutions.
              </p>

              <div class="cta-section">
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}" class="button">Visit Our Website</a>
              </div>

              <div class="contact-info">
                <p><strong>Need immediate assistance?</strong></p>
                <p>Email: info@mi-pal.com</p>
                <p>Phone: +234 704 301 7567</p>
                <p>Address: 18B, Zainab Street, Medina Estate, Gbagada, Lagos</p>
              </div>

              <p class="message" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                This is an automated message. Please do not reply directly to this email. If you have additional questions, please use the contact form on our website or reach out through the contact information above.
              </p>
            </div>
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <p>
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/contact">Contact Us</a> | 
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}">Website</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Thank you for contacting Mi-Pal Technologies!

      Hi ${contactName},

      We've received your message and appreciate you reaching out to us. Our team is reviewing your inquiry and will respond within 24-48 business hours.

      What happens next:
      1. Our team reviews your message
      2. We gather relevant information about your needs
      3. We send you a personalized response
      4. We discuss next steps and options

      Need immediate assistance?
      Email: info@mi-pal.com
      Phone: +234 704 301 7567
      Address: 18B, Zainab Street, Medina Estate, Gbagada, Lagos

      Thank you,
      Mi-Pal Technologies Team
    `,
  };
};

// Email template for contact form admin reply
export const contactReplyTemplate = (
  contactName: string,
  adminResponse: string
) => {
  return {
    subject: 'Response to Your Message - Mi-Pal Technologies',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .response-box {
              background-color: #f0f7ff;
              border-left: 4px solid #EB5017;
              padding: 20px;
              margin: 25px 0;
              border-radius: 4px;
            }
            .response-header {
              font-weight: 600;
              color: #111928;
              margin-bottom: 12px;
              font-size: 14px;
            }
            .response-content {
              color: #444;
              font-size: 14px;
              line-height: 1.8;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .cta-section {
              text-align: center;
              padding: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .next-steps {
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
              font-size: 13px;
            }
            .next-steps p {
              margin: 8px 0;
              color: #666;
            }
            .next-steps strong {
              color: #111928;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
            .footer a {
              color: #EB5017;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi-<span class="accent">Pal</span></p>
            </div>
            <div class="content">
              <p class="greeting">Hi ${contactName},</p>
              
              <p class="message">
                Thank you for your patience! We've reviewed your message and wanted to provide you with a response.
              </p>

              <div class="response-box">
                <div class="response-header">Our Response:</div>
                <div class="response-content">${adminResponse}</div>
              </div>

              <p class="message">
                If you have any follow-up questions or need further clarification on any point, please don't hesitate to reach out. We're here to help!
              </p>

              <div class="cta-section">
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/contact" class="button">Reply or Ask Another Question</a>
              </div>

              <div class="next-steps">
                <p><strong>What you can do next:</strong></p>
                <p>• Review our detailed information about our services</p>
                <p>• Schedule a consultation with our team</p>
                <p>• Explore our case studies and portfolio</p>
                <p>• Contact us with any additional questions</p>
              </div>

              <p class="message" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                We appreciate the opportunity to assist you. If you wish to contact us again, please use our contact form or reach out directly.
              </p>
            </div>
            <div class="footer">
              <p>© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <p>
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/contact">Contact Us</a> | 
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}">Website</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Thank you for your message!

      Hi ${contactName},

      We've reviewed your message and wanted to provide you with a response:

      ---
      ${adminResponse}
      ---

      If you have any follow-up questions, feel free to reach out to us.

      Best regards,
      Mi-Pal Technologies Team

      Email: info@mi-pal.com
      Phone: +234 704 301 7567
      Address: 18B, Zainab Street, Medina Estate, Gbagada, Lagos
    `,
  };
};

/**
 * Newsletter Subscription Confirmation Email - Sent to User
 */
export const newsletterSubscriptionUserTemplate = (
  subscriberName: string,
  subscriberEmail: string
) => {
  return {
    subject: 'Welcome to Mi-Pal Newsletter! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .benefits {
              background-color: #f0f9ff;
              border-left: 4px solid #3b82f6;
              padding: 20px;
              margin: 25px 0;
              border-radius: 4px;
            }
            .benefits-title {
              font-weight: 600;
              color: #111928;
              margin-bottom: 15px;
              font-size: 16px;
            }
            .benefit-item {
              display: flex;
              align-items: flex-start;
              margin-bottom: 12px;
              font-size: 14px;
              color: #333;
            }
            .benefit-icon {
              color: #10b981;
              margin-right: 12px;
              font-weight: bold;
              font-size: 16px;
              flex-shrink: 0;
            }
            .button {
              display: inline-block;
              padding: 12px 40px;
              background-color: #EB5017;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              margin: 20px 0;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #d43e0f;
            }
            .info-box {
              background-color: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
              font-size: 13px;
              color: #92400e;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
              border-top: 1px solid #eee;
            }
            .footer-links {
              margin: 10px 0;
            }
            .footer-links a {
              color: #EB5017;
              text-decoration: none;
              margin: 0 10px;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi<span class="accent">-Pal</span></p>
            </div>
            
            <div class="content">
              <p class="greeting">Welcome${subscriberName ? ' ' + subscriberName : ''}! 🎉</p>
              
              <p class="message">
                Thank you for subscribing to the Mi-Pal Newsletter! You're now part of our growing community.
              </p>
              
              <div class="benefits">
                <p class="benefits-title">What to Expect</p>
                <div class="benefit-item">
                  <span class="benefit-icon">✓</span>
                  <span>Weekly insights and industry updates</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">✓</span>
                  <span>Exclusive offers and promotions for subscribers</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">✓</span>
                  <span>Early access to new features and products</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">✓</span>
                  <span>Tips, tricks, and best practices from experts</span>
                </div>
              </div>
              
              <p class="message">
                Our newsletter is carefully curated to bring you the most relevant content without overwhelming your inbox. We respect your time and your inbox!
              </p>
              
              <div class="info-box">
                <strong>⏱️ First newsletter coming soon!</strong> Keep an eye on your inbox for our next edition with fresh content and exclusive offers.
              </div>
              
              <p class="message">
                If you ever want to update your preferences or unsubscribe, you can do so at any time by clicking the unsubscribe link in any newsletter email.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 15px 0;">Have questions? Contact us anytime</p>
              <p style="margin: 0;">
                <strong>Email:</strong> <a href="mailto:support@mi-pal.com">support@mi-pal.com</a>
              </p>
              <p style="margin: 10px 0 0 0;">
                <strong>Phone:</strong> +234 704 301 7567
              </p>
              <p style="margin: 15px 0 0 0; font-size: 11px; color: #ccc;">
                © 2024 Mi-Pal Technologies. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome${subscriberName ? ' ' + subscriberName : ''}!

      Thank you for subscribing to the Mi-Pal Newsletter! You're now part of our growing community.

      What to Expect:
      ✓ Weekly insights and industry updates
      ✓ Exclusive offers and promotions for subscribers
      ✓ Early access to new features and products
      ✓ Tips, tricks, and best practices from experts

      Our newsletter is carefully curated to bring you the most relevant content. We respect your time and inbox!

      First newsletter coming soon! Keep an eye on your inbox for our next edition.

      If you want to unsubscribe, you can do so at any time by clicking the unsubscribe link in any newsletter email.

      Have questions? Contact us:
      Email: support@mi-pal.com
      Phone: +234 704 301 7567

      © 2024 Mi-Pal Technologies. All rights reserved.
    `,
  };
};

/**
 * Newsletter Subscription Admin Notification - Sent to Admins
 */
export const newsletterSubscriptionAdminTemplate = (
  subscriberName: string,
  subscriberEmail: string,
  subscriberPhone?: string
) => {
  return {
    subject: 'New Newsletter Subscriber - ' + subscriberEmail,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 15px 0;
              background: linear-gradient(135deg, #EB5017 0%, #d43e0f 100%);
              color: white;
              border-radius: 8px 8px 0 0;
            }
            .header h2 {
              margin: 0;
              font-size: 20px;
            }
            .content {
              padding: 25px 20px;
            }
            .info-section {
              background-color: #f8f9fa;
              border-left: 4px solid #3b82f6;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .info-row {
              display: flex;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .info-label {
              font-weight: 600;
              width: 120px;
              color: #111928;
            }
            .info-value {
              color: #666;
              flex: 1;
              word-break: break-all;
            }
            .action-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              margin: 10px 0;
              font-size: 13px;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 15px;
              text-align: center;
              font-size: 11px;
              color: #999;
              border-radius: 0 0 8px 8px;
              border-top: 1px solid #eee;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 New Newsletter Subscriber</h2>
            </div>
            
            <div class="content">
              <p style="font-size: 14px; color: #666;">A new user has subscribed to your newsletter.</p>
              
              <div class="info-section">
                <div class="info-row">
                  <span class="info-label">Email:</span>
                  <span class="info-value">${subscriberEmail}</span>
                </div>
                ${subscriberName ? `
                <div class="info-row">
                  <span class="info-label">Name:</span>
                  <span class="info-value">${subscriberName}</span>
                </div>
                ` : ''}
                ${subscriberPhone ? `
                <div class="info-row">
                  <span class="info-label">Phone:</span>
                  <span class="info-value">${subscriberPhone}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">Subscribed:</span>
                  <span class="info-value">${new Date().toLocaleString()}</span>
                </div>
              </div>
              
              <p style="font-size: 13px; color: #666; margin: 15px 0;">
                You can manage newsletter subscribers and send newsletters from your admin dashboard.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">© 2024 Mi-Pal Technologies. Admin Notification.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      New Newsletter Subscriber

      A new user has subscribed to your newsletter.

      Email: ${subscriberEmail}
      ${subscriberName ? `Name: ${subscriberName}\n` : ''}${subscriberPhone ? `Phone: ${subscriberPhone}\n` : ''}Subscribed: ${new Date().toLocaleString()}

      You can manage subscribers and send newsletters from your admin dashboard.

      © 2024 Mi-Pal Technologies
    `,
  };
};

/**
 * Newsletter Sent Email Template - Sent to Subscribers
 */
export const newsletterSentTemplate = (
  newsletterTitle: string,
  newsletterSubject: string,
  htmlContent: string,
  unsubscribeLink: string
) => {
  return {
    subject: newsletterSubject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #EB5017;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .newsletter-title {
              font-size: 16px;
              color: #666;
              margin: 10px 0 0 0;
            }
            .content {
              padding: 30px 20px;
            }
            .newsletter-body {
              font-size: 14px;
              line-height: 1.8;
              color: #333;
            }
            .newsletter-body img {
              max-width: 100%;
              height: auto;
              margin: 15px 0;
            }
            .newsletter-body a {
              color: #EB5017;
              text-decoration: none;
            }
            .newsletter-body a:hover {
              text-decoration: underline;
            }
            .divider {
              border: 0;
              border-top: 1px solid #eee;
              margin: 30px 0;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 11px;
              color: #999;
              border-radius: 0 0 8px 8px;
            }
            .footer-links {
              margin: 10px 0;
            }
            .footer-links a {
              color: #EB5017;
              text-decoration: none;
              margin: 0 8px;
              font-size: 10px;
            }
            .unsubscribe-link {
              margin-top: 15px;
              font-size: 10px;
            }
            .unsubscribe-link a {
              color: #999;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi<span class="accent">-Pal</span></p>
              <p class="newsletter-title">${newsletterTitle}</p>
            </div>
            
            <div class="content">
              <div class="newsletter-body">
                ${htmlContent}
              </div>
            </div>
            
            <hr class="divider">
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">© 2024 Mi-Pal Technologies. All rights reserved.</p>
              <div class="footer-links">
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}">Visit Our Website</a> | 
                <a href="${process.env.FRONTEND_URL || 'https://mi-pal.com'}/contact">Contact Us</a>
              </div>
              <div class="unsubscribe-link">
                <a href="${unsubscribeLink}">Unsubscribe from this newsletter</a>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 9px; color: #ccc;">
                18B, Zainab Street, Medina Estate, Gbagada, Lagos
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      ${newsletterTitle}

      ${htmlContent.replace(/<[^>]*>/g, '')}

      ---

      © 2024 Mi-Pal Technologies

      Unsubscribe: ${unsubscribeLink}
      Contact: support@mi-pal.com
    `,
  };
};

/**
 * Newsletter Unsubscription User Confirmation - Sent to User
 */
export const newsletterUnsubscriptionUserTemplate = (
  subscriberName: string,
  subscriberEmail: string,
  resubscribeLink: string
) => {
  return {
    subject: 'You\'ve Unsubscribed from Mi-Pal Newsletter',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 3px solid #ef4444;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #111928;
              margin: 0;
            }
            .logo .accent {
              color: #EB5017;
            }
            .content {
              padding: 30px 20px;
            }
            .message {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .info-box {
              background-color: #fef2f2;
              border-left: 4px solid #ef4444;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
              font-size: 13px;
              color: #991b1b;
            }
            .resubscribe-box {
              background-color: #f0fdf4;
              border-left: 4px solid #10b981;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
              text-align: center;
            }
            .button {
              display: inline-block;
              padding: 10px 30px;
              background-color: #10b981;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              margin: 10px 0;
              font-size: 13px;
            }
            .button:hover {
              background-color: #059669;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-radius: 0 0 8px 8px;
              border-top: 1px solid #eee;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="logo">Mi<span class="accent">-Pal</span></p>
            </div>
            
            <div class="content">
              <p class="message">
                Hi${subscriberName ? ' ' + subscriberName : ''},
              </p>
              
              <p class="message">
                We have received your unsubscribe request and have successfully removed you from our newsletter mailing list.
              </p>
              
              <div class="info-box">
                <strong>Unsubscribed:</strong> ${subscriberEmail}<br>
                <strong>Date:</strong> ${new Date().toLocaleString()}
              </div>
              
              <p class="message">
                You will no longer receive our newsletter emails. If this was unintentional or you change your mind, you can always resubscribe below.
              </p>
              
              <div class="resubscribe-box">
                <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: 600; color: #065f46;">
                  Want to stay connected?
                </p>
                <p style="margin: 0 0 15px 0; font-size: 13px; color: #047857;">
                  Resubscribe to get our latest updates, exclusive offers, and industry insights.
                </p>
                <a href="${resubscribeLink}" class="button">Resubscribe</a>
              </div>
              
              <p class="message" style="font-size: 12px; color: #999; margin-top: 25px;">
                We value your feedback! If there is anything we could have done better, please let us know by replying to this email. We would love to hear from you.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">Questions? We are here to help</p>
              <p style="margin: 0;">
                <strong>Email:</strong> <a href="mailto:support@mi-pal.com" style="color: #EB5017;">support@mi-pal.com</a>
              </p>
              <p style="margin: 10px 0 0 0;">
                <strong>Phone:</strong> +234 704 301 7567
              </p>
              <p style="margin: 15px 0 0 0; font-size: 11px; color: #ccc;">
                © 2024 Mi-Pal Technologies. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi${subscriberName ? ' ' + subscriberName : ''},

      We have received your unsubscribe request and have successfully removed you from our newsletter mailing list.

      Unsubscribed: ${subscriberEmail}
      Date: ${new Date().toLocaleString()}

      You will no longer receive our newsletter emails. If you change your mind, you can resubscribe at any time:
      ${resubscribeLink}

      We value your feedback! If there is anything we could have done better, please reply to this email.

      Questions? Contact us:
      Email: support@mi-pal.com
      Phone: +234 704 301 7567

      © 2024 Mi-Pal Technologies
    `,
  };
};

/**
 * Newsletter Unsubscription Admin Notification - Sent to Admins
 */
export const newsletterUnsubscriptionAdminTemplate = (
  subscriberName: string,
  subscriberEmail: string
) => {
  return {
    subject: 'Newsletter Subscriber Unsubscribed - ' + subscriberEmail,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 15px 0;
              background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
              color: white;
              border-radius: 8px 8px 0 0;
            }
            .header h2 {
              margin: 0;
              font-size: 20px;
            }
            .content {
              padding: 25px 20px;
            }
            .info-section {
              background-color: #fef2f2;
              border-left: 4px solid #ef4444;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .info-row {
              display: flex;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .info-label {
              font-weight: 600;
              width: 120px;
              color: #111928;
            }
            .info-value {
              color: #666;
              flex: 1;
              word-break: break-all;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 15px;
              text-align: center;
              font-size: 11px;
              color: #999;
              border-radius: 0 0 8px 8px;
              border-top: 1px solid #eee;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📭 Newsletter Unsubscribe</h2>
            </div>
            
            <div class="content">
              <p style="font-size: 14px; color: #666;">A subscriber has unsubscribed from your newsletter.</p>
              
              <div class="info-section">
                <div class="info-row">
                  <span class="info-label">Email:</span>
                  <span class="info-value">${subscriberEmail}</span>
                </div>
                ${subscriberName ? `
                <div class="info-row">
                  <span class="info-label">Name:</span>
                  <span class="info-value">${subscriberName}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">Unsubscribed:</span>
                  <span class="info-value">${new Date().toLocaleString()}</span>
                </div>
              </div>
              
              <p style="font-size: 13px; color: #666; margin: 15px 0;">
                You can view and manage all your newsletter subscribers from your admin dashboard. Monitor unsubscribe rates and gather feedback to improve your newsletter content.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">© 2024 Mi-Pal Technologies. Admin Notification.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Newsletter Subscriber Unsubscribed

      A subscriber has unsubscribed from your newsletter.

      Email: ${subscriberEmail}
      ${subscriberName ? `Name: ${subscriberName}\n` : ''}Unsubscribed: ${new Date().toLocaleString()}

      You can view and manage all subscribers from your admin dashboard.

      © 2024 Mi-Pal Technologies
    `,
  };
};

