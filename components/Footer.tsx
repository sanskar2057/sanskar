"use client";

import Link from "next/link";
import React from "react";
import { Code, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { downloadActiveResume } from "@/lib/resume";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sanskar2057",
      icon: Github,
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sanskar-dhungana-317320278/",
      icon: Linkedin,
      color: "hover:text-blue-300",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/+9779861797766",
      icon: MessageCircle,
      color: "hover:text-green-300",
    },
    {
      name: "Email",
      href: "mailto:sanskar2057@gmail.com",
      icon: Mail,
      color: "hover:text-red-300",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Playground", href: "#tech-playground" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about-me" },
    { name: "Contact", href: "#contact" },
    { name: "Resume", href: "#resume", download: true },
  ];

  return (
    <footer
      className="font-fira-code border-t border-white/10 py-10 px-4 md:px-8 lg:px-16 bg-[#15171D]/80 text-white mt-16 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1fr] gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C778DD] rounded-xl flex items-center justify-center shadow-[0_0_28px_rgba(199,120,221,0.35)]">
                  <Code className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold">Sanskar Dhungana</h3>
                  <p className="text-[#ABB2BF] text-sm">
                    Frontend / Full Stack Developer
                  </p>
                </div>
              </div>

              <p className="text-[#ABB2BF] text-sm leading-relaxed max-w-md">
                Building scalable web products, dashboards, API-driven systems,
                and clean user interfaces with React, Next.js, TypeScript, and
                backend integrations.
              </p>

              <div className="space-y-1 text-sm">
                <p className="text-[#ABB2BF]">📧 sanskar2057@gmail.com</p>
                <p className="text-[#ABB2BF]">📍 Kathmandu, Nepal</p>
                <p className="text-[#C778DD] font-medium">
                  💼 Open for opportunities
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#C778DD] mb-4">
                Quick Links
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) =>
                  link.download ? (
                    <button
                      key={link.name}
                      type="button"
                      onClick={downloadActiveResume}
                      className="text-left text-[#ABB2BF] hover:text-[#C778DD] transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-[#ABB2BF] hover:text-[#C778DD] transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#C778DD] mb-4">
                Connect
              </h4>

              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-[#ABB2BF] ${social.color} transition-all duration-300 group`}
                      title={social.name}
                    >
                      <Icon className="w-5 h-5 text-[#C778DD] group-hover:scale-110 transition-transform" />
                      <span className="text-sm group-hover:underline">
                        {social.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5">
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
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#ABB2BF] text-sm text-center md:text-left">
            © {currentYear} Sanskar Dhungana. All rights reserved.
          </p>

          <p className="text-[#ABB2BF] text-sm">
            Designed and built with code.
          </p>
        </div>
      </div>
    </footer>
  );
}
