import ActivityCard from "@/components/ActivityCard";
import AgentHeader from "@/components/AgentHeader";
import QuestionCard from "@/components/QuestionCard";
import { AgentEvent, getEvents } from "@/services/api/events";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

const SESSION_ID = "cmtien2fw0000flex0i2y9umd";

export default function Home() {
  const [events, setEvents] = useState<AgentEvent[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setError(null);

      const data = await getEvents(SESSION_ID);

      setEvents(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load agent activity.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    await loadEvents();

    setRefreshing(false);
  }, [loadEvents]);

  useEffect(() => {
    loadEvents();

    const interval = setInterval(loadEvents, 3000);

    return () => clearInterval(interval);
  }, [loadEvents]);

  const latestEvent = events.at(-1);

  const pendingQuestion = [...events]
    .reverse()
    .find((event) => event.type === "QUESTION" && !event.data.answered);

  const isActive =
    latestEvent?.type === "TOOL_CALL" || latestEvent?.type === "MESSAGE";

  return (
    <View className="flex-1 bg-[#0A0A0B]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-10 pt-16"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#ffffff"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <AgentHeader active={isActive} />
        {/* Error */}
        {error && (
          <View className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-4">
            <View className="flex-row">
              <Text className="mr-3 text-base">!</Text>

              <View className="flex-1">
                <Text className="font-medium text-red-400">
                  Couldn't connect
                </Text>

                <Text className="mt-1 text-sm leading-5 text-zinc-500">
                  {error}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Current activity */}
        <View className="mt-8">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[13px] font-medium uppercase tracking-[1.5px] text-zinc-500">
              Current activity
            </Text>

            {isActive && (
              <View className="flex-row items-center">
                <View className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <Text className="text-xs font-medium text-emerald-400">
                  LIVE
                </Text>
              </View>
            )}
          </View>

          <View className="rounded-3xl border border-white/[0.07] bg-[#111113] p-5">
            {loading ? (
              <View className="items-center py-8">
                <ActivityIndicator color="#71717A" />
              </View>
            ) : latestEvent ? (
              <>
                <Text className="text-xl font-semibold leading-7 text-white">
                  {getEventTitle(latestEvent)}
                </Text>

                <Text className="mt-2 text-sm leading-6 text-zinc-500">
                  {getEventDescription(latestEvent)}
                </Text>
              </>
            ) : (
              <>
                <Text className="text-xl font-semibold text-white">
                  Waiting for your agent
                </Text>

                <Text className="mt-2 text-sm leading-6 text-zinc-500">
                  Activity from your laptop will appear here.
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Question */}
        {pendingQuestion && (
          <View className="mt-6">
            <QuestionCard
              event={pendingQuestion}
              sessionId={SESSION_ID}
              onAnswered={loadEvents}
            />
          </View>
        )}

        {/* Activity */}
        <View className="mt-8">
          <Text className="mb-3 text-[13px] font-medium uppercase tracking-[1.5px] text-zinc-500">
            Activity
          </Text>

          {loading ? (
            <View className="items-center py-10">
              <ActivityIndicator color="#52525B" />
            </View>
          ) : events.length === 0 ? (
            <View className="rounded-3xl border border-white/[0.06] bg-[#111113] px-5 py-8">
              <Text className="text-center text-sm text-zinc-600">
                No activity yet
              </Text>
            </View>
          ) : (
            <View className="gap-3">
              {[...events].reverse().map((event) => (
                <ActivityCard key={event.id} event={event} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function getEventTitle(event: AgentEvent) {
  switch (event.type) {
    case "MESSAGE":
      return String(event.data.text ?? "Agent sent a message");

    case "TOOL_CALL":
      return `Using ${String(event.data.tool ?? "a tool")}`;

    case "TOOL_RESULT":
      return "Tool completed";

    case "QUESTION":
      return String(event.data.question ?? "The agent needs your input");

    case "ERROR":
      return "Something went wrong";

    default:
      return "Agent activity";
  }
}

function getEventDescription(event: AgentEvent) {
  switch (event.type) {
    case "TOOL_CALL":
      return "Your agent is working on your laptop.";

    case "TOOL_RESULT":
      return "The agent finished using a tool.";

    case "QUESTION":
      return "Your agent is waiting for your response.";

    case "ERROR":
      return String(event.data.message ?? "An error occurred.");

    default:
      return "Your agent is currently working.";
  }
}
