"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatContent from "./ChatContent";

const queryClient = new QueryClient();

export default function ChatPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatContent />
    </QueryClientProvider>
  );
}
