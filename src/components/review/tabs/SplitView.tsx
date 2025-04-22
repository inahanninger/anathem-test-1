import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs } from "@/components/ui/tabs";
import SourcesPanel from "../SourcesPanel";
import TabsHeader from "./TabsHeader";
import TabsContentSection from "./TabsContentSection";

interface SplitViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progressNotes: string;
  setProgressNotes: (value: string) => void;
  clinicalDetails: string;
  setClinicalDetails: (value: string) => void;
  developmentalHistory: string;
  setDevelopmentalHistory: (value: string) => void;
  showSources: boolean;
}

const SplitView = ({
  activeTab,
  setActiveTab,
  progressNotes,
  setProgressNotes,
  clinicalDetails,
  setClinicalDetails,
  developmentalHistory,
  setDevelopmentalHistory,
  showSources
}: SplitViewProps) => {
  return <ResizablePanelGroup direction="horizontal" className={`min-h-[600px] ${!showSources ? 'border' : ''} rounded-md overflow-hidden`}>
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="">
          <Tabs defaultValue="progress-notes" value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col py-[8px] px-[4px]">
            <TabsHeader activeTab={activeTab} />
            
            <TabsContentSection progressNotes={progressNotes} setProgressNotes={setProgressNotes} clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} developmentalHistory={developmentalHistory} setDevelopmentalHistory={setDevelopmentalHistory} showSources={showSources} />
          </Tabs>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="bg-gray-200 w-[3px] mx-[5px]" />
      
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="h-full">
          <SourcesPanel isVisible={showSources} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>;
};

export default SplitView;
