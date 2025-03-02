'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// App name - you can change this
const APP_NAME = "RickshawGo";

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('vision');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setSubmitted(true);
      setEmail('');
      setName('');
      setActiveSection('waitlist-success'); // If you're using the section approach
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderVisionSection = () => (
    <section className="min-h-screen flex flex-col justify-center pt-24 md:pt-28">
      <div className="container mx-auto px-6 py-10 text-center">
        <div className="animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Revolutionizing</span> Daily Commutes in India
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
          No more guessing, no more waiting. Book an auto-rickshaw instantly with real-time tracking and transparent pricing.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => setActiveSection('waitlist')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
            >
              Join Waitlist
            </button>
            <button 
              onClick={() => {
                scrollToSection('how-it-works');
              }}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 shadow-lg"
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="relative w-full max-w-5xl mx-auto mt-12 animate-float">
          <div className="relative z-10 w-full h-96 md:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
            <video
              src="/app-auto.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -top-4 -right-4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </section>
  );

  const renderWaitlistSection = () => (
    <section className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Join Our Waitlist</h2>
          <p className="text-blue-100 mb-8 text-center">
            Be among the first to experience hassle-free auto-rickshaw booking when we launch.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-2">Your Name (Optional)</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">Email Address *</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 shadow-lg"
            >
              {submitting ? 'Joining...' : 'Join Waitlist'}
            </button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
            <button 
              onClick={() => setActiveSection('vision')}
              className="text-blue-300 hover:text-blue-400 text-sm flex items-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderWaitlistSuccessSection = () => (
    <section className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700 animate-fadeIn text-center">
          <div className="w-24 h-24 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Thanks for Joining!</h2>
          <p className="text-blue-100 mb-8">
  You&apos;re now on our waitlist. We&apos;ll notify you as soon as {APP_NAME} launches. Get ready for a revolutionary auto-rickshaw experience!
</p>
          
          <button 
            onClick={() => setActiveSection('vision')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </section>
  );
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>{APP_NAME} - Book Auto-Rickshaws in Real-Time</title>
        <meta name="description" content="Find and book nearby auto-rickshaws instantly. No more guessing, no more waiting!" />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes blob {
            0% { transform: scale(1); }
            33% { transform: scale(1.1); }
            66% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-fadeIn { animation: fadeIn 0.8s forwards; }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
      </Head>

      <header className={`fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-10 lg:px-16 flex justify-between items-center backdrop-blur-md ${scrolled ? 'bg-gray-900/95 shadow-2xl' : 'bg-gray-900/80'} border-b border-gray-800 transition-all duration-300`}>
        <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">{APP_NAME}</div>
        <nav className="hidden md:flex space-x-8">
          <a 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-it-works');
            }}
            href="#how-it-works" 
            className="text-blue-100 hover:text-blue-400 transition-colors cursor-pointer font-medium"
          >
            How It Works
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('roadmap');
            }}
            href="#roadmap" 
            className="text-blue-100 hover:text-blue-400 transition-colors cursor-pointer font-medium"
          >
            Roadmap
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('benefits');
            }}
            href="#benefits" 
            className="text-blue-100 hover:text-blue-400 transition-colors cursor-pointer font-medium"
          >
            Benefits
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('testimonials');
            }}
            href="#testimonials" 
            className="text-blue-100 hover:text-blue-400 transition-colors cursor-pointer font-medium"
          >
            Testimonials
          </a>
        </nav>
        <button 
          onClick={() => setActiveSection('waitlist')}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
        >
          Join Waitlist
        </button>
      </header>

      <main>
        {activeSection === 'vision' && renderVisionSection()}
        {activeSection === 'waitlist' && renderWaitlistSection()}
        {activeSection === 'waitlist-success' && renderWaitlistSuccessSection()}
        
        {activeSection === 'vision' && (
          <>
            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-6 md:px-10 lg:px-16 bg-gray-800">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 transform transition-all hover:scale-105 hover:border-blue-500 hover:shadow-xl">
                    <div className="w-16 h-16 relative group transition-all duration-300 transform hover:scale-110 mx-auto mb-6">
                      {/* Glowing background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-md group-hover:opacity-100"></div>
                      
                      {/* Icon container with gradient */}
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center text-white mb-3">Locate Nearby Autos</h3>
                    <p className="text-blue-100 text-center">Open the app & instantly see available auto-rickshaws near you in real-time</p>
                  </div>
                  <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 transform transition-all hover:scale-105 hover:border-blue-500 hover:shadow-xl">
                    <div className="w-16 h-16 relative group transition-all duration-300 transform hover:scale-110 mx-auto mb-6">
                      {/* Glowing background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-md group-hover:opacity-100"></div>
                      
                      {/* Icon container with gradient */}
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center text-white mb-3">Book With One Tap</h3>
                    <p className="text-blue-100 text-center">Select your auto & confirm your ride with transparent fare information</p>
                  </div>
                  <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 transform transition-all hover:scale-105 hover:border-blue-500 hover:shadow-xl">
                    <div className="w-16 h-16 relative group transition-all duration-300 transform hover:scale-110 mx-auto mb-6">
                      {/* Glowing background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-md group-hover:opacity-100"></div>
                      
                      {/* Icon container with gradient */}
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center text-white mb-3">Enjoy Stress-Free Ride</h3>
                    <p className="text-blue-100 text-center">Relax and enjoy your journey without haggling or waiting</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Roadmap/Structure Section */}
            <section id="roadmap" className="py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Our Development Roadmap</h2>
                <p className="text-center text-blue-100 mb-12 max-w-3xl mx-auto">The journey to revolutionizing auto-rickshaw travel in India</p>
                
                {/* Timeline Component */}
                <div className="relative">
                  {/* Center line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
                  
                  {/* Phase 1 */}
                  <div className="relative z-10 mb-20">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transform transition-all hover:scale-105 hover:border-blue-500 md:ml-auto" style={{maxWidth: "90%"}}>
                          <h3 className="text-2xl font-bold text-white mb-3">Phase 1: Market Research</h3>
                          <div className="h-1 w-20 bg-blue-500 mb-4 md:ml-auto"></div>
                          <p className="text-blue-100">Understanding user pain points and market needs through extensive research with both commuters and auto-rickshaw drivers.</p>                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center z-20 mx-4">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
                    </div>
                  </div>
                  
                  {/* Phase 2 */}
                  <div className="relative z-10 mb-20">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center z-20 mx-4">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div className="md:w-1/2 md:pl-16 mb-8 md:mb-0">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transform transition-all hover:scale-105 hover:border-blue-500" style={{maxWidth: "90%"}}>
                          <h3 className="text-2xl font-bold text-white mb-3">Phase 2: MVP Development</h3>
                          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
                          <p className="text-blue-100">Building and testing our minimum viable product with a small group of users to validate core functionality and gather feedback.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phase 3 */}
                  <div className="relative z-10 mb-20">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transform transition-all hover:scale-105 hover:border-blue-500 md:ml-auto" style={{maxWidth: "90%"}}>
                          <h3 className="text-2xl font-bold text-white mb-3">Phase 3: App Launch</h3>
                          <div className="h-1 w-20 bg-blue-500 mb-4 md:ml-auto"></div>
                          <p className="text-blue-100">Official launch in key metropolitan cities with extensive driver onboarding and marketing campaigns to attract early adopters.</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center z-20 mx-4">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
                    </div>
                  </div>
                  
                  {/* Phase 4 */}
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center z-20 mx-4">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div className="md:w-1/2 md:pl-16 mb-8 md:mb-0">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transform transition-all hover:scale-105 hover:border-blue-500" style={{maxWidth: "90%"}}>
                          <h3 className="text-2xl font-bold text-white mb-3">Phase 4: Expansion</h3>
                          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
                          <p className="text-blue-100">Expanding to Tier 2 and Tier 3 cities while adding advanced features like subscription plans, premium services, and driver benefits.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* App Features */}
            <section className="py-20 px-6 md:px-10 lg:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="w-full md:w-1/2">
                    <div className="relative w-full h-96 md:h-[28rem] rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-30"></div>
                      <Image 
                        src="/auto-app-screen.png" 
                        alt="App features showcase" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Powerful Features <br/>For Daily Commuters</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 relative group transition-all duration-300">
                          {/* Glowing background effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
                          
                          {/* Icon container with gradient */}
                          <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold text-white mb-2">Real-Time Tracking</h3>
                          <p className="text-blue-100">See available autos near you and track your driver&apos;s arrival in real-time.</p>                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 relative group transition-all duration-300">
                          {/* Glowing background effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
                          {/* Icon container with gradient */}
          <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-white mb-2">Scheduled Rides</h3>
          <p className="text-blue-100">Book your daily commute in advance and enjoy consistent pick-up times.</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex-shrink-0 w-12 h-12 relative group transition-all duration-300">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
          
          {/* Icon container with gradient */}
          <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-white mb-2">Safety & Transparency</h3>
          <p className="text-blue-100">Choose seating preferences, see driver ratings, and get upfront pricing with no surprises.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</section>

