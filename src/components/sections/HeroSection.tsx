import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const HeroSection: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
          >
            Sanskar is a{' '}
            <span className="text-[#C778DD] relative">
              Full Stack Developer
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C778DD] to-[#E0B7FF] transform origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-lg sm:text-xl leading-relaxed ${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'}`}
          >
            He builds innovative, full-stack solutions that blend cutting-edge technology with practical problem-solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(199, 120, 221, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#C778DD] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#E0B7FF] flex items-center justify-center gap-2"
            >
              Contact me!
            </motion.button>

            <motion.a
              href="Sanskar_Resume.pdf" // Add your CV file path here
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`border-2 border-[#C778DD] text-[#C778DD] px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#C778DD] hover:text-white flex items-center justify-center gap-2 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}
            >
              <Download className="h-5 w-5" />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Content - Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Decorative elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -right-4 w-24 h-24 border-4 border-[#C778DD] rounded-full opacity-20"
            />

            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-[#C778DD] rounded-lg opacity-20"
            />

            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#2D323B]' : 'bg-gray-200'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C778DD]/20 to-transparent" />
              <img
                src="/user.PNG" // Add your image path here later
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode
            ? 'text-[#ABB2BF] hover:text-[#C778DD]'
            : 'text-gray-600 hover:text-[#C778DD]'
            }`}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;