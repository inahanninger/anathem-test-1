
import { useState } from "react";
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface MedicationItemProps {
  medication: Medication;
  onUpdate: (id: string, updatedMed: Partial<Medication>) => void;
  onDelete: (id: string) => void;
}

const MedicationItem = ({ medication, onUpdate, onDelete }: MedicationItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMed, setEditedMed] = useState<Medication>({ ...medication });
  
  const handleStartEdit = () => {
    setEditedMed({ ...medication });
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleSave = () => {
    onUpdate(medication.id, editedMed);
    setIsEditing(false);
    toast.success("Medication updated");
  };
  
  const handleDelete = () => {
    onDelete(medication.id);
    toast.success("Medication removed");
  };
  
  const handleChange = (field: keyof Medication, value: string) => {
    setEditedMed((prev) => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className="p-3 border border-clinical-border rounded-lg hover:bg-clinical-neutral/50 transition-colors">
      {isEditing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="input-label">Medication</label>
              <Input 
                value={editedMed.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="input-label">Dosage</label>
              <Input 
                value={editedMed.dosage}
                onChange={(e) => handleChange("dosage", e.target.value)}
                className="focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="input-label">Frequency</label>
              <Input 
                value={editedMed.frequency}
                onChange={(e) => handleChange("frequency", e.target.value)}
                className="focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCancel}
              className="gap-1"
            >
              <XIcon className="h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSave}
              className="gap-1"
            >
              <CheckIcon className="h-3.5 w-3.5" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-3 gap-4 flex-1">
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">Medication</div>
              <div className="font-medium">{medication.name}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">Dosage</div>
              <div>{medication.dosage}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">Frequency</div>
              <div>{medication.frequency}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleStartEdit}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleDelete}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationItem;
