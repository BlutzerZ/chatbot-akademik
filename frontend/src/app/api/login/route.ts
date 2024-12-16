// import { NextApiResponse } from "next"
import client from "../../../api/backend-client";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const result = await client.POST("/auth/sign-in", {
      body: { username, password },
    });

    if (!result.error) {
      const token = result.data.data.token;
      const cookiesStore = await cookies();

      cookiesStore.set("token", token);

      return new Response(
        JSON.stringify({ message: "Login successful", token }),
        { status: 200 },
      );
    } else {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
}
