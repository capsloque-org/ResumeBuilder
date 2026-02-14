'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { ResumeProvider, useResume } from '../context/ResumeContext';
import Editor from '../components/Editor';
import ResumePreview from '../components/ResumePreview';
import TemplateSwitcher from '../components/TemplateSwitcher';

function ResumeBuilder() {
    const [templateSidebarOpen, setTemplateSidebarOpen] = useState(false);
    const [templateSidebarTab, setTemplateSidebarTab] = useState('reorder');
    const [showPreview, setShowPreview] = useState(false);
    const { loadProgress, setActiveTemplate } = useResume();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const init = async () => {
            await loadProgress();

            // Check if template is specified in URL (only on first load)
            const templateParam = searchParams.get('template');
            if (templateParam && ['minimalist', 'modern', 'executive'].includes(templateParam)) {
                setActiveTemplate(templateParam, true);
            }
            setInitialized(true);
        };

        if (!initialized) {
            init();
        }
    }, [loadProgress, searchParams, setActiveTemplate, initialized]);

    const handleBack = () => {
        router.push('/');
    };

    const handleOpenPreview = () => {
        setShowPreview(true);
        setTemplateSidebarTab('reorder');
        setTemplateSidebarOpen(true);
    };

    const handleOpenTemplates = () => {
        setTemplateSidebarTab('templates');
        setTemplateSidebarOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#030712] relative overflow-hidden">
            {/* Premium background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Main Content */}
            <main className="h-screen flex relative z-10">
                {/* Editor Section */}
                <div className={`${showPreview ? 'hidden lg:block lg:w-1/2' : 'w-full'} h-full overflow-hidden transition-all duration-500`}>
                    <Editor onBack={handleBack} onPreview={handleOpenPreview} />
                </div>

                {/* Preview Section - Right Side */}
                <AnimatePresence>
                    {showPreview && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '50%', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="hidden lg:block bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative"
                        >
                            {/* Close Preview Button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowPreview(false)}
                                className="absolute top-4 left-4 z-20 p-2.5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-slate-200"
                                title="Close preview"
                            >
                                <X className="w-4 h-4 text-slate-600" />
                                <span className="text-sm font-medium text-slate-600">Close</span>
                            </motion.button>
                            <ResumePreview onOpenTemplate={handleOpenTemplates} />
                        </motion.div>
                    )}
                </AnimatePresence>

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
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f172a] to-[#0f172a]/95 backdrop-blur-xl border-t border-white/10 p-4 lg:hidden no-print z-30">
                <div className="flex gap-3 max-w-md mx-auto">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowPreview(false)}
                        className={`flex-1 py-3.5 px-4 rounded-xl font-semibold transition-all ${!showPreview
                            ? 'premium-btn text-white'
                            : 'bg-slate-800/80 text-slate-400 border border-slate-700'
                            }`}
                    >
                        Editor
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowPreview(true)}
                        className={`flex-1 py-3.5 px-4 rounded-xl font-semibold transition-all ${showPreview
                            ? 'premium-btn text-white'
                            : 'bg-slate-800/80 text-slate-400 border border-slate-700'
                            }`}
                    >
                        Preview
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenTemplates}
                        className="py-3.5 px-5 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white rounded-xl border border-white/10"
                    >
                        <Palette className="w-5 h-5" />
                    </motion.button>
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

// Premium Loading Spinner
function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6 relative z-10"
            >
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#dc2626]/30 rounded-full" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#dc2626] rounded-full animate-spin" />
                </div>
                <div className="text-center">
                    <div className="text-white font-semibold text-lg mb-1">Loading Resume Builder</div>
                    <div className="text-slate-500 text-sm">Preparing your workspace...</div>
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
