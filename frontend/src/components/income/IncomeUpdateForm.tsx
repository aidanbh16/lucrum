"use client";
import { useState, useEffect } from "react";
import { incomeStyles } from "@/styles/income";

interface IncomeStream {
  id: number; // We need IDs to know which record to update in the DB
  amount: string;
  source: string;
}

export default function IncomeUpdateForm() {
  const [streams, setStreams] = useState<IncomeStream[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating fetching data from your FastAPI backend
  useEffect(() => {
    const fetchExistingIncome = async () => {
      // Fake data for now - later this will be: await fetch('http://localhost:8000/get-income')
      const mockData = [
        { id: 1, amount: "3200", source: "Main Job" },
        { id: 2, amount: "450", source: "Freelance" },
      ];
      setStreams(mockData);
      setLoading(false);
    };

    fetchExistingIncome();
  }, []);

  const handleUpdate = (index: number, field: keyof IncomeStream, value: string) => {
    const newStreams = [...streams];
    // @ts-ignore - simple way to handle the dynamic key update
    newStreams[index][field] = value;
    setStreams(newStreams);
  };

  const handleSaveUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending Updates to Backend:", streams);
    alert("Changes saved successfully!");
  };

  if (loading) return <div className="text-white">Loading your income data...</div>;

  return (
    <div className={incomeStyles.card}>
      <h2 className={incomeStyles.title}>Update Monthly Income</h2>
      <h3 className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-6">
        Edit Current Sources
      </h3>

      <form onSubmit={handleSaveUpdate} className={incomeStyles.form}>
        {streams.map((stream, index) => (
          <div key={stream.id} className="flex gap-3 mb-4 p-3 rounded-lg border border-slate-700 bg-slate-700/30">
            <div className="flex-1">
              <label className={incomeStyles.label}>Amount</label>
              <input
                type="number"
                className={incomeStyles.input}
                value={stream.amount}
                onChange={(e) => handleUpdate(index, "amount", e.target.value)}
              />
            </div>
            <div className="flex-[2]">
              <label className={incomeStyles.label}>Source</label>
              <input
                type="text"
                className={incomeStyles.input}
                value={stream.source}
                onChange={(e) => handleUpdate(index, "source", e.target.value)}
              />
            </div>
          </div>
        ))}

        <button type="submit" className={`${incomeStyles.button} mt-4`}>
          Confirm Changes
        </button>
      </form>
    </div>
  );
}