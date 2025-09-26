const env = require("dotenv");
env.config();



exports.sendWelcomeOrganizerEmail = (details) => {
  const data = {
    from: process.env.SMTP_USER,
    to: `${details.email}`,
    subject: `Welcome to the Organizer Dashboard`,
    html: `
      <body>
        <h1>Welcome to the Organizer Dashboard</h1>
        <p>Hello,</p>
        <p>Your account has been successfully created.</p>
        <p><strong>Here are your login details:</strong></p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Password:</strong> ${details.password}</p>
        <p>You can now log in to your organizer dashboard by clicking the link below:</p>
        <p><a href="${details.organizerDashboardLink}">Organizer Dashboard</a></p>
        <p>Best regards,</p>
        <p>Your SparkMotion Team</p>
      </body>
`,
  };

  return data;
};


