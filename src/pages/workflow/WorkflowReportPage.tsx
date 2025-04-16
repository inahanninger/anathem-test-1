import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import ReviewPage from "../ReviewPage";
import { ClinicalLayout } from "@/components/ClinicalLayout";
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
  name: "Generate",
  path: "/workflow/generate"
}, {
  name: "Report",
  path: "/workflow/report"
}];
const WorkflowReportPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  return <ClinicalLayout>
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100 px-6 py-[12px] bg-neutral-50">
          <div className="container max-w-5xl mx-auto">
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
                  <Link to="/workflow/generate" className="flex items-center gap-1">
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
        
        <div className="container max-w-5xl mx-auto py-4">
          <StepProgress currentStep={5} steps={workflowSteps} />
        </div>
        
        <div className="mt-0">
          <ReviewPage />
        </div>
      </div>
    </ClinicalLayout>;
};
export default WorkflowReportPage;