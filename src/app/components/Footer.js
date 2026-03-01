"use client";

import Link from "next/link";
import {
  FileText,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Resume Builder", href: "/builder" },
      { name: "Templates", href: "#templates" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
    ],
    resources: [
      { name: "Resume Tips", href: "#" },
      { name: "Career Advice", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Help Center", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Partners", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-[var(--c-surface-dark)] text-white">
      {/* CTA Band */}
      <div className="border-b-3 border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Ready to build your resume?
            </h3>
            <p className="text-slate-400 text-sm mt-1 font-medium">
              Join 50,000+ professionals. Free to start, no credit card
              required.
            </p>
          </div>
          <Link
            href="/builder"
            className="flex items-center gap-2 px-6 py-3 bg-[var(--c-accent)] text-white text-sm font-bold border-2 border-white/20 shadow-[4px_4px_0_rgba(255,255,255,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(255,255,255,0.15)] transition-all whitespace-nowrap"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-[var(--c-accent)] flex items-center justify-center border-2 border-white/20">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                <span className="text-white">CAPS</span>
                <span className="text-[var(--c-yellow)]">LOQUE</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Create professional, ATS-friendly resumes in minutes. Designed to
              help you land your dream job.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center text-slate-500 border-2 border-transparent hover:border-white/20 hover:text-white hover:bg-white/5 transition-all"
                  title={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-500 text-xs font-medium">
              &copy; {currentYear} CAPSLOQUE. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
              Made with{" "}
              <Heart className="w-3.5 h-3.5 text-[var(--c-coral)] fill-[var(--c-coral)]" />{" "}
              for job seekers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
