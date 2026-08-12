"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as UserIcon, LogOut, Shield, ChevronDown } from "lucide-react";
import { logoutUser } from "@/lib/actions/auth.actions";

interface UserNavProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function UserNav({ user }: UserNavProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutUser();
    setIsOpen(false);
    setLoggingOut(false);
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium text-light-100 hover:text-primary transition-colors px-3 py-1.5"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="text-xs font-semibold bg-primary hover:bg-primary/90 text-black px-4 py-2 rounded-full transition-all shadow-md shadow-primary/20"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // Get initials for avatar badge
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "DE";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-dark-200/80 hover:bg-dark-200 border border-border-dark px-3 py-1.5 rounded-full transition-all"
      >
        <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center text-xs font-bold font-mono">
          {initials}
        </div>
        <span className="text-xs font-medium text-white max-w-[100px] truncate hidden sm:inline">
          {user.name}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-light-200" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-dark-100/95 border border-dark-200 backdrop-blur-xl rounded-xl shadow-2xl z-50 p-2 text-xs flex flex-col gap-1">
            <div className="px-3 py-2 border-b border-border-dark">
              <p className="font-bold text-white text-sm truncate">{user.name}</p>
              <p className="text-light-200 text-[11px] truncate">{user.email}</p>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-wider font-semibold">
                <Shield className="w-3 h-3" />
                {user.role}
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-1 font-medium"
            >
              <LogOut className="w-4 h-4" />
              {loggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
