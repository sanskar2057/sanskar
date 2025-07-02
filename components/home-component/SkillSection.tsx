"use client"; // Mark as Client Component for potential interactivity

import React from "react";
import Image from "next/image";

export default function SkillSection() {
    const skills = {
        Languages: ["JavaScript", "TypeScript", "Python", "PHP", "Java"],
        Databases: ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "Redis"],
        Tools: ["VSCode", "Git", "Docker", "Figma", "Postman"],
        Other: ["Tailwind", "Socket Programming", "AES Encryption", "REST", "JWT", "GraphQL"],
        Frameworks: ["Next.js", "React", "FastAPI", "Nest.js", "Express.js"],
        Cloud: ["AWS", "Vercel", "Netlify", "Heroku", "Firebase"],
    };

    // Array of possible minimum height classes for variation
    const minHeightClasses = ["min-h-36", "min-h-40", "min-h-32", "min-h-44", "min-h-38", "min-h-42"];
    // Array of possible transform classes for slight offsets
    const offsetClasses = [
        "translate-y-2",
        "-translate-y-3",
        "translate-x-2",
        "-translate-x-1",
        "translate-y-3",
        "-translate-y-1",
    ];

    const decorativeShapes = [
        { src: "/skill-section/code.svg", alt: "Code Shape", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
        { src: "/skill-section/monitor.svg", alt: "Monitor Shape", size: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" },
        { src: "/skill-section/style.svg", alt: "Style Shape", size: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32" },
        { src: "/skill-section/square.svg", alt: "Square Shape", size: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" },
        { src: "/skill-section/git.svg", alt: "Git Shape", size: "w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14" },
    ];

    return (
        <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
                    <span className="text-[#C778DD]">#</span>skills
                </p>
                <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-12">
                {/* Left: Decorative Shapes */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 order-2 lg:order-1">
                    {/* Top Row: Left and Right */}
                    <div className="absolute top-0 left-0">
                        <Image
                            src={decorativeShapes[0].src}
                            alt={decorativeShapes[0].alt}
                            width={80}
                            height={80}
                            className={decorativeShapes[0].size + " animate-pulse hover:scale-110 transition-transform duration-300"}
                        />
                    </div>
                    <div className="absolute top-0 right-0">
                        <Image
                            src={decorativeShapes[1].src}
                            alt={decorativeShapes[1].alt}
                            width={48}
                            height={48}
                            className={decorativeShapes[1].size + " animate-bounce hover:scale-110 transition-transform duration-300"}
                        />
                    </div>
                    
                    {/* Center: Main Shape */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Image
                            src={decorativeShapes[2].src}
                            alt={decorativeShapes[2].alt}
                            width={128}
                            height={128}
                            className={decorativeShapes[2].size + " hover:rotate-12 transition-transform duration-500"}
                        />
                    </div>
                    
                    {/* Bottom Row: Left and Right */}
                    <div className="absolute bottom-0 left-0">
                        <Image
                            src={decorativeShapes[3].src}
                            alt={decorativeShapes[3].alt}
                            width={64}
                            height={64}
                            className={decorativeShapes[3].size + " animate-pulse hover:scale-110 transition-transform duration-300"}
                        />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image
                            src={decorativeShapes[4].src}
                            alt={decorativeShapes[4].alt}
                            width={56}
                            height={56}
                            className={decorativeShapes[4].size + " animate-bounce hover:scale-110 transition-transform duration-300"}
                        />
                    </div>
                </div>

                {/* Right: Skills Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 order-1 lg:order-2">
                    {Object.entries(skills).map(([category, items], index) => {
                        // Randomly select a minimum height and offset for each box
                        const randomMinHeight = minHeightClasses[index % minHeightClasses.length];
                        const randomOffset = offsetClasses[index % offsetClasses.length];

                        return (
                            <div
                                key={category}
                                className={`bg-[#2D323B] p-4 sm:p-5 md:p-6 rounded-lg shadow-lg border border-[#C778DD]/50 hover:border-[#C778DD] transform hover:scale-105 transition-all duration-300 hover:shadow-xl ${randomMinHeight} ${randomOffset}`}
                            >
                                <h3 className="text-white text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-bold mb-3">
                                    {category}
                                </h3>
                                <ul className="text-[#ABB2BF] text-[12px] sm:text-[13px] md:text-[14px] list-none space-y-1">
                                    {items.map((item, idx) => (
                                        <li 
                                            key={idx} 
                                            className="hover:text-[#C778DD] transition-colors duration-200 cursor-default"
                                        >
                                            • {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}