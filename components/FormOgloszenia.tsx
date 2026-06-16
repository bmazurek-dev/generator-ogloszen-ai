// components/FormOgloszenia.tsx
// Formularz z danymi nieruchomości

'use client';

import { useState } from 'react';
import type { DaneNieruchomosci } from '../types';

// Dostępne cechy nieruchomości jako checkboxy
const DOSTEPNE_CECHY = [
  'balkon', 'taras', 'ogród', 'garaż', 'miejsce parkingowe',
  'piwnica', 'komórka lokatorska', 'winda', 'portier',
  'monitoring', 'klimatyzacja', 'nowe budownictwo', 'po remoncie',
];

// Domyślne wartości formularza
const PUSTE_DANE: DaneNieruchomosci = {
  lokalizacja: '',
  ulica: '',
  metraz: 0,
  liczbaPokoi: 1,
  pietro: '',
  rokBudowy: 2000,
  cena: 0,
  typTransakcji: 'sprzedaz',
  cechy: [],
  opisDodatkowy: '',
};

interface Props {
  onGeneruj: (dane: DaneNieruchomosci) => void;
  ladowanie: boolean;
}

export default function FormOgloszenia({ onGeneruj, ladowanie }: Props) {
  const [dane, setDane] = useState<DaneNieruchomosci>(PUSTE_DANE);

  // Obsługa zmiany pola tekstowego / liczbowego
  const handleZmiana = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setDane(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Obsługa checkboxów cech
  const handleCecha = (cecha: string) => {
    setDane(prev => ({
      ...prev,
      cechy: prev.cechy.includes(cecha)
        ? prev.cechy.filter(c => c !== cecha)
        : [...prev.cechy, cecha],
    }));
  };

  // Wysłanie formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneruj(dane);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Typ transakcji */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Typ transakcji *
        </label>
        <div className="flex gap-4">
          {(['sprzedaz', 'wynajem'] as const).map(typ => (
            <label key={typ} className="flex items-center gap-2 cursor-pointer text-blue-600">
              <input
                type="radio"
                name="typTransakcji"
                value={typ}
                checked={dane.typTransakcji === typ}
                onChange={handleZmiana}
                className="text-blue-600"
              />
              <span className="capitalize">
                {typ === 'sprzedaz' ? 'Sprzedaż' : 'Wynajem'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Lokalizacja i ulica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Miasto / dzielnica *
          </label>
          <input
            type="text"
            name="lokalizacja"
            value={dane.lokalizacja}
            onChange={handleZmiana}
            placeholder="np. Warszawa, Mokotów"
            required
            className="text-gray-400 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Ulica
          </label>
          <input
            type="text"
            name="ulica"
            value={dane.ulica}
            onChange={handleZmiana}
            placeholder="np. ul. Puławska 100"
            className="text-gray-400 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Metraż, pokoje, piętro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Metraż (m²) *
          </label>
          <input
            type="number"
            name="metraz"
            value={dane.metraz || ''}
            onChange={handleZmiana}
            placeholder="np. 55"
            min="1"
            required
            className="text-gray-400 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Liczba pokoi *
          </label>
          <select
            name="liczbaPokoi"
            value={dane.liczbaPokoi}
            onChange={handleZmiana}
            className="text-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1,2,3,4,5,6].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'pokój' : 'pokoje/pokoi'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Piętro
          </label>
          <input
            type="text"
            name="pietro"
            value={dane.pietro}
            onChange={handleZmiana}
            placeholder="np. 3/5 lub parter"
            className="text-gray-400 placeholder-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Rok budowy i cena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Rok budowy
          </label>
          <input
            type="number"
            name="rokBudowy"
            value={dane.rokBudowy || ''}
            onChange={handleZmiana}
            placeholder="np. 2010"
            min="1800"
            max="2026"
            className="text-gray-400 placeholder-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Cena (PLN) *
          </label>
          <input
            type="number"
            name="cena"
            value={dane.cena || ''}
            onChange={handleZmiana}
            placeholder="np. 450000"
            min="1"
            required
            className="text-gray-400 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cechy nieruchomości */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Cechy nieruchomości
        </label>
        <div className="flex flex-wrap gap-2">
          {DOSTEPNE_CECHY.map(cecha => (
            <button
              key={cecha}
              type="button"
              onClick={() => handleCecha(cecha)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                dane.cechy.includes(cecha)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-400 border-gray-300 hover:border-blue-400'
              }`}
            >
              {cecha}
            </button>
          ))}
        </div>
      </div>

      {/* Opis dodatkowy */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Dodatkowe informacje (opcjonalne)
        </label>
        <textarea
          name="opisDodatkowy"
          value={dane.opisDodatkowy}
          onChange={handleZmiana}
          placeholder="Np. mieszkanie po generalnym remoncie, nowa kuchnia, widok na park, spokojna okolica..."
          rows={3}
          className="text-gray-400 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Przycisk */}
      <button
        type="submit"
        disabled={ladowanie}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
          ladowanie
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        {ladowanie ? '⏳ Generuję ogłoszenia...' : '✨ Generuj ogłoszenia AI'}
      </button>
    </form>
  );
}