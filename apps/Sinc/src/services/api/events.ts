import { api } from "@/lib/api";

export type EventType =
  "MESSAGE" | "TOOL_CALL" | "TOOL_RESULT" | "QUESTION" | "ANSWER" | "ERROR";

export type AgentEvent = {
  id: string;
  sessionId: string;
  type: EventType;
  data: Record<string, unknown>;
  createdAt: string;
};

export async function getEvents(sessionId: string): Promise<AgentEvent[]> {
  const { data } = await api.get<AgentEvent[]>(
    `/api/sessions/${sessionId}/events`,
  );

  return data;
}

export async function answerQuestion(
  sessionId: string,
  questionId: string,
  answer: string,
) {
  const { data } = await api.post(
    `/api/sessions/${sessionId}/questions/${questionId}/answer`,
    {
      answer,
    },
  );

  return data;
}
