import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // Changed to HashRouter
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Skills from "./pages/Skills";
import Courses from "./pages/Courses";
import Interview from "./pages/Interview";
import MarketTrends from "./pages/MarketTrends";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Changed BrowserRouter to HashRouter */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/about" element={<About />} />
          <Route path="/market-trends" element={<MarketTrends />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
