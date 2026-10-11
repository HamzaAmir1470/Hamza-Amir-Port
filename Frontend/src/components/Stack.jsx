import { motion } from 'framer-motion';
import {
    Box,
    Code,
    Store,
    Server,
    Code2,
    Rocket,
    Globe,
    Container,
    Cloud
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const techStacks = [
    {
        name: 'React',
        icon: <Box className="w-8 h-8 mb-3 text-[#61DAFB]" />,
        label: 'Frontend'
    },
    {
        name: 'Node.js',
        icon: <Code className="w-8 h-8 mb-3 text-[#68A063]" />,
        label: 'Runtime'
    },
    {
        name: 'MongoDB',
        icon: <Store className="w-8 h-8 mb-3 text-[#4DB33D]" />,
        label: 'Database'
    },
    {
        name: 'Express',
        icon: <Server className="w-8 h-8 mb-3 text-white" />,
        label: 'API Layer'
    },
    {
        name: 'TypeScript',
        icon: <Code2 className="w-8 h-8 mb-3 text-[#3178C6]" />,
        label: 'Language'
    },
    {
        name: 'Next.js',
        icon: <Rocket className="w-8 h-8 mb-3 text-white" />,
        label: 'SSR/SSG'
    },
    {
        name: 'REST API',
        icon: <Globe className="w-8 h-8 mb-3 text-[#8B5CF6]" />,
        label: 'Architecture'
    },
    {
        name: 'GitHub',
        icon: <FaGithub className="w-8 h-8 mb-3 text-white" />,
        label: 'Version Ctrl'
    },
    {
        name: 'Docker',
        icon: <Container className="w-8 h-8 mb-3 text-[#2496ED]" />,
        label: 'DevOps'
    },
    {
        name: 'AWS',
        icon: <Cloud className="w-8 h-8 mb-3 text-[#FF9900]" />, // Classic AWS Orange
        label: 'Cloud Infrastructure'
    }
];

const Stack = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="stack" className="py-24 px-6 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Tech Stack
                </h2>
                <h3 className="text-3xl font-bold text-white">
                    Tools & Technologies
                </h3>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
                {techStacks.map((tech) => (
                    <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        whileHover={{
                            y: -6,
                            borderColor: 'rgba(255,255,255,0.4)',
                            transition: { duration: 0.2 }
                        }}
                        className="bg-[#1c1c1c] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-[#242424] transition-colors cursor-default group"
                    >
                        <div className="group-hover:scale-110 transition-transform duration-300">
                            {tech.icon}
                        </div>
                        <span className="text-white font-medium text-sm mb-1 mt-1">
                            {tech.name}
                        </span>
                        <span className="text-gray-500 text-[10px] uppercase tracking-wider">
                            {tech.label}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Stack;