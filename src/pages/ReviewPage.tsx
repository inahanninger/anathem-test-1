import { useState } from "react";
import { AlertCircleIcon, CheckCircle2Icon, ClipboardCheckIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import EditableField from "@/components/EditableField";
import MedicationItem, { Medication } from "@/components/MedicationItem";
import FormProgress from "@/components/FormProgress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
const ReviewPage = () => {
  const [completedSections, setCompletedSections] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  // Page 1 content
  const [presentingIssues, setPresentingIssues] = useState("Patient reports experiencing moderate depressive symptoms for approximately 3 months, including low mood, decreased interest in activities, and poor sleep. Patient also mentions occasional anxiety in social situations that has increased in frequency over the past month.");
  const [medications, setMedications] = useState<Medication[]>([{
    id: "1",
    name: "Sertraline",
    dosage: "50mg",
    frequency: "Once daily"
  }, {
    id: "2",
    name: "Lorazepam",
    dosage: "0.5mg",
    frequency: "As needed"
  }]);

  // Page 2 content
  const [socialHistory, setSocialHistory] = useState("Patient is a 28-year-old software engineer who works remotely full-time. They describe their work environment as moderately stressful. Patient completed a bachelor's degree in computer science in 2018. Patient reports having a small but supportive social network, primarily consisting of 3-4 close friends. They engage in social activities approximately once per week.");
  const [familyHistory, setFamilyHistory] = useState("Patient reports maternal history of depression and anxiety. Father has no known mental health conditions. Patient has one younger sibling with ADHD diagnosis. No known history of substance abuse disorders in immediate family.");

  // Page 3 content
  const [clinicalNotes, setClinicalNotes] = useState("Patient presents with symptoms consistent with Major Depressive Disorder and Social Anxiety Disorder. Current medication regimen appears to be providing moderate symptom relief, but patient may benefit from increased psychosocial interventions, particularly around social anxiety. Recommend weekly CBT sessions for 8 weeks, focusing on cognitive restructuring and graduated exposure exercises.");
  const [treatmentPlan, setTreatmentPlan] = useState("1. Continue current medication regimen with follow-up in 4 weeks\n2. Begin weekly CBT with focus on social anxiety symptoms\n3. Patient to complete daily mood tracking\n4. Provide referral to support group for young professionals with anxiety");
  const handleMedicationUpdate = (id: string, updatedMed: Partial<Medication>) => {
    setMedications(medications.map(med => med.id === id ? {
      ...med,
      ...updatedMed
    } : med));
  };
  const handleMedicationDelete = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  const handleAddMedication = () => {
    const newId = (Math.max(0, ...medications.map(m => parseInt(m.id))) + 1).toString();
    setMedications([...medications, {
      id: newId,
      name: "",
      dosage: "",
      frequency: ""
    }]);
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
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="border-b border-gray-100 py-5 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500">{currentDate}</span>
            <h1 className="text-2xl font-medium">Patient Documentation Review</h1>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-b border-gray-100 bg-gray-50/80 py-3 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              
              
            </div>
            <FormProgress completedSections={completedSections} totalSections={6} />
          </div>
        </div>
      </div>
      
      <div className="container max-w-4xl py-8 px-6">
        <div className="space-y-6">
          {currentPage === 1 && <>
              {/* Presenting Issues Section */}
              <div className="section-container rounded">
                <Card className="border-0 shadow-sm">
                  <SectionHeader title="Presenting Issues" confidenceLevel="high" confidenceScore={94}>
                    
                  </SectionHeader>
                  
                  <EditableField initialValue={presentingIssues} fieldType="textarea" onSave={setPresentingIssues} alwaysEditable={true} />
                </Card>
              </div>
              
              {/* Medication Review Section */}
              <div className="section-container">
                <Card className="border-0 shadow-sm">
                  <SectionHeader title="Medication Review" confidenceLevel="medium" confidenceScore={82}>
                    
                  </SectionHeader>
                  
                  <div className="space-y-3">
                    {medications.map(med => <MedicationItem key={med.id} medication={med} onUpdate={handleMedicationUpdate} onDelete={handleMedicationDelete} alwaysEditable={true} />)}
                    
                    <Button variant="outline" className="w-full mt-2 border-dashed gap-2" onClick={handleAddMedication}>
                      <PlusIcon className="h-4 w-4" />
                      Add Medication
                    </Button>
                  </div>
                </Card>
              </div>
            </>}

          {currentPage === 2 && <>
              {/* School and Social History Section */}
              <div className="section-container">
                <Card className="border-0 shadow-sm">
                  <SectionHeader title="School and Social History" confidenceLevel="high" confidenceScore={88}>
                    
                  </SectionHeader>
                  
                  <EditableField initialValue={socialHistory} fieldType="textarea" onSave={setSocialHistory} alwaysEditable={true} />
                </Card>
              </div>
              
              {/* Family History Section */}
              <div className="section-container">
                <Card className="border-0 shadow-sm">
                  <SectionHeader title="Family History" confidenceLevel="medium" confidenceScore={76}>
                    
                  </SectionHeader>
                  
                  <EditableField initialValue={familyHistory} fieldType="textarea" onSave={setFamilyHistory} alwaysEditable={true} />
                </Card>
              </div>
            </>}

          {currentPage === 3 && <>
              {/* Clinical Notes Section */}
              <div className="section-container">
                <Card className="border-0 shadow-sm">
                  <SectionHeader title="Clinical Notes" confidenceLevel="low" confidenceScore={65}>
                    
                  </SectionHeader>
                  
                  <EditableField initialValue={clinicalNotes} fieldType="textarea" onSave={setClinicalNotes} alwaysEditable={true} />
                </Card>
              </div>
              
              {/* Treatment Plan Section */}
              <div className="section-container">
                <Card className="border-0 shadow-sm">
                  <SectionHeader title="Treatment Plan" confidenceLevel="medium" confidenceScore={78}>
                    
                  </SectionHeader>
                  
                  <EditableField initialValue={treatmentPlan} fieldType="textarea" onSave={setTreatmentPlan} alwaysEditable={true} />
                </Card>
              </div>
            </>}
        
          {/* Pagination */}
          <Pagination className="mt-8">
            
          </Pagination>
        </div>
      </div>
      
      {/* Sticky Submit Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button size="lg" onClick={handleSaveAll} className="shadow-md rounded-md px-6 bg-blue-900 hover:bg-blue-800">Next</Button>
      </div>
    </div>;
};
export default ReviewPage;