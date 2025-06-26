import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Heart, Github, Linkedin, Mail } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const Footer: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  const socials = [
    {
      name: "GitHub",
      link: "https://github.com/sanskar2057",
      icon: Github,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/sanskar-dhungana",
      icon: Linkedin,
    },
    {
      name: "Email",
      link: "mailto:sanskar2057@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode ? 'bg-[#2D323B] border-[#C778DD]/20' : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-[#C778DD]" />
              <span className="text-xl font-bold">Sanskar</span>
            </div>
            <p className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'
            }`}>
              Full Stack Developer passionate about creating innovative solutions and building amazing user experiences.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {['Home', 'About', 'Skills', 'Work', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={`text-sm text-left transition-colors duration-200 hover:text-[#C778DD] ${
                    isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Me</h3>
            <div className="flex space-x-4">
              {socials.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#1a1d23] hover:bg-[#C778DD]/20' 
                        : 'bg-gray-100 hover:bg-[#C778DD]/20'
                    } text-[#C778DD] hover:text-[#E0B7FF]`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className={`mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDarkMode ? 'border-[#C778DD]/20' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-2 text-sm">
            <span className={isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'}>
              Made 
            </span>
            
            <span className={isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'}>
              by Sanskar Dhungana
            </span>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'}`}>
            © 2024 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;