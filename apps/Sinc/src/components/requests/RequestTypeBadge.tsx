import { Text, View } from "react-native";
import type { RequestType } from "@/types";

const config: Record<
  RequestType,
  {
    label: string;
    className: string;
  }
> = {
  question: {
    label: "QUESTION",
    className: "bg-blue-500/10",
  },
  approval: {
    label: "APPROVAL",
    className: "bg-amber-500/10",
  },
  instruction: {
    label: "INSTRUCTION",
    className: "bg-purple-500/10",
  },
};

export function RequestTypeBadge({
  type,
}: {
  type: RequestType;
}) {
  const item = config[type];

  return (
    <View className={`rounded-md px-2 py-1 ${item.className}`}>
      <Text className="text-[9px] font-bold tracking-widest text-zinc-400">
        {item.label}
      </Text>
    </View>
  );
}
