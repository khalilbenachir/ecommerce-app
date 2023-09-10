import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("unauthorized", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });
    const store = await prismaDb.stores.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[POST_STORES]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
