"use client";

import client from "./backend-client";

export const fetchMessages = async (conversation_id: string) => {
  const res = await client.GET(`/conversations/${conversation_id}/inquire`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      query: {
        conversation_id: conversation_id,
      },
    },
  });

  return res;
};

export const fetchConversations = async () => {
  const res = await client.GET("/conversations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      query: {
        limit: 30,
      },
    },
  });
  return res;
};
