import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { useCreateApplication } from "@/hooks/use-applications";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ApplicationDialogProps {
  children: React.ReactNode;
}

export function ApplicationDialog({ children }: ApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const mutation = useCreateApplication();

  const form = useForm<InsertApplication>({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      portfolioUrl: "",
      reason: "",
    },
  });

  async function onSubmit(data: InsertApplication) {
    try {
      await mutation.mutateAsync(data);
      toast({
        title: "Application Received",
        description: "We'll be in touch shortly. Keep building.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-[#0B0B0C] border-white/10 text-white sm:max-w-[450px] p-6 gap-4 shadow-2xl shadow-primary/5 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-display font-light tracking-tight">
            Join the <span className="text-primary">Stackhouse</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Join a curated network of founders and engineers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    Full Name <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-9 rounded-none text-sm transition-all duration-300"
                      placeholder="Jane Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    Email Address <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-9 rounded-none text-sm transition-all duration-300"
                      placeholder="jane@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="portfolioUrl"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    LinkedIn / Portfolio URL <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-9 rounded-none text-sm transition-all duration-300"
                      placeholder="linkedin.com/in/jane"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    Why do you want to join? <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white min-h-[60px] rounded-none text-sm transition-all duration-300 resize-none"
                      placeholder="I'm building a B2B SaaS..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-10 font-display font-medium tracking-wide text-sm mt-2 transition-all duration-300 group"
            >
              {mutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
