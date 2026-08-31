import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { answerQuestion, type AgentEvent } from "@/services/api/events";

type Props = {
  event: AgentEvent;
  sessionId: string;
  onAnswered: () => void;
};

export default function QuestionCard({ event, sessionId, onAnswered }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = String(event.data.question ?? "The agent needs your input.");

  const options = Array.isArray(event.data.options)
    ? event.data.options.map(String)
    : ["Allow", "Deny"];

  async function answer(value: string) {
    try {
      setLoading(true);
      setError(null);

      await answerQuestion(sessionId, event.id, value);

      onAnswered();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to send your answer.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="overflow-hidden rounded-3xl border border-amber-400/20 bg-amber-400/[0.05]">
      <View className="p-5">
        <View className="mb-4 flex-row items-center">
          <View className="mr-2 h-2 w-2 rounded-full bg-amber-400" />

          <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-amber-400">
            Needs your attention
          </Text>
        </View>

        <Text className="text-xl font-semibold leading-7 text-white">
          {question}
        </Text>

        <Text className="mt-2 text-sm leading-5 text-zinc-500">
          Your agent is waiting for you before continuing.
        </Text>

        {error && (
          <View className="mt-4 rounded-xl bg-red-500/10 p-3">
            <Text className="text-sm text-red-400">{error}</Text>
          </View>
        )}
      </View>

      <View className="flex-row border-t border-amber-400/10 p-3">
        {options.map((option) => (
          <Pressable
            key={option}
            disabled={loading}
            onPress={() => answer(option)}
            className="mr-2 flex-1 items-center rounded-2xl bg-white py-3.5 active:opacity-70"
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text className="font-semibold text-black">{option}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
