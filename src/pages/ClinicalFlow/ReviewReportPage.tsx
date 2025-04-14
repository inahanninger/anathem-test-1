
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { DownloadIcon, CheckCircleIcon, PrinterIcon } from "lucide-react";
import ProgressSteps from "@/components/ClinicalFlow/ProgressSteps";

const ReviewReportPage = () => {
  const navigate = useNavigate();
  const [viewSources, setViewSources] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [reportData, setReportData] = useState({
    patientName: "James Wilson",
    dateOfBirth: "05/12/1980 (45 years)",
    mrn: "MRN123456789",
    contact: "+1 (555) 123-4567",
    dateOfVisit: "04/08/2025",
    visitType: "Follow-up",
    insurance: "BlueCross #BC987654321",
    chiefComplaint: "Patient presents for follow-up of chronic lower back pain and management of hypertension and hyperlipidemia."
  });

  const handleDataChange = (field: string, value: string) => {
    setReportData({
      ...reportData,
      [field]: value
    });
  };

  const handleDownload = () => {
    toast.success("Report downloaded successfully");
  };

  const handlePrint = () => {
    toast.success("Sending report to printer");
  };

  const handleFinish = () => {
    toast.success("Report generated and saved successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-2">Clinical Report Generation</h1>
        <p className="text-gray-600 mb-8">Complete all steps to generate a comprehensive clinical report</p>
        
        <ProgressSteps currentStep={4} />

        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Review Report Information</h2>
            <p className="text-gray-600">Review the final report, make adjustments if needed, and download when ready.</p>
          </div>

          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <Label htmlFor="view-sources" className="mr-2 text-sm text-gray-700">View sources</Label>
              <Switch 
                id="view-sources" 
                checked={viewSources} 
                onCheckedChange={setViewSources} 
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-xl font-semibold text-blue-700">Clinical Report</h3>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Comprehensive Assessment Report</h2>
              <p className="text-gray-500 text-sm">Generated: {currentDate} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-gray-900 font-medium">Dr. Sarah Johnson</p>
                  <p className="text-gray-600 text-sm">General Medicine</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Patient Information</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs text-gray-500 mb-1">Name</Label>
                    <Input 
                      id="name" 
                      value={reportData.patientName} 
                      onChange={(e) => handleDataChange("patientName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob" className="text-xs text-gray-500 mb-1">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      value={reportData.dateOfBirth} 
                      onChange={(e) => handleDataChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mrn" className="text-xs text-gray-500 mb-1">MRN</Label>
                    <Input 
                      id="mrn" 
                      value={reportData.mrn} 
                      onChange={(e) => handleDataChange("mrn", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact" className="text-xs text-gray-500 mb-1">Contact</Label>
                    <Input 
                      id="contact" 
                      value={reportData.contact} 
                      onChange={(e) => handleDataChange("contact", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Visit Information</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="visitDate" className="text-xs text-gray-500 mb-1">Date of Visit</Label>
                    <Input 
                      id="visitDate" 
                      value={reportData.dateOfVisit} 
                      onChange={(e) => handleDataChange("dateOfVisit", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="visitType" className="text-xs text-gray-500 mb-1">Visit Type</Label>
                    <Input 
                      id="visitType" 
                      value={reportData.visitType} 
                      onChange={(e) => handleDataChange("visitType", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance" className="text-xs text-gray-500 mb-1">Insurance</Label>
                    <Input 
                      id="insurance" 
                      value={reportData.insurance} 
                      onChange={(e) => handleDataChange("insurance", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Label htmlFor="chiefComplaint" className="text-sm font-medium text-gray-500 mb-2">Chief Complaint</Label>
              <Textarea 
                id="chiefComplaint" 
                value={reportData.chiefComplaint} 
                onChange={(e) => handleDataChange("chiefComplaint", e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300"
                onClick={handleDownload}
              >
                <DownloadIcon className="h-4 w-4" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300"
                onClick={handlePrint}
              >
                <PrinterIcon className="h-4 w-4" />
                Print Report
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={handleFinish}
              >
                <CheckCircleIcon className="h-4 w-4" />
                Finalize & Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewReportPage;
