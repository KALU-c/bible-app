import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'

const PlaySound = () => {
  return (
    <Button className="w-7 h-7" variant="ghost">
      <Volume2 />
    </Button>
  )
}

export default PlaySound
