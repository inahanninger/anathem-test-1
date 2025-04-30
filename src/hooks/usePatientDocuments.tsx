
import { useState } from "react";
import { UploadStatus, SnapValue, UploadedFile, RecordedSession } from "@/types/patient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function usePatientDocuments() {
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
  
  // Calculate total documents
  const totalDocuments = teacherFiles.length + adhdFiles.length + 
                        connorsFiles.length + developmentFiles.length;
  
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

  return {
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
  };
}
