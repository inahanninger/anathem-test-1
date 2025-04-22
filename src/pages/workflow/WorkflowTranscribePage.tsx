import React, { useState, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon, MicIcon, SettingsIcon, FileTextIcon, VideoIcon, UploadIcon, Volume2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import RecordingButton from "@/components/RecordingButton";
import StepProgress from "@/components/StepProgress";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import FileUploadTab from "@/components/workflow/FileUploadTab";
import { Timer } from 'lucide-react';

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

const WorkflowTranscribePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [activeTab, setActiveTab] = useState<string>("clinical-notes");
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [isOnlineCall, setIsOnlineCall] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const navigate = useNavigate();

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Recording stopped");
      setTranscription("This is a sample transcription that would be generated from the recording.");
    } else {
      setIsRecording(true);
      toast.success("Recording started");
    }
  };

  const handleContinue = () => {
    toast.success("Generating report");
    navigate("/workflow/report");
  };

  const toggleOnlineCall = () => {
    setIsOnlineCall(!isOnlineCall);
    toast.info(isOnlineCall ? "Online call disabled" : "Online call enabled");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return <ClinicalLayout>
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
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
              <Button variant="outline" className="text-sm bg-inherit text-inherit">
                <Link to="/workflow/review" className="flex items-center gap-1">
                  <ArrowLeftIcon size={16} /> Back
                </Link>
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900 text-sm" onClick={handleContinue}>
                <span className="flex items-center gap-1">
                  Continue <ArrowRightIcon size={16} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-4">
        <StepProgress currentStep={3} steps={workflowSteps} />
      </div>
      
      <div className="container mx-auto px-6 py-[8px] w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
              <div className="flex items-center space-x-4">
                <RecordingButton 
                  isRecording={isRecording} 
                  onClick={toggleRecording}
                  className="min-w-[140px]"
                />
                {isRecording && (
                  <div className="flex items-center space-x-3">
                    <Timer className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <Volume2 className="h-4 w-4 text-gray-600" />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Online Call</span>
                  <Switch
                    checked={isOnlineCall}
                    onCheckedChange={toggleOnlineCall}
                  />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
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
                  <TabsTrigger value="file-upload" className="flex-1">
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload Files
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="clinical-notes" className="p-4 min-h-[400px] m-0 border-0">
                <Textarea placeholder="Enter clinical notes here..." value={clinicalNotes} onChange={e => setClinicalNotes(e.target.value)} className="min-h-[370px] resize-none border-0 focus-visible:ring-0" />
                <div className="text-xs text-gray-400 mt-2 text-right">
                  Changes are automatically saved
                </div>
              </TabsContent>
              
              <TabsContent value="file-upload" className="min-h-[400px] m-0 border-0">
                <FileUploadTab />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  </ClinicalLayout>;
};

export default WorkflowTranscribePage;
