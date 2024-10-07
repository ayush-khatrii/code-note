import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/prisma/client";
import CodeHighlighter from "@/components/CodeHighlighter";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const { userId } = auth();

  const codeNote = await prisma.codenote.findMany({
    where: {
      User: {
        clerkId: userId as string,
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="px-5 lg:px-0">
      <div>
        <Link href="/codenote/add-code-note">
          <Button>
            Add code note
          </Button>
        </Link>

      </div>
      {codeNote.length === 0 && (
        <div className="my-20">
          <p>No coding notes found</p>
        </div>
      )}
      {codeNote.map((note) => (
        <CodeHighlighter key={note.id} note={note} />
      ))}
    </section>
  )
}