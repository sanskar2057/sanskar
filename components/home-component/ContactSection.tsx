"use client"; // Mark as Client Component for interactivity

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const socials = [
        { name: "GitHub", link: "https://github.com/sanskar2057", icon: "/social-media/github.svg" },
        { name: "LinkedIn", link: "https://www.linkedin.com/in/sanskar-dhungana-317320278/", icon: "/social-media/linkedin.svg" },
        { name: "WhatsApp", link: "https://wa.me/+9779861797766", icon: "/social-media/whatsapp.svg" },
        { name: "Email", link: "mailto:sanskar2057@gmail.com?subject=Contact%20from%20Website", icon: "/social-media/gmail.svg" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("Sending...");

        // Basic validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                setStatus(result.message || "Failed to send message. Please try again.");
                setIsLoading(false);
                return;
            }

            setStatus("Message sent successfully! I'll get back to you soon.");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status) setStatus(""); // Clear status when user starts typing
    };

    return (
        <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0 xl:px-4" id="contact">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
                    <span className="text-[#C778DD]">#</span>contacts
                </p>
                <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 xl:gap-12">
                {/* Left: Contact Form */}
                <div>
                    <p className="text-[#ABB2BF] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mb-6">
                        I'm interested in freelance opportunities and exciting projects. If you have any questions, project ideas, or just want to say hi, don't hesitate to reach out!
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full p-3 sm:p-4 rounded-md bg-[#2D323B] text-white border-2 border-[#C778DD]/30 focus:outline-none focus:border-[#C778DD] transition-colors duration-300 text-[14px] sm:text-[15px]"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                                className="w-full p-3 sm:p-4 rounded-md bg-[#2D323B] text-white border-2 border-[#C778DD]/30 focus:outline-none focus:border-[#C778DD] transition-colors duration-300 text-[14px] sm:text-[15px]"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project or just say hello..."
                                required
                                rows={5}
                                className="w-full p-3 sm:p-4 rounded-md bg-[#2D323B] text-white border-2 border-[#C778DD]/30 focus:outline-none focus:border-[#C778DD] transition-colors duration-300 text-[14px] sm:text-[15px] resize-vertical min-h-[120px]"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 sm:py-4 bg-[#C778DD] text-white rounded-md hover:bg-[#E0B7FF] transition-all duration-300 text-[14px] sm:text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </span>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                        
                        {status && (
                            <div className={`mt-4 p-3 sm:p-4 rounded-md border-2 transition-all duration-300 ${
                                status.includes("successfully") 
                                    ? "bg-green-500/10 border-green-500/50 text-green-400" 
                                    : status.includes("Sending")
                                        ? "bg-[#C778DD]/10 border-[#C778DD]/50 text-[#C778DD]"
                                        : "bg-red-500/10 border-red-500/50 text-red-400"
                            }`}>
                                <p className="text-[13px] sm:text-[14px] font-medium">
                                    {status}
                                </p>
                            </div>
                        )}
                    </form>
                </div>

                {/* Right: Social Links */}
                <div className="bg-[#2D323B] p-4 sm:p-5 md:p-6 rounded-lg shadow-lg border border-[#C778DD]/50 h-fit">
                    <h3 className="text-white text-[18px] sm:text-[20px] md:text-[22px] font-bold mb-4 sm:mb-5">
                        Connect With Me
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        {socials.map((social, index) => (
                            <Link
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 sm:gap-4 p-3 rounded-md hover:bg-[#C778DD]/10 transition-all duration-300 group"
                            >
                                <Image
                                    src={social.icon}
                                    alt={`${social.name} icon`}
                                    width={24}
                                    height={24}
                                    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300"
                                />
                                <span className="text-[#C778DD] text-[14px] sm:text-[15px] md:text-[16px] group-hover:text-[#E0B7FF] transition-colors duration-300 font-medium">
                                    {social.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-[#C778DD]/30">
                        <p className="text-[#ABB2BF] text-[12px] sm:text-[13px] text-center">
                            Available for freelance work
                        </p>
                        <p className="text-[#C778DD] text-[13px] sm:text-[14px] text-center font-medium">
                            sanskar2057@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}