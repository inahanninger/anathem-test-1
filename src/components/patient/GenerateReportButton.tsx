
import React from "react";
import { Button } from "@/components/ui/button";

interface GenerateReportButtonProps {
  onClick: () => void;
}

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-8">
      <Button 
        className="w-full py-5 text-base font-medium bg-blue-800 hover:bg-blue-900 shadow-md" 
        onClick={onClick}
      >
        Generate Report
      </Button>
    </div>
  );
};

export default GenerateReportButton;
