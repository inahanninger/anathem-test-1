
import React, { useState } from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, FileTextIcon, MicIcon, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";

interface UploadStatus {
  snap4: boolean;
  teacherSummary: boolean;
  abcReport: boolean;
  consultationRecorded: boolean;
}

const PatientStartPage = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    snap4: false,
    teacherSummary: true, // Set to true as shown in the wireframe
    abcReport: false,
    consultationRecorded: false,
  });
  const [generateConfirmOpen, setGenerateConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleUploadSnap4 = () => {
    // Here you would handle the actual file upload
    setTimeout(() => {
      setUploadStatus(prev => ({ ...prev, snap4: true }));
      toast.success("SNAP4 uploaded successfully");
    }, 500);
  };

  const handleUploadABCReport = () => {
    // Here you would handle the actual file upload
    setTimeout(() => {
      setUploadStatus(prev => ({ ...prev, abcReport: true }));
      toast.success("ABC Report uploaded successfully");
    }, 500);
  };

  const handleGenerateClick = () => {
    if (!uploadStatus.snap4 && !uploadStatus.teacherSummary && 
        !uploadStatus.abcReport && !uploadStatus.consultationRecorded) {
      setGenerateConfirmOpen(true);
    } else {
      navigate("/workflow/upload");
    }
  };

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
          <div className="container mx-auto w-6xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-neutral-900">Patient Assessment</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 w-6xl">
          <div className="max-w-lg mx-auto space-y-4">
            {/* Upload SNAP4 Button */}
            <Card 
              className={`p-6 transition-all hover:shadow-md cursor-pointer border-2 ${uploadStatus.snap4 ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
              onClick={handleUploadSnap4}
            >
              <div className="flex items-center justify-center">
                <span className="text-lg font-medium">Upload SNAP4</span>
              </div>
            </Card>

            {/* Teacher Summary Button - Already uploaded in wireframe */}
            <Card 
              className="p-6 transition-all bg-neutral-50 border-2 border-neutral-200"
            >
              <div className="flex items-center justify-center">
                <span className="text-lg font-medium">Teacher Summary Uploaded</span>
              </div>
            </Card>

            {/* Upload ABC Report Button */}
            <Card 
              className={`p-6 transition-all hover:shadow-md cursor-pointer border-2 ${uploadStatus.abcReport ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
              onClick={handleUploadABCReport}
            >
              <div className="flex items-center justify-center">
                <span className="text-lg font-medium">Upload ABC Report</span>
              </div>
            </Card>

            {/* Record Consultation Button */}
            <Link to="/transcribe">
              <Card 
                className="p-6 transition-all hover:shadow-md cursor-pointer bg-red-50 border-2 border-red-200"
              >
                <div className="flex items-center justify-center">
                  <MicIcon className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-lg font-medium text-red-500">Record Consultation</span>
                </div>
              </Card>
            </Link>

            {/* Generate Button */}
            <Button 
              className={`w-full py-6 text-lg ${uploadStatus.consultationRecorded ? 'bg-blue-500' : ''}`}
              onClick={handleGenerateClick}
            >
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
    </ClinicalLayout>
  );
};

export default PatientStartPage;
