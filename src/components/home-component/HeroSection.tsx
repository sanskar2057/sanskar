"use client"
import Image from "next/image";
import React from "react";

export default function HeroSection() {
    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 flex items-center justify-center">
                    <Image
                        src="/hero-section/user.PNG"
                        width={300}
                        height={300}
                        alt="User"
                        className="rounded-2xl mix-blend-lighten shadow-lg opacity-90"
                    />
                </div>
                <div className="flex-1">
                    <p className="text-[32px] font-[700]">
                        Sanskar is a <span className="text-[#C778DD]">Full Stack Developer</span>
                    </p>
                    <p className="text-[#ABB2B] text-[16px] mt-8">
                        He builds innovative, full-stack solutions that blend cutting-edge technology with practical problem-solving.
                    </p>
                    <button
                        className="border border-[#C778DD] rounded-md py-2 px-4 mt-4 hover:opacity-80 cursor-pointer"
                        onClick={scrollToContact}
                    >
                        Contact me !!
                    </button>
                </div>
                <div className="flex-1">
                    <Image src="/hero-section/style.svg" width={155} height={155} alt="Style" />
                </div>
            </div>
        </div>
    );
}
