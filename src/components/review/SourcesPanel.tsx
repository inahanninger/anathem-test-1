import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileTextIcon } from "lucide-react";
interface SourcesPanelProps {
  isVisible: boolean;
}
const SourcesPanel = ({
  isVisible
}: SourcesPanelProps) => {
  const [activeTab, setActiveTab] = useState("transcript");
  if (!isVisible) return null;
  return <div className="h-full flex flex-col" style={{
    maxWidth: "1243px"
  }}>
      
      
      <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 py-[8px] px-[8px] bg-neutral-100">
        <TabsList className="w-full flex bg-gray-100/70 p-0.5 py-0">
          <TabsTrigger value="transcript" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
            Transcript
          </TabsTrigger>
          <TabsTrigger value="file-upload" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            
            Supporting Documents
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transcript" className="m-0 p-4 text-sm overflow-auto flex-1 px-[4px]">
          <div className="space-y-4">
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-inherit">Speaker 1</p>
                <p className="text-inherit">Good morning.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:01</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-inherit">Speaker 2</p>
                <p className="text-inherit text-sm font-normal">Good morning. Could you please state your name, position, and the location of your employment for the record?</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:02</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-inherit">Speaker 1</p>
                <p className="text-gray-800 text-sm">Good morning, Doctor. My name is James Wilson, and I'm here for my follow-up appointment.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:20</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-inherit">Speaker 2</p>
                <p className="text-sm text-inherit">Thank you, Mr. Wilson. We're here to discuss your recent test results and how your current treatment plan is working. How have you been feeling since our last appointment?</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">0:55</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-inherit">Speaker 1</p>
                <p className="text-sm text-inherit">I've been doing better with the medication, but I still have occasional back pain, especially after sitting for long periods.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">1:10</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-inherit">Speaker 2</p>
                <p className="text-sm text-inherit">Let's talk about that. Have you been doing the recommended exercises?</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">1:45</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-inherit">Speaker 1</p>
                <p className="text-sm text-inherit">Yes, I've been trying to do them regularly, but sometimes I forget or I'm too tired after work.</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">2:01</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="file-upload" className="m-0 p-4 px-4 flex-1">
          
        </TabsContent>
      </Tabs>
    </div>;
};
export default SourcesPanel;