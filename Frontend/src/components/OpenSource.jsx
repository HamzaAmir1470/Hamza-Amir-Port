import { motion } from 'framer-motion';
import { GitPullRequest, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

// 100% accurate data pulled directly from your PRs
const pullRequests = [
    {
        title: "feat(transactions): Unified Export transactions to PDF with CSV using frontend data (no backend query)",
        repo: "voiceyBill/voiceyBill-web",
        prNumber: 195,
        status: "Merged",
        url: "https://github.com/voiceyBill/voiceyBill-web/pull/195",
    },
    {
        title: "feat: CSV export with shared downloadCsv.ts utility",
        repo: "voiceyBill/voiceyBill-web",
        prNumber: 145,
        status: "Merged",
        url: "https://github.com/voiceyBill/voiceyBill-web/pull/145",
    },
    {
        title: "feat: close functionality for mobile sidebar",
        repo: "voiceyBill/voiceyBill-web",
        prNumber: 144,
        status: "Merged",
        url: "https://github.com/voiceyBill/voiceyBill-web/pull/171",
    },
    {
        title: "feat(backend): CSV export using ExcelJS",
        repo: "voiceyBill/voiceyBill-server",
        prNumber: 114,
        status: "Merged",
        url: "https://github.com/voiceyBill/voiceyBill-server/pull/114",
    }
];

const OpenSource = () => {
    return (
        <section id="open-source" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
                <div>
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Open Source</h2>
                    <h3 className="text-3xl font-bold text-white">Contributions & PRs</h3>
                </div>
                <a 
                    href="https://github.com/HamzaAmir1470" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg"
                >
                    <FaGithub className="w-4 h-4" /> 
                    View GitHub Profile
                </a>
            </motion.div>

            <div className="space-y-4">
                {pullRequests.map((pr, index) => (
                    <motion.a
                        key={index}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ x: 6, borderColor: 'rgba(255,255,255,0.2)' }}
                        className="block bg-[#151515] border border-white/5 rounded-xl p-5 hover:bg-[#1c1c1c] transition-all cursor-pointer"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    <GitPullRequest className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-base mb-1">{pr.title}</h4>
                                    <p className="text-gray-500 text-xs font-mono">
                                        {pr.repo} <span className="text-gray-600 mx-1">•</span> #{pr.prNumber}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 md:ml-auto">
                                <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                    <CheckCircle className="w-3 h-3" />
                                    Merged
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export default OpenSource;