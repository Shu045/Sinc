import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:3000",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        return Promise.reject(
          new Error("The server took too long to respond."),
        );
      }

      if (!error.response) {
        return Promise.reject(
          new Error(
            "Unable to connect to Sinc. Check that your server is running.",
          ),
        );
      }

      const message =
        error.response.data?.error ??
        error.response.data?.message ??
        `Request failed (${error.response.status})`;

      return Promise.reject(new Error(message));
    }

    return Promise.reject(
      error instanceof Error ? error : new Error("Something went wrong."),
    );
  },
);
