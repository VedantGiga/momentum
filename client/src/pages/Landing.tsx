import { useProjects } from "@/hooks/use-projects";
import { ApplicationDialog } from "@/components/ApplicationDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Rocket, Repeat, Terminal, Users, Clock, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
                <span className="text-xs font-mono uppercase tracking-widest text-white/60">Community for Developers and Founders</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeIn} className="mb-6 relative">
              <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 select-none">
                STACKHOUSE
              </h1>
            </motion.div>

            {/* Subheadline & Desc */}
            <motion.div variants={fadeIn} className="mb-12 space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white/90">
                Connect with serious founders & developers.
              </h2>
              <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
                The premier network for those who take their work seriously. <br className="hidden md:block" />
                Networking, feedback, and career acceleration. 100% Free.
              </p>
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={fadeIn} className="flex flex-col items-center gap-6">
              <ApplicationDialog>
                <Button size="lg" className="rounded-full h-12 px-8 bg-primary text-white hover:bg-primary/90 font-bold text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,100,0,0.4)] hover:shadow-[0_0_35px_rgba(255,100,0,0.6)] hover:scale-105 flex items-center gap-2">
                  Apply for Access
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[0.5px]">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </ApplicationDialog>

              <div className="flex items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
                <span>Free to Join</span>
                <span>•</span>
                <span>Vetted Community</span>
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
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-display font-semibold mb-8">Building alone is the problem.</motion.h2>
            <div className="space-y-6">
              {[
                "You lack a high-quality network of serious peers.",
                "You struggle to find honest, constructive feedback.",
                "Isolation leads to stagnation and burnout.",
                "You need connections to open doors, not just code."
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
            "Your network is your net worth. Surround yourself with the best."
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
              { icon: Users, title: "Connect", desc: "Meet developers and founders who are as serious as you are." },
              { icon: Terminal, title: "Collaborate", desc: "Share your work, get code reviews, and find co-founders." },
              { icon: Rocket, title: "Grow", desc: "Leverage the network to launch better products and find opportunities." },
              { icon: ShieldAlert, title: "Succeed", desc: "Fast-track your career with the right connections and mentorship." },
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

      {/* Success Stories */}
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
              <h2 className="text-5xl font-display font-bold mb-4">Real Connections.</h2>
              <p className="text-xl text-muted-foreground font-light">Don't just take our word for it.</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                quote: "I found my technical co-founder within 48 hours of joining. We're now raising our seed round.",
                author: "Sarah J.",
                role: "Founder, ex-Stripe",
                metric: "Seed Funded"
              },
              {
                quote: "The feedback loop here is insane. I went from idea to first revenue in 14 days thanks to the community.",
                author: "James L.",
                role: "Indie Hacker",
                metric: "$5k MRR"
              },
              {
                quote: "Landed a senior engineering role through a referral in the #opportunities channel. Best network hands down.",
                author: "David K.",
                role: "Senior Engineer",
                metric: "Hired"
              }
            ].map((story, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="bg-[#0F0F11]/50 backdrop-blur-sm border-white/5 p-10 hover:border-primary/40 hover:bg-[#0F0F11]/80 transition-all duration-500 group rounded-3xl h-full flex flex-col">
                  <div className="mb-8">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary mb-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-50">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01664 21L5.01664 18C5.01664 16.8954 5.91207 16 7.01664 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.01664C5.46436 8 5.01664 8.44772 5.01664 9V11C5.01664 11.5523 4.56893 12 4.01664 12H3.01664V5H13.0166V15C13.0166 18.3137 10.3303 21 7.01664 21H5.01664Z" />
                      </svg>
                    </div>
                    <p className="text-xl font-light leading-relaxed text-white/90">"{story.quote}"</p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-end">
                    <div>
                      <div className="font-display font-bold text-lg mb-1">{story.author}</div>
                      <div className="text-sm text-white/40 font-mono">{story.role}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                      {story.metric}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
              START<br />CONNECTING.
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-12 font-light max-w-md leading-relaxed">
              Join a community of serious developers and founders.
              It's time to take your career seriously. Free to join.
            </motion.p>
            <motion.div variants={fadeIn}>
              <ApplicationDialog>
                <Button size="lg" className="rounded-full h-12 px-8 bg-primary text-white hover:bg-primary/90 font-bold text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,100,0,0.4)] hover:shadow-[0_0_35px_rgba(255,100,0,0.6)] hover:scale-105 flex items-center gap-2">
                  Apply for Access
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[0.5px]">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
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
      <Footer />
    </div>
  );
}
