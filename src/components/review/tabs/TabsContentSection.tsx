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
  return <>
      <TabsContent value="progress-notes" className="m-0 flex-1 w-full overflow-auto">
        <div className="h-full w-full p-4 px-0 py-[8px]">
          <ProgressNotesTab progressNotes={progressNotes} setProgressNotes={setProgressNotes} />
        </div>
      </TabsContent>
      
      <TabsContent value="clinical-details" className="m-0 flex-1 w-full overflow-auto">
        <div className="h-full w-full p-4">
          <ClinicalDetailsTab clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} />
        </div>
      </TabsContent>
      
      <TabsContent value="developmental-history" className="m-0 flex-1 w-full overflow-auto">
        <div className="h-full w-full p-4 px-0 py-[8px]">
          <DevelopmentalHistoryTab developmentalHistory={developmentalHistory} setDevelopmentalHistory={setDevelopmentalHistory} showSources={showSources} />
        </div>
      </TabsContent>
    </>;
};
export default TabsContentSection;