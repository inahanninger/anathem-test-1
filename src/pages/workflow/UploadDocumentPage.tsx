import React, { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUploadSection from "@/components/FileUploadSection";
type UploadType = "transcript" | "dictation" | "letter" | "patient notes";
const documentTypes = ["referral letter", "patient information", "QB report", "Connor's questionaire", "SNAP4"] as const;
type DocumentType = typeof documentTypes[number];
interface FileUpload {
  id: string;
  name: string;
  type: UploadType | "";
  documentType: DocumentType | "";
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
const appointmentTypes = ["ADHD Assessment", "Autism Assessment", "ADHD/Autism Combined Assessment"];

// Categories for file uploads
const FILE_CATEGORIES = {
  CONNERS: "Connor's questionaire",
  SNAP4: "SNAP4",
  QB_TEST: "QB report",
  PATIENT_NOTES: "patient notes"
} as const;
const UploadDocumentPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [appointmentType, setAppointmentType] = useState<string>(appointmentTypes[0]);
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const navigate = useNavigate();
  const handleFileUpload = (files: File[], documentType: DocumentType | "") => {
    files.forEach(file => {
      const newUpload: FileUpload = {
        id: crypto.randomUUID(),
        name: file.name,
        type: "",
        documentType: documentType,
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
  const handleContinue = () => {
    if (uploads.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }
    navigate("/workflow/review");
  };

  // Get files for a specific document type
  const getUploadsByType = (documentType: DocumentType | "") => {
    return uploads.filter(upload => upload.documentType === documentType);
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
        
        <div className="container mx-auto px-6 py-8 w-6xl bg-inherit">
          <h1 className="font-bold mb-1 text-lg">Upload Assessment Documents</h1>
          <p className="text-gray-600 mb-8 text-sm">
            Upload the required documents for the assessment pathway.
          </p>
          
          <div className="mb-8">
            <div className="flex flex-col">
              <Label htmlFor="appointmentType" className="text-sm font-medium mb-2">Appointment Type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map(type => <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-8">
            
            
            <FileUploadSection title="Conners Questionnaire" required={true} documentType={FILE_CATEGORIES.CONNERS} onFileUpload={files => handleFileUpload(files, FILE_CATEGORIES.CONNERS)} uploadedFiles={getUploadsByType(FILE_CATEGORIES.CONNERS)} onDeleteFile={handleDeleteFile} />
            
            <FileUploadSection title="SNAP-IV Rating Scale" required={true} documentType={FILE_CATEGORIES.SNAP4} onFileUpload={files => handleFileUpload(files, FILE_CATEGORIES.SNAP4)} uploadedFiles={getUploadsByType(FILE_CATEGORIES.SNAP4)} onDeleteFile={handleDeleteFile} />
            
            <FileUploadSection title="QB Test Results" required={true} documentType={FILE_CATEGORIES.QB_TEST} onFileUpload={files => handleFileUpload(files, FILE_CATEGORIES.QB_TEST)} uploadedFiles={getUploadsByType(FILE_CATEGORIES.QB_TEST)} onDeleteFile={handleDeleteFile} />
            
            <FileUploadSection title="Patient Notes" documentType={FILE_CATEGORIES.PATIENT_NOTES} onFileUpload={files => handleFileUpload(files, FILE_CATEGORIES.PATIENT_NOTES)} uploadedFiles={getUploadsByType(FILE_CATEGORIES.PATIENT_NOTES)} onDeleteFile={handleDeleteFile} />
          </div>
        </div>
      </div>
    </ClinicalLayout>;
};
export default UploadDocumentPage;