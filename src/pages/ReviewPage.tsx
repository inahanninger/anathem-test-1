import { useState } from "react";
import { CheckCircle2Icon, AlertCircleIcon, PlusIcon, ArrowLeftIcon } from "lucide-react";
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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
const ReviewPage = () => {
  const [completedSections, setCompletedSections] = useState(2);
  const [activeTab, setActiveTab] = useState("progress-notes");
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
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
  const [progressNotes, setProgressNotes] = useState(`
## Session Summary
Patient attended session today and reported improvements in sleep patterns following the implementation of sleep hygiene techniques discussed in our previous session.

## Current Symptoms
Patient expressed continued concerns about work-related stressors and how these impact their mood. 

### Sleep Patterns
Sleep has improved from 4-5 hours per night to 6-7 hours with implementation of sleep hygiene protocols. Patient still reports middle insomnia with 20-30 minute awakening periods.

### Mood Status
Patient rates mood as 5/10 (improved from 3/10 at last session). Anxiety remains situational, primarily in work meetings and social gatherings.

## Intervention Progress
We explored coping strategies, specifically mindfulness practices and scheduled breaks throughout the workday. Patient demonstrated good understanding and commitment to implementing these techniques.

## Homework Assigned
1. Continue daily meditation practice for 10 minutes
2. Complete thought records when experiencing anxiety
3. Maintain sleep hygiene practices
`);
  const [clinicalDetails, setClinicalDetails] = useState(`
## Assessment Scores
- Current GAD-7 score: 12 (moderate anxiety)
- Current PHQ-9 score: 14 (moderate depression)

## Medication Compliance
Patient reports compliance with medication regimen with some improvement in mood stability.

## Risk Assessment
Patient denies any suicidal ideation or intent. No homicidal ideation or psychotic symptoms reported.

### Vital Signs
- BP: 118/76
- HR: 72
- Weight: 165 lbs (stable from last visit)

### Labs Review
Most recent labs from 3/15/2025:
- TSH: 2.4 mIU/L (within normal range)
- Complete metabolic panel: within normal limits
- Lipid panel: borderline elevated LDL (142 mg/dL)

## Current Diagnosis
- Major Depressive Disorder, Recurrent, Moderate (F33.1)
- Generalized Anxiety Disorder (F41.1)
`);
  const [developmentalHistory, setDevelopmentalHistory] = useState(`
## Early Childhood
Patient reports unremarkable early developmental history. Met developmental milestones within expected timeframes.

## Middle Childhood
Attended public school with average academic performance. No history of learning disabilities reported.

## Adolescence
Patient describes typical adolescent adjustment with some social anxiety beginning around age 15.

### Educational History
- Elementary: Public school, good academic performance
- Middle School: Public school, maintained B average
- High School: Public school, B average, participated in chess club and debate team
- College: State university, graduated with Bachelor's in Business Administration (3.2 GPA)

### Family Dynamics
Patient describes childhood household as "tense but functional" with parents who divorced when patient was 14 years old.

## Significant Life Events
- Parents' divorce at age 14
- First panic attack at age 15 before class presentation
- College graduation (positive achievement)
- Job promotion 2 years ago (positive but increased responsibility and stress)
`);
  const [socialHistory, setSocialHistory] = useState("Patient is a 28-year-old software engineer who works remotely full-time. They describe their work environment as moderately stressful. Patient completed a bachelor's degree in computer science in 2018. Patient reports having a small but supportive social network, primarily consisting of 3-4 close friends. They engage in social activities approximately once per week.");
  const [familyHistory, setFamilyHistory] = useState("Patient reports maternal history of depression and anxiety. Father has no known mental health conditions. Patient has one younger sibling with ADHD diagnosis. No known history of substance abuse disorders in immediate family.");
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
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const progressNotesToc = [{
    id: "section-1",
    title: "Session Summary",
    level: 1
  }, {
    id: "section-2",
    title: "Current Symptoms",
    level: 1
  }, {
    id: "section-3",
    title: "Sleep Patterns",
    level: 2
  }, {
    id: "section-4",
    title: "Mood Status",
    level: 2
  }, {
    id: "section-5",
    title: "Intervention Progress",
    level: 1
  }, {
    id: "section-6",
    title: "Homework Assigned",
    level: 1
  }];
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      element.classList.add("bg-yellow-50");
      setTimeout(() => {
        element.classList.remove("bg-yellow-50");
      }, 2000);
    }
  };
  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-0">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb className="py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1 text-blue-600">
                  <ArrowLeftIcon size={16} />
                  <span className="text-xs">Transcribe</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/risk" className="text-blue-600">
                  Risk Assessment
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-xs">Summary View</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbItem className="ml-auto">
                <Button variant="outline" className="mr-2 text-blue-600 border-blue-600">
                  Back
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900">
                  Save All
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/80 py-3 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <Label htmlFor="patientName" className="text-xs text-muted-foreground mb-1">Patient Name</Label>
                <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} className="h-8 w-[180px] text-sm" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="nhsNumber" className="text-xs text-muted-foreground mb-1">NHS Number</Label>
                <Input id="nhsNumber" value={nhsNumber} onChange={e => setNhsNumber(e.target.value)} className="h-8 w-[140px] text-sm" />
              </div>
            </div>
            <FormProgress completedSections={completedSections} totalSections={6} />
          </div>
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-0">
        <div className="flex">
          <div className="flex-1 min-w-0 space-y-6">
            <ClinicalTabsSection progressNotes={progressNotes} setProgressNotes={setProgressNotes} clinicalDetails={clinicalDetails} setClinicalDetails={setClinicalDetails} developmentalHistory={developmentalHistory} setDevelopmentalHistory={setDevelopmentalHistory} />
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-10">
        
      </div>
    </div>;
};
export default ReviewPage;