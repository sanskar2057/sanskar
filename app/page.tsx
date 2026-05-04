"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home-component/HeroSection";
import WorkSection from "@/components/home-component/WorkSection";
import SkillSection from "@/components/home-component/SkillSection";
import AboutSection from "@/components/home-component/AboutSection";
import ContactSection from "@/components/home-component/ContactSection";
import TechPlaygroundSection from "@/components/home-component/TechPlaygroundSection";
import SectionReveal from "@/components/SectionReveal";
import BlogSection from "@/components/home-component/BlogSection";

export default function Home() {
  const [footerVisible, setFooterVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 24,
        y: (e.clientY / window.innerHeight - 0.5) * 24,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen bg-portfolio text-white"
      style={
        {
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        } as React.CSSProperties & Record<string, string>
      }
    >
      <Navbar setFooterVisible={setFooterVisible} />

      <main className="pt-24 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section id="home" className="min-h-[85vh] flex items-center">
            <HeroSection />
          </section>

          <section id="work" className="py-16 lg:py-20">
            <SectionReveal>
              <WorkSection />
            </SectionReveal>
          </section>

          <section id="tech-playground" className="py-16 lg:py-20">
            <SectionReveal>
              <TechPlaygroundSection />
            </SectionReveal>
          </section>

          <section id="blogs" className="py-16 lg:py-20">
            <SectionReveal>
              <BlogSection />
            </SectionReveal>
          </section>

          <section id="skills" className="py-16 lg:py-20">
            <SectionReveal>
              <SkillSection />
            </SectionReveal>
          </section>

          <section id="about-me" className="py-16 lg:py-20">
            <SectionReveal>
              <AboutSection />
            </SectionReveal>
          </section>

          <section id="contact" className="py-16 lg:py-20">
            <SectionReveal>
              <ContactSection />
            </SectionReveal>
          </section>
        </div>
      </main>

      {footerVisible && <Footer />}
    </div>
  );
}