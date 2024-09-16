import { NextResponse } from "next/server";

export async function GET() {
  const data = { message: "Hello, this is your test JSON response" };

  return NextResponse.json(data);
}

// OR THIS
// export const revalidate = 60

// export async function GET() {
//   let data = await fetch('https://api.vercel.app/blog')
//   let posts = await data.json()

//   return Response.json(posts)
// }
