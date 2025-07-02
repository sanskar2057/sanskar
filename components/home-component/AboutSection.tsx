"use client"; // Mark as Client Component for potential interactivity

import React from "react";

export default function AboutSection() {
    const workExperience = [
        {
            company: "Arclogi Pvt Ltd | Dhumbarahi, Kathmandu, Nepal",
            role: "Full Stack Developer",
            duration: "05/2025 - Present",
            details: [
                "Developing modern web applications using React and Next.js for frontend development.",
                "Building robust backend systems with FastAPI for high-performance data processing.",
                "Implementing responsive UI/UX designs with focus on user experience optimization.",
                "Collaborating with cross-functional teams to deliver scalable software solutions.",
            ],
        },
        {
            company: "Josan International | Ganganagar, Rajasthan, India (Remote)",
            role: "Full Stack Developer", 
            duration: "07/2024 - 04/2025",
            details: [
                "Engineered frontend applications with Next.js, delivering seamless and responsive user experiences.",
                "Designed and optimized backend systems using Node.js and PostgreSQL for efficient data management.",
                "Developed RESTful APIs and integrated third-party services for enhanced functionality.",
                "Maintained code quality through testing, debugging, and performance optimization.",
            ],
        },
        {
            company: "Deerwalk Institute of Technology | Edutech Nepal | Chaurjahari, Rukum (West)",
            role: "Teaching Fellowship",
            duration: "11/2024 - 12/2024",
            details: [
                "Revitalized school's computer lab by configuring operational systems and proposing solutions for damaged hardware.",
                "Trained students (grades 6-10) and teachers in computer literacy, emphasizing typing skills and productivity tools (MS Word, PowerPoint).",
                "Led workshops on troubleshooting and computer usage, boosting digital proficiency in a rural setting.",
            ],
        },
        {
            company: "Deerwalk Compware | Kathmandu, Bagmati",
            role: "Full Stack Developer",
            duration: "12/2023 - 07/2024",
            details: [
                "Developed responsive frontend interfaces and robust backend systems, ensuring seamless integration for web applications.",
                "Collaborated with designers to implement UI/UX designs, optimizing performance across browsers and devices.",
                "Enhanced Deerwalk Jobs portal (jobs.deerwalktrainingcenter.com) with clean, maintainable code using Next.js and Nest.js.",
                "Conducted code reviews and debugging to uphold high-quality standards.",
            ],
        },
    ];

    return (
        <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0 xl:px-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
                    <span className="text-[#C778DD]">#</span>about-me
                </p>
                <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 xl:gap-12">
                {/* Left: About Me Paragraph */}
                <div className="bg-[#2D323B] p-4 sm:p-5 md:p-6 rounded-lg shadow-lg border border-[#C778DD]/50 transform hover:scale-105 transition-transform duration-300 h-fit">
                    <h2 className="text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-3 sm:mb-4">
                        Who Am I?
                    </h2>
                    <p className="text-[#ABB2BF] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
                        Hey there! I'm Sanskar Dhungana, a passionate full-stack developer from Kathmandu, Nepal. Armed with a Bachelor's in Computer Application from Deerwalk Institute of Technology, I specialize in building modern web applications using the MERN Stack, Next.js, FastAPI, and cutting-edge technologies.
                    </p>
                    <p className="text-[#ABB2BF] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mt-3">
                        From developing the Deerwalk Jobs Portal to creating encrypted chat applications, I'm dedicated to turning innovative ideas into reality with clean, efficient code. My journey spans development, system administration, and teaching digital skills in rural Nepal—showcasing my adaptability and commitment to making technology accessible.
                    </p>
                </div>

                {/* Right: Work Experience */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    {workExperience.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-[#2D323B] p-4 sm:p-5 md:p-6 rounded-lg shadow-lg border border-[#C778DD]/50 hover:border-[#C778DD] transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                <h3 className="text-white text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-bold">
                                    {exp.role}
                                </h3>
                                <span className="text-[#C778DD] text-[12px] sm:text-[13px] md:text-[14px] font-medium whitespace-nowrap">
                                    {exp.duration}
                                </span>
                            </div>
                            <p className="text-[#ABB2BF] text-[13px] sm:text-[14px] mb-3 font-medium">
                                {exp.company}
                            </p>
                            <ul className="text-[#ABB2BF] text-[12px] sm:text-[13px] md:text-[14px] list-disc pl-4 space-y-1">
                                {exp.details.map((detail, idx) => (
                                    <li key={idx} className="leading-relaxed">{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}