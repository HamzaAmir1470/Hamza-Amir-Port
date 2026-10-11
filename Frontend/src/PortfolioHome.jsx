'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Stack from './components/Stack.jsx';
import OpenSource from './components/OpenSource.jsx';
import Articles from './components/Articles.jsx'; // <--- Imported Articles
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Refs for scrolling
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const stackRef = useRef(null);
    const openSourceRef = useRef(null);
    const articlesRef = useRef(null);

    // Object to pass to Navbar and Footer
    const sectionRefs = {
        hero: heroRef,
        about: aboutRef,
        work: workRef,
        stack: stackRef,
        'open-source': openSourceRef,
        articles: articlesRef,
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const resumeUrl = "/CV.pdf";

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white selection:bg-blue-500/30">
            {/* Global Page Loader */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0f0f0f]"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold tracking-tight text-white"
                        >
                            Hamza.dev
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "150px" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-[2px] bg-blue-500 mt-6 rounded-full"
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="text-gray-500 text-sm mt-4 tracking-widest uppercase"
                        >
                            Loading Experience
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main App Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 1 }}
            >
                <Navbar sectionRefs={sectionRefs} resumeUrl={resumeUrl} />

                <section ref={heroRef} className="scroll-mt-20">
                    <Hero sectionRefs={sectionRefs} />
                </section>

                <section ref={aboutRef}>
                    <About />
                </section>

                <section ref={workRef}>
                    <Projects />
                </section>

                <section ref={stackRef}>
                    <Stack />
                </section>

                <section ref={openSourceRef}>
                    <OpenSource />
                </section>

                <section ref={articlesRef}>
                    <Articles />
                </section>

                <Footer sectionRefs={sectionRefs} />
                <Chatbot />
            </motion.div>
        </div>
    );
};

export default Home;