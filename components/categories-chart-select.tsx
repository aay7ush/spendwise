"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategoriesChartStore from "@/store/useCategoriesChartStore";
import { PieChart, Radar, Target } from "lucide-react";

export default function CategoriesChartSelect() {
  const { chartType, setChartType } = useCategoriesChartStore();

  return (
    <Select value={chartType} onValueChange={(value) => setChartType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chart Type" />
      </SelectTrigger>
      <SelectContent className="w-[180px]">
        <SelectItem value="pie">
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <PieChart className="size-7 mr-2" />
            <span>Pie Chart</span>
          </div>
        </SelectItem>
        <SelectItem value="radial" className="flex gap-x-3">
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <Target className="size-7 mr-2" />
            <span>Radial Chart</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
