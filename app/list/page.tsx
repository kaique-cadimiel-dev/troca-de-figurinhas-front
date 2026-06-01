'use client';

import React, { useState } from 'react';
import { useSpots } from '@/context/SpotsContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListPage() {
  const { spots, setSelectedSpotId } = useSpots();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Quick filters on List
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [showOnlyOfficial, setShowOnlyOfficial] = useState(false);
  const [showOnlySpecial, setShowOnlySpecial] = useState(false);

  // Filtered list of spots
  const filteredSpots = spots.filter(spot => {
    const matchesSearch = spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.loc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesOpen = !showOnlyOpen || spot.open;
    const matchesOfficial = !showOnlyOfficial || spot.id === 'spot-allianz';
    const matchesSpecial = !showOnlySpecial || spot.isSpecial;

    return matchesSearch && matchesOpen && matchesOfficial && matchesSpecial;
  });

  return (
    <div className="flex-1 w-full min-h-screen bg-[#eceff4] flex items-center justify-center p-0 sm:p-4">
      {/* Main Mobile App Frame Simulator */}
      <div className="w-full max-w-[390px] h-[884px] bg-[#f9fafb] relative flex flex-col overflow-hidden shadow-2xl border border-slate-300 sm:rounded-[36px] antialiased">
        {/* Notch / Speaker Simulator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-[100] flex items-center justify-center hidden sm:flex">
          <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1"></div>
        </div>

        <div className="w-full h-full flex flex-col justify-between bg-[#f9fafb]">
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200/60 pb-3 pt-safe shadow-sm">
            <div className="px-4 pt-6 pb-1">
              <h1 className="font-black text-xl text-[#006b2c] tracking-tight">Locais de Troca</h1>
            </div>
            <div className="px-4 mt-2">
              <div className="relative flex items-center w-full h-[40px] bg-slate-100 rounded-full px-3.5 border border-slate-200/40">
                <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">search</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 text-xs p-0 placeholder:text-slate-400 focus:outline-none"
                  placeholder="Buscar pontos de troca..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Quick List Filters */}
            <div className="mt-3 px-4 overflow-x-auto scrollbar-hide flex gap-1.5 pb-1">
              <button
                onClick={() => setShowOnlyOpen(!showOnlyOpen)}
                className={`h-9 px-4 rounded-full font-semibold text-[11px] whitespace-nowrap shrink-0 transition-transform active:scale-95 border ${
                  showOnlyOpen ? 'bg-[#006b2c] text-white border-[#006b2c]' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Abertos Agora
              </button>
              <button
                onClick={() => setShowOnlyOfficial(!showOnlyOfficial)}
                className={`h-9 px-4 rounded-full font-semibold text-[11px] whitespace-nowrap shrink-0 transition-transform active:scale-95 border ${
                  showOnlyOfficial ? 'bg-[#006b2c] text-white border-[#006b2c]' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Oficiais
              </button>
              <button
                onClick={() => setShowOnlySpecial(!showOnlySpecial)}
                className={`h-9 px-4 rounded-full font-semibold text-[11px] whitespace-nowrap shrink-0 transition-transform active:scale-95 border ${
                  showOnlySpecial ? 'bg-[#006b2c] text-white border-[#006b2c]' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Mais Ativos
              </button>
            </div>
          </header>

          <main className="flex-grow overflow-y-auto px-4 pt-4 pb-[84px] flex flex-col gap-3">
            {filteredSpots.map((spot) => (
              <article
                key={spot.id}
                onClick={() => {
                  setSelectedSpotId(spot.id);
                  router.push('/details');
                }}
                className={`bg-white border border-slate-200/80 rounded-2xl p-3 flex gap-3 shadow-sm active:scale-[0.99] transition-transform cursor-pointer hover:border-green-500/30 ${
                  !spot.open ? 'opacity-85' : ''
                }`}
              >
                {spot.img ? (
                  <img
                    src={spot.img}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                    alt={spot.title}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-100">
                    <span className="material-symbols-outlined text-slate-400 text-[24px]">{spot.icon || 'storefront'}</span>
                  </div>
                )}
                
                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h2 className="font-bold text-sm text-[#121c2a] truncate pr-2">{spot.title}</h2>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                      spot.isSpecial
                        ? 'bg-[#fed01b] text-[#6f5900]'
                        : spot.open
                        ? 'bg-[#dcfce7] text-[#006b2c]'
                        : 'bg-rose-50 text-rose-500'
                    }`}>
                      {spot.statusText}
                    </span>
                  </div>
                  <p className="font-medium text-[11px] text-slate-400 truncate mb-1">{spot.loc}</p>
                  <div className="flex justify-between items-center mt-auto pt-1 border-t border-slate-100">
                    <div className="flex items-center text-slate-400 gap-1 text-[10px]">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      <span className="font-medium">{spot.time}</span>
                    </div>
                    <button className="flex items-center text-[#006b2c] font-semibold text-[11px] gap-0.5 hover:underline">
                      Detalhes <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {filteredSpots.length === 0 && (
              <div className="text-center py-16 text-slate-400 flex flex-col items-center">
                <span className="material-symbols-outlined text-[36px] mb-2 text-slate-300">location_off</span>
                <p className="text-xs">Nenhum local cadastrado corresponde à busca.</p>
              </div>
            )}
          </main>
          
          <BottomNavBar activeScreen="list" />
        </div>
      </div>
    </div>
  );
}

// Bottom Navigation bar component
function BottomNavBar({ activeScreen }: { activeScreen: 'map' | 'list' | 'new' }) {
  const navItems = [
    { id: 'map', path: '/', label: 'Mapa', icon: 'map' },
    { id: 'list', path: '/list', label: 'Lista', icon: 'format_list_bulleted' },
    { id: 'new', path: '/new', label: 'Cadastrar', icon: 'add_circle' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2.5 pb-safe bg-white text-[#006b2c] border-t border-slate-200/60 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = activeScreen === item.id;
        return (
          <Link
            key={item.id}
            href={item.path}
            className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 ${
              isActive
                ? 'bg-[#006b2c] text-white rounded-full px-5 py-1 scale-95 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#006b2c] rounded-xl'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
            >
              {item.icon}
            </span>
            <span className="font-semibold text-[9px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
