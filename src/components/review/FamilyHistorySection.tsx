import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/SectionHeader";
import EditableField from "@/components/EditableField";
interface FamilyHistorySectionProps {
  familyHistory: string;
  setFamilyHistory: (value: string) => void;
}
const FamilyHistorySection = ({
  familyHistory,
  setFamilyHistory
}: FamilyHistorySectionProps) => {
  return <Card className="border-0 shadow-sm">
      <SectionHeader title="Family History" confidenceLevel="medium" confidenceScore={76} />
      <div className="pb-4 px-0">
        <EditableField initialValue={familyHistory} fieldType="textarea" onSave={setFamilyHistory} alwaysEditable={true} />
      </div>
    </Card>;
};
export default FamilyHistorySection;