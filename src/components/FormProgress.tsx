import { CheckIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
interface FormProgressProps {
  completedSections: number;
  totalSections: number;
}
const FormProgress = ({
  completedSections,
  totalSections
}: FormProgressProps) => {
  const percentage = Math.round(completedSections / totalSections * 100);
  return <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-muted-foreground">
          {completedSections} of {totalSections} sections reviewed
        </span>
        <span className="text-sm font-medium px-[8px]">
          {percentage}%
        </span>
      </div>
      <Progress value={percentage} className="h-1.5 w-48" />
    </div>;
};
export default FormProgress;