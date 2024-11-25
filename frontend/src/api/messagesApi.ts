"use client";

import client from "./backend-client";

export const fetchMessages = async (chatId: string) => {
  const res = await client.GET(`/conversations/${chatId}/messages`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      query: {
        limit: 10,
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
        limit: 20,
      },
    },
  });
  return res;
};
