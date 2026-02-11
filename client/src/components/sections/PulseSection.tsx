import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Wifi } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface PulseLog {
    type: "success" | "info" | "warning";
    text: string;
    timestamp?: string;
}

// Fallback data if API fails or is empty
const fallbackLogs: PulseLog[] = [
    { type: "info", text: "system_init: Stackhouse Network Online" },
    { type: "warning", text: "node_sync: connecting to peer swarm..." },
    { type: "success", text: "connection_established: verified peer identity" },
    { type: "info", text: "awaiting_input: ready for new members" },
];

export function PulseSection() {
    const [visibleLogs, setVisibleLogs] = useState<number[]>([]);

    const { data: realLogs } = useQuery<PulseLog[]>({
        queryKey: ["/api/pulse"],
        refetchInterval: 5000, // Poll every 5 seconds for new activity
    });

    const logs = (realLogs && realLogs.length > 0) ? realLogs : fallbackLogs;

    useEffect(() => {
        // Reset if data changes drastically
        setVisibleLogs([0]);
    }, [logs.length]);

    useEffect(() => {
        // Simulate typing/feed effect
        const interval = setInterval(() => {
            setVisibleLogs(prev => {
                if (prev.length >= logs.length) return [0]; // Reset loop
                return [...prev, prev.length];
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [logs]);

    return (
        <section className="py-20 px-6 bg-[#0B0B0C] border-y border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                {/* Left: Copy */}
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-widest text-green-500">Live Network Activity</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold">
                        The Pulse. <br />
                        <span className="text-white/40">Never Sleep.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-light max-w-md">
                        A living, breathing network of high-performance builders.
                        Shipping code, closing deals, and scaling products 24/7.
                    </p>
                </div>

                {/* Right: Terminal */}
                <div className="flex-1 w-full max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0F0F11] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
                    >
                        {/* Header */}
                        <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-white/40" />
                                <span className="text-xs font-mono text-white/40">stackhouse_cli — v1.0.4</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 font-mono text-sm h-[300px] overflow-hidden flex flex-col justify-end relative">
                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />

                            <div className="space-y-3 z-10">
                                {visibleLogs.map((index) => {
                                    const log = logs[index];
                                    if (!log) return null;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="text-white/20">
                                                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {log.type === 'success' && <span className="text-green-500">➜</span>}
                                            {log.type === 'info' && <span className="text-blue-500">ℹ</span>}
                                            {log.type === 'warning' && <span className="text-yellow-500">⚠</span>}
                                            <span className="text-white/80">{log.text}</span>
                                        </motion.div>
                                    );
                                })}
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2 h-4 bg-primary/50 mt-2"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
