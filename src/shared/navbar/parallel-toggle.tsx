import { Button } from '@/components/ui/button'
import { useBookSetting } from '@/providers/book-provider';
import { SquareSplitHorizontal } from 'lucide-react'

const ParallelToggle = () => {
  const { isParallel, toggleParallel } = useBookSetting();

  function handleToggleViewParallel() {
    if (isParallel === "single") {
      toggleParallel("double")
      document.body.classList.remove('body-show-overflow')
      document.body.classList.add('body-hide-overflow')
    } else {
      toggleParallel("single")
      document.body.classList.remove('body-hide-overflow')
      document.body.classList.add('body-show-overflow')
    }
  }

  return (
    <Button
      className={`w-8 h-8 ${isParallel === "double" ? "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400" : ""}`}
      variant={isParallel === "double" ? "secondary" : "ghost"}
      onClick={handleToggleViewParallel}
    >
      <SquareSplitHorizontal />
    </Button>
  )
}

export default ParallelToggle
