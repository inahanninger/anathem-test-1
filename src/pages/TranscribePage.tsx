
import React, { useState, useRef, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon, UploadIcon, SettingsIcon, FileTextIcon, TrashIcon, Mic as MicIcon, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import RecordingButton from "@/components/RecordingButton";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import StepProgress from "@/components/StepProgress";

type UploadType = "transcript" | "dictation" | "letter" | "patient notes";

interface FileUpload {
  id: string;
  name: string;
  type: UploadType | "";
  dateUploaded: Date;
  size: number;
}

const workflowSteps = [{
  name: "Transcribe/Upload",
  path: "/transcribe"
}, {
  name: "Review",
  path: "/review"
}, {
  name: "Generate",
  path: "/generate"
}];

const TranscribePage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("inputs");
  const navigate = useNavigate();

  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
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

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Recording stopped");
      setTranscription("Speaker 1: blah blah\nSpeaker 2: blue bleeh");
      // Navigate back to patient start page after recording is done
      setTimeout(() => {
        navigate("/patient-start");
        toast.success("Consultation recorded successfully");
      }, 1500);
    } else {
      setIsRecording(true);
      toast.success("Recording started");
      setTranscription("");
    }
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
                <Link to="/patient-start">
                  <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                    Back to Patient
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-8 w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
                <div className="flex items-center space-x-4">
                  <RecordingButton isRecording={isRecording} onClick={toggleRecording} className="min-w-[140px]" />
                  {isRecording && <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                    </div>}
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SettingsIcon className="h-4 w-4" />
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
                    <TabsTrigger value="transcript" className="flex-1">
                      <FileTextIcon className="w-4 h-4 mr-2" />
                      Clinical Notes
                    </TabsTrigger>
                    <TabsTrigger value="file-upload" className="flex-1">
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Upload Files
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="transcript" className="p-4 min-h-[400px] m-0 border-0">
                  <Textarea placeholder="Enter clinical notes here..." className="min-h-[370px] resize-none border-0 focus-visible:ring-0" />
                  <div className="text-xs text-gray-400 mt-2 text-right">
                    Changes are automatically saved
                  </div>
                </TabsContent>
                
                <TabsContent value="file-upload" className="min-h-[400px] m-0 border-0">
                  <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50/50">
                    <div className="text-center space-y-4 max-w-sm">
                      <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <UploadIcon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Upload Files</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Upload any supporting documents or files related to this consultation
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full max-w-[200px]"
                      >
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </ClinicalLayout>;
};

export default TranscribePage;
