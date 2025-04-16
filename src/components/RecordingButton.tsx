
import React from "react";
import { Square, MicIcon } from "lucide-react";
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
        `px-3 relative ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-red-700 hover:bg-red-800'}`,
        className
      )}
      onClick={onClick}
    >
      {isRecording ? <Square className="w-4 h-4 mr-2" /> : <MicIcon className="w-4 h-4 mr-2" />}
      
      {isRecording && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="flex space-x-1">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`bg-white h-3 w-0.5 opacity-75 animate-pulse`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.75 + (i * 0.1)}s`,
                  height: `${6 + Math.sin(i * 0.8) * 6}px`,
                }}
              />
            ))}
          </span>
        </div>
      )}
      
      <span className="z-10">
        {isRecording ? 'Transcribing' : 'Start Recording'}
      </span>
    </Button>
  );
};

export default RecordingButton;
