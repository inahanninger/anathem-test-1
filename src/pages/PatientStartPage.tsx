
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { usePatientDocuments } from "@/hooks/usePatientDocuments";
import PatientHeader from "@/components/patient/PatientHeader";
import PatientDocumentsSection from "@/components/patient/PatientDocumentsSection";
import DocumentUploadsSection from "@/components/patient/DocumentUploadsSection";
import GenerateReportButton from "@/components/patient/GenerateReportButton";
import ContinueConfirmDialog from "@/components/patient/ContinueConfirmDialog";

const PatientStartPage = () => {
  const navigate = useNavigate();
  const {
    uploadStatus,
    generateConfirmOpen,
    setGenerateConfirmOpen,
    patientName,
    setPatientName,
    nhsNumber,
    setNhsNumber,
    snapValues,
    teacherFiles,
    adhdFiles,
    connorsFiles,
    developmentFiles,
    recordedSessions,
    totalDocuments,
    handleAddSnapField,
    handleSnapValueChange,
    handleSnapSourceChange,
    handleRemoveSnapField,
    handleFileUpload,
    handleDeleteFile,
    handleGenerateClick
  } = usePatientDocuments();
  
  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-white">
        <PatientHeader 
          patientName={patientName}
          setPatientName={setPatientName}
          nhsNumber={nhsNumber}
          setNhsNumber={setNhsNumber}
          onContinue={handleGenerateClick}
          documentCount={totalDocuments}
        />

        <div className="bg-neutral-50/50 min-h-[calc(100vh-56px)] py-8">
          <div className="container mx-auto px-6 w-6xl">
            <div className="max-w-4xl mx-auto space-y-8">
              <PatientDocumentsSection
                snapValues={snapValues}
                recordedSessions={recordedSessions}
                isConsultationRecorded={uploadStatus.consultationRecorded}
                onSnapValueChange={handleSnapValueChange}
                onSnapSourceChange={handleSnapSourceChange}
                onAddSnapField={handleAddSnapField}
                onRemoveSnapField={handleRemoveSnapField}
              />
              
              <DocumentUploadsSection
                teacherFiles={teacherFiles}
                adhdFiles={adhdFiles}
                connorsFiles={connorsFiles}
                developmentFiles={developmentFiles}
                uploadStatus={uploadStatus}
                onFileUpload={handleFileUpload}
                onDeleteFile={handleDeleteFile}
              />

              <GenerateReportButton onClick={handleGenerateClick} />
            </div>
          </div>
        </div>
      </div>

      <ContinueConfirmDialog
        open={generateConfirmOpen}
        onOpenChange={setGenerateConfirmOpen}
        onConfirm={() => navigate("/workflow/upload")}
      />
    </ClinicalLayout>
  );
};

export default PatientStartPage;
