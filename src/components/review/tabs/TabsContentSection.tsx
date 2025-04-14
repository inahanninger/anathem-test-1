
import { TabsContent } from "@/components/ui/tabs";
import ProgressNotesTab from "../ProgressNotesTab";
import ClinicalDetailsTab from "../ClinicalDetailsTab";
import DevelopmentalHistoryTab from "../DevelopmentalHistoryTab";

interface TabsContentSectionProps {
  progressNotes: string;
  setProgressNotes: (value: string) => void;
  clinicalDetails: string;
  setClinicalDetails: (value: string) => void;
  developmentalHistory: string;
  setDevelopmentalHistory: (value: string) => void;
  showSources: boolean;
}

const TabsContentSection = ({
  progressNotes,
  setProgressNotes,
  clinicalDetails,
  setClinicalDetails,
  developmentalHistory,
  setDevelopmentalHistory,
  showSources
}: TabsContentSectionProps) => {
  const padding = showSources ? "px-4" : "px-0";
  
  return (
    <>
      <TabsContent value="progress-notes" className={`m-0 p-4 py-[16px] ${padding} flex-1 overflow-auto`}>
        <ProgressNotesTab progressNotes={progressNotes} setProgressNotes={setProgressNotes} />
      </TabsContent>
      
      <TabsContent value="clinical-details" className={`m-0 p-4 ${padding} flex-1 overflow-auto`}>
        <ClinicalDetailsTab clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} />
      </TabsContent>
      
      <TabsContent value="developmental-history" className={`m-0 p-4 ${padding} flex-1 overflow-auto`}>
        <DevelopmentalHistoryTab 
          developmentalHistory={developmentalHistory} 
          setDevelopmentalHistory={setDevelopmentalHistory} 
          showSources={showSources}
        />
      </TabsContent>
    </>
  );
};

export default TabsContentSection;
