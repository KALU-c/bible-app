import { BookItemType } from "@/assets/book/formatted-json";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LocalStorageBookObject } from "@/types/book-type";
import { VerseType } from "@/types/verse-type";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

// NOTE - this should be global, not only for copying verse
type CopyToClipBoardButtonProps = {
  book: LocalStorageBookObject
  book2?: BookItemType[]
  verse: VerseType
}

function CopyToClipBoardButton({
  book,
  verse,
  book2
}: CopyToClipBoardButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(`
        ${book2
          ? `${book.book2.name.toUpperCase()} ${verse.chapterNumber}:${verse.verseNumber} ${book.book2.version}\n[${verse.verseNumber}] ${verse.value}
        `: `${book.book1.name.toUpperCase()} ${verse.chapterNumber}:${verse.verseNumber} ${book.book1.version}\n
        [${verse.verseNumber}] ${verse.value}
        `}
      `)
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="disabled:opacity-100 w-7 h-7"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            disabled={copied}
          >
            <div
              className={cn(
                "transition-all",
                copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
            >
              <Check className="stroke-emerald-500" size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            <div
              className={cn(
                "absolute transition-all",
                copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
              )}
            >
              <Copy size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Click to copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { CopyToClipBoardButton };
