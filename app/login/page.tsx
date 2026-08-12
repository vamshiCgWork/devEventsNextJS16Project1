import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - DevEvents",
  description: "Log in to your DevEvents account to browse, track, and register for developer conferences and hackathons.",
};

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-8">
      <AuthForm defaultMode="login" />
    </section>
  );
}
