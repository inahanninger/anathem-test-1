
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface PatientHeaderProps {
  patientName: string;
  setPatientName: (value: string) => void;
  nhsNumber: string;
  setNhsNumber: (value: string) => void;
  onContinue: () => void;
  documentCount?: number;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({
  patientName,
  setPatientName,
  nhsNumber,
  setNhsNumber,
  onContinue,
  documentCount = 0
}) => {
  return (
    <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
      <div className="container mx-auto w-6xl">
        <div className="flex items-center justify-between w-auto">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <Label htmlFor="patientName" className="text-xs text-muted-foreground mb-1">Patient Name</Label>
              <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} className="h-8 w-[180px] text-sm" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="nhsNumber" className="text-xs text-muted-foreground mb-1">NHS Number</Label>
              <Input id="nhsNumber" value={nhsNumber} onChange={e => setNhsNumber(e.target.value)} className="h-8 w-[140px] text-sm" />
            </div>
            {documentCount > 0 && (
              <div className="ml-2 flex items-center">
                <Badge className="bg-blue-800 hover:bg-blue-800 text-white">
                  {documentCount} Document{documentCount !== 1 ? 's' : ''}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
              <Link to="/" className="flex items-center gap-1">Save & Exit</Link>
            </Button>
            <Button className="bg-blue-800 hover:bg-blue-900 text-sm" onClick={onContinue}>
              <span className="flex items-center gap-1">
                Continue <ArrowRightIcon size={16} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
