import { Text, View } from "react-native";

type Props = {
  active: boolean;
};

export default  function AgentHeader({ active }: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-white">
          <Text className="text-lg font-bold text-black">S</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-white">Sinc</Text>

          <Text className="mt-0.5 text-xs text-zinc-500">
            Your laptop, at a glance
          </Text>
        </View>
      </View>

      <View className="flex-row items-center rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-2">
        <View
          className={`mr-2 h-2 w-2 rounded-full ${
            active ? "bg-emerald-400" : "bg-zinc-600"
          }`}
        />

        <Text
          className={`text-xs font-medium ${
            active ? "text-emerald-400" : "text-zinc-500"
          }`}
        >
          {active ? "Active" : "Idle"}
        </Text>
      </View>
    </View>
  );
}
