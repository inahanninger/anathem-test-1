
import { useState } from "react";
import { 
  TableOfContentsIcon, 
  ChevronUpIcon, 
  ChevronDownIcon 
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  onSelectItem: (id: string) => void;
}

const TableOfContents = ({ items, onSelectItem }: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 border rounded-md bg-white shadow-sm">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center justify-between w-full p-0 hover:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <TableOfContentsIcon className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Table of Contents</span>
              </div>
              {isOpen ? (
                <ChevronUpIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <ScrollArea className="max-h-[250px] py-2">
            <div className="px-4 py-2">
              {items.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start mb-1 text-left pl-${item.level * 3} text-sm`}
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
