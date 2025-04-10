
import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/SectionHeader";
import EditableField from "@/components/EditableField";

interface SocialHistorySectionProps {
  socialHistory: string;
  setSocialHistory: (value: string) => void;
}

const SocialHistorySection = ({ socialHistory, setSocialHistory }: SocialHistorySectionProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <SectionHeader title="School and Social History" confidenceLevel="high" confidenceScore={88} />
      <div className="px-4 pb-4">
        <EditableField 
          initialValue={socialHistory} 
          fieldType="textarea" 
          onSave={setSocialHistory} 
          alwaysEditable={true} 
        />
      </div>
    </Card>
  );
};

export default SocialHistorySection;
