export type ChatMessageRating = -1 | 0 | 1;

export type ChatPosition = "left" | "right";

export type ChatReported = 1 | 0;

export type ChatMessage = {
  id: string;
  sender: string;
  content: string;
  position: ChatPosition;
  rating?: ChatMessageRating;
  rateable?: boolean;
  regeneratable?: boolean;
  reportable?: boolean;
  avatarUrl?: string;
  created_at?: string;
};

export type Message = {
  token?: string;
  id: string;
  role: string;
  content: string;
  conversation_id: string;
  created_at: string;
  updated_at: string;
};

export type MessagesResponse = {
  data: {
    data: Message[];
  };
};
