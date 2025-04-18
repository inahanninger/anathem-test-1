
import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface CitationTooltipProps {
  fileName: string;
  selectedText: string;
  citationNumber: number;
  onClose: () => void;
}

export const CitationTooltip = ({ fileName, selectedText, citationNumber, onClose }: CitationTooltipProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.citation-tooltip')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="citation-tooltip inline-flex items-baseline">
      <span className="text-blue-600 bg-blue-50">{selectedText}</span>
      <HoverCard>
        <HoverCardTrigger>
          <sup className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-gray-100 border-2 border-gray-300 text-gray-700 text-xs font-medium ml-0.5 cursor-pointer">
            {citationNumber}
          </sup>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-4 bg-white shadow-lg rounded-lg border-none">
          <div className="font-bold mb-2">{fileName}</div>
          <div className="h-px bg-gray-200 mb-3" />
          <div className="text-base leading-6">
            <span className="bg-blue-50">{selectedText}</span>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
