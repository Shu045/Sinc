import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { StatusDot } from "@/components/ui/StatusDot";
import { agents } from "@/data/mock";

export default function AgentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const agent = agents.find((item) => item.id === id);

  if (!agent) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-zinc-400">
          Agent not found.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        contentContainerClassName="px-5 pb-10 pt-16"
      >
        <Pressable
          onPress={() => router.back()}
          className="mb-8"
        >
          <Text className="text-sm text-zinc-500">
            ← Back
          </Text>
        </Pressable>

        <View className="items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-3xl bg-zinc-800">
            <Text className="text-2xl font-semibold text-zinc-200">
              {agent.icon}
            </Text>
          </View>

          <Text className="text-2xl font-semibold text-white">
            {agent.name}
          </Text>

          <View className="mt-2 flex-row items-center gap-2">
            <StatusDot online={agent.connected} />

            <Text className="text-xs text-zinc-500">
              {agent.connected ? "Connected" : "Offline"}
            </Text>
          </View>
        </View>

        <Card className="mt-8 p-5">
          <Text className="mb-2 text-[10px] font-bold tracking-widest text-zinc-600">
            CONNECTION
          </Text>

          <Text className="text-sm text-zinc-400">
            This agent can use the Sinc MCP to request
            information and permissions from you.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}
