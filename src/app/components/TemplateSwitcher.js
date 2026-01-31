'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Sparkles, Award, X, Download, ChevronUp, ChevronDown, GripVertical, Loader2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const templates = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean Harvard-style format',
    icon: Layout,
    preview: 'bg-white border-t-4 border-slate-800'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary with accent colors',
    icon: Sparkles,
    preview: 'bg-white border-t-4 border-[#1e3a5f]'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional and elegant',
    icon: Award,
    preview: 'bg-white border-t-4 border-double border-slate-800'
  }
];

const sectionNames = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects'
};

export default function TemplateSwitcher({ isOpen, onClose }) {
  const { activeTemplate, setActiveTemplate, resumeData, moveSectionUp, moveSectionDown } = useResume();
  const sectionOrder = resumeData.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);

    try {
      const element = document.getElementById('resume-preview');
      if (!element) {
        throw new Error('Resume preview element not found');
      }

      // Create a wrapper div that will be our print target
      const printContainer = document.createElement('div');
      printContainer.id = 'print-container';
      printContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 999999;
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;
      `;

      // Clone the resume
      const clone = element.cloneNode(true);
      clone.style.cssText = `
        transform: none;
        width: 210mm;
        min-height: 297mm;
        box-shadow: none;
        margin: 0;
        background: white;
      `;

      printContainer.appendChild(clone);
      document.body.appendChild(printContainer);

      // Small delay then print
      await new Promise(resolve => setTimeout(resolve, 100));
      window.print();

      // Remove the container after print dialog
      setTimeout(() => {
        if (document.body.contains(printContainer)) {
          document.body.removeChild(printContainer);
        }
      }, 500);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert(`PDF generation failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed right-0 top-0 h-full w-80 bg-white border-l-2 border-[#1e3a5f] shadow-xl z-50 
          ${isOpen ? 'lg:relative lg:translate-x-0' : 'lg:hidden'}`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Templates</h2>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Template Options */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Templates Section */}
            <div className="space-y-3">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTemplate(template.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${activeTemplate === template.id
                      ? 'border-[#dc2626] bg-red-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-16 rounded ${template.preview} shadow-sm flex-shrink-0`}>
                      <div className="p-1 space-y-1">
                        <div className="h-1 bg-slate-300 rounded w-8 mx-auto mt-2"></div>
                        <div className="h-0.5 bg-slate-200 rounded w-6 mx-auto"></div>
                        <div className="h-0.5 bg-slate-200 rounded w-10 mx-auto"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <template.icon className={`w-4 h-4 ${activeTemplate === template.id ? 'text-[#dc2626]' : 'text-slate-500'
                          }`} />
                        <span className={`font-medium ${activeTemplate === template.id ? 'text-[#dc2626]' : 'text-slate-700'
                          }`}>
                          {template.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{template.description}</p>
                    </div>
                    {activeTemplate === template.id && (
                      <div className="w-5 h-5 rounded-full bg-[#dc2626] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Section Reorder */}
            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
                <GripVertical className="w-4 h-4" />
                Reorder Sections
              </h3>
              <div className="space-y-2">
                {sectionOrder.map((sectionId, index) => (
                  <div
                    key={sectionId}
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <span className="flex-1 text-sm font-medium text-slate-700">
                      {sectionNames[sectionId]}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveSectionUp(sectionId)}
                        disabled={index === 0}
                        className={`p-1 rounded transition-colors ${index === 0
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-slate-500 hover:text-[#1e3a5f] hover:bg-slate-200'
                          }`}
                        title="Move up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveSectionDown(sectionId)}
                        disabled={index === sectionOrder.length - 1}
                        className={`p-1 rounded transition-colors ${index === sectionOrder.length - 1
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-slate-500 hover:text-[#1e3a5f] hover:bg-slate-200'
                          }`}
                        title="Move down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-slate-200 space-y-3">
            <motion.button
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${isGenerating
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-[#dc2626] hover:bg-[#b91c1c]'
                } text-white`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download PDF
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
