"use client";

import React, { useEffect, useState } from "react";
import {
  Braces,
  Database,
  Figma,
  GitBranch,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { getSkillGroups } from "@/lib/skills";
import { SkillGroup } from "@/types/skills";

const iconMap = {
  Braces,
  Database,
  Figma,
  GitBranch,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
};

export default function SkillSection() {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillGroups = async () => {
      try {
        const data = await getSkillGroups();
        setSkillGroups(data);
      } catch (error) {
        console.error(error);
        setSkillGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillGroups();
  }, []);

  const workflow = [
    {
      label: "Design to UI",
      icon: Figma,
    },
    {
      label: "API Integration",
      icon: GitBranch,
    },
    {
      label: "Reusable Systems",
      icon: Sparkles,
    },
  ];

  return (
    <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
          <span className="text-[#C778DD]">#</span>skills
        </p>
        <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 mb-8">
        <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden">
          <div className="orbit-wheel w-44 h-44 right-[-80px] top-[-80px] opacity-50" />

          <p className="text-[#C778DD] text-sm mb-3">My engineering toolkit</p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
            I build frontend-heavy products with full-stack understanding.
          </h2>

          <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed">
            My strongest area is React/Next.js frontend development, but I also
            work comfortably with APIs, backend services, databases, auth flows,
            and deployment-ready web applications.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            {workflow.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:border-[#C778DD]/60 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-[#C778DD] mb-3" />
                  <p className="text-white text-sm font-medium">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8">
          <p className="text-[#C778DD] text-sm mb-4">Core strengths</p>

          <div className="space-y-4">
            {[
              {
                name: "React / Next.js Development",
                value: "Frontend systems, dashboards, forms, tables, and layouts",
              },
              {
                name: "API Integration",
                value:
                  "Auth, CRUD flows, filtering, pagination, errors, and state handling",
              },
              {
                name: "Full-stack Delivery",
                value:
                  "Backend understanding with FastAPI, Node.js, and databases",
              },
            ].map((item) => (
              <div key={item.name} className="border-l-2 border-[#C778DD] pl-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  {item.name}
                </h3>
                <p className="text-[#ABB2BF] text-xs sm:text-sm mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-64 rounded-2xl bg-[#2D323B]/80 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : skillGroups.length === 0 ? (
        <div className="bg-[#2D323B]/80 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-white font-semibold">No skills added yet.</p>
          <p className="text-[#ABB2BF] text-sm mt-2">
            Skills will appear here once added from the CMS.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon as keyof typeof iconMap] || Layers;

            return (
              <div
                key={group.id}
                className="card-glow bg-[#2D323B]/80 border border-white/10 hover:border-[#C778DD]/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();

                  e.currentTarget.style.setProperty(
                    "--x",
                    `${e.clientX - rect.left}px`
                  );
                  e.currentTarget.style.setProperty(
                    "--y",
                    `${e.clientY - rect.top}px`
                  );
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#C778DD]" />
                </div>

                <h3 className="text-white text-lg font-bold mb-2">
                  {group.title}
                </h3>

                <p className="text-[#ABB2BF] text-sm leading-relaxed mb-4">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {group.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="text-[#C778DD] text-xs bg-[#C778DD]/10 px-2 py-1 rounded-md border border-[#C778DD]/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}