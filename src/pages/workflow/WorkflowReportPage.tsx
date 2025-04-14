
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import ReviewPage from "../ReviewPage";

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
  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-4">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="text-xs text-blue-600">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">Document Assessment</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbItem className="ml-auto">
                <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                  <Link to="/workflow/generate" className="flex items-center gap-1">
                    <ArrowLeftIcon size={16} /> Back
                  </Link>
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm ml-2">
                  <Link to="/" className="flex items-center gap-1">
                    Finish
                  </Link>
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/80 py-6 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-col">
            <StepProgress currentStep={5} steps={workflowSteps} />
            <div className="flex items-center gap-4 mt-6">
              <div className="flex flex-col">
                <label className="text-xs text-muted-foreground mb-1">Patient Name</label>
                <div className="text-sm">James Wilson</div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-muted-foreground mb-1">NHS Number</label>
                <div className="text-sm">NHS123456789</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <ReviewPage />
      </div>
    </div>;
};

export default WorkflowReportPage;
