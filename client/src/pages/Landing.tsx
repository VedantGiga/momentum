import { useProjects } from "@/hooks/use-projects";
import { ApplicationDialog } from "@/components/ApplicationDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Rocket, Repeat, Terminal, Users, Clock, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Navbar } from "@/components/Navbar";

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

export default function Landing() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-primary/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden pt-20">

        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(255,255,255,0.1),rgba(0,0,0,0))]" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Kicker */}
            <motion.div variants={fadeIn} className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,100,0,0.5)]" />
                <span className="text-xs font-mono uppercase tracking-widest text-white/60">Accepting new builders</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeIn} className="mb-6 relative">
              <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 select-none">
                MOMENTUM
              </h1>
            </motion.div>

            {/* Subheadline & Desc */}
            <motion.div variants={fadeIn} className="mb-12 space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white/90">
                No motivation. Just momentum.
              </h2>
              <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
                The anti-incubation community for serious shippers. <br className="hidden md:block" />
                We replace willpower with systems.
              </p>
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={fadeIn} className="flex flex-col items-center gap-6">
              <ApplicationDialog>
                <Button size="lg" className="rounded-full h-14 px-8 bg-white text-black hover:bg-white/90 font-medium text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105">
                  Apply for Access
                </Button>
              </ApplicationDialog>

              <div className="flex items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
                <span>Limited Spots</span>
                <span>•</span>
                <span>Review Required</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-32 px-6 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-display font-semibold mb-8">The cycle of unfinished work.</motion.h2>
            <div className="space-y-6">
              {[
                "You have a folder of 'half-baked' side projects.",
                "You rely on bursts of motivation that inevitably fade.",
                "You build in isolation, making it easy to quit.",
                "You over-engineer before you even validate."
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-primary/60 rotate-45" />
                  <p className="text-lg text-muted-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-3xl opacity-20" />
            <Card className="relative bg-[#0F0F11]/80 backdrop-blur-sm border-white/10 p-8 w-full max-w-md shadow-2xl rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-mono text-xs text-primary/60 mb-4 uppercase tracking-widest">System Analysis</div>
                <div className="space-y-4">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} transition={{ duration: 1, delay: 0.5 }} className="h-2 bg-white/5" />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "50%" }} transition={{ duration: 1, delay: 0.7 }} className="h-2 bg-white/5" />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1, delay: 0.9 }} className="h-2 bg-white/5" />
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="text-xs font-mono text-white/20">STATUS: STALLED</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Belief */}
      <section className="py-40 px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-8">Our Core Philosophy</p>
          <h2 className="text-4xl md:text-6xl font-display leading-tight font-medium">
            "Consistency emerges from visibility and expectation."
          </h2>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden"
          >
            {[
              { icon: Terminal, title: "Commit", desc: "Define exactly what you will ship in 1 week. No vague goals." },
              { icon: Clock, title: "Show", desc: "Daily standups. 24 hours to post progress or you're out." },
              { icon: Rocket, title: "Ship", desc: "By Sunday midnight, your project must be live. No excuses." },
              { icon: Repeat, title: "Reflect", desc: "Review what worked, what didn't, and reset for the next sprint." },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="bg-[#0B0B0C] p-8 md:p-12 hover:bg-white/[0.03] transition-all duration-500 group h-full flex flex-col justify-between"
              >
                <div>
                  <step.icon className="w-10 h-10 text-white/10 group-hover:text-primary group-hover:scale-110 transition-all duration-500 mb-8" />
                  <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">{step.desc}</p>
                </div>
                <div className="mt-12 font-mono text-6xl font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex items-end justify-between mb-20"
          >
            <div>
              <h2 className="text-5xl font-display font-bold mb-4">Weekly Ships</h2>
              <p className="text-xl text-muted-foreground font-light">The standard we hold ourselves to.</p>
            </div>
            <div className="hidden md:block font-mono text-xs text-primary/80 animate-pulse tracking-widest">REALTIME_EXEC_STREAM ●</div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects?.map((project) => (
                <motion.div key={project.id} variants={fadeIn}>
                  <Card className="bg-[#0F0F11]/50 backdrop-blur-sm border-white/5 p-8 hover:border-primary/40 hover:bg-[#0F0F11]/80 transition-all duration-500 group rounded-3xl h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-sm border border-white/10 group-hover:border-primary/30 transition-colors">
                          {project.author[0]}
                        </div>
                        <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{project.author}</div>
                      </div>
                      <span className={`text-[10px] font-mono uppercase px-3 py-1 rounded-full border ${project.status === 'Shipped' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-primary/20 text-primary bg-primary/5'
                        }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <span className="text-xs text-white/20 font-mono tracking-wider">
                        {project.date ? formatDistanceToNow(new Date(project.date), { addSuffix: true }) : 'Just now'}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Final CTA - Stop Stalling */}
      <section className="py-40 px-6 relative overflow-hidden border-t border-white/5 bg-[#0B0B0C]">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-left"
          >
            <motion.h2 variants={fadeIn} className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">
              STOP<br />STALLING.
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-12 font-light max-w-md leading-relaxed">
              We only accept 10 new builders per month.
              Selection is manual. Inactivity is a ban.
            </motion.p>
            <motion.div variants={fadeIn}>
              <ApplicationDialog>
                <Button size="lg" className="rounded-full h-12 px-8 bg-white text-black hover:bg-white/90 font-bold text-base tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105">
                  Apply for Access
                </Button>
              </ApplicationDialog>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hidden md:flex justify-end relative"
          >
            <div className="relative w-full aspect-square max-w-lg border border-white/10 p-8 grid grid-cols-2 gap-4">
              <div className="bg-white/5 w-full h-full" />
              <div className="bg-white/5 w-full h-full" />
              <div className="bg-white/5 w-full h-full" />
              <div className="bg-primary/20 w-full h-full animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Decorative Grid - Premium/Technical Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
      </section>

      {/* Footer */}
      <footer className="w-full py-12 md:py-20 border-t border-white/5 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
            <div className="flex gap-8 font-mono text-sm tracking-widest text-white/40 uppercase">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">Manifesto</a>
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
              MOMENTUM
            </motion.h1>
          </div>
        </div>
      </footer>
    </div>
  );
}
