"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { getPublishedProjects } from "@/lib/projects";
import { getWorkExperiences } from "@/lib/about";
import { downloadActiveResume } from "@/lib/resume";

const taglines = [
  "Frontend Developer",
  "Full Stack Developer",
  "React / Next.js Engineer",
];

const calculateYearsExperience = (startDate: string) => {
  if (!startDate) return "0+";

  const start = new Date(startDate);
  const now = new Date();

  const diffYears = now.getFullYear() - start.getFullYear();
  const hasAnniversaryPassed =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());

  const years = hasAnniversaryPassed ? diffYears : diffYears - 1;

  return `${Math.max(years, 0)}+`;
};

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [projectsBuilt, setProjectsBuilt] = useState("0+");
  const [yearsExperience, setYearsExperience] = useState("0+");
  const [currentlyBuilding, setCurrentlyBuilding] = useState("EMS / FAMIS UIs");

  useEffect(() => {
    const currentTagline = taglines[taglineIndex];

    const timeout = setTimeout(
      () => {
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
          setTimeout(() => setIsDeleting(true), 1200);
        }
      },
      isDeleting ? 45 : 85
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, taglineIndex, isDeleting]);

  useEffect(() => {
    const fetchHeroStats = async () => {
      try {
        const [projects, experiences] = await Promise.all([
          getPublishedProjects(),
          getWorkExperiences(),
        ]);

        setProjectsBuilt(`${projects.length}+`);

        const sortedExperiences = [...experiences].sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );

        if (sortedExperiences[0]?.startDate) {
          setYearsExperience(
            calculateYearsExperience(sortedExperiences[0].startDate)
          );
        }

        const buildingProjects = projects
          .filter((project) => project.currentlyBuilding)
          .map((project) => project.title);

        if (buildingProjects.length > 0) {
          setCurrentlyBuilding(buildingProjects.join(" / "));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroStats();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: yearsExperience, label: "Years Experience" },
    { value: projectsBuilt, label: "Projects Built" },
    { value: "Full-stack", label: "Frontend + Backend" },
  ];

  const socials = [
    {
      name: "GitHub",
      link: "https://github.com/sanskar2057",
      icon: Github,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/sanskar-dhungana-317320278/",
      icon: Linkedin,
    },
    {
      name: "Email",
      link: "mailto:sanskar2057@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <div className="w-full min-h-[70vh] flex items-center relative overflow-hidden pt-8 sm:pt-10 lg:pt-6">
      <div className="orbit-wheel w-56 h-56 left-[-110px] top-10 opacity-60" />
      <div className="orbit-wheel w-28 h-28 right-4 bottom-12 opacity-40" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-10 lg:gap-14 items-center relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="order-2 lg:order-1 text-center lg:text-left animate-fadeIn">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C778DD]/40 bg-[#C778DD]/10 px-4 py-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#C778DD]" />
            <span className="text-[#ABB2BF] text-xs sm:text-sm">
              Available for frontend / full-stack opportunities
            </span>
          </div>

          <h1 className="text-[34px] sm:text-[44px] md:text-[56px] lg:text-[62px] xl:text-[70px] font-bold leading-[1.05] tracking-tight">
            <span className="block">Building scalable web products</span>
            <span className="block">
              as a{" "}
              <span className="gradient-text inline-flex items-center h-[2.25em] min-w-[18ch] text-left overflow-hidden">
                {displayText}
                <span className="text-[#C778DD] animate-pulse">|</span>
              </span>
            </span>
          </h1>

          <p className="text-[#ABB2BF] text-[15px] sm:text-[17px] md:text-[18px] mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I’m Sanskar Dhungana, a developer from Kathmandu focused on React,
            Next.js, TypeScript, API-driven dashboards, reusable UI systems, and
            backend integrations using FastAPI, Node.js, and databases.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-7 justify-center lg:justify-start">
            <button
              className="inline-flex items-center justify-center gap-2 bg-[#C778DD] text-white rounded-xl py-3 px-6 hover:bg-[#E0B7FF] transition-all duration-300 hover:scale-105 font-medium hover-glow"
              onClick={() => scrollToSection("work")}
            >
              View Work
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 border border-[#C778DD] bg-transparent text-[#C778DD] rounded-xl py-3 px-6 hover:bg-[#C778DD] hover:text-white transition-all duration-300 hover:scale-105 font-medium hover-glow"
              onClick={downloadActiveResume}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 max-w-2xl mx-auto lg:mx-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-4 text-center lg:text-left"
              >
                <p className="text-white text-xl font-bold">{stat.value}</p>
                <p className="text-[#ABB2BF] text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6 justify-center lg:justify-start animate-slideIn">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-[#C778DD]/70 hover:bg-[#C778DD]/15 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5 text-[#C778DD]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end animate-fadeIn">
          <div className="relative float-animation">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#C778DD]/20 blur-3xl" />

            <div className="relative glass-card rounded-[2rem] p-3 sm:p-4">
              <div className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[360px] lg:h-[360px] xl:w-[420px] xl:h-[420px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/hero-section/user.PNG"
                  fill
                  alt="Sanskar Dhungana"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171D]/60 via-transparent to-transparent" />
              </div>

              <div className="absolute left-5 right-5 bottom-5 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md p-4">
                <p className="text-white text-sm font-semibold">
                  React • Next.js • TypeScript
                </p>
                <p className="text-[#ABB2BF] text-xs mt-1">
                  Dashboards, systems, APIs and scalable UI.
                </p>
              </div>
            </div>

            <div className="absolute -right-3 top-10 rounded-2xl glass-card px-4 py-3 hidden xl:block">
              <p className="text-[#C778DD] text-xs">Currently building</p>
              <p className="text-white text-sm font-medium">
                {currentlyBuilding}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
