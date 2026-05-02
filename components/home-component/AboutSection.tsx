"use client";

import React from "react";
import { Building2, GraduationCap, MapPin, Sparkles } from "lucide-react";

export default function AboutSection() {
  const workExperience = [
    {
      company: "Arclogi Pvt. Ltd.",
      location: "Dhumbarahi, Kathmandu, Nepal",
      role: "Full Stack Developer",
      duration: "May 2025 - Present",
      details: [
        "Building enterprise dashboards and internal systems using React, TypeScript, Chakra UI, and API-driven architecture.",
        "Working on EMS and FAMIS products with attendance, leave, payroll, approval workflows, tenant settings, and responsive admin interfaces.",
        "Creating reusable UI components, table systems, modals, forms, filters, and frontend state patterns for scalable development.",
      ],
    },
    {
      company: "Josan International",
      location: "Ganganagar, Rajasthan, India · Remote",
      role: "Full Stack Developer",
      duration: "Jul 2024 - Apr 2025",
      details: [
        "Developed frontend applications with Next.js and backend systems with Node.js and PostgreSQL.",
        "Integrated REST APIs, optimized user flows, and improved frontend responsiveness across devices.",
        "Worked on production features, debugging, performance improvements, and maintainable code structure.",
      ],
    },
    {
      company: "Deerwalk Compware",
      location: "Kathmandu, Nepal",
      role: "Full Stack Developer",
      duration: "Dec 2023 - Jul 2024",
      details: [
        "Built and improved web applications using Next.js, Nest.js, MongoDB, and TypeScript.",
        "Contributed to the Deerwalk Jobs Portal with clean UI, backend integration, and production-ready features.",
        "Collaborated with designers and developers to deliver responsive, maintainable interfaces.",
      ],
    },
    {
      company: "Deerwalk Institute of Technology / Edutech Nepal",
      location: "Chaurjahari, Rukum West, Nepal",
      role: "Teaching Fellowship",
      duration: "Nov 2024 - Dec 2024",
      details: [
        "Taught computer literacy to students and teachers in a rural school environment.",
        "Configured computer lab systems and supported practical learning with productivity tools.",
        "Led workshops on troubleshooting, digital skills, and basic computer usage.",
      ],
    },
  ];

  const quickFacts = [
    {
      label: "Location",
      value: "Kathmandu, Nepal",
      icon: MapPin,
    },
    {
      label: "Education",
      value: "Bachelor in Computer Application",
      icon: GraduationCap,
    },
    {
      label: "Focus",
      value: "Frontend-heavy full-stack development",
      icon: Sparkles,
    },
  ];

  return (
    <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0 xl:px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
          <span className="text-[#C778DD]">#</span>about
        </p>
        <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-8">
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="orbit-wheel w-40 h-40 right-[-75px] bottom-[-75px] opacity-50" />

            <p className="text-[#C778DD] text-sm mb-3">Who I am</p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Developer focused on building useful products, not just pretty screens.
            </h2>

            <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed">
              I’m Sanskar Dhungana, a frontend-focused full-stack developer from
              Kathmandu. I work mostly with React, Next.js, TypeScript, Chakra UI,
              FastAPI, Node.js, and databases to build dashboards, business systems,
              admin panels, and production web applications.
            </p>

            <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed mt-4">
              My current work includes enterprise systems like employee management,
              attendance analytics, financial assistance workflows, reusable tables,
              modals, filters, forms, tenant configuration, and responsive interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;

              return (
                <div
                  key={fact.label}
                  className="bg-[#2D323B]/80 border border-white/10 rounded-2xl p-4 flex items-start gap-4 hover:border-[#C778DD]/70 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#C778DD]" />
                  </div>

                  <div>
                    <p className="text-[#ABB2BF] text-xs">{fact.label}</p>
                    <p className="text-white text-sm sm:text-base font-medium mt-1">
                      {fact.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#C778DD] via-[#C778DD]/40 to-transparent hidden sm:block" />

          <div className="space-y-5">
            {workExperience.map((exp) => (
              <div
                key={`${exp.company}-${exp.duration}`}
                className="relative sm:pl-14"
              >
                <div className="absolute left-[13px] top-6 w-4 h-4 rounded-full bg-[#C778DD] shadow-[0_0_20px_rgba(199,120,221,0.8)] hidden sm:block" />

                <div className="bg-[#2D323B]/80 border border-white/10 hover:border-[#C778DD]/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#C778DD]" />
                        <h3 className="text-white text-base sm:text-lg font-bold">
                          {exp.role}
                        </h3>
                      </div>

                      <p className="text-[#ABB2BF] text-sm mt-2">
                        {exp.company}
                      </p>

                      <p className="text-[#ABB2BF]/80 text-xs mt-1">
                        {exp.location}
                      </p>
                    </div>

                    <span className="text-[#C778DD] text-xs sm:text-sm border border-[#C778DD]/30 bg-[#C778DD]/10 rounded-full px-3 py-1 whitespace-nowrap w-fit">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {exp.details.map((detail) => (
                      <li key={detail} className="flex gap-2 text-[#ABB2BF] text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C778DD] mt-2 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}