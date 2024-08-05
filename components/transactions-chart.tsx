"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Area, AreaChart } from "recharts";

import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Line, LineChart } from "recharts";
import useChartStore from "@/store/useTransactionsChartStore";
import useTransactionsChartStore from "@/store/useTransactionsChartStore";

const chartConfig = {
  transactions: {
    label: "Transactions",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TransactionsChart({ data }) {
  const { chartType } = useTransactionsChartStore();

  const chartData = data
    .map((item) => ({
      date: new Date(item.createdAt!).toISOString().split("T")[0],
      [item.type.toLowerCase()]: item.amount,
    }))
    .reduce((acc, cur) => {
      const dateExists = acc.find((item) => item.date === cur.date);
      if (dateExists) {
        for (const key in cur) {
          if (key !== "date") {
            dateExists[key] = (dateExists[key] || 0) + cur[key];
          }
        }
      } else {
        acc.push({ ...cur });
      }
      return acc;
    }, [])
    .map((item) => ({
      date: item.date,
      income: item.income || 0,
      expense: item.expense || 0,
    }));

  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("income");

  const total = React.useMemo(
    () => ({
      income: chartData.reduce((acc, curr) => acc + curr.income, 0),
      expense: chartData.reduce((acc, curr) => acc + curr.expense, 0),
    }),
    [chartData]
  );

  return (
    <>
      {chartType === "area" ? (
        <Card>
          {/* <CardHeader>
            <CardTitle>Area Chart - Stacked</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader> */}
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="transactions"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="income"
                  type="natural"
                  fill="var(--color-income)"
                  fillOpacity={0.4}
                  stroke="var(--color-income)"
                  stackId="a"
                />
                <Area
                  dataKey="expense"
                  type="natural"
                  fill="var(--color-expense)"
                  fillOpacity={0.4}
                  stroke="var(--color-expense)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          {/* <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter> */}
        </Card>
      ) : (
        <>
          <Card>
            {/* <CardHeader>
              <CardTitle>Bar Chart - Multiple</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader> */}
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="transactions"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                  <Bar
                    dataKey="expense"
                    fill="var(--color-expense)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter> */}
          </Card>
        </>
      )}
    </>
  );
}
