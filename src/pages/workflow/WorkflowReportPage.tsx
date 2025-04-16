import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import ReviewPage from "../ReviewPage";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Skeleton } from "@/components/ui/skeleton";

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

const WorkflowReportPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return <ClinicalLayout>
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100 px-6 py-[12px] bg-neutral-50">
          <div className="container mx-auto w-6xl">
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
                  <Link to="/workflow/transcribe" className="flex items-center gap-1">
                    <ArrowLeftIcon size={16} /> Back
                  </Link>
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm">
                  <Link to="/" className="flex items-center gap-1">Download Documents</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-4 w-6xl">
          <StepProgress currentStep={4} steps={workflowSteps} />
        </div>
        
        {isLoading ? <div className="container mx-auto px-6 py-8 w-6xl">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-96 mb-8" />
            
            <div className="space-y-6">
              <Skeleton className="h-64 w-full mb-6" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div> : <div className="mt-0 w-6xl mx-auto">
            <ReviewPage />
          </div>}
      </div>
    </ClinicalLayout>;
};

export default WorkflowReportPage;
