
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SnapValue } from "@/types/patient";

interface SnapIvCardProps {
  snapValues: SnapValue[];
  onValueChange: (id: string, value: string) => void;
  onSourceChange: (id: string, source: string) => void;
  onAddField: () => void;
  onRemoveField: (id: string) => void;
}

const SnapIvCard: React.FC<SnapIvCardProps> = ({
  snapValues,
  onValueChange,
  onSourceChange,
  onAddField,
  onRemoveField
}) => {
  return (
    <Card className="h-full transition-all border border-gray-100 hover:shadow-md">
      <CardContent className="p-5 h-full">
        <h3 className="text-lg font-medium mb-4">Enter SNAP-IV results</h3>
        <div className="space-y-3">
          {snapValues.map(item => (
            <div key={item.id} className="flex items-center gap-2">
              <Input 
                value={item.value} 
                onChange={e => onValueChange(item.id, e.target.value)} 
                placeholder="Enter SNAP-IV value" 
                className="flex-1" 
              />
              <Select 
                value={item.source} 
                onValueChange={value => onSourceChange(item.id, value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Parent">Parent</SelectItem>
                </SelectContent>
              </Select>
              {snapValues.length > 1 && (
                <Button variant="outline" size="icon" onClick={() => onRemoveField(item.id)} className="shrink-0">
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={onAddField} className="w-full">
            <Plus size={16} className="mr-2" />
            Add Value
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SnapIvCard;
