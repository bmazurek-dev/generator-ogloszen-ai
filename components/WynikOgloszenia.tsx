// components/WynikOgloszenia.tsx
// Wyświetla 3 warianty ogłoszenia z przyciskami kopiowania

'use client';

import { useState } from 'react';
import type { WariantOgloszenia } from '../types';

interface Props {
  warianty: WariantOgloszenia[];
}

// Konfiguracja wizualna dla każdego wariantu
const KONFIGURACJA = {
  standardowe: {
    label: '📋 Standardowe',
    opis: 'Klasyczne ogłoszenie na OLX/Otodom',
    kolor: 'border-blue-200 bg-blue-50',
    naglowek: 'bg-blue-100 text-blue-800',
  },
  premium: {
    label: '⭐ Premium',
    opis: 'Rozbudowane, emocjonalne ogłoszenie',
    kolor: 'border-amber-200 bg-amber-50',
    naglowek: 'bg-amber-100 text-amber-800',
  },
  social: {
    label: '📱 Social Media',
    opis: 'Krótkie ogłoszenie na Facebook/Instagram',
    kolor: 'border-green-200 bg-green-50',
    naglowek: 'bg-green-100 text-green-800',
  },
};

export default function WynikOgloszenia({ warianty }: Props) {
  const [skopiowany, setSkopiowany] = useState<string | null>(null);

  const kopiuj = async (tekst: string, typ: string) => {
    await navigator.clipboard.writeText(tekst);
    setSkopiowany(typ);
    // Po 2 sekundach resetuj stan
    setTimeout(() => setSkopiowany(null), 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        ✅ Wygenerowane ogłoszenia
      </h2>

      {warianty.map((wariant) => {
        const config = KONFIGURACJA[wariant.typ];
        const tekstDoKopiowania = `${wariant.tytul}\n\n${wariant.tresc}`;

        return (
          <div
            key={wariant.typ}
            className={`border-2 rounded-xl overflow-hidden ${config.kolor}`}
          >
            {/* Nagłówek wariantu */}
            <div className={`px-4 py-3 flex justify-between items-center ${config.naglowek}`}>
              <div>
                <span className="font-semibold">{config.label}</span>
                <span className="text-sm ml-2 opacity-75">— {config.opis}</span>
              </div>
              <button
                onClick={() => kopiuj(tekstDoKopiowania, wariant.typ)}
                className="text-sm px-3 py-1 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 transition-all font-medium cursor-pointer"
              >
                {skopiowany === wariant.typ ? '✓ Skopiowano!' : '📋 Kopiuj'}
              </button>
            </div>

            {/* Treść ogłoszenia */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                {wariant.tytul}
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {wariant.tresc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}