"use client";

import { PolarGrid, RadialBar, RadialBarChart } from "recharts";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useCategoriesChartStore from "@/store/useCategoriesChartStore";

export default function CategoriseChart({ data }) {
  const { chartType } = useCategoriesChartStore();

  const chartData = data.map((category) => ({
    ...category,
    category: category.category.toLowerCase(),
    fill: `var(--color-${category.category.toLowerCase()})`,
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    ...chartData.reduce((acc, category, index) => {
      acc[category.category.toLowerCase()] = {
        label: category.category,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {}),
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <>
      {chartType === "pie" ? (
        <Card>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={chartData}
                  innerRadius={30}
                  outerRadius={100}
                >
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent hideLabel nameKey="category" />
                    }
                  />
                  <PolarGrid gridType="circle" />
                  <RadialBar dataKey="amount" />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
