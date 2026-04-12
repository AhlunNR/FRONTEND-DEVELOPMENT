import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLines from '../components/ui/FloatingLines';
import StaggeredMenu from '../components/shared/StaggeredMenu';
import CardNav from '../components/shared/CardNav';
import { ArrowRight, PieChart, Shield, Wallet, TrendingUp } from 'lucide-react';
import { menuItems, socialItems, desktopItems, features } from './data/landingMockData';

import CardSwap, { Card } from '../components/shared/CardSwap';
import image1 from '../assets/images/image.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Landing = () => {
  const navigate = useNavigate();
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    return () => document.documentElement.classList.remove('scroll-smooth');
  }, []);

  return (
    // Wrapper Utama: Full screen dengan auto scroll
    <div className="relative w-full min-h-screen bg-black flex flex-col font-sans text-white">
      {/* 1. Background Animasi FloatingLines */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <FloatingLines 
          linesGradient={['#5227FF', '#B19EEF', '#170D27']}
          animationSpeed={1.5}
        />
      </div>
      {/* 2. Navigasi Header */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        {/* Mobile Nav */}
        <div className="md:hidden h-screen">
           <StaggeredMenu
             position="right"
             items={menuItems}
             socialItems={socialItems}
             colors={['#170D27', '#271E37']}
             accentColor="#5227FF"
           />
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:block pointer-events-auto">
           <CardNav
             items={desktopItems}
             baseColor="rgba(13, 7, 22, 0.4)" // Dark glass base
             menuColor="#fff"
             buttonBgColor="#5227FF"
             buttonTextColor="#fff"
           />
        </div>
      </div>
      {/* 3. Konten Utama */}
      <main className="relative z-10 flex-1 flex flex-col items-center w-full">
        {/* Bagian Hero */}
        <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 lg:px-8">
            <div className="max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 leading-tight">
                Masa Depan Keuangan<br/>Ada di Tanganmu
              </h1>
              <p className="text-lg md:text-xl text-purple-200/80 mb-10 max-w-xl leading-relaxed">
                Kasflow adalah aplikasi pencatatan keuangan modern yang membantumu melacak, mengelola, dan menganalisis arus kas dengan lebih cerdas dan elegan.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-purple-500/50 hover:border-purple-400 transition-all duration-300 py-4 px-8 rounded-full font-medium text-lg backdrop-blur-md shadow-[0_0_20px_rgba(82,39,255,0.2)] hover:shadow-[0_0_30px_rgba(82,39,255,0.4)] relative overflow-hidden"
              >
                <span className="relative z-10">Mulai Sekarang</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-16 lg:mt-0 pointer-events-auto hidden md:block" style={{ height: '600px', position: 'relative' }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px]">
                <CardSwap
                  cardDistance={30}
                  verticalDistance={70}
                  delay={3000}
                  pauseOnHover={true}
                  width={600}
                  height={380}
                >
                  <Card customClass="p-0 overflow-hidden shadow-2xl shadow-purple-500/20 border-purple-500/30">
                    <img src={image1} alt="KasFlow Dashboard Preview" className="w-full h-full object-cover" />
                  </Card>
                  <Card customClass="p-0 overflow-hidden shadow-2xl shadow-purple-500/20 border-purple-500/30">
                    <img src={image2} alt="KasFlow Transactions Preview" className="w-full h-full object-cover" />
                  </Card>
                  <Card customClass="p-0 overflow-hidden shadow-2xl shadow-purple-500/20 border-purple-500/30">
                    <img src={image3} alt="KasFlow Analytics Preview" className="w-full h-full object-cover" />
                  </Card>
                </CardSwap>
              </div>
            </div>

            {/* Mobile Page Preview */}
            <div id="preview" className="w-full flex md:hidden flex-col gap-6 mt-16 pt-12 pointer-events-auto z-10 px-4 relative">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">KasFlow Preview</h2>
                <p className="text-purple-300/80 text-sm">Eksplorasi antarmuka elegan dan modern kami.</p>
              </div>
              {[image1, image2, image3].map((img, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl overflow-hidden border border-purple-500/30 shadow-xl shadow-purple-500/20 cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
                  onClick={() => setZoomedImage(img)}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Bagian Fitur */}
        <section id="features" className="w-full max-w-6xl mx-auto px-4 py-24 flex flex-col items-center pointer-events-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Fitur Unggulan</h2>
            <p className="text-purple-300/80 max-w-xl mx-auto text-lg leading-relaxed">
              Semua alat yang kamu butuhkan untuk mengelola arus kas dengan efisien, kini dalam balutan antarmuka yang intuitif dan memukau.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-start p-8 rounded-2xl backdrop-blur-xl bg-[#0D0716]/60 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 shadow-[0_4_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(82,39,255,0.15)] group"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 mb-6 w-fit shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-purple-200/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Ruang Bawah */}
        <div className="h-24"></div>
      </main>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 pointer-events-auto backdrop-blur-sm"
        >
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <React.Fragment>
                {/* Control Panel */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[101] flex gap-4 pointer-events-auto">
                  <button onClick={() => zoomOut()} className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md shadow-lg text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <button onClick={() => resetTransform()} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md shadow-lg font-medium text-white">
                    Reset
                  </button>
                  <button onClick={() => zoomIn()} className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md shadow-lg text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
                
                {/* Transform Component Canvas */}
                <TransformComponent wrapperClass="!w-full !h-full flex items-center justify-center touch-none" contentClass="flex items-center justify-center w-full h-full">
                  <img 
                    src={zoomedImage} 
                    alt="Zoomed Preview" 
                    className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(82,39,255,0.4)] border border-purple-500/20 pointer-events-auto" 
                    onClick={(e) => e.stopPropagation()} 
                  />
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper>
          
          <button 
            className="absolute top-6 right-6 z-[101] text-white/50 hover:text-white transition-colors p-3 bg-black/50 rounded-full pointer-events-auto shadow-lg"
            onClick={() => setZoomedImage(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
export default Landing;