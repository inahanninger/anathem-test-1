
import React, { useState, useRef } from "react";
import { UploadIcon, FileTextIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadSectionProps {
  /**
   * The title of the file upload section
   */
  title: string;

  /**
   * Whether the file upload is required
   * @default false
   */
  required?: boolean;

  /**
   * Optional CSS class name to apply to the component
   */
  className?: string;

  /**
   * The document type to be set for uploaded files
   */
  documentType: string;

  /**
   * Callback function when files are uploaded
   */
  onFileUpload: (files: File[], documentType: string) => void;

  /**
   * Array of already uploaded files for this section
   */
  uploadedFiles?: Array<{
    id: string;
    name: string;
    size: number;
    dateUploaded: Date;
    component?: React.ReactNode;
  }>;

  /**
   * Callback function when a file is deleted
   */
  onDeleteFile?: (fileId: string) => void;

  /**
   * Optional children for custom content
   */
  children?: React.ReactNode;
}

/**
 * A reusable file upload section component that displays a title,
 * optional required indicator, and contains file upload elements.
 */
const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  title,
  required = false,
  className,
  documentType,
  onFileUpload,
  uploadedFiles = [],
  onDeleteFile,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    onFileUpload(Array.from(files), documentType);
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

  return (
    <div className={`mb-6 ${className || ""}`}>
      <h3 className="text-base font-semibold mb-2 flex items-center">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h3>
      
      <div className="space-y-3">
        {children || (
          <div 
            className={`w-full border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-colors
              ${isDragging ? 'bg-blue-50 border-blue-300' : 'border-gray-300 bg-gray-50/80'}`} 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={handleDrop} 
            onClick={handleClickUpload}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={e => handleFileUpload(e.target.files)} 
              className="hidden" 
              multiple 
            />
            <UploadIcon className="h-6 w-6 text-gray-400 mb-2" />
            <p className="text-blue-600 font-medium mb-1 text-sm">Click to upload or drag and drop</p>
            <p className="text-gray-500 text-xs">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            {uploadedFiles.map(file => (
              <div key={file.id} className="bg-white rounded-lg p-3 border border-gray-100 hover:bg-gray-50">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <FileTextIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • Uploaded {formatDate(file.dateUploaded)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {file.component}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={e => {
                        e.stopPropagation();
                        onDeleteFile && onDeleteFile(file.id);
                      }}
                    >
                      <TrashIcon className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;
