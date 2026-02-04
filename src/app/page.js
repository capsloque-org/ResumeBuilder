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

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#0f1d2f]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-[#dc2626]/20 rounded-full blur-xl"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Trusted by 50,000+ job seekers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Build Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#f97316]">
                Resume in Minutes
              </span>
            </h1>
            
            <p className="text-lg text-white/70 mb-8 max-w-lg">
              Create professional, ATS-friendly resumes that stand out. Our intuitive builder helps you craft the perfect resume to land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/builder">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[#dc2626] text-white font-semibold rounded-full hover:bg-[#b91c1c] transition-colors shadow-xl shadow-red-500/30"
                >
                  Create Your Resume
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/20">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/60 text-sm">Resumes Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-white/60 text-sm">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-white/60 text-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Rating
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Resume Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="border-t-4 border-[#1e3a5f] pt-4">
                  <div className="h-4 w-32 bg-slate-800 rounded mb-2" />
                  <div className="h-2 w-48 bg-slate-300 rounded mb-4" />
                  <div className="space-y-2 mb-4">
                    <div className="h-2 w-full bg-slate-100 rounded" />
                    <div className="h-2 w-5/6 bg-slate-100 rounded" />
                    <div className="h-2 w-4/6 bg-slate-100 rounded" />
                  </div>
                  <div className="h-3 w-24 bg-slate-800 rounded mb-2" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-100 rounded" />
                    <div className="h-2 w-5/6 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                ATS Optimized
              </motion.div>

              {/* Template Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg" />
                  <div className="w-8 h-8 bg-[#dc2626] rounded-lg" />
                  <div className="w-8 h-8 bg-slate-800 rounded-lg" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">3+ Templates</div>
                  <div className="text-xs text-slate-500">Professional Designs</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Layout,
      title: 'Professional Templates',
      description: 'Choose from our collection of ATS-friendly, professionally designed templates.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create a stunning resume in under 10 minutes with our intuitive editor.',
      color: 'bg-yellow-500'
    },
    {
      icon: Shield,
      title: 'ATS Optimized',
      description: 'Our resumes are optimized to pass Applicant Tracking Systems effortlessly.',
      color: 'bg-green-500'
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Download your resume as a PDF with perfect formatting every time.',
      color: 'bg-purple-500'
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Personalize colors, fonts, and layouts to match your style.',
      color: 'bg-pink-500'
    },
    {
      icon: Clock,
      title: 'Auto Save',
      description: 'Never lose your progress with automatic saving to local storage.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#dc2626]/10 text-[#dc2626] rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Everything You Need to Build
            <span className="text-[#dc2626]"> the Perfect Resume</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our powerful features make resume building effortless and professional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-200"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
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

// Templates Preview Section
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
    <section id="templates" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full text-sm font-medium mb-4">
            Templates
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Professional Templates for
            <span className="text-[#1e3a5f]"> Every Industry</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our carefully crafted templates designed to impress recruiters. Here&apos;s how your resume will look.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className={`h-72 bg-white ${template.color} border-t-4 relative overflow-hidden`}>
                  <template.preview />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#1e3a5f]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/builder?template=${template.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white text-[#1e3a5f] font-semibold rounded-full flex items-center gap-2 shadow-lg"
                      >
                        Use Template
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">{template.name}</h3>
                  <p className="text-slate-600 text-sm">{template.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/builder">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e3a5f] text-white font-semibold rounded-full hover:bg-[#2d4a6f] transition-colors"
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

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose a Template',
      description: 'Browse our collection of professional templates and pick the one that suits your style.',
      icon: Layout
    },
    {
      number: '02',
      title: 'Fill in Your Details',
      description: 'Add your information using our intuitive step-by-step editor with helpful guidance.',
      icon: FileText
    },
    {
      number: '03',
      title: 'Customize & Preview',
      description: 'Personalize your resume and see real-time changes in the live preview.',
      icon: Palette
    },
    {
      number: '04',
      title: 'Download & Apply',
      description: 'Export your polished resume as a PDF and start applying to your dream jobs.',
      icon: Download
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Create Your Resume in
            <span className="text-green-600"> 4 Simple Steps</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our streamlined process makes resume building quick and effortless.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent -translate-x-8" />
              )}
              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-[#1e3a5f]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#dc2626] text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
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
    <section id="testimonials" className="py-20 lg:py-32 bg-gradient-to-br from-[#1e3a5f] to-[#0f1d2f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Loved by Job Seekers
            <span className="text-[#dc2626]"> Worldwide</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            See what our users have to say about their experience with ResumeForge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-6">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#dc2626] to-[#f97316] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#dc2626]/10 rounded-full mb-6">
            <Briefcase className="w-10 h-10 text-[#dc2626]" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Ready to Land Your
            <span className="text-[#dc2626]"> Dream Job?</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who have used ResumeForge to create winning resumes. Start building yours today — it is free!
          </p>
          <Link href="/builder">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#dc2626] text-white text-lg font-semibold rounded-full hover:bg-[#b91c1c] transition-colors shadow-xl shadow-red-500/30"
            >
              Start Building for Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          {/* <p className="mt-4 text-slate-500 text-sm">No sign-up required • 100% Free</p> */}
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
