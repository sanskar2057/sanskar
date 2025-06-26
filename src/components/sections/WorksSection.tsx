import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Search, Filter } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const WorksSection: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const projects = [
    {
      title: "Deerwalk Jobs Portal",
      description: "Co-developed an IT jobs platform for Nepal using Next.js, Nest.js, and MongoDB during my work experience.",
      link: "https://jobs.deerwalktrainingcenter.com",
      category: "Web",
      technologies: ["Next.js", "Nest.js", "MongoDB", "TypeScript"]
    },
    {
      title: "Inventory Management System",
      description: "Built a web-based tool to track stock and sales using PHP, MySQL, HTML, and CSS.",
      github: "https://github.com/sanskar2057/Inventory-Management-System",
      category: "Web",
      technologies: ["PHP", "MySQL", "HTML", "CSS"]
    },
    {
      title: "Encrypted LAN Chat App",
      description: "Developed an end-to-end encrypted chat app using Java, socket programming, and AES encryption.",
      github: "https://github.com/sanskar2057/ChatApp",
      category: "Desktop",
      technologies: ["Java", "Socket Programming", "AES Encryption"]
    },
    {
      title: "Wordle Game",
      description: "Created an interactive word game with JavaScript, HTML, and CSS.",
      github: "https://github.com/sanskar2057/Wordle",
      category: "Web",
      technologies: ["JavaScript", "HTML", "CSS"]
    }
  ];

  const categories = ['All', 'Web', 'Mobile', 'Desktop', 'Open Source'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || project.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
        className="flex items-center gap-4 mb-8"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          <span className="text-[#C778DD]">#</span>projects
        </h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-[#C778DD] to-transparent rounded-full" />
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#C778DD] transition-colors ${
              isDarkMode 
                ? 'bg-[#2D323B] border-[#C778DD]/20 text-white placeholder-[#ABB2BF]' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className={`h-5 w-5 ${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-400'}`} />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#C778DD] transition-colors ${
              isDarkMode 
                ? 'bg-[#2D323B] border-[#C778DD]/20 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className={`${
              isDarkMode ? 'bg-[#2D323B]' : 'bg-white'
            } p-6 rounded-xl shadow-lg border transition-all duration-300 relative overflow-hidden ${
              isDarkMode ? 'border-[#C778DD]/20 hover:border-[#C778DD]/50' : 'border-gray-200 hover:border-[#C778DD]/50'
            }`}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#C778DD]/10 to-transparent rounded-bl-full" />
            
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isDarkMode ? 'bg-[#C778DD]/20 text-[#C778DD]' : 'bg-[#C778DD]/10 text-[#C778DD]'
                }`}>
                  {project.category}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-2 py-1 text-xs rounded ${
                      isDarkMode ? 'bg-[#1a1d23] text-[#ABB2BF]' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 text-[#C778DD] hover:text-[#E0B7FF] transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span className="text-sm">Code</span>
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 text-[#C778DD] hover:text-[#E0B7FF] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">Live</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className={`text-lg ${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-500'}`}>
            No projects found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default WorksSection;