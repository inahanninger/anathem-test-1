
import React, { useState } from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UploadStatus, SnapValue, UploadedFile, RecordedSession } from "@/types/patient";
import PatientHeader from "@/components/patient/PatientHeader";
import TranscribeConsultationCard from "@/components/patient/TranscribeConsultationCard";
import SnapIvCard from "@/components/patient/SnapIvCard";
import DocumentUploadSection from "@/components/patient/DocumentUploadSection";
import ContinueConfirmDialog from "@/components/patient/ContinueConfirmDialog";

const PatientStartPage = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    snap4: false,
    teacherSummary: true, // Set to true as shown in the wireframe
    abcReport: false,
    connorsQuestionnaire: false,
    consultationRecorded: false,
    developmentHistory: false
  });
  const [generateConfirmOpen, setGenerateConfirmOpen] = useState(false);
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [snapValues, setSnapValues] = useState<SnapValue[]>([{
    id: '1',
    value: '',
    source: 'Teacher'
  }]);
  const [teacherFiles, setTeacherFiles] = useState<UploadedFile[]>([{
    id: '1',
    name: 'Merry Cameron Report.pdf',
    size: 2500000,
    dateUploaded: new Date()
  }]);
  const [adhdFiles, setAdhdFiles] = useState<UploadedFile[]>([]);
  const [connorsFiles, setConnorsFiles] = useState<UploadedFile[]>([]);
  const [developmentFiles, setDevelopmentFiles] = useState<UploadedFile[]>([]);
  const [recordedSessions, setRecordedSessions] = useState<RecordedSession[]>([
    { id: '1', title: 'Initial Consultation', date: '24 April 2025', duration: '32:15' },
    { id: '2', title: 'Follow-up Session', date: '28 April 2025', duration: '16:42' }
  ]);
  
  const navigate = useNavigate();
  
  const handleAddSnapField = () => {
    const newId = (snapValues.length + 1).toString();
    setSnapValues([...snapValues, {
      id: newId,
      value: '',
      source: 'Teacher'
    }]);
  };
  
  const handleSnapValueChange = (id: string, value: string) => {
    setSnapValues(snapValues.map(item => item.id === id ? {
      ...item,
      value
    } : item));

    // Mark as completed if at least one field has a value
    if (value.trim() !== '') {
      setUploadStatus(prev => ({
        ...prev,
        snap4: true
      }));
    } else {
      // Check if any other field has a value
      const anyValueFilled = snapValues.some(item => item.id !== id && item.value.trim() !== '');
      setUploadStatus(prev => ({
        ...prev,
        snap4: anyValueFilled
      }));
    }
  };
  
  const handleSnapSourceChange = (id: string, source: string) => {
    setSnapValues(snapValues.map(item => item.id === id ? {
      ...item,
      source
    } : item));
  };
  
  const handleRemoveSnapField = (id: string) => {
    const newValues = snapValues.filter(item => item.id !== id);
    setSnapValues(newValues);

    // Check if any field still has a value
    const anyValueFilled = newValues.some(item => item.value.trim() !== '');
    setUploadStatus(prev => ({
      ...prev,
      snap4: anyValueFilled
    }));
  };
  
  const handleFileUpload = (files: File[], documentType: string) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      dateUploaded: new Date()
    }));
    
    if (documentType === 'teacher') {
      setTeacherFiles(prev => [...prev, ...newFiles]);
      setUploadStatus(prev => ({
        ...prev,
        teacherSummary: true
      }));
    } else if (documentType === 'adhd') {
      setAdhdFiles(prev => [...prev, ...newFiles]);
      setUploadStatus(prev => ({
        ...prev,
        abcReport: true
      }));
    } else if (documentType === 'connors') {
      setConnorsFiles(prev => [...prev, ...newFiles]);
      setUploadStatus(prev => ({
        ...prev,
        connorsQuestionnaire: true
      }));
    } else if (documentType === 'development') {
      setDevelopmentFiles(prev => [...prev, ...newFiles]);
      setUploadStatus(prev => ({
        ...prev,
        developmentHistory: true
      }));
    }
    toast.success(`${files.length} file(s) uploaded successfully`);
  };
  
  const handleDeleteFile = (id: string, documentType: string) => {
    if (documentType === 'teacher') {
      setTeacherFiles(prev => {
        const filtered = prev.filter(file => file.id !== id);
        if (filtered.length === 0) {
          setUploadStatus(prev => ({
            ...prev,
            teacherSummary: false
          }));
        }
        return filtered;
      });
    } else if (documentType === 'adhd') {
      setAdhdFiles(prev => {
        const filtered = prev.filter(file => file.id !== id);
        if (filtered.length === 0) {
          setUploadStatus(prev => ({
            ...prev,
            abcReport: false
          }));
        }
        return filtered;
      });
    } else if (documentType === 'connors') {
      setConnorsFiles(prev => {
        const filtered = prev.filter(file => file.id !== id);
        if (filtered.length === 0) {
          setUploadStatus(prev => ({
            ...prev,
            connorsQuestionnaire: false
          }));
        }
        return filtered;
      });
    } else if (documentType === 'development') {
      setDevelopmentFiles(prev => {
        const filtered = prev.filter(file => file.id !== id);
        if (filtered.length === 0) {
          setUploadStatus(prev => ({
            ...prev,
            developmentHistory: false
          }));
        }
        return filtered;
      });
    }
    toast.success("File deleted successfully");
  };
  
  const handleGenerateClick = () => {
    if (!uploadStatus.snap4 && !uploadStatus.teacherSummary && !uploadStatus.abcReport && 
        !uploadStatus.connorsQuestionnaire && !uploadStatus.consultationRecorded && 
        !uploadStatus.developmentHistory) {
      setGenerateConfirmOpen(true);
    } else {
      navigate("/workflow/upload");
    }
  };
  
  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-white">
        <PatientHeader 
          patientName={patientName}
          setPatientName={setPatientName}
          nhsNumber={nhsNumber}
          setNhsNumber={setNhsNumber}
          onContinue={handleGenerateClick}
        />

        <div className="bg-neutral-50/50 min-h-[calc(100vh-56px)] py-8">
          <div className="container mx-auto px-6 w-6xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-neutral-900">Patient Documents</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <TranscribeConsultationCard 
                  isCompleted={uploadStatus.consultationRecorded}
                  recordedSessions={recordedSessions}
                />
                
                <SnapIvCard 
                  snapValues={snapValues}
                  onValueChange={handleSnapValueChange}
                  onSourceChange={handleSnapSourceChange}
                  onAddField={handleAddSnapField}
                  onRemoveField={handleRemoveSnapField}
                />
              </div>
              
              <h2 className="text-xl font-semibold mb-4 text-neutral-900">Document Uploads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <DocumentUploadSection
                  title="Upload Merry Cameron Report"
                  documentType="teacher"
                  isCompleted={uploadStatus.teacherSummary}
                  uploadedFiles={teacherFiles}
                  onFileUpload={handleFileUpload}
                  onDeleteFile={handleDeleteFile}
                />

                <DocumentUploadSection
                  title="Upload ADHD Referral Pack"
                  documentType="adhd"
                  isCompleted={uploadStatus.abcReport}
                  uploadedFiles={adhdFiles}
                  onFileUpload={handleFileUpload}
                  onDeleteFile={handleDeleteFile}
                />

                <DocumentUploadSection
                  title="Upload Connor's Questionnaire"
                  documentType="connors"
                  isCompleted={uploadStatus.connorsQuestionnaire}
                  uploadedFiles={connorsFiles}
                  onFileUpload={handleFileUpload}
                  onDeleteFile={handleDeleteFile}
                />
                
                <DocumentUploadSection
                  title="Upload Developmental History"
                  documentType="development"
                  isCompleted={uploadStatus.developmentHistory}
                  uploadedFiles={developmentFiles}
                  onFileUpload={handleFileUpload}
                  onDeleteFile={handleDeleteFile}
                />
              </div>

              <div className="mt-8">
                <Button 
                  className="w-full py-5 text-base font-medium bg-blue-800 hover:bg-blue-900 shadow-md" 
                  onClick={handleGenerateClick}
                >
                  Generate Report
                </Button>
              </div>
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
