
import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";

const workflowSteps = [
  { name: "Upload", path: "/workflow/upload" },
  { name: "Review", path: "/workflow/review" },
  { name: "Transcribe", path: "/workflow/transcribe" },
  { name: "Report", path: "/workflow/report" }
];

const ReviewInformationPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  
  const handleSave = () => {
    toast.success("Patient information saved");
  };

  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px] sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto" style={{
        maxWidth: "1243px"
      }}>
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
              <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                <Link to="/workflow/upload" className="flex items-center gap-1">
                  <ArrowLeftIcon size={16} /> Back
                </Link>
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900 text-sm">
                <Link to="/workflow/transcribe" className="flex items-center gap-1">
                  Continue <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-4" style={{
      maxWidth: "1243px"
    }}>
        <StepProgress currentStep={2} steps={workflowSteps} />
      </div>
      
      <div className="container mx-auto px-6 py-8" style={{
      maxWidth: "1243px"
    }}>
        <h1 className="font-bold mb-1 text-lg">Review Patient Information</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Please review and update the patient information below.
        </p>
        
        <Card className="p-6 w-full">
          <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
          <p className="text-gray-600">
            This section has been simplified to focus on the most essential information.
            More detailed patient information will be available in the next steps of the workflow.
          </p>
        </Card>
      </div>
    </div>;
};

export default ReviewInformationPage;
