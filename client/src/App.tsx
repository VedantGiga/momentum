import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import Founders from "@/pages/Founders";
import Admin from "@/pages/Admin";
import Manifesto from "@/pages/Manifesto";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import Lenis from "lenis";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/founders" component={Founders} />
      <Route path="/manifesto" component={Manifesto} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
