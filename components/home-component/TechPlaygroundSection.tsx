"use client";

import React, { useState } from "react";
import { Gamepad2, Code2, Sparkles, X } from "lucide-react";
import WordleGame from "../playground/WordleGame";

export default function TechPlaygroundSection() {
    const [isWordleOpen, setIsWordleOpen] = useState(false);

    return (
        <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
                    <span className="text-[#C778DD]">#</span>tech-playground
                </p>
                <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-stretch">
                <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden">
                    <div className="orbit-wheel w-32 h-32 right-[-40px] top-[-40px]" />

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#C778DD]/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#C778DD]" />
                        </div>
                        <p className="text-[#C778DD] text-sm">Interactive frontend experiments</p>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                        Small builds that show logic, UI polish, and creativity.
                    </h2>

                    <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed max-w-2xl">
                        This section is for technical mini-projects that are not full case studies,
                        but still show frontend thinking: state management, keyboard interactions,
                        animations, responsive design, and clean component structure.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                        {[
                            { label: "React State", icon: Code2 },
                            { label: "Game Logic", icon: Gamepad2 },
                            { label: "Animations", icon: Sparkles },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-[#C778DD]/60 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5 text-[#C778DD] mb-3" />
                                    <p className="text-white text-sm font-medium">{item.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-[#C778DD] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C778DD]/10 via-transparent to-cyan-400/10 opacity-80" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-xs text-[#C778DD] border border-[#C778DD]/40 rounded-full px-3 py-1">
                                Playable Build
                            </span>
                            <Gamepad2 className="w-6 h-6 text-[#C778DD]" />
                        </div>

                        <h3 className="text-2xl font-bold mb-3">Wordle Clone</h3>

                        <p className="text-[#ABB2BF] text-sm leading-relaxed mb-5">
                            A word guessing game rebuilt as a React component with custom
                            validation, keyboard input, win/loss state, and tile reveal animation.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {["React", "TypeScript", "State Logic", "Keyboard Events"].map((tech) => (
                                <span
                                    key={tech}
                                    className="text-[#C778DD] text-xs bg-[#C778DD]/10 px-2 py-1 rounded-md border border-[#C778DD]/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsWordleOpen(true)}
                            className="w-full bg-[#C778DD] text-white py-3 rounded-xl hover:bg-[#E0B7FF] transition-all duration-300 font-medium hover:scale-[1.02]"
                        >
                            Play Wordle
                        </button>
                    </div>
                </div>
            </div>

            {isWordleOpen && (
                <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-start justify-center px-4 pt-24 pb-6 overflow-y-auto">
                    <div className="relative w-full max-w-xl glass-card rounded-2xl p-4 sm:p-6 my-auto">
                        <button
                            onClick={() => setIsWordleOpen(false)}
                            className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Close Wordle"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        <WordleGame />
                    </div>
                </div>
            )}
        </div>
    );
}