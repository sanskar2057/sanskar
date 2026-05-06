"use client";

import React, { useEffect, useState } from "react";
import {
  Building2,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { getQuickFacts, getWorkExperiences } from "@/lib/about";
import { QuickFact, WorkExperience } from "@/types/about";

const factIconMap = {
  MapPin,
  GraduationCap,
  Sparkles,
};

const formatMonthYear = (date: string) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const getDuration = (experience: WorkExperience) => {
  const start = formatMonthYear(experience.startDate);
  const end = experience.isPresent
    ? "Present"
    : formatMonthYear(experience.endDate);

  return `${start} - ${end}`;
};

export default function AboutSection() {
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [quickFacts, setQuickFacts] = useState<QuickFact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [experienceData, factsData] = await Promise.all([
          getWorkExperiences(),
          getQuickFacts(),
        ]);

        setWorkExperience(experienceData);
        setQuickFacts(factsData);
      } catch (error) {
        console.error(error);
        setWorkExperience([]);
        setQuickFacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

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
              Developer focused on building useful products, not just pretty
              screens.
            </h2>

            <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed">
              I’m Sanskar Dhungana, a frontend-focused full-stack developer from
              Kathmandu. I work mostly with React, Next.js, TypeScript, Chakra
              UI, FastAPI, Node.js, and databases to build dashboards, business
              systems, admin panels, and production web applications.
            </p>

            <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed mt-4">
              My current work includes enterprise systems like employee
              management, attendance analytics, financial assistance workflows,
              reusable tables, modals, filters, forms, tenant configuration, and
              responsive interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading
              ? [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-20 bg-[#2D323B]/80 border border-white/10 rounded-2xl animate-pulse"
                  />
                ))
              : quickFacts.map((fact) => {
                  const Icon =
                    factIconMap[fact.icon as keyof typeof factIconMap] ||
                    Sparkles;

                  return (
                    <div
                      key={fact.id}
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
            {loading
              ? [1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative sm:pl-14">
                    <div className="bg-[#2D323B]/80 border border-white/10 rounded-2xl h-52 animate-pulse" />
                  </div>
                ))
              : workExperience.map((exp) => (
                  <div
                    key={exp.id}
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
                          {getDuration(exp)}
                        </span>
                      </div>

                      <div
                        className="about-details prose prose-invert prose-sm max-w-none mt-4
                          prose-p:text-[#ABB2BF]
                          prose-li:text-[#ABB2BF]
                          prose-strong:text-white
                          prose-a:text-[#C778DD]"
                        dangerouslySetInnerHTML={{ __html: exp.details }}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}