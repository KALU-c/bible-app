"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { FixedSizeList as List } from "react-window"
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
import { getAllSupportedLanguages } from "@/assets/book"

export function SelectBook() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [searchTerm, setSearchTerm] = React.useState("")

  const itemHeight = 40 // Adjust based on the height of your items

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
  }

  const books = getAllSupportedLanguages()

  // TODO - search is not working
  // Filter books based on the search term
  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            ? books.find((book) => book.id!.toString() === value)?.name
            : "Select book"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 overflow-auto">
        <Command>
          {/* Update search term when the user types */}
          <CommandInput
            placeholder="Search book..."
            onValueChange={(e) => setSearchTerm(e.target.value)}
          />
          <CommandList className="overflow-hidden">
            <CommandEmpty>No book found.</CommandEmpty>
            <CommandGroup>
              {/* Virtualized list with filtered books */}
              <List
                height={400} // Adjust the height to control how much of the list is visible
                itemCount={filteredBooks.length}
                itemSize={itemHeight}
                width={200} // Same width as the PopoverContent
              >
                {({ index, style }) => (
                  <CommandItem
                    key={filteredBooks[index].id}
                    value={filteredBooks[index].id!.toString()}
                    onSelect={() => handleSelect(filteredBooks[index].id!.toString())}
                    style={style} // This is necessary for virtualized rendering
                  >
                    {filteredBooks[index].name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === filteredBooks[index]?.id!.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )}
              </List>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
