
import React, { useState, useRef, useEffect } from "react";
import { ArrowRightIcon, UploadIcon, SettingsIcon, FileTextIcon, TrashIcon, Mic as MicIcon, Play, Square } from "lucide-react";
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

const workflowSteps = [
  { name: "Transcribe/Upload", path: "/transcribe" },
  { name: "Review", path: "/review" },
  { name: "Generate", path: "/generate" }
];

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

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
          <div className="container mx-auto w-6xl">
            <div className="flex items-center justify-between w-auto">
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
                <Button variant="outline" onClick={() => navigate('/patient-start')} className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                  Back to Patient
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-8 w-6xl">
          <div className="max-w-3xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="inputs" className="flex-1">Inputs / Generate</TabsTrigger>
                <TabsTrigger value="transcript" className="flex-1">Transcript</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inputs" className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-center">
                    {/* Audio waveform visualization - simplified for this example */}
                    <div className="flex items-center justify-center h-32 w-full">
                      <svg width="100%" height="60" viewBox="0 0 400 60">
                        <path 
                          d="M0,30 Q20,10 40,30 T80,30 T120,30 T160,30 T200,30 T240,30 T280,30 T320,30 T360,30 T400,30" 
                          fill="none" 
                          stroke={isRecording ? "red" : "#ddd"} 
                          strokeWidth="2"
                        />
                        <path 
                          d="M0,30 Q20,50 40,30 T80,30 T120,30 T160,30 T200,30 T240,30 T280,30 T320,30 T360,30 T400,30" 
                          fill="none" 
                          stroke={isRecording ? "red" : "#ddd"} 
                          strokeWidth="2"
                        />
                        {isRecording && (
                          <>
                            {/* Random "active" waveform elements */}
                            <path d="M50,30 Q60,10 70,30" fill="none" stroke="red" strokeWidth="2" />
                            <path d="M100,30 Q110,5 120,30" fill="none" stroke="red" strokeWidth="2" />
                            <path d="M150,30 Q160,15 170,30" fill="none" stroke="red" strokeWidth="2" />
                            <path d="M200,30 Q220,5 240,30" fill="none" stroke="red" strokeWidth="2" />
                            <path d="M250,30 Q270,20 290,30" fill="none" stroke="red" strokeWidth="2" />
                            <path d="M300,30 Q320,5 340,30" fill="none" stroke="red" strokeWidth="2" />
                          </>
                        )}
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center mt-4 space-x-4">
                    <div className="flex items-center space-x-2">
                      {isRecording ? (
                        <Button 
                          className="bg-red-500 hover:bg-red-600 text-white flex items-center" 
                          onClick={toggleRecording}
                        >
                          <Square className="w-4 h-4 mr-2" />
                          Stop Recording {recordingTime > 0 && `(${formatTime(recordingTime)})`}
                        </Button>
                      ) : (
                        <Button 
                          className="bg-blue-800 hover:bg-blue-900 text-white flex items-center" 
                          onClick={toggleRecording}
                        >
                          <MicIcon className="w-4 h-4 mr-2" />
                          Start Recording
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="transcript" className="p-4 border rounded-lg min-h-[400px]">
                {transcription ? (
                  <div className="p-4">
                    {transcription.split('\n').map((line, i) => (
                      <div key={i} className="mb-4">
                        <p className="whitespace-pre-wrap">{line}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-500">Transcript will appear here once recording is active</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ClinicalLayout>
  );
};

export default TranscribePage;
