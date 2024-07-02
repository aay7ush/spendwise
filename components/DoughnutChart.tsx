"use client";

import { Chart, ArcElement } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement);

export default function DoughnutChart({
  categories,
}: {
  categories: Categories;
}) {
  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
      },
    ],
  };
  return <Doughnut data={data} />;
}
