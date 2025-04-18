
import { useState } from "react";
import { CheckCircle2Icon, AlertCircleIcon, PlusIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormProgress from "@/components/FormProgress";
import TableOfContents from "@/components/TableOfContents";
import { Medication } from "@/components/MedicationItem";
import ClinicalTabsSection from "@/components/review/ClinicalTabsSection";
import PresentingIssuesSection from "@/components/review/PresentingIssuesSection";
import MedicationSection from "@/components/review/MedicationSection";
import SocialHistorySection from "@/components/review/SocialHistorySection";
import FamilyHistorySection from "@/components/review/FamilyHistorySection";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CitableText } from "@/components/CitationTooltip";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import StepProgress from "@/components/StepProgress";
import { Link, useNavigate } from "react-router-dom";

export const ReviewPage = () => {
  const [presentingIssues, setPresentingIssues] = useState<string>(
    "Patient presents with a 2-week history of worsening breathlessness, productive cough with yellow-green sputum, and fever. History of COPD for 10 years, with 2 exacerbations requiring hospitalization in the past year."
  );

  const [socialHistory, setSocialHistory] = useState<string>(
    "Current smoker with 30 pack-year history. Lives alone in a single-story house. Works as a retired factory worker. Drinks 10 units of alcohol per week."
  );

  const [familyHistory, setFamilyHistory] = useState<string>(
    "Father died of myocardial infarction at age 68. Mother had COPD and died at 72. No siblings. No known hereditary conditions."
  );

  const [progressNotes, setProgressNotes] = useState<string>(
    "Initial assessment reveals patient in moderate respiratory distress. Oxygen saturation 92% on room air. Wheezing and crackles on auscultation. Heart rate 105 bpm, blood pressure 145/85 mmHg. Temperature 38.2°C. Started on oxygen therapy, nebulized bronchodilators, and IV antibiotics. Plan to admit to respiratory ward for ongoing management."
  );

  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Salbutamol", dosage: "100mcg", frequency: "2 puffs QID PRN", route: "Inhaled" },
    { id: "2", name: "Tiotropium", dosage: "18mcg", frequency: "Once daily", route: "Inhaled" },
    { id: "3", name: "Prednisolone", dosage: "30mg", frequency: "Once daily", route: "Oral" },
    { id: "4", name: "Amoxicillin", dosage: "500mg", frequency: "TID", route: "Oral" }
  ]);

  // Track the number of sections that have been reviewed
  const completedSections = 4;
  const totalSections = 5;

  const handleAddMedication = () => {
    const newMedication: Medication = {
      id: (medications.length + 1).toString(),
      name: "",
      dosage: "",
      frequency: "",
      route: ""
    };
    setMedications([...medications, newMedication]);
  };

  const handleUpdateMedication = (updatedMedication: Medication) => {
    const updatedMedications = medications.map(med => 
      med.id === updatedMedication.id ? updatedMedication : med
    );
    setMedications(updatedMedications);
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleGenerateReport = () => {
    toast.success("Report generated successfully");
  };

  return (
    <div className="container mx-auto px-6 py-6 w-6xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Clinical Review</h1>
            <p className="text-gray-500">Review and edit the extracted information</p>
          </div>
          <FormProgress completedSections={completedSections} totalSections={totalSections} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-4 shadow-sm">
              <SectionHeader title="Presenting Issues" confidenceLevel="high" confidenceScore={0.92} />
              <CitableText 
                text={presentingIssues} 
                fileName="Consultation Transcript"
              />
            </Card>

            <Card className="p-4 shadow-sm">
              <SectionHeader title="Medications" />
              <MedicationSection 
                medications={medications} 
                onUpdate={handleUpdateMedication} 
                onDelete={handleDeleteMedication} 
                onAdd={handleAddMedication}
              />
            </Card>

            <Card className="p-4 shadow-sm">
              <SectionHeader title="Social History" confidenceLevel="medium" confidenceScore={0.78} />
              <CitableText 
                text={socialHistory} 
                fileName="Patient Records"
              />
            </Card>

            <Card className="p-4 shadow-sm">
              <SectionHeader title="Family History" confidenceLevel="low" confidenceScore={0.65} />
              <CitableText 
                text={familyHistory} 
                fileName="Questionnaire"
              />
            </Card>

            <Card className="p-4 shadow-sm">
              <ClinicalTabsSection 
                progressNotes={progressNotes}
                setProgressNotes={setProgressNotes}
              />
            </Card>
          </div>

          <div className="lg:col-span-1">
            <TableOfContents 
              sections={[
                { id: "presenting-issues", title: "Presenting Issues", status: "complete" },
                { id: "medications", title: "Medications", status: "complete" },
                { id: "social-history", title: "Social History", status: "complete" },
                { id: "family-history", title: "Family History", status: "complete" },
                { id: "clinical-notes", title: "Clinical Notes", status: "incomplete" }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
