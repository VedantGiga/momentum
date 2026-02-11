import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Coffee, Server, Zap, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
};

export default function Donate() {
    return (
        <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="inline-flex items-center justify-center p-3 mb-8 rounded-full bg-white/5 border border-white/10">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8">
                            Fuel the <span className="text-primary">Network</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                            Stackhouse is and always will be free for builders.
                            <br />
                            We don't sell data. We don't run ads. We run on code and caffeine.
                        </p>
                    </motion.div>
                </div>

                {/* The Why */}
                <section className="max-w-5xl mx-auto mb-32">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Globe, title: "Server Costs", desc: "Keeping our infrastructure fast, secure, and available 24/7 globally." },
                            { icon: Zap, title: "Development", desc: "Building new tools, features, and integrations for the community." },
                            { icon: Heart, title: "Independence", desc: "Remaining 100% independent and user-funded. No VC overlords." }
                        ].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                key={i}
                                className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl text-center hover:bg-white/[0.04] transition-colors"
                            >
                                <item.icon className="w-8 h-8 text-white/20 mx-auto mb-6" />
                                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                                <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Donation Tiers */}
                <section className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {/* Tier 1 */}
                        <motion.div variants={fadeIn}>
                            <Card className="h-full bg-[#0F0F11] border-white/10 p-8 flex flex-col relative overflow-hidden group hover:border-white/20 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Coffee className="w-24 h-24" />
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-display font-bold">Supporter</h3>
                                    <div className="text-primary font-mono mt-2">$5 <span className="text-white/40 text-sm">/ one-time</span></div>
                                </div>
                                <p className="text-muted-foreground font-light mb-8 text-sm">
                                    Buy us a coffee. Keeps the late-night coding sessions fueled.
                                </p>
                                <a href="https://buymeacoffee.com/vedantvyas" target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white">
                                        Support
                                    </Button>
                                </a>
                            </Card>
                        </motion.div>

                        {/* Tier 2 - Highlighted */}
                        <motion.div variants={fadeIn} className="relative transform md:-translate-y-4">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent blur-xl opacity-50" />
                            <Card className="h-full bg-[#0F0F11] border-primary/50 p-8 flex flex-col relative overflow-hidden shadow-2xl z-10">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Server className="w-24 h-24 text-primary" />
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-display font-bold text-white">Patron</h3>
                                    <div className="text-primary font-mono mt-2">$25 <span className="text-white/40 text-sm">/ month</span></div>
                                </div>
                                <p className="text-white/80 font-light mb-8 text-sm">
                                    Directly cover server costs. You are the backbone of our infrastructure.
                                </p>
                                <ul className="mb-8 space-y-3 text-sm text-white/60 font-mono">
                                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-primary" /> Patron Badge</li>
                                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-primary" /> Early Access</li>
                                </ul>
                                <a href="https://buymeacoffee.com/vedantvyas" target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                                    <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold">
                                        Become a Patron
                                    </Button>
                                </a>
                            </Card>
                        </motion.div>

                        {/* Tier 3 */}
                        <motion.div variants={fadeIn}>
                            <Card className="h-full bg-[#0F0F11] border-white/10 p-8 flex flex-col relative overflow-hidden group hover:border-white/20 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Zap className="w-24 h-24" />
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-display font-bold">Angel</h3>
                                    <div className="text-primary font-mono mt-2">$100 <span className="text-white/40 text-sm">/ one-time</span></div>
                                </div>
                                <p className="text-muted-foreground font-light mb-8 text-sm">
                                    Serious investment in the future of the network. Helping us scale globally.
                                </p>
                                <a href="https://buymeacoffee.com/vedantvyas" target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white">
                                        Invest in Future
                                    </Button>
                                </a>
                            </Card>
                        </motion.div>
                    </motion.div>
                </section>

                <div className="text-center mt-20">
                    <p className="text-white/40 text-sm font-light">
                        All donations go directly to operational costs. Stackhouse is a non-profit community initiative.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function Check({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
