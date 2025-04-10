
import { useState } from "react";
import EditableField from "@/components/EditableField";

interface ProgressNotesTabProps {
  progressNotes: string;
  setProgressNotes: (value: string) => void;
}

const ProgressNotesTab = ({ progressNotes, setProgressNotes }: ProgressNotesTabProps) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: progressNotes.split('\n').map(line => {
        if (line.startsWith('## ')) {
          const id = line.substring(3).toLowerCase().replace(/\s+/g, '-');
          return `<h2 id="${id}" class="text-lg font-semibold mt-4 mb-2">${line.substring(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          const id = line.substring(4).toLowerCase().replace(/\s+/g, '-');
          return `<h3 id="${id}" class="text-base font-medium mt-3 mb-1">${line.substring(4)}</h3>`;
        } else if (line.startsWith('- ')) {
          return `<li class="ml-5 list-disc">${line.substring(2)}</li>`;
        } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
          return `<li class="ml-5 list-decimal">${line.substring(3)}</li>`;
        } else if (line === '') {
          return '<p>&nbsp;</p>';
        } else {
          return `<p>${line}</p>`;
        }
      }).join('')}} />
      <EditableField initialValue={progressNotes} fieldType="textarea" onSave={setProgressNotes} alwaysEditable={true} />
    </>
  );
};

export default ProgressNotesTab;
