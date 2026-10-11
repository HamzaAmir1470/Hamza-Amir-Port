import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Published articles from Dev.to with cover images
const articles = [
  {
    title: "Selecting Your Frontend Foundation: React vs Next.js",
    description:
      "A detailed breakdown comparing React and Next.js to help you choose the right foundation for your next frontend project based on performance, SEO, and developer experience.",
    date: "Jun 19, 2026",
    tags: ["React", "Next.js", "Frontend"],
    link: "https://dev.to/hamza_amir/selecting-your-frontend-foundation-react-vs-nextjs-3898",
    platform: "Dev.to",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=center",
  },
  {
    title: "My Open Source Journey with VoiceyBill",
    description:
      "Sharing my experience contributing to open source through the VoiceyBill project, including my merged PRs and lessons learned along the way.",
    date: "Jun 11, 2026",
    tags: ["Open Source", "Contributions", "Career"],
    link: "https://dev.to/hamza_amir/my-open-source-journey-with-voiceybill-53em",
    platform: "Dev.to",
    coverImage:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop&crop=center",
  },
  {
    title:
      "AI Fluency: The Career Skill That Separates Operators from the Obsolete",
    description:
      "Exploring the importance of AI fluency in today's job market and how understanding AI can be a critical skill for career growth and staying relevant in the tech industry.",
    date: "Jun 26, 2026",
    tags: ["AI", "Career", "Skills"],
    link: "https://dev.to/hamza_amir/ai-fluency-the-career-skill-that-separates-operators-from-the-obsolete-1i2h",
    platform: "Dev.to",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center",
  },
  {
    title:
      "How LLMs actually work: A deep dive into the mechanics of Large Language Models",
    description:
      "An in-depth look at the underlying mechanisms of Large Language Models and how they process and generate human-like text.",
    date: "Jul 30, 2026",
    tags: ["AI", "Career", "Skills"],
    link: "https://dev.to/hamza_amir/how-llms-actually-work-4ihi",
    platform: "Dev.to",
    coverImage:
      "https://res.cloudinary.com/hamzacloud/image/upload/v1785411562/Gemini_Generated_Image_i6qvrii6qvrii6qv_noa8s7.png",
  },
  {
    title:
      "Kubernetes for DevOps Engineers: Pods, Deployments, Volumes, and a Real Next.js Deployment Guide",
    description:
      "A practical guide to Kubernetes fundamentals and deploying a Next.js application with pods, deployments, and persistent volumes.",
    date: "Sep 15, 2026",
    tags: ["DevOps", "Kubernetes", "Next.js"],
    link: "https://dev.to/hamza_amir/kubernetes-for-devops-engineers-pods-deployments-volumes-and-a-real-nextjs-deployment-guide-4eh1",
    platform: "Dev.to",
    coverImage:
      "https://res.cloudinary.com/hamzacloud/image/upload/v1789490919/kubernetes-cover_ots53v.svg",
  },
];

const Articles = () => {
  return (
    <section
      id="articles"
      className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Written Insights
          </h2>
          <h3 className="text-3xl font-bold text-white">Featured Articles</h3>
        </div>

        <a
          href="https://dev.to/hamza_amir"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-20 w-max mt-4 md:mt-0 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          View All Articles
        </a>
      </motion.div>

      {/* Slider Container */}
      <div className="relative px-4 md:px-10 pb-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          loop={articles.length > 3}
          className="articles-swiper"
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index} className="h-auto">
              {({ isActive }) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`bg-[#151515] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col h-full ${
                    isActive ? "border-white/20 shadow-xl" : "border-white/5"
                  }`}
                >
                  {/* Image Container */}
                  <div className="h-48 overflow-hidden relative bg-[#0a0a0a]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      style={{
                        filter: "brightness(1) contrast(1.05) saturate(1.1)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/40 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium bg-white/5 text-gray-300 px-2.5 py-1 rounded-full border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {article.description}
                    </p>

                    {/* Action Links & Metadata */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{article.date}</span>
                      </div>

                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Read Article <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Controls Container */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button className="swiper-button-prev-custom w-10 h-10 rounded-full border border-white/10 bg-[#1c1c1c] text-white hover:bg-[#2a2a2a] transition-colors flex items-center justify-center cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="swiper-button-next-custom w-10 h-10 rounded-full border border-white/10 bg-[#1c1c1c] text-white hover:bg-[#2a2a2a] transition-colors flex items-center justify-center cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
