
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileTextIcon, UploadIcon } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface SourcesPanelProps {
  isVisible: boolean;
}

const SourcesPanel = ({ isVisible }: SourcesPanelProps) => {
  const [activeTab, setActiveTab] = useState("transcript");

  if (!isVisible) return null;

  return (
    <div className="h-full">
      <div className="border-b pb-2 mb-2">
        <h3 className="font-semibold text-base px-4">Source Material</h3>
      </div>
      
      <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex bg-gray-100/70 p-0.5">
          <TabsTrigger value="transcript" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
            Transcript
          </TabsTrigger>
          <TabsTrigger value="file-upload" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <UploadIcon className="h-3.5 w-3.5 mr-1.5" />
            File Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transcript" className="m-0 p-4 px-4 text-sm">
          <p className="text-gray-600 text-sm">
            Session transcript from April 8, 2025:
          </p>
          <div className="mt-2 border rounded-md p-3 bg-gray-50 text-sm">
            <p className="mb-2"><strong>Clinician:</strong> How have you been feeling since our last session?</p>
            <p className="mb-2"><strong>Patient:</strong> Better, actually. I've been using those sleep techniques you suggested, and I'm getting more rest.</p>
            <p className="mb-2"><strong>Clinician:</strong> That's great to hear. Can you tell me more about your sleep patterns this week?</p>
            <p className="mb-2"><strong>Patient:</strong> I'm falling asleep faster now. Still waking up sometimes in the middle of the night, but I can usually get back to sleep.</p>
            <p className="mb-2"><strong>Clinician:</strong> How would you rate your overall mood on a scale of 1-10?</p>
            <p className="mb-2"><strong>Patient:</strong> I'd say about a 5 now. It was probably a 3 last time.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="file-upload" className="m-0 p-4 px-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Upload session recording</h3>
            <p className="mt-1 text-xs text-gray-500">
              MP3, WAV, or MP4 up to 500MB
            </p>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                Select file
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SourcesPanel;
