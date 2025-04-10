
import EditableField from "@/components/EditableField";

interface ClinicalDetailsTabProps {
  clinicalDetails: string;
  setClinicalDetails: (value: string) => void;
}

const ClinicalDetailsTab = ({ clinicalDetails, setClinicalDetails }: ClinicalDetailsTabProps) => {
  // Remove the preview HTML rendering and only show the editable field
  return (
    <EditableField 
      initialValue={clinicalDetails} 
      fieldType="textarea" 
      onSave={setClinicalDetails} 
      alwaysEditable={true} 
    />
  );
};

export default ClinicalDetailsTab;
