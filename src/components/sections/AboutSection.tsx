import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useThemeStore } from '../../store/themeStore';

const AboutSection: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const workExperience = [
    {
      company: "QuetzalShiva Gaming | Digital Dispatch Group | Remote",
      role: "Full Stack Developer",
      duration: "07/2024 - 02/2025",
      details: [
        "Engineered frontend applications with Next.js, delivering seamless and responsive user experiences.",
        "Designed and optimized backend systems using Node.js and PostgreSQL for efficient data management.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="w-full" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          <span className="text-[#C778DD]">#</span>about-me
        </h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-[#C778DD] to-transparent rounded-full" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Left: About Me */}
        <motion.div
          variants={itemVariants}
          className={`${
            isDarkMode ? 'bg-[#2D323B]' : 'bg-white'
          } p-6 rounded-xl shadow-lg border ${
            isDarkMode ? 'border-[#C778DD]/20' : 'border-gray-200'
          } relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#C778DD]/10 to-transparent rounded-bl-full" />
          
          <h3 className="text-xl font-bold mb-4 text-[#C778DD]">Who Am I?</h3>
          <p className={`${
            isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'
          } leading-relaxed text-sm sm:text-base`}>
            Hey there! I'm Sanskar Dhungana, a tech enthusiast and full-stack developer from Kathmandu, Nepal. 
            Armed with a Bachelor's in Computer Application from Deerwalk Institute of Technology, I dive headfirst 
            into crafting user-centric solutions with tools like MERN Stack, Next.js, and Nest.js. Whether it's 
            building the Deerwalk Jobs Portal or coding an encrypted chat app, I'm all about turning ideas into 
            reality with clean, efficient code. My journey spans development, system administration, and even 
            teaching digital skills in rural Nepal—proof of my adaptability and passion for innovation. I'm here 
            to solve problems, create value, and bring a bit of fun to every project!
          </p>
          
        </motion.div>

        {/* Right: Work Experience */}
        <motion.div
          variants={containerVariants}
          className="space-y-6"
        >
          {workExperience.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`${
                isDarkMode ? 'bg-[#2D323B]' : 'bg-white'
              } p-6 rounded-xl shadow-lg border ${
                isDarkMode ? 'border-[#C778DD]/20' : 'border-gray-200'
              } transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C778DD] to-[#E0B7FF]" />
              
              <h3 className="text-lg font-bold mb-2">
                {exp.role}
              </h3>
              <p className="text-[#C778DD] text-sm font-medium mb-1">
                @ {exp.company}
              </p>
              <p className={`text-xs mb-4 ${
                isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-500'
              }`}>
                {exp.duration}
              </p>
              
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'
              } text-sm`}>
                {exp.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C778DD] rounded-full mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;