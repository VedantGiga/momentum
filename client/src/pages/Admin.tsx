import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Application } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, MessageCircle, LogOut, Search, MoreHorizontal, X, FileText, User, Mail, Globe } from "lucide-react";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
    const [viewApp, setViewApp] = useState<Application | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const { data: applications, isLoading } = useQuery<Application[]>({
        queryKey: ["/api/applications"],
        enabled: isAuthenticated,
    });

    const filteredApps = applications?.filter(app => {
        const matchesTab = app.status === activeTab;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            app.name.toLowerCase().includes(searchLower) ||
            app.email.toLowerCase().includes(searchLower) ||
            app.portfolioUrl.toLowerCase().includes(searchLower);
        return matchesTab && matchesSearch;
    }) || [];

    const stats = {
        total: applications?.length || 0,
        approved: applications?.filter(app => app.status === 'approved').length || 0,
        pending: applications?.filter(app => app.status === 'pending').length || 0,
    };

    // Clear selection on tab change
    useEffect(() => {
        setSelectedIds([]);
    }, [activeTab]);


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
        if (selectedIds.length === filteredApps.length && filteredApps.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredApps.map(app => app.id));
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
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-display font-medium">Applications</h1>
                        <p className="text-white/40 text-sm md:text-base">Manage incoming membership requests</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
                            <Input
                                placeholder="Search applications..."
                                className="pl-9 bg-white/5 border-white/10 text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAuthenticated(false);
                                window.localStorage.removeItem("admin_auth");
                            }}
                            className="border-white/10 text-white hover:bg-white/5"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/40">Total</CardTitle>
                            <FileText className="h-4 w-4 text-white/40" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/40">Pending</CardTitle>
                            <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.pending}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/40">Approved</CardTitle>
                            <div className="h-2 w-2 rounded-full bg-green-500/50" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.approved}</div>
                        </CardContent>
                    </Card>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Tabs & Bulk Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
                                <Button
                                    variant={activeTab === "pending" ? "secondary" : "ghost"}
                                    onClick={() => setActiveTab("pending")}
                                    className={`rounded-full ${activeTab === "pending" ? "bg-white text-black hover:bg-white/90" : "text-white/60 hover:text-white"}`}
                                >
                                    Pending ({stats.pending})
                                </Button>
                                <Button
                                    variant={activeTab === "approved" ? "secondary" : "ghost"}
                                    onClick={() => setActiveTab("approved")}
                                    className={`rounded-full ${activeTab === "approved" ? "bg-white text-black hover:bg-white/90" : "text-white/60 hover:text-white"}`}
                                >
                                    Approved ({stats.approved})
                                </Button>
                            </div>

                            {activeTab === "pending" && selectedIds.length > 0 && (
                                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-5">
                                    <span className="text-sm text-white/60 hidden sm:inline">{selectedIds.length} selected</span>
                                    <Button
                                        size="sm"
                                        onClick={() => bulkApproveMutation.mutate(selectedIds)}
                                        disabled={bulkApproveMutation.isPending}
                                        className="bg-primary hover:bg-primary/90 text-white"
                                    >
                                        {bulkApproveMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-2" /> Approve Selected</>}
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block rounded-md border border-white/10 bg-white/5 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/10 hover:bg-white/5">
                                        {activeTab === "pending" && (
                                            <TableHead className="w-12">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-white/20 bg-white/5 cursor-pointer"
                                                    onChange={toggleSelectAll}
                                                    checked={filteredApps.length > 0 && selectedIds.length === filteredApps.length}
                                                />
                                            </TableHead>
                                        )}
                                        <TableHead className="text-white/40">Name</TableHead>
                                        <TableHead className="text-white/40">Contact</TableHead>
                                        <TableHead className="text-white/40">Reason</TableHead>
                                        <TableHead className="text-white/40">Applied</TableHead>
                                        <TableHead className="text-right text-white/40">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApps.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center text-white/40">
                                                No results found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredApps.map((app) => (
                                            <TableRow key={app.id} className="border-white/10 hover:bg-white/5 transition-colors">
                                                {activeTab === "pending" && (
                                                    <TableCell>
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-white/20 bg-white/5 cursor-pointer"
                                                            checked={selectedIds.includes(app.id)}
                                                            onChange={() => toggleSelection(app.id)}
                                                        />
                                                    </TableCell>
                                                )}
                                                <TableCell className="font-medium text-white break-words max-w-[150px]">{app.name}</TableCell>
                                                <TableCell className="max-w-[200px]">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-white/80 text-xs break-words">{app.email}</span>
                                                        <a href={app.portfolioUrl.startsWith('http') ? app.portfolioUrl : `https://${app.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline truncate">
                                                            Website
                                                        </a>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-[250px]">
                                                    <button onClick={() => setViewApp(app)} className="text-left hover:text-white transition-colors">
                                                        <p className="truncate text-white/60 text-sm max-w-[240px]">{app.reason}</p>
                                                    </button>
                                                </TableCell>
                                                <TableCell className="text-white/60 text-sm whitespace-nowrap">
                                                    {format(new Date(app.createdAt!), "MMM d, yyyy")}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {app.status === 'pending' ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={() => approveMutation.mutate(app.id)}>
                                                                <Check className="h-4 w-4 mr-1.5" /> Approve
                                                            </Button>
                                                            <Button size="sm" variant="destructive" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20" onClick={() => declineMutation.mutate(app.id)}>
                                                                <X className="h-4 w-4 mr-1.5" /> Decline
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Badge variant="outline" className="border-green-500/20 text-green-500 bg-green-500/10">Approved</Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="grid gap-4 md:hidden">
                            {filteredApps.length === 0 ? (
                                <div className="text-center py-12 text-white/40 bg-white/5 rounded-lg border border-white/5 border-dashed">
                                    No results found.
                                </div>
                            ) : (
                                filteredApps.map((app) => (
                                    <Card key={app.id} className="bg-white/5 border-white/10 mb-4 transition-all active:scale-[0.99]">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex items-start gap-3 min-w-0">
                                                    {activeTab === "pending" && (
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-white/20 bg-white/5 cursor-pointer mt-1"
                                                            checked={selectedIds.includes(app.id)}
                                                            onChange={() => toggleSelection(app.id)}
                                                        />
                                                    )}
                                                    <div className="min-w-0 max-w-full">
                                                        <CardTitle className="text-base font-medium text-white break-words leading-tight mb-1">
                                                            {app.name}
                                                        </CardTitle>
                                                        <div className="text-xs text-white/50">{format(new Date(app.createdAt!), "PPP")}</div>
                                                    </div>
                                                </div>
                                                {app.status === 'approved' && (
                                                    <Badge variant="outline" className="border-green-500/20 text-green-500 bg-green-500/10 text-[10px] px-2 py-0.5 h-auto">Approved</Badge>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-white/70 min-w-0">
                                                    <Mail className="h-3 w-3 shrink-0" />
                                                    <span className="truncate break-all">{app.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-white/70 min-w-0">
                                                    <Globe className="h-3 w-3 shrink-0" />
                                                    <a href={app.portfolioUrl.startsWith('http') ? app.portfolioUrl : `https://${app.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                                                        Portfolio Link
                                                    </a>
                                                </div>
                                            </div>

                                            <div onClick={() => setViewApp(app)} className="bg-black/20 p-3 rounded text-sm text-white/60 hover:text-white/80 cursor-pointer transition-colors border border-white/5">
                                                <p className="line-clamp-2 italic">"{app.reason}"</p>
                                            </div>

                                            {app.status === 'pending' && (
                                                <div className="flex gap-2 pt-2">
                                                    <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white border-0" variant="outline" onClick={() => declineMutation.mutate(app.id)}>
                                                        Decline
                                                    </Button>
                                                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={() => approveMutation.mutate(app.id)}>
                                                        Approve
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Application Detail Dialog */}
            <Dialog open={!!viewApp} onOpenChange={(open) => !open && setViewApp(null)}>
                <DialogContent className="bg-[#0F0F11] border-white/10 text-white sm:max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-display flex items-center gap-2">
                            <User className="h-5 w-5 text-white/40" />
                            {viewApp?.name}
                        </DialogTitle>
                        <DialogDescription className="text-white/40">
                            Applied on {viewApp?.createdAt ? format(new Date(viewApp.createdAt), "PPP p") : ""}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="grid gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                            <div className="space-y-1">
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40">Contact Email</label>
                                <div className="text-sm select-all break-all flex items-center gap-2">
                                    <Mail className="h-3 w-3" />
                                    {viewApp?.email}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40">Portfolio</label>
                                <a
                                    href={viewApp?.portfolioUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline break-all flex items-center gap-2"
                                >
                                    <Globe className="h-3 w-3" />
                                    {viewApp?.portfolioUrl}
                                </a>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Reason for Joining</h4>
                            <div className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap p-4 bg-white/5 rounded-lg border border-white/5 min-h-[100px]">
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
                            <Button
                                variant="outline"
                                onClick={() => setViewApp(null)}
                                className="border-white/10 hover:bg-white/5 text-white"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
