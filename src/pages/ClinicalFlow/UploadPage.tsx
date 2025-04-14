
import { useState } from "react";
import { CheckIcon, FileIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProgressSteps from "@/components/ClinicalFlow/ProgressSteps";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      const validTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
      return validTypes.includes(fileType || '') && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles.length !== files.length) {
      toast.error("Some files were rejected. Please ensure all files are valid formats and under 10MB.");
    }

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
    }
  };

  const handleContinue = () => {
    if (uploadedFiles.length > 0) {
      navigate("/clinical-flow/review");
    } else {
      toast.error("Please upload at least one document before continuing");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-2">Clinical Report Generation</h1>
        <p className="text-gray-600 mb-8">Complete all steps to generate a comprehensive clinical report</p>
        
        <ProgressSteps currentStep={0} />

        <div 
          className={`mt-16 border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileIcon className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-blue-700 mb-2">Click to upload or drag and drop</h2>
          <p className="text-gray-500 mb-6">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
          
          <input 
            type="file" 
            id="file-upload" 
            className="hidden"
            multiple 
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
          />
          <label htmlFor="file-upload">
            <Button className="bg-blue-700 hover:bg-blue-800">
              Select Files
            </Button>
          </label>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Uploaded Files ({uploadedFiles.length})</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="flex-1 text-gray-800">{file.name}</span>
                  <span className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button 
            className="bg-blue-700 hover:bg-blue-800 px-8" 
            onClick={handleContinue}
            disabled={uploadedFiles.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
