import IncomeDisplay from "@/components/income/IncomeDisplay";
import { incomeStyles } from "@/styles/income";

export default function IncomeViewPage() {
  return (
    <main className={incomeStyles.pageWrapper}>
      <IncomeDisplay />
    </main>
  );
}