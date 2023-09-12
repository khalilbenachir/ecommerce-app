import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("unAuthenticated", { status: 401 });

    if (!label) return new NextResponse("Label is required", { status: 400 });

    if (!imageUrl)
      return new NextResponse("image is required", { status: 400 });

    const store = await prismaDb.billboard.findMany({
      where: {
        id: params.storeId,
      },
    });

    if (!store) return new NextResponse("unAuthorized", { status: 403 });

    const billboard = await prismaDb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[POST_BILLBOARD]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    const billboard = await prismaDb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[GET_BILLBOARD]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
