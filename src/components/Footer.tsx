import React from 'react';
import { Sparkles, Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6 group cursor-pointer" onClick={scrollToTop}>
            <div className="relative">
              <Sparkles className="h-10 w-10 text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
            </div>
            <span className="font-black text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Ameer Mazin
            </span>
          </div>
          
          <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into exceptional digital experiences. 
            Let's build the future together, one line of code at a time.
          </p>
          
          <div className="flex items-center justify-center space-x-3 text-gray-400 mb-8">
            <span>Crafted with</span>
            <Heart className="h-5 w-5 text-red-500 fill-current animate-pulse" />
            <span>and lots of</span>
            <span className="text-purple-400 font-semibold">caffeine</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
            <span>Back to Top</span>
          </button>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved. Built with React & Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;