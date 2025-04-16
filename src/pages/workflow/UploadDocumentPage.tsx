
import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import { Separator } from "@/components/ui/separator";
import FileUploadSection from "@/components/FileUploadSection";

const workflowSteps = [{
  name: "Upload",
  path: "/workflow/upload"
}, {
  name: "Review",
  path: "/workflow/review"
}, {
  name: "Transcribe",
  path: "/workflow/transcribe"
}, {
  name: "Report",
  path: "/workflow/report"
}];

const UploadDocumentPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  
  const handleContinue = () => {
    toast.success("Patient information saved");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
        <div className="container mx-auto" style={{ maxWidth: "1243px" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <Label htmlFor="patientName" className="text-xs text-muted-foreground mb-1">Patient Name</Label>
                <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} className="h-8 w-[180px] text-sm" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="nhsNumber" className="text-xs text-muted-foreground mb-1">NHS Number</Label>
                <Input id="nhsNumber" value={nhsNumber} onChange={e => setNhsNumber(e.target.value)} className="h-8 w-[140px] text-sm" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-blue-800 hover:bg-blue-900 text-sm">
                <Link to="/workflow/review" className="flex items-center gap-1" onClick={handleContinue}>
                  Continue <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-4" style={{ maxWidth: "1243px" }}>
        <StepProgress currentStep={1} steps={workflowSteps} />
      </div>
      
      <div className="container mx-auto px-6 py-8" style={{ maxWidth: "1243px" }}>
        <h1 className="font-bold mb-1 text-lg">Upload Documents</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Upload patient documents to start the assessment process.
        </p>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Medical Records</h2>
          <FileUploadSection
            description="Upload patient medical records, including clinical notes, past assessments, and any relevant medical history."
            section="medical-records"
          />
        </div>
        
        <Separator className="my-8" />
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Questionnaires</h2>
          <FileUploadSection
            description="Upload completed questionnaires, including ADHD assessments, anxiety scales, or other psychological evaluations."
            section="questionnaires"
          />
        </div>
        
        <Separator className="my-8" />
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">School Reports</h2>
          <FileUploadSection
            description="Upload school reports, teacher assessments, and any educational evaluations relevant to the patient's care."
            section="school-reports"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentPage;
