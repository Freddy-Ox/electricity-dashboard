import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function ResizableComponent({chartData}) {
  return (
    <ResizablePanelGroup 
      direction="horizontal"
      /* className="w-full max-w-screen-lg mx-auto mt-[25px] h-[800px] rounded-lg border" */
      className="rounded-lg border "
    >
      <ResizablePanel defaultSize={33}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Cheapest Hour {Math.min(...chartData.map((obj) => obj.kWh.toFixed(2)))}</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={34}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Most Expensive Hour</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={33}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Average Price</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
