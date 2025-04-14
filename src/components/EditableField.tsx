import { useState, useRef, useEffect } from "react";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditableFieldProps {
  initialValue: string;
  fieldType?: "text" | "textarea";
  onSave?: (value: string) => void;
  placeholder?: string;
  alwaysEditable?: boolean;
}

const EditableField = ({
  initialValue,
  fieldType = "text",
  onSave,
  placeholder = "Enter text...",
  alwaysEditable = false
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(alwaysEditable);
  const [value, setValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    adjustHeight();
  }, [value]);

  const handleStartEdit = () => {
    setPreviousValue(value);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setValue(previousValue);
    setIsEditing(alwaysEditable);
  };

  const handleSave = () => {
    setIsEditing(alwaysEditable);
    if (onSave) {
      onSave(value);
    }
    toast.success("Changes saved");
  };

  if (alwaysEditable) {
    return (
      <div className="w-full">
        <div className="space-y-2">
          {fieldType === "textarea" ? (
            <Textarea 
              ref={textareaRef}
              value={value} 
              onChange={e => setValue(e.target.value)} 
              placeholder={placeholder} 
              className="focus:ring-1 focus:ring-blue-400 border-gray-200 resize-none text-xs h-auto min-h-[2.5rem]" 
              rows={1}
            />
          ) : (
            <Input 
              value={value} 
              onChange={e => setValue(e.target.value)} 
              placeholder={placeholder} 
              className="focus:ring-1 focus:ring-blue-400 border-gray-200 text-xs" 
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isEditing ? (
        <div className="space-y-2">
          {fieldType === "textarea" ? (
            <Textarea 
              ref={textareaRef}
              value={value} 
              onChange={e => setValue(e.target.value)} 
              placeholder={placeholder} 
              className="focus:ring-1 focus:ring-blue-400 border-gray-200 resize-none text-xs h-auto min-h-[2.5rem]" 
              autoFocus 
            />
          ) : (
            <Input 
              value={value} 
              onChange={e => setValue(e.target.value)} 
              placeholder={placeholder} 
              className="focus:ring-1 focus:ring-blue-400 border-gray-200 text-xs" 
              autoFocus 
            />
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel} className="gap-1">
              <XIcon className="h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave} className="gap-1">
              <CheckIcon className="h-3.5 w-3.5" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="border border-transparent hover:border-muted rounded-md p-2 -m-2 relative bg-gray-50 text-xs">
            {fieldType === "textarea" ? (
              <div className="whitespace-pre-wrap">{value || placeholder}</div>
            ) : (
              <div>{value || placeholder}</div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="edit-icon absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" 
              onClick={handleStartEdit}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableField;
