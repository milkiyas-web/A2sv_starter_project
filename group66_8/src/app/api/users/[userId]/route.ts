import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { Options } from "../../auth/[...nextauth]/options";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const token = await getToken({ req });
  const session = await getServerSession(Options);

  if (!session || !token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await context.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}`,
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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const token = await getToken({ req });
  const session = await getServerSession(Options);

  if (!session || !token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await context.params;
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const token = await getToken({ req });
  const session = await getServerSession(Options);

  if (!session || !token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await context.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
