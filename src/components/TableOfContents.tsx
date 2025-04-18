
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
  
  return (
    <div className="mb-4 border rounded-md bg-white">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center justify-between w-full p-0 hover:bg-transparent">
              <div className="flex items-center gap-1.5">
                <TableOfContentsIcon className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-sm font-medium">Table of Contents</span>
              </div>
              {isOpen ? <ChevronUpIcon className="h-3.5 w-3.5 text-gray-500" /> : <ChevronDownIcon className="h-3.5 w-3.5 text-gray-500" />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <ScrollArea className="max-h-[calc(100vh-200px)] overflow-auto">
            <div className="px-2 py-1">
              {items && items.map(item => (
                <Button 
                  key={item.id} 
                  variant="ghost" 
                  size="sm" 
                  className={`w-full justify-start mb-0.5 text-left pl-${item.level * 2} text-xs py-1 h-auto`} 
                  onClick={() => onSelectItem(item.id)}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TableOfContents;
