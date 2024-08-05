import { create } from "zustand";

type State = {
  chartType: string;
  setChartType: (chartType: string) => void;
};

const useTransactionsChartStore = create<State>((set) => ({
  chartType: "area",
  setChartType: (chartType: string) =>
    set((state: State) => ({ chartType: chartType })),
}));

export default useTransactionsChartStore;
