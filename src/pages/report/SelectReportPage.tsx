
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Stepper from "@/components/Stepper";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Upload", description: "Upload supporting documents" },
  { id: 2, name: "Review", description: "Review information" },
  { id: 3, name: "Transcribe", description: "Record consultation" },
  { id: 4, name: "Select", description: "Select report type" },
  { id: 5, name: "Review", description: "Final review" },
];

const reportTypes = [
  {
    id: 1,
    title: "Clinical Assessment",
    description: "A comprehensive evaluation of the patient's presenting symptoms, examination findings, and clinical impressions.",
    icon: "📋",
    recommended: true,
  },
  {
    id: 2,
    title: "Treatment Summary",
    description: "A summary of treatments provided, patient response, and outcomes.",
    icon: "💊",
    recommended: false,
  },
  {
    id: 3,
    title: "Diagnostic Report",
    description: "A detailed analysis of diagnostic tests, findings, and interpretations.",
    icon: "🔬",
    recommended: false,
  },
  {
    id: 4,
    title: "Follow-up Note",
    description: "Documentation of follow-up visit, progress assessment, and plan adjustments.",
    icon: "📅",
    recommended: false,
  },
  {
    id: 5,
    title: "Referral Letter",
    description: "A formal letter to another healthcare provider for specialized consultation or care.",
    icon: "📤",
    recommended: false,
  },
];

export default function SelectReportPage() {
  const navigate = useNavigate();
  const [selectedReportType, setSelectedReportType] = useState<number | null>(1);

  const handleSelectReport = (reportId: number) => {
    setSelectedReportType(reportId);
    toast.success(`Selected: ${reportTypes.find(r => r.id === reportId)?.title}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-3">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6 mt-4">
            <Stepper steps={steps} currentStep={4} />
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 py-6">
        <Card className="mb-6 shadow-sm border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-blue-800">Select Report Type</CardTitle>
            <CardDescription>
              Choose the type of report you want to generate based on the collected information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((reportType) => (
                <Card 
                  key={reportType.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedReportType === reportType.id 
                      ? 'border-blue-800 ring-2 ring-blue-800 ring-opacity-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleSelectReport(reportType.id)}
                >
                  <CardContent className="pt-6 relative">
                    {reportType.recommended && (
                      <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1/2 bg-blue-800 text-white text-xs px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{reportType.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{reportType.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{reportType.description}</p>
                      </div>
                      {selectedReportType === reportType.id && (
                        <CheckCircle2 className="h-5 w-5 text-blue-800" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/report/transcribe")}
            className="flex items-center gap-2 border-gray-300 text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={() => navigate("/report/final-review")}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900"
            disabled={!selectedReportType}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
