"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Plus,
  Trash2,
  ChevronDown,
  Link2,
  FileText,
  Eye,
  ChevronUp,
  X,
  Save,
  ChevronRight,
} from "lucide-react";
import { useResume } from "../context/ResumeContext";

// Country, State, City data
const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Singapore",
  "UAE",
  "Japan",
  "Other",
];

const statesByCountry = {
  India: [
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Delhi",
    "Telangana",
    "Gujarat",
    "West Bengal",
    "Uttar Pradesh",
    "Other",
  ],
  "United States": [
    "California",
    "New York",
    "Texas",
    "Washington",
    "Massachusetts",
    "Illinois",
    "Florida",
    "Other",
  ],
  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
    "Other",
  ],
  Canada: ["Ontario", "British Columbia", "Quebec", "Alberta", "Other"],
  Australia: [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "Other",
  ],
  Germany: ["Bavaria", "Berlin", "Hamburg", "Hesse", "Other"],
  France: [
    "Île-de-France",
    "Provence-Alpes-Côte d'Azur",
    "Auvergne-Rhône-Alpes",
    "Other",
  ],
  Singapore: ["Central", "East", "North", "North-East", "West"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Other"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Other"],
  Other: ["Other"],
};

const tabs = [
  { id: "contact", title: "Contact", icon: User },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "project", title: "Projects", icon: FolderOpen },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "skills", title: "Skills", icon: Wrench },
  { id: "summary", title: "Summary", icon: FileText },
];

// Premium Dark themed input field
function DarkInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  showOnResume,
  onToggleShow,
  hasLinkIcon,
  labelHighlight,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <label className="dark-label">
          {labelHighlight ? (
            <>
              {label.split(labelHighlight)[0]}
              <span>{labelHighlight}</span>
              {label.split(labelHighlight)[1] || ""}
            </>
          ) : (
            label
          )}
        </label>
        {showOnResume !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Show on resume
            </span>
            <button
              type="button"
              onClick={onToggleShow}
              className={`toggle-switch ${showOnResume ? "active" : ""}`}
            />
          </div>
        )}
      </div>
      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="dark-builder-input w-full px-4 py-3.5"
        />
        {hasLinkIcon && (
          <button type="button" className="link-icon-btn">
            <Link2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Premium Dark themed select field
function DarkSelect({
  label,
  value,
  onChange,
  options,
  showOnResume,
  onToggleShow,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <label className="dark-label">{label}</label>
        {showOnResume !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Show on resume
            </span>
            <button
              type="button"
              onClick={onToggleShow}
              className={`toggle-switch ${showOnResume ? "active" : ""}`}
            />
          </div>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="dark-builder-input dark-select w-full px-4 py-3.5 cursor-pointer"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </motion.div>
  );
}

// Dark themed input with toggle for show on resume
function DarkInputWithToggle({
  label,
  value,
  onChange,
  placeholder,
  showOnResume,
  onToggleShow,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <label className="dark-label">{label}</label>
        {showOnResume !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Show on resume
            </span>
            <button
              type="button"
              onClick={onToggleShow}
              className={`toggle-switch ${showOnResume ? "active" : ""}`}
            />
          </div>
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className="dark-builder-input w-full px-4 py-3.5"
      />
    </motion.div>
  );
}

// Premium Dark themed textarea
function DarkTextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  showBulletButton = false,
}) {
  const textareaRef = useRef(null);

  const addBulletPoint = () => {
    const bullet = "• ";
    if (!value) {
      onChange(bullet);
    } else if (value.endsWith("\n") || value === "") {
      onChange(value + bullet);
    } else {
      onChange(value + "\n" + bullet);
    }
  };

  const makeBold = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText) {
      const beforeSelection = value.substring(0, start);
      const afterSelection = value.substring(end);

      if (beforeSelection.endsWith("**") && afterSelection.startsWith("**")) {
        const newValue =
          beforeSelection.slice(0, -2) + selectedText + afterSelection.slice(2);
        onChange(newValue);
        setTimeout(() => {
          textarea.setSelectionRange(start - 2, end - 2);
          textarea.focus();
        }, 0);
      } else {
        const newValue =
          value.substring(0, start) +
          "**" +
          selectedText +
          "**" +
          value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.setSelectionRange(start + 2, end + 2);
          textarea.focus();
        }, 0);
      }
    } else {
      const newValue =
        value.substring(0, start) + "****" + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2);
        textarea.focus();
      }, 0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <label className="dark-label">{label}</label>
        {showBulletButton && (
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={makeBold}
              className="px-3 py-1.5 text-xs bg-slate-700/80 text-slate-300 hover:bg-slate-600 transition-all font-bold border-2 border-slate-600"
              title="Bold (Ctrl+B)"
            >
              B
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={addBulletPoint}
              className="px-3 py-1.5 text-xs bg-slate-700/80 text-slate-300 hover:bg-slate-600 transition-all border-2 border-slate-600"
              title="Add bullet point"
            >
              • Bullet
            </motion.button>
          </div>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="dark-builder-input w-full px-4 py-3.5 resize-none"
      />
    </motion.div>
  );
}

