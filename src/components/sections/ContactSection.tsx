import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const ContactSection: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socials = [
    {
      name: "GitHub",
      link: "https://github.com/sanskar2057",
      icon: Github,
      color: "hover:text-gray-900"
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/sanskar-dhungana",
      icon: Linkedin,
      color: "hover:text-blue-600"
    },
    {
      name: "WhatsApp",
      link: "https://wa.me/+9779861797766",
      icon: MessageCircle,
      color: "hover:text-green-500"
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sanskar2057@gmail.com",
      link: "mailto:sanskar2057@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 986-1797766",
      link: "tel:+9779861797766"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kathmandu, Nepal",
      link: null
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending...');

    // Simulate API call - replace with actual email service
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          <span className="text-[#C778DD]">#</span>contact
        </h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-[#C778DD] to-transparent rounded-full" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Left: Contact Form */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Let's work together</h3>
            <p className={`${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-600'} leading-relaxed`}>
              I'm interested in freelance opportunities. Also, if you have any other requests or questions, don't hesitate to contact me!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#C778DD] transition-colors ${
                    isDarkMode 
                      ? 'bg-[#2D323B] border-[#C778DD]/20 text-white placeholder-[#ABB2BF]' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#C778DD] transition-colors ${
                    isDarkMode 
                      ? 'bg-[#2D323B] border-[#C778DD]/20 text-white placeholder-[#ABB2BF]' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#C778DD] transition-colors resize-none ${
                  isDarkMode 
                    ? 'bg-[#2D323B] border-[#C778DD]/20 text-white placeholder-[#ABB2BF]' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#C778DD] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#E0B7FF] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </motion.button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg text-center font-medium ${
                  status === "Message sent successfully!"
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : status === "Sending..."
                    ? 'bg-[#C778DD]/20 text-[#C778DD] border border-[#C778DD]/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {status}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Right: Contact Info */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Contact Information */}
          <div className={`${
            isDarkMode ? 'bg-[#2D323B]' : 'bg-white'
          } p-6 rounded-xl shadow-lg border ${
            isDarkMode ? 'border-[#C778DD]/20' : 'border-gray-200'
          }`}>
            <h3 className="text-lg font-bold mb-6">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-2 bg-[#C778DD]/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-[#C778DD]" />
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-[#ABB2BF]' : 'text-gray-500'}`}>
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="font-medium hover:text-[#C778DD] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Social Media */}
          <div className={`${
            isDarkMode ? 'bg-[#2D323B]' : 'bg-white'
          } p-6 rounded-xl shadow-lg border ${
            isDarkMode ? 'border-[#C778DD]/20' : 'border-gray-200'
          }`}>
            <h3 className="text-lg font-bold mb-6">Find me on</h3>
            <div className="flex gap-4">
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
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#1a1d23] hover:bg-[#C778DD]/20' 
                        : 'bg-gray-100 hover:bg-[#C778DD]/20'
                    } text-[#C778DD] hover:text-[#E0B7FF]`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactSection;