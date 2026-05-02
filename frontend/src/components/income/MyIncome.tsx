"use client";

import { useState } from "react";
import { incomeStyles } from "@/styles/income";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_IMS_DOMAIN ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8081"
    : "https://ims.lucrumproject.com");
    
type Stream = {
  id: string;
  source: string;
  amount: string;
};

type SavedStream = {
  id: string;
  source: string;
  amount: number;
};

type MyIncomeProps = {
  setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
};

export default function MyIncome({ setTotalIncome }: MyIncomeProps) {
  const [saved, setSaved] = useState<SavedStream[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [streams, setStreams] = useState<Stream[]>([
    { id: crypto.randomUUID(), source: "", amount: "" },
  ]);

  const total = saved.reduce((sum, s) => sum + s.amount, 0);

  const handleSave = async () => {
    setError("");

    const preparedData: SavedStream[] = streams
      .filter((s) => s.source.trim() !== "" || s.amount.trim() !== "")
      .map((s) => ({
        id: s.id,
        source: s.source.trim(),
        amount: parseFloat(s.amount) || 0,
      }));

    const newTotal = preparedData.reduce((sum, s) => sum + s.amount, 0);

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/income/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: newTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Could not save income.");
        return;
      }

      setSaved(preparedData);
      setTotalIncome(newTotal);
    } catch {
      setError("Could not connect to the income server.");
    } finally {
      setLoading(false);
    }
  };

  const updateStream = (index: number, field: keyof Stream, value: string) => {
    let newStreams = [...streams];
    newStreams[index] = { ...newStreams[index], [field]: value };

    newStreams = newStreams.filter(
      (s) => s.source.trim() !== "" || s.amount.trim() !== ""
    );

    newStreams.push({
      id: crypto.randomUUID(),
      source: "",
      amount: "",
    });

    setStreams(newStreams);
  };

  const chartColors = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f97316",
    "#84cc16",
  ];

  const validSaved = saved.filter((s) => s.amount > 0);

  let currentPercent = 0;
  const pieChart = validSaved.length
    ? `conic-gradient(${validSaved
        .map((s, i) => {
          const percent = (s.amount / total) * 100;
          const start = currentPercent;
          const end = currentPercent + percent;
          currentPercent = end;
          return `${chartColors[i % chartColors.length]} ${start}% ${end}%`;
        })
        .join(", ")})`
    : "conic-gradient(#0f172a 0% 100%)";

  return (
    <div className={incomeStyles.pageWrapper}>
      <div className={incomeStyles.sectionWrapper}>
        <div className={`${incomeStyles.card} flex flex-col`}>
          <h2 className={incomeStyles.title} style={{ textAlign: "center" }}>
            Monthly Earnings
          </h2>

          <div className="mt-6 flex flex-col items-center">
            <div
              className="relative h-56 w-56 rounded-full border border-slate-700 shadow-inner"
              style={{ background: pieChart }}
            />

            <div className="mt-6 w-full space-y-3">
              {validSaved.map((s, i) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="h-4 w-4 rounded-sm flex-shrink-0"
                      style={{
                        backgroundColor: chartColors[i % chartColors.length],
                      }}
                    />
                    <span className="text-slate-200 text-base truncate">
                      {s.source || "Unknown Source"}
                    </span>
                  </div>

                  <span className="text-slate-400 text-base whitespace-nowrap">
                    ${s.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {validSaved.length === 0 && (
              <div className="text-center text-slate-500 text-base mt-0">
                No income sources saved yet
              </div>
            )}
          </div>

          <div className="flex-grow flex flex-col justify-end mt-6 pb-2.5">
            <p
              className={`${incomeStyles.label} items-center`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              Total Monthly:{" "}
              <span
                className={incomeStyles.totalText}
                style={{ lineHeight: 1 }}
              >
                ${total.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <div className={`${incomeStyles.card} flex flex-col`}>
          <h2 className={incomeStyles.title} style={{ textAlign: "center" }}>
            Manage Sources
          </h2>

          <div className="mt-6 space-y-4">
            {streams.map((stream, index) => (
              <div key={stream.id} className="flex items-center gap-3 w-full">
                <input
                  className={`${incomeStyles.input} flex-grow`}
                  placeholder="Income source"
                  value={stream.source}
                  onChange={(e) => updateStream(index, "source", e.target.value)}
                />

                <input
                  className={`${incomeStyles.input} w-32 flex-shrink-2 text-right`}
                  style={{ textAlign: "right" }}
                  placeholder="0.00"
                  type="number"
                  value={stream.amount}
                  onChange={(e) => updateStream(index, "amount", e.target.value)}
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="mt-auto pt-10">
            <button
              className={incomeStyles.button}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}