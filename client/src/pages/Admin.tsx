import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Application } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, MessageCircle, LogOut } from "lucide-react";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
    const [viewApp, setViewApp] = useState<Application | null>(null);
    const { toast } = useToast();

    // Dialog Imports (assuming shadcn structure)
    // We need to import these at top level


    const { data: applications, isLoading } = useQuery<Application[]>({
        queryKey: ["/api/applications"],
        enabled: isAuthenticated,
    });

    // Calculate stats & Split lists
    const pendingApps = applications?.filter(app => app.status === 'pending') || [];
    const approvedApps = applications?.filter(app => app.status === 'approved') || [];

    // Clear selection on tab change
    useEffect(() => {
        setSelectedIds([]);
    }, [activeTab]);

    // Stats for tracker
    const totalRequests = applications?.length || 0;
    const totalApproved = approvedApps.length;

    const approveMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await apiRequest("PATCH", `/api/applications/${id}/approve`);
            return res.json();
        },
        onSuccess: (data: Application & { emailSent?: boolean }) => {
            queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
            if (data.emailSent) {
                toast({ title: "Application Approved", description: `Invite email sent to ${data.email}` });
            } else {
                toast({ title: "Application Approved", description: "Email failed to send.", variant: "destructive" });
            }
        },
    });

    const declineMutation = useMutation({
        mutationFn: async (id: number) => {
            await apiRequest("DELETE", `/api/applications/${id}`);
        },
        onSuccess: (_, id) => {
            queryClient.setQueryData(["/api/applications"], (oldData: Application[] = []) => {
                return oldData.filter(app => app.id !== id);
            });
            queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
            toast({ title: "Application Declined", description: "Application has been removed." });
        }
    });

    const bulkApproveMutation = useMutation({
        mutationFn: async (ids: number[]) => {
            const res = await apiRequest("POST", "/api/applications/bulk-approve", { ids });
            return res.json();
        },
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
            setSelectedIds([]); // Clear selection
            toast({
                title: "Bulk Approval Complete",
                description: `Approved ${data.count} applications. ${data.emailSuccessCount} emails sent.`
            });
        },
        onError: () => {
            toast({ title: "Bulk Approval Failed", description: "Something went wrong.", variant: "destructive" });
        }
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "8989693739@123") {
            setIsAuthenticated(true);
            window.localStorage.setItem("admin_auth", "true");
        } else {
            toast({ title: "Invalid Password", variant: "destructive" });
        }
    };

    useEffect(() => {
        if (window.localStorage.getItem("admin_auth") === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const toggleSelection = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === pendingApps.length && pendingApps.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(pendingApps.map(app => app.id));
        }
    };

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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-medium mb-2">Applications</h1>
                        <p className="text-white/40 text-sm md:text-base">Manage incoming membership requests</p>
                    </div>

                    {/* Tracker */}
                    <div className="flex gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center min-w-[120px]">
                            <div className="text-2xl font-medium">{totalApproved}</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest">Approved</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center min-w-[120px]">
                            <div className="text-2xl font-medium">{totalRequests}</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest">Total</div>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAuthenticated(false);
                                window.localStorage.removeItem("admin_auth");
                            }}
                            className="border-white/10 text-white hover:bg-white/5 h-auto py-3 md:ml-4"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>



                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Tabs */}
                        <div className="flex items-center gap-4 border-b border-white/10">
                            <button
                                onClick={() => setActiveTab("pending")}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "pending"
                                    ? "border-primary text-white"
                                    : "border-transparent text-white/40 hover:text-white/70"
                                    }`}
                            >
                                Pending Requests ({pendingApps.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("approved")}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "approved"
                                    ? "border-primary text-white"
                                    : "border-transparent text-white/40 hover:text-white/70"
                                    }`}
                            >
                                Approved Members ({approvedApps.length})
                            </button>
                        </div>

                        {/* Pending Tab */}
                        {activeTab === "pending" && (
                            <section className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-sm text-white/40">
                                        Review and manage incoming applications.
                                    </div>
                                    {/* Bulk Actions Bar */}
                                    {selectedIds.length > 0 && (
                                        <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 flex items-center gap-4">
                                            <span className="text-primary text-sm font-medium">{selectedIds.length} selected</span>
                                            <Button
                                                size="sm"
                                                onClick={() => bulkApproveMutation.mutate(selectedIds)}
                                                disabled={bulkApproveMutation.isPending}
                                                className="bg-primary hover:bg-primary/90 text-white h-8"
                                            >
                                                {bulkApproveMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-2" /> Approve</>}
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-4">
                                    {/* Desktop Header */}
                                    <div className="hidden md:grid grid-cols-[auto_2fr_3fr_3fr_2fr_1fr] gap-4 text-xs font-mono uppercase tracking-widest text-white/40 border-b border-white/10 pb-4 px-4 items-center">
                                        <div className="w-5">
                                            <input
                                                type="checkbox"
                                                className="rounded border-white/20 bg-white/5"
                                                onChange={toggleSelectAll}
                                                checked={pendingApps.length > 0 && selectedIds.length === pendingApps.length}
                                            />
                                        </div>
                                        <div>Name</div>
                                        <div>Contact</div>
                                        <div>Reason</div>
                                        <div>Date</div>
                                        <div className="text-right">Actions</div>
                                    </div>

                                    <div className="space-y-4">
                                        {pendingApps.map((app) => (
                                            <div
                                                key={app.id}
                                                className="flex flex-col md:grid md:grid-cols-[auto_2fr_3fr_3fr_2fr_1fr] gap-4 bg-white/5 border border-white/5 p-4 rounded-lg transition-colors hover:border-white/10"
                                            >
                                                {/* Checkbox */}
                                                <div className="hidden md:flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-white/20 bg-white/5 cursor-pointer"
                                                        checked={selectedIds.includes(app.id)}
                                                        onChange={() => toggleSelection(app.id)}
                                                    />
                                                </div>

                                                {/* Name */}
                                                <div className="font-medium flex justify-between items-center md:block">
                                                    <span className="md:hidden text-xs text-white/40 font-mono uppercase">Name</span>
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="md:hidden rounded border-white/20 bg-white/5 cursor-pointer"
                                                            checked={selectedIds.includes(app.id)}
                                                            onChange={() => toggleSelection(app.id)}
                                                        />
                                                        <span>{app.name}</span>
                                                    </div>
                                                </div>

                                                {/* Contact */}
                                                <div className="space-y-1">
                                                    <div className="md:hidden text-xs text-white/40 font-mono uppercase mb-1">Contact</div>
                                                    <div className="text-sm">{app.email}</div>
                                                    <a href={app.portfolioUrl.startsWith('http') ? app.portfolioUrl : `https://${app.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-mono truncate block">
                                                        {app.portfolioUrl}
                                                    </a>
                                                </div>

                                                {/* Reason */}
                                                <div className="text-sm text-white/70 min-w-0">
                                                    <div className="md:hidden text-xs text-white/40 font-mono uppercase mb-1">Reason</div>
                                                    <p
                                                        className="line-clamp-2 text-white/60 hover:text-white cursor-pointer transition-colors break-all"
                                                        onClick={() => setViewApp(app)}
                                                    >
                                                        {app.reason}
                                                    </p>
                                                </div>

                                                {/* Date */}
                                                <div className="text-xs text-white/40 font-mono flex justify-between items-center md:block">
                                                    <span className="md:hidden uppercase">Applied</span>
                                                    <span>{format(new Date(app.createdAt!), "MMM d, yyyy")}</span>
                                                </div>

                                                {/* Actions */}
                                                <div className="text-right mt-2 md:mt-0 flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => approveMutation.mutate(app.id)}
                                                        disabled={approveMutation.isPending}
                                                        className="bg-primary hover:bg-primary/90 text-white h-9 md:h-8 text-xs flex-1 md:flex-none"
                                                    >
                                                        {approveMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <><MessageCircle className="w-3 h-3 md:mr-1.5" /><span className="hidden md:inline">Approve</span></>}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => declineMutation.mutate(app.id)}
                                                        disabled={declineMutation.isPending}
                                                        className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 h-9 md:h-8 text-xs flex-1 md:flex-none"
                                                    >
                                                        {declineMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Decline"}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        {pendingApps.length === 0 && (
                                            <div className="text-center py-12 text-white/40 bg-white/5 rounded-lg border border-white/5 border-dashed">
                                                No pending applications.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Approved Tab */}
                        {activeTab === "approved" && (
                            <section className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="text-sm text-white/40 mb-4">
                                    Directory of all accepted members.
                                </div>

                                <div className="grid gap-4">
                                    <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-mono uppercase tracking-widest text-white/40 border-b border-white/10 pb-4 px-4">
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-4">Contact</div>
                                        <div className="col-span-3">Date Approved</div>
                                        <div className="col-span-2 text-right">Status</div>
                                    </div>

                                    <div className="space-y-4">
                                        {approvedApps.map((app) => (
                                            <div
                                                key={app.id}
                                                className="flex flex-col md:grid md:grid-cols-12 gap-4 bg-white/5 border border-white/5 p-4 rounded-lg"
                                            >
                                                <div className="col-span-3 font-medium">
                                                    <span className="md:hidden text-xs text-white/40 font-mono uppercase mr-2">Name:</span>
                                                    {app.name}
                                                </div>
                                                <div className="col-span-4 text-sm text-white/70">
                                                    <span className="md:hidden text-xs text-white/40 font-mono uppercase mr-2 block">Contact:</span>
                                                    <div className="mb-1">{app.email}</div>
                                                    <a href={app.portfolioUrl.startsWith('http') ? app.portfolioUrl : `https://${app.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-mono truncate block">
                                                        {app.portfolioUrl}
                                                    </a>
                                                </div>
                                                <div className="col-span-3 text-xs text-white/40 font-mono">
                                                    <span className="md:hidden text-xs text-white/40 font-mono uppercase mr-2">Applied:</span>
                                                    {format(new Date(app.createdAt!), "MMM d, yyyy")}
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    <span className="inline-flex items-center gap-1 text-xs text-green-500 font-mono uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">
                                                        <Check className="w-3 h-3" />
                                                        Approved
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {approvedApps.length === 0 && (
                                            <div className="text-center py-8 text-white/40 text-sm">
                                                No approved members yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>

            {/* Application Detail Dialog */}
            <Dialog open={!!viewApp} onOpenChange={(open) => !open && setViewApp(null)}>
                <DialogContent className="bg-[#0F0F11] border-white/10 text-white sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-display">{viewApp?.name}</DialogTitle>
                        <DialogDescription className="text-white/40">
                            Applied on {viewApp?.createdAt ? format(new Date(viewApp.createdAt), "PPP p") : ""}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Contact</h4>
                            <div className="text-sm break-all">{viewApp?.email}</div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Portfolio</h4>
                            <a
                                href={viewApp?.portfolioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline break-all"
                            >
                                {viewApp?.portfolioUrl}
                            </a>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Reason for Joining</h4>
                            <div className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2 custom-scrollbar break-all">
                                {viewApp?.reason}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                            {viewApp?.status === 'pending' && (
                                <>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            if (viewApp) declineMutation.mutate(viewApp.id);
                                            setViewApp(null);
                                        }}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                                    >
                                        Decline
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (viewApp) approveMutation.mutate(viewApp.id);
                                            setViewApp(null);
                                        }}
                                        className="bg-primary hover:bg-primary/90 text-white"
                                    >
                                        Approve Application
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
