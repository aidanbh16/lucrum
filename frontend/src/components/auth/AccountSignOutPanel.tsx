"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authStyles } from "@/styles/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_AMS_DOMAIN || "http://localhost:8080";

export default function AccountSignOutPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setError("");

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Could not sign out right now.");
        return;
      }

      router.push("/account-signin");
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center text-sm sm:text-base text-slate-300">
        Are you sure you want to sign out of your account?
      </div>

      {error && <div className={authStyles.errorBox}>{error}</div>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className={authStyles.button}
        >
          {loading ? "Signing Out..." : "Sign Out"}
        </button>
      </div>

      <div className="space-y-2 text-center text-sm text-slate-400">
        <p>
          Changed your mind?{" "}
          <Link href="/" className={authStyles.link}>
            Return to Dashboard
          </Link>
        </p>

        <p>
          Need a new account?{" "}
          <Link href="/account-creation" className={authStyles.link}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}