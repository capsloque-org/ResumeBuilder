'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Save, FileText, Menu, X, ArrowLeft, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useResume } from '../context/ResumeContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const { saveProgress, isSaving } = useResume();
  const { data: session } = useSession();

  const handleSave = async () => {
    await saveProgress();
    setSaveMessage('Saved to cloud!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#1e3a5f] shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Back Button + Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5 text-[#1e3a5f]" />
              </motion.button>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-slate-800">CAPS</span>
                  <span className="text-[#dc2626]">LOQUE</span>
                </span>
                <span className="text-xs text-slate-500 -mt-1">Resume Builder</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* User Info */}
            {session?.user && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  {session.user.name || session.user.email?.split('@')[0]}
                </span>
              </div>
            )}
            
            <AnimatePresence>
              {(saveMessage || isSaving) && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={`text-sm font-medium ${isSaving ? 'text-slate-500' : 'text-green-600'}`}
                >
                  {isSaving ? 'Saving...' : saveMessage}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[#dc2626] text-white rounded-lg font-medium hover:bg-[#b91c1c] transition-colors shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Progress'}
            </motion.button>
            
            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1e3a5f] hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b-2 border-[#1e3a5f]"
          >
            <div className="px-4 py-4 space-y-3">
              {/* User Info Mobile */}
              {session?.user && (
                <div className="flex items-center gap-2 px-4 py-2 text-slate-500 text-sm">
                  <User className="w-4 h-4" />
                  Signed in as {session.user.name || session.user.email}
                </div>
              )}
              
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#dc2626] text-white rounded-lg font-medium hover:bg-[#b91c1c] transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </button>
              {saveMessage && (
                <p className="text-center text-sm text-green-600 font-medium">
                  {saveMessage}
                </p>
              )}
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
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
