"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const taglines = ["Full Stack Developer", "Tech Enthusiast"];

  useEffect(() => {
    const currentTagline = taglines[taglineIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < currentTagline.length) {
        setDisplayText((prev) => prev + currentTagline[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
      } else if (currentIndex === currentTagline.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, taglineIndex, isDeleting, taglines]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className="min-h-[50vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center relative overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left animate-fadeIn">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] font-bold leading-tight">
            Sanskar is a{" "}
            <span className="text-[#C778DD] inline-block min-w-[200px] sm:min-w-[250px] text-left">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-[#ABB2BF] text-[14px] sm:text-[16px] md:text-[18px] mt-6 sm:mt-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
            He builds innovative, full-stack solutions that blend cutting-edge technology with practical problem-solving to create meaningful digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
            <button
              className="border-2 border-[#C778DD] bg-transparent text-[#C778DD] rounded-md py-3 px-6 hover:bg-[#C778DD] hover:text-white transition-all duration-300 transform hover:scale-105 font-medium hover-glow"
              onClick={scrollToContact}
            >
              Contact me !!
            </button>
            <button
              className="bg-[#C778DD] text-white rounded-md py-3 px-6 hover:bg-[#E0B7FF] transition-all duration-300 transform hover:scale-105 font-medium hover-glow"
              onClick={downloadResume}
            >
              Download Resume
            </button>
          </div>
          {/* Social Media Links */}
          <div className="flex gap-4 mt-6 justify-center lg:justify-start animate-slideIn">
            {[
              { name: "GitHub", link: "https://github.com/sanskar2057", icon: "/social-media/github.svg" },
              { name: "LinkedIn", link: "https://www.linkedin.com/in/sanskar-dhungana-317320278/", icon: "/social-media/linkedin.svg" },
              { name: "WhatsApp", link: "https://wa.me/+9779861797766", icon: "/social-media/whatsapp.svg" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#C778DD]/20 hover:bg-[#C778DD]/50 transition-all duration-300 hover-glow"
              >
                <Image src={social.icon} width={24} height={24} alt={social.name} className="w-6 h-6" />
              </a>
            ))}
          </div>
          {/* Skill Progress Bars */}
          <div className="mt-6 space-y-2 animate-bounceIn">
            {[
              { skill: "JavaScript", progress: 90 },
              { skill: "React", progress: 85 },
              { skill: "Node.js", progress: 80 },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-[#ABB2BF] text-[14px] sm:text-[16px] w-24">{item.skill}</span>
                <div className="flex-1 bg-[#2D323B] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C778DD] h-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Side - Image and Decorations */}
        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end animate-fadeIn">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-50">
            <Image src="/hero-section/style.svg" width={80} height={80} alt="Style" className="w-full h-full" />
          </div>
          <div className="relative group">
            <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[320px] lg:h-[320px] xl:w-[380px] xl:h-[380px] relative">
              <Image
                src="/hero-section/user.PNG"
                fill
                alt="Sanskar Dhungana"
                className="rounded-2xl object-cover shadow-2xl group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(199,120,221,0.4)] transition-all duration-300"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#C778DD]/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}