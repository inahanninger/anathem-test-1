
// Table of contents data for different tabs
export const progressNotesToc = [
  {
    id: "section-1",
    title: "Session Summary",
    level: 1
  },
  {
    id: "section-2",
    title: "Current Symptoms",
    level: 1
  },
  {
    id: "section-3",
    title: "Sleep Patterns",
    level: 2
  },
  {
    id: "section-4",
    title: "Mood Status",
    level: 2
  },
  {
    id: "section-5",
    title: "Intervention Progress",
    level: 1
  },
  {
    id: "section-6",
    title: "Homework Assigned",
    level: 1
  }
];

export const clinicalDetailsToc = [
  {
    id: "clinical-1",
    title: "Assessment Scores",
    level: 1
  },
  {
    id: "clinical-2",
    title: "Medication Compliance",
    level: 1
  },
  {
    id: "clinical-3",
    title: "Risk Assessment",
    level: 1
  },
  {
    id: "clinical-4",
    title: "Vital Signs",
    level: 2
  },
  {
    id: "clinical-5",
    title: "Labs Review",
    level: 2
  },
  {
    id: "clinical-6",
    title: "Current Diagnosis",
    level: 1
  }
];

export const developmentalToc = [
  {
    id: "dev-1",
    title: "Early Childhood",
    level: 1
  },
  {
    id: "dev-2",
    title: "Middle Childhood",
    level: 1
  },
  {
    id: "dev-3",
    title: "Adolescence",
    level: 1
  },
  {
    id: "dev-4",
    title: "Educational History",
    level: 2
  },
  {
    id: "dev-5",
    title: "Family Dynamics",
    level: 2
  },
  {
    id: "dev-6",
    title: "Significant Life Events",
    level: 1
  }
];

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
