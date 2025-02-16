import { ChevronRight, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

let today = new Date();

function getDateString(date) {
  return date.toISOString().slice(0, 10);
}
function getHour(date) {
  return String(date.getHours()).padStart(2, "0");
}

export function ButtonComponent({ onClick, dateChange, chartDate }) {
  console.log(today);

  console.log(getDateString(today));
  console.log(getHour(today));

  return (
    <Button
      onClick={onClick}
      dateChange={dateChange}
      variant="outline"
      size="icon"
      disabled = {getDateString(today) === getDateString(chartDate) && dateChange === "next"}
    >
      {dateChange === "next" ? <ChevronRight /> : <ChevronLeft />}
    </Button>
  );
}
