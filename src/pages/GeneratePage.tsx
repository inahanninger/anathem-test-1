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
import FormProgress from "@/components/FormProgress";
const GeneratePage = () => {
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [summaryTypes, setSummaryTypes] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const completedSections = 2; // This could be dynamically calculated based on user's progress
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
      <div className="border-b border-gray-100 px-6 bg-white py-0">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb className="py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/report" className="flex items-center gap-1 text-blue-600">
                  <ArrowLeftIcon size={16} />
                  <span className="text-xs text-neutral-600">Transcribe</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/risk" className="text-xs text-neutral-600">
                  Risk Assessment
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-xs">Generate Report</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbItem className="ml-auto">
                <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                  Back
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm ml-2" onClick={handleGenerate}>Generate</Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/80 py-3 px-6">
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