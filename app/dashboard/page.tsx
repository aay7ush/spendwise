"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { signOut, useSession } from "next-auth/react";
import { ResponsiveBar } from "@nivo/bar";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/sign-in");
  }

  return (
    <div className="flex flex-col h-full w-full">
      <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MountainIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Spendwise</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserIcon className="w-4 h-4" />
            <span>{session?.user?.name}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </header>
      <div className="flex flex-col h-full w-full">
        <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium text-muted-foreground">
                Total Income
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold">
                <DollarSignIcon className="w-5 h-5 text-primary" />
                <span>$12,345</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold">
                <DollarSignIcon className="w-5 h-5 text-red-500" />
                <span>$5,678</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium text-muted-foreground">
                Balance
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold">
                <DollarSignIcon className="w-5 h-5 text-green-500" />
                <span>$6,667</span>
              </div>
            </div>
          </div>
          <Button size="sm">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <AArrowUpIcon className="w-4 h-4" />
                Sort by Date
              </Button>
              <Button variant="outline" size="sm">
                <ArrowDownWideNarrowIcon className="w-4 h-4" />
                Sort by Amount
              </Button>
            </div>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Rent Payment</div>
                    <div className="text-sm text-muted-foreground">
                      Apartment rent
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    2023-06-01
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    Housing
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-red-500">-$1,500</div>
                  </TableCell>
                  <TableCell className="text-right">Expense</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Grocery Shopping</div>
                    <div className="text-sm text-muted-foreground">
                      Weekly groceries
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    2023-06-02
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">Food</TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-red-500">-$150</div>
                  </TableCell>
                  <TableCell className="text-right">Expense</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Paycheck</div>
                    <div className="text-sm text-muted-foreground">
                      Monthly salary
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    2023-06-15
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">Income</TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-green-500">$5,000</div>
                  </TableCell>
                  <TableCell className="text-right">Income</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Gas Refill</div>
                    <div className="text-sm text-muted-foreground">
                      Fuel for car
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    2023-06-20
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    Transportation
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-red-500">-$45</div>
                  </TableCell>
                  <TableCell className="text-right">Expense</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Dining Out</div>
                    <div className="text-sm text-muted-foreground">
                      Dinner with friends
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    2023-06-25
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">Food</TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-red-500">-$75</div>
                  </TableCell>
                  <TableCell className="text-right">Expense</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Freelance Work</div>
                    <div className="text-sm text-muted-foreground">
                      Web development project
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    2023-06-30
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">Income</TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-green-500">$2,000</div>
                  </TableCell>
                  <TableCell className="text-right">Income</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Card>
        </main>
        <div className="bg-muted p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart className="aspect-[4/3]" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Income by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart className="aspect-[4/3]" />
              </CardContent>
            </Card>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="fixed bottom-6 right-6">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <div>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>2023-06-01</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select id="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select id="category">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter a description"
                  />
                </div>
              </form>
            </div>
            <DialogFooter>
              <div>
                <Button variant="outline">Cancel</Button>
              </div>
              <Button>Save Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <footer className="bg-muted p-4 text-center text-sm text-muted-foreground">
        &copy; 2024 Spendwise. All rights reserved.
      </footer>
    </div>
  );
}

function AArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 13h6" />
      <path d="m2 16 4.5-9 4.5 9" />
      <path d="M18 16V7" />
      <path d="m14 11 4-4 4 4" />
    </svg>
  );
}

function ArrowDownWideNarrowIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M11 4h10" />
      <path d="M11 8h7" />
      <path d="M11 12h4" />
    </svg>
  );
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      k
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
