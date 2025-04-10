import { ReactNode } from "react";
import ConfidenceBadge from "./ConfidenceBadge";
interface SectionHeaderProps {
  title: string;
  confidenceLevel?: "high" | "medium" | "low";
  confidenceScore?: number;
  children?: ReactNode;
}
const SectionHeader = ({
  title,
  confidenceLevel,
  confidenceScore = 0,
  children
}: SectionHeaderProps) => {
  return <div className="flex justify-between items-center mb-3">
      <h2 className="section-header font-semibold text-base">{title}</h2>
      <div className="flex items-center gap-2">
        {confidenceLevel && confidenceScore > 0 && <ConfidenceBadge level={confidenceLevel} score={confidenceScore} />}
        {children}
      </div>
    </div>;
};
export default SectionHeader;