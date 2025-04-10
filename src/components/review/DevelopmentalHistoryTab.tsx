
import EditableField from "@/components/EditableField";

interface DevelopmentalHistoryTabProps {
  developmentalHistory: string;
  setDevelopmentalHistory: (value: string) => void;
}

const DevelopmentalHistoryTab = ({ developmentalHistory, setDevelopmentalHistory }: DevelopmentalHistoryTabProps) => {
  // Remove the preview HTML rendering and only show the editable field
  return (
    <EditableField 
      initialValue={developmentalHistory} 
      fieldType="textarea" 
      onSave={setDevelopmentalHistory} 
      alwaysEditable={true} 
    />
  );
};

export default DevelopmentalHistoryTab;
