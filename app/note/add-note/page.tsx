"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      setLoading(true);
      await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      setTitle("");
      setContent("");
      router.push("/note");
      router.refresh();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="px-5 lg:px-0">
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add note"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full">
          {
            loading &&
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          }
          Add Note
        </Button>
      </form>
    </section>
  )
}
