"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatPageLayout from "./ChatPageLayout";

const queryClient = new QueryClient();

export default function ChatPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatPageLayout />
    </QueryClientProvider>
  );
}
