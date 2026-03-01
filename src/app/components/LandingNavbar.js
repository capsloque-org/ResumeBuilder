"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Menu, X, FileText, LogOut, User, ArrowRight } from "lucide-react";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Templates", href: "#templates" },
    { name: "How It Works", href: "#showcase" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[var(--c-bg-surface)] border-b-3 border-[var(--c-border)] shadow-[0_3px_0_var(--c-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 flex items-center justify-center bg-[var(--c-accent)] border-2 border-[var(--c-border)] transition-colors">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              <span className="text-[var(--c-text-primary)]">CAPS</span>
              <span className="text-[var(--c-accent)]">LOQUE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-bold tracking-wide transition-colors text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)] hover:bg-[var(--c-bg-tertiary)]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-24 h-10 bg-[var(--c-bg-tertiary)] border-2 border-[var(--c-border)] animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[var(--c-text-secondary)]">
                  <User className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  {session.user.name || session.user.email?.split("@")[0]}
                </span>
                <Link
                  href="/builder"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] hover:shadow-[1px_1px_0_var(--c-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  My Resume
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 transition-all text-[var(--c-text-muted)] hover:text-[var(--c-text-primary)]"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2.5 text-sm font-bold transition-all text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] hover:shadow-[1px_1px_0_var(--c-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors text-[var(--c-text-primary)]"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={
          isMobileMenuOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        className="lg:hidden overflow-hidden bg-[var(--c-bg-surface)] border-t-2 border-[var(--c-border)]"
      >
        <div className="px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)] hover:bg-[var(--c-bg-tertiary)] font-bold text-sm transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-4 mt-3 border-t-2 border-[var(--c-border)] space-y-3">
            {session?.user ? (
              <>
                <div className="px-4 py-1.5 text-[var(--c-text-muted)] text-xs font-semibold flex items-center gap-2 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5" />
                  {session.user.name || session.user.email}
                </div>
                <Link
                  href="/builder"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] transition-all"
                >
                  My Resume
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full px-6 py-3 bg-[var(--c-bg-tertiary)] text-[var(--c-text-primary)] text-sm font-bold border-2 border-[var(--c-border)] transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 text-[var(--c-text-primary)] text-sm font-bold border-2 border-[var(--c-border)] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