{/* Benefits Section */}
<section id="benefits" className="py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-gray-800 to-gray-900">
<div className="max-w-6xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Why Choose {APP_NAME}?</h2>
  <p className="text-center text-blue-100 mb-12 max-w-3xl mx-auto">Our platform is designed with both passengers and drivers in mind, creating a seamless experience for everyone.</p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="w-12 h-12 relative group mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
      <p className="text-blue-100">No more standing on the roadside waving at autos. Book from anywhere and have your ride come to you.</p>
    </div>
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="w-12 h-12 relative group mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Transparent Pricing</h3>
      <p className="text-blue-100">No more haggling or overcharging. See the exact fare before confirming your ride.</p>
    </div>
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="w-12 h-12 relative group mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Enhanced Safety</h3>
      <p className="text-blue-100">Choose drivers based on ratings, select your seating preference, and share your ride details with family.</p>
    </div>
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="w-12 h-12 relative group mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Reliable for Daily Commute</h3>
      <p className="text-blue-100">Schedule recurring rides for your office commute and never worry about finding transportation again.</p>
    </div>
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="w-12 h-12 relative group mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Cashless Payments</h3>
      <p className="text-blue-100">Pay with your preferred digital payment method and maintain a record of all your trips.</p>
    </div>
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="w-12 h-12 relative group mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-75 blur-sm group-hover:opacity-100"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Ride Notifications</h3>
      <p className="text-blue-100">Get timely alerts about your ride status, driver arrival, and special offers.</p>
    </div>
  </div>
