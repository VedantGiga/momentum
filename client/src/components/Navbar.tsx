import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ApplicationDialog } from "./ApplicationDialog";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${scrolled
            ? "rounded-full bg-white/5 backdrop-blur-3xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ring-1 ring-white/5 py-3 px-8 w-[90%] md:w-[800px] mt-4"
            : "w-full border-b border-white/5 bg-transparent backdrop-blur-[2px] py-6 px-6 md:px-12 rounded-none mt-0"}
        `}
      >
        <div className="flex items-center gap-2">
          <a href="/" className="block">
            <img
              src="/momentum_logo_4k-1-removebg-preview.png"
              alt="Stackhouse Logo"
              className={`object-contain transition-all duration-500 ${scrolled ? "h-8 md:h-12" : "h-14 md:h-18"}`}
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-8 ${scrolled ? "gap-6" : "gap-12"}`}>
          <div className={`flex transition-all duration-500 ${scrolled ? "gap-6" : "gap-12"}`}>
            <a href="/founders" className="text-sm font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">Founders</a>
            <a href="/manifesto" className="text-sm font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">Manifesto</a>
          </div>

          <div className="w-[1px] h-4 bg-white/10" />

          <ApplicationDialog>
            <Button
              variant="default"
              size="sm"
              className={`rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-bold shadow-[0_0_15px_rgba(255,100,0,0.4)] hover:shadow-[0_0_25px_rgba(255,100,0,0.6)] hover:scale-105 flex items-center gap-2 ${scrolled ? "h-8 px-4 text-xs" : "h-10 px-6 text-sm"}`}
            >
              Apply
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[0.5px]">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Button>
          </ApplicationDialog>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto pointer-events-auto">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Toggle menu</span>
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </Button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-3xl p-6 md:hidden pointer-events-auto flex flex-col gap-8 border-t border-white/10"
          >
            <div className="flex flex-col gap-6 text-2xl font-display font-medium text-white">
              <a href="/founders" onClick={() => setMobileMenuOpen(false)}>Founders</a>
              <a href="/manifesto" onClick={() => setMobileMenuOpen(false)}>Manifesto</a>
            </div>
            <div className="mt-auto">
              <ApplicationDialog>
                <Button size="lg" className="w-full rounded-full bg-white text-black hover:bg-white/90">Apply for Access</Button>
              </ApplicationDialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
