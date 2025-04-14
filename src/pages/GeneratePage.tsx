
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const GeneratePage = () => {
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [summaryTypes, setSummaryTypes] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  
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
  
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-0">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb className="py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/report" className="flex items-center gap-1 text-blue-600">
                  <ArrowLeftIcon size={16} />
                  <span className="text-xs text-neutral-600">Report</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-xs">Generate Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-semibold mb-8">Select the Drafts You Need</h1>
        
        <Card className="p-6 mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="appointment-type" className="text-base font-medium mb-2 block">Appointment type</Label>
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
              <Label className="text-base font-medium mb-3 block">Summary type</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="brief" 
                    checked={summaryTypes.includes("brief")} 
                    onCheckedChange={() => handleSummaryTypeChange("brief")}
                  />
                  <Label htmlFor="brief" className="text-base">Brief</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="detailed" 
                    checked={summaryTypes.includes("detailed")} 
                    onCheckedChange={() => handleSummaryTypeChange("detailed")}
                  />
                  <Label htmlFor="detailed" className="text-base">Detailed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mental-state" 
                    checked={summaryTypes.includes("mental-state")} 
                    onCheckedChange={() => handleSummaryTypeChange("mental-state")}
                  />
                  <Label htmlFor="mental-state" className="text-base">Mental state examination</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-3 block">Documents</Label>
              <Input type="text" placeholder="Search" className="mb-3" />
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="adhd" 
                    checked={selectedDocuments.includes("adhd")}
                    onCheckedChange={() => handleDocumentChange("adhd")}
                  />
                  <Label htmlFor="adhd" className="text-base">ADHD Assessment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="adhd-autism" 
                    checked={selectedDocuments.includes("adhd-autism")}
                    onCheckedChange={() => handleDocumentChange("adhd-autism")}
                  />
                  <Label htmlFor="adhd-autism" className="text-base">ADHD/Autism Assessment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="autism-dev" 
                    checked={selectedDocuments.includes("autism-dev")}
                    onCheckedChange={() => handleDocumentChange("autism-dev")}
                  />
                  <Label htmlFor="autism-dev" className="text-base">Autism Developmental History</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="adhd-dev" 
                    checked={selectedDocuments.includes("adhd-dev")}
                    onCheckedChange={() => handleDocumentChange("adhd-dev")}
                  />
                  <Label htmlFor="adhd-dev" className="text-base">ADHD Developmental History</Label>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100">
            Back
          </Button>
          <Button 
            className="bg-blue-800 hover:bg-blue-900"
            onClick={handleGenerate}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
