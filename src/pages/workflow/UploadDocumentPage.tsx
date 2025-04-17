
import React, { useState, useRef } from "react";
import { ArrowRightIcon, UploadIcon, FileTextIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";

type UploadType = "transcript" | "dictation" | "letter" | "patient notes";
interface FileUpload {
  id: string;
  name: string;
  type: UploadType | "";
  dateUploaded: Date;
  size: number;
}
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

const appointmentTypes = [
  "ADHD Assessment",
  "Autism Assessment",
  "ADHD/Autism Combined Assessment"
];

const UploadDocumentPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [appointmentType, setAppointmentType] = useState<string>(appointmentTypes[0]);
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileUpload | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const handleContinue = () => {
    if (uploads.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }
    navigate("/workflow/review");
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

  const handleFileClick = (file: FileUpload) => {
    setSelectedFile(file);
    setIsDialogOpen(true);
  };

  const handleUpdateFileType = (type: UploadType) => {
    if (!selectedFile) return;
    
    setUploads(prev => 
      prev.map(upload => 
        upload.id === selectedFile.id ? { ...upload, type } : upload
      )
    );
    
    setSelectedFile(prev => prev ? { ...prev, type } : null);
    toast.success(`File type updated to ${type}`);
  };

  return <ClinicalLayout>
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
                <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                  <Link to="/" className="flex items-center gap-1">
                    Cancel
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
        
        <div className="container mx-auto py-4 w-6xl">
          <StepProgress currentStep={1} steps={workflowSteps} />
        </div>
        
        <div className="container mx-auto px-6 py-8 w-6xl">
          <h1 className="font-bold mb-1 text-lg">Upload Documents</h1>
          <p className="text-gray-600 mb-8 text-sm">
            Upload your documents to get started with the workflow.
          </p>
          
          <div className="mb-8">
            <div className="flex flex-col">
              <Label htmlFor="appointmentType" className="text-sm font-medium mb-2">Appointment Type</Label>
              <Select
                value={appointmentType}
                onValueChange={setAppointmentType}
              >
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-8 w-full">
            <div className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center
                ${isDragging ? 'bg-blue-50 border-blue-300' : 'border-gray-300 bg-gray-50'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClickUpload}>
              <input type="file" ref={fileInputRef} onChange={e => handleFileUpload(e.target.files)} className="hidden" multiple />
              <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-blue-600 font-medium mb-2">Click to upload or drag and drop</p>
              <p className="text-gray-500 text-sm">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
            </div>
          </div>
          
          {uploads.length > 0 && <div className="w-full">
              <h2 className="font-semibold mb-4 text-base">Uploaded Documents</h2>
              <div className="space-y-3">
                {uploads.map(file => (
                  <div 
                    key={file.id} 
                    className="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleFileClick(file)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <FileTextIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)} • Uploaded {formatDate(file.dateUploaded)}
                          {file.type && ` • Type: ${file.type}`}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file.id);
                      }}
                    >
                      <TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
            <DialogDescription>
              View and manage file details
            </DialogDescription>
          </DialogHeader>
          
          {selectedFile && (
            <div className="py-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileTextIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedFile.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.size)} • Uploaded {formatDate(selectedFile.dateUploaded)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fileType" className="block mb-2">File Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={selectedFile.type === "transcript" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => handleUpdateFileType("transcript")}
                    >
                      Transcript
                    </Button>
                    <Button 
                      variant={selectedFile.type === "dictation" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => handleUpdateFileType("dictation")}
                    >
                      Dictation
                    </Button>
                    <Button 
                      variant={selectedFile.type === "letter" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => handleUpdateFileType("letter")}
                    >
                      Letter
                    </Button>
                    <Button 
                      variant={selectedFile.type === "patient notes" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => handleUpdateFileType("patient notes")}
                    >
                      Patient Notes
                    </Button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Label className="block mb-2">Preview</Label>
                  <div className="border rounded-md p-4 h-32 bg-gray-50 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Preview not available</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ClinicalLayout>;
};

export default UploadDocumentPage;
