"use client";

import React, { useEffect, useState } from "react";
import { Code, Download, Mail, Menu, X } from "lucide-react";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fira-code",
});

export default function Navbar({
  setFooterVisible,
}: {
  setFooterVisible: (visible: boolean) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScrollState);
    return () => window.removeEventListener("scroll", handleScrollState);
  }, []);

  useEffect(() => {
    setFooterVisible(!isMenuOpen);
  }, [isMenuOpen, setFooterVisible]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const navbarHeight = 96;
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setIsMenuOpen(false);
      setFooterVisible(true);
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sanskar_Dhungana_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { id: "home", label: "home" },
    { id: "work", label: "work" },
    { id: "tech-playground", label: "playground" },
    { id: "blogs", label: "blogs" },
    { id: "skills", label: "skills" },
    { id: "about-me", label: "about" },
    { id: "contact", label: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#15171D]/85 backdrop-blur-xl border-white/10 shadow-2xl"
          : "bg-transparent border-transparent"
        } border-b`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-4">
        <button
          onClick={() => handleScroll("home")}
          className="flex items-center gap-3 sm:gap-4 group"
          aria-label="Go to home"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-[#C778DD] rounded-xl flex items-center justify-center shadow-[0_0_28px_rgba(199,120,221,0.35)] group-hover:scale-105 transition-transform">
            <Code className="w-6 h-6 text-white" />
          </div>

          <div className="text-left">
            <h1
              className={`${firaCode.className} text-white text-lg sm:text-xl font-bold m-0 leading-none`}
            >
              Sanskar
            </h1>
            <p className="text-[#ABB2BF] text-xs mt-1 hidden sm:block">
              Frontend / Full Stack
            </p>
          </div>
        </button>

        <ul className={`${firaCode.className} hidden lg:flex gap-6 xl:gap-8 list-none m-0 p-0`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleScroll(item.id)}
                className="transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <span className="text-[#C778DD] group-hover:text-[#FFB3F6] transition-colors duration-300">
                  #
                </span>
                <span className="text-[#ABB2BF] font-normal group-hover:text-white transition-colors duration-300 text-sm xl:text-base">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={downloadResume}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl hover:border-[#C778DD]/60 hover:bg-[#C778DD]/10 transition-all duration-300 hover:-translate-y-0.5 font-medium text-sm"
          >
            <Download className="w-4 h-4 text-[#C778DD]" />
            Resume
          </button>

          <button
            onClick={() => handleScroll("contact")}
            className="flex items-center gap-2 bg-[#C778DD] text-white px-4 py-2.5 rounded-xl hover:bg-[#E0B7FF] transition-all duration-300 hover:-translate-y-0.5 font-medium text-sm"
          >
            <Mail className="w-4 h-4" />
            Contact
          </button>
        </div>

        <button
          className="lg:hidden p-2 focus:outline-none z-50 hover:bg-white/10 rounded-xl transition-colors duration-300"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#15171D]/98 backdrop-blur-xl z-40 overflow-y-auto">
          <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-8 px-4">
            <ul className={`${firaCode.className} flex flex-col gap-7 list-none text-center mb-10`}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScroll(item.id)}
                    className="transition-all duration-300 hover:scale-110 group cursor-pointer"
                  >
                    <span className="text-[#C778DD] group-hover:text-[#FFB3F6] transition-colors duration-300 text-2xl">
                      #
                    </span>
                    <span className="text-white font-normal group-hover:text-[#E0B7FF] transition-colors duration-300 text-2xl">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 mb-8 w-full max-w-xs">
              <button
                onClick={downloadResume}
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl hover:border-[#C778DD]/60 hover:bg-[#C778DD]/10 transition-all duration-300 font-medium"
              >
                <Download className="w-5 h-5 text-[#C778DD]" />
                Download Resume
              </button>

              <button
                onClick={() => handleScroll("contact")}
                className="flex items-center justify-center gap-2 bg-[#C778DD] text-white px-6 py-3 rounded-xl hover:bg-[#E0B7FF] transition-all duration-300 font-medium"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </button>
            </div>

            <div className="text-center space-y-3 border-t border-white/10 pt-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-9 h-9 bg-[#C778DD] rounded-xl flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg font-bold text-[#C778DD]">Sanskar</p>
              </div>

              <p className="text-[#ABB2BF] text-sm">sanskar2057@gmail.com</p>
              <p className="text-[#ABB2BF] text-xs">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}