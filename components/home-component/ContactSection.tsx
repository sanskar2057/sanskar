"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Github, Linkedin, Mail, MessageCircle, Send, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const socials = [
    {
      name: "GitHub",
      link: "https://github.com/sanskar2057",
      icon: Github,
      label: "github.com/sanskar2057",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/sanskar-dhungana-317320278/",
      icon: Linkedin,
      label: "Connect professionally",
    },
    {
      name: "WhatsApp",
      link: "https://wa.me/+9779861797766",
      icon: MessageCircle,
      label: "Message directly",
    },
    {
      name: "Email",
      link: "mailto:sanskar2057@gmail.com?subject=Contact%20from%20Website",
      icon: Mail,
      label: "sanskar2057@gmail.com",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Sending...");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

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
    } catch {
      setStatus("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus("");
  };

  const statusClass = status.includes("successfully")
    ? "bg-green-500/10 border-green-500/50 text-green-400"
    : status.includes("Sending")
      ? "bg-[#C778DD]/10 border-[#C778DD]/50 text-[#C778DD]"
      : "bg-red-500/10 border-red-500/50 text-red-400";

  return (
    <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0 xl:px-4" id="contact">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
          <span className="text-[#C778DD]">#</span>contact
        </p>
        <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
      </div>

      <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="orbit-wheel w-44 h-44 right-[-85px] top-[-85px] opacity-50" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C778DD]/40 bg-[#C778DD]/10 px-4 py-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#C778DD]" />
            <span className="text-[#ABB2BF] text-xs sm:text-sm">
              Open to frontend, full-stack, freelance, and collaboration opportunities
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Have a project, role, or idea? Let’s talk.
          </h2>

          <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed mt-4">
            I’m interested in building practical products, dashboards, business
            systems, and clean web experiences with React, Next.js, TypeScript,
            and modern backend integrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-8 xl:gap-12">
        <form onSubmit={handleSubmit} className="bg-[#2D323B]/80 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 space-y-5">
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
              className="w-full p-3 sm:p-4 rounded-xl bg-[#15171D]/70 text-white border border-white/10 focus:outline-none focus:border-[#C778DD] transition-colors duration-300 text-sm"
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
              className="w-full p-3 sm:p-4 rounded-xl bg-[#15171D]/70 text-white border border-white/10 focus:outline-none focus:border-[#C778DD] transition-colors duration-300 text-sm"
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
              placeholder="Tell me about your project, role, or idea..."
              required
              rows={6}
              className="w-full p-3 sm:p-4 rounded-xl bg-[#15171D]/70 text-white border border-white/10 focus:outline-none focus:border-[#C778DD] transition-colors duration-300 text-sm resize-y min-h-[140px]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-4 bg-[#C778DD] text-white rounded-xl hover:bg-[#E0B7FF] transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          {status && (
            <div className={`mt-4 p-4 rounded-xl border transition-all duration-300 ${statusClass}`}>
              <p className="text-sm font-medium">{status}</p>
            </div>
          )}
        </form>

        <div className="space-y-5">
          <div className="bg-[#2D323B]/80 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
            <h3 className="text-white text-xl font-bold mb-2">Connect with me</h3>
            <p className="text-[#ABB2BF] text-sm leading-relaxed mb-5">
              Prefer direct contact? These are the best places to reach me.
            </p>

            <div className="space-y-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#C778DD]/60 hover:bg-[#C778DD]/10 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#C778DD]" />
                    </div>

                    <div>
                      <p className="text-white text-sm font-medium group-hover:text-[#E0B7FF] transition-colors">
                        {social.name}
                      </p>
                      <p className="text-[#ABB2BF] text-xs mt-1">{social.label}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 sm:p-6">
            <p className="text-[#C778DD] text-sm mb-2">Current availability</p>
            <h4 className="text-white text-lg font-bold">Open for opportunities</h4>
            <p className="text-[#ABB2BF] text-sm leading-relaxed mt-2">
              Frontend roles, full-stack tasks, dashboard work, API integration,
              freelance projects, and collaboration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}