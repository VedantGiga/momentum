import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Support() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    const logoSrc = "/stackhouse_sh_logo_1770802864846-removebg-preview (1).png";

    return (
        <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto space-y-20">
                    {/* Header */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="text-center space-y-6"
                    >
                        <div className="flex justify-center mb-8">
                            <img
                                src={logoSrc}
                                alt="Stackhouse Logo"
                                className="h-24 w-auto object-contain opacity-90"
                            />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight">
                            Support Center
                        </h1>
                        <p className="text-lg text-white/60 max-w-xl mx-auto font-light leading-relaxed">
                            Everything you need to know about joining, building, and thriving in the Stackhouse community.
                        </p>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-2xl font-display font-medium border-l-2 border-primary pl-4">
                            Frequently Asked Questions
                        </h2>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-white/10">
                                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                                    What is Stackhouse?
                                </AccordionTrigger>
                                <AccordionContent className="text-white/60 leading-relaxed">
                                    Stackhouse is an exclusive community for builders, founders, and creators. We are a collective of individuals who believe in shipping products, not just talking about them. It's a place to find co-founders, get feedback, and accelerate your growth.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="border-white/10">
                                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                                    Is membership free?
                                </AccordionTrigger>
                                <AccordionContent className="text-white/60 leading-relaxed">
                                    Yes, membership is 100% free. We believe that access to a high-quality network should be based on merit and contribution, not your ability to pay. The only cost is your commitment to build and give back to the community.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="border-white/10">
                                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                                    How does the application process work?
                                </AccordionTrigger>
                                <AccordionContent className="text-white/60 leading-relaxed">
                                    You submit an application via our "Apply" button. We review applications on a rolling basis. We look for proof of work—projects you've shipped, code you've written, or designs you've created. If approved, you'll receive an email invite to join our private community.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="border-white/10">
                                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                                    I haven't shipped anything yet. Can I still join?
                                </AccordionTrigger>
                                <AccordionContent className="text-white/60 leading-relaxed">
                                    We prioritize builders with a track record of shipping. However, if you are currently working on something ambitious and can demonstrate your progress and passion, we encourage you to apply. Show us what you're building!
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center space-y-6"
                    >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-display font-medium mb-2">Still have questions?</h3>
                            <p className="text-white/60">
                                We're here to help. Reach out to us directly.
                            </p>
                        </div>
                        <a
                            href="mailto:stackhouse.social@gmail.com"
                            className="text-2xl md:text-3xl font-display font-medium text-white hover:text-primary transition-colors border-b border-white/20 hover:border-primary pb-1 inline-block"
                        >
                            stackhouse.social@gmail.com
                        </a>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
