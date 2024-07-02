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
