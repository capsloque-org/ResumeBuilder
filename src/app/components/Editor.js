'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, GraduationCap, Wrench, FolderOpen,
  Plus, Trash2, ChevronLeft, ChevronRight, Check, ChevronUp, ChevronDown
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const steps = [
  { id: 0, title: 'Personal Info', icon: User },
  { id: 1, title: 'Experience', icon: Briefcase },
  { id: 2, title: 'Education', icon: GraduationCap },
  { id: 3, title: 'Skills', icon: Wrench },
  { id: 4, title: 'Projects', icon: FolderOpen },
];

function StepIndicator({ currentStep, setCurrentStep }) {
  return (
    <div className="flex items-center justify-between mb-6 px-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => setCurrentStep(step.id)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep === step.id
              ? 'bg-[#dc2626] border-[#dc2626] text-white'
              : currentStep > step.id
                ? 'bg-green-500 border-green-500 text-white'
                : 'bg-white border-slate-300 text-slate-400 hover:border-[#1e3a5f]'
              }`}
          >
            {currentStep > step.id ? (
              <Check className="w-5 h-5" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </button>
          {index < steps.length - 1 && (
            <div
              className={`w-8 sm:w-12 h-0.5 mx-1 transition-colors duration-300 ${currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', placeholder, required = false }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-[#dc2626]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-[#dc2626] focus:ring-0 transition-colors"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 3, showBulletButton = false }) {
  const textareaRef = useRef(null);

  const addBulletPoint = () => {
    const bullet = '• ';
    if (!value) {
      onChange(bullet);
    } else if (value.endsWith('\n') || value === '') {
      onChange(value + bullet);
    } else {
      onChange(value + '\n' + bullet);
    }
  };

  const makeBold = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText) {
      // Check if already bold (wrapped with **)
      const beforeSelection = value.substring(0, start);
      const afterSelection = value.substring(end);

      // Check if selection is already bold
      if (beforeSelection.endsWith('**') && afterSelection.startsWith('**')) {
        // Remove bold
        const newValue = beforeSelection.slice(0, -2) + selectedText + afterSelection.slice(2);
        onChange(newValue);
        // Restore cursor position
        setTimeout(() => {
          textarea.setSelectionRange(start - 2, end - 2);
          textarea.focus();
        }, 0);
      } else {
        // Add bold
        const newValue = value.substring(0, start) + '**' + selectedText + '**' + value.substring(end);
        onChange(newValue);
        // Restore cursor position with the new ** markers
        setTimeout(() => {
          textarea.setSelectionRange(start + 2, end + 2);
          textarea.focus();
        }, 0);
      }
    } else {
      // No selection, insert ** markers and place cursor between them
      const newValue = value.substring(0, start) + '****' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2);
        textarea.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e) => {
    // Ctrl+B or Cmd+B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      makeBold();
      return;
    }

    if (e.key === 'Enter' && showBulletButton) {
      const lines = value.split('\n');
      const lastLine = lines[lines.length - 1];
      if (lastLine.trim().startsWith('•')) {
        e.preventDefault();
        onChange(value + '\n• ');
      }
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        {showBulletButton && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={makeBold}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
              title="Bold (Ctrl+B)"
            >
              <span className="font-bold">B</span> Bold
            </button>
            <button
              type="button"
              onClick={addBulletPoint}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
              title="Add bullet point"
            >
              <span className="font-bold">•</span> Add Bullet
            </button>
          </div>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-[#dc2626] focus:ring-0 transition-colors resize-none"
      />
    </div>
  );
}

function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={personalInfo.fullName}
          onChange={(v) => updatePersonalInfo('fullName', v)}
          placeholder="John Doe"
          required
        />
        <InputField
          label="Email"
          type="email"
          value={personalInfo.email}
          onChange={(v) => updatePersonalInfo('email', v)}
          placeholder="john@example.com"
          required
        />
        <InputField
          label="Phone"
          type="tel"
          value={personalInfo.phone}
          onChange={(v) => updatePersonalInfo('phone', v)}
          placeholder="+1 (555) 123-4567"
        />
        <InputField
          label="Location"
          value={personalInfo.location}
          onChange={(v) => updatePersonalInfo('location', v)}
          placeholder="San Francisco, CA"
        />
        <InputField
          label="LinkedIn"
          value={personalInfo.linkedin}
          onChange={(v) => updatePersonalInfo('linkedin', v)}
          placeholder="linkedin.com/in/johndoe"
        />
        <InputField
          label="GitHub"
          value={personalInfo.github}
          onChange={(v) => updatePersonalInfo('github', v)}
          placeholder="github.com/johndoe"
        />
        <div className="sm:col-span-2">
          <InputField
            label="Portfolio Website"
            value={personalInfo.portfolio}
            onChange={(v) => updatePersonalInfo('portfolio', v)}
            placeholder="johndoe.com"
          />
        </div>
        <div className="sm:col-span-2">
          <TextAreaField
            label="Professional Summary"
            value={personalInfo.summary}
            onChange={(v) => updatePersonalInfo('summary', v)}
            placeholder="A brief summary of your professional background and career objectives..."
            rows={4}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceForm() {
  const { resumeData, updateExperience, addExperience, removeExperience, moveExperienceUp, moveExperienceDown } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1e3a5f]">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {resumeData.experience.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-2 border-slate-200 rounded-lg space-y-4 relative"
        >
          <div className="absolute top-3 right-3 flex items-center gap-1">
            {resumeData.experience.length > 1 && (
              <>
                <button
                  onClick={() => moveExperienceUp(index)}
                  disabled={index === 0}
                  className={`p-1 transition-colors ${index === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-[#1e3a5f]'}`}
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveExperienceDown(index)}
                  disabled={index === resumeData.experience.length - 1}
                  className={`p-1 transition-colors ${index === resumeData.experience.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-[#1e3a5f]'}`}
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeExperience(index)}
                  className="p-1 text-slate-400 hover:text-[#dc2626] transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Company"
              value={exp.company}
              onChange={(v) => updateExperience(index, 'company', v)}
              placeholder="Google"
            />
            <InputField
              label="Position"
              value={exp.position}
              onChange={(v) => updateExperience(index, 'position', v)}
              placeholder="Software Engineer"
            />
            <InputField
              label="Location"
              value={exp.location}
              onChange={(v) => updateExperience(index, 'location', v)}
              placeholder="Mountain View, CA"
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <InputField
                  label="Start Date"
                  value={exp.startDate}
                  onChange={(v) => updateExperience(index, 'startDate', v)}
                  placeholder="Jan 2020"
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="End Date"
                  value={exp.endDate}
                  onChange={(v) => updateExperience(index, 'endDate', v)}
                  placeholder="Present"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <TextAreaField
                label="Description"
                value={exp.description}
                onChange={(v) => updateExperience(index, 'description', v)}
                placeholder="??? Led development of key features...&#10;??? Improved system performance by 40%...&#10;??? Collaborated with cross-functional teams..."
                rows={4} showBulletButton={true} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function EducationForm() {
  const { resumeData, updateEducation, addEducation, removeEducation } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1e3a5f]">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {resumeData.education.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-2 border-slate-200 rounded-lg space-y-4 relative"
        >
          {resumeData.education.length > 1 && (
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-3 right-3 p-1 text-slate-400 hover:text-[#dc2626] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Institution"
              value={edu.institution}
              onChange={(v) => updateEducation(index, 'institution', v)}
              placeholder="Stanford University"
            />
            <InputField
              label="Degree"
              value={edu.degree}
              onChange={(v) => updateEducation(index, 'degree', v)}
              placeholder="Bachelor of Science"
            />
            <InputField
              label="Field of Study"
              value={edu.field}
              onChange={(v) => updateEducation(index, 'field', v)}
              placeholder="Computer Science"
            />
            <InputField
              label="Location"
              value={edu.location}
              onChange={(v) => updateEducation(index, 'location', v)}
              placeholder="Stanford, CA"
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <InputField
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(v) => updateEducation(index, 'startDate', v)}
                  placeholder="Sep 2016"
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="End Date"
                  value={edu.endDate}
                  onChange={(v) => updateEducation(index, 'endDate', v)}
                  placeholder="May 2020"
                />
              </div>
            </div>
            <InputField
              label="GPA (optional)"
              value={edu.gpa}
              onChange={(v) => updateEducation(index, 'gpa', v)}
              placeholder="3.8/4.0"
            />
            <div className="sm:col-span-2">
              <TextAreaField
                label="Achievements & Activities"
                value={edu.achievements}
                onChange={(v) => updateEducation(index, 'achievements', v)}
                placeholder="Dean's List, Relevant Coursework, Club Activities..."
                rows={3}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SkillsForm() {
  const { resumeData, addSkillCategory, removeSkillCategory, updateSkillCategoryTitle, addSkillToCategory, removeSkillFromCategory } = useResume();
  const [newSkills, setNewSkills] = useState({});

  const handleAddSkill = (categoryIndex) => {
    const skill = newSkills[categoryIndex] || '';
    if (skill.trim()) {
      addSkillToCategory(categoryIndex, skill);
      setNewSkills(prev => ({ ...prev, [categoryIndex]: '' }));
    }
  };

  const handleKeyPress = (e, categoryIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(categoryIndex);
    }
  };

  // Handle legacy data format
  const skillCategories = resumeData.skillCategories || [
    { id: '1', title: 'Technical Skills', skills: resumeData.skills?.technical || [] },
    { id: '2', title: 'Programming Languages', skills: resumeData.skills?.languages || [] },
    { id: '3', title: 'Tools & Frameworks', skills: resumeData.skills?.tools || [] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1e3a5f]">Skills</h2>
        <button
          onClick={addSkillCategory}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-2 border-slate-200 rounded-lg space-y-3 relative"
        >
          {skillCategories.length > 1 && (
            <button
              onClick={() => removeSkillCategory(categoryIndex)}
              className="absolute top-3 right-3 p-1 text-slate-400 hover:text-[#dc2626] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Category Title */}
          <div className="pr-8">
            <input
              type="text"
              value={category.title}
              onChange={(e) => updateSkillCategoryTitle(categoryIndex, e.target.value)}
              placeholder="Category name (e.g., Programming Languages)"
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-slate-800 font-medium placeholder-slate-400 focus:border-[#dc2626] focus:ring-0 transition-colors"
            />
          </div>

          {/* Add Skill Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkills[categoryIndex] || ''}
              onChange={(e) => setNewSkills(prev => ({ ...prev, [categoryIndex]: e.target.value }))}
              onKeyPress={(e) => handleKeyPress(e, categoryIndex)}
              placeholder="Type a skill and press Enter or click +"
              className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-[#dc2626] focus:ring-0 transition-colors"
            />
            <button
              onClick={() => handleAddSkill(categoryIndex)}
              className="px-3 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Skills List */}
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {category.skills.map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="skill-pill inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200"
              >
                {skill}
                <button
                  onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                  className="ml-1 text-slate-400 hover:text-[#dc2626] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.span>
            ))}
            {category.skills.length === 0 && (
              <span className="text-sm text-slate-400 italic">No skills added yet</span>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function X({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function ProjectsForm() {
  const { resumeData, updateProject, addProject, removeProject, moveProjectUp, moveProjectDown } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1e3a5f]">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {resumeData.projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-2 border-slate-200 rounded-lg space-y-4 relative"
        >
          <div className="absolute top-3 right-3 flex items-center gap-1">
            {resumeData.projects.length > 1 && (
              <>
                <button
                  onClick={() => moveProjectUp(index)}
                  disabled={index === 0}
                  className={`p-1 transition-colors ${index === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-[#1e3a5f]'}`}
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveProjectDown(index)}
                  disabled={index === resumeData.projects.length - 1}
                  className={`p-1 transition-colors ${index === resumeData.projects.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-[#1e3a5f]'}`}
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeProject(index)}
                  className="p-1 text-slate-400 hover:text-[#dc2626] transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Project Name"
              value={project.name}
              onChange={(v) => updateProject(index, 'name', v)}
              placeholder="E-commerce Platform"
            />
            <InputField
              label="Technologies Used"
              value={project.technologies}
              onChange={(v) => updateProject(index, 'technologies', v)}
              placeholder="React, Node.js, MongoDB"
            />
            <InputField
              label="Project Link"
              value={project.link}
              onChange={(v) => updateProject(index, 'link', v)}
              placeholder="github.com/username/project"
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <InputField
                  label="Start Date"
                  value={project.startDate}
                  onChange={(v) => updateProject(index, 'startDate', v)}
                  placeholder="Jan 2023"
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="End Date"
                  value={project.endDate}
                  onChange={(v) => updateProject(index, 'endDate', v)}
                  placeholder="Mar 2023"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <TextAreaField
                label="Description"
                value={project.description}
                onChange={(v) => updateProject(index, 'description', v)}
                placeholder="??? Built a full-stack web application...&#10;??? Implemented user authentication...&#10;??? Deployed using AWS..."
                rows={4} showBulletButton={true} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Editor() {
  const { currentStep, setCurrentStep } = useResume();

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfoForm />;
      case 1: return <ExperienceForm />;
      case 2: return <EducationForm />;
      case 3: return <SkillsForm />;
      case 4: return <ProjectsForm />;
      default: return <PersonalInfoForm />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border-2 border-[#1e3a5f] shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <StepIndicator currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentStep === 0
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentStep === steps.length - 1
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-[#dc2626] text-white hover:bg-[#b91c1c]'
            }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
