
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import GeneratePage from "./pages/GeneratePage";
import TranscribePage from "./pages/TranscribePage";
import UploadDocumentPage from "./pages/workflow/UploadDocumentPage";
import ReviewInformationPage from "./pages/workflow/ReviewInformationPage";
import WorkflowTranscribePage from "./pages/workflow/WorkflowTranscribePage";
import GenerateAssessmentPage from "./pages/workflow/GenerateAssessmentPage";
import WorkflowReportPage from "./pages/workflow/WorkflowReportPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transcribe" element={<TranscribePage />} />
          <Route path="/report" element={<ReviewPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          
          {/* New Workflow Routes */}
          <Route path="/workflow/upload" element={<UploadDocumentPage />} />
          <Route path="/workflow/review" element={<ReviewInformationPage />} />
          <Route path="/workflow/transcribe" element={<WorkflowTranscribePage />} />
          <Route path="/workflow/generate" element={<GenerateAssessmentPage />} />
          <Route path="/workflow/report" element={<WorkflowReportPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
