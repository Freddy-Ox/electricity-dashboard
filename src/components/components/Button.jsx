import { ChevronRight, ChevronLeft } from "lucide-react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Button } from "@/components/ui/button";

let today = new Date();

function getDateString(date) {
  return date.toISOString().slice(0, 10);
}
function getTime(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

export function ButtonComponent({ onClick, dateChange, chartDate }) {
  return (
    <>
      <Button
        onClick={onClick}
        dateChange={dateChange}
        variant="outline"
        size="icon"
        disabled={
          (getDateString(today) === getDateString(chartDate) &&
            getTime(today) < "13:05") ||
          (getDateString(today) < getDateString(chartDate) &&
            dateChange === "next")
        }
      >
        {dateChange === "next" ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </>
  );
}
