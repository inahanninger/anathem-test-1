
import React, { useState, useRef } from "react";
import { UploadIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUploadSection from "./FileUploadSection";
import { toast } from "sonner";

/**
 * This is an example component demonstrating different ways to use the FileUploadSection component
 */
const FileUploadExamples: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) uploaded`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic usage with simple upload button */}
      <FileUploadSection title="Basic File Upload">
        <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6">
          <Button onClick={() => fileInputRef.current?.click()}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Select Files
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
            className="hidden" 
            multiple 
          />
        </div>
      </FileUploadSection>

      {/* Required file upload with additional form elements */}
      <FileUploadSection title="Document Upload" required={true}>
        <Label htmlFor="document-type">Document Type</Label>
        <Input id="document-type" placeholder="Enter document type" className="mb-4" />
        
        <Label htmlFor="document-description">Description</Label>
        <Input id="document-description" placeholder="Enter a description" className="mb-4" />
        
        <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6 bg-gray-50">
          <Button variant="outline">
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </FileUploadSection>

      {/* Custom styling example */}
      <FileUploadSection title="Profile Picture" className="bg-blue-50 p-4 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
            <Upload className="h-8 w-8 text-gray-500" />
          </div>
          <Button size="sm" variant="secondary">Change Picture</Button>
        </div>
      </FileUploadSection>
    </div>
  );
};

export default FileUploadExamples;
