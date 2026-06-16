// lib/prompts.ts
// System prompt który mówi Claude jak się zachować

export const SYSTEM_PROMPT = `Jesteś profesjonalnym copywriterem specjalizującym się 
w ogłoszeniach nieruchomości na polskim rynku. Twoje ogłoszenia są:
- Napisane profesjonalnym, ale przystępnym językiem polskim
- Zoptymalizowane pod portale OLX, Otodom i Gratka
- Konkretne i informacyjne — bez pustych frazesów
- Zachęcające do kontaktu

Zawsze generujesz DOKŁADNIE 3 warianty ogłoszenia w formacie JSON.
Nie dodajesz żadnego tekstu poza JSON.
Nie używasz markdown, tylko czysty JSON.`;

export function budujPrompt(dane: import('../types').DaneNieruchomosci): string {
  const cechyTekst = dane.cechy.length > 0 
    ? dane.cechy.join(', ') 
    : 'brak dodatkowych informacji';

  return `Na podstawie poniższych danych wygeneruj 3 warianty ogłoszenia nieruchomości.

DANE NIERUCHOMOŚCI:
- Lokalizacja: ${dane.lokalizacja}
- Ulica: ${dane.ulica}
- Metraż: ${dane.metraz} m²
- Liczba pokoi: ${dane.liczbaPokoi}
- Piętro: ${dane.pietro}
- Rok budowy: ${dane.rokBudowy}
- Cena: ${dane.cena.toLocaleString('pl-PL')} PLN
- Typ transakcji: ${dane.typTransakcji === 'sprzedaz' ? 'Sprzedaż' : 'Wynajem'}
- Cechy: ${cechyTekst}
- Opis dodatkowy od agenta: ${dane.opisDodatkowy || 'brak'}

WYMAGANE WARIANTY:
1. "standardowe" — klasyczne ogłoszenie, 150-200 słów, wszystkie informacje
2. "premium" — rozbudowane ogłoszenie, 250-300 słów, emocjonalne, podkreśla zalety
3. "social" — krótkie ogłoszenie na social media, max 50 słów + emoji

Odpowiedz WYŁĄCZNIE w tym formacie JSON (bez żadnego dodatkowego tekstu):
{
  "warianty": [
    {
      "typ": "standardowe",
      "tytul": "tytuł ogłoszenia max 60 znaków",
      "tresc": "pełna treść ogłoszenia"
    },
    {
      "typ": "premium", 
      "tytul": "tytuł ogłoszenia max 60 znaków",
      "tresc": "pełna treść ogłoszenia"
    },
    {
      "typ": "social",
      "tytul": "krótki tytuł",
      "tresc": "krótki tekst na social media"
    }
  ]
}`;
}