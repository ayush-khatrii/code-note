"use server"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/prisma/client";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <section className="px-5 lg:px-0">
      <Link href="/note/add-note">
        <Button variant="default">
          Add  note
        </Button>
      </Link>
      <div className="my-20">
        {notes.length === 0 && (
          <div>
            <p>No notes found</p>
          </div>
        )}
        {
          notes.map((note) => (
            <Card className="my-5 border border-zinc-800">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-center text-center">
                    <h1 className="text-base">{note.title}</h1>
                    <span className="cursor-pointer">
                      <Trash2Icon className="size-5 sm:size-6" />
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm lg:text-base">
                {note.content}
              </CardContent>
            </Card>
          ))
        }
      </div>
    </section >
  )
}
