import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  User,
  Code,
  Briefcase,
  Mail,
  Settings,
  Eye,
  EyeOff,
  X,
  Check,
} from 'lucide-react';

interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skillCategories: SkillCategory[];
  projects: Project[];
}

type DashboardProps = {
  onDataUpdate?: (data: PortfolioData) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ onDataUpdate }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'skills' | 'projects' | 'contact' | 'settings'>('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'Ameer Mazin',
    title: 'Creative Developer',
    subtitle: 'Crafting Digital Experiences with Passion & Precision',
    description:
      "I’m a dedicated developer who transforms ideas into impactful digital solutions. With a strong passion for building systems that are both functional and reliable, I focus on creating applications that truly make a difference.",
    email: 'hello@johndoe.dev',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    github: 'https://github.com/mero313',
    linkedin: 'https://www.linkedin.com/in/ameer-mazin-438753265/',
    twitter: 'https://x.com/MeRo_7x',
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 80 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'MongoDB', level: 78 },
        { name: 'GraphQL', level: 75 },
      ],
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      title: 'E-Commerce Revolution',
      description:
        'Next-generation e-commerce platform with AI-powered recommendations, real-time inventory, and seamless payment integration.',
      image:
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'AI/ML', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Collaborative Workspace',
      description:
        'Real-time collaboration platform with advanced project management, team communication, and productivity analytics.',
      image:
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'TypeScript', 'WebSocket', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ]);

  
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsedData: PortfolioData = JSON.parse(savedData);
        setPersonalInfo(parsedData.personalInfo);
        setSkillCategories(parsedData.skillCategories);
        setProjects(parsedData.projects);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data: PortfolioData = {
        personalInfo,
        skillCategories,
        projects,
      };

     
      localStorage.setItem('portfolioData', JSON.stringify(data));
      (window as any).portfolioData = data;

      
      onDataUpdate?.(data);

     
      await new Promise((r) => setTimeout(r, 800));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      console.log('Data saved successfully:', data);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const exportData = () => {
    const data: PortfolioData = { personalInfo, skillCategories, projects };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const importData = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported: PortfolioData = JSON.parse(String(e.target?.result));
        setPersonalInfo(imported.personalInfo);
        setSkillCategories(imported.skillCategories);
        setProjects(imported.projects);
        alert('Data imported successfully!');
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const addSkill = (categoryIndex: number) => {
    const draft = [...skillCategories];
    draft[categoryIndex].skills.push({ name: 'New Skill', level: 50 });
    setSkillCategories(draft);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const draft = [...skillCategories];
    draft[categoryIndex].skills.splice(skillIndex, 1);
    setSkillCategories(draft);
  };

  const updateSkill = (
    categoryIndex: number,
    skillIndex: number,
    field: keyof Skill,
    value: string | number
  ) => {
    const draft = [...skillCategories];
    draft[categoryIndex].skills[skillIndex] = {
      ...draft[categoryIndex].skills[skillIndex],
      [field]: value,
    };
    setSkillCategories(draft);
  };

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        title: 'New Project',
        description: 'Project description...',
        image:
          'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React'],
        liveUrl: '#',
        githubUrl: '',
      },
    ]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    const draft = [...projects];
    (draft[index] as any)[field] = value;
    setProjects(draft);
  };

  const addSkillCategory = () => {
    setSkillCategories((prev) => [
      ...prev,
      { title: 'New Category', skills: [{ name: 'New Skill', level: 50 }] },
    ]);
  };

  const removeSkillCategory = (categoryIndex: number) => {
    setSkillCategories(skillCategories.filter((_, i) => i !== categoryIndex));
  };

  const updateSkillCategory = (categoryIndex: number, title: string) => {
    const draft = [...skillCategories];
    draft[categoryIndex].title = title;
    setSkillCategories(draft);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Edit3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Portfolio Dashboard</h1>
                <p className="text-gray-400 text-sm">Manage your portfolio content</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('dashboard');
                  window.location.href = url.toString();
                }}
                className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-lg transition-all"
              >
                ← Back
              </button>

              <button
                onClick={() => setIsPreviewMode((p) => !p)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                {isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{isPreviewMode ? 'Edit Mode' : 'Preview'}</span>
              </button>

              <button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('dashboard');
                  window.location.href = url.toString();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
              >
                <X className="h-4 w-4" />
                <span>Exit Dashboard</span>
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                  saveSuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              {/* Personal */}
              {activeTab === 'personal' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-8">
                    <User className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Professional Title</label>
                      <input
                        type="text"
                        value={personalInfo.title}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={personalInfo.subtitle}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, subtitle: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">About Description</label>
                      <textarea
                        rows={4}
                        value={personalInfo.description}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Twitter URL</label>
                      <input
                        type="url"
                        value={personalInfo.twitter}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, twitter: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Skills */}
              {activeTab === 'skills' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Code className="h-6 w-6 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Skills Management</h2>
                    </div>
                    <button
                      onClick={addSkillCategory}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Category</span>
                    </button>
                  </div>

                  {skillCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-6">
                        <input
                          type="text"
                          value={category.title}
                          onChange={(e) => updateSkillCategory(categoryIndex, e.target.value)}
                          className="text-xl font-bold bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addSkill(categoryIndex)}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Skill</span>
                          </button>
                          {skillCategories.length > 1 && (
                            <button
                              onClick={() => removeSkillCategory(categoryIndex)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex items-center gap-4">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkill(categoryIndex, skillIndex, 'name', e.target.value)}
                              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={skill.level}
                              onChange={(e) => updateSkill(categoryIndex, skillIndex, 'level', Number(e.target.value))}
                              className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                            <span className="text-gray-400 text-sm w-8">%</span>
                            <button
                              onClick={() => removeSkill(categoryIndex, skillIndex)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {activeTab === 'projects' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-6 w-6 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Projects Management</h2>
                    </div>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-start justify-between mb-6">
                          <h3 className="text-lg font-bold text-white">Project {index + 1}</h3>
                          <button
                            onClick={() => removeProject(index)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProject(index, 'title', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                            <input
                              type="url"
                              value={project.image}
                              onChange={(e) => updateProject(index, 'image', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea
                              rows={3}
                              value={project.description}
                              onChange={(e) => updateProject(index, 'description', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
                            <input
                              type="text"
                              value={project.technologies.join(', ')}
                              onChange={(e) =>
                                updateProject(
                                  index,
                                  'technologies',
                                  e.target.value
                                    .split(',')
                                    .map((t) => t.trim())
                                    .filter(Boolean)
                                )
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                            <input
                              type="url"
                              value={project.liveUrl}
                              onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                            <input
                              type="url"
                              value={project.githubUrl}
                              onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact (نفس حقول personal email/phone/location والروابط) */}
              {activeTab === 'contact' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Mail className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Twitter URL</label>
                      <input
                        type="url"
                        value={personalInfo.twitter}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, twitter: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Settings className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Settings</h2>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Data Management</h3>
                    <p className="text-gray-400 mb-6">
                      Export your portfolio data for backup or import previously saved data.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={exportData}
                        className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all hover:scale-105"
                      >
                        Export Data
                      </button>
                      <label className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all hover:scale-105 cursor-pointer">
                        Import Data
                        <input type="file" accept=".json" onChange={importData} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Storage Info</h3>
                    <p className="text-gray-400 mb-4">
                      Your portfolio data is automatically saved to your browser&apos;s local storage.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>• Changes are saved when you click &quot;Save Changes&quot;</p>
                      <p>• Data persists between browser sessions</p>
                      <p>• Export your data regularly for backup</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Reset Data</h3>
                    <p className="text-gray-400 mb-4">
                      Reset all portfolio data to default values. This action cannot be undone.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                          localStorage.removeItem('portfolioData');
                          window.location.reload();
                        }
                      }}
                      className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all hover:scale-105"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
