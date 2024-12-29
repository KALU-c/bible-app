import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ChevronLeft } from "lucide-react"

const PreviousChapterButton = () => {
  const { open } = useSidebar();

  return (
    <Button
      className={`rounded-full p-2.5 fixed lg:top-[50%] bottom-4 left-10 ${open ? 'left-52' : ''}`}
      variant="ghost"
    >
      <ChevronLeft />
    </Button>
  )
}

export default PreviousChapterButton
