'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

const initialResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: ''
  },
  experience: [
    {
      id: '1',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  education: [
    {
      id: '1',
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: ''
    }
  ],
  skillCategories: [
    {
      id: '1',
      title: 'Technical Skills',
      skills: []
    }
  ],
  projects: [
    {
      id: '1',
      name: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: ''
    }
  ],
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects']
};

const ResumeContext = createContext(undefined);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeTemplate, setActiveTemplate] = useState('minimalist');
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const saveTimeoutRef = useRef(null);

  // Auto-save to database with debounce
  const saveToDatabase = useCallback(async (data, template) => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: data, activeTemplate: template }),
      });
      
      if (!response.ok) {
        console.error('Failed to save to database');
      }
    } catch (error) {
      console.error('Error saving to database:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Debounced auto-save
  const debouncedSave = useCallback((data, template) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveToDatabase(data, template);
    }, 2000); // Save after 2 seconds of no changes
  }, [saveToDatabase]);

  // Load resume from database
  const loadFromDatabase = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/resume');
      const result = await response.json();
      
      if (result.data) {
        const dbData = {
          personalInfo: result.data.personalInfo || initialResumeData.personalInfo,
          experience: result.data.experience?.length > 0 ? result.data.experience : initialResumeData.experience,
          education: result.data.education?.length > 0 ? result.data.education : initialResumeData.education,
          skillCategories: result.data.skillCategories?.length > 0 ? result.data.skillCategories : initialResumeData.skillCategories,
          projects: result.data.projects?.length > 0 ? result.data.projects : initialResumeData.projects,
          sectionOrder: result.data.sectionOrder || initialResumeData.sectionOrder,
        };
        setResumeData(dbData);
        if (result.data.activeTemplate) {
          setActiveTemplate(result.data.activeTemplate);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading from database:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const updateExperience = useCallback((index, field, value) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return { ...prev, experience: newExperience };
    });
  }, []);

  const addExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  }, []);

  const removeExperience = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  }, []);

  const moveExperienceUp = useCallback((index) => {
    setResumeData(prev => {
      if (index === 0) return prev;
      const newExperience = [...prev.experience];
      [newExperience[index - 1], newExperience[index]] = [newExperience[index], newExperience[index - 1]];
      return { ...prev, experience: newExperience };
    });
  }, []);

  const moveExperienceDown = useCallback((index) => {
    setResumeData(prev => {
      if (index === prev.experience.length - 1) return prev;
      const newExperience = [...prev.experience];
      [newExperience[index], newExperience[index + 1]] = [newExperience[index + 1], newExperience[index]];
      return { ...prev, experience: newExperience };
    });
  }, []);

  const updateEducation = useCallback((index, field, value) => {
    setResumeData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value
      };
      return { ...prev, education: newEducation };
    });
  }, []);

  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: '',
          achievements: ''
        }
      ]
    }));
  }, []);

  const removeEducation = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  }, []);

  // Skill Category functions
  const addSkillCategory = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      skillCategories: [
        ...prev.skillCategories,
        {
          id: Date.now().toString(),
          title: '',
          skills: []
        }
      ]
    }));
  }, []);

  const removeSkillCategory = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((_, i) => i !== index)
    }));
  }, []);

  const updateSkillCategoryTitle = useCallback((index, title) => {
    setResumeData(prev => {
      const newCategories = [...prev.skillCategories];
      newCategories[index] = { ...newCategories[index], title };
      return { ...prev, skillCategories: newCategories };
    });
  }, []);

  const addSkillToCategory = useCallback((categoryIndex, skill) => {
    if (skill.trim()) {
      setResumeData(prev => {
        const newCategories = [...prev.skillCategories];
        newCategories[categoryIndex] = {
          ...newCategories[categoryIndex],
          skills: [...newCategories[categoryIndex].skills, skill.trim()]
        };
        return { ...prev, skillCategories: newCategories };
      });
    }
  }, []);

  const removeSkillFromCategory = useCallback((categoryIndex, skillIndex) => {
    setResumeData(prev => {
      const newCategories = [...prev.skillCategories];
      newCategories[categoryIndex] = {
        ...newCategories[categoryIndex],
        skills: newCategories[categoryIndex].skills.filter((_, i) => i !== skillIndex)
      };
      return { ...prev, skillCategories: newCategories };
    });
  }, []);

  const updateProject = useCallback((index, field, value) => {
    setResumeData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = {
        ...newProjects[index],
        [field]: value
      };
      return { ...prev, projects: newProjects };
    });
  }, []);

  const addProject = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          name: '',
          description: '',
          technologies: '',
          link: '',
          startDate: '',
          endDate: ''
        }
      ]
    }));
  }, []);

  const removeProject = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  }, []);

  const moveProjectUp = useCallback((index) => {
    setResumeData(prev => {
      if (index === 0) return prev;
      const newProjects = [...prev.projects];
      [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
      return { ...prev, projects: newProjects };
    });
  }, []);

  const moveProjectDown = useCallback((index) => {
    setResumeData(prev => {
      if (index === prev.projects.length - 1) return prev;
      const newProjects = [...prev.projects];
      [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
      return { ...prev, projects: newProjects };
    });
  }, []);

  const saveProgress = useCallback(async () => {
    // Save to localStorage as backup
    if (typeof window !== 'undefined') {
      localStorage.setItem('capsloque-resume', JSON.stringify(resumeData));
      localStorage.setItem('capsloque-template', activeTemplate);
    }
    // Save to database
    await saveToDatabase(resumeData, activeTemplate);
  }, [resumeData, activeTemplate, saveToDatabase]);

  const loadProgress = useCallback(async () => {
    // First try to load from database
    const loadedFromDb = await loadFromDatabase();
    
    // If no data in database, try localStorage
    if (!loadedFromDb && typeof window !== 'undefined') {
      const saved = localStorage.getItem('capsloque-resume');
      const savedTemplate = localStorage.getItem('capsloque-template');
      if (saved) {
        const parsedData = JSON.parse(saved);
        
        // Migrate old skills format to new skillCategories format
        if (parsedData.skills && !parsedData.skillCategories) {
          const skillCategories = [];
          if (parsedData.skills.technical?.length > 0) {
            skillCategories.push({ id: '1', title: 'Technical Skills', skills: parsedData.skills.technical });
          }
          if (parsedData.skills.languages?.length > 0) {
            skillCategories.push({ id: '2', title: 'Programming Languages', skills: parsedData.skills.languages });
          }
          if (parsedData.skills.tools?.length > 0) {
            skillCategories.push({ id: '3', title: 'Tools & Frameworks', skills: parsedData.skills.tools });
          }
          if (skillCategories.length === 0) {
            skillCategories.push({ id: '1', title: 'Technical Skills', skills: [] });
          }
          parsedData.skillCategories = skillCategories;
          delete parsedData.skills;
        }
        
        // Ensure sectionOrder exists
        if (!parsedData.sectionOrder) {
          parsedData.sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects'];
        }
        
        setResumeData(parsedData);
        
        // Save localStorage data to database for future
        saveToDatabase(parsedData, savedTemplate || activeTemplate);
      }
      if (savedTemplate) {
        setActiveTemplate(savedTemplate);
      }
    }
  }, [loadFromDatabase, saveToDatabase, activeTemplate]);

  const resetResume = useCallback(async () => {
    setResumeData(initialResumeData);
    setCurrentStep(0);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('capsloque-resume');
    }
    // Also reset in database
    await saveToDatabase(initialResumeData, 'minimalist');
  }, [saveToDatabase]);

  const updateSectionOrder = useCallback((newOrder) => {
    setResumeData(prev => ({
      ...prev,
      sectionOrder: newOrder
    }));
  }, []);

  const moveSectionUp = useCallback((sectionId) => {
    setResumeData(prev => {
      const currentIndex = prev.sectionOrder.indexOf(sectionId);
      if (currentIndex > 0) {
        const newOrder = [...prev.sectionOrder];
        [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
        return { ...prev, sectionOrder: newOrder };
      }
      return prev;
    });
  }, []);

  const moveSectionDown = useCallback((sectionId) => {
    setResumeData(prev => {
      const currentIndex = prev.sectionOrder.indexOf(sectionId);
      if (currentIndex < prev.sectionOrder.length - 1) {
        const newOrder = [...prev.sectionOrder];
        [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
        return { ...prev, sectionOrder: newOrder };
      }
      return prev;
    });
  }, []);

  // Custom setActiveTemplate that also saves to database
  const changeTemplate = useCallback((newTemplate, skipSave = false) => {
    setActiveTemplate(prev => {
      // Only save if template actually changed and skipSave is false
      if (prev !== newTemplate && !skipSave) {
        saveToDatabase(resumeData, newTemplate);
      }
      return newTemplate;
    });
  }, [resumeData, saveToDatabase]);

  const value = {
    resumeData,
    activeTemplate,
    currentStep,
    isSaving,
    isLoading,
    setActiveTemplate: changeTemplate,
    setCurrentStep,
    updatePersonalInfo,
    updateExperience,
    addExperience,
    removeExperience,
    moveExperienceUp,
    moveExperienceDown,
    updateEducation,
    addEducation,
    removeEducation,
    addSkillCategory,
    removeSkillCategory,
    updateSkillCategoryTitle,
    addSkillToCategory,
    removeSkillFromCategory,
    updateProject,
    addProject,
    removeProject,
    moveProjectUp,
    moveProjectDown,
    saveProgress,
    loadProgress,
    resetResume,
    updateSectionOrder,
    moveSectionUp,
    moveSectionDown,
    debouncedSave,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
