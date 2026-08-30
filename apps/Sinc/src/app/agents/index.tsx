import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { AgentCard } from "@/components/agents/AgentCard";
import { agents } from "@/data/mock";

export default function Agents() {
  return (
    <View className="flex-1 bg-black">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-10 pt-16"
      >
        <Text className="text-3xl font-bold tracking-tight text-white">
          Agents
        </Text>

        <Text className="mb-8 mt-1 text-xs text-zinc-500">
          Manage the agents connected to Sinc.
        </Text>

        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onPress={() =>
              router.push(`/agents/${agent.id}`)
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}
