import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { StatusDot } from "@/components/ui/StatusDot";
import { RequestCard } from "@/components/requests/RequestCard";
import { requests } from "@/data/mock";

export default function Home() {
  const pendingRequests = requests.filter(
    (request) => request.status === "pending",
  );

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-12 pt-16"
      >
        {/* Header */}
        <View className="mb-8 flex-row items-start justify-between">
          <View>
            <Text className="text-3xl font-bold tracking-tight text-white">
              sinc
            </Text>

            <Text className="mt-1 text-xs text-zinc-500">
              Your agents are waiting for you.
            </Text>
          </View>

          <View className="flex-row items-center gap-2 pt-2">
            <StatusDot />
            <Text className="text-xs text-zinc-500">Connected</Text>
          </View>
        </View>

        {/* Hero */}
        <Card className="mb-8 rounded-3xl p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="mb-2 text-[10px] font-bold tracking-[2px] text-zinc-600">
                SINC MCP
              </Text>

              <Text className="text-2xl font-semibold tracking-tight text-white">
                {pendingRequests.length === 0
                  ? "All clear."
                  : `${pendingRequests.length} thing${
                      pendingRequests.length === 1 ? "" : "s"
                    } need you.`}
              </Text>
            </View>

            <View className="h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
              <View className="h-3 w-3 rounded-full bg-emerald-400" />
            </View>
          </View>

          <Text className="mt-4 text-sm leading-5 text-zinc-500">
            Sinc lets your AI agents reach you when they need a decision,
            instruction, or permission.
          </Text>

          <View className="mt-5 flex-row items-center">
            <StatusDot />

            <Text className="ml-2 text-[11px] text-zinc-600">
              MCP endpoint is listening
            </Text>
          </View>
        </Card>

        {/* Requests header */}
        <View className="mb-4 flex-row items-center">
          <Text className="text-base font-semibold text-zinc-200">
            Needs your attention
          </Text>

          <Text className="ml-2 text-xs text-zinc-600">
            {pendingRequests.length}
          </Text>
        </View>

        {/* Requests */}
        {pendingRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onPress={() => router.push(`/requests/${request.id}`)}
          />
        ))}

        {/* Agents */}
        <View className="mb-4 mt-8 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-zinc-200">
            Connected agents
          </Text>

          <Text
            onPress={() => router.push("/agents")}
            className="text-xs text-zinc-500"
          >
            View all
          </Text>
        </View>

        <Card className="p-4">
          <View className="flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
              <Text className="font-semibold text-zinc-200">C</Text>
            </View>

            <View className="flex-1">
              <Text className="text-sm font-semibold text-zinc-200">
                Claude Code
              </Text>

              <Text className="mt-1 text-xs text-zinc-600">
                Last activity just now
              </Text>
            </View>

            <StatusDot />
          </View>
        </Card>

        {/* MCP explanation */}
        <Text className="mb-4 mt-8 text-base font-semibold text-zinc-200">
          The Sinc workflow
        </Text>

        <Card className="p-5">
          <WorkflowStep
            number="01"
            title="Agent gets stuck"
            description="Your agent needs information or permission."
          />

          <WorkflowLine />

          <WorkflowStep
            number="02"
            title="Sinc notifies you"
            description="The Sinc MCP sends the request to your device."
          />

          <WorkflowLine />

          <WorkflowStep
            number="03"
            title="You respond"
            description="Your response goes straight back to the agent."
          />
        </Card>
      </ScrollView>
    </View>
  );
}

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row items-center">
      <View className="mr-4 h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
        <Text className="text-[10px] font-bold text-zinc-500">{number}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold text-zinc-200">{title}</Text>

        <Text className="mt-1 text-xs leading-4 text-zinc-600">
          {description}
        </Text>
      </View>
    </View>
  );
}

function WorkflowLine() {
  return <View className="ml-[17px] h-6 w-px bg-zinc-800" />;
}
