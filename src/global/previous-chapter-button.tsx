import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

const PreviousChapterButton = () => {
  return (
    <Button
      className="rounded-full p-2.5 fixed bottom-4 left-4"
      variant="secondary"
    >
      <ChevronLeft />
    </Button>
  )
}

export default PreviousChapterButton
