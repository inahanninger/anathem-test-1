
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface MedicationItemProps {
  medication: Medication;
  onUpdate: (id: string, medication: Partial<Medication>) => void;
  onDelete: (id: string) => void;
  alwaysEditable?: boolean;
}

const MedicationItem = ({ medication, onUpdate, onDelete, alwaysEditable = false }: MedicationItemProps) => {
  const [isEditing, setIsEditing] = useState(alwaysEditable);
  const [name, setName] = useState(medication.name);
  const [dosage, setDosage] = useState(medication.dosage);
  const [frequency, setFrequency] = useState(medication.frequency);

  const handleSave = () => {
    onUpdate(medication.id, { name, dosage, frequency });
    if (!alwaysEditable) {
      setIsEditing(false);
    }
    toast.success("Medication updated");
  };

  const handleDelete = () => {
    onDelete(medication.id);
    toast.success("Medication removed");
  };

  if (alwaysEditable || isEditing) {
    return (
      <div className="p-3 border border-gray-200 rounded-md bg-white">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-5">
            <Input 
              placeholder="Medication name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="focus:ring-1 focus:ring-blue-400 border-gray-200"
            />
          </div>
          <div className="col-span-3">
            <Input 
              placeholder="Dosage" 
              value={dosage} 
              onChange={(e) => setDosage(e.target.value)}
              className="focus:ring-1 focus:ring-blue-400 border-gray-200"
            />
          </div>
          <div className="col-span-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Frequency" 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}
                className="focus:ring-1 focus:ring-blue-400 border-gray-200"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {!alwaysEditable && (
          <div className="flex justify-end mt-2">
            <Button size="sm" onClick={handleSave}>Save</Button>
          </div>
        )}
        {alwaysEditable && (
          <div className="flex justify-end mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSave}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="p-3 border border-gray-100 rounded-md hover:border-gray-200 transition-colors cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-5 font-medium">{medication.name || "Unnamed medication"}</div>
        <div className="col-span-3 text-gray-600">{medication.dosage || "No dosage"}</div>
        <div className="col-span-3 text-gray-600">{medication.frequency || "No frequency"}</div>
        <div className="col-span-1 flex justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-gray-500 hover:text-red-500"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicationItem;
