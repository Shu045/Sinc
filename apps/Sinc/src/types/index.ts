export type RequestType = "question" | "approval" | "instruction";

export type RequestStatus = "pending" | "resolved" | "dismissed";

export type Agent = {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
};

export type AgentRequest = {
  id: string;
  agentId: string;
  agentName: string;
  title: string;
  message: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: string;
};
