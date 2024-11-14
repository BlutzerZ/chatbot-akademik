"use server";

import client from "@/api/backend-client";
import { cookies } from "next/headers";
import { useRouter } from "next/router";
// import { useState } from "react"

export const useSignIn = () => {
  const router = useRouter();

  const handleSignIn = async (username: string, password: string) => {
    const cookieStore = await cookies();
    const result = await client.POST("/auth/sign-in", {
      body: {
        username,
        password,
      },
    });

    if (!result.error) {
      const token = result.data.data.token;
      cookieStore.set("token", token);
      router.push("/chat/new");
    }
  };

  return { handleSignIn };
};

export default useSignIn;
