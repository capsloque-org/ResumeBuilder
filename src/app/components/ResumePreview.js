'use client';

import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink, ZoomIn, ZoomOut, RotateCcw, Palette } from 'lucide-react';

// Helper to format date range (shows "Present" for current jobs)
function formatDateRange(startDate, endDate, separator = ' - ') {
  if (!startDate) return '';
  const end = endDate ? endDate : 'Present';
  return `${startDate}${separator}${end}`;
}

// Helper to parse **bold** markdown within a text segment
function parseBoldText(text) {
  if (!text) return null;

  // Split by **bold** pattern while capturing the delimiters
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    // Check if this part is bold (wrapped with **)
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
}

// Helper to parse formatted text with bullet points and bold
function parseFormattedText(text) {
  if (!text) return null;

  // Split by newlines to process each line
  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    const trimmedLine = line.trim();
    const isBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*');

    if (isBullet) {
      // Extract bullet and content
      const bulletChar = trimmedLine.charAt(0);
      const content = trimmedLine.substring(1).trim();

      return (
        <div
          key={lineIndex}
          style={{
            paddingLeft: '1em',
            textIndent: '-1em',
            marginTop: lineIndex > 0 ? '0.25em' : 0
          }}
        >
          {bulletChar} {parseBoldText(content)}
        </div>
      );
    }

    // Non-bullet line
    return (
      <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '0.25em' : 0 }}>
        {parseBoldText(line)}
      </div>
    );
  });
}

// Helper to get skill categories (handles both old and new format)
function getSkillCategories(data) {
  if (data.skillCategories && data.skillCategories.length > 0) {
    return data.skillCategories.filter(cat => cat.skills && cat.skills.length > 0);
  }
  // Legacy format support
  if (data.skills) {
    const categories = [];
    if (data.skills.technical?.length > 0) {
      categories.push({ title: 'Technical', skills: data.skills.technical });
    }
    if (data.skills.languages?.length > 0) {
      categories.push({ title: 'Languages', skills: data.skills.languages });
    }
    if (data.skills.tools?.length > 0) {
      categories.push({ title: 'Tools', skills: data.skills.tools });
    }
    return categories;
  }
  return [];
}

// Helper function to render sections in order
function renderSectionByKey(key, data, TemplateSection) {
  const { personalInfo, experience, education, projects } = data;
  const skillCategories = getSkillCategories(data);

  switch (key) {
    case 'summary':
      return personalInfo.summary ? <TemplateSection.Summary key={key} personalInfo={personalInfo} /> : null;
    case 'experience':
      return experience.some(exp => exp.company || exp.position) ?
        <TemplateSection.Experience key={key} experience={experience} /> : null;
    case 'education':
      return education.some(edu => edu.institution || edu.degree) ?
        <TemplateSection.Education key={key} education={education} /> : null;
    case 'skills':
      return skillCategories.length > 0 ?
        <TemplateSection.Skills key={key} skillCategories={skillCategories} /> : null;
    case 'projects':
      return projects.some(proj => proj.name) ?
        <TemplateSection.Projects key={key} projects={projects} /> : null;
    default:
      return null;
  }
}

