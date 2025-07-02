"use client";

import Link from "next/link";
import React from "react";
import { Code, Github, Linkedin, MessageCircle, Mail, Heart } from "lucide-react";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-fira-code",
});

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/sanskar2057",
            icon: Github,
            color: "hover:text-gray-400"
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/sanskar-dhungana-317320278/",
            icon: Linkedin,
            color: "hover:text-blue-400"
        },
        {
            name: "WhatsApp",
            href: "https://wa.me/+9779861797766",
            icon: MessageCircle,
            color: "hover:text-green-400"
        },
        {
            name: "Email",
            href: "mailto:sanskar2057@gmail.com",
            icon: Mail,
            color: "hover:text-red-400"
        }
    ];

    return (
        <footer className={`${firaCode.className} border-t-2 border-white/20 py-8 px-4 md:px-8 lg:px-16 bg-[#282C33] text-white mt-16`}>
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {/* Left Section: Logo, Name, Email, Title */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#C778DD] rounded-lg flex items-center justify-center">
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-[20px] font-bold">Sanskar</h3>
                                <p className="text-[#ABB2BF] text-sm">Full Stack Developer</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[#ABB2BF] text-sm">
                                📧 sanskar2057@gmail.com
                            </p>
                            <p className="text-[#ABB2BF] text-sm">
                                📍 Kathmandu, Nepal
                            </p>
                            <p className="text-[#C778DD] text-sm font-medium">
                                💼 Available for freelance work
                            </p>
                        </div>
                    </div>

                    {/* Middle Section: Quick Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-[18px] font-semibold text-[#C778DD]">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { name: "Home", href: "#home" },
                                { name: "About", href: "#about-me" },
                                { name: "Skills", href: "#skills" },
                                { name: "Projects", href: "#work" },
                                { name: "Contact", href: "#contact" },
                                { name: "Resume", href: "/resume.pdf", download: true }
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    download={link.download}
                                    className="text-[#ABB2BF] hover:text-[#C778DD] transition-colors duration-300 text-sm"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Section: Social Media */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-[18px] font-semibold text-[#C778DD]">Connect With Me</h4>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 text-[#ABB2BF] ${social.color} transition-all duration-300 hover:scale-110 group`}
                                        title={social.name}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                        <span className="text-sm group-hover:underline">{social.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                        
                        {/* Tech Stack */}
                        <div className="mt-4">
                            <p className="text-[#ABB2BF] text-xs mb-2">Built with:</p>
                            <div className="flex flex-wrap gap-2">
                                {["Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[#C778DD] text-xs bg-[#C778DD]/10 px-2 py-1 rounded border border-[#C778DD]/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#ABB2BF] text-sm text-center md:text-left">
                        © {currentYear} Sanskar Dhungana. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-[#ABB2BF] text-sm">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                        <span>in Nepal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}