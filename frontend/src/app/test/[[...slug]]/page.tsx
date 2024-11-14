"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ChatPage from "./ChatPage";

const queryClient = new QueryClient();

export default function TestPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatPage />
    </QueryClientProvider>
  );
}
