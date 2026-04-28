
"use client";

import AuthCard from "@/components/auth/AuthCard";
import AccountCreationForm from "@/components/auth/AccountCreationForm";
import { authStyles } from "@/styles/auth";


// testing for update


export default function AccountCreationPage() {
  return (
    <main className={authStyles.pageWrapper}>
      <AuthCard
        title="Create Account"
        subtitle="Start managing your finances with clarity"
      >
        <AccountCreationForm />
      </AuthCard>
    </main>
  );
}