// Contact/Personal Info Form - Premium Dark Theme
function ContactForm() {
  const { resumeData, updatePersonalInfo, saveProgress, isSaving } =
    useResume();
  const { personalInfo } = resumeData;

  // Use context values directly
  const country = personalInfo.country || "";
  const state = personalInfo.state || "";
  const city = personalInfo.city || "";
  const showCountry = personalInfo.showCountry !== false;
  const showState = personalInfo.showState !== false;
  const showCity = personalInfo.showCity !== false;

  const handleCountryChange = (newCountry) => {
    updatePersonalInfo("country", newCountry);
    updatePersonalInfo("state", ""); // Reset state when country changes
    updateLocationString(city, "", newCountry);
  };

  const handleStateChange = (newState) => {
    updatePersonalInfo("state", newState);
    updateLocationString(city, newState, country);
  };

  const handleCityChange = (newCity) => {
    updatePersonalInfo("city", newCity);
    updateLocationString(newCity, state, country);
  };

  const updateLocationString = (newCity, newState, newCountry) => {
    const parts = [];
    if (newCity && showCity) parts.push(newCity);
    if (newState && showState) parts.push(newState);
    if (newCountry && showCountry) parts.push(newCountry);
    updatePersonalInfo("location", parts.join(", "));
  };

  const toggleShowCountry = () => {
    updatePersonalInfo("showCountry", !showCountry);
    updateLocationString(city, state, showCountry ? "" : country);
  };

  const toggleShowState = () => {
    updatePersonalInfo("showState", !showState);
    updateLocationString(city, showState ? "" : state, country);
  };

  const toggleShowCity = () => {
    updatePersonalInfo("showCity", !showCity);
    updateLocationString(showCity ? "" : city, state, country);
  };

  const availableStates = statesByCountry[country] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="dark-builder-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--c-coral)]">
          <User className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Personal Information</h2>
          <p className="text-xs text-slate-500">Your contact details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DarkInput
          label="FULL NAME"
          value={personalInfo.fullName}
          onChange={(v) => updatePersonalInfo("fullName", v)}
          placeholder="Mohd Hannan"
        />
        <DarkInput
          label="EMAIL ADDRESS"
          type="email"
          value={personalInfo.email}
          onChange={(v) => updatePersonalInfo("email", v)}
          placeholder="mohdhannan774@gmail.com"
        />
        <DarkInput
          label="PHONE NUMBER"
          type="tel"
          value={personalInfo.phone}
          onChange={(v) => updatePersonalInfo("phone", v)}
          placeholder="(+91) 7497932064"
        />
        <DarkInput
          label="LINKEDIN URL"
          value={personalInfo.linkedin}
          onChange={(v) => updatePersonalInfo("linkedin", v)}
          placeholder="https://linkedin.com/in/hannan-siddiqui-dev"
          hasLinkIcon
        />
        <DarkInput
          label="PERSONAL WEBSITE OR RELEVANT LINK"
          labelHighlight=" OR RELEVANT LINK"
          value={personalInfo.portfolio}
          onChange={(v) => updatePersonalInfo("portfolio", v)}
          placeholder="https://www.charlesbloomberg.com"
        />
        <DarkSelect
          label="COUNTRY"
          value={country}
          onChange={handleCountryChange}
          options={countries}
          showOnResume={showCountry}
          onToggleShow={toggleShowCountry}
        />
        <DarkSelect
          label="STATE"
          value={state}
          onChange={handleStateChange}
          options={availableStates}
          showOnResume={showState}
          onToggleShow={toggleShowState}
        />
        <DarkInputWithToggle
          label="CITY"
          value={city}
          onChange={handleCityChange}
          placeholder="City"
          showOnResume={showCity}
          onToggleShow={toggleShowCity}
        />
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={saveProgress}
          disabled={isSaving}
          className="save-btn flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Experience Form - Premium Dark Theme
function ExperienceForm() {
  const {
    resumeData,
    updateExperience,
    addExperience,
    removeExperience,
    saveProgress,
    isSaving,
  } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--c-accent)]">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Work Experience</h2>
          <p className="text-xs text-slate-500">Your professional history</p>
        </div>
      </div>

      {resumeData.experience.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="dark-entry-card"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-500/20 text-blue-400 text-sm font-bold border border-blue-500/30">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-white">
                Experience {index + 1}
              </h3>
            </div>
            {resumeData.experience.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeExperience(index)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DarkInput
              label="COMPANY NAME"
              value={exp.company}
              onChange={(v) => updateExperience(index, "company", v)}
              placeholder="Google"
            />
            <DarkInput
              label="JOB TITLE"
              value={exp.position}
              onChange={(v) => updateExperience(index, "position", v)}
              placeholder="Software Engineer"
            />
            <DarkInput
              label="LOCATION"
              value={exp.location}
              onChange={(v) => updateExperience(index, "location", v)}
              placeholder="Mountain View, CA"
            />
            <div className="grid grid-cols-2 gap-4">
              <DarkInput
                label="START DATE"
                value={exp.startDate}
                onChange={(v) => updateExperience(index, "startDate", v)}
                placeholder="Jan 2020"
              />
              <DarkInput
                label="END DATE"
                value={exp.endDate}
                onChange={(v) => updateExperience(index, "endDate", v)}
                placeholder="Present"
              />
            </div>
            <div className="md:col-span-2">
              <DarkTextArea
                label="DESCRIPTION"
                value={exp.description}
                onChange={(v) => updateExperience(index, "description", v)}
                placeholder="• Led development of key features...&#10;• Improved system performance by 40%..."
                rows={5}
                showBulletButton
              />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={addExperience}
        className="add-entry-btn"
      >
        <Plus className="w-5 h-5" />
        Add Experience
      </motion.button>

      <div className="flex justify-end mt-8">
        <button
          onClick={saveProgress}
          disabled={isSaving}
          className="save-btn flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Projects Form - Premium Dark Theme
function ProjectsForm() {
  const {
    resumeData,
    updateProject,
    addProject,
    removeProject,
    saveProgress,
    isSaving,
  } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--c-violet)]">
          <FolderOpen className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Projects</h2>
          <p className="text-xs text-slate-500">Showcase your best work</p>
        </div>
      </div>

      {resumeData.projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="dark-entry-card"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-purple-500/20 text-purple-400 text-sm font-bold border border-purple-500/30">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-white">
                Project {index + 1}
              </h3>
            </div>
            {resumeData.projects.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeProject(index)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DarkInput
              label="PROJECT NAME"
              value={project.name}
              onChange={(v) => updateProject(index, "name", v)}
              placeholder="E-commerce Platform"
            />
            <DarkInput
              label="TECHNOLOGIES USED"
              value={project.technologies}
              onChange={(v) => updateProject(index, "technologies", v)}
              placeholder="React, Node.js, MongoDB"
            />
            <DarkInput
              label="PROJECT LINK"
              value={project.link}
              onChange={(v) => updateProject(index, "link", v)}
              placeholder="github.com/username/project"
              hasLinkIcon
            />
            <div className="grid grid-cols-2 gap-4">
              <DarkInput
                label="START DATE"
                value={project.startDate}
                onChange={(v) => updateProject(index, "startDate", v)}
                placeholder="Jan 2023"
              />
              <DarkInput
                label="END DATE"
                value={project.endDate}
                onChange={(v) => updateProject(index, "endDate", v)}
                placeholder="Mar 2023"
              />
            </div>
            <div className="md:col-span-2">
              <DarkTextArea
                label="DESCRIPTION"
                value={project.description}
                onChange={(v) => updateProject(index, "description", v)}
                placeholder="• Built a full-stack web application...&#10;• Implemented user authentication..."
                rows={5}
                showBulletButton
              />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={addProject}
        className="add-entry-btn"
      >
        <Plus className="w-5 h-5" />
        Add Project
      </motion.button>

      <div className="flex justify-end mt-8">
        <button
          onClick={saveProgress}
          disabled={isSaving}
          className="save-btn flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Education Form - Premium Dark Theme
function EducationForm() {
  const {
    resumeData,
    updateEducation,
    addEducation,
    removeEducation,
    saveProgress,
    isSaving,
  } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--c-lime)]">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Education</h2>
          <p className="text-xs text-slate-500">Your academic background</p>
        </div>
      </div>

      {resumeData.education.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="dark-entry-card"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 text-sm font-bold border border-green-500/30">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-white">
                Education {index + 1}
              </h3>
            </div>
            {resumeData.education.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeEducation(index)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DarkInput
              label="INSTITUTION"
              value={edu.institution}
              onChange={(v) => updateEducation(index, "institution", v)}
              placeholder="Stanford University"
            />
            <DarkInput
              label="DEGREE"
              value={edu.degree}
              onChange={(v) => updateEducation(index, "degree", v)}
              placeholder="Bachelor of Science"
            />
            <DarkInput
              label="FIELD OF STUDY"
              value={edu.field}
              onChange={(v) => updateEducation(index, "field", v)}
              placeholder="Computer Science"
            />
            <DarkInput
              label="LOCATION"
              value={edu.location}
              onChange={(v) => updateEducation(index, "location", v)}
              placeholder="Stanford, CA"
            />
            <div className="grid grid-cols-2 gap-4">
              <DarkInput
                label="START DATE"
                value={edu.startDate}
                onChange={(v) => updateEducation(index, "startDate", v)}
                placeholder="Sep 2016"
              />
              <DarkInput
                label="END DATE"
                value={edu.endDate}
                onChange={(v) => updateEducation(index, "endDate", v)}
                placeholder="May 2020"
              />
            </div>
            <DarkInput
              label="GPA (OPTIONAL)"
              value={edu.gpa}
              onChange={(v) => updateEducation(index, "gpa", v)}
              placeholder="3.8/4.0"
            />
            <div className="md:col-span-2">
              <DarkTextArea
                label="ACHIEVEMENTS & ACTIVITIES"
                value={edu.achievements}
                onChange={(v) => updateEducation(index, "achievements", v)}
                placeholder="Dean's List, Relevant Coursework, Club Activities..."
                rows={3}
              />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={addEducation}
        className="add-entry-btn"
      >
        <Plus className="w-5 h-5" />
        Add Education
      </motion.button>

      <div className="flex justify-end mt-8">
        <button
          onClick={saveProgress}
          disabled={isSaving}
          className="save-btn flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Skills Form - Premium Dark Theme
function SkillsForm() {
  const {
    resumeData,
    addSkillCategory,
    removeSkillCategory,
    updateSkillCategoryTitle,
    addSkillToCategory,
    removeSkillFromCategory,
    saveProgress,
    isSaving,
  } = useResume();
  const [newSkills, setNewSkills] = useState({});

  const handleAddSkill = (categoryIndex) => {
    const skill = newSkills[categoryIndex] || "";
    if (skill.trim()) {
      addSkillToCategory(categoryIndex, skill);
      setNewSkills((prev) => ({ ...prev, [categoryIndex]: "" }));
    }
  };

  const handleKeyPress = (e, categoryIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(categoryIndex);
    }
  };

  const skillCategories = resumeData.skillCategories || [
    { id: "1", title: "Technical Skills", skills: [] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--c-yellow)]">
          <Wrench className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Skills</h2>
          <p className="text-xs text-slate-500">Highlight your expertise</p>
        </div>
      </div>

      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="dark-entry-card"
        >
          <div className="flex justify-between items-start mb-6">
            <input
              type="text"
              value={category.title}
              onChange={(e) =>
                updateSkillCategoryTitle(categoryIndex, e.target.value)
              }
              placeholder="Category name (e.g., Programming Languages)"
              className="dark-builder-input px-4 py-2.5 text-lg font-bold bg-transparent border-transparent focus:border-slate-600 w-full max-w-md"
            />
            {skillCategories.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeSkillCategory(categoryIndex)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newSkills[categoryIndex] || ""}
                onChange={(e) =>
                  setNewSkills((prev) => ({
                    ...prev,
                    [categoryIndex]: e.target.value,
                  }))
                }
                onKeyPress={(e) => handleKeyPress(e, categoryIndex)}
                placeholder="Type a skill and press Enter"
                className="dark-builder-input flex-1 px-4 py-3.5"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddSkill(categoryIndex)}
                className="px-5 py-3.5 bg-[var(--c-accent)] text-white border-2 border-white/20 hover:shadow-[0_0_0_2px_var(--c-accent)] transition-all"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="skill-pill"
                >
                  {skill}
                  <button
                    onClick={() =>
                      removeSkillFromCategory(categoryIndex, skillIndex)
                    }
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.span>
              ))}
              {category.skills.length === 0 && (
                <span className="text-sm text-slate-500 italic">
                  No skills added yet
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={addSkillCategory}
        className="add-entry-btn"
      >
        <Plus className="w-5 h-5" />
        Add Skill Category
      </motion.button>

      <div className="flex justify-end mt-8">
        <button
          onClick={saveProgress}
          disabled={isSaving}
          className="save-btn flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Summary Form - Premium Dark Theme
function SummaryForm() {
  const { resumeData, updatePersonalInfo, saveProgress, isSaving } =
    useResume();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="dark-builder-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--c-accent)]">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Professional Summary</h2>
          <p className="text-xs text-slate-500">A compelling introduction</p>
        </div>
      </div>

      <DarkTextArea
        label="PROFESSIONAL SUMMARY"
        value={resumeData.personalInfo.summary}
        onChange={(v) => updatePersonalInfo("summary", v)}
        placeholder="A passionate software engineer with 5+ years of experience in building scalable web applications. Expertise in React, Node.js, and cloud technologies. Led teams to deliver high-impact projects resulting in 40% improvement in user engagement..."
        rows={8}
        showBulletButton
      />

      <div className="flex justify-end mt-8">
        <button
          onClick={saveProgress}
          disabled={isSaving}
          className="save-btn flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function Editor({ onBack, onPreview }) {
  const { resumeData, currentStep, setCurrentStep } = useResume();
  const [activeTab, setActiveTab] = useState("contact");

  const handleTabChange = (tabId) => {
    if (tabId === "preview") {
      if (onPreview) onPreview();
      return;
    }
    setActiveTab(tabId);
    const stepMap = {
      contact: 0,
      experience: 1,
      project: 4,
      education: 2,
      skills: 3,
      summary: 0,
    };
    setCurrentStep(stepMap[tabId] || 0);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "contact":
        return <ContactForm />;
      case "experience":
        return <ExperienceForm />;
      case "project":
        return <ProjectsForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "summary":
        return <SummaryForm />;
      default:
        return <ContactForm />;
    }
  };

  return (
    <div className="h-full flex dark-builder relative overflow-hidden w-full">
      {/* Left Sidebar Navigation */}
      <div className="w-56 h-full bg-[#0d0d0d] border-r border-white/8 flex flex-col shrink-0">
        {/* Resume Name */}
        <div className="px-3 py-4 border-b border-white/8">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 bg-[var(--c-accent)] flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="text-white font-bold text-sm truncate block leading-tight">
                {resumeData.personalInfo.fullName || "My Resume"}
              </span>
              <span className="text-slate-600 text-[10px] font-medium uppercase tracking-wider">
                Draft
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-2">
            Sections
          </div>
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? "bg-[var(--c-accent)] text-white font-bold"
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-300 font-medium"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.title}</span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Preview Button */}
        <div className="p-3 border-t border-white/8">
          <button
            onClick={() => handleTabChange("preview")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--c-coral)] text-white text-sm font-bold hover:brightness-110 transition-all"
          >
            <Eye className="w-4 h-4" />
            Preview Resume
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
}
