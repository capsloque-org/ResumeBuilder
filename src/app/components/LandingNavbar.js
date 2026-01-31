'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Menu, X, FileText, LogOut, User } from 'lucide-react';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">
              <span className="text-slate-800">CAPS</span>
              <span className="text-[#dc2626]">LOQUE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors hover:text-[#dc2626] ${
                  isScrolled ? 'text-slate-600' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {status === 'loading' ? (
              <div className="w-24 h-10 bg-slate-200 rounded-full animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isScrolled ? 'bg-slate-100' : 'bg-white/10'}`}>
                  <User className={`w-4 h-4 ${isScrolled ? 'text-slate-600' : 'text-white'}`} />
                  <span className={`text-sm font-medium ${isScrolled ? 'text-slate-700' : 'text-white'}`}>
                    {session.user.name || session.user.email?.split('@')[0]}
                  </span>
                </div>
                <Link
                  href="/builder"
                  className="px-5 py-2.5 bg-[#1e3a5f] text-white font-semibold rounded-full hover:bg-[#2d4a6f] transition-colors"
                >
                  My Resume
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`p-2.5 rounded-full transition-colors ${
                    isScrolled ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-white'
                  }`}
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`px-5 py-2.5 font-semibold rounded-full transition-colors ${
                    isScrolled 
                      ? 'text-slate-700 hover:bg-slate-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/login"
                  className="px-6 py-2.5 bg-[#dc2626] text-white font-semibold rounded-full hover:bg-[#b91c1c] transition-colors shadow-lg shadow-red-500/25"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-slate-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden overflow-hidden bg-white"
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-slate-600 hover:text-[#dc2626] hover:bg-slate-50 rounded-lg font-medium"
            >
              {link.name}
            </a>
          ))}
          {session?.user ? (
            <>
              <div className="px-4 py-2 text-slate-500 text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                Signed in as {session.user.name || session.user.email}
              </div>
              <Link
                href="/builder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 bg-[#1e3a5f] text-white font-semibold rounded-full hover:bg-[#2d4a6f] transition-colors"
              >
                My Resume
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="block w-full text-center px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-full hover:bg-slate-200 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-full hover:bg-slate-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 bg-[#dc2626] text-white font-semibold rounded-full hover:bg-[#b91c1c] transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
