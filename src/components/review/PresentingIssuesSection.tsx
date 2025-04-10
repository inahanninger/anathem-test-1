
import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/SectionHeader";
import EditableField from "@/components/EditableField";

interface PresentingIssuesSectionProps {
  presentingIssues: string;
  setPresentingIssues: (value: string) => void;
}

const PresentingIssuesSection = ({ presentingIssues, setPresentingIssues }: PresentingIssuesSectionProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <SectionHeader title="Presenting Issues" confidenceLevel="high" confidenceScore={94} />
      <div className="px-4 pb-4">
        <EditableField 
          initialValue={presentingIssues} 
          fieldType="textarea" 
          onSave={setPresentingIssues} 
          alwaysEditable={true} 
        />
      </div>
    </Card>
  );
};

export default PresentingIssuesSection;
