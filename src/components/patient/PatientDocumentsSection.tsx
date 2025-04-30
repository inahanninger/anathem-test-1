
import React from "react";
import { SnapValue, RecordedSession } from "@/types/patient";
import TranscribeConsultationCard from "./TranscribeConsultationCard";
import SnapIvCard from "./SnapIvCard";

interface PatientDocumentsSectionProps {
  snapValues: SnapValue[];
  recordedSessions: RecordedSession[];
  isConsultationRecorded: boolean;
  onSnapValueChange: (id: string, value: string) => void;
  onSnapSourceChange: (id: string, source: string) => void;
  onAddSnapField: () => void;
  onRemoveSnapField: (id: string) => void;
}

const PatientDocumentsSection: React.FC<PatientDocumentsSectionProps> = ({
  snapValues,
  recordedSessions,
  isConsultationRecorded,
  onSnapValueChange,
  onSnapSourceChange,
  onAddSnapField,
  onRemoveSnapField
}) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6 text-neutral-900">Patient Documents</h2>
      
      <div className="space-y-4">
        <TranscribeConsultationCard 
          isCompleted={isConsultationRecorded}
          recordedSessions={recordedSessions}
        />
        
        <SnapIvCard 
          snapValues={snapValues}
          onValueChange={onSnapValueChange}
          onSourceChange={onSnapSourceChange}
          onAddField={onAddSnapField}
          onRemoveField={onRemoveSnapField}
        />
      </div>
    </section>
  );
};

export default PatientDocumentsSection;
