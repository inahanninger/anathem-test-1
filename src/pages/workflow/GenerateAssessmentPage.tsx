import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
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
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
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
      

      <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
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
                <Link to="/workflow/transcribe" className="flex items-center gap-1">
                  <ArrowLeftIcon size={16} /> Back
                </Link>
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900 text-sm">
                <Link to="/workflow/report" className="flex items-center gap-1">
                  Continue <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto py-4">
        <StepProgress currentStep={4} steps={workflowSteps} />
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