import prisma from "@/prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const currentLoggedInUser = await currentUser();
    if (!currentLoggedInUser) {
      return NextResponse.json(
        { error: "Please login to create a note" },
        { status: 404 }
      );
    }
    const { userId } = auth();
    console.log("userId from auth clerk : ", userId);
    const body = await request.json();
    const { title, content } = body;

    console.log(title, content);

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId as string,
      }
    });
    console.log("user (from add-note api) : ", user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        User: {
          connect: {
            clerkId: user?.clerkId,
          }
        }
      },
    });

    console.log("user (from add-note api) : ", user);

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