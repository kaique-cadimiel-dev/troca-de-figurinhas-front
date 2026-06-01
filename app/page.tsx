'use client';

import React, { useState, useMemo } from 'react';

// Data model for Trading Spot
interface TradingSpot {
  id: string;
  title: string;
  loc: string;
  time: string;
  open: boolean;
  dist: string;
  img?: string;
  icon?: string;
  isSpecial?: boolean;
  statusText: string;
  whatsapp?: string;
  reporter: string;
  reportedDate: string;
  coordinates: { top: string; left: string };
  isPrimaryPin?: boolean;
  pinIcon?: string;
}

// Initial mockup spots from Stitch
const INITIAL_SPOTS: TradingSpot[] = [
  {
    id: 'spot-nelson',
    title: 'Banca do Nelson',
    loc: 'Vila Madalena, São Paulo',
    time: '08:00 – 18:00',
    open: true,
    dist: '350 m',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKDfcnknGqszGUPOvEH13XRxWnzkWcDhhh2Q_Q8j4kZ2qcs2S_qOipssCTtfAVQeMGau2EFsvJAt_uagbx16fScSlYgCIr65lGUXUWhZ6ce9k4TJ5JoZ8rHdiclxtavw5pDv2j5xRfo-xtfCydiPq8kqdNMeNP8WSlrRSc1L1Up6lFMTqxVazNjIYHjWfgliCIIYZ2d8iZqhVaNthnfYFw7hxOcIUGKdIkLrsFu_XexfvOGaqGvGEWoUaTFbUy0r42uefOUifyZA',
    isSpecial: false,
    statusText: 'Aberto',
    whatsapp: '+5511999999999',
    reporter: 'Lucas Silva',
    reportedDate: '12/05/2024',
    coordinates: { top: '40%', left: '30%' },
    isPrimaryPin: true,
    pinIcon: 'storefront',
  },
  {
    id: 'spot-luz',
    title: 'Praça da Luz',
    loc: 'Bom Retiro, São Paulo',
    time: '24h',
    open: false,
    dist: '1,2 km',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCxg6ptn_YUAMf8iLATcD2sSq2VVHRskWYN5vwBA_43PHkV_B9S8qOQsJhOWchk3mzdknUZ_CSwgalGnvVuNSfUAplryOKs37nRfjJYjHKagMfKey3RJoi2zUnLJMHJieF0h3odBldE7u2UOl1byYCnwsw98CVtSGCmcXxGrN4spLV6M_bailX9bAjTkDRBujzndlyzupbOhocrMcAmdrmVmhvFFypdOY8DaLFYU_LEql7KPwLUIGai6DrckCCErz9Gz4GznsqJA',
    isSpecial: false,
    statusText: 'Fechado',
    whatsapp: '+5511988888888',
    reporter: 'Mariana Santos',
    reportedDate: '20/05/2024',
    coordinates: { top: '55%', left: '60%' },
    isPrimaryPin: false,
    pinIcon: 'groups',
  },
  {
    id: 'spot-mega',
    title: 'Mega Encontro',
    loc: 'Av. Paulista, São Paulo',
    time: '18:00 – 22:00',
    open: true,
    dist: '2,5 km',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb-c9yg6mjfe7fTnhmoPrJx72tTTO9UF-UpySFHlQKifLMAzdymCUCRHtRBS4_7Ao2ydLSELLfuf9mMhu_hauuULzVRtJuJefTXNQKkGjc6TvcnUNgKK-9x5OOkksPjEej0mviRG4TK7uyCRRDtmOc3gvYvtSQ5d3tySqkHgh7gAnFFpXfQZZM1fq8ZXBma5w5qyCMmtpcgNCoIPF7OYb7yCYinZDDZ_jK7veZlK5t30HaEvAG6SEbvPEGyS3wM9zCs73Qq8M5Ng',
    isSpecial: true,
    statusText: 'Bombando',
    whatsapp: '+5511977777777',
    reporter: 'Felipe Costa',
    reportedDate: '25/05/2024',
    coordinates: { top: '30%', left: '70%' },
    isPrimaryPin: true,
    pinIcon: 'storefront',
  },
  {
    id: 'spot-eldorado',
    title: 'Shopping Eldorado',
    loc: 'Pinheiros, São Paulo',
    time: '10:00 – 22:00',
    open: true,
    dist: '3,8 km',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWndjSRZkovmi4xdzYdwYu0IrMjpRs_N5kJALHQreh9zzZBkyOhiNoxnWkhmKC3-uhhHd4LUlHqkfIAK6hMZ47j7PJ9-ok_a8AslacyYj8k4bZLN3llvyjGdYOmwOMf1PDbspadlxcCBOf_4YyRex_BlJ2CmCdwvAsSSmiUs7Ca4DOpjUr09X9FK7FxI4-fp-mlCVyLklWC7GPvzYWOy4x0HwDfJsZY0LPqpxs65x7GXzOgYFBA0ToS6O7wndlEh0Cxc1KYExLgw',
    isSpecial: false,
    statusText: 'Aberto',
    whatsapp: '+5511966666666',
    reporter: 'Ana Julia',
    reportedDate: '10/05/2024',
    coordinates: { top: '25%', left: '20%' },
    isPrimaryPin: true,
    pinIcon: 'storefront',
  },
  {
    id: 'spot-roosevelt',
    title: 'Praça Roosevelt',
    loc: 'Consolação, São Paulo',
    time: '24h',
    open: true,
    dist: '4,2 km',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-F5euZb9An5EfRM_jZinVyuctChJqdBY25ZEb2uNoRXMPU-Q_03l1SedYZ2Z5VOwrGwKgXqscbVEzKX7lp_m4KFiF9aDNLgywQM8jYUIfFQiQ1339Zf3s1MUuAqSCBZqWuES_7k-yHpyKF1Xd13xQwRKduhJ_g_N0O4lBqPZMf6MGksExRZDH-FEXvhriHKe7MBMhRyRujKoPssgc14kMcRa7XyDbz-qB6MOTOmH0pqmWwTu-shaXkTuKt5n8--rxRN5wZiNGHA',
    isSpecial: false,
    statusText: 'Aberto',
    whatsapp: '+5511955555555',
    reporter: 'Rodrigo Lima',
    reportedDate: '15/05/2024',
    coordinates: { top: '48%', left: '42%' },
    isPrimaryPin: false,
    pinIcon: 'groups',
  },
  {
    id: 'spot-allianz',
    title: 'Allianz Parque',
    loc: 'Perdizes, São Paulo',
    time: '09:00 – 17:00',
    open: true,
    dist: '5,0 km',
    icon: 'sports_soccer',
    isSpecial: false,
    statusText: 'Aberto',
    whatsapp: '+5511944444444',
    reporter: 'Gabriela M.',
    reportedDate: '18/05/2024',
    coordinates: { top: '35%', left: '50%' },
    isPrimaryPin: true,
    pinIcon: 'sports_soccer',
  }
];

