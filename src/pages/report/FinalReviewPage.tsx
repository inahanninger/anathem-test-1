
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Split, FileText, Download } from "lucide-react";
import Stepper from "@/components/Stepper";
import { Switch } from "@/components/ui/switch";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Upload", description: "Upload supporting documents" },
  { id: 2, name: "Review", description: "Review information" },
  { id: 3, name: "Transcribe", description: "Record consultation" },
  { id: 4, name: "Select", description: "Select report type" },
  { id: 5, name: "Review", description: "Final review" },
];

export default function FinalReviewPage() {
  const navigate = useNavigate();
  const [splitView, setSplitView] = useState(false);
  const [reportContent, setReportContent] = useState(
    "# Clinical Assessment Report\n\n" +
    "## Patient Information\n" +
    "**Name:** John Doe\n" +
    "**DOB:** 1985-05-15\n" +
    "**Patient ID:** PT-1234567\n\n" +
    "## Clinical Impression\n" +
    "Patient presents with persistent headaches for the past 3 weeks, primarily in the frontal region. The pain is described as throbbing and is typically worse in the morning. Patient has tried over-the-counter pain relievers with minimal relief. Patient also reports occasional dizziness when standing up quickly.\n\n" +
    "## Examination Findings\n" +
    "- Blood pressure: 135/85 mmHg\n" +
    "- Heart rate: 72 bpm, regular\n" +
    "- Neurological examination: No focal deficits\n" +
    "- Head and neck examination: No tenderness or masses\n\n" +
    "## Assessment\n" +
    "The patient's symptoms and clinical presentation are consistent with tension headaches, possibly with a migrainous component given the family history. The occasional dizziness may be related to mild orthostatic changes or could be vestibular in origin.\n\n" +
    "## Recommendations\n" +
    "1. Trial of triptan medication for acute headache relief\n" +
    "2. Consider prophylactic therapy if headaches persist\n" +
    "3. Hydration status assessment\n" +
    "4. Follow-up in 2 weeks to assess response to treatment"
  );
  
  const [previewHTML, setPreviewHTML] = useState<string>("");

  // This would normally be handled by a markdown parser library like marked or remark
  // For this example we'll just do a simple conversion for demonstration purposes
  const renderMarkdown = () => {
    let html = reportContent
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.*)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d\. (.*)$/gm, '<li class="ml-4 list-decimal">$1</li>');
    
    // Replace consecutive newlines with paragraph breaks
    html = html
      .split('\n\n')
      .map(para => para.trim() ? `<p class="mb-2">${para}</p>` : '')
      .join('');
    
    return html;
  };

  const toggleSplitView = () => {
    setSplitView(!splitView);
    if (!splitView) {
      setPreviewHTML(renderMarkdown());
    }
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportContent(e.target.value);
    if (splitView) {
      setPreviewHTML(renderMarkdown());
    }
  };

  const handleComplete = () => {
    toast.success("Report generated successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <Stepper steps={steps} currentStep={5} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-800">Final Report Review</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Split View</span>
          <Switch checked={splitView} onCheckedChange={toggleSplitView} />
        </div>
      </div>

      {splitView ? (
        <ResizablePanelGroup 
          direction="horizontal" 
          className="min-h-[500px] border rounded-lg"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Edit</h3>
                <FileText className="h-4 w-4 text-gray-500" />
              </div>
              <Textarea 
                value={reportContent} 
                onChange={handleReportChange} 
                className="h-[calc(100%-30px)] font-mono text-sm resize-none border-0 focus-visible:ring-0 p-0"
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-4 overflow-y-auto bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Preview</h3>
                <FileText className="h-4 w-4 text-gray-500" />
              </div>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: previewHTML }} 
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <Card>
          <CardContent className="p-6">
            <Textarea 
              value={reportContent} 
              onChange={handleReportChange} 
              className="min-h-[500px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/report/select")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Export PDF
          </Button>
          <Button 
            onClick={handleComplete}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900"
          >
            <CheckCircle className="h-4 w-4" /> Complete Report
          </Button>
        </div>
      </div>
    </div>
  );
}
