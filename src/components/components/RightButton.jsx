import { ChevronRight } from "lucide-react"
 
import { Button } from "@/components/ui/button"
 
export function RightButton({onClick}) {
  return (
    <Button onClick={onClick} variant="outline" size="icon">
      <ChevronRight />
    </Button>
  )
}