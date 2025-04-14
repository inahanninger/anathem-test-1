import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import WorkflowHeader from "@/components/workflow/WorkflowHeader";
import { mainWorkflowSteps } from "@/constants/workflowSteps";

const GeneratePage = () => {
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [summaryTypes, setSummaryTypes] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const completedSections = 2; 
  const totalSections = 6;

  const handleSummaryTypeChange = (type: string) => {
    if (summaryTypes.includes(type)) {
      setSummaryTypes(summaryTypes.filter(item => item !== type));
    } else {
      setSummaryTypes([...summaryTypes, type]);
    }
  };

  const handleDocumentChange = (doc: string) => {
    if (selectedDocuments.includes(doc)) {
      setSelectedDocuments(selectedDocuments.filter(item => item !== doc));
    } else {
      setSelectedDocuments([...selectedDocuments, doc]);
    }
  };

  const handleGenerate = () => {
    if (!appointmentType) {
      toast.error("Please select an appointment type");
      return;
    }
    if (summaryTypes.length === 0) {
      toast.error("Please select at least one summary type");
      return;
    }
    if (selectedDocuments.length === 0) {
      toast.error("Please select at least one document");
      return;
    }
    toast.success("Starting report generation");
  };

  return <div className="min-h-screen bg-white">
      <WorkflowHeader 
        patientName={patientName}
        setPatientName={setPatientName}
        nhsNumber={nhsNumber}
        setNhsNumber={setNhsNumber}
        completedSections={completedSections}
        totalSections={totalSections}
        currentStep={4}
        steps={mainWorkflowSteps}
        backLink="/transcribe"
        nextLink="/report"
        onNext={handleGenerate}
        nextButtonText="Generate"
      />
      
      <div className="container max-w-5xl mx-auto px-4 py-[16px]">
        <h1 className="font-semibold mb-8 text-lg">Select the Drafts You Need</h1>
        
        <Card className="p-6 mb-8 py-[24px]">
          <div className="space-y-6">
            <div>
              <Label htmlFor="appointment-type" className="text-body font-semibold mb-2 block">Appointment type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger id="appointment-type" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up Appointment</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="therapy">Therapy Session</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-body font-semibold mb-3 block">Summary type</Label>
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
            
            <div>
              <Label className="text-body font-semibold mb-3 block">Documents</Label>
              <Input type="text" placeholder="Search" className="mb-3" />
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="adhd" checked={selectedDocuments.includes("adhd")} onCheckedChange={() => handleDocumentChange("adhd")} />
                  <Label htmlFor="adhd" className="text-base text-sm">ADHD Assessment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="adhd-autism" checked={selectedDocuments.includes("adhd-autism")} onCheckedChange={() => handleDocumentChange("adhd-autism")} />
                  <Label htmlFor="adhd-autism" className="text-base text-sm">ADHD/Autism Assessment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="autism-dev" checked={selectedDocuments.includes("autism-dev")} onCheckedChange={() => handleDocumentChange("autism-dev")} />
                  <Label htmlFor="autism-dev" className="text-base text-sm">Autism Developmental History</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="adhd-dev" checked={selectedDocuments.includes("adhd-dev")} onCheckedChange={() => handleDocumentChange("adhd-dev")} />
                  <Label htmlFor="adhd-dev" className="text-base text-sm">ADHD Developmental History</Label>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>;
};

export default GeneratePage;
