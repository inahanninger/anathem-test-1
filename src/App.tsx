
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import TranscribePage from "./pages/TranscribePage";
import RiskAssessmentPage from "./pages/RiskAssessmentPage";
import SummaryViewPage from "./pages/SummaryViewPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TranscribePage />} />
          <Route path="/transcribe" element={<TranscribePage />} />
          <Route path="/risk-assessment" element={<RiskAssessmentPage />} />
          <Route path="/summary-view" element={<SummaryViewPage />} />
          <Route path="/report" element={<ReviewPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
