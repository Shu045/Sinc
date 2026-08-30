import type { Agent, AgentRequest } from "@/types";

export const agents: Agent[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic coding agent",
    icon: "C",
    connected: true,
  },
  {
    id: "research-agent",
    name: "Research Agent",
    description: "Research and browsing agent",
    icon: "R",
    connected: true,
  },
  {
    id: "coding-agent",
    name: "Coding Agent",
    description: "Development workflow agent",
    icon: "⌘",
    connected: false,
  },
];

export const requests: AgentRequest[] = [
  {
    id: "req_1",
    agentId: "claude-code",
    agentName: "Claude Code",
    title: "I need your decision",
    message:
      "I found two possible approaches for the authentication flow. Which one should I use?",
    type: "question",
    status: "pending",
    createdAt: "Just now",
  },
  {
    id: "req_2",
    agentId: "coding-agent",
    agentName: "Coding Agent",
    title: "Permission required",
    message:
      "Allow me to create and modify files inside the project directory?",
    type: "approval",
    status: "pending",
    createdAt: "2 min ago",
  },
  {
    id: "req_3",
    agentId: "research-agent",
    agentName: "Research Agent",
    title: "Instruction needed",
    message:
      "Should I prioritize official documentation or community discussions?",
    type: "instruction",
    status: "pending",
    createdAt: "8 min ago",
  },
];
