import { Text, View } from "react-native";

type EventType =
  "MESSAGE" | "TOOL_CALL" | "TOOL_RESULT" | "QUESTION" | "ANSWER" | "ERROR";

type AgentEvent = {
  id: string;
  type: EventType;
  data: Record<string, unknown>;
  createdAt: string;
};

type Props = {
  event: AgentEvent;
};

export default function ActivityCard({ event }: Props) {
  const config = getConfig(event.type);

  return (
    <View className="flex-row rounded-2xl border border-white/[0.05] bg-[#111113] p-4">
      <View
        className={`mr-3 h-9 w-9 items-center justify-center rounded-xl ${config.background}`}
      >
        <Text className="text-sm">{config.icon}</Text>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-[13px] font-medium text-zinc-400">
            {config.label}
          </Text>

          <Text className="text-[11px] text-zinc-700">
            {formatTime(event.createdAt)}
          </Text>
        </View>

        <Text
          numberOfLines={3}
          className="mt-1 text-sm leading-5 text-zinc-300"
        >
          {getText(event)}
        </Text>
      </View>
    </View>
  );
}

function getText(event: AgentEvent) {
  switch (event.type) {
    case "MESSAGE":
      return String(event.data.text ?? "");

    case "TOOL_CALL":
      return String(
        event.data.tool ? `Called ${event.data.tool}` : "Called a tool",
      );

    case "TOOL_RESULT":
      return "Tool returned a result";

    case "QUESTION":
      return String(event.data.question ?? "");

    case "ANSWER":
      return String(event.data.answer ?? "");

    case "ERROR":
      return String(event.data.message ?? "Unknown error");

    default:
      return "";
  }
}

function getConfig(type: EventType) {
  switch (type) {
    case "TOOL_CALL":
      return {
        icon: "⌘",
        label: "TOOL",
        background: "bg-white/[0.06]",
      };

    case "TOOL_RESULT":
      return {
        icon: "✓",
        label: "RESULT",
        background: "bg-emerald-500/10",
      };

    case "QUESTION":
      return {
        icon: "?",
        label: "QUESTION",
        background: "bg-amber-500/10",
      };

    case "ERROR":
      return {
        icon: "!",
        label: "ERROR",
        background: "bg-red-500/10",
      };

    default:
      return {
        icon: "✦",
        label: "AGENT",
        background: "bg-white/[0.06]",
      };
  }
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
