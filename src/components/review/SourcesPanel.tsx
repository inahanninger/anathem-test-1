
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileTextIcon, FileIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface SourcesPanelProps {
  isVisible: boolean;
}

const SourcesPanel = ({
  isVisible
}: SourcesPanelProps) => {
  const [activeTab, setActiveTab] = useState("transcript");
  
  if (!isVisible) return null;
  
  return <div className="h-full flex flex-col">
      <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab} className="w-full flex-1">
        <TabsList className="w-full flex bg-gray-100/70 p-0.5 py-0 border-b border-gray-200">
          <TabsTrigger value="transcript" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
            Transcript
          </TabsTrigger>
          <TabsTrigger value="file-upload" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none">
            <FileIcon className="h-3.5 w-3.5 mr-1.5" />
            Supporting Documents
          </TabsTrigger>
        </TabsList>
        
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-sm">Source Evidence</h3>
        </div>
        
        <TabsContent value="transcript" className="m-0 p-0 text-sm overflow-auto flex-1">
          <div className="space-y-0">
            <div className="flex gap-3 items-start p-4 hover:bg-gray-50">
              <div className="flex-shrink-0 flex flex-col items-end mr-1">
                <p className="text-orange-600 font-medium text-xs">Speaker 1</p>
                <span className="text-gray-500 text-xs whitespace-nowrap">0:01</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">Good morning.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start p-4 hover:bg-gray-50 bg-gray-50/50">
              <div className="flex-shrink-0 flex flex-col items-end mr-1">
                <p className="text-green-600 font-medium text-xs">Speaker 2</p>
                <span className="text-gray-500 text-xs whitespace-nowrap">0:02</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">Good morning. Could you please state your name, position, and the location of your employment for the record?</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start p-4 hover:bg-gray-50">
              <div className="flex-shrink-0 flex flex-col items-end mr-1">
                <p className="text-orange-600 font-medium text-xs">Speaker 1</p>
                <span className="text-gray-500 text-xs whitespace-nowrap">0:20</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">Good morning, Doctor. My name is James Wilson, and I'm here for my follow-up appointment.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start p-4 hover:bg-gray-50 bg-gray-50/50">
              <div className="flex-shrink-0 flex flex-col items-end mr-1">
                <p className="text-green-600 font-medium text-xs">Speaker 2</p>
                <span className="text-gray-500 text-xs whitespace-nowrap">0:55</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">Thank you, Mr. Wilson. We're here to discuss your recent test results and how your current treatment plan is working. How have you been feeling since our last appointment?</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start p-4 hover:bg-gray-50">
              <div className="flex-shrink-0 flex flex-col items-end mr-1">
                <p className="text-orange-600 font-medium text-xs">Speaker 1</p>
                <span className="text-gray-500 text-xs whitespace-nowrap">1:10</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">I've been doing better with the medication, but I still have occasional back pain, especially after sitting for long periods.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start p-4 hover:bg-gray-50 bg-gray-50/50">
              <div className="flex-shrink-0 flex flex-col items-end mr-1">
                <p className="text-green-600 font-medium text-xs">Speaker 2</p>
                <span className="text-gray-500 text-xs whitespace-nowrap">1:45</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">Let's talk about that. Have you been doing the recommended exercises?</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start p-4 hover:bg-gray-50">
              <div className="flex-shrink-0 flex flex-col items-end mr-1">
                <p className="text-orange-600 font-medium text-xs">Speaker 1</p>
                <span className="text-gray-500 text-xs whitespace-nowrap">2:01</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">Yes, I've been trying to do them regularly, but sometimes I forget or I'm too tired after work.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="file-upload" className="m-0 p-4 flex-1">
          <div className="text-center text-gray-500 py-8">
            No supporting documents uploaded
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};

export default SourcesPanel;
