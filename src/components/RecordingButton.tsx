
import React from "react";
import { Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecordingButtonProps {
  isRecording: boolean;
  onClick: () => void;
  className?: string;
}

const RecordingButton = ({ isRecording, onClick, className }: RecordingButtonProps) => {
  return (
    <Button
      className={cn(
        `px-4 relative ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`,
        className
      )}
      onClick={onClick}
    >
      {isRecording ? (
        <>
          <Square className="w-4 h-4 mr-2" />
          <span>End recording</span>
        </>
      ) : (
        <span>Start recording</span>
      )}
    </Button>
  );
};

export default RecordingButton;
