"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home-component/HeroSection';
import WorkSection from '@/components/home-component/WorkSection';
import SkillSection from '@/components/home-component/SkillSection';
import AboutSection from '@/components/home-component/AboutSection';
import ContactSection from '@/components/home-component/ContactSection';

export default function Home() {
  const [footerVisible, setFooterVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for interactive wave effect
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // Scale movement for subtle effect
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen bg-wave text-white"
      style={
        {
          '--wave-offset-x': `${mousePosition.x}px`,
          '--wave-offset-y': `${mousePosition.y}px`,
        } as React.CSSProperties & Record<string, string>
      }
    >
      <Navbar setFooterVisible={setFooterVisible} />
      
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="home" className="min-h-[80vh] flex items-center">
            <HeroSection />
          </section>
          
          <section id="work" className="py-16 lg:py-20">
            <WorkSection />
          </section>
          
          <section id="skills" className="py-16 lg:py-20">
            <SkillSection />
          </section>
          
          <section id="about-me" className="py-16 lg:py-20">
            <AboutSection />
          </section>
          
          <section id="contact" className="py-16 lg:py-20">
            <ContactSection />
          </section>
        </div>
      </main>
      
      {footerVisible && <Footer />}
    </div>
  );
}