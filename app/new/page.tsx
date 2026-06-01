'use client';

import React, { useState } from 'react';
import { useSpots } from '@/context/SpotsContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewSpotPage() {
  const { addSpot } = useSpots();
  const router = useRouter();

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newWhatsApp, setNewWhatsApp] = useState('');
  const [newFromTime, setNewFromTime] = useState('09:00');
  const [newToTime, setNewToTime] = useState('18:00');
  const [selectedDays, setSelectedDays] = useState<boolean[]>([false, true, true, true, true, true, false]); // D, S, T, Q, Q, S, S
  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAddress) {
      triggerToast('Preencha os campos obrigatórios!');
      return;
    }

    addSpot({
      title: newTitle,
      loc: newAddress,
      time: `${newFromTime} – ${newToTime}`,
      open: true,
      whatsapp: newWhatsApp || undefined,
    });

    triggerToast('Ponto cadastrado com sucesso!');
    router.push('/list');
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
          <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/60 shadow-sm pt-safe">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 flex items-center justify-center text-[#006b2c] rounded-full hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h1 className="font-heading text-[18px] text-[#006b2c] font-bold tracking-tight">Novo Ponto</h1>
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
          <div className="absolute bottom-[74px] left-0 w-full px-4 py-3 bg-white border-t border-slate-200/50 z-40">
            <button
              onClick={handleCreateSpot}
              className="w-full h-[44px] bg-[#006b2c] text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1.5 hover:bg-green-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Cadastrar Ponto
            </button>
          </div>
          <BottomNavBar activeScreen="new" />
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
