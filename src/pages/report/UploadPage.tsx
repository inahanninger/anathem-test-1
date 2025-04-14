
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, File, X } from "lucide-react";
import Stepper from "@/components/Stepper";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Upload", description: "Upload supporting documents" },
  { id: 2, name: "Review", description: "Review information" },
  { id: 3, name: "Transcribe", description: "Record consultation" },
  { id: 4, name: "Select", description: "Select report type" },
  { id: 5, name: "Review", description: "Final review" },
];

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
}

export default function UploadPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substring(2),
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast.info("File removed");
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleContinue = () => {
    if (uploadedFiles.length > 0) {
      navigate("/report/review");
    } else {
      toast.error("Please upload at least one document");
    }
  };

  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <Stepper steps={steps} currentStep={1} />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">Upload Supporting Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <Upload className="h-12 w-12 mx-auto text-blue-800 mb-4" />
            <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
            <p className="text-gray-500 mb-4">or click to browse</p>
            <Button>
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileSelect}
              />
              Browse Files
            </Button>
            <p className="text-xs text-gray-400 mt-3">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {uploadedFiles.map((file) => (
                <li key={file.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {getFileIcon(file.type)}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFile(file.id)}
                    className="text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end mt-8 space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleContinue}>Continue to Review</Button>
      </div>
    </div>
  );
}
