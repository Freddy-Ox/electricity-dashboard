import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function ResizableComponent({ chartData }) {
  let minKWh = Math.min(...chartData.map((obj) => obj.kWh));
  let maxKWh = Math.max(...chartData.map((obj) => obj.kWh));
  let minHour = chartData.find((elem) => elem.kWh === minKWh);
  let maxHour = chartData.find((elem) => elem.kWh === maxKWh);

  maxKWh = maxKWh.toFixed(2);
  minKWh = minKWh.toFixed(2);

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border "
      >
        <ResizablePanel defaultSize={33} className="bg-green-300">
          <div className="flex h-full items-center justify-center p-6 flex-col">
            <h2 className="text-xl mb-2">Cheapest Hour</h2>
            <p className="text-2xl mb-4 mt-2">
              {minHour?.hour < 10
                ? `${minHour?.hour}-${(+minHour?.hour + 1)
                    .toString()
                    .padStart(2, "0")}`
                : `${minHour?.hour}-${+minHour?.hour + 1}`}
            </p>
            <p className="text-lg">{minKWh} kr/kWh</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup className="rounded-lg border mx-4">
        <ResizablePanel defaultSize={34} className="bg-rose-300">
          <div className="flex h-full items-center justify-center p-6 flex-col">
            <h2 className="text-xl mb-2">Most Expensive Hour</h2>
            <p className="text-2xl mb-4 mt-2">
              {maxHour?.hour < 10
                ? `${maxHour?.hour}-${(+maxHour?.hour + 1)
                    .toString()
                    .padStart(2, "0")}`
                : `${maxHour?.hour}-${+maxHour?.hour + 1}`}
            </p>
            <p className="text-lg">{maxKWh} kr/kWh</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup className="rounded-lg border ">
        <ResizablePanel defaultSize={33} className="bg-emerald-100">
          <div className="flex h-full items-center justify-center p-6 flex-col">
            <h2 className="text-xl mb-2">Average kWh Price</h2>
            <p className="text-2xl mb-4 mt-2">
              {(
                chartData.reduce((sum, item) => sum + item.kWh, 0) /
                chartData.length
              ).toFixed(2)} kr/kWh
            </p>
            <p className="text-emerald-100">jjjj</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
