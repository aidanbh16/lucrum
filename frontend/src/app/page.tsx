"use client";

import { useState, useEffect } from "react";
import FinalAllocation from "@/components/allocation/FinalAllocation";
import MyIncome from "@/components/income/MyIncome";
import { incomeStyles } from "@/styles/income";
import Image from "next/image";

// 🔥 FIXED: use AMS (auth service), NOT IMS
const API_BASE_URL =
  process.env.NEXT_PUBLIC_AMS_DOMAIN ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://ams.lucrumproject.com");

export default function Home() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/user`, {
          credentials: "include",
        });

        if (!res.ok) {
          window.location.href = "/account-signin";
          return;
        }
      } catch {
        window.location.href = "/account-signin";
        return;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/account-signin";
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <main className={incomeStyles.pageWrapper}>
      <div className="mx-auto w-full max-w-5xl">

        <div className="mb-0 flex justify-center">
          <Image
            src="/logo/LucrumLogo.png"
            alt="Lucrum Logo"
            width={300}
            height={200}
            priority
          />
        </div>

        <h1 className={`${incomeStyles.title} text-center`}>
          Welcome to Lucrum
        </h1>
        <p className={`${incomeStyles.subtitle} mt-2 text-center`}>
          Manage your monthly income and allocations in one place.
        </p>

        <section className="mb-8">
          <MyIncome setTotalIncome={setTotalIncome} />
        </section>

        <section className="mb-8">
          <FinalAllocation totalIncome={totalIncome} />
        </section>

      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={`${incomeStyles.button} !w-auto px-6 ${
            isSigningOut ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {isSigningOut ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    </main>
  );
}