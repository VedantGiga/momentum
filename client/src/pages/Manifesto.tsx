import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function Manifesto() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-primary/30">
            <Navbar />

            <main className="pt-40 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                        className="space-y-24"
                    >
                        {/* Header */}
                        <motion.div variants={fadeIn} className="space-y-8">
                            <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter leading-[0.9]">
                                The <br />
                                <span className="text-white/40">Manifesto.</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-2xl border-l-2 border-primary/50 pl-8">
                                We believe that the next generation of great companies will be built by those who refuse to wait for permission.
                            </p>
                        </motion.div>

                        {/* Core Beliefs */}
                        <div className="space-y-16">
                            {[
                                {
                                    title: "Shipping is Oxygen.",
                                    content: "Ideas are cheap. Execution is everything. In Stackhouse, we don't talk about what we're going to build. We talk about what we just shipped. The only valid currency here is a deployed URL."
                                },
                                {
                                    title: "Network is Leverage.",
                                    content: "You are the average of the five people you spend the most time with. If you want to build world-class products, you need to be in a room with world-class builders. Stackhouse is that room."
                                },
                                {
                                    title: "Speed is a Feature.",
                                    content: "The market doesn't care about your perfect code architecture if you ship it six months too late. We optimize for velocity. We break things. We learn fast. We move forward."
                                },
                                {
                                    title: "Give First.",
                                    content: "This isn't a zero-sum game. The best communities are built on generosity. Review someone's code. Test their product. Introduce them to a user. The value you get out of Stackhouse is directly proportional to the value you put in."
                                }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeIn} className="group">
                                    <h2 className="text-3xl md:text-5xl font-display font-medium mb-6 group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-3xl group-hover:text-white/80 transition-colors duration-300">
                                        {item.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <motion.div variants={fadeIn} className="pt-12 border-t border-white/10">
                            <p className="text-2xl md:text-4xl font-display font-medium mb-8">
                                Ready to stop stalling and start building?
                            </p>
                            <div className="flex items-center gap-4 text-primary font-mono uppercase tracking-widest text-sm animate-pulse">
                                <ArrowRight className="w-5 h-5" />
                                <span>Join the resistance</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
