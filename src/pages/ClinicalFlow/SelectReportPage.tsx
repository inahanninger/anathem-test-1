
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ProgressSteps from "@/components/ClinicalFlow/ProgressSteps";
import { FileIcon, ClipboardIcon, BrainIcon } from "lucide-react";

const reportTypes = [
  {
    id: "adhd",
    title: "ADHD Assessment",
    description: "A comprehensive assessment for attention deficit hyperactivity disorder, including symptoms analysis and treatment recommendations.",
    icon: <ClipboardIcon className="h-6 w-6 text-blue-600" />,
  },
  {
    id: "combined",
    title: "Combined ADHD and Autism Assessment",
    description: "A detailed evaluation covering both ADHD and autism spectrum disorder, with integrated findings and recommendations.",
    icon: <FileIcon className="h-6 w-6 text-blue-600" />,
  },
  {
    id: "memory",
    title: "Memory Assessment",
    description: "A specialized assessment of memory function, including working, short-term, and long-term memory evaluation.",
    icon: <BrainIcon className="h-6 w-6 text-blue-600" />,
  },
];

const SelectReportPage = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedReport) {
      toast.error("Please select a report type");
      return;
    }
    navigate("/clinical-flow/review-report");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-2">Clinical Report Generation</h1>
        <p className="text-gray-600 mb-8">Complete all steps to generate a comprehensive clinical report</p>
        
        <ProgressSteps currentStep={3} />

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-2">Select Report Type</h2>
          <p className="text-gray-600 mb-8">Choose the type of report you want to generate based on the patient's information.</p>
          
          <RadioGroup value={selectedReport || ""} onValueChange={setSelectedReport}>
            <div className="space-y-6">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className={`flex items-start p-4 border rounded-lg transition-all
                    ${selectedReport === report.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex items-center h-5 mt-1">
                    <RadioGroupItem value={report.id} id={report.id} />
                  </div>
                  <div className="ml-3 flex items-center">
                    <div className="p-2 bg-blue-50 rounded-lg mr-4">{report.icon}</div>
                    <div>
                      <Label htmlFor={report.id} className="text-lg font-medium text-gray-900">{report.title}</Label>
                      <p className="text-gray-500 text-sm mt-1">{report.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="mt-10">
          <Button
            className="bg-blue-700 hover:bg-blue-800 px-8"
            onClick={handleContinue}
            disabled={!selectedReport}
          >
            Generate Selected Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectReportPage;
