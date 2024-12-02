"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CallbackPage: React.FC = () => {
  const searchParams = useSearchParams();
  const access_token = searchParams.get("access_token");
  const router = useRouter();

  localStorage.setItem("token", access_token as string);

  console.log(access_token);

  useEffect(() => {
    if (access_token) {
      console.log("Access token:", access_token);
      router.push("/chat/new");
    }
  }, [access_token, router]);

  return (
    <div className="">
      <h1>Memproses Login...</h1>
    </div>
  );
};

export default CallbackPage;
