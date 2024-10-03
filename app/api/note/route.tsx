import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body;
    const note = await prisma.note.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    const note = await prisma.note.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
} 