// Minimalist Template Sections
const MinimalistSections = {
  Summary: ({ personalInfo }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2">
        Professional Summary
      </h2>
      <p className="text-xs text-slate-700">{personalInfo.summary}</p>
    </section>
  ),
  Experience: ({ experience }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2">
        Experience
      </h2>
      {experience.map((exp, index) => (
        (exp.company || exp.position) && (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-semibold">{exp.position}</span>
                {exp.company && <span className="text-slate-600"> | {exp.company}</span>}
                {exp.location && <span className="text-slate-500 text-xs"> - {exp.location}</span>}
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {formatDateRange(exp.startDate, exp.endDate)}
              </span>
            </div>
            {exp.description && (
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">
                {parseFormattedText(exp.description)}
              </div>
            )}
          </div>
        )
      ))}
    </section>
  ),
  Education: ({ education }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2">
        Education
      </h2>
      {education.map((edu, index) => (
        (edu.institution || edu.degree) && (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-semibold">{edu.institution}</span>
                {edu.location && <span className="text-slate-500 text-xs"> - {edu.location}</span>}
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {formatDateRange(edu.startDate, edu.endDate)}
              </span>
            </div>
            <div className="text-xs">
              {edu.degree}{edu.field && ` in ${edu.field}`}
              {edu.gpa && <span className="text-slate-500"> | GPA: {edu.gpa}</span>}
            </div>
            {edu.achievements && (
              <div className="text-xs text-slate-600 mt-1">{edu.achievements}</div>
            )}
          </div>
        )
      ))}
    </section>
  ),
  Skills: ({ skillCategories }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2">
        Skills
      </h2>
      <div className="text-xs space-y-1">
        {skillCategories.map((category, index) => (
          <p key={index}><strong>{category.title}:</strong> {category.skills.join(', ')}</p>
        ))}
      </div>
    </section>
  ),
  Projects: ({ projects }) => (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2">
        Projects
      </h2>
      {projects.map((proj, index) => (
        proj.name && (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-semibold">{proj.name}</span>
                {proj.technologies && (
                  <span className="text-slate-500 text-xs"> | {proj.technologies}</span>
                )}
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {proj.startDate && formatDateRange(proj.startDate, proj.endDate)}
              </span>
            </div>
            {proj.link && (
              <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 flex items-center gap-1 hover:text-blue-800">
                <ExternalLink className="w-3 h-3" /> {proj.link}
              </a>
            )}
            {proj.description && (
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">
                {parseFormattedText(proj.description)}
              </div>
            )}
          </div>
        )
      ))}
    </section>
  )
};

// Minimalist Template - Clean Harvard Style
function MinimalistTemplate({ data, sectionOrder }) {
  const { personalInfo } = data;

  return (
    <div className="p-8 font-serif text-slate-800 text-sm leading-relaxed">
      {/* Header */}
      <header className="text-center border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-slate-600 hover:text-blue-600">
              <Mail className="w-3 h-3" /> {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-blue-600">
              <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-blue-600">
              <Github className="w-3 h-3" /> {personalInfo.github}
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-blue-600">
              <Globe className="w-3 h-3" /> {personalInfo.portfolio}
            </a>
          )}
        </div>
      </header>

      {/* Render sections in order */}
      {sectionOrder.map(sectionKey => renderSectionByKey(sectionKey, data, MinimalistSections))}
    </div>
  );
}

