import { Button } from '@/components/ui/button'
import { useBookSetting } from '@/providers/book-provider';
import { SquareSplitHorizontal } from 'lucide-react'

const ParallelToggle = () => {
  const { isParallel, toggleParallel } = useBookSetting();

  function handleToggleViewParallel() {
    if (isParallel === "single") {
      toggleParallel("double")
    } else {
      toggleParallel("single")
    }
  }

  return (
    <Button
      className={`w-7 h-7 ${isParallel === "double" ? "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400" : ""}`}
      variant={isParallel === "double" ? "secondary" : "ghost"}
      onClick={handleToggleViewParallel}
    >
      <SquareSplitHorizontal />
    </Button>
  )
}

export default ParallelToggle
