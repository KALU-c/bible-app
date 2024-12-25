import { Button } from '@/components/ui/button'
import { IsParallelType, useBookSetting } from '@/providers/book-provider';
import { SquareSplitHorizontal } from 'lucide-react'
import { useState } from 'react'

const ParallelToggle = () => {
  const { isParallel, toggleParallel } = useBookSetting();
  const [isViewParallel, toggleViewParallel] = useState<IsParallelType>(isParallel);

  function handleToggleViewParallel() {
    if (isViewParallel === "single") {
      toggleViewParallel("double")
      toggleParallel("double")
    } else {
      toggleViewParallel("single")
      toggleParallel("single")
    }
  }

  return (
    <Button
      className='h-8 w-8'
      variant={isParallel === "double" ? "secondary" : "ghost"}
      onClick={handleToggleViewParallel}
    >
      <SquareSplitHorizontal />
    </Button>
  )
}

export default ParallelToggle
