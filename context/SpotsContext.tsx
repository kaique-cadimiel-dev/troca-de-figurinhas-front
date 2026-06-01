'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export interface TradingSpot {
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

interface SpotsContextType {
  spots: TradingSpot[];
  addSpot: (spot: Omit<TradingSpot, 'id' | 'dist' | 'coordinates' | 'isPrimaryPin' | 'pinIcon' | 'statusText' | 'reporter' | 'reportedDate'>) => string;
  selectedSpotId: string;
  setSelectedSpotId: (id: string) => void;
  selectedSpot: TradingSpot;
}

const SpotsContext = createContext<SpotsContextType | undefined>(undefined);

export function SpotsProvider({ children }: { children: ReactNode }) {
  const [spots, setSpots] = useState<TradingSpot[]>(INITIAL_SPOTS);
  const [selectedSpotId, setSelectedSpotId] = useState<string>('spot-nelson');

  const addSpot = (newDetails: Omit<TradingSpot, 'id' | 'dist' | 'coordinates' | 'isPrimaryPin' | 'pinIcon' | 'statusText' | 'reporter' | 'reportedDate'>) => {
    const newId = `spot-${Date.now()}`;
    const newSpot: TradingSpot = {
      ...newDetails,
      id: newId,
      dist: `${(Math.random() * 5 + 1).toFixed(1)} km`,
      statusText: 'Aberto',
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
    setSelectedSpotId(newId);
    return newId;
  };

  const selectedSpot = useMemo(() => {
    return spots.find(s => s.id === selectedSpotId) || spots[0];
  }, [spots, selectedSpotId]);

  return (
    <SpotsContext.Provider value={{ spots, addSpot, selectedSpotId, setSelectedSpotId, selectedSpot }}>
      {children}
    </SpotsContext.Provider>
  );
}

export function useSpots() {
  const context = useContext(SpotsContext);
  if (!context) {
    throw new Error('useSpots must be used within a SpotsProvider');
  }
  return context;
}
