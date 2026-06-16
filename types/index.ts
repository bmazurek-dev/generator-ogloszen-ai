// types/index.ts
// Definicje typów dla całej aplikacji

export interface DaneNieruchomosci {
  lokalizacja: string;        // np. "Warszawa, Mokotów"
  ulica: string;              // np. "ul. Puławska 100"
  metraz: number;             // w m²
  liczbaPokoi: number;
  pietro: string;             // np. "3/5" lub "parter"
  rokBudowy: number;
  cena: number;               // w PLN
  typTransakcji: 'sprzedaz' | 'wynajem';
  cechy: string[];            // np. ["balkon", "garaż", "winda"]
  opisDodatkowy: string;      // dowolny tekst od agenta
}

export interface WariantOgloszenia {
  typ: 'standardowe' | 'premium' | 'social';
  tytul: string;
  tresc: string;
}

export interface OdpowiedzAPI {
  warianty: WariantOgloszenia[];
  error?: string;
}