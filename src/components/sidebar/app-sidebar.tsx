import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import bibleBooks, { BibleBook } from "@/constants/bible-books"
import { Button } from "../ui/button"
import { useState } from "react"
import { useBookSetting } from "@/providers/book-provider";

export function AppSidebar() {
  const [testament, setTestament] = useState<"newTestament" | "oldTestament">('oldTestament');
  const { book: currentBook, setBook } = useBookSetting();

  return (
    <Sidebar>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="flex flex-row w-full justify-between items-center bg-zinc-100 dark:bg-zinc-800">
            {testament === "newTestament" ? "New Testament" : "Old Testament"}
            <span>chapters</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-row p-1 pr-0">
            <SidebarMenu className="max-h-[88vh] sticky top-0 overflow-y-auto scrollbar dark:scrollbar-dark">
              {bibleBooks[testament].map((book: BibleBook) => (
                <SidebarMenuItem key={book.value}>
                  <SidebarMenuButton
                    asChild
                    className={`rounded-none text-sm font-medium mb-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 ${book.value === currentBook.book1 ? "bg-zinc-300 dark:bg-zinc-700" : ""}`}
                    onClick={() => setBook({ ...currentBook, book1: book.value, book1Chapter: 1 })}
                  >
                    <a href={`#`}>{book.label}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {/* TODO - when testament change the chapter list will be empty, it have to be hidden */}
            <SidebarMenu className="w-[50px] border-l max-h-[88vh] sticky top-0 overflow-y-auto scrollbar dark:scrollbar-dark">
              {Array.from({ length: bibleBooks[testament].find(item => item.value === currentBook.book1)?.chapterNumber || 0 }, (_, index) => (
                <SidebarMenuItem
                  key={index + 1}
                >
                  <SidebarMenuButton
                    asChild
                    className={`rounded-none text-sm font-medium mb-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center ${currentBook.book1Chapter === (index + 1) ? "bg-zinc-300 dark:bg-zinc-700" : ""}`}
                    onClick={() => setBook({ ...currentBook, book1Chapter: (index + 1) })}
                  >
                    <a href={`#`} className="text-center">{index + 1}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row gap-0 border-t p-1">
        <Button
          variant="ghost"
          className={`flex-1 rounded-r-none ${testament === "oldTestament" ? "bg-zinc-400 text-black hover:bg-zinc-500 dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500" : "hover:bg-zinc-200 dark:hover:bg-zinc-800"}`}
          onClick={() => setTestament("oldTestament")}
        >
          Old Testament
        </Button>
        <Button
          variant="ghost"
          className={`rounded-l-none ${testament === "newTestament" ? "bg-zinc-400 text-black hover:bg-zinc-500 dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500" : "hover:bg-zinc-200 dark:hover:bg-zinc-800"}`}
          onClick={() => setTestament("newTestament")}
        >
          New Testament
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
