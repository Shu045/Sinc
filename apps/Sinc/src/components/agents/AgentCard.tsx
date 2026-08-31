import { Pressable, Text, View } from "react-native";
import type { Agent } from "@/types";
import { StatusDot } from "@/components/ui/StatusDot";

type Props = {
  agent: Agent;
  onPress: () => void;
};

export function AgentCard({ agent, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="mb-3 active:opacity-70">
      <View className="flex-row items-center rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
          <Text className="font-semibold text-zinc-200">{agent.icon}</Text>
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-zinc-100">{agent.name}</Text>

          <Text className="mt-1 text-xs text-zinc-500">
            {agent.description}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <StatusDot online={agent.connected} />

          <Text className="text-xs text-zinc-500">
            {agent.connected ? "Connected" : "Offline"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
