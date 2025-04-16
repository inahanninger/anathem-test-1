
import { useState, useRef } from "react";
import { ArrowRightIcon, UploadIcon, FileTextIcon, TrashIcon, MicIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Link } from "react-router-dom";
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
    name: "Generate",
    path: "/workflow/generate"
  }, {
    name: "Report",
    path: "/workflow/report"
  }
];

const UploadDocumentPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [patientCareName, setPatientCareName] = useState("");
  const [transcription, setTranscription] = useState("");
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [assessmentType, setAssessmentType] = useState<AssessmentType>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null, fileType?: string) => {
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      // Create new file upload
      const newUpload: FileUpload = {
        id: crypto.randomUUID(),
        name: file.name,
        type: (fileType as UploadType) || "",
        dateUploaded: new Date(),
        size: file.size
      };
      setUploads(prev => [...prev, newUpload]);
      toast.success(`${file.name} uploaded successfully`);
    });
  };

  const handleFileTypeChange = (fileId: string, type: string) => {
    setUploads(uploads.map(upload => upload.id === fileId ? {
      ...upload,
      type: type as UploadType
    } : upload));
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, fileType?: string) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files, fileType);
  };

  const handleClickUpload = (fileInputRef: React.RefObject<HTMLInputElement>) => {
    fileInputRef.current?.click();
  };
  
  const handleTranscribe = () => {
    toast.success("Transcription started");
    // Simulate transcription after a delay
    setTimeout(() => {
      setTranscription("This is a sample transcription text that would be generated from the recording.");
      toast.success("Transcription completed");
    }, 2000);
  };

  const handleSubmitFiles = () => {
    toast.success("Files submitted successfully");
    // Navigate to the next step
  };

  const handleAssessmentChange = (value: string) => {
    setAssessmentType(value as AssessmentType);
  };

  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
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
      
      <div className="container max-w-5xl mx-auto py-4">
        <StepProgress currentStep={1} steps={workflowSteps} />
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-8">
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

        <h1 className="font-bold mb-1 text-lg">Upload Documents</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Upload the required documents for assessment. You can drag and drop files or click to upload.
        </p>
        
        {assessmentType ? (
          <Card className="p-8 mb-8">
            {/* Documents Section */}
            <FileUploadSection title="Documents" required>
              {/* Conners Questionnaire */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">
                    Conners Questionnaire <span className="text-red-500">*</span>
                  </Label>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <UploadIcon size={16} />
                    Browse Files
                  </Button>
                </div>
                <div
                  className={`border border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-colors
                    ${isDragging ? 'bg-blue-50 border-blue-300' : 'border-gray-300 bg-gray-50'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "dictation")}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, "dictation");
                    input.click();
                  }}
                >
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm text-center">Click or drag file to this area to upload</p>
                </div>
              </div>
              
              {/* SNAP4 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">SNAP4</Label>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <UploadIcon size={16} />
                    Browse Files
                  </Button>
                </div>
                <div
                  className="border border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "transcription")}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, "transcription");
                    input.click();
                  }}
                >
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm text-center">Click or drag file to this area to upload</p>
                </div>
              </div>

              {/* QB Test Results */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">
                    QB Test Results <span className="text-red-500">*</span>
                  </Label>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <UploadIcon size={16} />
                    Browse Files
                  </Button>
                </div>
                <div
                  className="border border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "patient notes")}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, "patient notes");
                    input.click();
                  }}
                >
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm text-center">Click or drag file to this area to upload</p>
                </div>
              </div>

              {/* Other Pre-assessment Info */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">Other Pre-assessment Info</Label>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <UploadIcon size={16} />
                    Browse Files
                  </Button>
                </div>
                <div
                  className="border border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "letter")}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, "letter");
                    input.click();
                  }}
                >
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm text-center">Click or drag file to this area to upload</p>
                </div>
              </div>
            </FileUploadSection>

            {/* Inputs Section */}
            <FileUploadSection title="Inputs" required>
              {/* Patient Care Name */}
              <div>
                <Label htmlFor="patientCareName" className="font-medium block mb-2">Patient Care Name</Label>
                <Input 
                  id="patientCareName" 
                  value={patientCareName} 
                  onChange={e => setPatientCareName(e.target.value)} 
                  placeholder="Enter patient care name"
                  className="w-full"
                />
              </div>

              {/* QB Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">
                    QB Score <span className="text-red-500">*</span>
                  </Label>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <UploadIcon size={16} />
                    Browse Files
                  </Button>
                </div>
                <div
                  className="border border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files);
                    input.click();
                  }}
                >
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm text-center">Click or drag file to this area to upload</p>
                </div>
              </div>
            </FileUploadSection>

            {/* Consultation Transcript Section */}
            <FileUploadSection title="Consultation Transcript" className="mb-0">
              <div className="space-y-4">
                <Label htmlFor="transcript" className="font-medium block">Transcript</Label>
                <Textarea 
                  id="transcript"
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                  placeholder="Active transcription appears here..."
                  className="min-h-[150px] resize-none bg-gray-50"
                  readOnly={true}
                />
                <div className="flex gap-2">
                  <Button 
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleTranscribe}
                  >
                    <MicIcon size={16} className="mr-2" />
                    Transcribe
                  </Button>
                  <Button variant="outline" size="icon">
                    <SettingsIcon size={16} />
                  </Button>
                </div>
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
              
            {uploads.length > 0 && (
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Uploaded Documents</h3>
                <div className="space-y-3">
                  {uploads.map(file => (
                    <div key={file.id} className="border rounded-lg p-4 flex items-center justify-between bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <FileTextIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select value={file.type} onValueChange={value => handleFileTypeChange(file.id, value)}>
                          <SelectTrigger className="w-44">
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dictation">Dictation</SelectItem>
                            <SelectItem value="transcription">Transcription</SelectItem>
                            <SelectItem value="patient notes">Patient Notes</SelectItem>
                            <SelectItem value="letter">Letter</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)} className="">
                          <TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : (
          // Skeleton Loader when no assessment type is selected
          <Card className="p-8 mb-8">
            <div className="mb-8">
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
            </div>
            
            <div className="mb-8">
              <Skeleton className="h-7 w-24 mb-4" />
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-9 w-32" />
                  </div>
                  <Skeleton className="h-40 w-full rounded-lg" />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <Skeleton className="h-7 w-48 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-36 w-full rounded-md" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <Skeleton className="h-10 w-36 rounded-md" />
            </div>
          </Card>
        )}
      </div>
    </div>;
};

export default UploadDocumentPage;