// Modern Template Sections
const ModernSections = {
  Summary: ({ personalInfo }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide mb-2 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-[#dc2626]"></span>
        About
      </h2>
      <p className="text-xs text-slate-600 leading-relaxed">{personalInfo.summary}</p>
    </section>
  ),
  Experience: ({ experience }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide mb-2 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-[#dc2626]"></span>
        Experience
      </h2>
      {experience.map((exp, index) => (
        (exp.company || exp.position) && (
          <div key={index} className="mb-3 pl-4 border-l-2 border-slate-200">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[#1e3a5f]">{exp.position}</span>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {formatDateRange(exp.startDate, exp.endDate)}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              {exp.company}{exp.location && ` | ${exp.location}`}
            </div>
            {exp.description && (
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">
                {parseFormattedText(exp.description)}
              </div>
            )}
          </div>
        )
      ))}
    </section>
  ),
  Education: ({ education }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide mb-2 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-[#dc2626]"></span>
        Education
      </h2>
      {education.map((edu, index) => (
        (edu.institution || edu.degree) && (
          <div key={index} className="mb-2 pl-4 border-l-2 border-slate-200">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[#1e3a5f]">{edu.institution}</span>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {formatDateRange(edu.startDate, edu.endDate)}
              </span>
            </div>
            <div className="text-xs">
              {edu.degree}{edu.field && ` in ${edu.field}`}
              {edu.gpa && <span className="text-slate-500"> | GPA: {edu.gpa}</span>}
            </div>
          </div>
        )
      ))}
    </section>
  ),
  Skills: ({ skillCategories }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide mb-2 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-[#dc2626]"></span>
        Skills
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {skillCategories.flatMap(cat => cat.skills).map((skill, index) => (
          <span key={index} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded border border-slate-200">
            {skill}
          </span>
        ))}
      </div>
    </section>
  ),
  Projects: ({ projects }) => (
    <section>
      <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide mb-2 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-[#dc2626]"></span>
        Projects
      </h2>
      {projects.map((proj, index) => (
        proj.name && (
          <div key={index} className="mb-3 pl-4 border-l-2 border-slate-200">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[#1e3a5f]">{proj.name}</span>
              <span className="text-xs text-slate-500">
                {proj.startDate && formatDateRange(proj.startDate, proj.endDate)}
              </span>
            </div>
            {proj.technologies && (
              <div className="text-xs text-[#dc2626]">{proj.technologies}</div>
            )}
            {proj.description && (
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">
                {parseFormattedText(proj.description)}
              </div>
            )}
          </div>
        )
      ))}
    </section>
  )
};

// Modern Template - Clean with accent colors
function ModernTemplate({ data, sectionOrder }) {
  const { personalInfo } = data;

  return (
    <div className="font-sans text-slate-800 text-sm">
      {/* Header with accent */}
      <header className="bg-[#1e3a5f] text-white p-6 -mx-0">
        <h1 className="text-2xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-200">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-slate-200 hover:text-white">
              <Mail className="w-3 h-3" /> {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {personalInfo.location}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-200 mt-1">
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-200 hover:text-white">
              <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-200 hover:text-white">
              <Github className="w-3 h-3" /> {personalInfo.github}
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-200 hover:text-white">
              <Globe className="w-3 h-3" /> {personalInfo.portfolio}
            </a>
          )}
        </div>
      </header>

      <div className="p-6">
        {/* Render sections in order */}
        {sectionOrder.map(sectionKey => renderSectionByKey(sectionKey, data, ModernSections))}
      </div>
    </div>
  );
}

// Executive Template Sections
const ExecutiveSections = {
  Summary: ({ personalInfo }) => (
    <section className="mb-5 text-center">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
        Executive Summary
      </h2>
      <p className="text-xs text-slate-700 italic leading-relaxed max-w-lg mx-auto">
        {personalInfo.summary}
      </p>
    </section>
  ),
  Experience: ({ experience }) => (
    <section className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 text-center">
        Professional Experience
      </h2>
      {experience.map((exp, index) => (
        (exp.company || exp.position) && (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline border-b border-slate-100 pb-1">
              <div>
                <span className="font-bold text-slate-800">{exp.position}</span>
                {exp.company && <span className="font-normal text-slate-600"> — {exp.company}</span>}
              </div>
              <span className="text-xs text-slate-500 italic">
                {formatDateRange(exp.startDate, exp.endDate, ' — ')}
              </span>
            </div>
            {exp.location && (
              <div className="text-xs text-slate-500 italic">{exp.location}</div>
            )}
            {exp.description && (
              <div className="mt-2 text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                {parseFormattedText(exp.description)}
              </div>
            )}
          </div>
        )
      ))}
    </section>
  ),
  Education: ({ education }) => (
    <section className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 text-center">
        Education
      </h2>
      {education.map((edu, index) => (
        (edu.institution || edu.degree) && (
          <div key={index} className="mb-3 text-center">
            <div className="font-bold text-slate-800">{edu.institution}</div>
            <div className="text-xs text-slate-600">
              {edu.degree}{edu.field && ` in ${edu.field}`}
              {edu.gpa && <span> — GPA: {edu.gpa}</span>}
            </div>
            <div className="text-xs text-slate-500 italic">
              {formatDateRange(edu.startDate, edu.endDate, ' — ')}
              {edu.location && ` — ${edu.location}`}
            </div>
          </div>
        )
      ))}
    </section>
  ),
  Skills: ({ skillCategories }) => (
    <section className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 text-center">
        Core Competencies
      </h2>
      <div className="text-xs text-center text-slate-700">
        {skillCategories.flatMap(cat => cat.skills).join(' • ')}
      </div>
    </section>
  ),
  Projects: ({ projects }) => (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 text-center">
        Notable Projects
      </h2>
      {projects.map((proj, index) => (
        proj.name && (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-800">{proj.name}</span>
              <span className="text-xs text-slate-500 italic">
                {proj.startDate && formatDateRange(proj.startDate, proj.endDate, ' — ')}
              </span>
            </div>
            {proj.technologies && (
              <div className="text-xs text-slate-500 italic">{proj.technologies}</div>
            )}
            {proj.description && (
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">
                {parseFormattedText(proj.description)}
              </div>
            )}
          </div>
        )
      ))}
    </section>
  )
};

// Executive Template - Professional and elegant
function ExecutiveTemplate({ data, sectionOrder }) {
  const { personalInfo } = data;

  return (
    <div className="font-serif text-slate-800 text-sm">
      {/* Header */}
      <header className="text-center py-6 border-b-4 border-double border-slate-800">
        <h1 className="text-3xl font-bold tracking-widest uppercase mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="text-slate-600 hover:text-blue-600">{personalInfo.email}</a>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 mt-1">
          {personalInfo.linkedin && <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600">{personalInfo.linkedin}</a>}
          {personalInfo.github && <><span>• </span><a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600">{personalInfo.github}</a></>}
          {personalInfo.portfolio && <><span>• </span><a href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600">{personalInfo.portfolio}</a></>}
        </div>
      </header>

      <div className="px-6 py-4">
        <div className="border-t border-slate-200 pt-4">
          {/* Render sections in order */}
          {sectionOrder.map(sectionKey => renderSectionByKey(sectionKey, data, ExecutiveSections))}
        </div>
      </div>
    </div>
  );
}

export default function ResumePreview({ onOpenTemplate }) {
  const { resumeData, activeTemplate } = useResume();
  const [zoom, setZoom] = useState(0.7);
  const sectionOrder = resumeData.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.2));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const resetZoom = () => setZoom(0.7);

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} sectionOrder={sectionOrder} />;
      case 'modern':
        return <ModernTemplate data={resumeData} sectionOrder={sectionOrder} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} sectionOrder={sectionOrder} />;
      default:
        return <MinimalistTemplate data={resumeData} sectionOrder={sectionOrder} />;
    }
  };

  return (
    <>
      {/* Print-only container - hidden on screen, visible on print */}
      <div id="print-container" style={{ display: 'none' }}>
        <div className="a4-paper bg-white">
          {renderTemplate()}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white rounded-lg shadow-md border border-slate-200 p-1 no-print">
        <button
          onClick={zoomOut}
          disabled={zoom <= 0.4}
          className={`p-2 rounded transition-colors ${zoom <= 0.4 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="px-2 text-sm font-medium text-slate-600 min-w-[50px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={zoomIn}
          disabled={zoom >= 1.2}
          className={`p-2 rounded transition-colors ${zoom >= 1.2 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-200 mx-1" />
        <button
          onClick={resetZoom}
          className="p-2 rounded text-slate-600 hover:bg-slate-100 transition-colors"
          title="Reset zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        {onOpenTemplate && (
          <>
            <div className="w-px h-5 bg-slate-200 mx-1" />
            <button
              onClick={onOpenTemplate}
              className="p-2 rounded text-[#dc2626] hover:bg-red-50 transition-colors flex items-center gap-1"
              title="Templates"
            >
              <Palette className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Templates</span>
            </button>
          </>
        )}
      </div>

      {/* Normal preview - visible on screen, hidden on print */}
      <div className="h-full overflow-auto bg-slate-200 p-4 pt-16 flex justify-center no-print relative">
        <div
          id="resume-preview"
          className="a4-paper bg-white shadow-lg overflow-hidden"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </>
  );
}
