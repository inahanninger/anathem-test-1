import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface GenerateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GenerateModal = ({ open, setOpen }: GenerateModalProps) => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedSummaries, setSelectedSummaries] = useState<string[]>([]);

  const documents = [
    { id: "doc1", name: "Clinical Letter" },
    { id: "doc2", name: "Health Assessment" },
    { id: "doc3", name: "Previous Treatment Notes" },
    { id: "doc4", name: "Referral Document" },
  ];

  const summaries = [
    { id: "sum1", name: "Medical History Summary" },
    { id: "sum2", name: "Previous Diagnosis Summary" },
    { id: "sum3", name: "Treatment Plan Summary" },
    { id: "sum4", name: "Family History Summary" },
  ];

  const handleDocumentChange = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const handleSummaryChange = (summaryId: string) => {
    setSelectedSummaries(prev => 
      prev.includes(summaryId) 
        ? prev.filter(id => id !== summaryId)
        : [...prev, summaryId]
    );
  };

  const handleGenerate = () => {
    if (selectedDocuments.length === 0 && selectedSummaries.length === 0) {
      toast.error("Please select at least one document or summary");
      return;
    }

    toast.success("Generating content from selected sources...");
    
    setOpen(false);
    
    setSelectedDocuments([]);
    setSelectedSummaries([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Content</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div>
            <h3 className="font-medium mb-2">Documents</h3>
            <div className="space-y-2">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`document-${document.id}`} 
                    checked={selectedDocuments.includes(document.id)}
                    onCheckedChange={() => handleDocumentChange(document.id)}
                  />
                  <Label 
                    htmlFor={`document-${document.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {document.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Summaries</h3>
            <div className="space-y-2">
              {summaries.map((summary) => (
                <div key={summary.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`summary-${summary.id}`}
                    checked={selectedSummaries.includes(summary.id)}
                    onCheckedChange={() => handleSummaryChange(summary.id)}
                  />
                  <Label 
                    htmlFor={`summary-${summary.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {summary.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerate}
          >
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateModal;
