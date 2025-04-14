
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import NotFound from "./pages/NotFound";

// Clinical Report Tool imports
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/report/UploadPage";
import ReviewInfoPage from "./pages/report/ReviewPage";
import TranscribePage from "./pages/report/TranscribePage";
import SelectReportPage from "./pages/report/SelectReportPage";
import FinalReviewPage from "./pages/report/FinalReviewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Original routes */}
          <Route path="/" element={<ReviewPage />} />
          <Route path="/report" element={<ReviewPage />} />
          
          {/* Clinical Report Tool routes */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/report/upload" element={<AppLayout><UploadPage /></AppLayout>} />
          <Route path="/report/review" element={<AppLayout><ReviewInfoPage /></AppLayout>} />
          <Route path="/report/transcribe" element={<AppLayout><TranscribePage /></AppLayout>} />
          <Route path="/report/select" element={<AppLayout><SelectReportPage /></AppLayout>} />
          <Route path="/report/final-review" element={<AppLayout><FinalReviewPage /></AppLayout>} />

          {/* Placeholder routes */}
          <Route path="/schedule" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold text-blue-800">Schedule</h1><p className="mt-4">This feature is coming soon.</p></div></AppLayout>} />
          <Route path="/settings" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold text-blue-800">Settings</h1><p className="mt-4">This feature is coming soon.</p></div></AppLayout>} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
