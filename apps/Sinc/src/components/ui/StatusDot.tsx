import { View } from "react-native";

type Props = {
  online?: boolean;
};

export function StatusDot({ online = true }: Props) {
  return (
    <View
      className={`h-2 w-2 rounded-full ${
        online ? "bg-emerald-400" : "bg-red-400"
      }`}
    />
  );
}
