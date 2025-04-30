import React, { useState } from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, FileTextIcon, MicIcon, AlertCircle, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import FileUploadSection from "@/components/FileUploadSection";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UploadStatus {
  snap4: boolean;
  teacherSummary: boolean;
  abcReport: boolean;
  connorsQuestionnaire: boolean;
  consultationRecorded: boolean;
  developmentHistory: boolean;
}

interface SnapValue {
  id: string;
  value: string;
  source: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  dateUploaded: Date;
}

interface RecordedSession {
  id: string;
  title: string;
  date: string;
  duration: string;
}

const PatientStartPage = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    snap4: false,
    teacherSummary: true,
    // Set to true as shown in the wireframe
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
    if (!uploadStatus.snap4 && !uploadStatus.teacherSummary && !uploadStatus.abcReport && !uploadStatus.connorsQuestionnaire && !uploadStatus.consultationRecorded && !uploadStatus.developmentHistory) {
      setGenerateConfirmOpen(true);
    } else {
      navigate("/workflow/upload");
    }
  };
  
  return <ClinicalLayout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
          <div className="container mx-auto w-6xl">
            <div className="flex items-center justify-between w-auto">
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
                  <Link to="/" className="flex items-center gap-1">Save & Exit</Link>
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm" onClick={handleGenerateClick}>
                  <span className="flex items-center gap-1">
                    Continue <ArrowRightIcon size={16} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 w-6xl">
          <div className="max-w-lg mx-auto space-y-4">
            {/* Transcribe Consultation Card */}
            <Card className={`transition-all border-2 ${uploadStatus.consultationRecorded ? 'bg-emerald-50 border-emerald-200' : 'border-gray-200'}`}>
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-4">Transcribe Consultation</h3>
                
                <Link to="/transcribe" className="w-full block">
                  <Button className="bg-red-800 hover:bg-red-900 w-full py-2">
                    <MicIcon className="mr-2 h-5 w-5" />
                    <span>Start New Recording</span>
                  </Button>
                </Link>
                
                {recordedSessions.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-sm font-medium text-gray-600">Recorded Sessions</h4>
                    {recordedSessions.map(session => (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                        <div>
                          <h5 className="font-medium">{session.title}</h5>
                          <div className="text-sm text-gray-500">{session.date} · {session.duration}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <FileTextIcon size={16} className="mr-2" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* 1. Enter SNAP-IV results */}
            <Card className="transition-all border-2 hover:shadow-md">
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-4">Enter SNAP-IV results</h3>
                <div className="space-y-3">
                  {snapValues.map(item => <div key={item.id} className="flex items-center gap-2">
                      <Input 
                        value={item.value} 
                        onChange={e => handleSnapValueChange(item.id, e.target.value)} 
                        placeholder="Enter SNAP-IV value" 
                        className="flex-1" 
                      />
                      <Select 
                        value={item.source} 
                        onValueChange={(value) => handleSnapSourceChange(item.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Teacher">Teacher</SelectItem>
                          <SelectItem value="Parent">Parent</SelectItem>
                        </SelectContent>
                      </Select>
                      {snapValues.length > 1 && <Button variant="outline" size="icon" onClick={() => handleRemoveSnapField(item.id)} className="shrink-0">
                          <Trash2 size={16} />
                        </Button>}
                    </div>)}
                  <Button variant="outline" size="sm" onClick={handleAddSnapField} className="w-full">
                    <Plus size={16} className="mr-2" />
                    Add Value
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 2. Upload Merry Cameron Report */}
            <Card className={`transition-all border-2 ${uploadStatus.teacherSummary ? 'bg-emerald-50 border-emerald-200' : 'border-gray-200'}`}>
              <CardContent className="p-5">
                <FileUploadSection title="Upload Merry Cameron Report" documentType="teacher" onFileUpload={handleFileUpload} uploadedFiles={teacherFiles} onDeleteFile={id => handleDeleteFile(id, "teacher")} />
              </CardContent>
            </Card>

            {/* 3. Upload ADHD Referral Pack */}
            <Card className={`transition-all border-2 ${uploadStatus.abcReport ? 'bg-emerald-50 border-emerald-200' : 'border-gray-200'}`}>
              <CardContent className="p-5">
                <FileUploadSection title="Upload ADHD Referral Pack" documentType="adhd" onFileUpload={handleFileUpload} uploadedFiles={adhdFiles} onDeleteFile={id => handleDeleteFile(id, "adhd")} />
              </CardContent>
            </Card>

            {/* 4. Upload Connor's Questionnaire */}
            <Card className={`transition-all border-2 ${uploadStatus.connorsQuestionnaire ? 'bg-emerald-50 border-emerald-200' : 'border-gray-200'}`}>
              <CardContent className="p-5">
                <FileUploadSection title="Upload Connor's Questionnaire" documentType="connors" onFileUpload={handleFileUpload} uploadedFiles={connorsFiles} onDeleteFile={id => handleDeleteFile(id, "connors")} />
              </CardContent>
            </Card>
            
            {/* 5. Upload Developmental History */}
            <Card className={`transition-all border-2 ${uploadStatus.developmentHistory ? 'bg-emerald-50 border-emerald-200' : 'border-gray-200'}`}>
              <CardContent className="p-5">
                <FileUploadSection title="Upload Developmental History" documentType="development" onFileUpload={handleFileUpload} uploadedFiles={developmentFiles} onDeleteFile={id => handleDeleteFile(id, "development")} />
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button className={`w-full py-6 text-lg bg-blue-800 hover:bg-blue-900`} onClick={handleGenerateClick}>
              Generate
            </Button>
          </div>
        </div>
      </div>

      {/* Generate Confirmation Dialog */}
      <AlertDialog open={generateConfirmOpen} onOpenChange={setGenerateConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Continue without uploads?</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex items-center text-amber-600 mb-2">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>No documents or recordings have been added.</span>
              </div>
              Are you sure you want to proceed without adding any documentation?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/workflow/upload")}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ClinicalLayout>;
};

export default PatientStartPage;
