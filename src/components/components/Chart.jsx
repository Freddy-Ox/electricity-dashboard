"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList} from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  kWh: {
    label: "kWh",
    color: "hsl(var(--chart-1))",
  },
};

export function ChartComponent({chartData, dateString}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Electricity Prices on {dateString}</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-[1000px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
            />
            <YAxis domain={[0, 2.00]}/>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="kWh" fill="var(--color-kWh)" radius={8}>      
            <LabelList dataKey="kWh"  
              content={({ x, value }) => (
                <text x={x} y={30} dy={-20} textAnchor="left" fill="#000" fontSize={10}>
                  {`${value.toFixed(2)} kr`}
                </text>
              )}
            />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
{/*       <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
