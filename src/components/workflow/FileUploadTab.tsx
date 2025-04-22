
import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FileUploadTab = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) uploaded`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50/50">
      <div className="text-center space-y-4 max-w-sm">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <Upload className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Upload Files</h3>
          <p className="text-sm text-gray-500 mt-1">
            Upload any supporting documents or files related to this consultation
          </p>
        </div>
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full max-w-[200px]"
        >
          Choose Files
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          multiple
        />
        {files.length > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            {files.length} file(s) selected
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadTab;
