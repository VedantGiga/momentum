import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
};

export function FilterSection() {
    return (
        <section className="py-32 px-6 relative border-y border-white/5 bg-[#0B0B0C]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Who is this for?</h2>
                    <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                        Stackhouse isn't for everyone. We're building a network of shippers, not talkers.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {/* The Tourist */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="group relative p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <motion.div variants={fadeIn} className="relative z-10 flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-display font-medium text-white/40">The Tourist</h3>
                            <X className="w-8 h-8 text-white/20" />
                        </motion.div>

                        <div className="space-y-6 relative z-10">
                            {[
                                "Tutorial hell forever",
                                "Talks about coding, never ships",
                                "Start new projects, finish zero",
                                "Blames 'market conditions'",
                                "Networking = collecting business cards"
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeIn} className="flex items-center gap-4 text-white/40">
                                    <X className="w-5 h-5 text-red-500/40 shrink-0" />
                                    <span className="font-light">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* The Builder */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="group relative p-8 md:p-12 rounded-3xl border border-primary/20 bg-primary/[0.02] overflow-hidden hover:border-primary/40 transition-colors duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        <motion.div variants={fadeIn} className="relative z-10 flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-display font-bold text-white">The Builder</h3>
                            <div className="bg-primary/20 p-2 rounded-full">
                                <Check className="w-6 h-6 text-primary" />
                            </div>
                        </motion.div>

                        <div className="space-y-6 relative z-10">
                            {[
                                "Ships MVP in a weekend",
                                "Learns by doing, not watching",
                                "Obsessed with user feedback",
                                "Iterates until it works",
                                "Networking = finding co-founders"
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeIn} className="flex items-center gap-4 text-white">
                                    <div className="bg-primary/20 p-1 rounded-full shrink-0">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="font-medium text-lg">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative shine */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[100px] pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
