import { Mail } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = ({ sectionRefs }) => {
    const currentYear = new Date().getFullYear();

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
        <footer className="bg-[#0f0f0f] border-t border-white/5 pt-16 pb-8 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Top Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Bio */}
                    <div className="md:col-span-1">
                        <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                            Hamza.dev
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Full-Stack Engineer building production-grade web applications with MERN, AWS, and a passion for open-source.
                        </p>
                    </div>

                    {/* Quick Navigation Links */}
                    <div className="md:col-span-1">
                        <h4 className="text-white font-medium text-sm mb-4 uppercase tracking-wider">
                            Navigation
                        </h4>
                        <ul className="space-y-2.5">
                            {['About', 'Work', 'Stack', 'Open-Source', 'Articles'].map((item) => {
                                const key = item.toLowerCase().replace(' ', '-');
                                return (
                                    <li key={item}>
                                        <button
                                            onClick={() => handleScrollToSection(key)}
                                            className="text-gray-500 hover:text-white text-sm transition-colors duration-200 bg-transparent border-none cursor-pointer"
                                        >
                                            {item}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Open Source CTA */}
                    <div className="md:col-span-1">
                        <h4 className="text-white font-medium text-sm mb-4 uppercase tracking-wider">
                            Open Source
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            Check out my active contributions on GitHub.
                        </p>
                        <a
                            href="https://github.com/HamzaAmir1470"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            <FaGithub className="w-4 h-4" />
                            github.com/HamzaAmir1470
                        </a>
                    </div>

                    {/* Social & Contact with TOOLTIPS */}
                    <div className="md:col-span-1">
                        <h4 className="text-white font-medium text-sm mb-4 uppercase tracking-wider">
                            Connect
                        </h4>
                        <div className="flex space-x-2">

                            {/* GitHub Tooltip */}
                            <div className="relative group">
                                <a
                                    href="https://github.com/HamzaAmir1470"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 text-gray-500 hover:text-white transition-colors duration-200"
                                    aria-label="GitHub"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#1c1c1c] text-gray-300 text-[10px] font-medium px-2.5 py-1 rounded-md border border-white/10 whitespace-nowrap shadow-lg">
                                    GitHub
                                </span>
                            </div>

                            {/* LinkedIn Tooltip */}
                            <div className="relative group">
                                <a
                                    href="https://www.linkedin.com/in/hamza-amir9733/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 text-gray-500 hover:text-white transition-colors duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#1c1c1c] text-gray-300 text-[10px] font-medium px-2.5 py-1 rounded-md border border-white/10 whitespace-nowrap shadow-lg">
                                    LinkedIn
                                </span>
                            </div>

                            {/* Twitter/X Tooltip */}
                            <div className="relative group">
                                <a
                                    href="https://x.com/Hamza_Amir2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 text-gray-500 hover:text-white transition-colors duration-200"
                                    aria-label="Twitter"
                                >
                                    <FaTwitter className="w-5 h-5" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#1c1c1c] text-gray-300 text-[10px] font-medium px-2.5 py-1 rounded-md border border-white/10 whitespace-nowrap shadow-lg">
                                    Twitter / X
                                </span>
                            </div>

                            {/* Email Tooltip */}
                            <div className="relative group">
                                <a
                                    href="mailto:hamzaamir9733@gmail.com"
                                    className="block p-2 text-gray-500 hover:text-white transition-colors duration-200"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#1c1c1c] text-gray-300 text-[10px] font-medium px-2.5 py-1 rounded-md border border-white/10 whitespace-nowrap shadow-lg">
                                    Email
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <span>© {currentYear} Ha_Sultan. All rights reserved.</span>
                        <span className="text-white/10 hidden md:inline">|</span>
                        <span className="hidden md:inline">Built with React, Tailwind & Framer Motion</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span>Lahore, Pakistan</span>
                        <span className="text-white/10">|</span>
                        <span className="text-green-400/80">Available for opportunities</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;