
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import NotFound from "./pages/NotFound";
import UploadPage from "./pages/ClinicalFlow/UploadPage";
import ReviewInfoPage from "./pages/ClinicalFlow/ReviewInfoPage";
import TranscribePage from "./pages/ClinicalFlow/TranscribePage";
import SelectReportPage from "./pages/ClinicalFlow/SelectReportPage";
import ReviewReportPage from "./pages/ClinicalFlow/ReviewReportPage";
import ClinicalFlowIndex from "./pages/ClinicalFlow/index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReviewPage />} />
          <Route path="/report" element={<ReviewPage />} />
          
          {/* Clinical Flow Routes */}
          <Route path="/clinical-flow" element={<ClinicalFlowIndex />} />
          <Route path="/clinical-flow/upload" element={<UploadPage />} />
          <Route path="/clinical-flow/review" element={<ReviewInfoPage />} />
          <Route path="/clinical-flow/transcribe" element={<TranscribePage />} />
          <Route path="/clinical-flow/select-report" element={<SelectReportPage />} />
          <Route path="/clinical-flow/review-report" element={<ReviewReportPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
