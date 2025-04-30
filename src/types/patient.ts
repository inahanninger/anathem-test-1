
export interface UploadStatus {
  snap4: boolean;
  teacherSummary: boolean;
  abcReport: boolean;
  connorsQuestionnaire: boolean;
  consultationRecorded: boolean;
  developmentHistory: boolean;
}

export interface SnapValue {
  id: string;
  value: string;
  source: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  dateUploaded: Date;
}

export interface RecordedSession {
  id: string;
  title: string;
  date: string;
  duration: string;
}
