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
  createdAt?: Date;
};
