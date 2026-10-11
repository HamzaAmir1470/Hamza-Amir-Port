import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const projects = [
    {
        title: "Sultan Shop Marketplace",
        description: "End-to-end marketplace with role-based dashboards for buyers, sellers, and admins. Handles real-time order tracking, vendor onboarding, and Stripe payment flows.",
        image: "https://res.cloudinary.com/hamzacloud/image/upload/v1781418774/avatars/nwn2n1uoukypv6vbp50p.png",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        liveLink: "https://sultanf.vercel.app/",
        githubLink: "https://github.com/HamzaAmir1470/E-Shop-Multi_Vendor",
    },
    {
        title: "Amir Electric Store",
        description: "A modern e-commerce platform for selling electrical products with a focus on user experience and performance.",
        image: "https://res.cloudinary.com/hamzacloud/image/upload/v1785411840/aes_jzl0s3.png",
        tags: ["React", "ExcelJS", "Node.js"],
        liveLink: "https://aesfrontend.vercel.app/",
        githubLink: "https://github.com/HamzaAmir1470/Amir-Electric-Store",
    },
    {
        title: "Currency Converter App",
        description: "A simple yet effective currency converter app with real-time exchange rates and a clean, intuitive interface.",
        image: "https://res.cloudinary.com/hamzacloud/image/upload/v1785411846/currency_qjjulq.png",
        tags: ["React", "API Integration"],
        liveLink: "https://currency-converter-delta-umber.vercel.app/",
        githubLink: "https://github.com/HamzaAmir1470/currencyConverter",
    },
    {
        title: "Resume Builder",
        description: "Scalable e-commerce platform deployed on AWS EC2 with S3 for media storage, utilizing serverless functions for order processing and notifications.",
        image: "https://res.cloudinary.com/hamzacloud/image/upload/v1785411841/resume_rmcbg3.png",
        tags: ["Vercel", "AI", "React"],
        liveLink: "https://resume-builder-8kdk.vercel.app/",
        githubLink: "https://github.com/HamzaAmir1470/Resume_Builder",
    },
    {
        title: "Dev-Learn LMS",
        description: "A comprehensive Learning Management System (LMS) for online courses, featuring user authentication, course management, and progress tracking.",
        image: "https://res.cloudinary.com/hamzacloud/image/upload/v1785411563/LMS_c0ef9r.png",
        tags: ["Vercel", "AI", "React"],
        liveLink: "https://lms-frontend-hazel-xi.vercel.app/",
        githubLink: "https://github.com/HamzaAmir1470/LMS",
    }
];

const Projects = () => {
    return (
        <section id="work" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Selected Work</h2>
                <h3 className="text-3xl font-bold text-white">Featured Projects</h3>
            </motion.div>

            {/* Slider Container */}
            <div className="relative px-4 md:px-10 pb-12">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true
                    }}
                    loop={projects.length > 3}
                    className="projects-swiper"
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            {({ isActive }) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    className={`bg-[#151515] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col h-full ${isActive ? 'border-white/20 shadow-xl' : 'border-white/5'
                                        }`}
                                >
                                    {/* Image Container - Bright and vibrant without shadow */}
                                    <div className="h-48 overflow-hidden relative bg-[#0a0a0a]">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-100"
                                            style={{
                                                filter: 'brightness(1) contrast(1.05) saturate(1.1)',
                                                boxShadow: 'none'
                                            }}
                                        />
                                        {/* Subtle gradient overlay for text readability only - no dark shadow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/40 via-transparent to-transparent pointer-events-none"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[10px] font-medium bg-white/5 text-gray-300 px-2.5 py-1 rounded-full border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h4 className="text-white font-semibold text-lg mb-2">{project.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Action Links */}
                                        <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                                            </a>
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
                                            >
                                                <FaGithub className="w-3.5 h-3.5" /> Source Code
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button className="swiper-button-prev-custom w-10 h-10 rounded-full border border-white/10 bg-[#1c1c1c] text-white hover:bg-[#2a2a2a] transition-colors flex items-center justify-center cursor-pointer">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="swiper-button-next-custom w-10 h-10 rounded-full border border-white/10 bg-[#1c1c1c] text-white hover:bg-[#2a2a2a] transition-colors flex items-center justify-center cursor-pointer">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;