"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
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

const books = [
  {
    value: "genesis",
    label: "ኦሪት ዘገነስ",
  },
  {
    value: "exodus",
    label: "ኦሪት ዘኀልፍት",
  },
  {
    value: "leviticus",
    label: "ኦሪት ዘሌዋውያን",
  },
  {
    value: "numbers",
    label: "ኦሪት ዘኍስተ ቁጥር",
  },
  {
    value: "deuteronomy",
    label: "ኦሪት ዘዳግም",
  },
  {
    value: "joshua",
    label: "ያስወን",
  },
  {
    value: "judges",
    label: "መሳፍንት",
  },
  {
    value: "ruth",
    label: "ሩት",
  },
  {
    value: "1_samuel",
    label: "1 ሳሙኤል",
  },
  {
    value: "2_samuel",
    label: "2 ሳሙኤል",
  },
  {
    value: "1_kings",
    label: "1 ነገስት",
  },
  {
    value: "2_kings",
    label: "2 ነገስት",
  },
  {
    value: "1_chronicles",
    label: "1 ዜናሆች",
  },
  {
    value: "2_chronicles",
    label: "2 ዜናሆች",
  },
  {
    value: "ezra",
    label: "ዕዝራ",
  },
  {
    value: "nehemiah",
    label: "ነህምያ",
  },
  {
    value: "esther",
    label: "ኤስተር",
  },
  {
    value: "job",
    label: "ኢዮብ",
  },
  {
    value: "psalms",
    label: "መዝሙራት",
  },
  {
    value: "proverbs",
    label: "ምሳሌ",
  },
  {
    value: "ecclesiastes",
    label: "መክብብ",
  },
  {
    value: "song_of_songs",
    label: "መንግሥት አምላክ",
  },
  {
    value: "isaiah",
    label: "ኢሳይያስ",
  },
  {
    value: "jeremiah",
    label: "ኤርምያስ",
  },
  {
    value: "lamentations",
    label: "ነግርት",
  },
  {
    value: "ezekiel",
    label: "ኤዝኪኤል",
  },
  {
    value: "daniel",
    label: "ዳንኤል",
  },
  {
    value: "hosea",
    label: "ሆሴኤ",
  },
  {
    value: "joel",
    label: "ኢዮኤል",
  },
  {
    value: "amos",
    label: "አሞጽ",
  },
  {
    value: "obadiah",
    label: "ኦባዲያ",
  },
  {
    value: "jonah",
    label: "ዮናስ",
  },
  {
    value: "micah",
    label: "ሚክያስ",
  },
  {
    value: "nahum",
    label: "ናሆም",
  },
  {
    value: "habakkuk",
    label: "ናሆም",
  },
  {
    value: "zephaniah",
    label: "ሶፎንያስ",
  },
  {
    value: "haggai",
    label: "ሐጌ",
  },
  {
    value: "zechariah",
    label: "ዘካርያስ",
  },
  {
    value: "malachi",
    label: "ሚክያስ",
  },
  {
    value: "zephaniah",
    label: "ሶፎንያስ",
  }
]

export function SelectBook() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="lg:w-[200px] sm:w-[150px] justify-between border-b border-b-zinc-400 dark:border-b-zinc-700"
        >
          {value
            ? books.find((framework) => framework.value === value)?.label
            : "Select book"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search book..." />
          <CommandList>
            <CommandEmpty>No book found.</CommandEmpty>
            <CommandGroup>
              {books.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
