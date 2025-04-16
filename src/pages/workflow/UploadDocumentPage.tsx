
import { useState, useRef } from "react";
import { ArrowRightIcon, UploadIcon, FileTextIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import FileUploadSection from "@/components/FileUploadSection";
import { Skeleton } from "@/components/ui/skeleton";

type AssessmentType = "adhd" | "autism" | "combined" | "";
type UploadType = "dictation" | "transcription" | "patient notes" | "letter";

interface FileUpload {
  id: string;
  name: string;
  type: UploadType | "";
  dateUploaded: Date;
  size: number;
  section?: string; // To track which section the file belongs to
}

const workflowSteps = [
  {
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
  }
];

const UploadDocumentPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [assessmentType, setAssessmentType] = useState<AssessmentType>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const sections = [
    { id: "conners", name: "Conners Questionnaire", required: true },
    { id: "snap4", name: "SNAP4", required: false },
    { id: "qbtest", name: "QB Test Results", required: true },
    { id: "preassessment", name: "Other Pre-assessment Info", required: false },
    { id: "qbscore", name: "QB Score", required: true }
  ];

  const handleFileUpload = (files: FileList | null, sectionId: string) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    const newUpload: FileUpload = {
      id: crypto.randomUUID(),
      name: file.name,
      type: "",
      dateUploaded: new Date(),
      size: file.size,
      section: sectionId
    };
    
    const filteredUploads = uploads.filter(upload => upload.section !== sectionId);
    
    setUploads([...filteredUploads, newUpload]);
    toast.success(`${file.name} uploaded successfully`);
  };

  const handleDeleteFile = (fileId: string) => {
    const fileToDelete = uploads.find(upload => upload.id === fileId);
    if (fileToDelete) {
      setUploads(uploads.filter(upload => upload.id !== fileId));
      toast.success("File deleted successfully");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, sectionId: string) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files, sectionId);
  };

  const handleClickUpload = (sectionId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, sectionId);
    input.click();
  };

  const handleSubmitFiles = () => {
    toast.success("Files submitted successfully");
    navigate("/workflow/review");
  };

  const handleAssessmentChange = (value: string) => {
    setAssessmentType(value as AssessmentType);
  };

  const isFileUploaded = (sectionId: string) => {
    return uploads.some(upload => upload.section === sectionId);
  };

  const getFileForSection = (sectionId: string) => {
    return uploads.find(upload => upload.section === sectionId);
  };

  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px] sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto" style={{ maxWidth: "1243px" }}>
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
                <Link to="/">Back</Link>
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900 text-sm">
                <Link to="/workflow/review" className="flex items-center gap-1">
                  Continue <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-4" style={{ maxWidth: "1243px" }}>
        <StepProgress currentStep={1} steps={workflowSteps} />
      </div>
      
      <div className="container mx-auto px-6 py-8" style={{ maxWidth: "1243px" }}>
        <div className="mb-6">
          <Label htmlFor="assessmentType" className="text-sm font-medium mb-2 block">Select Assessment Type</Label>
          <Select value={assessmentType} onValueChange={handleAssessmentChange}>
            <SelectTrigger className="w-full md:w-80">
              <SelectValue placeholder="Select assessment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adhd">ADHD Assessment</SelectItem>
              <SelectItem value="autism">Autism Assessment</SelectItem>
              <SelectItem value="combined">ADHD/Autism Combined Assessment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {assessmentType ? (
          <>
            <h1 className="font-bold mb-1 text-lg">Upload Documents</h1>
            <p className="text-gray-600 mb-8 text-sm">
              Upload the required documents for assessment. You can drag and drop files or click to upload.
            </p>
            
            <div className="mb-8">
              {/* Documents Section */}
              <FileUploadSection title="Documents" required>
                {/* Map through document sections */}
                {sections.slice(0, 4).map((section) => (
                  <div key={section.id}>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="font-medium">
                        {section.name} {section.required && <span className="text-red-500">*</span>}
                      </Label>
                    </div>

                    {isFileUploaded(section.id) ? (
                      // Show the file card if a file has been uploaded
                      <div className="border rounded-lg p-4 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <FileTextIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{getFileForSection(section.id)?.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(getFileForSection(section.id)?.size || 0)}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            const fileId = getFileForSection(section.id)?.id;
                            if (fileId) handleDeleteFile(fileId);
                          }} 
                          className=""
                        >
                          <TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      // Show the upload area if no file has been uploaded
                      <div
                        className="rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, section.id)}
                        onClick={() => handleClickUpload(section.id)}
                      >
                        <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                        <p className="text-gray-500 text-sm text-center">Click or drag file to this area to upload</p>
                      </div>
                    )}
                  </div>
                ))}
              </FileUploadSection>

              {/* Inputs Section */}
              <FileUploadSection title="Inputs" required>
                {/* QB Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-medium">
                      QB Score <span className="text-red-500">*</span>
                    </Label>
                  </div>

                  {isFileUploaded('qbscore') ? (
                    // Show the file card if a file has been uploaded
                    <div className="border rounded-lg p-4 flex items-center justify-between bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <FileTextIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{getFileForSection('qbscore')?.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(getFileForSection('qbscore')?.size || 0)}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          const fileId = getFileForSection('qbscore')?.id;
                          if (fileId) handleDeleteFile(fileId);
                        }}
                      >
                        <TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    // Show the upload area if no file has been uploaded
                    <div
                      className="rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, 'qbscore')}
                      onClick={() => handleClickUpload('qbscore')}
                    >
                      <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-gray-500 text-sm text-center">Click or drag file to this area to upload</p>
                    </div>
                  )}
                </div>
              </FileUploadSection>

              {/* Submit Button */}
              <div className="flex justify-end mt-8">
                <Button 
                  className="bg-blue-900 hover:bg-blue-950"
                  onClick={handleSubmitFiles}
                >
                  <UploadIcon size={16} className="mr-2" />
                  Submit Files
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Skeleton Loader when no assessment type is selected
          <div className="mb-8">
            {/* Skeleton for title and subtitle */}
            <Skeleton className="h-7 w-48 mb-1" />
            <Skeleton className="h-5 w-96 mb-8" />

            <Skeleton className="h-7 w-32 mb-4" />
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-9 w-32" />
                </div>
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-9 w-32" />
                </div>
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-9 w-32" />
                </div>
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
            </div>
            
            <Skeleton className="h-7 w-24 mb-4 mt-8" />
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-9 w-32" />
                </div>
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <Skeleton className="h-10 w-36 rounded-md" />
            </div>
          </div>
        )}
      </div>
    </div>;
};

export default UploadDocumentPage;
