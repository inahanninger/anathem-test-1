
import { useState } from "react";
import { AlertCircleIcon, CheckCircle2Icon, ClipboardCheckIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import EditableField from "@/components/EditableField";
import MedicationItem, { Medication } from "@/components/MedicationItem";
import FormProgress from "@/components/FormProgress";

const ReviewPage = () => {
  const [completedSections, setCompletedSections] = useState(2);
  
  const [presentingIssues, setPresentingIssues] = useState(
    "Patient reports experiencing moderate depressive symptoms for approximately 3 months, including low mood, decreased interest in activities, and poor sleep. Patient also mentions occasional anxiety in social situations that has increased in frequency over the past month."
  );
  
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Sertraline", dosage: "50mg", frequency: "Once daily" },
    { id: "2", name: "Lorazepam", dosage: "0.5mg", frequency: "As needed" }
  ]);
  
  const [socialHistory, setSocialHistory] = useState(
    "Patient is a 28-year-old software engineer who works remotely full-time. They describe their work environment as moderately stressful. Patient completed a bachelor's degree in computer science in 2018. Patient reports having a small but supportive social network, primarily consisting of 3-4 close friends. They engage in social activities approximately once per week."
  );
  
  const [clinicalNotes, setClinicalNotes] = useState(
    "Patient presents with symptoms consistent with Major Depressive Disorder and Social Anxiety Disorder. Current medication regimen appears to be providing moderate symptom relief, but patient may benefit from increased psychosocial interventions, particularly around social anxiety. Recommend weekly CBT sessions for 8 weeks, focusing on cognitive restructuring and graduated exposure exercises."
  );
  
  const handleMedicationUpdate = (id: string, updatedMed: Partial<Medication>) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, ...updatedMed } : med
    ));
  };
  
  const handleMedicationDelete = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  const handleAddMedication = () => {
    const newId = (Math.max(0, ...medications.map(m => parseInt(m.id))) + 1).toString();
    setMedications([...medications, { id: newId, name: "", dosage: "", frequency: "" }]);
  };
  
  const handleSaveAll = () => {
    toast.success("All changes saved to patient record");
  };
  
  const toggleSectionCompletion = (sectionName: string, isComplete: boolean) => {
    setCompletedSections(prev => isComplete ? prev + 1 : Math.max(0, prev - 1));
    toast(`${sectionName} ${isComplete ? "marked as reviewed" : "marked as pending"}`, {
      icon: isComplete ? <CheckCircle2Icon className="h-4 w-4 text-green-500" /> : <AlertCircleIcon className="h-4 w-4 text-amber-500" />
    });
  };
  
  return (
    <div className="min-h-screen bg-clinical-neutral/50">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex items-center gap-2">
          <ClipboardCheckIcon className="h-5 w-5 text-primary" />
          <h1 className="font-medium">AI-Assisted Clinical Documentation Review</h1>
        </div>
        <FormProgress completedSections={completedSections} totalSections={4} />
      </div>
      
      <div className="container max-w-4xl py-8">
        <div className="space-y-6">
          {/* Presenting Issues Section */}
          <div className="section-container" style={{ animationDelay: "0ms" }}>
            <Card className="clinical-card">
              <SectionHeader 
                title="Presenting Issues" 
                confidenceLevel="high" 
                confidenceScore={94}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 h-7"
                  onClick={() => toggleSectionCompletion("Presenting Issues", true)}
                >
                  <CheckCircle2Icon className="h-3.5 w-3.5" />
                  Mark as Reviewed
                </Button>
              </SectionHeader>
              
              <EditableField 
                initialValue={presentingIssues}
                fieldType="textarea"
                onSave={setPresentingIssues}
              />
            </Card>
          </div>
          
          {/* Medication Review Section */}
          <div className="section-container" style={{ animationDelay: "100ms" }}>
            <Card className="clinical-card">
              <SectionHeader 
                title="Medication Review" 
                confidenceLevel="medium" 
                confidenceScore={82}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 h-7"
                  onClick={() => toggleSectionCompletion("Medication Review", true)}
                >
                  <CheckCircle2Icon className="h-3.5 w-3.5" />
                  Mark as Reviewed
                </Button>
              </SectionHeader>
              
              <div className="space-y-3">
                {medications.map((med) => (
                  <MedicationItem 
                    key={med.id}
                    medication={med}
                    onUpdate={handleMedicationUpdate}
                    onDelete={handleMedicationDelete}
                  />
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2 border-dashed gap-2"
                  onClick={handleAddMedication}
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Medication
                </Button>
              </div>
            </Card>
          </div>
          
          {/* School and Social History Section */}
          <div className="section-container" style={{ animationDelay: "200ms" }}>
            <Card className="clinical-card">
              <SectionHeader 
                title="School and Social History" 
                confidenceLevel="high" 
                confidenceScore={88}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 h-7"
                  onClick={() => toggleSectionCompletion("School and Social History", true)}
                >
                  <CheckCircle2Icon className="h-3.5 w-3.5" />
                  Mark as Reviewed
                </Button>
              </SectionHeader>
              
              <EditableField 
                initialValue={socialHistory} 
                fieldType="textarea"
                onSave={setSocialHistory}
              />
            </Card>
          </div>
          
          {/* Clinical Notes Section */}
          <div className="section-container" style={{ animationDelay: "300ms" }}>
            <Card className="clinical-card">
              <SectionHeader 
                title="Clinical Notes" 
                confidenceLevel="low" 
                confidenceScore={65}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 h-7"
                  onClick={() => toggleSectionCompletion("Clinical Notes", true)}
                >
                  <CheckCircle2Icon className="h-3.5 w-3.5" />
                  Mark as Reviewed
                </Button>
              </SectionHeader>
              
              <EditableField 
                initialValue={clinicalNotes} 
                fieldType="textarea"
                onSave={setClinicalNotes}
              />
            </Card>
          </div>
        </div>
      </div>
      
      {/* Sticky Submit Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button 
          size="lg"
          className="shadow-md rounded-full px-6"
          onClick={handleSaveAll}
        >
          Save to Patient Record
        </Button>
      </div>
    </div>
  );
};

export default ReviewPage;
