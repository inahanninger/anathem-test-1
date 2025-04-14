import { useState } from "react";
import EditableField from "@/components/EditableField";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableOfContents from "@/components/TableOfContents";
import { developmentalToc } from "./tabs/TabContentData";
interface DevelopmentalHistoryTabProps {
  developmentalHistory: string;
  setDevelopmentalHistory: (value: string) => void;
}
const DevelopmentalHistoryTab = ({
  developmentalHistory,
  setDevelopmentalHistory
}: DevelopmentalHistoryTabProps) => {
  // Parse the developmentalHistory into sections based on markdown headers
  const sections = {
    demographic: developmentalHistory.match(/## Early Childhood([\s\S]*?)(?=## Middle Childhood|$)/)?.[1]?.trim() || "",
    pregnancy: developmentalHistory.match(/## Middle Childhood([\s\S]*?)(?=## Adolescence|$)/)?.[1]?.trim() || "",
    earlyMilestones: developmentalHistory.match(/## Adolescence([\s\S]*?)(?=### Educational History|$)/)?.[1]?.trim() || "",
    earlyChildhood: developmentalHistory.match(/### Educational History([\s\S]*?)(?=### Family Dynamics|$)/)?.[1]?.trim() || "",
    school: developmentalHistory.match(/### Family Dynamics([\s\S]*?)(?=## Significant Life Events|$)/)?.[1]?.trim() || "",
    medical: developmentalHistory.match(/## Significant Life Events([\s\S]*?)$/)?.[1]?.trim() || ""
  };

  // State for each section
  const [demographicInfo, setDemographicInfo] = useState(sections.demographic);
  const [pregnancyHistory, setPregnancyHistory] = useState(sections.pregnancy);
  const [earlyMilestones, setEarlyMilestones] = useState(sections.earlyMilestones);
  const [earlyChildhood, setEarlyChildhood] = useState(sections.earlyChildhood);
  const [schoolHistory, setSchoolHistory] = useState(sections.school);
  const [medicalHistory, setMedicalHistory] = useState(sections.medical);

  // Update the full developmental history when any section changes
  const updateFullHistory = () => {
    const fullHistory = `
## Demographic & Background Information
${demographicInfo}

## Pregnancy & Birth History
${pregnancyHistory}

## Early Developmental Milestones
${earlyMilestones}

## Early Childhood Behaviour
${earlyChildhood}

## School History
${schoolHistory}

## Additional Notes
${medicalHistory}
`;
    setDevelopmentalHistory(fullHistory);
  };
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      element.classList.add("bg-yellow-50");
      setTimeout(() => {
        element.classList.remove("bg-yellow-50");
      }, 2000);
    }
  };
  return <div className="flex">
      <div className="w-1/4 pr-4 hidden md:block">
        <TableOfContents items={developmentalToc} onSelectItem={scrollToSection} visible={true} />
      </div>
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-6">
            <div id="dev-1">
              <h3 className="text-sm font-semibold mb-2">Background Information</h3>
              <EditableField initialValue={demographicInfo} fieldType="textarea" onSave={value => {
              setDemographicInfo(value);
              updateFullHistory();
            }} alwaysEditable={true} />
            </div>

            <div id="dev-2">
              <h3 className="text-sm font-semibold mb-2">Pregnancy & Birth History</h3>
              <EditableField initialValue={pregnancyHistory} fieldType="textarea" onSave={value => {
              setPregnancyHistory(value);
              updateFullHistory();
            }} alwaysEditable={true} />
            </div>

            <div id="dev-3">
              <h3 className="text-sm font-semibold mb-2">Early Developmental Milestones</h3>
              <EditableField initialValue={earlyMilestones} fieldType="textarea" onSave={value => {
              setEarlyMilestones(value);
              updateFullHistory();
            }} alwaysEditable={true} />
            </div>

            <div id="dev-4">
              <h3 className="text-sm font-semibold mb-2">Early Childhood Behaviour</h3>
              <EditableField initialValue={earlyChildhood} fieldType="textarea" onSave={value => {
              setEarlyChildhood(value);
              updateFullHistory();
            }} alwaysEditable={true} />
            </div>

            <div id="dev-5">
              <h3 className="text-sm font-semibold mb-2">School History</h3>
              <EditableField initialValue={schoolHistory} fieldType="textarea" onSave={value => {
              setSchoolHistory(value);
              updateFullHistory();
            }} alwaysEditable={true} />
            </div>

            <div id="dev-6">
              <h3 className="text-sm font-semibold mb-2">Additional Notes</h3>
              <EditableField initialValue={medicalHistory} fieldType="textarea" onSave={value => {
              setMedicalHistory(value);
              updateFullHistory();
            }} alwaysEditable={true} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>;
};
export default DevelopmentalHistoryTab;