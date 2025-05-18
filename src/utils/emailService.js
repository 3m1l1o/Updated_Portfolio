// This is a utility file for email service configuration
// You'll need to sign up for EmailJS (https://www.emailjs.com/) to get your service ID, template ID, and user ID

export const initEmailService = () => {
  // Initialize EmailJS with your user ID
  // This should be called in your main component (e.g., App.jsx or main.jsx)
  return import("@emailjs/browser").then((emailjs) => {
    emailjs.default.init("YOUR_USER_ID"); // Replace with your actual EmailJS User ID
    return emailjs.default;
  });
};

export const sendEmail = async (formData) => {
  try {
    const emailjs = await import("@emailjs/browser");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: "Aditya", // Your name
    };

    const response = await emailjs.default.send(
      "service_dwgym7u", // Replace with your EmailJS service ID
      "template_k3t8ton", // Replace with your EmailJS template ID
      templateParams,
      "DmbJWFOqMCWQR0Fkr"
    );

    return { success: true, response };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};
