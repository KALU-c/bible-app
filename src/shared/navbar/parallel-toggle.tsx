import { Button } from '@/components/ui/button'
import { SquareSplitHorizontal } from 'lucide-react'
import { useState } from 'react'

const ParallelToggle = () => {
  const [isParallel, setParallel] = useState<boolean>(false);

  return (
    <Button
      className='h-7 w-7'
      variant={isParallel ? "secondary" : "ghost"}
      // TODO - make it functional
      onClick={() => setParallel(!isParallel)}
    >
      <SquareSplitHorizontal />
    </Button>
  )
}

export default ParallelToggle
