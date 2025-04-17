import { useState } from "react";
import { TableOfContentsItem, progressNotesToc, clinicalDetailsToc, developmentalToc } from "./tabs/TabContentData";
import ActionButtons from "./tabs/ActionButtons";
import SplitView from "./tabs/SplitView";
import StandardView from "./tabs/StandardView";
interface ClinicalTabsSectionProps {
  progressNotes: string;
  setProgressNotes: (value: string) => void;
  clinicalDetails: string;
  setClinicalDetails: (value: string) => void;
  developmentalHistory: string;
  setDevelopmentalHistory: (value: string) => void;
}
const ClinicalTabsSection = ({
  progressNotes,
  setProgressNotes,
  clinicalDetails,
  setClinicalDetails,
  developmentalHistory,
  setDevelopmentalHistory
}: ClinicalTabsSectionProps) => {
  const [activeTab, setActiveTab] = useState("progress-notes");
  const [showSources, setShowSources] = useState(false);
  const [tocVisible, setTocVisible] = useState(true);
  const handleViewSources = () => {
    setShowSources(!showSources);
    if (!showSources) {
      setTocVisible(false);
    } else {
      setTocVisible(true);
    }
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
  const getCurrentTabToc = () => {
    switch (activeTab) {
      case "progress-notes":
        return progressNotesToc;
      case "clinical-details":
        return clinicalDetailsToc;
      case "developmental-history":
        return developmentalToc;
      default:
        return [];
    }
  };
  return <div className="overflow-hidden">
      <div className="flex justify-between items-center py-2">
        <h2 className="font-semibold text-base">Review Drafted Content</h2>
        <ActionButtons showSources={showSources} handleViewSources={handleViewSources} />
      </div>
      
      {showSources ? <SplitView activeTab={activeTab} setActiveTab={setActiveTab} progressNotes={progressNotes} setProgressNotes={setProgressNotes} clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} developmentalHistory={developmentalHistory} setDevelopmentalHistory={setDevelopmentalHistory} showSources={showSources} /> : <StandardView activeTab={activeTab} setActiveTab={setActiveTab} progressNotes={progressNotes} setProgressNotes={setProgressNotes} clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} developmentalHistory={developmentalHistory} setDevelopmentalHistory={setDevelopmentalHistory} tocVisible={tocVisible} tocItems={getCurrentTabToc()} onSelectItem={scrollToSection} />}
    </div>;
};
export default ClinicalTabsSection;