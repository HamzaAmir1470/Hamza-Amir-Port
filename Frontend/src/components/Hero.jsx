import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpeg';
import { useState } from 'react';

const Hero = ({ sectionRefs }) => {
    const [copied, setCopied] = useState(false);

    const techStack = ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Next.js', 'REST APIs'];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    // Function to handle smooth scrolling to sections from buttons
    const handleScrollToSection = (key) => {
        const ref = sectionRefs?.[key];
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // Handle email click - copy to clipboard
    const handleEmailClick = (e) => {
        e.preventDefault();
        const email = 'hamzaamir9733@gmail.com'; // Replace with your actual email
        
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            // Fallback - open email client
            window.location.href = `mailto:${email}`;
        });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center py-20 px-6 bg-[#0f0f0f] text-white overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5b6bf0]/5 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-4"
                        >
                            <span className="text-[#5b6bf0] font-medium text-sm tracking-widest uppercase inline-block border border-[#5b6bf0]/20 px-4 py-1.5 rounded-full bg-[#5b6bf0]/5">
                                MERN Stack Developer
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight"
                        >
                            Building <span className="text-[#5b6bf0]">full-stack</span> products that<br className="hidden sm:block" />
                            work end-to-end
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[#a3a3a3] max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed mb-8"
                        >
                            I write production-grade React, Node.js, and MongoDB code — from responsive UIs to REST APIs — and contribute to open source between client projects.
                        </motion.p>

                        {/* Buttons Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
                        >
                            <button
                                onClick={() => handleScrollToSection('work')}
                                className="flex items-center gap-2.5 px-6 py-3 bg-[#5b6bf0] text-white text-sm font-medium rounded-lg hover:bg-[#4a5be0] transition-all border border-[#5b6bf0] cursor-pointer shadow-lg shadow-[#5b6bf0]/25 hover:shadow-[#5b6bf0]/40 hover:-translate-y-0.5"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                                View projects
                            </button>

                            <button
                                onClick={() => handleScrollToSection('open-source')}
                                className="flex items-center gap-2.5 px-6 py-3 bg-transparent border border-white/20 text-gray-300 text-sm font-medium rounded-lg hover:text-white hover:border-white/50 transition-all cursor-pointer hover:bg-white/5 hover:-translate-y-0.5"
                            >
                                Open source work
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </button>
                        </motion.div>

                        {/* Tech Stack Row */}
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-3 justify-center lg:justify-start"
                        >
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={tech}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                                        index < 4
                                            ? 'bg-white text-[#5b6bf0] border-white hover:bg-gray-100'
                                            : 'bg-transparent text-gray-400 border-[#2a2a2a] hover:border-gray-500 hover:text-white'
                                    }`}
                                >
                                    {tech}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right - Profile Image & Social Links */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center flex-shrink-0"
                    >
                        {/* Profile Image Wrapper */}
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[#5b6bf0]/30 shadow-2xl shadow-[#5b6bf0]/20">
                            <img
                                src={profileImage.src}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            {/* Glowing ring effect */}
                            <div className="absolute inset-0 rounded-full ring-2 ring-[#5b6bf0]/50 ring-offset-2 ring-offset-[#0f0f0f]"></div>
                            
                            {/* Animated pulse ring */}
                            <div className="absolute inset-[-8px] rounded-full border-2 border-[#5b6bf0]/20 animate-ping"></div>
                        </div>

                        {/* Social Links Under Image */}
                        <div className="flex items-center gap-6 mt-6">
                            {/* GitHub */}
                            <a
                                href="https://github.com/HamzaAmir1470"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#5b6bf0] transition-colors duration-300 hover:scale-110 transform"
                                aria-label="GitHub"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/hamza-amir9733"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#5b6bf0] transition-colors duration-300 hover:scale-110 transform"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>

                            {/* Email - Copy to clipboard */}
                            <div className="relative group mt-2">
                                <button
                                    onClick={handleEmailClick}
                                    className="text-gray-400 hover:text-[#5b6bf0] transition-colors duration-300 hover:scale-110 transform"
                                    aria-label="Copy email to clipboard"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </button>

                                {/* Tooltip notification */}
                                {copied && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-[#5b6bf0] rounded-lg whitespace-nowrap shadow-lg"
                                    >
                                        Email copied! 📋
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;