
import { useState } from "react";
import { 
  AlertCircleIcon, 
  CheckCircle2Icon, 
  PlusIcon,
  FileTextIcon, 
  ClipboardIcon, 
  BookIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import EditableField from "@/components/EditableField";
import MedicationItem, { Medication } from "@/components/MedicationItem";
import FormProgress from "@/components/FormProgress";
import TableOfContents from "@/components/TableOfContents";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ReviewPage = () => {
  const [completedSections, setCompletedSections] = useState(2);
  const [activeTab, setActiveTab] = useState("progress-notes");

  // Mock table of contents data
  const progressNotesToc = [
    { id: "section-1", title: "Session Summary", level: 1 },
    { id: "section-2", title: "Current Symptoms", level: 1 },
    { id: "section-3", title: "Sleep Patterns", level: 2 },
    { id: "section-4", title: "Mood Status", level: 2 },
    { id: "section-5", title: "Intervention Progress", level: 1 },
    { id: "section-6", title: "Homework Assigned", level: 1 },
  ];

  const clinicalDetailsToc = [
    { id: "clinical-1", title: "Assessment Scores", level: 1 },
    { id: "clinical-2", title: "Medication Compliance", level: 1 },
    { id: "clinical-3", title: "Risk Assessment", level: 1 },
    { id: "clinical-4", title: "Vital Signs", level: 2 },
    { id: "clinical-5", title: "Labs Review", level: 2 },
    { id: "clinical-6", title: "Current Diagnosis", level: 1 },
  ];

  const developmentalToc = [
    { id: "dev-1", title: "Early Childhood", level: 1 },
    { id: "dev-2", title: "Middle Childhood", level: 1 },
    { id: "dev-3", title: "Adolescence", level: 1 },
    { id: "dev-4", title: "Educational History", level: 2 },
    { id: "dev-5", title: "Family Dynamics", level: 2 },
    { id: "dev-6", title: "Significant Life Events", level: 1 },
  ];

  // Content data
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

  // Additional content previously on separate pages
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

  const handleGenerateMoreNotes = () => {
    toast.success("Generating additional notes...");
    // In a real application, this would trigger an API call to generate more content
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Highlight the section briefly
      element.classList.add("bg-yellow-50");
      setTimeout(() => {
        element.classList.remove("bg-yellow-50");
      }, 2000);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getCurrentTabToc = () => {
    switch(activeTab) {
      case "progress-notes":
        return progressNotesToc;
      case "clinical-details":
        return clinicalDetailsToc;
      case "developmental-history":
        return developmentalToc;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="border-b border-gray-100 py-5 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500">{currentDate}</span>
            <h1 className="text-2xl font-medium">Patient Documentation Review</h1>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-b border-gray-100 bg-gray-50/80 py-3 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Any status indicators can go here */}
            </div>
            <FormProgress completedSections={completedSections} totalSections={6} />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container max-w-5xl mx-auto py-8 px-6">
        <div className="flex">
          {/* Left sidebar with TOC */}
          <aside className="w-64 sticky top-5 self-start pr-6 hidden md:block">
            <TableOfContents 
              items={getCurrentTabToc()}
              onSelectItem={scrollToSection}
            />
          </aside>
          
          {/* Main content area */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Tabs at the top */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <h2 className="font-semibold text-base">Clinical Data</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1 bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                  onClick={handleGenerateMoreNotes}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="text-xs">Generate</span>
                </Button>
              </div>
              
              <Tabs defaultValue="progress-notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full flex bg-gray-100/70 p-0.5">
                  <TabsTrigger value="progress-notes" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
                    Progress Notes
                  </TabsTrigger>
                  <TabsTrigger value="clinical-details" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <ClipboardIcon className="h-3.5 w-3.5 mr-1.5" />
                    Clinical Details
                  </TabsTrigger>
                  <TabsTrigger value="developmental-history" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <BookIcon className="h-3.5 w-3.5 mr-1.5" />
                    Developmental History
                  </TabsTrigger>
                </TabsList>
                
                {/* Mobile-only table of contents */}
                <div className="md:hidden">
                  <TableOfContents 
                    items={getCurrentTabToc()}
                    onSelectItem={scrollToSection}
                  />
                </div>
                
                <TabsContent value="progress-notes" className="m-0 p-4">
                  <div dangerouslySetInnerHTML={{ __html: progressNotes.split('\n').map(line => {
                    if (line.startsWith('## ')) {
                      const id = line.substring(3).toLowerCase().replace(/\s+/g, '-');
                      return `<h2 id="${id}" class="text-lg font-semibold mt-4 mb-2">${line.substring(3)}</h2>`;
                    } else if (line.startsWith('### ')) {
                      const id = line.substring(4).toLowerCase().replace(/\s+/g, '-');
                      return `<h3 id="${id}" class="text-base font-medium mt-3 mb-1">${line.substring(4)}</h3>`;
                    } else if (line.startsWith('- ')) {
                      return `<li class="ml-5 list-disc">${line.substring(2)}</li>`;
                    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                      return `<li class="ml-5 list-decimal">${line.substring(3)}</li>`;
                    } else if (line === '') {
                      return '<p>&nbsp;</p>';
                    } else {
                      return `<p>${line}</p>`;
                    }
                  }).join('')}} />
                  <EditableField initialValue={progressNotes} fieldType="textarea" onSave={setProgressNotes} alwaysEditable={true} />
                </TabsContent>
                
                <TabsContent value="clinical-details" className="m-0 p-4">
                  <div dangerouslySetInnerHTML={{ __html: clinicalDetails.split('\n').map(line => {
                    if (line.startsWith('## ')) {
                      const id = line.substring(3).toLowerCase().replace(/\s+/g, '-');
                      return `<h2 id="${id}" class="text-lg font-semibold mt-4 mb-2">${line.substring(3)}</h2>`;
                    } else if (line.startsWith('### ')) {
                      const id = line.substring(4).toLowerCase().replace(/\s+/g, '-');
                      return `<h3 id="${id}" class="text-base font-medium mt-3 mb-1">${line.substring(4)}</h3>`;
                    } else if (line.startsWith('- ')) {
                      return `<li class="ml-5 list-disc">${line.substring(2)}</li>`;
                    } else if (line === '') {
                      return '<p>&nbsp;</p>';
                    } else {
                      return `<p>${line}</p>`;
                    }
                  }).join('')}} />
                  <EditableField initialValue={clinicalDetails} fieldType="textarea" onSave={setClinicalDetails} alwaysEditable={true} />
                </TabsContent>
                
                <TabsContent value="developmental-history" className="m-0 p-4">
                  <div dangerouslySetInnerHTML={{ __html: developmentalHistory.split('\n').map(line => {
                    if (line.startsWith('## ')) {
                      const id = line.substring(3).toLowerCase().replace(/\s+/g, '-');
                      return `<h2 id="${id}" class="text-lg font-semibold mt-4 mb-2">${line.substring(3)}</h2>`;
                    } else if (line.startsWith('### ')) {
                      const id = line.substring(4).toLowerCase().replace(/\s+/g, '-');
                      return `<h3 id="${id}" class="text-base font-medium mt-3 mb-1">${line.substring(4)}</h3>`;
                    } else if (line.startsWith('- ')) {
                      return `<li class="ml-5 list-disc">${line.substring(2)}</li>`;
                    } else if (line === '') {
                      return '<p>&nbsp;</p>';
                    } else {
                      return `<p>${line}</p>`;
                    }
                  }).join('')}} />
                  <EditableField initialValue={developmentalHistory} fieldType="textarea" onSave={setDevelopmentalHistory} alwaysEditable={true} />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Presenting Issues Section */}
            <Card className="border-0 shadow-sm">
              <SectionHeader title="Presenting Issues" confidenceLevel="high" confidenceScore={94} />
              <div className="px-4 pb-4">
                <EditableField initialValue={presentingIssues} fieldType="textarea" onSave={setPresentingIssues} alwaysEditable={true} />
              </div>
            </Card>
            
            {/* Medication Review Section */}
            <Card className="border-0 shadow-sm">
              <SectionHeader title="Medication Review" confidenceLevel="medium" confidenceScore={82} />
              <div className="px-4 pb-4 space-y-3">
                {medications.map(med => <MedicationItem key={med.id} medication={med} onUpdate={handleMedicationUpdate} onDelete={handleMedicationDelete} alwaysEditable={true} />)}
                <Button variant="outline" className="w-full mt-2 border-dashed gap-2" onClick={handleAddMedication}>
                  <PlusIcon className="h-4 w-4" />
                  Add Medication
                </Button>
              </div>
            </Card>
            
            {/* Social History */}
            <Card className="border-0 shadow-sm">
              <SectionHeader title="School and Social History" confidenceLevel="high" confidenceScore={88} />
              <div className="px-4 pb-4">
                <EditableField initialValue={socialHistory} fieldType="textarea" onSave={setSocialHistory} alwaysEditable={true} />
              </div>
            </Card>
            
            {/* Family History */}
            <Card className="border-0 shadow-sm">
              <SectionHeader title="Family History" confidenceLevel="medium" confidenceScore={76} />
              <div className="px-4 pb-4">
                <EditableField initialValue={familyHistory} fieldType="textarea" onSave={setFamilyHistory} alwaysEditable={true} />
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Sticky Submit Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button size="lg" onClick={handleSaveAll} className="shadow-md rounded-md px-6 bg-blue-900 hover:bg-blue-800">
          Save All
        </Button>
      </div>
    </div>
  );
};

export default ReviewPage;
