
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormProgress from "@/components/FormProgress";
import StepProgress from "@/components/StepProgress";

interface WorkflowHeaderProps {
  patientName: string;
  setPatientName: (name: string) => void;
  nhsNumber: string;
  setNhsNumber: (number: string) => void;
  completedSections: number;
  totalSections: number;
  currentStep: number;
  steps: {
    name: string;
    path: string;
  }[];
  backLink?: string;
  nextLink?: string;
  onNext?: () => void;
  nextButtonText?: string;
  showStepper?: boolean;
}

const WorkflowHeader = ({
  patientName,
  setPatientName,
  nhsNumber,
  setNhsNumber,
  completedSections,
  totalSections,
  currentStep,
  steps,
  backLink,
  nextLink,
  onNext,
  nextButtonText = "Continue",
  showStepper = true
}: WorkflowHeaderProps) => {
  return (
    <>
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
                {backLink && (
                  <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                    <Link to={backLink} className="flex items-center gap-1">
                      <ArrowLeftIcon size={16} /> Back
                    </Link>
                  </Button>
                )}
                {(nextLink || onNext) && (
                  <Button className="bg-blue-800 hover:bg-blue-900 text-sm ml-2">
                    {nextLink ? (
                      <Link to={nextLink} className="flex items-center gap-1">
                        {nextButtonText}
                      </Link>
                    ) : (
                      <span onClick={onNext} className="flex items-center gap-1">
                        {nextButtonText}
                      </span>
                    )}
                  </Button>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

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
            <FormProgress completedSections={completedSections} totalSections={totalSections} />
          </div>
        </div>
      </div>
      
      {showStepper && (
        <div className="py-4 px-6 bg-transparent">
          <div className="container max-w-5xl mx-auto">
            <div className="flex flex-col">
              <StepProgress currentStep={currentStep} steps={steps} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkflowHeader;
