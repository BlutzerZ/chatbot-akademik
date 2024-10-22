"use client";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import ChatViewsBrowser from "./views/ChatViewsBrowser";
import ChatViewsMobile from "./views/ChatViewsMobile";

export default function ChatPage() {
  const isMobile = useDeviceDetect();
  return <>{isMobile ? <ChatViewsMobile /> : <ChatViewsBrowser />}</>;
}
