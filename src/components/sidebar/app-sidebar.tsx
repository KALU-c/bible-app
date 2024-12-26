import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  // SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import bibleBooks from "@/constants/bible-books"
import { Button } from "../ui/button"
import { useState } from "react"

export function AppSidebar() {
  const [testament, setTestament] = useState<"newTestament" | "oldTestament">('oldTestament');


  return (
    <Sidebar>
      {/* <SidebarHeader className="flex flex-row gap-0 border-b">
        <Button
          className="rounded-r-none py-5"
          variant={testament === "oldTestament" ? "default" : "ghost"}
          onClick={() => setTestament("oldTestament")}
        >
          Old Testament
        </Button>
        <Button
          className="rounded-l-none py-5"
          variant={testament === "newTestament" ? "default" : "ghost"}
          onClick={() => setTestament("newTestament")}
        >
          New Testament
        </Button>
      </SidebarHeader> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {testament === "newTestament" ? "New Testament" : "Old Testament"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bibleBooks[testament].map((book: string) => (
                <SidebarMenuItem key={book}>
                  <SidebarMenuButton asChild className="text-sm font-medium mb-1 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                    <a href={`#`}>{book}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row gap-0 border-t">
        <Button
          className="rounded-r-none"
          variant={testament === "oldTestament" ? "default" : "ghost"}
          onClick={() => setTestament("oldTestament")}
        >
          Old Testament
        </Button>
        <Button
          className="rounded-l-none py-5"
          variant={testament === "newTestament" ? "default" : "ghost"}
          onClick={() => setTestament("newTestament")}
        >
          New Testament
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
