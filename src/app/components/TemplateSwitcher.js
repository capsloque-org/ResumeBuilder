"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Zap,
  Award,
  X,
  Download,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Loader2,
  Palette,
} from "lucide-react";
import { useResume } from "../context/ResumeContext";

const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean Harvard-style format",
    icon: Layout,
    preview: "bg-white border-t-4 border-slate-800",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary with accent colors",
    icon: Zap,
    preview: "bg-white border-t-4 border-[#1e3a5f]",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Professional and elegant",
    icon: Award,
    preview: "bg-white border-t-4 border-double border-slate-800",
  },
];

const sectionNames = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
};

export default function TemplateSwitcher({
  isOpen,
  onClose,
  initialTab = "templates",
}) {
  const {
    activeTemplate,
    setActiveTemplate,
    resumeData,
    moveSectionUp,
    moveSectionDown,
  } = useResume();
  const sectionOrder = resumeData.sectionOrder || [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
  ];
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync activeTab when initialTab prop changes (e.g. opened from different buttons)
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);

    try {
      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("Resume preview element not found");
      }

      // Create a wrapper div that will be our print target
      const printContainer = document.createElement("div");
      printContainer.id = "print-container";
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
      await new Promise((resolve) => setTimeout(resolve, 100));
      window.print();

      // Remove the container after print dialog
      setTimeout(() => {
        if (document.body.contains(printContainer)) {
          document.body.removeChild(printContainer);
        }
      }, 500);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert(`PDF generation failed: ${error.message || "Unknown error"}`);
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
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed right-0 top-0 h-full w-80 bg-white border-l-3 border-[var(--c-border)] shadow-[-4px_0_0_var(--c-border)] z-50 
          ${isOpen ? "lg:relative lg:translate-x-0" : "lg:hidden"}`}
      >
        <div className="h-full flex flex-col">
          {/* Header with Tabs */}
          <div className="border-b-2 border-[var(--c-border)]">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[var(--c-text-primary)]">
                {activeTab === "templates"
                  ? "Change Templates"
                  : "Reorder Sections"}
              </h2>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Tab Switcher */}
            <div className="flex px-4 pb-0">
              <button
                onClick={() => setActiveTab("reorder")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-bold border-b-2 transition-all ${
                  activeTab === "reorder"
                    ? "border-[var(--c-accent)] text-[var(--c-accent)]"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <GripVertical className="w-4 h-4" />
                Reorder
              </button>
              <button
                onClick={() => setActiveTab("templates")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-bold border-b-2 transition-all ${
                  activeTab === "templates"
                    ? "border-[var(--c-accent)] text-[var(--c-accent)]"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <Palette className="w-4 h-4" />
                Templates
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === "templates" ? (
              /* Templates Section */
              <div className="space-y-3">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTemplate(template.id)}
                    className={`w-full p-4 border-2 text-left transition-all ${
                      activeTemplate === template.id
                        ? "border-[var(--c-accent)] bg-[var(--c-accent)]/5 shadow-[3px_3px_0_var(--c-accent)]"
                        : "border-[var(--c-border)] hover:border-[var(--c-text-secondary)] bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-16 ${template.preview} flex-shrink-0`}
                      >
                        <div className="p-1 space-y-1">
                          <div className="h-1 bg-slate-300 rounded w-8 mx-auto mt-2"></div>
                          <div className="h-0.5 bg-slate-200 rounded w-6 mx-auto"></div>
                          <div className="h-0.5 bg-slate-200 rounded w-10 mx-auto"></div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <template.icon
                            className={`w-4 h-4 ${
                              activeTemplate === template.id
                                ? "text-[var(--c-accent)]"
                                : "text-slate-500"
                            }`}
                          />
                          <span
                            className={`font-bold ${
                              activeTemplate === template.id
                                ? "text-[var(--c-accent)]"
                                : "text-slate-700"
                            }`}
                          >
                            {template.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {template.description}
                        </p>
                      </div>
                      {activeTemplate === template.id && (
                        <div className="w-5 h-5 bg-[var(--c-accent)] flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Reorder Sections */
              <div>
                <p className="text-xs text-slate-500 mb-3">
                  Drag sections to reorder how they appear on your resume.
                </p>
                <div className="space-y-2">
                  {sectionOrder.map((sectionId, index) => (
                    <div
                      key={sectionId}
                      className="flex items-center gap-2 p-3 bg-[var(--c-bg-secondary)] border-2 border-[var(--c-border)]"
                    >
                      <GripVertical className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="flex-1 text-sm font-medium text-slate-700">
                        {sectionNames[sectionId]}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveSectionUp(sectionId)}
                          disabled={index === 0}
                          className={`p-1 transition-colors ${
                            index === 0
                              ? "text-slate-300 cursor-not-allowed"
                              : "text-slate-500 hover:text-[var(--c-accent)] hover:bg-[var(--c-bg-tertiary)]"
                          }`}
                          title="Move up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSectionDown(sectionId)}
                          disabled={index === sectionOrder.length - 1}
                          className={`p-1 transition-colors ${
                            index === sectionOrder.length - 1
                              ? "text-slate-300 cursor-not-allowed"
                              : "text-slate-500 hover:text-[var(--c-accent)] hover:bg-[var(--c-bg-tertiary)]"
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
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t-2 border-[var(--c-border)] space-y-3">
            <motion.button
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-bold transition-all ${
                isGenerating
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[var(--c-accent)] hover:translate-x-[1px] hover:translate-y-[1px] shadow-[3px_3px_0_var(--c-border)] hover:shadow-[2px_2px_0_var(--c-border)] border-2 border-[var(--c-border)]"
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
