import type { NotificationPayload, NotificationProvider } from "./types";

export class NotificationService {
  constructor(private provider: NotificationProvider) {}

  async send(payload: NotificationPayload) {
    return this.provider.send(payload);
  }
}
