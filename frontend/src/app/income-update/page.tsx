import IncomeUpdateForm from "@/components/income/IncomeUpdateForm";
import { incomeStyles } from "@/styles/income";

export default function IncomeUpdatePage() {
  return (
    <main className={incomeStyles.pageWrapper}>
      <IncomeUpdateForm />
    </main>
  );
}