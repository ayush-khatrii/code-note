'use client';
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyIcon, EditIcon, Share2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { codenote } from "@prisma/client";

const CodeHighlighter = ({ note }: { note: codenote }) => {
  const [copied, setCopied] = useState(false);

  const handleDelete = async () => {
    // Delete logic here
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section>
      <Card key={note.id} className="my-5 border border-zinc-800">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center text-center">
              <h1 className="lg:text-xl text-base dark:text-zinc-300 text-gray-800">{note.title}</h1>
              <div className="cursor-pointer flex items-center justify-center text-center gap-3 mb-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="border" onClick={handleDelete} size="icon">
                        <Trash2Icon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <EditIcon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2Icon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-zinc-900 pt-3 rounded">
            <div className="flex justify-between items-center px-5">
              <div className="flex  items-center text-center justify-center gap-1">
                <span className="p-1 bg-red-400 rounded-full">
                </span>
                <span className="p-1 bg-yellow-400 rounded-full">
                </span>
                <span className="p-1 bg-green-400 rounded-full">
                </span>
              </div>

              <h1 className="lg:text-base text-xs text-gray-800 dark:text-gray-300">{note.language}</h1>
              <span className="cursor-pointer">
                {copied ? (
                  <p className="lg:text-sm text-xs text-zinc-200 dark:text-zinc-500">Copied!!</p>
                ) : (
                  <CopyIcon onClick={() => handleCopy(note.code)} size="15" className="text-gray-200 dark:text-gray-500" />
                )}
              </span>
            </div>
            <SyntaxHighlighter customStyle={{ padding: "25px" }} language={note.language} style={oneDark}>
              {note.code}
            </SyntaxHighlighter>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CodeHighlighter;
