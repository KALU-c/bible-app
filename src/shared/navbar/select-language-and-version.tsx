import * as React from "react"
import { Check, ChevronsUpDown, Globe } from "lucide-react"

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
import { Separator } from "@/components/ui/separator"

// Mock data for languages and Bible versions
const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
]

const bibleVersions = [
  { value: "kjv", label: "King James Version", language: "en" },
  { value: "niv", label: "New International Version", language: "en" },
  { value: "esv", label: "English Standard Version", language: "en" },
  { value: "rvr", label: "Reina-Valera 1960", language: "es" },
  { value: "nvi", label: "Nueva Versión Internacional", language: "es" },
  { value: "lsg", label: "Louis Segond", language: "fr" },
  { value: "nbs", label: "Nouvelle Bible Segond", language: "fr" },
]

type Item = { value: string; label: string }

export function BibleVersionSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [mode, setMode] = React.useState<"language" | "version">("language")
  const [selectedLanguage, setSelectedLanguage] = React.useState("")
  const [items, setItems] = React.useState<Item[]>([])

  React.useEffect(() => {
    if (mode === "language") {
      setItems([...languages])
    } else if (selectedLanguage) {
      const filteredVersions = bibleVersions.filter(
        (v) => v.language === selectedLanguage
      )
      setItems(filteredVersions.length > 0 ? filteredVersions : [])
    } else {
      setItems([]) // Clear items if no language is selected
    }
  }, [mode, selectedLanguage])

  const handleSelect = (currentValue: string) => {
    if (mode === "language") {
      setSelectedLanguage(currentValue)
      setMode("version")
      setValue("")
    } else {
      setValue(currentValue)
      setOpen(false)
    }
  }

  const getCurrentLabel = () => {
    if (value) {
      const selectedItem = items.find((item) => item.value === value)
      return selectedItem ? selectedItem.label : "Select..."
    }
    if (mode === "language") {
      return "Select language..."
    }
    return selectedLanguage ? "Select Bible version..." : "Select language first"
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between lg:w-[250px] sm:w-[250px] border-b border-b-zinc-400 dark:border-b-zinc-700"
        >
          {getCurrentLabel()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder={mode === "language" ? "Search language..." : "Search version..."}
            />
            <CommandEmpty>No {mode} found.</CommandEmpty>
            <CommandGroup className="p-0">
              {mode === "version" && (
                <div className="flex justify-between items-center px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">Current Language:</span>
                    <span className="font-medium text-sm">{languages.find(
                      v => v.value === selectedLanguage
                    )?.label}</span>
                  </div>
                  {/* TODO - remove the background when it's hovered */}
                  <CommandItem
                    className="p-0 text-sm text-blue-500 cursor-pointer"
                    onSelect={() => {
                      setMode("language")
                      setSelectedLanguage("")
                      setValue("")
                    }}
                  >
                    <Globe />
                  </CommandItem>
                </div>
              )}
              <Separator />
              {items && items.length > 0 ? (
                items.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSelect(item.value)}
                    className="py-1"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No items found.</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
