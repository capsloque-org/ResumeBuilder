"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FileText,
  ArrowRight,
  Shield,
  Zap,
  Download,
  Layout,
  Palette,
  Clock,
  Star,
  Users,
  Award,
  Target,
  Eye,
  MousePointerClick,
  BarChart3,
  Check,
} from "lucide-react";
import LandingNavbar from "./components/LandingNavbar";
import Footer from "./components/Footer";

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ============================================================
   SECTION WRAPPER
   ============================================================ */
function Section({ children, className = "", id, alt = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 lg:py-32 ${alt ? "bg-[var(--c-bg-secondary)]" : "bg-[var(--c-bg-primary)]"} ${className}`}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ============================================================
   SECTION HEADER
   ============================================================ */
function SectionHeader({ badge, title, highlight, description }) {
  return (
    <motion.div
      variants={fadeUp}
      className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
    >
      {badge && (
        <span className="btn-pill text-xs mb-6 inline-flex">{badge}</span>
      )}
      <h2 className="text-3xl lg:text-5xl font-bold text-[var(--c-text-primary)] mb-5 tracking-tight">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-lg text-[var(--c-text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ============================================================
   HERO SECTION — Clean split layout (cobalt blue + white)
   ============================================================ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[var(--c-bg-primary)] overflow-hidden">
      {/* Dot grid */}
      <div className="dot-grid" />

      {/* Bold decorative shapes */}
      <div className="absolute top-1/3 right-[10%] w-32 h-32 bg-[var(--c-yellow)] border-3 border-[var(--c-border)] rotate-12 pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 left-[15%] w-24 h-24 bg-[var(--c-coral)] border-3 border-[var(--c-border)] rounded-full pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="btn-pill text-xs mb-8"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Trusted by 50,000+ job seekers</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold text-[var(--c-text-primary)] leading-[1.08] tracking-tight mb-6">
              Build Resumes That
              <span className="gradient-text block mt-1">Get You Hired.</span>
            </h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl text-[var(--c-text-secondary)] mb-10 max-w-xl leading-relaxed font-medium"
            >
              Create professional, ATS-optimized resumes in minutes. Choose from
              expert-designed templates and land your dream job.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <Link href="/builder">
                <button className="btn-primary text-lg px-8 py-4 font-bold w-full sm:w-auto">
                  Create Your Resume
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a href="#templates">
                <button className="btn-secondary text-lg px-8 py-4 font-bold w-full sm:w-auto">
                  <Eye className="w-5 h-5" />
                  View Templates
                </button>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-8"
            >
              {[
                { value: "50K+", label: "Resumes Created" },
                { value: "95%", label: "ATS Pass Rate" },
                { value: "4.9", label: "User Rating", icon: true },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--c-text-primary)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--c-text-muted)] flex items-center gap-1 mt-1">
                    {stat.icon && (
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    )}
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Resume mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-[var(--c-yellow)] opacity-20 rounded-none" />

            {/* Resume card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-[var(--c-bg-surface)] p-8 w-[340px] border-3 border-[var(--c-border)] shadow-[6px_6px_0_var(--c-border)]"
            >
              <div className="border-t-4 border-[var(--c-accent)] pt-5">
                <div className="h-5 w-36 bg-[var(--c-text-primary)] mb-2" />
                <div className="h-3 w-48 bg-[var(--c-text-muted)] mb-5" />
                <div className="space-y-2 mb-5">
                  <div className="h-2.5 w-full bg-[var(--c-bg-tertiary)]" />
                  <div className="h-2.5 w-5/6 bg-[var(--c-bg-tertiary)]" />
                  <div className="h-2.5 w-4/6 bg-[var(--c-bg-tertiary)]" />
                </div>
                <div className="h-4 w-24 bg-[var(--c-text-primary)] mb-3" />
                <div className="space-y-2 mb-5">
                  <div className="h-2.5 w-full bg-[var(--c-bg-tertiary)]" />
                  <div className="h-2.5 w-5/6 bg-[var(--c-bg-tertiary)]" />
                </div>
                <div className="h-4 w-20 bg-[var(--c-text-primary)] mb-3" />
                <div className="flex gap-2 flex-wrap">
                  {["React", "Node.js", "TypeScript", "AWS"].map((s) => (
                    <span
                      key={s}
                      className="text-[9px] px-2 py-1 bg-[var(--c-accent)] text-white border border-[var(--c-border)] font-bold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ATS Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -top-3 -right-3 bg-[var(--c-lime)] text-[var(--c-text-primary)] px-4 py-2 text-sm font-bold shadow-[3px_3px_0_var(--c-border)] border-2 border-[var(--c-border)] flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              ATS Optimized
            </motion.div>

            {/* Template count badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-[var(--c-bg-surface)] px-5 py-3 flex items-center gap-3 border-2 border-[var(--c-border)] shadow-[4px_4px_0_var(--c-border)]"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-[var(--c-accent)] border border-[var(--c-border)] shadow" />
                <div className="w-8 h-8 bg-[var(--c-coral)] border border-[var(--c-border)] shadow" />
                <div className="w-8 h-8 bg-[var(--c-yellow)] border border-[var(--c-border)] shadow" />
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--c-text-primary)]">
                  3+ Templates
                </div>
                <div className="text-[10px] text-[var(--c-text-muted)] font-bold">
                  Pro Designs
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LOGO CLOUD
   ============================================================ */
function LogoCloud() {
  const logos = [
    "Forbes",
    "TechCrunch",
    "Product Hunt",
    "G2",
    "Capterra",
    "Y Combinator",
    "Inc Magazine",
    "Fast Company",
  ];

  // Triple logos for ultra-smooth seamless loop
  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-[var(--c-bg-secondary)] border-y-3 border-[var(--c-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs text-[var(--c-text-muted)] tracking-widest uppercase font-bold">
          As featured in
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--c-bg-secondary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--c-bg-secondary)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="marquee-track">
          {tripleLogos.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 mx-10 lg:mx-16 px-6 py-3 bg-white/60 border-2 border-[var(--c-border)] shadow-[2px_2px_0_var(--c-border)] hover:shadow-[3px_3px_0_var(--c-border)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 cursor-default group"
            >
              <span className="text-[var(--c-text-primary)] font-black text-base lg:text-lg tracking-tight select-none group-hover:text-[var(--c-accent)] transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURES SECTION
   ============================================================ */
function FeaturesSection() {
  const features = [
    {
      icon: Layout,
      title: "Professional Templates",
      description:
        "Expert-designed, ATS-friendly templates that recruiters love. Every layout is optimized for readability.",
      color:
        "text-[var(--c-accent)] bg-[var(--c-accent)]/10 border-2 border-[var(--c-accent)]",
    },
    {
      icon: Zap,
      title: "Built in Minutes",
      description:
        "Intuitive step-by-step editor guides you through each section. Your resume is ready in under 10 minutes.",
      color:
        "text-[var(--c-yellow)] bg-[var(--c-yellow)]/15 border-2 border-[var(--c-yellow)]",
    },
    {
      icon: Shield,
      title: "ATS Optimized",
      description:
        "Every resume passes Applicant Tracking Systems. Clean formatting that machines and humans both love.",
      color:
        "text-[var(--c-lime)] bg-[var(--c-lime)]/15 border-2 border-[var(--c-lime)]",
    },
    {
      icon: Download,
      title: "PDF Export",
      description:
        "Download pixel-perfect PDF resumes instantly. What you see is exactly what recruiters get.",
      color:
        "text-[var(--c-violet)] bg-[var(--c-violet)]/15 border-2 border-[var(--c-violet)]",
    },
    {
      icon: Palette,
      title: "Fully Customizable",
      description:
        "Reorder sections, toggle visibility, and personalize every detail to match your unique career story.",
      color:
        "text-[var(--c-coral)] bg-[var(--c-coral)]/15 border-2 border-[var(--c-coral)]",
    },
    {
      icon: Clock,
      title: "Auto Save",
      description:
        "Your progress saves automatically to the cloud. Pick up right where you left off, on any device.",
      color: "text-teal-600 bg-teal-100 border-2 border-teal-600",
    },
  ];

  return (
    <Section id="features" alt>
      <SectionHeader
        badge="Features"
        title="Content-Focused Features"
        highlight="Developed to Get You Hired"
        description="Everything you need to build a resume that stands out in a stack of hundreds."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={fadeUp}
            className="feature-card group cursor-default"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center mb-5 ${feature.color} transition-transform group-hover:scale-110 duration-200`}
            >
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--c-text-primary)] mb-2">
              {feature.title}
            </h3>
            <p className="text-[var(--c-text-secondary)] text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   SHOWCASE SECTION
   ============================================================ */
