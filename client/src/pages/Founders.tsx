import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Terminal, Github, Twitter, Linkedin } from "lucide-react";

const founders = [
  {
    name: "Alex Rivet",
    role: "Core Contributor",
    bio: "Ex-systems engineer turned builder. Focused on high-performance execution environments.",
    github: "alexbuilds",
    twitter: "alex_builds"
  },
  {
    name: "Sarah Chen",
    role: "Operations Lead",
    bio: "Product strategist. Believes that discipline is a byproduct of great environments.",
    github: "schen-dev",
    twitter: "sarah_k"
  }
];

export default function Founders() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-primary/30">
      <Navbar />
      
      <main className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tight mb-12">
              The <span className="text-white/40">Founders</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-20">
              We didn't build Momentum to network. We built it because we needed a place where shipping was the only metric that mattered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <Card className="bg-[#0F0F11]/50 backdrop-blur-sm border-white/5 p-12 rounded-none hover:border-primary/40 transition-all duration-500 group">
                  <div className="flex items-center gap-2 mb-6">
                    <Terminal className="w-5 h-5 text-primary" />
                    <span className="text-xs font-mono uppercase tracking-widest text-primary/60">{founder.role}</span>
                  </div>
                  <h3 className="text-4xl font-display font-bold mb-4">{founder.name}</h3>
                  <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
                    {founder.bio}
                  </p>
                  <div className="flex gap-6">
                    <a href={`https://github.com/${founder.github}`} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href={`https://twitter.com/${founder.twitter}`} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                      <Twitter className="w-6 h-6" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-2xl font-display font-bold tracking-tighter">
            MOMENTUM
          </div>
          <div className="text-xs text-white/10 font-mono uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Keep Building.
          </div>
        </div>
      </footer>
    </div>
  );
}
