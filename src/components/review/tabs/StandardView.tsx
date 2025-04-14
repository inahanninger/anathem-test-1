
import { Tabs } from "@/components/ui/tabs";
import TableOfContents from "@/components/TableOfContents";
import { TableOfContentsItem } from "./TabContentData";
import TabsHeader from "./TabsHeader";
import TabsContentSection from "./TabsContentSection";

interface StandardViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progressNotes: string;
  setProgressNotes: (value: string) => void;
  clinicalDetails: string;
  setClinicalDetails: (value: string) => void;
  developmentalHistory: string;
  setDevelopmentalHistory: (value: string) => void;
  tocVisible: boolean;
  tocItems: TableOfContentsItem[];
  onSelectItem: (id: string) => void;
}

const StandardView = ({
  activeTab,
  setActiveTab,
  progressNotes,
  setProgressNotes,
  clinicalDetails,
  setClinicalDetails,
  developmentalHistory,
  setDevelopmentalHistory,
  tocVisible,
  tocItems,
  onSelectItem
}: StandardViewProps) => {
  // Only show table of contents in mobile view if it's the developmental history tab
  const showTocInMobile = activeTab === 'developmental-history';
  
  return (
    <div>
      {showTocInMobile && (
        <div className="md:hidden">
          <TableOfContents items={tocItems} onSelectItem={onSelectItem} visible={tocVisible} />
        </div>
      )}
      
      <Tabs defaultValue="progress-notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsHeader activeTab={activeTab} />
        
        <TabsContentSection 
          progressNotes={progressNotes}
          setProgressNotes={setProgressNotes}
          clinicalDetails={clinicalDetails}
          setClinicalDetails={setClinicalDetails}
          developmentalHistory={developmentalHistory}
          setDevelopmentalHistory={setDevelopmentalHistory}
          showSources={false}
        />
      </Tabs>
    </div>
  );
};

export default StandardView;
