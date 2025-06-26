import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import WorksSection from './components/sections/WorksSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import { useThemeStore } from './store/themeStore';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#282C33] text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar />
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="container mx-auto px-4 pt-20"
      >
        <section id="home" className="min-h-screen flex items-center">
          <HeroSection />
        </section>
        
        <section id="about" className="min-h-screen flex items-center">
          <AboutSection />
        </section>
        
        <section id="skills" className="min-h-screen flex items-center">
          <SkillsSection />
        </section>
        
        <section id="work" className="min-h-screen flex items-center">
          <WorksSection />
        </section>
        
        <section id="contact" className="min-h-screen flex items-center">
          <ContactSection />
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;