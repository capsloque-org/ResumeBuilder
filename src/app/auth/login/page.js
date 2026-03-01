"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  FileText,
  Zap,
} from "lucide-react";

/* ============================================================
   LOGIN FORM
   ============================================================ */
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const errorParam = searchParams.get("error");

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    errorParam === "CredentialsSignin" ? "Invalid credentials" : "",
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        isSignUp: isSignUp.toString(),
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 100);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3.5 pl-11 bg-[var(--c-bg-secondary)] border-2 border-[var(--c-border)] text-[var(--c-text-primary)] placeholder-[var(--c-text-muted)] transition-all duration-200 focus:border-[var(--c-accent)] focus:shadow-[3px_3px_0_var(--c-accent)] focus:outline-none text-sm font-medium";

  return (
    <div className="min-h-screen bg-[var(--c-bg-secondary)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Bold shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--c-yellow)] opacity-20 rotate-12 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[var(--c-coral)] opacity-15 rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 mb-10"
        >
          <div className="w-10 h-10 bg-[var(--c-accent)] flex items-center justify-center border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)]">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[var(--c-text-primary)]">CAPS</span>
              <span className="text-[var(--c-accent)]">LOQUE</span>
            </span>
            <span className="text-[10px] text-[var(--c-text-muted)] -mt-0.5 tracking-wide">
              Resume Builder
            </span>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="bg-[var(--c-bg-surface)] border-3 border-[var(--c-border)] p-8 md:p-10 shadow-[6px_6px_0_var(--c-border)]">
          <div className="text-center mb-8">
            <span className="btn-pill text-xs mb-5 inline-flex">
              <Zap className="w-3.5 h-3.5" />
              {isSignUp ? "Join 50K+ users" : "Welcome back"}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--c-text-primary)] mb-2">
              {isSignUp ? "Create your account" : "Sign in to continue"}
            </h1>
            <p className="text-[var(--c-text-muted)] text-sm">
              {isSignUp
                ? "Start building your professional resume"
                : "Access your saved resumes and templates"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-500 flex items-center gap-3 text-red-600 shadow-[3px_3px_0_red]"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name (sign up only) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1.5">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--c-text-muted)] group-focus-within:text-[var(--c-accent)] transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClasses}
                    required={isSignUp}
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--c-text-muted)] group-focus-within:text-[var(--c-accent)] transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1.5">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--c-text-muted)] group-focus-within:text-[var(--c-accent)] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${inputClasses} !pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--c-text-muted)] hover:text-[var(--c-text-secondary)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--c-text-muted)] group-focus-within:text-[var(--c-accent)] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={inputClasses}
                    required={isSignUp}
                  />
                </div>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base font-bold mt-2 justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-[var(--c-text-muted)] text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
                className="text-[var(--c-accent)] font-bold hover:text-[var(--c-accent-light)] transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--c-text-muted)] hover:text-[var(--c-accent)] transition-colors text-sm"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   LOADING FALLBACK
   ============================================================ */
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[var(--c-bg-secondary)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[var(--c-accent)] border-t-transparent rounded-full animate-spin" />
        <div className="text-[var(--c-text-muted)] text-sm">Loading...</div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE EXPORT
   ============================================================ */
export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
