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
      <DialogContent className="bg-[#0B0B0C] border-white/10 text-white sm:max-w-[500px] p-8 gap-8 shadow-2xl shadow-primary/5">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-display font-light tracking-tight">
            Join the <span className="text-primary">Momentum</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            We review every application manually. Tell us what you're building and why you need accountability.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-12 rounded-none transition-all duration-300"
                      placeholder="Jane Builder" 
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
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email"
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-12 rounded-none transition-all duration-300"
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
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Proof of Work (URL)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-12 rounded-none transition-all duration-300"
                      placeholder="github.com/jane or portfolio.com" 
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
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Why do you want to join?</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white min-h-[100px] rounded-none transition-all duration-300 resize-none"
                      placeholder="I have a project I've been putting off for months..." 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={mutation.isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14 font-display font-bold tracking-wide text-lg mt-4 transition-all duration-300 group"
            >
              {mutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
