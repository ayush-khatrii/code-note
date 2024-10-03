"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { languageOptions } from "@/constants"
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react";
import { routeros } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useRouter } from "next/navigation";

interface Language {
  name: string
  value: string
}

export default function Page() {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await fetch("/api/codenote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });
      setCode("");
      router.push("/codenote");
      router.refresh();
    } catch (error) {
      console.error("Error submitting code note", error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (value: string) => {
    setLanguage(value);
  }

  return (
    <section className="px-5 lg:px-0">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-zinc-400"
          placeholder="Add code snippet"
        />
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-full border border-zinc-400 mt-3">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          disabled={loading}
          variant="default" type="submit" className="w-full mt-3">
          {
            loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null
          } Add Code Note
        </Button>
      </form>
    </section>
  )
}
