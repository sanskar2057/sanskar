"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Code2, Database, Layers } from "lucide-react";

export default function WorkSection() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const projects = [
        {
            title: "Employee Management System",
            description:
                "Enterprise multi-tenant monorepo platform for attendance, employee records, leave management, payroll, task tracking, tenant settings, and permission-based workflows.",
            technologies: [
                "React",
                "TypeScript",
                "Chakra UI",
                "TanStack Query",
                "Monorepo",
                "Multi-tenant",
                "REST API"
            ],
            highlights: [
                "Multi-tenant architecture",
                "Monorepo shared packages",
                "Role & permission system",
                "Attendance analytics",
                "Reusable UI system",
                "Tenant-based branding/settings"
            ],
            type: "Professional Work",
            icon: BriefcaseBusiness,
            featured: true,
        },
        {
            title: "Financial Assistance Management System",
            description:
                "Government workflow platform for managing grant schemes, applications, approvals, budgets, and Nepali-localized administrative processes.",
            technologies: ["React", "TypeScript", "Chakra UI", "REST API", "Localization"],
            highlights: [
                "Multi-stage approvals",
                "Budget control logic",
                "Nepali UI / dates",
                "Reusable forms",
                "Workflow automation",
            ],
            type: "Professional Work",
            icon: Layers,
            featured: true,
        },
        {
            title: "Loan Management System",
            description:
                "Loan and cooperative management interface for handling applications, approvals, installments, disbursements, and financial records.",
            technologies: ["React", "TypeScript", "Chakra UI", "REST API"],
            highlights: ["Loan workflows", "Reusable modals", "Data tables", "Responsive UI"],
            type: "Professional Work",
            icon: Database,
            featured: false,
        },
        {
            title: "Deerwalk Jobs Portal",
            description:
                "IT jobs platform for Nepal built with modern full-stack technologies, focusing on job listings, clean UX, and scalable web architecture.",
            technologies: ["Next.js", "Nest.js", "MongoDB", "TypeScript"],
            highlights: ["Production app", "Frontend + backend", "Job portal UX"],
            type: "Full Stack Project",
            icon: Code2,
            link: "https://jobs.deerwalktrainingcenter.com",
            featured: false,
        },
        {
            title: "Inventory Management System",
            description:
                "Web-based inventory tool for tracking stock, products, and sales with a classic backend-driven architecture.",
            technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
            highlights: ["Stock tracking", "Sales records", "Database design"],
            type: "Academic / Practical Build",
            icon: Database,
            github: "https://github.com/sanskar2057/Inventory-Management-System",
            featured: false,
        },
        {
            title: "Encrypted LAN Chat App",
            description:
                "Secure local network chat application built with Java socket programming and AES encryption.",
            technologies: ["Java", "Socket Programming", "AES Encryption"],
            highlights: ["Encryption", "Socket communication", "Desktop networking"],
            type: "Technical Build",
            icon: Code2,
            github: "https://github.com/sanskar2057/ChatApp",
            featured: false,
        },
    ];

    return (
        <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
                    <span className="text-[#C778DD]">#</span>selected-work
                </p>

                <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />

                <Link
                    href="https://github.com/sanskar2057"
                    target="_blank"
                    className="text-white text-[14px] sm:text-[16px] whitespace-nowrap hover:text-[#C778DD] transition-colors duration-300 group"
                >
                    GitHub{" "}
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
                        →
                    </span>
                </Link>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 mb-8 relative overflow-hidden">
                <div className="orbit-wheel w-40 h-40 left-[-70px] bottom-[-70px]" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10 items-center">
                    <div>
                        <p className="text-[#C778DD] text-sm mb-3">
                            Frontend-focused, full-stack capable
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                            Production dashboards, workflow systems, and scalable web apps.
                        </h2>
                    </div>

                    <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed">
                        My work focuses on building clean interfaces, reusable components,
                        API-driven dashboards, responsive layouts, and business workflows
                        using React, Next.js, TypeScript, Chakra UI, FastAPI, Node.js, and databases.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                {projects.map((project, index) => {
                    const Icon = project.icon ?? Code2;
                    return (
                        <div
                            key={project.title}
                            className={`card-glow relative overflow-hidden rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full ${project.featured
                                ? "glass-card border-[#C778DD]/70"
                                : "bg-[#2D323B]/80 border-white/10 hover:border-[#C778DD]/70"
                                }`}
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                                e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#C778DD]/10 via-transparent to-cyan-400/5 opacity-40 transition-opacity" />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-start justify-between gap-4 mb-5">
                                    <div className="w-11 h-11 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-[#C778DD]" />
                                    </div>

                                    <span className="text-[10px] sm:text-xs text-[#C778DD] bg-[#C778DD]/10 border border-[#C778DD]/20 px-2 py-1 rounded-full">
                                        {project.type}
                                    </span>
                                </div>

                                <h3 className="text-white text-lg sm:text-xl font-bold mb-3">
                                    {project.title}
                                </h3>

                                <p className="text-[#ABB2BF] text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[#C778DD] text-[10px] sm:text-xs bg-[#C778DD]/10 px-2 py-1 rounded-md border border-[#C778DD]/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-2 mb-5">
                                    {project.highlights.map((highlight) => (
                                        <div key={highlight} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C778DD]" />
                                            <p className="text-[#ABB2BF] text-xs sm:text-sm">
                                                {highlight}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 mt-auto pt-2">
                                    {project.github && (
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[#C778DD] text-sm hover:text-[#E0B7FF] transition-colors"
                                        >
                                            GitHub <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    )}

                                    {project.link && (
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[#C778DD] text-sm hover:text-[#E0B7FF] transition-colors"
                                        >
                                            Live <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    )}

                                    {!project.github && !project.link && (
                                        <span className="text-[#ABB2BF] text-xs">
                                            Private company project
                                        </span>
                                    )}
                                </div>
                            </div>

                            {hoveredProject === index && (
                                <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-[#C778DD]/10 blur-2xl" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}