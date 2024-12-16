"use client";

import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CallbackPage: React.FC = () => {
  const searchParams = useSearchParams();
  const access_token = searchParams.get("access_token");
  const router = useRouter();

  // console.log(access_token);

  useEffect(() => {
    const storeToken = async () => {
      if (access_token) {
        localStorage.setItem("token", access_token as string);
        try {
          const response = await fetch("/api/set-cookie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: access_token }),
          });

          if (response.ok) {
            console.log("Token stored successfully");
            router.push("/chat/new");
          } else {
            console.error("Token not stored");
          }
        } catch (error) {
          console.error("Token not stored ", error);
        }
      }
    };

    storeToken();
  }, [access_token, router]);

  return <Loading />;
};

export default CallbackPage;
