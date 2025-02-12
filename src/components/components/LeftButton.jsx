import { ChevronLeft } from "lucide-react"
 
import { Button } from "@/components/ui/button"
 
export function LeftButton({onClick}) {
  return (
    <Button onClick={onClick} variant="outline" size="icon">
      <ChevronLeft />
    </Button>
  )
}