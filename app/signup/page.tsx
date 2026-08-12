import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - DevEvents",
  description: "Create a DevEvents account to organize events, submit talks, and join hackathons worldwide.",
};

export default function SignUpPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-8">
      <AuthForm defaultMode="signup" />
    </section>
  );
}
