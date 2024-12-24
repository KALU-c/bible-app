import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const NextChapterButton = () => {
  return (
    <Button
      className="rounded-full p-2.5 fixed top-[50%] right-10"
      variant="secondary"
    >
      <ChevronRight />
    </Button>
  )
}

export default NextChapterButton
