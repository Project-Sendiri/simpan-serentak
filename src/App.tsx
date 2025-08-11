import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Placeholder from "./pages/dashboard/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/profil" element={<Placeholder title="Profil" />} />
          <Route path="/dashboard/pengguna" element={<Placeholder title="Pengguna" />} />
          <Route path="/dashboard/data" element={<Placeholder title="Data" />} />
          <Route path="/dashboard/pengembalian" element={<Placeholder title="Pengembalian" />} />
          <Route path="/dashboard/vendor" element={<Placeholder title="Vendor" />} />
          <Route path="/dashboard/pengaturan" element={<Placeholder title="Pengaturan" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
