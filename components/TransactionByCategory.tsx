import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import getTransactionByCategory from "@/actions/getTransactionByCategory";
import DoughnutChart from "./DoughnutChart";

export default async function TransactionByCategory() {
  const transactions = await getTransactionByCategory();

  return (
    <div className="bg-muted p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <DoughnutChart categories={transactions.expenses} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Income by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <DoughnutChart categories={transactions.incomes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
