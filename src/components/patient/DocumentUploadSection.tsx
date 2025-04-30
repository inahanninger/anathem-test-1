
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FileUploadSection from "@/components/FileUploadSection";
import { UploadedFile } from "@/types/patient";

interface DocumentUploadSectionProps {
  title: string;
  documentType: string;
  isCompleted: boolean;
  uploadedFiles: UploadedFile[];
  onFileUpload: (files: File[], documentType: string) => void;
  onDeleteFile: (id: string, documentType: string) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  title,
  documentType,
  isCompleted,
  uploadedFiles,
  onFileUpload,
  onDeleteFile
}) => {
  return (
    <Card className={`transition-all border-2 ${isCompleted ? 'bg-emerald-50 border-emerald-200' : 'border-gray-200'}`}>
      <CardContent className="p-5">
        <FileUploadSection 
          title={title} 
          documentType={documentType} 
          onFileUpload={files => onFileUpload(files, documentType)} 
          uploadedFiles={uploadedFiles} 
          onDeleteFile={id => onDeleteFile(id, documentType)} 
        />
      </CardContent>
    </Card>
  );
};

export default DocumentUploadSection;
