import prisma from "@/prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const currentLoggedInUser = await currentUser();
    if (!currentLoggedInUser) {
      return NextResponse.json(
        { error: "Please login to create a code note" },
        { status: 404 }
      );
    }
    const { userId } = auth();
    const body = await request.json();
    const { code, title, language } = body;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId as string,
      }
    });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const codeNote = await prisma.codenote.create({
      data: {
        title,
        code,
        language,
        User: {
          connect: {
            id: user?.id,
          }
        }
      },
    });
    return NextResponse.json(codeNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}