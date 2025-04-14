
export interface RiskSubItem {
  id: string;
  name: string;
  description: string;
  quotes?: number;
}

export interface RiskFactor {
  id: string;
  name: string;
  status: "red" | "amber" | "green";
  completed: number;
  total: number;
  isExpanded: boolean;
  items?: RiskSubItem[];
}
