
import { Button } from "@/components/ui/button";
import { BookOpenIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";

interface ActionButtonsProps {
  showSources: boolean;
  handleViewSources: () => void;
}

const ActionButtons = ({
  showSources,
  handleViewSources
}: ActionButtonsProps) => {
  const handleSaveDetails = () => {
    toast.success("Patient details saved successfully");
  };

  return <div className="flex gap-2">
      <Button variant="outline" size="sm" className={`h-8 gap-1 bg-white border-gray-200 hover:bg-gray-50 text-gray-700 ${showSources ? 'bg-gray-100' : ''}`} onClick={handleViewSources}>
        <BookOpenIcon className="h-4 w-4" />
        <span className="text-xs">View Sources</span>
      </Button>
    </div>;
};

export default ActionButtons;
