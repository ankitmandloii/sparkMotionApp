const env = require("dotenv");
env.config();


function extractName(email) {
  try {
    let namePart = email.split("@")[0];  // Get the part before '@'
    let formattedName = namePart.replace(/[\.\-_]/g, " ")  // Replace dots, hyphens, underscores with spaces
      .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize first letter of each word
    return formattedName;
  } catch (error) {
    console.error("Error extracting name:", error);
    return "User";
  }
}


exports.sendWelcomeOrganizerEmail = (details) => {
  const userName = extractName(details.email);
  const data = {
    from: process.env.SMTP_USER,
    to: `${details.email}`,
    subject: `🎉 Welcome to the Organizer Dashboard! 🎉`,
    html: `
      <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background-color: #FF7F50; padding: 20px; text-align: center; color: white;">
            <h1>Welcome to the Organizer Dashboard!</h1>
            <p style="font-size: 18px;">We are thrilled to have you on board!</p>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Hi <strong>${userName}</strong>,</p>
            <p style="font-size: 16px;">Your account has been successfully created. We’re excited to see you manage your events with us!</p>

            <p style="font-size: 16px;"><strong>Here are your login details:</strong></p>
            <table style="width: 100%; margin-top: 10px;">
              <tr>
                <td style="font-size: 16px; padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Email:</strong></td>
                <td style="font-size: 16px; padding: 8px; border: 1px solid #ddd;">${details.email}</td>
              </tr>
              <tr>
                <td style="font-size: 16px; padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Password:</strong></td>
                <td style="font-size: 16px; padding: 8px; border: 1px solid #ddd;">${details.password}</td>
              </tr>
            </table>

            <p style="font-size: 16px; margin-top: 20px;">You can now access your organizer dashboard by clicking the link below:</p>
            <p style="text-align: center;">
              <a href="${details.organizerDashboardLink}" style="background-color: #FF4500; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">Go to Dashboard</a>
            </p>

            <p style="font-size: 16px; margin-top: 30px;">If you have any questions or need assistance, feel free to reach out to us.</p>

            <p style="font-size: 16px; color: #777;">Best regards,<br>Your SparkMotion Team</p>
          </div>
        </div>
      </body>
    `,
  };

  return data;
};
