
import { ReactNode, useState } from "react";
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

const CollapsibleSection = ({ 
  title, 
  defaultOpen = false, 
  children,
  className
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className={cn(
        "flex w-full items-center justify-between border-b pb-2 text-left", 
        className
      )}>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <ChevronDown className={cn(
          "h-5 w-5 text-gray-500 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 pb-2 animate-slide-in">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;
