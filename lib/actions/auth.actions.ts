"use server";

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/database/user.model";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "devevents_jwt_secret_key_2026_super_secure"
);

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

/**
 * Helper to generate JWT token and set HTTP-only cookie
 */
async function setSessionCookie(user: { id: string; name: string; email: string; role: string }) {
  const token = await new SignJWT({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Register a new user
 */
export async function registerUser(formData: FormData): Promise<AuthResponse> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string) || "developer";

    if (!name || !email || !password) {
      return { success: false, error: "Please fill in all required fields." };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role,
    });

    const userData = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    await setSessionCookie(userData);

    return { success: true, user: userData };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error?.message || "Registration failed. Please try again.",
    };
  }
}

/**
 * Log in an existing user
 */
export async function loginUser(formData: FormData): Promise<AuthResponse> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Please enter your email and password." };
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password." };
    }

    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    await setSessionCookie(userData);

    return { success: true, user: userData };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error?.message || "Login failed. Please try again.",
    };
  }
}

/**
 * Log out the current user
 */
export async function logoutUser(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false };
  }
}

/**
 * Get current authenticated user details from session cookie
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return null;
    }

    const { payload } = await jwtVerify(sessionToken, JWT_SECRET);

    return {
      id: payload.userId as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (error) {
    // Token invalid or expired
    return null;
  }
}
