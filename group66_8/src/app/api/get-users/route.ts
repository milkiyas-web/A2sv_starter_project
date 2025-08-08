// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(Options);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";

  const backendRes = await fetch(
    `$https://a2sv-application-platform-backend-team8.onrender.com/cycles/admin/users?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
