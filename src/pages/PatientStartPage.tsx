
import React, { useState } from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Button } from "@/components/ui/button";
import FileUploadSection from "@/components/FileUploadSection";
import { ArrowRightIcon, FileTextIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type FileUpload = {
  id: string;
  name: string;
  type: string;
  dateUploaded: Date;
  size: number;
};

const PatientStartPage = () => {
  const [patientName, setPatientName] = useState("");
  const [nhsNumber, setNhsNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [assessmentType, setAssessmentType] = useState("");

  const assessmentTypes = [
    "ADHD Assessment",
    "Autism Assessment",
    "ADHD/Autism Combined Assessment"
  ];

  const handleFileUpload = (files: File[], documentType: string) => {
    const newUploads = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: "patient file",
      dateUploaded: new Date(),
      size: file.size
    }));
    setUploads(prev => [...prev, ...newUploads]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const handleDeleteFile = (fileId: string) => {
    setUploads(uploads.filter(upload => upload.id !== fileId));
    toast.success("File deleted successfully");
  };

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
          <div className="container mx-auto w-6xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-neutral-900">Patient Start</h1>
              <Button asChild className="bg-blue-800 hover:bg-blue-900">
                <Link to="/workflow/upload" className="flex items-center gap-1">
                  Start Assessment <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 w-6xl">
          {/* Patient Information Section */}
          <div className="mb-8 bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nhsNumber">NHS Number</Label>
                <Input
                  id="nhsNumber"
                  value={nhsNumber}
                  onChange={(e) => setNhsNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Assessment Type Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Assessment Type</h2>
            <Select value={assessmentType} onValueChange={setAssessmentType}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                {assessmentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Patient Documents</h2>
            <FileUploadSection
              title="Upload Patient Files"
              documentType="patient-files"
              onFileUpload={handleFileUpload}
              uploadedFiles={uploads}
              onDeleteFile={handleDeleteFile}
            />
          </div>

          {/* Recent Files Section */}
          {uploads.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="space-y-3">
                  {uploads.map(file => (
                    <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <FileTextIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            Uploaded {file.dateUploaded.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClinicalLayout>
  );
};

export default PatientStartPage;
