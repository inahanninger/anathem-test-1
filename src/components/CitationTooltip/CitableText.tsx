
import React, { useState, useCallback } from 'react';
import { CitationTooltip } from './CitationTooltip';

interface CitableTextProps {
  text: string;
  fileName: string;
}

export const CitableText: React.FC<CitableTextProps> = ({ text, fileName }) => {
  const [selection, setSelection] = useState<{
    text: string;
    citationNumber: number;
  } | null>(null);

  const handleSelection = useCallback(() => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText && selectedText.trim().length > 0) {
      setSelection({
        text: selectedText,
        citationNumber: Math.floor(Math.random() * 9) + 1, // Random number between 1-9 for demo
      });
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelection(null);
  }, []);

  return (
    <div className="prose max-w-none" onMouseUp={handleSelection}>
      {selection ? (
        <CitationTooltip
          fileName={fileName}
          selectedText={selection.text}
          citationNumber={selection.citationNumber}
          onClose={handleClose}
        />
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};
