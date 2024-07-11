import { create } from "zustand";

type State = {
  type: string;
  amount: string;
  date: string;
  category: string;
  setType: (type: string) => void;
  setAmount: (amount: string) => void;
  setDate: (date: string) => void;
  setCategory: (category: string) => void;
};

const useFilterStore = create<State>((set) => ({
  type: "",
  amount: "",
  date: "",
  category: "",
  setType: (type: string) => set((state: State) => ({ type: type })),
  setAmount: (amount: string) => set((state: State) => ({ amount: amount })),
  setDate: (date: string) => set((state: State) => ({ date: date })),
  setCategory: (category: string) =>
    set((state: State) => ({ category: category })),
}));

export default useFilterStore;
