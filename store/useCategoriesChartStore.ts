import { create } from "zustand";

type State = {
  chartType: string;
  setChartType: (chartType: string) => void;
};

const useCategoriesChartStore = create<State>((set) => ({
  chartType: "pie",
  setChartType: (chartType: string) =>
    set((state: State) => ({ chartType: chartType })),
}));

export default useCategoriesChartStore;
