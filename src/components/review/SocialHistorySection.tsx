
import EditableField from "@/components/EditableField";

interface SocialHistorySectionProps {
  socialHistory: string;
  setSocialHistory: (value: string) => void;
}

const SocialHistorySection = ({
  socialHistory,
  setSocialHistory
}: SocialHistorySectionProps) => {
  return (
    <EditableField 
      initialValue={socialHistory} 
      fieldType="textarea" 
      onSave={setSocialHistory} 
      alwaysEditable={true} 
    />
  );
};

export default SocialHistorySection;
