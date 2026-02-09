import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Application } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, MessageCircle, LogOut } from "lucide-react";
import { format } from "date-fns";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const { data: applications, isLoading } = useQuery<Application[]>({
        queryKey: ["/api/applications"],
        enabled: isAuthenticated,
    });

    const approveMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await apiRequest("PATCH", `/api/applications/${id}/approve`);
            return res.json();
        },
        onSuccess: (data: Application & { emailSent?: boolean }) => {
            queryClient.invalidateQueries({ queryKey: ["/api/applications"] });

            if (data.emailSent) {
                toast({
                    title: "Application Approved",
                    description: `Invite email sent to ${data.email}`,
                });
            } else {
                toast({
                    title: "Application Approved",
                    description: "Application status updated, but access email failed to send.",
                    variant: "destructive"
                });
            }
        },
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
            window.localStorage.setItem("admin_auth", "true");
        } else {
            toast({
                title: "Invalid Password",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        if (window.localStorage.getItem("admin_auth") === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                    <h1 className="text-2xl font-display font-medium text-white mb-8 text-center">Admin Access</h1>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                        Login
                    </Button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-medium mb-2">Applications</h1>
                        <p className="text-white/40 text-sm md:text-base">Manage incoming membership requests</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsAuthenticated(false);
                            window.localStorage.removeItem("admin_auth");
                        }}
                        className="border-white/10 text-white hover:bg-white/5 w-full md:w-auto"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {/* Desktop Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-mono uppercase tracking-widest text-white/40 border-b border-white/10 pb-4 px-4">
                            <div className="col-span-2">Name</div>
                            <div className="col-span-3">Contact</div>
                            <div className="col-span-4">Reason</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-1 text-right">Actions</div>
                        </div>

                        <div className="space-y-4">
                            {applications?.map((app) => (
                                <div
                                    key={app.id}
                                    className={`flex flex-col md:grid md:grid-cols-12 gap-4 bg-white/5 border border-white/5 p-4 rounded-lg transition-colors hover:border-white/10 ${app.status === 'approved' ? 'opacity-50' : ''}`}
                                >
                                    {/* Name */}
                                    <div className="col-span-2 font-medium flex justify-between items-center md:block">
                                        <span className="md:hidden text-xs text-white/40 font-mono uppercase">Name</span>
                                        <span>{app.name}</span>
                                    </div>

                                    {/* Contact */}
                                    <div className="col-span-3 space-y-1">
                                        <div className="md:hidden text-xs text-white/40 font-mono uppercase mb-1">Contact</div>
                                        <div className="text-sm">{app.email}</div>
                                        <div className="text-xs text-white/40 font-mono">{app.phoneNumber}</div>
                                        <a href={app.portfolioUrl.startsWith('http') ? app.portfolioUrl : `https://${app.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-mono truncate block">
                                            {app.portfolioUrl}
                                        </a>
                                    </div>

                                    {/* Reason */}
                                    <div className="col-span-4 text-sm text-white/70">
                                        <div className="md:hidden text-xs text-white/40 font-mono uppercase mb-1">Reason</div>
                                        <p className="line-clamp-3 md:line-clamp-2" title={app.reason}>{app.reason}</p>
                                    </div>

                                    {/* Date */}
                                    <div className="col-span-2 text-xs text-white/40 font-mono flex justify-between items-center md:block">
                                        <span className="md:hidden uppercase">Applied</span>
                                        <span>{format(new Date(app.createdAt!), "MMM d, yyyy")}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-1 text-right mt-2 md:mt-0 flex justify-end">
                                        {app.status === "approved" ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-green-500 font-mono uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded md:bg-transparent md:p-0">
                                                <Check className="w-3 h-3" />
                                                Approved
                                            </span>
                                        ) : (
                                            <Button
                                                size="sm"
                                                onClick={() => approveMutation.mutate(app.id)}
                                                disabled={approveMutation.isPending}
                                                className="bg-primary hover:bg-primary/90 text-white h-9 md:h-8 text-xs w-full md:w-auto"
                                            >
                                                {approveMutation.isPending ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <>
                                                        <MessageCircle className="w-3 h-3 mr-1.5" />
                                                        Approve
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {applications?.length === 0 && (
                                <div className="text-center py-20 text-white/40">
                                    No applications yet.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
