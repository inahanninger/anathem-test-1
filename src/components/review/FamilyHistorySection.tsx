
import EditableField from "@/components/EditableField";

interface FamilyHistorySectionProps {
  familyHistory: string;
  setFamilyHistory: (value: string) => void;
}

const FamilyHistorySection = ({
  familyHistory,
  setFamilyHistory
}: FamilyHistorySectionProps) => {
  return (
    <EditableField 
      initialValue={familyHistory} 
      fieldType="textarea" 
      onSave={setFamilyHistory} 
      alwaysEditable={true} 
    />
  );
};

export default FamilyHistorySection;
