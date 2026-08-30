import { View, type ViewProps } from "react-native";

export function Card({ className = "", ...props }: ViewProps) {
  return (
    <View
      className={`rounded-2xl border border-zinc-800 bg-zinc-950 ${className}`}
      {...props}
    />
  );
}
