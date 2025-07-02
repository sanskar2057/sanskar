"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Code, Download, Mail } from "lucide-react";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-fira-code",
});

export default function Navbar({ setFooterVisible }: { setFooterVisible: (visible: boolean) => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setFooterVisible(!isMenuOpen);
    }, [isMenuOpen, setFooterVisible]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 100;
            const offsetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
            setIsMenuOpen(false);
            setFooterVisible(true);
        }
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Sanskar_Dhungana_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const navItems = [
        { id: "home", label: "home" },
        { id: "work", label: "works" },
        { id: "skills", label: "skills" },
        { id: "about-me", label: "about-me" },
        { id: "contact", label: "contact" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-[#282C33]/95 backdrop-blur-md shadow-lg' : 'bg-[#282C33]'
        } border-b-2 border-white/20`}>
            <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-4">
                {/* Left Side: Logo and Name */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#C778DD] rounded-lg flex items-center justify-center">
                        <Code className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h1 className={`${firaCode.className} text-white text-[20px] sm:text-[22px] md:text-[26px] font-bold m-0`}>
                        Sanskar
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <ul className={`${firaCode.className} hidden lg:flex gap-6 xl:gap-8 list-none m-0 p-0`}>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleScroll(item.id)}
                                className="no-underline transition-all duration-300 hover:scale-105 group cursor-pointer"
                            >
                                <span className="text-[#C778DD] group-hover:text-[#FFB3F6] transition-colors duration-300">#</span>
                                <span className="text-white font-normal group-hover:text-[#E0B7FF] transition-colors duration-300 text-[16px] xl:text-[18px]">
                                    {item.label}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Desktop Action Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <button
                        onClick={downloadResume}
                        className="flex items-center gap-2 bg-[#C778DD] text-white px-4 py-2 rounded-md hover:bg-[#E0B7FF] transition-all duration-300 transform hover:scale-105 font-medium text-sm"
                    >
                        <Download className="w-4 h-4" />
                        Resume
                    </button>
                    <button
                        onClick={() => handleScroll('contact')}
                        className="flex items-center gap-2 border-2 border-[#C778DD] text-[#C778DD] px-4 py-2 rounded-md hover:bg-[#C778DD] hover:text-white transition-all duration-300 transform hover:scale-105 font-medium text-sm"
                    >
                        <Mail className="w-4 h-4" />
                        Contact
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 focus:outline-none z-50 hover:bg-white/10 rounded-md transition-colors duration-300"
                    onClick={toggleMenu}
                    aria-label="Toggle mobile menu"
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6 text-white transform rotate-90 transition-transform duration-300" />
                    ) : (
                        <Menu className="w-6 h-6 text-white transition-transform duration-300" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-[#282C33]/98 backdrop-blur-md z-40 overflow-y-auto">
                    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-8 px-4">
                        <ul className={`${firaCode.className} flex flex-col gap-8 sm:gap-10 list-none text-center mb-12`}>
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleScroll(item.id)}
                                        className="no-underline transition-all duration-300 hover:scale-110 group cursor-pointer"
                                    >
                                        <span className="text-[#C778DD] group-hover:text-[#FFB3F6] transition-colors duration-300 text-[20px] sm:text-[24px]">#</span>
                                        <span className="text-white font-normal group-hover:text-[#E0B7FF] transition-colors duration-300 text-[20px] sm:text-[24px]">
                                            {item.label}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Mobile Action Buttons */}
                        <div className="flex flex-col gap-4 mb-8">
                            <button
                                onClick={downloadResume}
                                className="flex items-center justify-center gap-2 bg-[#C778DD] text-white px-6 py-3 rounded-md hover:bg-[#E0B7FF] transition-all duration-300 transform hover:scale-105 font-medium"
                            >
                                <Download className="w-5 h-5" />
                                Download Resume
                            </button>
                            <button
                                onClick={() => handleScroll('contact')}
                                className="flex items-center justify-center gap-2 border-2 border-[#C778DD] text-[#C778DD] px-6 py-3 rounded-md hover:bg-[#C778DD] hover:text-white transition-all duration-300 transform hover:scale-105 font-medium"
                            >
                                <Mail className="w-5 h-5" />
                                Get In Touch
                            </button>
                        </div>
                        
                        {/* Contact Info in Mobile Menu */}
                        <div className="text-center space-y-4 border-t border-white/20 pt-8">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-8 h-8 bg-[#C778DD] rounded-md flex items-center justify-center">
                                    <Code className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-[18px] font-bold text-[#C778DD]">Sanskar</p>
                            </div>
                            <p className="text-[#ABB2BF] text-[14px]">
                                sanskar2057@gmail.com
                            </p>
                            <p className="text-[#ABB2BF] text-[12px]">
                                Available for freelance work
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}