function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "ATS Keyword Targeting",
      icon: Target,
      title: "Beat the ATS every time.",
      description:
        "Our templates and formatting are specifically designed to pass through Applicant Tracking Systems. Clean HTML-friendly structure, proper heading hierarchy, and keyword-optimized layouts.",
      features: [
        "Machine-readable formatting",
        "Proper section hierarchy",
        "Keyword-friendly structure",
        "Zero fancy graphics that break ATS",
      ],
    },
    {
      label: "Real-Time Preview",
      icon: Eye,
      title: "See changes as you type.",
      description:
        "Our live preview engine renders your resume in real-time as you edit. Switch between templates instantly and see exactly how your final PDF will look — no surprises.",
      features: [
        "Instant template switching",
        "Live content rendering",
        "Pixel-perfect PDF match",
        "Zoom & scroll controls",
      ],
    },
    {
      label: "Smart Editor",
      icon: MousePointerClick,
      title: "Guided, intelligent editing.",
      description:
        "The editor walks you through each section with clear labels, smart defaults, and formatting tools. Bold text, bullet points, and visibility toggles — all built-in.",
      features: [
        "Step-by-step section flow",
        "Rich text formatting",
        "Drag-to-reorder sections",
        "Field visibility toggles",
      ],
    },
  ];

  const active = tabs[activeTab];

  return (
    <Section id="showcase">
      <SectionHeader
        badge="How It Works"
        title="Every Detail,"
        highlight="Thoughtfully Crafted"
        description="Built for people who care about the details. Every feature is designed to make your resume better."
      />

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Tab buttons */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {tabs.map((tab, i) => (
            <motion.button
              key={tab.label}
              variants={fadeUp}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-4 p-5 text-left transition-all duration-200 border-2 ${
                activeTab === i
                  ? "bg-[var(--c-bg-tertiary)] border-[var(--c-accent)] shadow-[4px_4px_0_var(--c-accent)]"
                  : "bg-[var(--c-bg-surface)] border-[var(--c-border)] hover:border-[var(--c-text-muted)] hover:shadow-[2px_2px_0_var(--c-border)]"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                  activeTab === i
                    ? "bg-[var(--c-accent)] text-white border-2 border-[var(--c-border)]"
                    : "bg-[var(--c-bg-tertiary)] text-[var(--c-text-muted)] border-2 border-[var(--c-border)]"
                }`}
              >
                <tab.icon className="w-5 h-5" />
              </div>
              <div>
                <div
                  className={`font-semibold text-sm ${activeTab === i ? "text-[var(--c-accent)]" : "text-[var(--c-text-primary)]"}`}
                >
                  {tab.label}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Content panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3 bg-[var(--c-bg-surface)] border-2 border-[var(--c-border)] p-8 lg:p-10 shadow-[4px_4px_0_var(--c-border)]"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-[var(--c-text-primary)] mb-4 tracking-tight">
            {active.title}
          </h3>
          <p className="text-[var(--c-text-secondary)] leading-relaxed mb-8">
            {active.description}
          </p>
          <ul className="space-y-3">
            {active.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-[var(--c-text-secondary)]"
              >
                <div className="w-5 h-5 bg-[var(--c-accent)] flex items-center justify-center flex-shrink-0 border border-[var(--c-border)]">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}

/* ============================================================
   SAMPLE RESUME DATA
   ============================================================ */
const sampleData = {
  name: "Sarah Johnson",
  title: "Senior Software Engineer",
  email: "sarah@email.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  summary:
    "Passionate engineer with 5+ years building scalable web apps. Expert in React, Node.js, and cloud.",
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Engineer",
      date: "2022 — Present",
    },
    {
      company: "StartupXYZ",
      position: "Software Engineer",
      date: "2019 — 2022",
    },
  ],
  education: {
    school: "Stanford University",
    degree: "B.S. Computer Science",
    year: "2019",
  },
  skills: ["React", "Node.js", "TypeScript", "AWS", "Python"],
};

/* ============================================================
   TEMPLATE PREVIEWS
   ============================================================ */
function MinimalistMini() {
  return (
    <div className="p-5 font-serif text-slate-800 text-[10px] leading-relaxed h-full">
      <header className="text-center border-b-2 border-slate-800 pb-2 mb-3">
        <div className="text-sm font-bold uppercase tracking-wide">
          {sampleData.name}
        </div>
        <div className="text-[8px] text-slate-500 mt-0.5">
          {sampleData.email} &bull; {sampleData.phone} &bull;{" "}
          {sampleData.location}
        </div>
      </header>
      <section className="mb-2">
        <div className="text-[9px] font-bold uppercase tracking-wide border-b border-slate-300 pb-0.5 mb-1">
          Summary
        </div>
        <p className="text-[8px] text-slate-600 line-clamp-2">
          {sampleData.summary}
        </p>
      </section>
      <section className="mb-2">
        <div className="text-[9px] font-bold uppercase tracking-wide border-b border-slate-300 pb-0.5 mb-1">
          Experience
        </div>
        {sampleData.experience.map((e, i) => (
          <div key={i} className="mb-1">
            <div className="flex justify-between">
              <span className="font-semibold text-[8px]">{e.position}</span>
              <span className="text-[7px] text-slate-400">{e.date}</span>
            </div>
            <p className="text-[7px] text-slate-500">{e.company}</p>
          </div>
        ))}
      </section>
      <section>
        <div className="text-[9px] font-bold uppercase tracking-wide border-b border-slate-300 pb-0.5 mb-1">
          Skills
        </div>
        <p className="text-[8px] text-slate-600">
          {sampleData.skills.join(" • ")}
        </p>
      </section>
    </div>
  );
}

function ModernMini() {
  return (
    <div className="p-5 text-slate-800 text-[10px] leading-relaxed h-full">
      <header className="border-l-4 border-[var(--c-accent)] pl-3 mb-3">
        <div className="text-sm font-bold text-slate-900">
          {sampleData.name}
        </div>
        <div className="text-[9px] text-[var(--c-accent)] font-medium">
          {sampleData.title}
        </div>
        <div className="text-[7px] text-slate-400">
          {sampleData.email} &bull; {sampleData.location}
        </div>
      </header>
      <section className="mb-2">
        <div className="text-[9px] font-bold text-slate-900 uppercase flex items-center gap-1 mb-1">
          <span className="w-4 h-0.5 bg-[var(--c-accent)]" />
          About
        </div>
        <p className="text-[8px] text-slate-500 line-clamp-2">
          {sampleData.summary}
        </p>
      </section>
      <section className="mb-2">
        <div className="text-[9px] font-bold text-slate-900 uppercase flex items-center gap-1 mb-1">
          <span className="w-4 h-0.5 bg-[var(--c-accent)]" />
          Experience
        </div>
        {sampleData.experience.map((e, i) => (
          <div key={i} className="mb-1 pl-2 border-l border-slate-200">
            <span className="font-semibold text-[8px]">{e.position}</span>
            <p className="text-[7px] text-slate-500">
              {e.company} &bull; {e.date}
            </p>
          </div>
        ))}
      </section>
      <section>
        <div className="text-[9px] font-bold text-slate-900 uppercase flex items-center gap-1 mb-1">
          <span className="w-4 h-0.5 bg-[var(--c-accent)]" />
          Skills
        </div>
        <div className="flex flex-wrap gap-1">
          {sampleData.skills.slice(0, 4).map((s) => (
            <span
              key={s}
              className="px-1.5 py-0.5 bg-blue-50 text-[var(--c-accent)] text-[7px] rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function ExecutiveMini() {
  return (
    <div className="p-5 text-slate-800 text-[10px] leading-relaxed h-full bg-gradient-to-b from-slate-50 to-white">
      <header className="text-center border-b-2 border-double border-slate-800 pb-2 mb-3">
        <div className="text-sm font-bold tracking-[0.2em] uppercase">
          {sampleData.name}
        </div>
        <div className="text-[9px] text-slate-500 tracking-wide">
          {sampleData.title}
        </div>
        <div className="text-[7px] text-slate-400 mt-1">
          {sampleData.email} | {sampleData.phone}
        </div>
      </header>
      <section className="mb-2">
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-center mb-1">
          <span className="border-b border-slate-400 pb-0.5">
            Professional Summary
          </span>
        </div>
        <p className="text-[8px] text-slate-600 text-center italic line-clamp-2">
          {sampleData.summary}
        </p>
      </section>
      <section className="mb-2">
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-center mb-1">
          <span className="border-b border-slate-400 pb-0.5">
            Career History
          </span>
        </div>
        {sampleData.experience.map((e, i) => (
          <div key={i} className="mb-1 text-center">
            <p className="font-semibold text-[8px]">{e.position}</p>
            <p className="text-[7px] text-slate-500">
              {e.company} | {e.date}
            </p>
          </div>
        ))}
      </section>
      <section>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-center mb-1">
          <span className="border-b border-slate-400 pb-0.5">
            Core Competencies
          </span>
        </div>
        <p className="text-[8px] text-slate-600 text-center">
          {sampleData.skills.join(" | ")}
        </p>
      </section>
    </div>
  );
}

/* ============================================================
   TEMPLATES SECTION
   ============================================================ */
function TemplatesSection() {
  const templates = [
    {
      id: "minimalist",
      name: "Minimalist",
      tag: "Harvard Style",
      description:
        "Clean, classic format trusted by top universities. Lets your content speak.",
      preview: MinimalistMini,
    },
    {
      id: "modern",
      name: "Modern",
      tag: "Recommended",
      description:
        "Contemporary design with color accents and clear hierarchy. Our most popular.",
      preview: ModernMini,
    },
    {
      id: "executive",
      name: "Executive",
      tag: "Senior Roles",
      description:
        "Elegant, refined layout for leadership and executive positions.",
      preview: ExecutiveMini,
    },
  ];

  return (
    <Section id="templates" alt>
      <SectionHeader
        badge="Templates"
        title="ATS-Friendly Resume Templates"
        highlight="Designed by Experts"
        description="Every template is tested against real ATS systems. Pick one, fill in your details, and download."
      />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {templates.map((t) => (
          <motion.div key={t.id} variants={fadeUp} className="group">
            <div className="template-card">
              {/* Preview */}
              <div className="h-80 bg-white relative overflow-hidden">
                <t.preview />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--c-accent)] opacity-0 group-hover:opacity-90 transition-all duration-200 flex items-center justify-center">
                  <Link href={`/builder?template=${t.id}`}>
                    <button className="bg-white text-[var(--c-accent)] px-6 py-3 text-sm font-bold flex items-center gap-2 border-2 border-[var(--c-border)] shadow-[3px_3px_0_var(--c-border)] hover:shadow-[1px_1px_0_var(--c-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                      Use This Template
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
              {/* Info */}
              <div className="p-6 border-t-2 border-[var(--c-border)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[var(--c-text-primary)]">
                    {t.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--c-accent)] bg-[var(--c-accent)]/10 px-2.5 py-1 border border-[var(--c-accent)]">
                    {t.tag}
                  </span>
                </div>
                <p className="text-sm text-[var(--c-text-secondary)]">
                  {t.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="text-center mt-12">
        <Link href="/builder">
          <button className="btn-secondary px-8 py-4 text-sm">
            Explore All Templates
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   HOW IT WORKS
   ============================================================ */
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Choose a Template",
      description:
        "Browse our collection and pick the layout that fits your industry.",
      icon: Layout,
    },
    {
      number: "02",
      title: "Fill Your Details",
      description:
        "Our guided editor walks you through each section step by step.",
      icon: FileText,
    },
    {
      number: "03",
      title: "Customize & Preview",
      description:
        "Reorder sections, toggle fields, and see changes in real-time.",
      icon: Palette,
    },
    {
      number: "04",
      title: "Download PDF",
      description:
        "Export your polished resume and start applying immediately.",
      icon: Download,
    },
  ];

  return (
    <Section>
      <SectionHeader
        badge="Process"
        title="Resume Ready in"
        highlight="4 Simple Steps"
        description="From blank page to job-winning resume in under 10 minutes."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            variants={fadeUp}
            className="relative group"
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-10 left-[calc(100%_-_12px)] w-[calc(100%_-_56px)] h-[3px] bg-[var(--c-border)] z-0" />
            )}
            <div className="text-center relative z-10">
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 bg-[var(--c-bg-tertiary)] border-2 border-[var(--c-border)] flex items-center justify-center group-hover:bg-[var(--c-accent)] group-hover:text-white transition-all duration-200 text-[var(--c-accent)] shadow-[3px_3px_0_var(--c-border)]">
                  <step.icon className="w-7 h-7" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--c-accent)] text-white text-xs font-bold flex items-center justify-center border-2 border-[var(--c-border)] shadow-[2px_2px_0_var(--c-border)]">
                  {step.number}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--c-text-primary)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--c-text-secondary)] leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   STATS BAR
   ============================================================ */
function StatsBar() {
  const stats = [
    { icon: Users, value: "50,000+", label: "Active Users" },
    { icon: FileText, value: "120,000+", label: "Resumes Created" },
    { icon: Award, value: "95%", label: "ATS Pass Rate" },
    { icon: BarChart3, value: "62%", label: "Interview Rate" },
  ];

  return (
    <section className="py-16 bg-[var(--c-surface-dark)] border-y-3 border-[var(--c-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-[var(--c-yellow)] mx-auto mb-3" />
              <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 mt-1 font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      initials: "SJ",
      content:
        "The ATS optimization gave me confidence. I started getting callbacks within a week of using my new resume.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      initials: "MC",
      content:
        "Created a stunning resume in 15 minutes. The real-time preview is a game changer — I could perfect every detail.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer at Meta",
      initials: "ER",
      content:
        "Best resume builder I have ever used. The templates are clean, professional, and actually pass ATS systems.",
      rating: 5,
    },
  ];

  return (
    <Section id="testimonials" alt>
      <SectionHeader
        badge="Testimonials"
        title="Trusted by Thousands of"
        highlight="Successful Job Seekers"
        description="Real stories from real people who landed their dream jobs."
      />

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            className="testimonial-card"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-5">
              {[...Array(t.rating)].map((_, j) => (
                <Star
                  key={j}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            {/* Quote */}
            <p className="text-[var(--c-text-secondary)] mb-6 leading-relaxed">
              &ldquo;{t.content}&rdquo;
            </p>
            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t-2 border-[var(--c-border)]">
              <div className="w-10 h-10 bg-[var(--c-accent)] flex items-center justify-center text-white font-bold text-sm border-2 border-[var(--c-border)]">
                {t.initials}
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--c-text-primary)]">
                  {t.name}
                </div>
                <div className="text-xs text-[var(--c-text-muted)]">
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--c-surface-dark)] relative overflow-hidden">
      {/* Bold shape decoration */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-[var(--c-yellow)] opacity-20 rotate-12 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-[var(--c-coral)] opacity-20 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-[var(--c-accent)] border-2 border-white/20 flex items-center justify-center mx-auto mb-8 shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Build Your{" "}
            <span className="text-[var(--c-yellow)]">Perfect Resume?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Join 50,000+ professionals who&apos;ve already created their winning
            resume with CAPSLOQUE. Free to start, no credit card required.
          </p>
          <Link href="/builder">
            <button className="btn-primary text-lg px-10 py-5 font-bold">
              Create Your Resume — It&apos;s Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="text-xs text-slate-500 mt-6 font-bold">
            No account required to start &bull; Export to PDF &bull;
            ATS-optimized
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <LandingNavbar />
      <HeroSection />
      <LogoCloud />
      <FeaturesSection />
      <ShowcaseSection />
      <TemplatesSection />
      <HowItWorksSection />
      <StatsBar />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
