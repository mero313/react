// src/App.tsx
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

import type {
  PortfolioData,
} from './types';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDashboardMode, setIsDashboardMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (!isDashboardMode) window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDashboardMode]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('dashboard') === 'true') setIsDashboardMode(true);

    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as PortfolioData;
        setPortfolioData(parsed);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  if (isDashboardMode) {
    return (
      <Dashboard
        onDataUpdate={(data) => {
          setPortfolioData(data);
          localStorage.setItem('portfolioData', JSON.stringify(data));
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        portfolioData={portfolioData ?? undefined}
      />
      <Hero portfolioData={portfolioData ?? undefined} />
      <About portfolioData={portfolioData ?? undefined} />
      <Skills portfolioData={portfolioData ?? undefined} />
      <Projects portfolioData={portfolioData ?? undefined} />
      <Contact portfolioData={portfolioData ?? undefined} />
      <Footer />

      {/* زر فتح الداشبورد */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* <button
          onClick={() => setIsDashboardMode(true)}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
          title="Open Dashboard"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button> */}
      </div>
    </div>
  );
}

export default App;
