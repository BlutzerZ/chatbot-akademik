import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

export async function logout() {
  // const response = NextResponse.json({message: "Logged out successfully"});

  (await cookies()).delete("token");

  // return response;
}

export default logout();
