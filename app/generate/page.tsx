"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import ReactMarkdown from 'react-markdown';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default function page() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log(data.result);
      setOutput(data.result);
      setPrompt("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="flex flex-col my-10 gap-4 items-start justify-center text-left">
        <h1 className="text-xs text-center lg:text-xl dark:text-zinc-300 text-zinc-800 flex items-center justify-center gap-2">
          Generate code, ask questions, search and more <BsStars size="18" className="text-cyan-500" />
        </h1>
        <Textarea
          required
          placeholder="Enter a prompt to generate"
          className="w-full"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          onClick={handleGenerate}
          disabled={loading || prompt.length === 0}
          variant="default" className="w-full">
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>
      <div>
        {
          loading && (
            <div className="text-center my-10">
              <Loader2 className="mx-auto animate-spin" />
            </div>
          )
        }
        {
          output && (
            <div className="my-10">
              <MdPreview theme="dark" editorId={"preview-only"} modelValue={output} language="en-US" />
            </div>
          )
        }
      </div>
    </section>
  )
}
