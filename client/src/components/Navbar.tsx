import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ApplicationDialog } from "./ApplicationDialog";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          pointer-events-auto
          flex items-center justify-between
          w-full px-6 py-4
          border-b transition-all duration-700 ease-in-out
          ${scrolled 
            ? "max-w-2xl mt-6 rounded-full bg-[#0B0B0C]/70 backdrop-blur-xl border-white/10 shadow-2xl py-3" 
            : "max-w-full bg-[#0B0B0C]/40 backdrop-blur-md border-white/5"}
        `}
        style={{
          boxShadow: scrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.8)" : "none"
        }}
      >
        <div className="flex items-center gap-2">
          <a href="/" className="text-xl font-display font-bold tracking-tighter glow-text">
            MOMENTUM
          </a>
          <div className="hidden md:flex ml-8 gap-6 pointer-events-auto">
            <a href="/founders" className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">Founders</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ApplicationDialog>
            <Button 
              variant="default" 
              size="sm"
              className="rounded-full px-6 bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              Apply
            </Button>
          </ApplicationDialog>
        </div>
      </motion.div>
    </nav>
  );
}
