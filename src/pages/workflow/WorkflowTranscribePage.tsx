import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon, MicIcon, UploadIcon, SettingsIcon, FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

const WorkflowTranscribePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [activeTab, setActiveTab] = useState<string>("clinical-notes");
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Recording stopped");
      // Simulating a transcription result
      setTranscription("This is a sample transcription that would be generated from the recording.");
    } else {
      setIsRecording(true);
      toast.success("Recording started");
    }
  };
  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-[4px]">
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
                  <Link to="/workflow/review" className="flex items-center gap-1">
                    <ArrowLeftIcon size={16} /> Back
                  </Link>
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm ml-2">
                  <Link to="/workflow/generate" className="flex items-center gap-1">
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
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto py-4">
        <StepProgress currentStep={3} steps={workflowSteps} />
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="font-bold mb-1 text-lg">Transcribe Consultation</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Record and transcribe your consultation or add clinical notes manually.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <MicIcon className="w-5 h-5 text-blue-800" />
                <h2 className="text-base font-semibold">Transcription</h2>
              </div>
              <div className="flex gap-2">
                <Button className={`px-4 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-red-700 hover:bg-red-800'}`} onClick={toggleRecording}>
                  <MicIcon className="w-4 h-4 mr-2" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                <Button variant="outline" size="icon" className="bg-white">
                  <SettingsIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 min-h-[400px] bg-white">
              {transcription ? <div className="p-4 text-sm px-[8px] py-[8px]">{transcription}</div> : <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500 bg-gray-50 rounded-md">
                  <p className="text-sm">Click the button above to start recording your consultation. Transcription will appear here once active.</p>
                </div>}
            </div>
          </Card>

          <Card className="rounded-lg overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
              <div className="bg-gray-50 p-4 border-b">
                <TabsList className="w-full bg-gray-100">
                  <TabsTrigger value="clinical-notes" className="flex-1">
                    <FileTextIcon className="w-4 h-4 mr-2" />
                    Clinical Notes
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="clinical-notes" className="p-4 min-h-[400px] m-0 border-0">
                <Textarea placeholder="Enter clinical notes here..." value={clinicalNotes} onChange={e => setClinicalNotes(e.target.value)} className="min-h-[370px] resize-none border-0 focus-visible:ring-0" />
                <div className="text-xs text-gray-400 mt-2 text-right">
                  Changes are automatically saved
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>;
};

export default WorkflowTranscribePage;
