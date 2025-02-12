import { Loader2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
 
export function ButtonLoadingComponent() {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Fetching historical prices from API
    </Button>
  )
}