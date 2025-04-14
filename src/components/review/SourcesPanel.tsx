import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileTextIcon, UploadIcon, ClockIcon } from "lucide-react";
interface SourcesPanelProps {
  isVisible: boolean;
}
const SourcesPanel = ({
  isVisible
}: SourcesPanelProps) => {
  const [activeTab, setActiveTab] = useState("transcript");
  if (!isVisible) return null;
  return <div className="h-full flex flex-col">
      
      
      <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 py-[8px] px-[8px]">
        <TabsList className="w-full flex bg-gray-100/70 p-0.5 py-0">
          <TabsTrigger value="transcript" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
            Transcript
          </TabsTrigger>
          <TabsTrigger value="file-upload" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <UploadIcon className="h-3.5 w-3.5 mr-1.5" />
            Supporting Documents
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transcript" className="m-0 p-4 text-sm overflow-auto flex-1 px-[4px]">
          <div className="space-y-4">
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="text-blue-600 font-medium">Speaker 1</p>
                <p className="text-gray-800">Good morning.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:01</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="text-blue-600 font-medium">Speaker 2</p>
                <p className="text-gray-800">Good morning. Could you please state your name, position, and the location of your employment for the record?</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:02</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="text-blue-600 font-medium">Speaker 1</p>
                <p className="text-gray-800">Good morning, Doctor. My name is James Wilson, and I'm here for my follow-up appointment.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:20</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="text-blue-600 font-medium">Speaker 2</p>
                <p className="text-gray-800">Thank you, Mr. Wilson. We're here to discuss your recent test results and how your current treatment plan is working. How have you been feeling since our last appointment?</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:55</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="text-blue-600 font-medium">Speaker 1</p>
                <p className="text-gray-800">I've been doing better with the medication, but I still have occasional back pain, especially after sitting for long periods.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">1:10</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="text-blue-600 font-medium">Speaker 2</p>
                <p className="text-gray-800">Let's talk about that. Have you been doing the recommended exercises?</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">1:45</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="text-blue-600 font-medium">Speaker 1</p>
                <p className="text-gray-800">Yes, I've been trying to do them regularly, but sometimes I forget or I'm too tired after work.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">2:01</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="file-upload" className="m-0 p-4 px-4 flex-1">
          <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-md p-6">
            <div className="text-center">
              <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop files here</p>
              <p className="text-gray-400 text-sm mb-4">or</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Browse Files
              </button>
              <p className="text-gray-400 text-xs mt-2">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default SourcesPanel;