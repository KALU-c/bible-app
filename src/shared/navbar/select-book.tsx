"use client"

import * as React from "react"
import { ChevronsDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import bibleBooks from "@/constants/bible-books"
import { useBookSetting } from "@/providers/book-provider"
import { BookName } from "@/types/book-type"


export function SelectBook() {
  const { books, setBook } = useBookSetting();

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<BookName>(books.book2.name)
  const [testament, setTestament] = React.useState<"oldTestament" | "newTestament">("newTestament");
  const [chapterInBook, setChapterInBook] = React.useState<number>(0);
  const [search, setSearch] = React.useState("");


  React.useEffect(() => {
    const chapterLength = bibleBooks[testament].find(item => item.value === value)?.chapterNumber;

    if (chapterLength) {
      setChapterInBook(chapterLength)
    } else {
      setChapterInBook(0);
    }
  }, [books.book2.name]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between border-none bg-zinc-200 dark:bg-zinc-800 rounded-sm h-7 flex items-center gap-10"
        >
          {value
            ? bibleBooks[testament].find((framework) => framework.value === value)?.label
            : "Select book"}
          <ChevronsDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="flex flex-row gap-0 border-t p-1">
            <Button
              variant="outline"
              className={`flex-1 rounded-r-none ${testament === "oldTestament" ? "bg-zinc-400 text-black hover:bg-zinc-500 dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500" : "hover:bg-zinc-200 dark:hover:bg-zinc-800"}`}
              onClick={() => setTestament("oldTestament")}
            >
              Old T.
            </Button>
            <Button
              variant="outline"
              className={` flex-1 rounded-l-none ${testament === "newTestament" ? "bg-zinc-400 text-black hover:bg-zinc-500 dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500" : "hover:bg-zinc-200 dark:hover:bg-zinc-800"}`}
              onClick={() => setTestament("newTestament")}
            >
              New T.
            </Button>
          </div>
          <CommandInput
            value={search}
            onValueChange={(value) => setSearch(value)}
            placeholder="Search book..."
          />
          <CommandList className="overflow-hidden">
            <CommandEmpty>No book found.</CommandEmpty>
            <div className="flex">
              <CommandGroup
                className="flex-1 max-h-[300px] sticky top-0 overflow-y-auto scrollbar dark:scrollbar-dark px-0"
              >
                {bibleBooks[testament].map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? books.book2.name : currentValue as BookName)
                      setBook({
                        ...books,
                        book2: {
                          ...books.book2,
                          name: currentValue as BookName
                        }
                      })
                      setSearch("");
                    }}
                    className={`${value === framework.value ? "bg-zinc-300 dark:bg-zinc-700 hover:data-[selected=true]:bg-zinc-400 dark:hover:data-[selected=true]:bg-zinc-600 rounded-none" : ""}`}
                  >
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup className={`w-[50px] border-l max-h-[300px] sticky top-0 overflow-y-auto scrollbar dark:scrollbar-dark px-0 ${chapterInBook === 0 ? "hidden" : ""}`}>
                {Array.from({ length: chapterInBook }, (_, index) => (
                  <CommandItem
                    key={index + 1}
                    className={`text-center ${(index + 1) === books.book2.chapter ? "bg-zinc-300 dark:bg-zinc-700 hover:data-[selected=true]:bg-zinc-400 dark:hover:data-[selected=true]:bg-zinc-600 rounded-none" : ""}`}
                    value={(index + 1).toString()}
                    onSelect={(currentValue) => {
                      setBook({
                        ...books,
                        book2: {
                          ...books.book2,
                          chapter: parseInt(currentValue)
                        }
                      })
                      setOpen(false)
                    }}
                  >
                    <span className="w-full">{index + 1}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
