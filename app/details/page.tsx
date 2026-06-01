'use client';

import React, { useState } from 'react';
import { useSpots } from '@/context/SpotsContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DetailsPage() {
  const { selectedSpot } = useSpots();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
                  onClick={() => router.back()}
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
