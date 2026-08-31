import { api } from "@/lib/api";

export type Agent = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export async function getAgents(): Promise<Agent[]> {
  const { data } = await api.get<Agent[]>("/api/agents");

  return data;
}

export async function createAgent(name: string): Promise<Agent> {
  const { data } = await api.post<Agent>("/api/agents", {
    name,
  });

  return data;
}
