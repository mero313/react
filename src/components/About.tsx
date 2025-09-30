import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Target, Rocket, Heart } from 'lucide-react';

interface AboutProps {
  portfolioData?: any;
}

const About: React.FC<AboutProps> = ({ portfolioData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Use portfolio data if available, otherwise use defaults
  const personalInfo = portfolioData?.personalInfo || {
    name: 'Amerr Mazin',
    description: 'I’m Ameer Mazin, a passionate developer driven by a vision to turn complex ideas into meaningful digital solutions. My journey is fueled by curiosity, problem-solving, and a commitment to building systems that combine functionality with impact.'
  };
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

  const values = [
    {
      icon: Sparkles,
      title: 'Innovation First',
      description: 'Always pushing boundaries with cutting-edge technologies and creative solutions.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Precision Focus',
      description: 'Every pixel matters. Attention to detail that makes the difference.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Rocket,
      title: 'Fast Execution',
      description: 'Rapid development without compromising quality or user experience.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'Love for code and design shows in every project I create.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {personalInfo.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl rotate-6 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl -rotate-6 animate-pulse animation-delay-1000"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white text-6xl font-black shadow-2xl">
                  <span className="animate-pulse" >AM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I believe in precision, creativity, and continuous growth. From brainstorming concepts to delivering complete solutions, I approach every challenge with determination and focus on creating value that lasts.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Beyond coding, I’m always exploring new knowledge, sharing experiences, and pushing myself to grow both as a professional and as a person. My goal is to leave a mark through work that empowers people and organizations to achieve more.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                👉 Above all, I aim to build a career that reflects both my passion for technology and my drive to make a real difference.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {['.NET', 'Python', 'Node.js', 'FastApi', 'JavaScript'].map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 font-medium hover:scale-105 transition-transform duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {values.map((value, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`relative w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 text-center">{value.title}</h3>
              <p className="text-gray-400 text-center leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;