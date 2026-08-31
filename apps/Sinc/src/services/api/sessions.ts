import { api } from "@/lib/api";

export type AgentSession = {
  id: string;
  agentId: string;
  createdAt: string;
  endedAt: string | null;
};

export async function getSessions(
  agentId: string,
): Promise<AgentSession[]> {
  const { data } = await api.get<AgentSession[]>(
    `/api/agents/${agentId}/sessions`,
  );

  return data;
}

export async function createSession(
  agentId: string,
): Promise<AgentSession> {
  const { data } = await api.post<AgentSession>(
    `/api/agents/${agentId}/sessions`,
  );

  return data;
}
