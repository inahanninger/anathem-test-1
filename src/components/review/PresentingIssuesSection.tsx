
import SectionHeader from "@/components/SectionHeader";
import EditableField from "@/components/EditableField";

interface PresentingIssuesSectionProps {
  presentingIssues: string;
  setPresentingIssues: (value: string) => void;
}

const PresentingIssuesSection = ({
  presentingIssues,
  setPresentingIssues
}: PresentingIssuesSectionProps) => {
  return (
    <EditableField 
      initialValue={presentingIssues} 
      fieldType="textarea" 
      onSave={setPresentingIssues} 
      alwaysEditable={true} 
    />
  );
};

export default PresentingIssuesSection;
