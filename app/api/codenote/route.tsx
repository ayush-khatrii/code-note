import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language } = body;
    const note = await prisma.codenote.create({
      data: {
        code,
        language,
      },
    });
    return NextResponse.json(code, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}