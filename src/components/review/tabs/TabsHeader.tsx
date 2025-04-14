
import { FileTextIcon, ClipboardIcon, BookIcon } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsHeaderProps {
  activeTab: string;
}

const TabsHeader = ({ activeTab }: TabsHeaderProps) => {
  return (
    <TabsList className="w-full flex bg-gray-100/70 p-0.5">
      <TabsTrigger value="progress-notes" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
        <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
        Progress Notes
      </TabsTrigger>
      <TabsTrigger value="clinical-details" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
        <ClipboardIcon className="h-3.5 w-3.5 mr-1.5" />
        Patient Details
      </TabsTrigger>
      <TabsTrigger value="developmental-history" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
        <BookIcon className="h-3.5 w-3.5 mr-1.5" />
        Developmental History
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsHeader;