export default function Home() {
  const [spots, setSpots] = useState<TradingSpot[]>(INITIAL_SPOTS);
  const [activeScreen, setActiveScreen] = useState<'map' | 'list' | 'new' | 'details'>('map');
  const [selectedSpotId, setSelectedSpotId] = useState<string>('spot-nelson');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quick filters on Map/List screens
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [showOnlyOfficial, setShowOnlyOfficial] = useState(false);
  const [showOnlySpecial, setShowOnlySpecial] = useState(false);

  // New Spot Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newWhatsApp, setNewWhatsApp] = useState('');
  const [newFromTime, setNewFromTime] = useState('09:00');
  const [newToTime, setNewToTime] = useState('18:00');
  const [selectedDays, setSelectedDays] = useState<boolean[]>([false, true, true, true, true, true, false]); // D, S, T, Q, Q, S, S
  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Currently active spot details view
  const selectedSpot = useMemo(() => {
    return spots.find(s => s.id === selectedSpotId) || spots[0];
  }, [spots, selectedSpotId]);

  // Filtered list of spots
  const filteredSpots = useMemo(() => {
    return spots.filter(spot => {
      const matchesSearch = spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            spot.loc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesOpen = !showOnlyOpen || spot.open;
      const matchesOfficial = !showOnlyOfficial || spot.id === 'spot-allianz'; // Mocking official locations
      const matchesSpecial = !showOnlySpecial || spot.isSpecial;

      return matchesSearch && matchesOpen && matchesOfficial && matchesSpecial;
    });
  }, [spots, searchQuery, showOnlyOpen, showOnlyOfficial, showOnlySpecial]);

  const handleCreateSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAddress) {
      triggerToast('Preencha os campos obrigatórios!');
      return;
    }

    const newId = `spot-${Date.now()}`;
    const newSpot: TradingSpot = {
      id: newId,
      title: newTitle,
      loc: newAddress,
      time: `${newFromTime} – ${newToTime}`,
      open: true,
      dist: `${(Math.random() * 5 + 1).toFixed(1)} km`,
      isSpecial: false,
      statusText: 'Aberto',
      whatsapp: newWhatsApp || undefined,
      reporter: 'Kaique Cadimiel',
      reportedDate: 'Hoje',
      coordinates: {
        top: `${Math.floor(Math.random() * 40 + 20)}%`,
        left: `${Math.floor(Math.random() * 50 + 25)}%`,
      },
      isPrimaryPin: true,
      pinIcon: 'storefront',
    };

    setSpots(prev => [newSpot, ...prev]);
    triggerToast('Ponto cadastrado com sucesso!');
    
    // Clear state & navigate
    setNewTitle('');
    setNewAddress('');
    setNewWhatsApp('');
    setSelectedSpotId(newId);
    setActiveScreen('list');
  };

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

        {/* SCREEN 1: MAP SCREEN */}
        {activeScreen === 'map' && (
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
                    triggerToast(`Visualizando: ${spot.title}`);
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
                <button
                  className="text-[#006b2c] font-semibold text-xs flex items-center hover:underline"
                  onClick={() => setActiveScreen('list')}
                >
                  Ver todos <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>

              {/* Horizontal scroll spots */}
              <div className="flex gap-3 overflow-x-auto px-4 pb-2.5 snap-x snap-mandatory scrollbar-hide">
                {filteredSpots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => {
                      setSelectedSpotId(spot.id);
                      setActiveScreen('details');
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
        )}

        {/* SCREEN 2: LIST SCREEN */}
        {activeScreen === 'list' && (
          <div className="w-full h-full flex flex-col justify-between bg-[#f9fafb]">
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200/60 pb-3 pt-safe shadow-sm">
              <div className="px-4 pt-4 pb-1">
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

            <main className="flex-1 overflow-y-auto px-4 pt-4 pb-[84px] flex flex-col gap-3">
              {filteredSpots.map((spot) => (
                <article
                  key={spot.id}
                  onClick={() => {
                    setSelectedSpotId(spot.id);
                    setActiveScreen('details');
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
            <BottomNavBar />
          </div>
        )}

        {/* SCREEN 3: NEW SPOT SCREEN */}
        {activeScreen === 'new' && (
          <div className="bg-[#f9fafb] w-full h-full flex flex-col justify-between">
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/60 shadow-sm pt-safe w-full max-w-[390px] mx-auto">
              <button
                onClick={() => setActiveScreen('map')}
                className="w-9 h-9 flex items-center justify-center text-[#006b2c] rounded-full hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <h1 className="font-bold text-sm text-[#006b2c] tracking-tight">Novo Ponto de Troca</h1>
              <div className="w-9"></div>
            </header>

            <main className="flex-grow pt-[74px] pb-[134px] px-4 overflow-y-auto">
              <form onSubmit={handleCreateSpot} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 space-y-4 mt-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nome do Local *</label>
                  <input
                    className="w-full h-[40px] bg-slate-50 border border-slate-200 focus:border-[#006b2c] rounded-xl px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#006b2c]"
                    placeholder="Ex: Banca do João"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Endereço / Bairro *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[16px]">location_on</span>
                    <input
                      className="w-full h-[40px] bg-slate-50 border border-slate-200 focus:border-[#006b2c] rounded-xl pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#006b2c]"
                      placeholder="Ex: Pinheiros, São Paulo"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Dias Disponíveis</label>
                  <div className="flex justify-between gap-1">
                    {daysOfWeek.map((day, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          const updated = [...selectedDays];
                          updated[idx] = !updated[idx];
                          setSelectedDays(updated);
                        }}
                        className={`w-8 h-8 rounded-full border text-[11px] font-bold flex items-center justify-center transition-all ${
                          selectedDays[idx]
                            ? 'bg-[#006b2c] border-[#006b2c] text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">De</label>
                    <input
                      className="w-full h-[40px] bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs focus:outline-none focus:border-[#006b2c]"
                      type="time"
                      value={newFromTime}
                      onChange={(e) => setNewFromTime(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Até</label>
                    <input
                      className="w-full h-[40px] bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs focus:outline-none focus:border-[#006b2c]"
                      type="time"
                      value={newToTime}
                      onChange={(e) => setNewToTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">WhatsApp para contato (opcional)</label>
                  <input
                    className="w-full h-[40px] bg-slate-50 border border-slate-200 focus:border-[#006b2c] rounded-xl px-3 text-xs focus:outline-none"
                    placeholder="Ex: 11988887777"
                    value={newWhatsApp}
                    onChange={(e) => setNewWhatsApp(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Foto</label>
                  <button
                    type="button"
                    onClick={() => triggerToast('Upload de fotos simulado com sucesso!')}
                    className="w-full h-[96px] border-2 border-dashed border-slate-200 hover:border-[#006b2c] rounded-xl bg-slate-50/50 flex flex-col items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[24px] text-slate-400">add_a_photo</span>
                    <span className="font-semibold text-[11px] text-slate-500">Adicionar foto do local</span>
                  </button>
                </div>
              </form>
            </main>

            {/* Bottom Form Action Bar */}
            <div className="fixed bottom-[74px] left-0 w-full px-4 py-3 bg-white border-t border-slate-200/50 z-40 max-w-[390px] mx-auto">
              <button
                onClick={handleCreateSpot}
                className="w-full h-[44px] bg-[#006b2c] text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1.5 hover:bg-green-800 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Cadastrar Ponto
              </button>
            </div>
            <BottomNavBar />
          </div>
        )}

        {/* SCREEN 4: DETAILS SCREEN */}
        {activeScreen === 'details' && (
          <div className="bg-[#f9fafb] w-full h-full flex flex-col justify-between">
            {/* Scrollable details wrapper */}
            <div className="flex-1 overflow-y-auto pb-[84px]">
              
              {/* Cover Photo */}
              <div
                className="relative w-full h-[220px] bg-slate-200 bg-cover bg-center"
                style={{
                  backgroundImage: selectedSpot.img
                    ? `url('${selectedSpot.img}')`
                    : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDlhyyKpZH54EsxV0xOSHurcYjNKFjGawOSRfysAfnI4HVU430z07yqgf15fFoZkl9ySh4yYxgKlqefIxTlYqPzZooocQcgs-oGgRvVaByHsB30BcpBvgYvqvwfNFaUV_IbC05tWsbCXapTS565clXYTiGl8_1rzBLj3x1r2P3KVntu-loGdIg3DAhsbJBfgaLqsEwuegFjJAy9QRlgeMG7AGfUEMsF0JK9xtyd32UmG6iv-CScTnb8lXR7e4i0w3JDHbIary80A')"
                }}
              >
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pt-safe mt-2">
                  <button
                    onClick={() => setActiveScreen('map')}
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm border border-slate-200 hover:bg-white"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  </button>
                  <button
                    onClick={() => triggerToast('Link de compartilhamento copiado!')}
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm border border-slate-200 hover:bg-white"
                  >
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
              </div>

              {/* Details card body */}
              <div className="relative -mt-6 bg-white rounded-t-[24px] w-full pt-5 px-4 flex flex-col border-t border-slate-100">
                <div className="mb-4">
                  <h1 className="font-extrabold text-lg text-[#121c2a] mb-1">{selectedSpot.title}</h1>
                  <div className="flex items-center text-slate-400 mb-2.5">
                    <span className="material-symbols-outlined text-[16px] mr-1 text-slate-400">location_on</span>
                    <p className="font-medium text-xs">{selectedSpot.loc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                      selectedSpot.isSpecial
                        ? 'bg-[#fed01b] text-[#6f5900]'
                        : selectedSpot.open
                        ? 'bg-[#dcfce7] text-[#006b2c]'
                        : 'bg-rose-50 text-rose-500'
                    }`}>
                      {selectedSpot.statusText}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Horário hoje: {selectedSpot.time}
                    </span>
                  </div>
                </div>

                {/* Primary actions */}
                <div className="flex gap-2.5 mb-6 pt-2 border-t border-slate-100">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSpot.title + ' ' + selectedSpot.loc)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-h-[40px] bg-[#006b2c] hover:bg-green-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>directions</span>
                    Como chegar
                  </a>
                  <a
                    href={selectedSpot.whatsapp ? `https://wa.me/${selectedSpot.whatsapp.replace(/\D/g, '')}` : '#'}
                    onClick={(e) => {
                      if (!selectedSpot.whatsapp) {
                        e.preventDefault();
                        triggerToast('WhatsApp não informado para este local.');
                      }
                    }}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-h-[40px] border border-[#006b2c] text-[#006b2c] hover:bg-green-50/20 bg-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    WhatsApp
                  </a>
                </div>

                {/* Weekly schedule */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#006b2c] border border-slate-200">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                    </div>
                    <h2 className="font-bold text-xs uppercase tracking-wider text-[#121c2a]">Horários da Semana</h2>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2.5 border border-slate-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#121c2a] font-semibold">Segunda a Sexta</span>
                      <span className="text-slate-500 font-medium">08:00 - 18:00</span>
                    </div>
                    <div className="h-[1px] w-full bg-slate-200/50"></div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#121c2a] font-semibold">Sábado</span>
                      <span className="text-slate-500 font-medium">09:00 - 14:00</span>
                    </div>
                    <div className="h-[1px] w-full bg-slate-200/50"></div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#121c2a] font-semibold">Domingo</span>
                      <span className="text-rose-500 font-bold">Fechado</span>
                    </div>
                  </div>
                </div>

                {/* Reporter Profile */}
                <div className="mb-6 border-t border-slate-100 pt-5">
                  <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Reportado por</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7xI7rTN3qKbZgsI3ecnL4ZWACLZ5_8Q2_IOs5oX8Ws05jidEDle2bO64XYBSl4xbYuHq10pTjujnWZWdtZS4cJnmPSjjuFRuPbPOxneizeeAGZo1HXt1rvnLxL9_GC188VnoJoGrUaqZ5n04awz7FdhUHtlQoSCuL_1IF9WJfLvY-osfDKvTSV3dyTWJBO7xQCdtIgEFHmK82prBDMdfYwzpuVBhD9p9woR_i32ZPe89WK7BV1vZSmeLFBDZaiftUAM5DPNzd5w"
                        className="w-full h-full object-cover"
                        alt="Reporter avatar"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#121c2a]">{selectedSpot.reporter}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Registrado em {selectedSpot.reportedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Error warning link */}
                <div className="text-center mt-4 border-t border-slate-100 py-4">
                  <button
                    onClick={() => triggerToast('Obrigado! Um moderador revisará os dados do ponto de troca.')}
                    className="font-medium text-xs text-slate-400 underline hover:text-slate-600"
                  >
                    Reportar erro nas informações
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bottom navbar */}
            <BottomNavBar />
          </div>
        )}
      </div>
    </div>
  );

  // Bottom Navigation bar component
  function BottomNavBar() {
    const navItems = [
      { id: 'map', label: 'Mapa', icon: 'map' },
      { id: 'list', label: 'Lista', icon: 'format_list_bulleted' },
      { id: 'new', label: 'Cadastrar', icon: 'add_circle' },
    ];

    return (
      <nav className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2.5 pb-safe bg-white text-[#006b2c] border-t border-slate-200/60 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id || (item.id === 'list' && activeScreen === 'details');
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveScreen(item.id as any);
                setSearchQuery('');
              }}
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
            </button>
          );
        })}
      </nav>
    );
  }
}
