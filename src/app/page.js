'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText, ArrowRight, Sparkles, Shield, Zap, Download,
  Layout, Palette, Clock, CheckCircle2, Star, Users,
  ChevronRight, Play, Award, Target, Briefcase
} from 'lucide-react';
import LandingNavbar from './components/LandingNavbar';
import Footer from './components/Footer';

// Animated Background Orbs
function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
}

// Hero Section - Premium Version
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      <AnimatedOrbs />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full text-white/90 text-sm mb-8 border border-white/10"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
              <span className="font-medium">Trusted by 50,000+ job seekers</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Build Your Perfect
              <motion.span
                className="block gradient-text mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Resume in Minutes
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg lg:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
            >
              Create professional, ATS-friendly resumes that stand out. Our intuitive builder helps you craft the perfect resume to land your dream job.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <Link href="/builder">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 premium-btn text-white font-semibold rounded-full text-lg"
                >
                  Create Your Resume
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-full border border-white/20 transition-all"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8"
            >
              {[
                { value: '50K+', label: 'Resumes Created' },
                { value: '95%', label: 'Success Rate' },
                { value: '4.9', label: 'Rating', hasIcon: true },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/50 text-sm flex items-center gap-1 justify-center sm:justify-start">
                    {stat.hasIcon && <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />}
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-3xl scale-110 opacity-50" />

              {/* Main Resume Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-500"
              >
                <div className="border-t-4 border-[#1e3a5f] pt-6">
                  <div className="h-5 w-36 bg-slate-800 rounded mb-3" />
                  <div className="h-3 w-52 bg-slate-300 rounded mb-5" />
                  <div className="space-y-2.5 mb-5">
                    <div className="h-2.5 w-full bg-slate-100 rounded" />
                    <div className="h-2.5 w-5/6 bg-slate-100 rounded" />
                    <div className="h-2.5 w-4/6 bg-slate-100 rounded" />
                  </div>
                  <div className="h-4 w-28 bg-slate-800 rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-2.5 w-full bg-slate-100 rounded" />
                    <div className="h-2.5 w-5/6 bg-slate-100 rounded" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                ATS Optimized
              </motion.div>

              {/* Template Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-6 -left-6 premium-glass-light rounded-2xl shadow-xl p-5 flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-xl shadow-lg" />
                  <div className="w-10 h-10 bg-gradient-to-br from-[#dc2626] to-[#ef4444] rounded-xl shadow-lg" />
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl shadow-lg" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">3+ Templates</div>
                  <div className="text-xs text-slate-500">Professional Designs</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Features Section - Premium
function FeaturesSection() {
  const features = [
    {
      icon: Layout,
      title: 'Professional Templates',
      description: 'Choose from our collection of ATS-friendly, professionally designed templates.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create a stunning resume in under 10 minutes with our intuitive editor.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'ATS Optimized',
      description: 'Our resumes are optimized to pass Applicant Tracking Systems effortlessly.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Download your resume as a PDF with perfect formatting every time.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Personalize colors, fonts, and layouts to match your style.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Clock,
      title: 'Auto Save',
      description: 'Never lose your progress with automatic saving to local storage.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-red-50 text-[#dc2626] rounded-full text-sm font-semibold mb-6 border border-red-100"
          >
            Features
          </motion.span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Everything You Need to Build
            <span className="gradient-text block mt-2">the Perfect Resume</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Our powerful features make resume building effortless and professional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="feature-card h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sample resume data for preview
const sampleResumeData = {
  name: 'Sarah Johnson',
  title: 'Senior Software Engineer',
  email: 'sarah.johnson@email.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Passionate software engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies.',
  experience: [
    { company: 'TechCorp Inc.', position: 'Senior Software Engineer', date: '2022 - Present' },
    { company: 'StartupXYZ', position: 'Software Engineer', date: '2019 - 2022' }
  ],
  education: { school: 'Stanford University', degree: 'B.S. Computer Science', year: '2019' },
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Python']
};

// Minimalist Template Preview
function MinimalistPreview() {
  return (
    <div className="h-full p-4 font-serif text-slate-800 text-[10px] leading-relaxed overflow-hidden">
      <header className="text-center border-b-2 border-slate-800 pb-2 mb-3">
        <h1 className="text-sm font-bold uppercase tracking-wide">{sampleResumeData.name}</h1>
        <p className="text-[8px] text-slate-600">{sampleResumeData.email} • {sampleResumeData.phone} • {sampleResumeData.location}</p>
      </header>
      <section className="mb-2">
        <h2 className="text-[9px] font-bold uppercase tracking-wide border-b border-slate-300 pb-0.5 mb-1">Summary</h2>
        <p className="text-[8px] text-slate-700 line-clamp-2">{sampleResumeData.summary}</p>
      </section>
      <section className="mb-2">
        <h2 className="text-[9px] font-bold uppercase tracking-wide border-b border-slate-300 pb-0.5 mb-1">Experience</h2>
        {sampleResumeData.experience.map((exp, i) => (
          <div key={i} className="mb-1">
            <div className="flex justify-between">
              <span className="font-semibold text-[8px]">{exp.position}</span>
              <span className="text-[7px] text-slate-500">{exp.date}</span>
            </div>
            <p className="text-[7px] text-slate-600">{exp.company}</p>
          </div>
        ))}
      </section>
      <section className="mb-2">
        <h2 className="text-[9px] font-bold uppercase tracking-wide border-b border-slate-300 pb-0.5 mb-1">Education</h2>
        <p className="text-[8px] font-semibold">{sampleResumeData.education.school}</p>
        <p className="text-[7px] text-slate-600">{sampleResumeData.education.degree}, {sampleResumeData.education.year}</p>
      </section>
      <section>
        <h2 className="text-[9px] font-bold uppercase tracking-wide border-b border-slate-300 pb-0.5 mb-1">Skills</h2>
        <p className="text-[8px] text-slate-700">{sampleResumeData.skills.join(' • ')}</p>
      </section>
    </div>
  );
}

// Modern Template Preview
function ModernPreview() {
  return (
    <div className="h-full p-4 text-slate-800 text-[10px] leading-relaxed overflow-hidden">
      <header className="border-l-4 border-[#dc2626] pl-3 mb-3">
        <h1 className="text-sm font-bold text-[#1e3a5f]">{sampleResumeData.name}</h1>
        <p className="text-[9px] text-[#dc2626] font-medium">{sampleResumeData.title}</p>
        <p className="text-[7px] text-slate-500">{sampleResumeData.email} • {sampleResumeData.location}</p>
      </header>
      <section className="mb-2">
        <h2 className="text-[9px] font-bold text-[#1e3a5f] uppercase flex items-center gap-1 mb-1">
          <span className="w-4 h-0.5 bg-[#dc2626]"></span>About
        </h2>
        <p className="text-[8px] text-slate-600 line-clamp-2">{sampleResumeData.summary}</p>
      </section>
      <section className="mb-2">
        <h2 className="text-[9px] font-bold text-[#1e3a5f] uppercase flex items-center gap-1 mb-1">
          <span className="w-4 h-0.5 bg-[#dc2626]"></span>Experience
        </h2>
        {sampleResumeData.experience.map((exp, i) => (
          <div key={i} className="mb-1 pl-2 border-l border-slate-200">
            <span className="font-semibold text-[8px] text-[#1e3a5f]">{exp.position}</span>
            <p className="text-[7px] text-slate-600">{exp.company} • {exp.date}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-[9px] font-bold text-[#1e3a5f] uppercase flex items-center gap-1 mb-1">
          <span className="w-4 h-0.5 bg-[#dc2626]"></span>Skills
        </h2>
        <div className="flex flex-wrap gap-1">
          {sampleResumeData.skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-[7px] rounded">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

// Executive Template Preview
function ExecutivePreview() {
  return (
    <div className="h-full p-4 text-slate-800 text-[10px] leading-relaxed overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <header className="text-center border-b-2 border-double border-slate-800 pb-2 mb-3">
        <h1 className="text-sm font-bold tracking-widest uppercase">{sampleResumeData.name}</h1>
        <p className="text-[9px] text-slate-600 tracking-wide">{sampleResumeData.title}</p>
        <p className="text-[7px] text-slate-500 mt-1">{sampleResumeData.email} | {sampleResumeData.phone}</p>
      </header>
      <section className="mb-2">
        <h2 className="text-[9px] font-bold uppercase tracking-widest text-center mb-1">
          <span className="border-b border-slate-400 pb-0.5">Professional Summary</span>
        </h2>
        <p className="text-[8px] text-slate-700 text-center italic line-clamp-2">{sampleResumeData.summary}</p>
      </section>
      <section className="mb-2">
        <h2 className="text-[9px] font-bold uppercase tracking-widest text-center mb-1">
          <span className="border-b border-slate-400 pb-0.5">Career History</span>
        </h2>
        {sampleResumeData.experience.map((exp, i) => (
          <div key={i} className="mb-1 text-center">
            <p className="font-semibold text-[8px]">{exp.position}</p>
            <p className="text-[7px] text-slate-600">{exp.company} | {exp.date}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-[9px] font-bold uppercase tracking-widest text-center mb-1">
          <span className="border-b border-slate-400 pb-0.5">Core Competencies</span>
        </h2>
        <p className="text-[8px] text-slate-700 text-center">{sampleResumeData.skills.join(' | ')}</p>
      </section>
    </div>
  );
}

// Templates Preview Section - Premium
function TemplatesSection() {
  const templates = [
    {
      id: 'minimalist',
      name: 'Minimalist',
      color: 'border-t-slate-800',
      description: 'Clean Harvard-style format',
      preview: MinimalistPreview
    },
    {
      id: 'modern',
      name: 'Modern',
      color: 'border-t-[#1e3a5f]',
      description: 'Contemporary with accent colors',
      preview: ModernPreview
    },
    {
      id: 'executive',
      name: 'Executive',
      color: 'border-t-slate-800 border-double',
      description: 'Professional and elegant',
      preview: ExecutivePreview
    },
  ];

  return (
    <section id="templates" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-blue-50 text-[#1e3a5f] rounded-full text-sm font-semibold mb-6 border border-blue-100"
          >
            Templates
          </motion.span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Professional Templates for
            <span className="text-[#1e3a5f] block mt-2">Every Industry</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from our carefully crafted templates designed to impress recruiters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                className="template-card"
              >
                <div className={`h-80 bg-white ${template.color} border-t-4 relative overflow-hidden`}>
                  <template.preview />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-[#1e3a5f]/90 to-[#1e3a5f]/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                    <Link href={`/builder?template=${template.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-7 py-3.5 bg-white text-[#1e3a5f] font-bold rounded-full flex items-center gap-2 shadow-2xl"
                      >
                        Use Template
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
                <div className="p-7 bg-white">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{template.name}</h3>
                  <p className="text-slate-600">{template.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link href="/builder">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-shadow"
            >
              Try All Templates
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// How It Works Section - Premium
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose a Template',
      description: 'Browse our collection of professional templates and pick the one that suits your style.',
      icon: Layout,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Fill in Your Details',
      description: 'Add your information using our intuitive step-by-step editor with helpful guidance.',
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Customize & Preview',
      description: 'Personalize your resume and see real-time changes in the live preview.',
      icon: Palette,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      number: '04',
      title: 'Download & Apply',
      description: 'Export your polished resume as a PDF and start applying to your dream jobs.',
      icon: Download,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6 border border-green-100"
          >
            How It Works
          </motion.span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Create Your Resume in
            <span className="text-green-600 block mt-2">4 Simple Steps</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Our streamlined process makes resume building quick and effortless.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 via-slate-300 to-transparent -translate-x-8 z-0" />
              )}
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center relative z-10"
              >
                <div className="relative inline-flex mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <span className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#dc2626] to-[#ef4444] text-white text-sm font-bold rounded-xl flex items-center justify-center shadow-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section - Premium
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      image: 'SJ',
      content: 'ResumeForge helped me land my dream job! The templates are professional and the editor is so easy to use. Highly recommended!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Manager',
      image: 'MC',
      content: 'I created a stunning resume in just 15 minutes. The ATS optimization feature gave me confidence that my resume would get noticed.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer at Meta',
      image: 'ER',
      content: 'The real-time preview feature is amazing! I could see exactly how my resume looked while editing. Best resume builder I have used.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32 hero-bg relative overflow-hidden">
      <AnimatedOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-semibold mb-6 border border-white/10"
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Loved by Job Seekers
            <span className="gradient-text block mt-2">Worldwide</span>
          </h2>
          <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
            See what our users have to say about their experience with CAPSLOQUE.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="testimonial-card h-full"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-white/90 mb-8 leading-relaxed text-lg">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="avatar-ring">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#dc2626] to-[#f97316] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.image}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section - Premium
function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-100 to-orange-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#dc2626] to-[#f97316] rounded-3xl mb-8 shadow-2xl"
          >
            <Briefcase className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-8">
            Ready to Land Your
            <span className="gradient-text block mt-2">Dream Job?</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful job seekers who have used CAPSLOQUE to create winning resumes. Start building yours today — it&apos;s free!
          </p>
          <Link href="/builder">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-5 premium-btn text-white text-lg font-bold rounded-full"
            >
              Start Building for Free
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
