"use client"; // Mark as Client Component for potential interactivity

import React, { useState } from "react";
import Link from "next/link";

export default function WorksSection() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const projects = [
        {
            title: "Deerwalk Jobs Portal",
            description: "Co-developed an IT jobs platform for Nepal using Next.js, Nest.js, and MongoDB during my work experience.",
            technologies: ["Next.js", "Nest.js", "MongoDB", "TypeScript"],
            link: "https://jobs.deerwalktrainingcenter.com",
            featured: true,
        },
        // {
        //     title: "E-Commerce Platform",
        //     description: "Built a full-featured e-commerce platform with React, Node.js, and PostgreSQL including payment integration.",
        //     technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        //     github: "https://github.com/sanskar2057/ecommerce-platform",
        // },
        {
            title: "Inventory Management System",
            description: "Built a web-based tool to track stock and sales using PHP, MySQL, HTML, and CSS with real-time updates.",
            technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
            github: "https://github.com/sanskar2057/Inventory-Management-System",
        },
        {
            title: "Encrypted LAN Chat App",
            description: "Developed an end-to-end encrypted chat app using Java, socket programming, and AES encryption for secure communication.",
            technologies: ["Java", "Socket Programming", "AES Encryption"],
            github: "https://github.com/sanskar2057/ChatApp",
        },
        // {
        //     title: "Task Management App",
        //     description: "Created a collaborative task management application with real-time updates using React and Firebase.",
        //     technologies: ["React", "Firebase", "Material-UI", "PWA"],
        //     github: "https://github.com/sanskar2057/task-manager",
        // },
        {
            title: "Wordle Game",
            description: "Created an interactive word game with JavaScript, HTML, and CSS featuring multiple difficulty levels.",
            technologies: ["JavaScript", "HTML", "CSS", "Local Storage"],
            github: "https://github.com/sanskar2057/Wordle",
        },
    ];

    return (
        <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
                    <span className="text-[#C778DD]">#</span>projects
                </p>
                <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
                <Link 
                    href="https://github.com/sanskar2057" 
                    target="_blank"
                    className="text-white text-[14px] sm:text-[16px] whitespace-nowrap hover:text-[#C778DD] transition-colors duration-300 group"
                >
                    View all <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`bg-[#2D323B] p-4 sm:p-5 md:p-6 rounded-lg shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                            project.featured 
                                ? 'border-[#C778DD] bg-gradient-to-br from-[#2D323B] to-[#C778DD]/5' 
                                : 'border-[#C778DD]/50 hover:border-[#C778DD]'
                        }`}
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {/* Featured Badge */}
                        {project.featured && (
                            <div className="mb-3">
                                <span className="bg-[#C778DD] text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Featured
                                </span>
                            </div>
                        )}

                        {/* Project Title */}
                        <h3 className="text-white text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-bold mb-3">
                            {project.title}
                        </h3>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                            {project.technologies.map((tech, techIndex) => (
                                <span 
                                    key={techIndex}
                                    className="text-[#C778DD] text-[10px] sm:text-[11px] bg-[#C778DD]/10 px-2 py-1 rounded-md border border-[#C778DD]/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-[#ABB2BF] text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed mb-4 flex-grow">
                            {project.description}
                        </p>

                        {/* Links */}
                        <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                            {project.github && (
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#C778DD] text-[12px] sm:text-[13px] md:text-[14px] hover:text-[#E0B7FF] transition-all duration-300 font-medium group"
                                >
                                    <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                                        GitHub ↗
                                    </span>
                                </Link>
                            )}
                            {project.link && (
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#C778DD] text-[12px] sm:text-[13px] md:text-[14px] hover:text-[#E0B7FF] transition-all duration-300 font-medium group"
                                >
                                    <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                                        Live Demo ↗
                                    </span>
                                </Link>
                            )}
                        </div>

                        {/* Hover Effect Overlay */}
                        {hoveredProject === index && (
                            <div className="absolute inset-0 bg-gradient-to-t from-[#C778DD]/10 to-transparent rounded-lg pointer-events-none transition-opacity duration-300" />
                        )}
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8 sm:mt-12">
                <Link
                    href="https://github.com/sanskar2057"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C778DD] text-white px-6 py-3 rounded-md hover:bg-[#E0B7FF] transition-all duration-300 transform hover:scale-105 font-medium"
                >
                    Explore More Projects
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
            </div>
        </div>
    );
}