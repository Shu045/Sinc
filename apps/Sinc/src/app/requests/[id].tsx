import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { RequestTypeBadge } from "@/components/requests/RequestTypeBadge";
import { requests } from "@/data/mock";

export default function RequestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const request = requests.find((item) => item.id === id);

  if (!request) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-zinc-400">Request not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerClassName="px-5 pb-10 pt-16">
        {/* Back */}
        <Pressable onPress={() => router.back()} className="mb-8">
          <Text className="text-sm text-zinc-500">← Back</Text>
        </Pressable>

        {/* Agent */}
        <View className="mb-6 flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
            <Text className="text-lg font-semibold text-zinc-200">
              {request.agentName.charAt(0)}
            </Text>
          </View>

          <View>
            <Text className="font-semibold text-zinc-200">
              {request.agentName}
            </Text>

            <Text className="mt-1 text-xs text-zinc-600">
              {request.createdAt}
            </Text>
          </View>
        </View>

        {/* Request */}
        <Card className="rounded-3xl p-5">
          <RequestTypeBadge type={request.type} />

          <Text className="mt-5 text-2xl font-semibold tracking-tight text-white">
            {request.title}
          </Text>

          <Text className="mt-4 text-base leading-7 text-zinc-400">
            {request.message}
          </Text>
        </Card>

        {/* Response */}
        <Text className="mb-3 mt-8 text-sm font-semibold text-zinc-300">
          Your response
        </Text>

        <Card className="min-h-32 rounded-2xl p-4">
          <Text className="text-sm text-zinc-700">Write your response...</Text>
        </Card>

        {/* Actions */}
        <View className="mt-4 flex-row gap-3">
          <Pressable
            onPress={() => router.back()}
            className="flex-1 items-center rounded-xl border border-zinc-800 py-4 active:opacity-70"
          >
            <Text className="font-medium text-zinc-400">Dismiss</Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            className="flex-1 items-center rounded-xl bg-white py-4 active:opacity-70"
          >
            <Text className="font-semibold text-black">Respond</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
