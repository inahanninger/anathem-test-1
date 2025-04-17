
import { FileTextIcon, ClipboardIcon, BookIcon, FilePlusIcon } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GenerateModal from "./GenerateModal";

interface TabsHeaderProps {
  activeTab: string;
}

const TabsHeader = ({
  activeTab
}: TabsHeaderProps) => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  return (
    <>
      <div className="flex items-center mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 bg-white border-gray-200 hover:bg-gray-50 text-gray-700 mr-4"
          onClick={() => setShowGenerateModal(true)}
        >
          <FilePlusIcon className="h-4 w-4" />
          <span className="text-xs">Generate</span>
        </Button>
        
        <TabsList className="w-full flex p-0.5 bg-neutral-100">
          <TabsTrigger value="progress-notes" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
            Progress Notes
          </TabsTrigger>
          
          <TabsTrigger value="developmental-history" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BookIcon className="h-3.5 w-3.5 mr-1.5" />
            Developmental History
          </TabsTrigger>
        </TabsList>
      </div>
      
      {showGenerateModal && (
        <GenerateModal open={showGenerateModal} setOpen={setShowGenerateModal} />
      )}
    </>
  );
};

export default TabsHeader;
