'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Download, Maximize2, Minimize2, Eye, EyeOff } from 'lucide-react';
import { ResumeProvider, useResume } from '../context/ResumeContext';
import Navbar from '../components/Navbar';
import Editor from '../components/Editor';
import ResumePreview from '../components/ResumePreview';
import TemplateSwitcher from '../components/TemplateSwitcher';

function ResumeBuilder() {
  const [templateSidebarOpen, setTemplateSidebarOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMinimized, setPreviewMinimized] = useState(false);
  const { loadProgress, setActiveTemplate } = useResume();
  const searchParams = useSearchParams();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadProgress();

      // Check if template is specified in URL (only on first load)
      const templateParam = searchParams.get('template');
      if (templateParam && ['minimalist', 'modern', 'executive'].includes(templateParam)) {
        setActiveTemplate(templateParam, true); // skipSave = true for URL param
      }
      setInitialized(true);
    };

    if (!initialized) {
      init();
    }
  }, [loadProgress, searchParams, setActiveTemplate, initialized]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Editor Section */}
          <div className={`${previewMinimized ? 'w-full' : 'w-full lg:w-1/2'} p-4 lg:p-6 overflow-hidden ${showPreview ? 'hidden lg:block' : ''} no-print transition-all duration-300`}>
            <Editor />
          </div>

          {/* Preview Section */}
          <AnimatePresence>
            {!previewMinimized && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '50%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-slate-200 overflow-hidden relative ${!showPreview ? 'hidden lg:block' : 'w-full'}`}
              >
                {/* Minimize Button */}
                <button
                  onClick={() => setPreviewMinimized(true)}
                  className="absolute bg-gray-300 top-4 left-4 z-20 p-2 border border-red-600 rounded-lg shadow-md hover:bg-slate-100 transition-colors hidden lg:flex items-center gap-2"
                  title="Minimize preview"
                >
                  <Minimize2 className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">Minimize</span>
                </button>
                <ResumePreview onOpenTemplate={() => setTemplateSidebarOpen(true)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimized Preview Bar (Desktop only) */}
          {previewMinimized && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              className="hidden lg:flex flex-col items-center bg-slate-200 border-l border-slate-300"
            >
              <button
                onClick={() => setPreviewMinimized(false)}
                className="mt-4 p-3 bg-gray-300 border border-red-600 rounded-lg shadow-md hover:bg-slate-100 transition-colors flex flex-col items-center gap-2"
                title="Expand preview"
              >
                <Maximize2 className="w-5 h-5 text-red-600" />
                <span className="text-xs text-red-600 writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>Preview</span>
              </button>
            </motion.div>
          )}

          {/* Template Sidebar (Desktop) */}
          <div className="hidden lg:block no-print">
            <TemplateSwitcher
              isOpen={templateSidebarOpen}
              onClose={() => setTemplateSidebarOpen(false)}
            />
          </div>
        </div>

        {/* Mobile Toggle Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#1e3a5f] p-3 lg:hidden no-print z-30">
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${!showPreview
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-slate-100 text-slate-600'
                }`}
            >
              Editor
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${showPreview
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-slate-100 text-slate-600'
                }`}
            >
              Preview
            </button>
            <button
              onClick={() => setTemplateSidebarOpen(true)}
              className="py-2 px-4 bg-[#dc2626] text-white rounded-lg"
            >
              <Palette className="w-5 h-5" />
            </button>
          </div>
        </div>



        {/* Mobile Download Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTemplateSidebarOpen(true)}
          className="lg:hidden fixed bottom-20 right-4 flex items-center justify-center w-14 h-14 bg-[#dc2626] text-white rounded-full shadow-lg no-print z-30"
        >
          <Download className="w-6 h-6" />
        </motion.button>
      </main>

      {/* Mobile Template Sidebar */}
      <div className="lg:hidden no-print">
        <TemplateSwitcher
          isOpen={templateSidebarOpen}
          onClose={() => setTemplateSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <ResumeProvider>
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="text-slate-500">Loading...</div></div>}>
        <ResumeBuilder />
      </Suspense>
    </ResumeProvider>
  );
}