</div>
</section>

{/* Testimonials Section */}
<section id="testimonials" className="py-20 px-6 md:px-10 lg:px-16">
<div className="max-w-6xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">What Users Say</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden flex items-center justify-center">
          <Image src="/avatar1.jpg" alt="User avatar" width={48} height={48} className="object-cover" />
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-white">Priya S.</h4>
          <p className="text-sm text-blue-200">Daily Commuter</p>
        </div>
      </div>
      <div className="flex text-amber-400 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <p className="text-blue-100">&quot;No more standing in the sun waving at autos! I schedule my office pickup every day at 8:30 AM, and it&apos;s so reliable.&quot;</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden flex items-center justify-center">
          <Image src="/avatar2.png" alt="User avatar" width={48} height={48} className="object-cover" />
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-white">Rahul M.</h4>
          <p className="text-sm text-blue-200">IT Professional</p>
        </div>
      </div>
      <div className="flex text-amber-400 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <p className="text-blue-100">&quot;The transparent pricing is what I love most. No more haggling or paying extra during rush hour or rain.&quot;</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:border-blue-500">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden flex items-center justify-center">
          <Image src="/avatar3.png" alt="User avatar" width={48} height={48} className="object-cover" />
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-white">Ananya K.</h4>
          <p className="text-sm text-blue-200">College Student</p>
        </div>
      </div>
      <div className="flex text-amber-400 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.0492.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <p className="text-blue-100">&quot;As a woman, I feel much safer selecting autos with good ratings. The seating preference feature is so useful!&quot;</p>
    </div>
  </div>
</div>
</section>

{/* Final CTA Section */}
<section className="py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-r from-blue-900 to-gray-900">
<div className="max-w-4xl mx-auto text-center">
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Daily Commute?</h2>
  <p className="text-xl text-blue-100 mb-10">Join our waitlist and be among the first to experience the future of auto-rickshaw travel.</p>
  <button 
    onClick={() => setActiveSection('waitlist')}
    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
  >
    Join the Waitlist Now
  </button>
</div>
</section>
</>
)}
</main>

<footer className="py-12 px-6 md:px-10 lg:px-16 bg-gray-900 border-t border-gray-800">
<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
<div className="mb-10 md:mb-0 text-center md:text-left">
  <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 mb-2">{APP_NAME}</div>
  <p className="text-blue-100 max-w-xs mx-auto md:mx-0">Revolutionizing daily auto-rickshaw commutes in India with real-time booking and tracking.</p>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
  <div>
    <h3 className="font-semibold text-white mb-3">Platform</h3>
    <ul className="space-y-2">
      <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works');}} className="text-blue-300 hover:text-blue-400 transition-colors">How It Works</a></li>
      <li><a href="#roadmap" onClick={(e) => { e.preventDefault(); scrollToSection('roadmap');}} className="text-blue-300 hover:text-blue-400 transition-colors">Roadmap</a></li>
      <li><a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits');}} className="text-blue-300 hover:text-blue-400 transition-colors">Benefits</a></li>
    </ul>
  </div>
  <div>
    <h3 className="font-semibold text-white mb-3">Connect</h3>
    <ul className="space-y-2">
      <li><a href="#" className="text-blue-300 hover:text-blue-400 transition-colors">Contact Us</a></li>
      <li><a href="#" className="text-blue-300 hover:text-blue-400 transition-colors">Support</a></li>
      <li><a href="#" className="text-blue-300 hover:text-blue-400 transition-colors">Careers</a></li>
    </ul>
  </div>
  <div>
    <h3 className="font-semibold text-white mb-3">Social</h3>
    <div className="flex space-x-4">
      <a href="https://x.com/flywithpunit" className="text-blue-300 hover:text-blue-400 transition-colors">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </a>
      <a href="https://www.linkedin.com/in/flywithpunit/" className="text-blue-300 hover:text-blue-400 transition-colors">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      </a>
      <a href="https://www.instagram.com/flywithpunit/" className="text-blue-300 hover:text-blue-400 transition-colors">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
    </div>
  </div>
</div>
</div>
<div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center">
<p className="text-blue-200 text-sm">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
</div>
</footer>
</div>
);
}