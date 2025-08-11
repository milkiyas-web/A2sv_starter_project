import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { Options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  const session = await getServerSession(Options);

  if (!session || !token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const session = await getServerSession(Options);

  if (!session || !token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
