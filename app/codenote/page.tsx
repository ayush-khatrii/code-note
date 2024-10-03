import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/prisma/client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default async function page() {
  const codeNote = await prisma.codenote.findMany({
    orderBy: { createdAt: "desc", },
  })

  return (
    <section className="px-5">
      <div>
        <Link href="/codenote/add-code-note">
          <Button>
            Add code note
          </Button>
        </Link>
      </div>
      {codeNote.map((note) => (
        <CodeHighlighter key={note.id} note={note} />
      ))}
    </section>
  )
}