"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authStyles } from "@/styles/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_AMS_DOMAIN || "http://localhost:8080";

export default function AccountSignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = (): string => {
    if (!email.trim() || !password.trim()) {
      return "Email and password are required.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Incorrect email or password.");
        return;
      }

      router.push("/");
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={authStyles.form}>
        <div>
          <label htmlFor="email" className={authStyles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className={authStyles.input}
          />
        </div>

        <div>
          <label htmlFor="password" className={authStyles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={authStyles.input}
          />
        </div>

        {error && <div className={authStyles.errorBox}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className={authStyles.button}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-4 space-y-2 text-center text-sm text-slate-400">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/account-creation" className={authStyles.link}>
            Create Account
          </Link>
        </p>

        <p>
          Forgot your password?{" "}
          <Link href="/password-reset" className={authStyles.link}>
            Reset Password
          </Link>
        </p>
      </div>
    </>
  );
}