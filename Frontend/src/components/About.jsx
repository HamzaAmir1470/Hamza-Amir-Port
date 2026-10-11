import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const StatItem = ({ number, label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-white mb-1"
            >
                {isInView ? number : "0"}
            </motion.div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">{label}</div>
        </div>
    );
};

const About = () => {
    return (
        <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 scroll-mt-20">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                <StatItem number="3+" label="Years building" />
                <StatItem number="20" label="OSS pull requests" />
                <StatItem number="12" label="Featured projects" />
                <StatItem number="∞" label="Coffee consumed" />
            </div>

            {/* Bio & Code Block */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-16 items-center"
            >
                {/* Professional Bio */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Beyond the Code</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        I am a Full-Stack Engineer dedicated to bridging the gap between sleek, responsive user interfaces and robust, cloud-scalable backend architectures. With deep expertise in the MERN ecosystem and AWS cloud infrastructure, I specialize in transforming complex business requirements into end-to-end digital products that perform reliably at scale.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        Beyond client work, I am deeply passionate about the open-source community. I actively contribute to projects like <span className="text-blue-400 font-medium">voiceyBill</span>, focusing on clean code, developer experience, and reliable data handling. I believe great software isn't just built—it's engineered with maintainability and team collaboration at its core.
                    </p>
                </div>

                {/* Updated Code Block - Highlighting your exact stack */}
                <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-white/5 shadow-xl">
                    {/* Fake Browser Window Header */}
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    {/* Syntax Highlighted Code */}
                    <p className="font-mono text-sm text-gray-300 leading-relaxed">
                        <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = <span className="text-orange-300">{"{"}</span><br />
                        &nbsp;&nbsp;title: <span className="text-green-300">"Full-Stack Developer"</span>,<br />
                        &nbsp;&nbsp;stack: <span className="text-green-300">["MongoDB", "Express", "React", "Node"]</span>,<br />
                        &nbsp;&nbsp;cloud: <span className="text-green-300">"AWS"</span>,<br />
                        &nbsp;&nbsp;philosophy: <span className="text-green-300">"Clean Code & Open Source"</span>,<br />
                        &nbsp;&nbsp;location: <span className="text-green-300">"Lahore, Pakistan"</span><br />
                        <span className="text-orange-300">{"}"}</span>;
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default About;