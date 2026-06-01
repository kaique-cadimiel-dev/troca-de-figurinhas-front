'use client';

import React, { useState } from 'react';
import { useSpots } from '@/context/SpotsContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { spots, selectedSpotId, setSelectedSpotId, setSelectedSpotId: selectSpot } = useSpots();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Quick filters on Map
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [showOnlyOfficial, setShowOnlyOfficial] = useState(false);
  const [showOnlySpecial, setShowOnlySpecial] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered list of spots
  const filteredSpots = spots.filter(spot => {
    const matchesSearch = spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.loc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesOpen = !showOnlyOpen || spot.open;
    const matchesOfficial = !showOnlyOfficial || spot.id === 'spot-allianz';
    const matchesSpecial = !showOnlySpecial || spot.isSpecial;

    return matchesSearch && matchesOpen && matchesOfficial && matchesSpecial;
  });

  const selectedSpot = spots.find(s => s.id === selectedSpotId) || spots[0];

  return (
    <div className="flex-1 w-full min-h-screen bg-[#eceff4] flex items-center justify-center p-0 sm:p-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#006b2c] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold border border-white/20 animate-fade-in-down">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Main Mobile App Frame Simulator */}
      <div className="w-full max-w-[390px] h-[884px] bg-[#f9fafb] relative flex flex-col overflow-hidden shadow-2xl border border-slate-300 sm:rounded-[36px] antialiased">
        {/* Notch / Speaker Simulator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-[100] flex items-center justify-center hidden sm:flex">
          <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1"></div>
        </div>

        <div className="relative w-full h-full flex flex-col justify-between">
          {/* Map Canvas Background */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Map View"
              className="w-full h-full object-cover select-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYnUBDRU4KcIU4fB2yiUQDJqxElkSAFUAQSGMq4X6264IVvTdfR0fRWTn_V86lSzc0veHtoSQBH3HNVVQQotuBiWIRKIRpaDMGOv-zAwtr9CdTg4qPt16HftLXNpthP_zRiOkRbYxy73cABR8N-s0TDu5wHzz84KHLl_49UPxncXfVMGCv_qZA6ql4JKlpP3TLP_LhdpaenvEEsg9iqvYuRmIZ10a2xR_8h-G5Nj-PAUxY-hNN6zrndlShrohnwYLmkUJa1w22pw"
            />
            
            {/* Interactive positioned map pins */}
            {spots.map((spot) => (
              <div
                key={spot.id}
                style={{ top: spot.coordinates.top, left: spot.coordinates.left }}
                className="absolute flex flex-col items-center pointer-events-auto cursor-pointer transform hover:scale-110 transition-transform z-10"
                onClick={() => {
                  setSelectedSpotId(spot.id);
                  triggerToast(`Selecionado: ${spot.title}`);
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-all ${
                  selectedSpotId === spot.id
                    ? 'bg-[#006b2c] scale-110 ring-4 ring-[#006b2c]/20'
                    : spot.isPrimaryPin
                    ? 'bg-[#006b2c]'
                    : 'bg-[#fed01b]'
                }`}>
                  <span className={`material-symbols-outlined text-[18px] font-bold ${
                    selectedSpotId === spot.id || spot.isPrimaryPin ? 'text-white' : 'text-[#735c00]'
                  }`}>
                    {spot.pinIcon || 'storefront'}
                  </span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                  spot.isPrimaryPin ? 'bg-[#006b2c]' : 'bg-[#fed01b]'
                }`}></div>
              </div>
            ))}
          </div>

          {/* Sticky Top Search Header */}
          <header className="z-10 pt-safe mt-6 px-4 w-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md text-[#006b2c] shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-slate-200/50 rounded-2xl">
              <div className="flex items-center flex-1 min-w-0 mr-3">
                <span className="material-symbols-outlined mr-2.5 text-slate-400 text-[20px]">search</span>
                <input
                  className="w-full bg-transparent border-none p-0 focus:ring-0 font-body text-xs text-[#121c2a] placeholder:text-slate-400 focus:outline-none"
                  placeholder="Buscar cidade ou bairro"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center shrink-0">
                <span className="font-display text-2xs font-extrabold tracking-tight text-[#006b2c] mr-2.5 uppercase bg-[#006b2c]/10 px-2 py-0.5 rounded">
                  Copa 2026
                </span>
                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOUlh6lPYBd9rXcZqTuJOlOCWJn-KkvCViHqOctga05EoCcRPpK4EpSrT0qvC23b8tLfc0Maby81u8t8C_pqNcdfNDfeZTYOLTI8nYRnQeX21-9bkkDJcEwqiGRiiie0v7jwFCWEpT8CIVbQHRn57i8Urqx_jdqXgGTMFJFc0JiilLxKncLDxL2GCYxqn7zWr_0Q1yK4_Z5ItSTM-RU3D80pMvbDTu0ECXwOn3cWvKZB5pEFBOybSi6PZDVgu5JLXULsRGuNMifg"
                    className="w-full h-full object-cover"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>

            {/* Horizontal filter scrollbar */}
            <div className="flex gap-1.5 mt-2.5 overflow-x-auto scrollbar-hide pb-2">
              <button
                onClick={() => setShowOnlyOpen(!showOnlyOpen)}
                className={`px-3 py-1.5 rounded-full font-semibold text-[11px] shrink-0 shadow-sm border flex items-center gap-1 transition-all ${
                  showOnlyOpen
                    ? 'bg-[#006b2c] text-white border-[#006b2c]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {showOnlyOpen && <span className="material-symbols-outlined text-[12px] font-bold">check</span>}
                Abertos Agora
              </button>
              <button
                onClick={() => setShowOnlyOfficial(!showOnlyOfficial)}
                className={`px-3 py-1.5 rounded-full font-semibold text-[11px] shrink-0 shadow-sm border flex items-center gap-1 transition-all ${
                  showOnlyOfficial
                    ? 'bg-[#006b2c] text-white border-[#006b2c]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {showOnlyOfficial && <span className="material-symbols-outlined text-[12px] font-bold">check</span>}
                Oficiais
              </button>
              <button
                onClick={() => setShowOnlySpecial(!showOnlySpecial)}
                className={`px-3 py-1.5 rounded-full font-semibold text-[11px] shrink-0 shadow-sm border flex items-center gap-1 transition-all ${
                  showOnlySpecial
                    ? 'bg-[#006b2c] text-white border-[#006b2c]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {showOnlySpecial && <span className="material-symbols-outlined text-[12px] font-bold">check</span>}
                Bombando
              </button>
            </div>
          </header>

          {/* Bottom Drawer showing "Pontos Próximos" */}
          <div className="z-10 bg-white/95 backdrop-blur-md rounded-t-[24px] shadow-[0_-6px_20px_rgba(0,0,0,0.06)] border-t border-slate-200/60 flex flex-col pb-[74px]">
            <div className="w-full flex justify-center py-2.5 cursor-grab">
              <div className="w-10 h-1 bg-slate-300 rounded-full"></div>
            </div>
            <div className="px-4 pb-3 flex items-center justify-between">
              <h2 className="font-bold text-xs text-[#121c2a] uppercase tracking-wider">Pontos Próximos</h2>
              <Link
                href="/list"
                className="text-[#006b2c] font-semibold text-xs flex items-center hover:underline"
              >
                Ver todos <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </Link>
            </div>

            {/* Horizontal scroll spots */}
            <div className="flex gap-3 overflow-x-auto px-4 pb-2.5 snap-x snap-mandatory scrollbar-hide">
              {filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => {
                    setSelectedSpotId(spot.id);
                    router.push('/details');
                  }}
                  className={`snap-center shrink-0 w-[270px] bg-white border rounded-2xl p-2.5 flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden ${
                    selectedSpotId === spot.id ? 'border-[#006b2c] bg-green-50/10' : 'border-slate-200'
                  }`}
                >
                  {spot.isSpecial && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#fed01b]/5 to-transparent pointer-events-none"></div>
                  )}
                  {spot.img ? (
                    <img
                      src={spot.img}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                      alt={spot.title}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                      <span className="material-symbols-outlined text-slate-400 text-[20px]">{spot.icon || 'storefront'}</span>
                    </div>
                  )}
                  <div className="flex-grow min-w-0 flex flex-col justify-center">
                    <span className={`font-bold text-xs text-[#121c2a] truncate block ${spot.isSpecial ? 'text-[#735c00]' : ''}`}>
                      {spot.title}
                    </span>
                    <div className="flex items-center gap-0.5 mt-0.5 text-slate-400">
                      <span className="material-symbols-outlined text-[12px]">near_me</span>
                      <span className="text-[10px] font-medium truncate">{spot.dist} ({spot.loc.split(',')[0]})</span>
                    </div>
                  </div>

                  <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-0.5 ${
                    spot.isSpecial
                      ? 'bg-[#fed01b] text-[#6f5900]'
                      : !spot.open
                      ? 'bg-rose-50 text-rose-500'
                      : 'bg-[#dcfce7] text-[#006b2c]'
                  }`}>
                    {spot.isSpecial && <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>}
                    {spot.statusText}
                  </div>
                </div>
              ))}
              {filteredSpots.length === 0 && (
                <div className="w-full text-center py-4 text-xs text-slate-400">
                  Nenhum local corresponde aos filtros ativos.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom NavBar */}
        <BottomNavBar activeScreen="map" />
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
