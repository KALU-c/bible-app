"use client"

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
import { useState } from "react"

// TODO - make it dynamic
const bibleVersions = [
  {
    value: "Pular Fuuta-Jallon New Testament",
    label: "Pular Fuuta-Jallon New Testament",
  },
  {
    value: "Biblica® Open New Ukrainian Translation 2022 (New Testament and Psalms)",
    label: "Biblica® Open New Ukrainian Translation 2022 (New Testament and Psalms)",
  },
  {
    value: "Brenton Greek Text",
    label: "Brenton Greek Text",
  },
  {
    value: "Solid Rock Greek New Testament, Scholar's Edition",
    label: "Solid Rock Greek New Testament, Scholar's Edition",
  },
  {
    value: "Ngoni Bible Version Translation Project",
    label: "Ngoni Bible Version Translation Project",
  },
]

export function SelectVersion() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between lg:w-[300px] sm:w-[250px] border-b border-b-zinc-400"
        >
          {value
            ? bibleVersions.find((framework) => framework.value === value)?.label
            : "Select bible version"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
        <Command>
          <CommandInput placeholder="Search bible version..." />
          <CommandList>
            <CommandEmpty>No bible version found.</CommandEmpty>
            <CommandGroup>
              {bibleVersions.map((framework: { value: string, label: string }) => (
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
