import { useState, useRef } from "react";
import { ArrowRightIcon, UploadIcon, FileTextIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
type UploadType = "dictation" | "transcription" | "patient notes" | "letter";
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
  name: "Generate",
  path: "/workflow/generate"
}, {
  name: "Report",
  path: "/workflow/report"
}];
const UploadDocumentPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      // Create new file upload
      const newUpload: FileUpload = {
        id: crypto.randomUUID(),
        name: file.name,
        type: "",
        // Empty by default, user will select from dropdown
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
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };
  const handleClickUpload = () => {
    fileInputRef.current?.click();
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
                  <Link to="/">Back</Link>
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm ml-2">
                  <Link to="/workflow/review" className="flex items-center gap-1">
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
          <div className="">
            <div className="flex items-center gap-4 mb-6">
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
      </div>
      
      <div className="container max-w-5xl mx-auto py-4">
        <StepProgress currentStep={1} steps={workflowSteps} />
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="font-bold mb-1 text-lg">Upload Documents</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Upload the required documents for assessment. You can drag and drop files or click to upload.
        </p>
        
        <Card className="p-8 mb-8">
          <div className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center transition-colors
                ${isDragging ? 'bg-blue-50 border-blue-300' : 'border-gray-300 bg-gray-50'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClickUpload}>
            <input type="file" ref={fileInputRef} onChange={e => handleFileUpload(e.target.files)} className="hidden" multiple />
            <UploadIcon className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-blue-600 font-medium mb-2">Click to upload or drag and drop</p>
            <p className="text-gray-500 text-sm">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
          </div>
          
          {uploads.length > 0 && <div className="mt-8">
              <h3 className="font-medium text-lg mb-4">Uploaded Documents</h3>
              <div className="space-y-3">
                {uploads.map(file => <div key={file.id} className="border rounded-lg p-4 flex items-center justify-between bg-white">
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
                  </div>)}
              </div>
            </div>}
        </Card>
      </div>
    </div>;
};
export default UploadDocumentPage;