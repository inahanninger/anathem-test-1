
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
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex w-full justify-between items-center p-3 font-medium text-sm"
          >
            <div className="flex items-center gap-2">
              <TableOfContentsIcon className="h-4 w-4" />
              <span>Contents</span>
            </div>
            {isOpen ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <ScrollArea className="h-auto max-h-[400px]">
            <div className="p-2">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li 
                    key={item.id}
                    style={{ 
                      paddingLeft: `${item.level * 0.5}rem` 
                    }}
                  >
                    <button
                      onClick={() => onSelectItem(item.id)}
                      className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-blue-50 transition-colors"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TableOfContents;
