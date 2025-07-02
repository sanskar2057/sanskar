// app/api/send-email/route.js
import nodemailer from "nodemailer";

// Ensure the route is dynamic
export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        // Validate input
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ message: "All fields are required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Create transporter with Gmail configuration
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Verify connection configuration
        await transporter.verify();

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #C778DD;">New Portfolio Contact</h2>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ message: "Email sent successfully!" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Email error:", error);

        let errorMessage = "Failed to send email. Please try again.";

        if (error.code === "EAUTH") {
            errorMessage = "Email authentication failed. Please check credentials.";
        } else if (error.code === "ECONNECTION") {
            errorMessage = "Connection failed. Please check your internet connection.";
        }

        return new Response(
            JSON.stringify({
                message: errorMessage,
                details: process.env.NODE_ENV === "development" ? error.message : undefined,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}