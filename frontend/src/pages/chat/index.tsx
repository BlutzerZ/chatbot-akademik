import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import ChatViewsBrowser from "@/pages/chat/views/ChatViewsBrowser";
import ChatViewsMobile from "@/pages/chat/views/ChatViewsMobile";

export default function ChatPage() {
      const isMobile = useDeviceDetect();
      return (
            <>
                  {isMobile ? <ChatViewsMobile /> : <ChatViewsBrowser />}
            </>
      );
}
