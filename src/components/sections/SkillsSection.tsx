import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Wrench, Settings, Layout } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const SkillsSection: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skills = {
    Languages: {
      icon: Code2,
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "PHP", level: 75 },
        { name: "Java", level: 70 }
      ]
    },
    Databases: {
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "MySQL", level: 75 },
        { name: "SQLite", level: 70 }
      ]
    },
    Tools: {
      icon: Wrench,
      skills: [
        { name: "VSCode", level: 95 },
        { name: "Git", level: 90 },
        { name: "Figma", level: 75 }
      ]
    },
    Other: {
      icon: Settings,
      skills: [
        { name: "Tailwind", level: 90 },
        { name: "Socket Programming", level: 80 },
        { name: "AES Encryption", level: 75 },
        { name: "REST", level: 90 },
        { name: "JWT", level: 85 }
      ]
    },
    Frameworks: {
      icon: Layout,
      skills: [
        { name: "Next.js", level: 90 },
        { name: "Nest.js", level: 85 },
        { name: "React", level: 95 },
        { name: "Express.js", level: 85 }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
          <span className="text-[#C778DD]">#</span>skills
        </h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-[#C778DD] to-transparent rounded-full" />
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(skills).map(([category, categoryData]) => {
          const IconComponent = categoryData.icon;
          const isSelected = selectedCategory === category;
          
          return (
            <motion.div
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedCategory(isSelected ? null : category)}
              className={`${
                isDarkMode ? 'bg-[#2D323B]' : 'bg-white'
              } p-6 rounded-xl shadow-lg border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                isDarkMode ? 'border-[#C778DD]/20 hover:border-[#C778DD]/50' : 'border-gray-200 hover:border-[#C778DD]/50'
              } ${isSelected ? 'ring-2 ring-[#C778DD] border-[#C778DD]' : ''}`}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C778DD]/10 to-transparent rounded-bl-full" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#C778DD]/10 rounded-lg">
                  <IconComponent className="h-6 w-6 text-[#C778DD]" />
                </div>
                <h3 className="text-lg font-bold">{category}</h3>
              </div>

              <div className="space-y-3">
                {categoryData.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm ${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'}`}>
                        {skill.name}
                      </span>
                      {isSelected && (
                        <span className="text-xs text-[#C778DD] font-medium">
                          {skill.level}%
                        </span>
                      )}
                    </div>
                    
                    {isSelected && (
                      <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-[#1a1d23]' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-[#C778DD] to-[#E0B7FF] rounded-full"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className={`text-center mt-8 text-sm ${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-500'}`}
      >
        Click on a skill category to see proficiency levels
      </motion.p>
    </div>
  );
};

export default SkillsSection;