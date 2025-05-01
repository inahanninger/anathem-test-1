
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import FileUploadSection from "@/components/FileUploadSection";
import { UploadedFile } from "@/types/patient";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface DocumentUploadSectionProps {
  title: string;
  documentType: string;
  isCompleted: boolean;
  uploadedFiles: UploadedFile[];
  onFileUpload: (files: File[], documentType: string) => void;
  onDeleteFile: (id: string, documentType: string) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  title,
  documentType,
  isCompleted,
  uploadedFiles,
  onFileUpload,
  onDeleteFile
}) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [showSplitView, setShowSplitView] = useState(false);
  
  const handleFileClick = (file: UploadedFile) => {
    setSelectedFile(file);
    setShowSplitView(true);
  };
  
  const handleBackClick = () => {
    setShowSplitView(false);
    setSelectedFile(null);
  };
  
  if (showSplitView && selectedFile) {
    return (
      <Card className={`h-full transition-all border ${isCompleted ? 'bg-emerald-50 border-emerald-100' : 'border-gray-100'}`}>
        <CardContent className="p-0 h-full flex flex-col">
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{selectedFile.name}</h2>
              <p className="text-sm text-neutral-500">
                {selectedFile.dateUploaded.toLocaleDateString()} • {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleBackClick} className="h-8">
              Back
            </Button>
          </div>
          
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="p-6 h-full overflow-y-auto">
                <h3 className="text-lg font-medium mb-4">{title}</h3>
                <div className="space-y-3">
                  {uploadedFiles.map(file => (
                    <div 
                      key={file.id} 
                      className={`p-3 rounded-md border cursor-pointer ${file.id === selectedFile.id ? 'bg-neutral-50' : 'bg-white'}`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <h5 className="font-medium">{file.name}</h5>
                      <div className="text-xs text-neutral-500">
                        {file.dateUploaded.toLocaleDateString()} • {formatFileSize(file.size)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle className="bg-gray-200 w-[3px] mx-[5px]" />
            
            <ResizablePanel defaultSize={70} minSize={50}>
              <Tabs defaultValue="content" className="h-full flex flex-col">
                <div className="border-b px-6 py-2">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="content" className="p-6 flex-1 overflow-y-auto">
                  <h3 className="text-lg font-medium mb-4">Document Content</h3>
                  <p className="text-sm text-neutral-700">
                    This is the full content of the document. The content includes all details from the {selectedFile.name} file.
                  </p>
                  <DocumentPreview documentType={documentType} />
                </TabsContent>
                
                <TabsContent value="summary" className="p-6 flex-1 overflow-y-auto">
                  <h3 className="text-lg font-medium mb-4">Document Summary</h3>
                  <p className="text-sm text-neutral-700">
                    This is an AI-generated summary of the key points from the document.
                  </p>
                  <DocumentSummary documentType={documentType} />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`transition-all border ${isCompleted ? 'bg-emerald-50 border-emerald-100' : 'border-gray-100'}`}>
      <CardContent className="p-5">
        <FileUploadSection 
          title={title} 
          documentType={documentType} 
          onFileUpload={files => onFileUpload(files, documentType)} 
          uploadedFiles={uploadedFiles.map(file => ({
            ...file,
            component: (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleFileClick(file);
                }}
              >
                <FileTextIcon size={16} className="mr-2" />
                View
              </Button>
            )
          }))}
          onDeleteFile={id => onDeleteFile(id, documentType)} 
        />
      </CardContent>
    </Card>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface DocumentPreviewProps {
  documentType: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ documentType }) => {
  // This would be replaced with actual document content
  // For now, we'll show sample content based on document type
  const getPreviewContent = () => {
    switch (documentType) {
      case 'teacher':
        return (
          <div className="mt-4 p-4 bg-neutral-50 rounded-md">
            <p className="text-sm">
              <strong>Merry Cameron Report</strong><br/><br/>
              Student: James Wilson<br/>
              Class: 4B<br/>
              Date: April 15, 2025<br/><br/>
              James has been struggling with attention in class for the past few months. He often has difficulty completing tasks and following instructions. I've noticed that he gets distracted easily, especially during quiet reading time and math lessons.
            </p>
          </div>
        );
      case 'adhd':
        return (
          <div className="mt-4 p-4 bg-neutral-50 rounded-md">
            <p className="text-sm">
              <strong>ADHD Referral Pack</strong><br/><br/>
              Child's Name: James Wilson<br/>
              Date of Birth: June 12, 2018<br/>
              School: Greenwood Primary<br/><br/>
              This referral is being made due to ongoing concerns about James's attention span and hyperactive behavior. His teacher has reported difficulty with task completion and following classroom instructions.
            </p>
          </div>
        );
      case 'connors':
        return (
          <div className="mt-4 p-4 bg-neutral-50 rounded-md">
            <p className="text-sm">
              <strong>Conners' Questionnaire Results</strong><br/><br/>
              Child: James Wilson<br/>
              Completed by: Sarah Wilson (Parent)<br/><br/>
              <u>Ratings:</u><br/>
              Inattention: High (85th percentile)<br/>
              Hyperactivity: Moderate (70th percentile)<br/>
              Learning Problems: Low (30th percentile)<br/>
              Executive Functioning: Elevated (80th percentile)<br/>
              Aggression: Low (25th percentile)<br/>
              Peer Relations: Moderate (65th percentile)
            </p>
          </div>
        );
      case 'development':
        return (
          <div className="mt-4 p-4 bg-neutral-50 rounded-md">
            <p className="text-sm">
              <strong>Developmental History</strong><br/><br/>
              Name: James Wilson<br/>
              Birth: Full-term, no complications<br/>
              Early Development: Walked at 14 months, first words at 12 months<br/><br/>
              James's early developmental milestones were generally within normal ranges. Parents reported some sleep difficulties from age 2-3. No significant medical history or previous diagnoses. Family history indicates ADHD in paternal uncle.
            </p>
          </div>
        );
      default:
        return (
          <div className="mt-4 p-4 bg-neutral-50 rounded-md">
            <p className="text-sm">Document preview not available.</p>
          </div>
        );
    }
  };
  
  return getPreviewContent();
};

interface DocumentSummaryProps {
  documentType: string;
}

const DocumentSummary: React.FC<DocumentSummaryProps> = ({ documentType }) => {
  // This would be replaced with actual AI-generated summary
  // For now, we'll show sample content based on document type
  const getSummaryContent = () => {
    switch (documentType) {
      case 'teacher':
        return (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-neutral-50 rounded-md">
              <h4 className="font-medium mb-2">Key Observations</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Struggles with attention in classroom settings</li>
                <li>Difficulty completing assigned tasks</li>
                <li>Problems following multi-step instructions</li>
                <li>Especially distracted during quiet reading and math</li>
              </ul>
            </div>
          </div>
        );
      case 'adhd':
        return (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-neutral-50 rounded-md">
              <h4 className="font-medium mb-2">Summary of Concerns</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Short attention span</li>
                <li>Hyperactive behavior</li>
                <li>Task completion issues</li>
                <li>Difficulty following classroom instructions</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-50 rounded-md">
              <h4 className="font-medium mb-2">Recommendation</h4>
              <p className="text-sm">Comprehensive ADHD assessment recommended</p>
            </div>
          </div>
        );
      case 'connors':
        return (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-neutral-50 rounded-md">
              <h4 className="font-medium mb-2">Key Findings</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>High scores for inattention (85th percentile)</li>
                <li>Moderate hyperactivity (70th percentile)</li>
                <li>Executive functioning difficulties (80th percentile)</li>
                <li>Low aggression scores (25th percentile)</li>
              </ul>
            </div>
          </div>
        );
      case 'development':
        return (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-neutral-50 rounded-md">
              <h4 className="font-medium mb-2">Development Summary</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Normal early developmental milestones</li>
                <li>History of sleep difficulties (age 2-3)</li>
                <li>No significant medical history</li>
                <li>Family history of ADHD (paternal uncle)</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div className="mt-4 p-4 bg-neutral-50 rounded-md">
            <p className="text-sm">Summary not available.</p>
          </div>
        );
    }
  };
  
  return getSummaryContent();
};

export default DocumentUploadSection;
