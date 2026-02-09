import { useProjects } from "@/hooks/use-projects";
import { ApplicationDialog } from "@/components/ApplicationDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Rocket, Repeat, Terminal, Users, Clock, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Landing() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0B0C]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-display font-bold tracking-tighter">
            MOMENTUM<span className="text-primary">.</span>
          </div>
          <ApplicationDialog>
            <Button variant="outline" className="rounded-none border-white/10 hover:bg-white/5 hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest">
              Apply for Access
            </Button>
          </ApplicationDialog>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tight leading-[0.9] mb-8">
              No motivation.<br />
              <span className="text-white/40">Just momentum.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
              A private community where ambitious builders stop planning and start shipping. 
              Consistency emerges from visibility and expectation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <ApplicationDialog>
                <Button size="lg" className="rounded-none h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg tracking-wide shadow-[0_0_30px_-10px_var(--primary)] hover:shadow-[0_0_40px_-5px_var(--primary)] transition-all duration-300">
                  Start Building
                </Button>
              </ApplicationDialog>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  12 Active Batches
                </span>
                <span className="w-px h-4 bg-white/10" />
                <span>94% Completion Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-semibold mb-8">The cycle of unfinished work.</h2>
            <div className="space-y-6">
              {[
                "You have a folder of 'half-baked' side projects.",
                "You rely on bursts of motivation that inevitably fade.",
                "You build in isolation, making it easy to quit.",
                "You over-engineer before you even validate."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-red-500/50 rotate-45" />
                  <p className="text-lg text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-3xl opacity-20" />
            <div className="font-display text-[200px] leading-none font-bold text-white/[0.02] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              STOP
            </div>
            <Card className="relative bg-[#0F0F11] border-white/10 p-8 w-full max-w-md shadow-2xl">
              <div className="font-mono text-xs text-red-400 mb-4 uppercase tracking-widest">System Failure</div>
              <div className="space-y-4">
                <div className="h-2 bg-white/5 w-3/4" />
                <div className="h-2 bg-white/5 w-1/2" />
                <div className="h-2 bg-white/5 w-5/6" />
                <div className="h-2 bg-white/5 w-2/3" />
              </div>
              <div className="mt-8 flex justify-end">
                <div className="text-xs font-mono text-white/20">ERROR_NO_ACCOUNTABILITY</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Belief */}
      <section className="py-32 px-6 border-b border-white/5 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-6">Our Core Philosophy</p>
          <h2 className="text-3xl md:text-5xl font-display leading-tight">
            "We believe that willpower is a finite resource. 
            <span className="text-white/30"> True consistency comes from designing an environment where showing up is the path of least resistance.</span>"
          </h2>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { icon: Terminal, title: "Commit", desc: "Define exactly what you will ship in 1 week. No vague goals." },
              { icon: Clock, title: "Show", desc: "Daily standups. 24 hours to post progress or you're out." },
              { icon: Rocket, title: "Ship", desc: "By Sunday midnight, your project must be live. No excuses." },
              { icon: Repeat, title: "Reflect", desc: "Review what worked, what didn't, and reset for the next sprint." },
            ].map((step, i) => (
              <div key={i} className="bg-[#0B0B0C] p-8 md:p-12 hover:bg-white/[0.02] transition-colors group h-full flex flex-col justify-between">
                <div>
                  <step.icon className="w-8 h-8 text-white/20 group-hover:text-primary transition-colors mb-6" />
                  <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-8 font-mono text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="py-32 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-display font-bold mb-2">Weekly Ships</h2>
              <p className="text-muted-foreground">Real projects shipped by our members this week.</p>
            </div>
            <div className="hidden md:block font-mono text-xs text-primary animate-pulse">LIVE FEED ●</div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-white/5 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.slice(0, 6).map((project) => (
                <Card key={project.id} className="bg-[#0F0F11] border-white/5 p-6 hover:border-primary/50 transition-all duration-300 group rounded-none">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/5 flex items-center justify-center font-bold text-sm">
                        {project.author[0]}
                      </div>
                      <div className="text-sm font-medium text-white/80">{project.author}</div>
                    </div>
                    <span className={`text-[10px] font-mono uppercase px-2 py-1 border ${
                      project.status === 'Shipped' ? 'border-green-500/30 text-green-400' : 'border-yellow-500/30 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xs text-white/30 font-mono">
                      {project.date ? formatDistanceToNow(new Date(project.date), { addSuffix: true }) : 'Just now'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              ))}
              {(!projects || projects.length === 0) && (
                <div className="col-span-full py-12 text-center text-muted-foreground font-mono">
                  No projects shipped yet this week. Be the first.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Check className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-display font-bold">This is for you if...</h3>
            </div>
            <ul className="space-y-4">
              {[
                "You are technically capable but struggle to finish.",
                "You work better when someone is watching.",
                "You want brutally honest feedback, not generic praise.",
                "You are ready to ship imperfect work just to get it out."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 border-l border-white/10 hover:border-primary/50 hover:bg-white/[0.02] transition-all">
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-display font-bold">This is NOT for you if...</h3>
            </div>
            <ul className="space-y-4">
              {[
                "You are looking for a 'growth hacking' course.",
                "You need to be motivated by others to start.",
                "You are not willing to share your work publicly.",
                "You want to spend weeks planning before writing code."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 border-l border-white/10 bg-white/[0.01]">
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
            Stop stalling.
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
            We limit our intake to ensure high-quality accountability circles. 
            The next cohort starts Monday.
          </p>
          <ApplicationDialog>
            <Button size="lg" className="rounded-none h-16 px-12 bg-white text-black hover:bg-white/90 font-bold text-xl tracking-wide">
              Apply for Access
            </Button>
          </ApplicationDialog>
          <div className="mt-8 text-xs font-mono text-white/30 uppercase tracking-widest">
            Limited spots available for this cohort
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-lg font-display font-bold tracking-tighter">
            MOMENTUM<span className="text-primary">.</span>
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} Momentum. Keep building.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Manifesto</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
