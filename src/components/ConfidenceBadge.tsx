
import { InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ConfidenceLevel = "high" | "medium" | "low";

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  score: number;
}

const ConfidenceBadge = ({ level, score }: ConfidenceBadgeProps) => {
  const badgeClass = `confidence-badge confidence-${level}`;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={badgeClass}>
            <InfoIcon className="h-3 w-3 mr-1" />
            <span>AI Confidence: {score}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            {level === "high" 
              ? "High confidence in AI suggestion" 
              : level === "medium"
              ? "Medium confidence in AI suggestion"
              : "Low confidence - review carefully"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConfidenceBadge;
