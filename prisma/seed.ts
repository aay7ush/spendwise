import prisma from "./db";

async function main() {
  const transactions = Array.from({ length: 20 }, (_, i) => ({
    amount: Math.floor(Math.random() * 1000),
    description: `Transaction ${i + 1}`,
    date: new Date(),
    type: "income",
    category: "salary",
    userId: "clybwkf6v0001k3arifrd6hon",
    // Add other fields as necessary
  }));

  await prisma.transaction.createMany({
    data: transactions,
  });

  console.log("Seeded 20 transactions");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
