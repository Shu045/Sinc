import { Pressable, Text, View } from "react-native";
import type { AgentRequest } from "@/types";
import { RequestTypeBadge } from "./RequestTypeBadge";

type Props = {
  request: AgentRequest;
  onPress: () => void;
};

export function RequestCard({ request, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 active:opacity-70"
    >
      <View className="flex-row items-center rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        {/* Agent icon */}
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
          <Text className="text-base font-semibold text-zinc-200">
            {request.agentName.charAt(0)}
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          <View className="mb-1 flex-row items-center justify-between">
            <Text className="text-xs font-medium text-zinc-400">
              {request.agentName}
            </Text>

            <Text className="text-[10px] text-zinc-600">
              {request.createdAt}
            </Text>
          </View>

          <Text className="mb-1 text-sm font-semibold text-zinc-100">
            {request.title}
          </Text>

          <Text
            numberOfLines={2}
            className="text-xs leading-5 text-zinc-500"
          >
            {request.message}
          </Text>

          <View className="mt-3">
            <RequestTypeBadge type={request.type} />
          </View>
        </View>

        <Text className="ml-3 text-2xl text-zinc-600">›</Text>
      </View>
    </Pressable>
  );
}
