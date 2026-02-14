export interface Task {
  _id: string;
  task: string;
  owner?: string;
  dueDate?: string;
  status: "pending" | "done";
}

export interface StatusData {
  backend: boolean;
  database: boolean;
  llm: boolean;
}

export interface HistoryItem {
  _id: string;
  content: string;
  createdAt: string;
}
