
import EditableField from "@/components/EditableField";
import { developmentalToc } from "./tabs/TabContentData";
import TableOfContents from "@/components/TableOfContents";

interface DevelopmentalHistoryTabProps {
  developmentalHistory: string;
  setDevelopmentalHistory: (value: string) => void;
}

const DevelopmentalHistoryTab = ({ developmentalHistory, setDevelopmentalHistory }: DevelopmentalHistoryTabProps) => {
  // Default template for developmental history with all the sections
  const defaultTemplate = `## 📋 Demographic & Background Information
Name: 

Date of Birth / Age: 

Gender: 

Preferred pronouns: 

Contact details: 

Assessment date: 

Name and relationship of informant (if applicable): 

## 📜 Pregnancy & Birth History
Pregnancy complications (e.g. maternal illness, infections, medication, stress, substance use): 

Birth complications (e.g. premature, emergency C-section, low birth weight, NICU admission): 

Gestational age at birth: 

APGAR scores (if known): 

## 👶 Early Developmental Milestones
(When were these achieved, were they delayed or atypical?)

Motor milestones (e.g. sitting, crawling, walking): 

Speech and language development (e.g. babbling, first words, phrases): 

Toileting: 

Feeding habits: 

Sleep patterns: 

Social engagement (e.g. smiling, eye contact, joint attention): 

## 🏡 Early Childhood Behaviour
Temperament (e.g. easy-going, anxious, intense): 

Sensory sensitivities (e.g. to sound, touch, food textures): 

Response to change/routine: 

Play behaviour (e.g. imaginative play, preference for solitary play, repetitive play): 

Social interactions (with family, peers): 

Repetitive behaviours or fixations: 

## 🎒 School History (or Nursery/Preschool)
Age started: 

Academic performance: 

Attention and concentration: 

Organisation skills: 

Social interactions at school: 

Behavioural concerns (e.g. hyperactivity, impulsivity, withdrawal): 

Special educational support / interventions: 

## 🧠 Neurodevelopmental / Medical History
Diagnosed conditions (e.g. epilepsy, learning difficulties, dyslexia): 

Previous assessments (if any): 

Medications: 

Family history of neurodevelopmental / psychiatric conditions: 

## 🧩 Current Functioning
Attention / concentration issues: 

Hyperactivity / impulsivity: 

Social interaction style: 

Sensory sensitivities: 

Emotional regulation: 

Daily living skills (self-care, organisation, time management): 

Special interests / fixations: 

Executive functioning difficulties: 

## 🧬 Family & Social History
Family structure: 

Parental mental health: 

Family history of neurodevelopmental/psychiatric conditions: 

Significant life events (e.g. trauma, bereavement, parental separation): 

## 📝 Additional Notes / Other Concerns
Any other observations or worries from parents, carers, teachers, or the individual themselves:`;

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

  // Use the default template if developmentalHistory is empty
  const currentValue = developmentalHistory.trim() === "" ? defaultTemplate : developmentalHistory;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-64 md:flex-shrink-0">
        <TableOfContents 
          items={developmentalToc} 
          onSelectItem={scrollToSection} 
          visible={true} 
        />
      </div>
      <div className="flex-grow">
        <EditableField 
          initialValue={currentValue} 
          fieldType="textarea" 
          onSave={setDevelopmentalHistory} 
          alwaysEditable={true} 
        />
      </div>
    </div>
  );
};

export default DevelopmentalHistoryTab;
