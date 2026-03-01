"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Save,
  FileText,
  Menu,
  X,
  ArrowLeft,
  LogOut,
  User,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useResume } from "../context/ResumeContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const { saveProgress, isSaving } = useResume();
  const { data: session } = useSession();

  const handleSave = async () => {
    await saveProgress();
    setSaveMessage("Saved!");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-3 border-[var(--c-border)] shadow-[0_3px_0_var(--c-border)] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Back + Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <motion.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-8 h-8 border-2 border-[var(--c-border)] bg-[var(--c-bg-secondary)] hover:bg-[var(--c-bg-tertiary)] transition-colors"
                title="Back to Home"
              >
                <ArrowLeft className="w-4 h-4 text-[var(--c-text-primary)]" />
              </motion.button>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[var(--c-accent)] flex items-center justify-center border-2 border-[var(--c-border)]">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-[var(--c-text-primary)]">CAPS</span>
                <span className="text-[var(--c-accent)]">LOQUE</span>
              </span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user && (
              <span className="text-xs font-semibold text-[var(--c-text-muted)] uppercase tracking-wide">
                <User className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                {session.user.name || session.user.email?.split("@")[0]}
              </span>
            )}

            <div className="flex items-center gap-2">
              <AnimatePresence>
                {saveMessage && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="flex items-center gap-1 text-xs font-bold text-green-600"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {saveMessage}
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--c-border)] transition-all disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {isSaving ? "Saving..." : "Save"}
              </motion.button>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="p-1.5 text-[var(--c-text-muted)] hover:text-[var(--c-text-primary)] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--c-text-primary)]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t-2 border-[var(--c-border)]"
          >
            <div className="px-4 py-4 space-y-3">
              {session?.user && (
                <div className="flex items-center gap-2 px-3 py-2 text-[var(--c-text-muted)] text-xs font-semibold uppercase tracking-wide">
                  <User className="w-3.5 h-3.5" />
                  {session.user.name || session.user.email}
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Progress"}
              </button>
              {saveMessage && (
                <p className="text-center text-xs text-green-600 font-bold flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {saveMessage}
                </p>
              )}

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[var(--c-text-primary)] text-sm font-bold border-2 border-[var(--c-border)] transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
