export type ChatMessageRating = -1 | 0 | 1;

export type ChatPosition = "left" | "right";

export type ChatMessage = {
  id: string;
  sender: string;
  content: string;
  position: ChatPosition;
  rating?: ChatMessageRating;
  rateable?: boolean;
  regeneratable?: boolean;
  avatarUrl?: string;
  createdAt?: Date;
};
