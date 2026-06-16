// app/api/generate/route.ts
// Ten plik obsługuje żądania POST od frontendu i komunikuje się z Claude

import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, budujPrompt } from '../../../lib/prompts';
import type { DaneNieruchomosci, OdpowiedzAPI } from '../../../types';

// Inicjalizacja klienta Anthropic — klucz API z .env.local
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Pobierz dane z formularza
    const dane: DaneNieruchomosci = await request.json();

    // Walidacja — sprawdź czy kluczowe pola są wypełnione
    if (!dane.lokalizacja || !dane.metraz || !dane.cena) {
      return NextResponse.json(
        { error: 'Wypełnij wymagane pola: lokalizacja, metraż, cena' },
        { status: 400 }
      );
    }

    // Wywołanie Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',        // Model Sonnet 4.6
      max_tokens: 2000,                   // Max długość odpowiedzi
      system: SYSTEM_PROMPT,             // Instrukcje dla Claude
      messages: [
        {
          role: 'user',
          content: budujPrompt(dane),    // Dane nieruchomości jako prompt
        },
      ],
    });

    // Wyciągnij tekst z odpowiedzi
    const tekstOdpowiedzi = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    // Parsuj JSON z odpowiedzi Claude
    const wynik: OdpowiedzAPI = JSON.parse(tekstOdpowiedzi);

    return NextResponse.json(wynik);

  } catch (error) {
    console.error('Błąd API:', error);
    
    // Zwróć przyjazny komunikat błędu
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas generowania ogłoszenia. Spróbuj ponownie.' },
      { status: 500 }
    );
  }
}