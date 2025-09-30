import React, { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Smartphone,
  Globe,
  ShoppingCart,
  Play,
} from "lucide-react";

interface ProjectsProps {
  portfolioData?: any;
}

const Projects: React.FC<ProjectsProps> = ({ portfolioData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Use portfolio data if available, otherwise use defaults
  const projects = portfolioData?.projects || [
    {
      title: "Leave Request System",
      description:
        "A Leave Management System built with ASP.NET Core 9 + Entity Framework Core + SQLite.This system helps organizations manage departments, employees, and leave requests with role-based access control (HR, Manager, Employee).",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "ASP.NET", "CI/CD", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/mero313/leavesystem",
      icon: ShoppingCart,
      gradient: "from-purple-500 to-pink-500",
    },
     {
      title: "Real Estate Web App",
      description:
        "A platform for buying, selling, and renting real estate with integrated admin dashboard.",
      image:
        "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Flask", "SQLite", "HTML", "CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/issaalkhalede/cs50-project",
      icon: Globe,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Voting System",
      description:
        "A secure electronic voting platform designed to streamline the voting process. Features user authentication, real-time results, and robust backend logic",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [" Python", "Django", "SQLite","HTML", "CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/mero313/fastapi",
      icon: Smartphone,
      gradient: "from-green-500 to-emerald-500",
    }, 
    {
      title: "Warehouse Management System",
      description:
        "A clean-architecture Warehouse Management System (WMS) built with .NET 9, Entity Framework Core, PostgreSQL, JWT Authentication, and Swagger.This project provides APIs for managing warehouses, items, stock movements (in/out), and transfers.",
      image:
      
        "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Next.js", "TypeScript", "ASP.NET", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/mero313/WarehouseSyS",
      icon: Globe,
      gradient: "from-cyan-500 to-blue-500",
    },
    
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Helper function to get icon for projects
  const getProjectIcon = (project: any) => {
    if (project.icon) return project.icon;
    // Default icon based on project type or just use Globe
    return Globe;
  };

  const getProjectGradient = (project: any) => {
    if (project.gradient) return project.gradient;
    // Default gradient
    return "from-purple-500 to-pink-500";
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Showcasing innovative solutions that push the boundaries of what's
            possible in web development.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) =>
            (() => {
              const ProjectIcon = getProjectIcon(project);
              const projectGradient = getProjectGradient(project);
              return (
                <div
                  key={index}
                  className={`group relative transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Overlay Icons */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${projectGradient} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <ProjectIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                          hoveredProject === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="relative p-8">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium hover:bg-purple-500/30 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-6">
                        <a
                          href={project.liveUrl} target="_blank"
                          className="group/link flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-medium transition-all duration-300"
                        >
                          <ExternalLink className="h-5 w-5 group-hover/link:scale-110 transition-transform duration-300" />
                          <span>Live Demo</span>
                        </a>
                        <a
                          href={project.githubUrl} target="_blank"
                          className="group/link flex items-center space-x-2 text-gray-400 hover:text-gray-300 font-medium transition-all duration-300"
                        >
                          <Github className="h-5 w-5 group-hover/link:scale-110 transition-transform duration-300" />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
