import { User } from "next-auth";

declare type TransactionProps = {
  id?: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
};

declare type addUserResponse = {
  success?: boolean;
  message?: string;
};

declare type Categories = { [key: string]: number };

declare type HeaderProps = {
  user: { name: string; email: string; image: string | null };
};

declare type CountAmountProp = {
  amount: number;
};

declare type AmountProps = {
  title: string;
  amount: number;
};

declare type PaginationGroupProps = {
  page: number;
  totalPage: number;
};

declare type ChatAIProps = {
  user: User;
  transactions: TransactionProps[];
};

declare type ChartProps = {
  title: string;
  data: { category: string; amount: number }[];
};
