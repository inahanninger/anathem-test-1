import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
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
const GenerateAssessmentPage = () => {
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);
  const [summaryTypes, setSummaryTypes] = useState<string[]>([]);
  const handleAssessmentChange = (assessment: string) => {
    if (selectedAssessments.includes(assessment)) {
      setSelectedAssessments(selectedAssessments.filter(item => item !== assessment));
    } else {
      setSelectedAssessments([...selectedAssessments, assessment]);
    }
  };
  const handleSummaryTypeChange = (type: string) => {
    if (summaryTypes.includes(type)) {
      setSummaryTypes(summaryTypes.filter(item => item !== type));
    } else {
      setSummaryTypes([...summaryTypes, type]);
    }
  };
  const handleGenerate = () => {
    if (selectedAssessments.length === 0) {
      toast.error("Please select at least one assessment type");
      return;
    }
    toast.success("Starting report generation");
  };
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
                  <Link to="/workflow/transcribe" className="flex items-center gap-1">
                    <ArrowLeftIcon size={16} /> Back
                  </Link>
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm ml-2">
                  <Link to="/workflow/report" className="flex items-center gap-1">
                    Continue <ArrowRightIcon size={16} />
                  </Link>
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/80 py-6 px-6">
        <div className="container max-w-5xl mx-auto">
          <StepProgress currentStep={4} steps={workflowSteps} />
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="font-bold mb-1 text-lg">Generate Assessment</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Select the assessment types you need to generate.
        </p>
        
        <Card className="p-6 mb-8">
          <div className="space-y-6">
            <div>
              <Label className="text-body font-semibold mb-3 block">Assessment Type</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="adhd" checked={selectedAssessments.includes("adhd")} onCheckedChange={() => handleAssessmentChange("adhd")} />
                  <Label htmlFor="adhd" className="text-base text-sm">ADHD Assessment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="autism" checked={selectedAssessments.includes("autism")} onCheckedChange={() => handleAssessmentChange("autism")} />
                  <Label htmlFor="autism" className="text-base text-sm">Autism Assessment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="memory" checked={selectedAssessments.includes("memory")} onCheckedChange={() => handleAssessmentChange("memory")} />
                  <Label htmlFor="memory" className="text-base text-sm">Memory Assessment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="combined" checked={selectedAssessments.includes("combined")} onCheckedChange={() => handleAssessmentChange("combined")} />
                  <Label htmlFor="combined" className="text-base text-sm">ADHD/Autism Combined Assessment</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-body font-semibold mb-3 block">Summary Type</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="brief" checked={summaryTypes.includes("brief")} onCheckedChange={() => handleSummaryTypeChange("brief")} />
                  <Label htmlFor="brief" className="text-base text-sm">Brief</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="detailed" checked={summaryTypes.includes("detailed")} onCheckedChange={() => handleSummaryTypeChange("detailed")} />
                  <Label htmlFor="detailed" className="text-base text-sm">Detailed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="mental-state" checked={summaryTypes.includes("mental-state")} onCheckedChange={() => handleSummaryTypeChange("mental-state")} />
                  <Label htmlFor="mental-state" className="text-base text-sm">Mental state examination</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button className="bg-blue-800 hover:bg-blue-900" onClick={handleGenerate}>
              Generate Assessment
            </Button>
          </div>
        </Card>
      </div>
    </div>;
};
export default GenerateAssessmentPage;