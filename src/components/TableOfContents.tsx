import { useState } from "react";
import { TableOfContentsIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
interface TableOfContentsProps {
  items: TableOfContentsItem[];
  onSelectItem: (id: string) => void;
  visible?: boolean;
}
const TableOfContents = ({
  items,
  onSelectItem,
  visible = true
}: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!visible) return null;
  return <div className="mb-4 border rounded-md bg-white">
      
    </div>;
};
export default TableOfContents;