import IncomeForm from "@/components/income/IncomeForm";
import { incomeStyles } from "@/styles/income";

export default function IncomeInputPage() {
  return (
    <main className={incomeStyles.pageWrapper}>
      <IncomeForm />
    </main>
  );
}