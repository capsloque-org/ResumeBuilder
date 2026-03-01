"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  X,
  PanelRightOpen,
  PanelRightClose,
  FileText,
} from "lucide-react";
import { ResumeProvider, useResume } from "../context/ResumeContext";
import Editor from "../components/Editor";
import ResumePreview from "../components/ResumePreview";
import TemplateSwitcher from "../components/TemplateSwitcher";
import Navbar from "../components/Navbar";

function ResumeBuilder() {
  const [templateSidebarOpen, setTemplateSidebarOpen] = useState(false);
  const [templateSidebarTab, setTemplateSidebarTab] = useState("reorder");
  const [showPreview, setShowPreview] = useState(true);
  const { loadProgress, setActiveTemplate } = useResume();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadProgress();
      const templateParam = searchParams.get("template");
      if (
        templateParam &&
        ["minimalist", "modern", "executive"].includes(templateParam)
      ) {
        setActiveTemplate(templateParam, true);
      }
      setInitialized(true);
    };
    if (!initialized) init();
  }, [loadProgress, searchParams, setActiveTemplate, initialized]);

  const handleBack = () => router.push("/");

  const handleOpenPreview = () => {
    setShowPreview(true);
    setTemplateSidebarTab("reorder");
    setTemplateSidebarOpen(true);
  };

  const handleOpenTemplates = () => {
    setTemplateSidebarTab("templates");
    setTemplateSidebarOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-[#111111] overflow-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content — below navbar */}
      <main className="flex-1 flex pt-14 relative z-10 overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`${showPreview ? "hidden lg:flex lg:w-[48%] xl:w-[45%]" : "w-full"} h-full overflow-hidden transition-all duration-300`}
        >
          <Editor onBack={handleBack} onPreview={handleOpenPreview} />
        </div>

        {/* Preview Panel — Right Side */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="hidden lg:flex flex-col flex-1 bg-[#e8e8e8] border-l-2 border-[var(--c-border)] overflow-hidden relative"
            >
              {/* Preview Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all rounded"
                    title="Close preview"
                  >
                    <PanelRightClose className="w-3.5 h-3.5" />
                    Hide
                  </button>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs font-semibold text-slate-500">
                    Live Preview
                  </span>
                </div>
                <button
                  onClick={handleOpenTemplates}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[var(--c-accent)] hover:bg-blue-50 transition-all rounded"
                >
                  <Palette className="w-3.5 h-3.5" />
                  Templates
                </button>
              </div>

              <ResumePreview onOpenTemplate={handleOpenTemplates} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Preview Button (when preview is hidden) */}
        {!showPreview && (
          <button
            onClick={() => setShowPreview(true)}
            className="hidden lg:flex fixed right-4 bottom-6 z-30 items-center gap-2 px-4 py-2.5 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--c-border)] transition-all"
          >
            <PanelRightOpen className="w-4 h-4" />
            Show Preview
          </button>
        )}

        {/* Template Sidebar (Desktop) */}
        <div className="hidden lg:block no-print">
          <TemplateSwitcher
            isOpen={templateSidebarOpen}
            onClose={() => setTemplateSidebarOpen(false)}
            initialTab={templateSidebarTab}
          />
        </div>
      </main>

      {/* Mobile Toggle Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-white/15 p-3 lg:hidden no-print z-30">
        <div className="flex gap-2 max-w-md mx-auto">
          <button
            onClick={() => setShowPreview(false)}
            className={`flex-1 py-3 px-4 text-sm font-bold transition-all ${
              !showPreview
                ? "bg-[var(--c-accent)] text-white border-2 border-[var(--c-border)] shadow-[2px_2px_0_var(--c-border)]"
                : "bg-white/8 text-slate-500 border border-white/10"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={`flex-1 py-3 px-4 text-sm font-bold transition-all ${
              showPreview
                ? "bg-[var(--c-accent)] text-white border-2 border-[var(--c-border)] shadow-[2px_2px_0_var(--c-border)]"
                : "bg-white/8 text-slate-500 border border-white/10"
            }`}
          >
            Preview
          </button>
          <button
            onClick={handleOpenTemplates}
            className="py-3 px-4 bg-white/8 text-slate-400 border border-white/10 hover:text-white transition-all"
          >
            <Palette className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Template Sidebar */}
      <div className="lg:hidden no-print">
        <TemplateSwitcher
          isOpen={templateSidebarOpen}
          onClose={() => setTemplateSidebarOpen(false)}
          initialTab={templateSidebarTab}
        />
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="h-screen bg-[#111111] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="relative">
          <div className="w-12 h-12 border-3 border-white/10" />
          <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-t-[var(--c-accent)] animate-spin" />
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-sm">Loading Builder</div>
          <div className="text-slate-600 text-xs mt-1">
            Preparing your workspace...
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <ResumeProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <ResumeBuilder />
      </Suspense>
    </ResumeProvider>
  );
}
