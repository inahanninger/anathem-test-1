import React, { useState, useRef } from "react";
import { ArrowRightIcon, UploadIcon, SettingsIcon, FileTextIcon, TrashIcon, Mic as MicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import RecordingButton from "@/components/RecordingButton";

type UploadType = "transcript" | "dictation" | "letter" | "patient notes";
interface FileUpload {
  id: string;
  name: string;
  type: UploadType | "";
  dateUploaded: Date;
  size: number;
}

const TranscribePage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [activeTab, setActiveTab] = useState<string>("clinical-notes");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const completedSections = 1;
  const totalSections = 6;

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      const newUpload: FileUpload = {
        id: crypto.randomUUID(),
        name: file.name,
        type: "",
        dateUploaded: new Date(),
        size: file.size
      };
      setUploads(prev => [...prev, newUpload]);
      toast.success(`${file.name} uploaded successfully`);
    });
  };

  const handleDeleteFile = (fileId: string) => {
    setUploads(uploads.filter(upload => upload.id !== fileId));
    toast.success("File deleted successfully");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Recording stopped");
      setTranscription("This is a sample transcription that would be generated from the recording.");
    } else {
      setIsRecording(true);
      toast.success("Recording started");
      setTranscription("");
    }
  };

  const handleContinue = () => {
    if (uploads.length === 0 && !transcription) {
      toast.error("Please upload a file or create a transcription");
      return;
    }
    toast.success("Generating report");
    navigate("/workflow/report");
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/80 py-3 px-6 sticky top-0 z-10 shadow-sm">
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
              <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                Back
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900 text-sm flex items-center gap-1" onClick={handleContinue}>
                Continue <ArrowRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-6 w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          <div>
            <Card className="rounded-lg overflow-hidden w-full h-full">
              <div className="p-4 flex items-center justify-between border-b bg-transparent">
                <div className="flex items-center gap-2">
                  <MicIcon className="w-5 h-5 text-blue-800" />
                  <h2 className="text-base font-semibold">Transcription</h2>
                </div>
                <div className="flex gap-2">
                  <RecordingButton isRecording={isRecording} onClick={toggleRecording} />
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
          </div>

          <div>
            <Card className="rounded-lg overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
                <div className="p-4 border-b bg-transparent">
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
                
                <TabsContent value="file-upload" className="m-0 p-4 min-h-[400px] border-0">
                  <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center mb-4 transition-colors h-48
                      ${isDragging ? 'bg-blue-50 border-blue-300' : 'border-gray-300 bg-gray-50'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClickUpload}>
                    <input type="file" ref={fileInputRef} onChange={e => handleFileUpload(e.target.files)} className="hidden" multiple />
                    <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-blue-600 font-medium mb-2 text-sm">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-xs">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                  </div>
                  
                  {uploads.length > 0 && <div>
                      <h3 className="font-medium text-lg mb-3">Uploaded Documents</h3>
                      <div className="space-y-3">
                        {uploads.map(file => <div key={file.id} className="border rounded-lg p-4 flex items-center justify-between bg-white">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <FileTextIcon className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)}>
                              <TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                            </Button>
                          </div>)}
                      </div>
                    </div>}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};

export default TranscribePage;
