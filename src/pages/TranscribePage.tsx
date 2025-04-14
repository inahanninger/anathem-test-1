
import { useState } from "react";
import { ArrowRightIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FormProgress from "@/components/FormProgress";

type UploadType = "transcript" | "dictation" | "letter" | "patient notes";

interface FileUpload {
  id: string;
  name: string;
  type: UploadType;
  dateUploaded: Date;
  size: number;
}

const TranscribePage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [uploadType, setUploadType] = useState<UploadType | "">("");
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const completedSections = 1;
  const totalSections = 6;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!uploadType) {
      toast.error("Please select an upload type");
      return;
    }

    const file = e.target.files[0];
    
    // Create new file upload with selected tag
    const newUpload: FileUpload = {
      id: crypto.randomUUID(),
      name: file.name,
      type: uploadType as UploadType,
      dateUploaded: new Date(),
      size: file.size,
    };

    setUploads([...uploads, newUpload]);
    toast.success(`${file.name} uploaded successfully as ${uploadType}`);
    
    // Reset file input and upload type
    e.target.value = "";
    setUploadType("");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleContinue = () => {
    if (uploads.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }
    
    toast.success("Continuing to Generate Report");
    window.location.href = "/generate";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-0">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb className="py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-xs">Transcribe</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/risk" className="text-xs text-neutral-600">
                  Risk Assessment
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/generate" className="text-xs text-neutral-600 flex items-center gap-1">
                  <span>Generate Report</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="ml-auto">
                <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                  Back
                </Button>
                <Button 
                  className="bg-blue-800 hover:bg-blue-900 text-sm ml-2 flex items-center gap-1"
                  onClick={handleContinue}
                >
                  Continue <ArrowRightIcon size={16} />
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/80 py-3 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <Label htmlFor="patientName" className="text-xs text-muted-foreground mb-1">Patient Name</Label>
                <Input 
                  id="patientName" 
                  value={patientName} 
                  onChange={e => setPatientName(e.target.value)} 
                  className="h-8 w-[180px] text-sm" 
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="nhsNumber" className="text-xs text-muted-foreground mb-1">NHS Number</Label>
                <Input 
                  id="nhsNumber" 
                  value={nhsNumber} 
                  onChange={e => setNhsNumber(e.target.value)} 
                  className="h-8 w-[140px] text-sm" 
                />
              </div>
            </div>
            <FormProgress completedSections={completedSections} totalSections={totalSections} />
          </div>
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-semibold mb-8">Upload Files</h1>
        
        <Card className="p-6 mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="upload-type" className="text-base font-medium mb-2 block">Upload Type</Label>
                <Select value={uploadType} onValueChange={value => setUploadType(value as UploadType)}>
                  <SelectTrigger id="upload-type" className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transcript">Transcript</SelectItem>
                    <SelectItem value="dictation">Dictation</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="patient notes">Patient Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="file-upload" className="text-base font-medium mb-2 block">Choose File</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="file-upload" 
                    type="file"
                    onChange={handleFileUpload}
                    className="flex-1" 
                  />
                  <Button 
                    type="button"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="flex items-center gap-1"
                  >
                    <UploadIcon size={18} />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Select upload type before uploading a file</p>
              </div>
            </div>
            
            {uploads.length > 0 && (
              <div>
                <h2 className="text-lg font-medium mb-3">Uploaded Files</h2>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm">File Name</th>
                        <th className="text-left px-4 py-3 text-sm">Type</th>
                        <th className="text-left px-4 py-3 text-sm">Date</th>
                        <th className="text-left px-4 py-3 text-sm">Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uploads.map(file => (
                        <tr key={file.id} className="border-b last:border-0">
                          <td className="px-4 py-3 text-sm">{file.name}</td>
                          <td className="px-4 py-3 text-sm capitalize">{file.type}</td>
                          <td className="px-4 py-3 text-sm">{formatDate(file.dateUploaded)}</td>
                          <td className="px-4 py-3 text-sm">{formatFileSize(file.size)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TranscribePage;
