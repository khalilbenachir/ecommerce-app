import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;
    const body = await req.json();
    const { imageUrl, label } = body;

    if (!userId) return new NextResponse("unAuthentificated", { status: 401 });

    if (!label) return new NextResponse("Name is required", { status: 400 });

    if (!imageUrl) return new NextResponse("Name is required", { status: 400 });

    if (!storeId) return new NextResponse("UnAuthorized", { status: 403 });

    if (!billboardId)
      return new NextResponse("billboard id is required", { status: 400 });

    const billboad = await prismaDb.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        imageUrl,
        label,
      },
    });
    return NextResponse.json(billboad);
  } catch (error) {
    console.log("[PATCH_BILLBOARD]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;

    if (!userId) return new NextResponse("unAuthenticated", { status: 401 });

    if (!storeId) return new NextResponse("unAuthorized", { status: 403 });

    if (!billboardId)
      return new NextResponse("billboard id is required", { status: 400 });

    const billboad = await prismaDb.billboard.deleteMany({
      where: {
        id: billboardId,
        storeId,
      },
    });
    return NextResponse.json(billboad);
  } catch (error) {
    console.log("[DELETE_BILLBOARD]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
