import React, { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Code, Database, Palette, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0..100
}

interface SkillCategory {
  title: string;
  icon?: LucideIcon;
  color: string;          // Tailwind gradient classes e.g. 'from-purple-500 to-pink-500'
  skills: Skill[];
}

interface PortfolioData {
  skillCategories: SkillCategory[];
}

interface SkillsProps {
  portfolioData?: PortfolioData;
}

const Skills: React.FC<SkillsProps> = ({ portfolioData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);

  // Use portfolio data if available, otherwise use defaults
  const defaultCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'React', level: 40 },
        { name: 'TypeScript', level: 35 },
        { name: 'Next.js', level: 25 },
        { name: 'Tailwind CSS', level: 30 },
        { name: 'Vue.js', level: 20}

      ]
    },
    {
      title: 'Backend',
      icon: Database ,
      color: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'FastAPI', level: 78 },
        { name: '.NET', level: 75 }

      ]
    },
    // {
    //   title: 'Design',
    //   icon: Palette,
    //   color: 'from-pink-500 to-red-500',
    //   skills: [
    //     { name: 'Figma', level: 90 },
    //     { name: 'Adobe XD', level: 85 },
    //     { name: 'UI/UX', level: 88 },
    //     { name: 'Prototyping', level: 82 },
    //     { name: 'Branding', level: 75 }
    //   ]
    // },
    {
      title: 'Tools',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Git', level: 95 },
        { name: 'Docker', level: 75 },
        { name: 'Agile', level: 70 },
        { name: 'GitHub', level: 85 },
        { name: 'CI/CD', level: 78 }
      ]
    }
  ];

  const skillCategories: SkillCategory[] =
    (portfolioData?.skillCategories as SkillCategory[]) ?? defaultCategories;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills with staggered delay
          setTimeout(() => {
            skillCategories.forEach((category: SkillCategory, categoryIndex: number) => {
              // ما نحتاج قيمة skill هنا، فقط الفهرس
              category.skills.forEach((_: Skill, skillIndex: number) => {
                setTimeout(() => {
                  setAnimatedSkills(prev => ({
                    ...prev,
                    [`${categoryIndex}-${skillIndex}`]: true
                  }));
                }, categoryIndex * 200 + skillIndex * 100);
              });
            });
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Icon/color mapping fallbacks
  const getIconForCategory = (title: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      Frontend: Code,
      Backend: Database,
      Design: Palette,
      Tools: Zap,
    };
    return iconMap[title] ?? Code;
  };

  const getColorForCategory = (title: string): string => {
    const colorMap: Record<string, string> = {
      Frontend: 'from-purple-500 to-pink-500',
      Backend: 'from-cyan-500 to-blue-500',
      Design: 'from-pink-500 to-red-500',
      Tools: 'from-green-500 to-emerald-500'
    };
    return colorMap[title] ?? 'from-purple-500 to-pink-500';
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            My{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and creative expertise to bring your
            vision to life.
          </p>
        </div>

        {/* Grid: أعمدة مرنة + توسيط */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-center">
          {skillCategories.map((category: SkillCategory, categoryIndex: number) => {
            const IconComponent = category.icon ?? getIconForCategory(category.title);
            const categoryColor = category.color ?? getColorForCategory(category.title);

            return (
              <div
                key={categoryIndex}
                className={`group relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                {/* تحديد أقصى عرض للكرت + توسيطه */}
                <div className="w-full max-w-[360px] mx-auto">
                  <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${categoryColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-8 text-center">
                        {category.title}
                      </h3>

                      <div className="space-y-6">
                        {category.skills.map((skill: Skill, skillIndex: number) => (
                          <div key={skillIndex} className="relative">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-gray-300 font-medium">{skill.name}</span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                              <div
                                className={`bg-gradient-to-r ${categoryColor} h-full rounded-full transition-all duration-1000 ease-out ${
                                  animatedSkills[`${categoryIndex}-${skillIndex}`]
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                }`}
                                style={{
                                  width: animatedSkills[`${categoryIndex}-${skillIndex}`]
                                    ? `${skill.level}%`
                                    : '0%',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
