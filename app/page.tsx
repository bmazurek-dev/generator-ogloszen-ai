// app/page.tsx
// Główna strona — łączy formularz z wynikami

'use client';

import { useState } from 'react';
import FormOgloszenia from '../components/FormOgloszenia';
import WynikOgloszenia from '../components/WynikOgloszenia';
import type { DaneNieruchomosci, OdpowiedzAPI } from '../types';

export default function Home() {
  const [ladowanie, setLadowanie] = useState(false);
  const [wynik, setWynik] = useState<OdpowiedzAPI | null>(null);
  const [blad, setBlad] = useState<string | null>(null);

  const generuj = async (dane: DaneNieruchomosci) => {
    setLadowanie(true);
    setBlad(null);
    setWynik(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dane),
      });

      const data: OdpowiedzAPI = await response.json();

      if (!response.ok || data.error) {
        setBlad(data.error || 'Nieznany błąd');
        return;
      }

      setWynik(data);

      // Przewiń do wyników
      setTimeout(() => {
        document.getElementById('wyniki')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch {
      setBlad('Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
    } finally {
      setLadowanie(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Nagłówek */}
      <header className="bg-white border-b border-gray-200 px-4 py-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            🏠 Generator ogłoszeń nieruchomości AI
          </h1>
          <p className="text-gray-500 mt-1">
            Wypełnij formularz → dostaniesz 3 profesjonalne ogłoszenia w kilka sekund
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">

        {/* Formularz */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-black mb-6">
            Dane nieruchomości
          </h2>
          <FormOgloszenia onGeneruj={generuj} ladowanie={ladowanie} />
        </section>

        {/* Komunikat błędu */}
        {blad && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            ❌ {blad}
          </div>
        )}

        {/* Wyniki */}
        {wynik && (
          <section id="wyniki">
            <WynikOgloszenia warianty={wynik.warianty} />
          </section>
        )}

        {/* Stopka */}
        <footer className="text-center text-gray-400 text-sm pb-4">
          Zasilane przez Claude AI · Zbudowane z Next.js
        </footer>

      </div>
    </main>
  );
}