"use client";

import { useEffect } from "react";
import { SignInCard } from "@/components/signin/SignInCard";
import Head from "next/head";

export default function SignInPage() {
  useEffect(() => {
    document.title = "Sign In | Flashlearn DAO";
  }, []);

  return (
    <>
      <Head>
        {/* Page Metadata */}
        <meta name="description" content="Sign In to Flashlearn DAO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/flash_back.jpg"
          alt="Abstract Flashlearn background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />

        {/* Sign-In Card */}
        <SignInCard />
      </main>
    </>
  );
}
