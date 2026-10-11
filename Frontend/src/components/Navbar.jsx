import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ sectionRefs, resumeUrl }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to handle smooth scrolling to sections
    const handleScrollToSection = (key) => {
        const ref = sectionRefs?.[key];
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-[#1c1c1c]/80 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div
                    onClick={() => handleScrollToSection('hero')}
                    className="text-xl font-bold tracking-tight text-white cursor-pointer"
                >
                    Hamza.dev
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                    {['About', 'Work', 'Stack', 'Open-Source', 'Articles'].map((item) => {
                        // Map the display name to the actual ref key used in Home.jsx
                        const key = item.toLowerCase().replace(' ', '-');
                        return (
                            <button
                                key={item}
                                onClick={() => handleScrollToSection(key)}
                                className="hover:text-white transition-colors cursor-pointer bg-transparent border-none font-medium text-gray-300"
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>

                {/* Hire Me / Resume Button */}
                <a
                    href={resumeUrl}
                    download="Hamza_Amir_CV.pdf"
                    aria-label="Download Hamza Amir's CV"
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-medium px-5 py-2 rounded-lg border border-white/10 transition-all shadow-lg cursor-pointer"
                >
                    Hire me
                </a>
            </div>
        </motion.nav>
    );
};

export default Navbar;