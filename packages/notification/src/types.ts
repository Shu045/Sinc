export type NotificationPayload = {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
};

export interface NotificationProvider {
  send(payload: NotificationPayload): Promise<void>;
}
