export default function formatAmount(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}
