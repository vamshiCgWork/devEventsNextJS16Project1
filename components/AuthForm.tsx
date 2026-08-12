"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Code2,
  Calendar,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { loginUser, registerUser } from "@/lib/actions/auth.actions";

interface AuthFormProps {
  defaultMode?: "login" | "signup";
}

export default function AuthForm({ defaultMode = "login" }: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"developer" | "organizer" | "student">("developer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    if (mode === "signup") {
      formData.set("role", role);
    }

    try {
      const res = mode === "login" ? await loginUser(formData) : await registerUser(formData);

      if (res.success) {
        setSuccess(
          mode === "login"
            ? "Successfully authenticated! Redirecting..."
            : "Account created successfully! Redirecting..."
        );
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      } else {
        setError(res.error || "An error occurred during authentication.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    setError(null);
    setSuccess(`Connecting with ${provider}... (Demo authentication enabled)`);
    setTimeout(() => {
      setSuccess("Successfully authenticated via social login!");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Outer Glow Container */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-blue to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

        <div className="relative bg-dark-100/90 border border-dark-200 backdrop-blur-xl rounded-2xl p-6 sm:p-8 card-shadow flex flex-col gap-6">
          {/* Header & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 bg-dark-200/80 rounded-xl border border-border-dark mb-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {mode === "login" ? "Welcome Back" : "Join the Dev Community"}
            </h2>
            <p className="text-sm text-light-200">
              {mode === "login"
                ? "Sign in to access saved events, bookings & updates"
                : "Create an account to discover & organize top tech events"}
            </p>
          </div>

          {/* Mode Tabs Switcher */}
          <div className="grid grid-cols-2 p-1 bg-dark-200/90 border border-border-dark rounded-xl">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setSuccess(null);
              }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                mode === "login"
                  ? "bg-primary text-black shadow-lg"
                  : "text-light-200 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
                setSuccess(null);
              }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                mode === "signup"
                  ? "bg-primary text-black shadow-lg"
                  : "text-light-200 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="flex items-start gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-light-100 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-200" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-dark-200 border border-border-dark focus:border-primary text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-light-100 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-200" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@developer.com"
                  className="w-full bg-dark-200 border border-border-dark focus:border-primary text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-light-100 uppercase tracking-wider">
                  Password
                </label>
                {mode === "login" && (
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      setError("Password reset link sent to registered email address (Demo).");
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-200" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  placeholder="••••••••••••"
                  className="w-full bg-dark-200 border border-border-dark focus:border-primary text-white text-sm rounded-xl pl-10 pr-10 py-3 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-light-200 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Selection for Sign Up */}
            {mode === "signup" && (
              <div className="flex flex-col gap-2 mt-1">
                <label className="text-xs font-semibold text-light-100 uppercase tracking-wider">
                  I am joining as a
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("developer")}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium gap-1.5 transition-all ${
                      role === "developer"
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-dark-200/50 border-border-dark text-light-200 hover:border-gray-600"
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    Developer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("organizer")}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium gap-1.5 transition-all ${
                      role === "organizer"
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-dark-200/50 border-border-dark text-light-200 hover:border-gray-600"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Organizer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium gap-1.5 transition-all ${
                      role === "student"
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-dark-200/50 border-border-dark text-light-200 hover:border-gray-600"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    Student
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-primary hover:bg-primary/90 text-black font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{mode === "login" ? "Sign In to DevEvents" : "Create My Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-dark"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-dark-100 px-3 text-light-200 font-mono text-[11px]">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialAuth("GitHub")}
              className="flex items-center justify-center gap-2.5 bg-dark-200/80 hover:bg-dark-200 border border-border-dark text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth("Google")}
              className="flex items-center justify-center gap-2.5 bg-dark-200/80 hover:bg-dark-200 border border-border-dark text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              Google
            </button>
          </div>

          {/* Footer switch prompt */}
          <p className="text-center text-xs text-light-200 pt-1">
            {mode === "login" ? "Don't have an account? " : "Already registered? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
                setSuccess(null);
              }}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "login" ? "Sign up now" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
