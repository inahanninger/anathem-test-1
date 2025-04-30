
import React from "react";
import { UploadedFile } from "@/types/patient";
import DocumentUploadSection from "./DocumentUploadSection";

interface DocumentUploadsSectionProps {
  teacherFiles: UploadedFile[];
  adhdFiles: UploadedFile[];
  connorsFiles: UploadedFile[];
  developmentFiles: UploadedFile[];
  uploadStatus: {
    teacherSummary: boolean;
    abcReport: boolean;
    connorsQuestionnaire: boolean;
    developmentHistory: boolean;
  };
  onFileUpload: (files: File[], documentType: string) => void;
  onDeleteFile: (id: string, documentType: string) => void;
}

const DocumentUploadsSection: React.FC<DocumentUploadsSectionProps> = ({
  teacherFiles,
  adhdFiles,
  connorsFiles,
  developmentFiles,
  uploadStatus,
  onFileUpload,
  onDeleteFile
}) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-neutral-900">Document Uploads</h2>
      <div className="space-y-4">
        <DocumentUploadSection
          title="Upload Merry Cameron Report"
          documentType="teacher"
          isCompleted={uploadStatus.teacherSummary}
          uploadedFiles={teacherFiles}
          onFileUpload={onFileUpload}
          onDeleteFile={onDeleteFile}
        />

        <DocumentUploadSection
          title="Upload ADHD Referral Pack"
          documentType="adhd"
          isCompleted={uploadStatus.abcReport}
          uploadedFiles={adhdFiles}
          onFileUpload={onFileUpload}
          onDeleteFile={onDeleteFile}
        />

        <DocumentUploadSection
          title="Upload Connor's Questionnaire"
          documentType="connors"
          isCompleted={uploadStatus.connorsQuestionnaire}
          uploadedFiles={connorsFiles}
          onFileUpload={onFileUpload}
          onDeleteFile={onDeleteFile}
        />
        
        <DocumentUploadSection
          title="Upload Developmental History"
          documentType="development"
          isCompleted={uploadStatus.developmentHistory}
          uploadedFiles={developmentFiles}
          onFileUpload={onFileUpload}
          onDeleteFile={onDeleteFile}
        />
      </div>
    </section>
  );
};

export default DocumentUploadsSection;
