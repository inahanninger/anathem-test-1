
import { useState } from "react";
import EditableField from "@/components/EditableField";

interface ProgressNotesTabProps {
  progressNotes: string;
  setProgressNotes: (value: string) => void;
}

const ProgressNotesTab = ({ progressNotes, setProgressNotes }: ProgressNotesTabProps) => {
  // Remove the preview HTML rendering and only show the editable field
  return (
    <EditableField 
      initialValue={progressNotes} 
      fieldType="textarea" 
      onSave={setProgressNotes} 
      alwaysEditable={true} 
    />
  );
};

export default ProgressNotesTab;
