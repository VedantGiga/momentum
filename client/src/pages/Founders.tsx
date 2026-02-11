import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Terminal, Github, Linkedin } from "lucide-react";
import { Footer } from "@/components/Footer";

const founders = [
  {
    name: "Rajat Jhade",
    role: "Founder",
    bio: "Building the future of community for builders. Obsessed with shipping and creating environments where ambition thrives.",
    image: "/rajat.jpg",
    linkedin: "https://www.linkedin.com/in/rajat-jhade-5b928730a/",
    github: "rajat-oss"
  },
  {
    name: "Vedant Vyas",
    role: "Co-Founder",
    bio: "Passionate about empowering developers. Focused on creating scalable systems and fostering innovation.",
    image: "/vedant.jpg",
    linkedin: "https://www.linkedin.com/in/vedant-vyas-1620062a9",
    github: "VedantGiga"
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
              The Founders
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-20">
              We didn't build Stackhouse to network. We built it because we needed a place where shipping was the only metric that mattered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <Card className="bg-[#0F0F11]/50 backdrop-blur-sm border-white/5 p-0 overflow-hidden rounded-3xl hover:border-primary/40 transition-all duration-500 group flex flex-col md:flex-row max-w-2xl mx-auto">
                  <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 md:hidden" />
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center md:w-3/5">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="w-4 h-4 text-primary" />
                      <span className="text-xs font-mono uppercase tracking-widest text-primary/60">{founder.role}</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-3">{founder.name}</h3>
                    <p className="text-base text-muted-foreground font-light leading-relaxed mb-6">
                      {founder.bio}
                    </p>
                    <div className="flex gap-5">
                      <a href={`https://github.com/${founder.github}`} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
