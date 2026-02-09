import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="w-full py-12 md:py-20 border-t border-white/5 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
                    <div className="flex gap-8 font-mono text-sm tracking-widest text-white/40 uppercase">
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                        <a href="/manifesto" className="hover:text-primary transition-colors">Manifesto</a>
                        <a href="#" className="hover:text-primary transition-colors">Support</a>
                    </div>
                    <div className="text-xs text-white/20 font-mono uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} Keep Building.
                    </div>
                </div>

                <div className="w-full overflow-hidden">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="text-[12vw] md:text-[14vw] leading-[0.8] font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none text-center"
                    >
                        STACKHOUSE
                    </motion.h1>
                </div>
            </div>
        </footer>
    );
}
