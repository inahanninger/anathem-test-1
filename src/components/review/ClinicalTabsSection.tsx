import { useState } from "react";
import { FileTextIcon, ClipboardIcon, BookIcon, PlusIcon, BookOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TableOfContents from "@/components/TableOfContents";
import ProgressNotesTab from "./ProgressNotesTab";
import ClinicalDetailsTab from "./ClinicalDetailsTab";
import DevelopmentalHistoryTab from "./DevelopmentalHistoryTab";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import SourcesPanel from "./SourcesPanel";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

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

  const progressNotesToc = [
    {
      id: "section-1",
      title: "Session Summary",
      level: 1
    },
    {
      id: "section-2",
      title: "Current Symptoms",
      level: 1
    },
    {
      id: "section-3",
      title: "Sleep Patterns",
      level: 2
    },
    {
      id: "section-4",
      title: "Mood Status",
      level: 2
    },
    {
      id: "section-5",
      title: "Intervention Progress",
      level: 1
    },
    {
      id: "section-6",
      title: "Homework Assigned",
      level: 1
    }
  ];

  const clinicalDetailsToc = [
    {
      id: "clinical-1",
      title: "Assessment Scores",
      level: 1
    },
    {
      id: "clinical-2",
      title: "Medication Compliance",
      level: 1
    },
    {
      id: "clinical-3",
      title: "Risk Assessment",
      level: 1
    },
    {
      id: "clinical-4",
      title: "Vital Signs",
      level: 2
    },
    {
      id: "clinical-5",
      title: "Labs Review",
      level: 2
    },
    {
      id: "clinical-6",
      title: "Current Diagnosis",
      level: 1
    }
  ];

  const developmentalToc = [
    {
      id: "dev-1",
      title: "Early Childhood",
      level: 1
    },
    {
      id: "dev-2",
      title: "Middle Childhood",
      level: 1
    },
    {
      id: "dev-3",
      title: "Adolescence",
      level: 1
    },
    {
      id: "dev-4",
      title: "Educational History",
      level: 2
    },
    {
      id: "dev-5",
      title: "Family Dynamics",
      level: 2
    },
    {
      id: "dev-6",
      title: "Significant Life Events",
      level: 1
    }
  ];

  const handleGenerateMoreNotes = () => {
    toast.success("Generating additional notes...");
  };

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

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center py-2 border-b px-0">
        <h2 className="font-semibold text-base">Clinical Data</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`h-8 gap-1 bg-white border-gray-200 hover:bg-gray-50 text-gray-700 ${showSources ? 'bg-gray-100' : ''}`} 
            onClick={handleViewSources}
          >
            <BookOpenIcon className="h-4 w-4" />
            <span className="text-xs">View Sources</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1 bg-white border-gray-200 hover:bg-gray-50 text-gray-700" 
            onClick={handleGenerateMoreNotes}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="text-xs">Generate</span>
          </Button>
        </div>
      </div>
      
      {showSources ? (
        <ResizablePanelGroup 
          direction="horizontal" 
          className="min-h-[600px] border rounded-md overflow-hidden"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full border-r">
              <Tabs defaultValue="progress-notes" value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
                <TabsList className="w-full flex bg-gray-100/70 p-0.5">
                  <TabsTrigger value="progress-notes" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
                    Progress Notes
                  </TabsTrigger>
                  <TabsTrigger value="clinical-details" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <ClipboardIcon className="h-3.5 w-3.5 mr-1.5" />
                    Clinical Details
                  </TabsTrigger>
                  <TabsTrigger value="developmental-history" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <BookIcon className="h-3.5 w-3.5 mr-1.5" />
                    Developmental History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress-notes" className="m-0 p-4 py-[16px] px-4 flex-1 overflow-auto">
                  <ProgressNotesTab progressNotes={progressNotes} setProgressNotes={setProgressNotes} />
                </TabsContent>
                
                <TabsContent value="clinical-details" className="m-0 p-4 px-4 flex-1 overflow-auto">
                  <ClinicalDetailsTab clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} />
                </TabsContent>
                
                <TabsContent value="developmental-history" className="m-0 p-4 px-4 flex-1 overflow-auto">
                  <DevelopmentalHistoryTab developmentalHistory={developmentalHistory} setDevelopmentalHistory={setDevelopmentalHistory} />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-gray-200 w-[3px] mx-[5px]" />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full">
              <SourcesPanel isVisible={showSources} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div>
          <div className="md:hidden">
            <TableOfContents items={getCurrentTabToc()} onSelectItem={scrollToSection} visible={tocVisible} />
          </div>
          
          <Tabs defaultValue="progress-notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex bg-gray-100/70 p-0.5">
              <TabsTrigger value="progress-notes" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
                Progress Notes
              </TabsTrigger>
              <TabsTrigger value="clinical-details" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <ClipboardIcon className="h-3.5 w-3.5 mr-1.5" />
                Clinical Details
              </TabsTrigger>
              <TabsTrigger value="developmental-history" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <BookIcon className="h-3.5 w-3.5 mr-1.5" />
                Developmental History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress-notes" className="m-0 p-4 py-[16px] px-0">
              <ProgressNotesTab progressNotes={progressNotes} setProgressNotes={setProgressNotes} />
            </TabsContent>
            
            <TabsContent value="clinical-details" className="m-0 p-4 px-0">
              <ClinicalDetailsTab clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} />
            </TabsContent>
            
            <TabsContent value="developmental-history" className="m-0 p-4 px-0">
              <DevelopmentalHistoryTab developmentalHistory={developmentalHistory} setDevelopmentalHistory={setDevelopmentalHistory} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ClinicalTabsSection;
