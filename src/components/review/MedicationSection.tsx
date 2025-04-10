
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import MedicationItem, { Medication } from "@/components/MedicationItem";

interface MedicationSectionProps {
  medications: Medication[];
  onUpdate: (id: string, updatedMed: Partial<Medication>) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const MedicationSection = ({ medications, onUpdate, onDelete, onAdd }: MedicationSectionProps) => {
  return (
    <div className="px-4 pb-4 space-y-3">
      {medications.map(med => (
        <MedicationItem 
          key={med.id} 
          medication={med} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
          alwaysEditable={true} 
        />
      ))}
      <Button variant="outline" className="w-full mt-2 border-dashed gap-2" onClick={onAdd}>
        <PlusIcon className="h-4 w-4" />
        Add Medication
      </Button>
    </div>
  );
};

export default MedicationSection;
