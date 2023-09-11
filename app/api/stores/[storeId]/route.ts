import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("unauthorized", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const store = await prismaDb.stores.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[PATCH_STORE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    if (!userId) return new NextResponse("unauthorized", { status: 401 });

    if (!storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const store = await prismaDb.stores.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[DELETE_STORE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
