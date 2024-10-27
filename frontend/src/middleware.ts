import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest){
      // const token = req.cookies.get("token");
      // const cookieStore = await cookies();
      // const token = cookieStore.get('token');
      // if(token){
      //       return NextResponse.next();
      // }
      // else{
      //       return NextResponse.redirect(new URL("/", req.url));
      // }
}

export const config = {
      matcher: ['/chat/:path*']
}