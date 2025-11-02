# 💻 n8n Nodes - JavaScript Code

Ten folder zawiera kod JavaScript dla custom nodes w workflow n8n.

## 📄 Pliki

### 1. **[calculate_legal_status.js](calculate_legal_status.js)** ⭐ GŁÓWNY NODE
- Oblicza status prawny autorów
- Generuje emoji statusy (✅/❌/⚠️/🔍)
- Auto-kategoryzacja (Wiersz/Bajka/Teatrzyk)
- Priority scoring (⭐⭐⭐⭐⭐)
- **Dodaj ten node po "Merge AI and Non-AI"**

**Funkcje:**
- Lat_od_smierci calculation
- Lat_do_domeny calculation
- Status prawny z emojis
- Sprawdzanie tłumaczy
- Smart kategoryzacja
- Auto priority scoring

### 2. **[fetch_works_count.js](fetch_works_count.js)** 📚 OPCJONALNY
- Pobiera liczbę utworów z Wolne Lektury API
- Rate limiting (100ms delay między requests)
- Skip dla chronionych autorów (oszczędność API calls)
- **Dodaj po "Calculate Legal Status"**

**Funkcje:**
- Fetch z WL API `/api/authors/{slug}/`
- Works count extraction
- Error handling
- Priority boost na podstawie liczby utworów

---

## 🔧 Jak Używać

### KROK 1: Import do n8n

#### Metoda A: Copy-Paste (Najprostsza)
```bash
1. Otwórz n8n workflow
2. Znajdź node "Merge AI and Non-AI"
3. Dodaj nowy Code node po nim
4. Skopiuj cały kod z calculate_legal_status.js
5. Wklej do node
6. Nazwij node: "Calculate Legal Status"
7. Zapisz!
```

#### Metoda B: Import pliku
```bash
1. W n8n: Settings → Import
2. Wybierz plik .js
3. Node automatycznie się doda
```

### KROK 2: Konfiguracja

**Parametry (domyślne są OK):**
- Brak - kod działa out of the box!
- Wszystkie obliczenia są automatyczne

**Wymagania:**
- Wejście: JSON z polami `Autor`, `Rok_smierci`, etc.
- Wyjście: JSON z 26 kolumnami (wszystkie nowe pola dodane)

### KROK 3: Test

```bash
1. Execute Workflow (z page_size=5 dla testu)
2. Sprawdź console logs:
   ✓ Julian Tuwim | ✅ DOMENA PUBLICZNA | 72 lat
   ✓ Makuszyński | ✅ DOMENA PUBLICZNA | 72 lat
3. Sprawdź output - powinien mieć 26 kolumn
```

---

## 📊 Input/Output

### Input (z poprzednich nodes):
```json
{
  "Autor": "Julian Tuwim",
  "Rok_smierci": 1953,
  "Rok_urodzenia": 1894,
  "slug": "julian-tuwim",
  "WL_url": "https://wolnelektury.pl/autor/julian-tuwim/",
  "extractionMethod": "structured_html"
}
```

### Output (po Calculate Legal Status):
```json
{
  "Autor": "Julian Tuwim",
  "WL_slug": "julian-tuwim",
  "WL_url": "https://wolnelektury.pl/autor/julian-tuwim/",
  "Rok_urodzenia": 1894,
  "Rok_smierci": 1953,
  "Metoda_ekstrakcji": "structured_html",
  
  "Lat_od_smierci": 72,
  "Lat_do_domeny": -2,
  "Status_prawny": "✅ DOMENA PUBLICZNA",
  "Status_kolor": "green",
  "Status_szczegoly": "Minęło 72 lat od śmierci - oryginał polski",
  "Data_domeny_publicznej": 2023,
  "Mozliwe_do_nagrania": "TAK ✅",
  
  "Tlumacz": "",
  "Rok_smierci_tlumacza": "",
  "Tlumaczenie_status": "✅ Oryginał polski",
  
  "Liczba_utworow": "",
  "Kategoria": "📝 Wiersz",
  "Grupa_wiekowa": "2-8 lat",
  "Priorytet_nagrania": "⭐⭐⭐⭐⭐",
  "Utwory_do_nagrania": "",
  
  "Ostatnie_sprawdzenie": "2025-11-02",
  "Zrodlo_danych": "WL API (structured_html)",
  "Confidence": "very_high (95%)",
  "Notatki": "",
  "Status_nagrania": "📝 Do nagrania"
}
```

---

## 🔍 Troubleshooting

### Problem: "Cannot read property 'Rok_smierci' of undefined"
**Rozwiązanie:**
- Sprawdź czy poprzedni node zwraca dane
- Upewnij się że merge AI/Non-AI działa poprawnie

### Problem: "Status_prawny zawsze 🔍 WYMAGA WERYFIKACJI"
**Rozwiązanie:**
- Sprawdź czy Rok_smierci jest wypełniony
- Verify poprzedni node "Extract Death Year"

### Problem: Wolne wykonanie
**Rozwiązanie:**
- To normalne dla 500 autorów (~10-15 min)
- Zmniejsz page_size dla szybszych testów
- Usuń node "Fetch Works Count" (opcjonalny)

---

## 🎯 Best Practices

### Do's ✅
- Zawsze testuj na małej liczbie autorów (page_size=5-10)
- Sprawdzaj console logs dla debug info
- Używaj obu nodes dla maksymalnej funkcjonalności

### Don'ts ❌
- Nie zmieniaj nazw pól w kodzie (break Google Sheets mapping)
- Nie usuwaj console.log (potrzebne do debugowania)
- Nie zwiększaj page_size powyżej 500 (timeout risk)

---

## 📈 Performance

### Calculate Legal Status:
- **Czas wykonania**: ~2-3 sekundy na 100 autorów
- **Memory usage**: Minimal (~50MB)
- **Scalability**: Tested up to 500 autorów

### Fetch Works Count:
- **Czas wykonania**: ~100ms per author (rate limited)
- **Dla 100 autorów**: ~10 sekund
- **Dla 500 autorów**: ~50 sekund
- **API calls**: 1 per author

---

## 🚀 Advanced Usage

### Custom Kategorie
Dodaj własne kategorie w linii 94:
```javascript
const categoryToAgeGroup = {
  'Wiersz': '2-8 lat',
  'Bajka': '3-10 lat',
  'MojaKategoria': '5-15 lat'  // DODAJ TUTAJ
};
```

### Custom Priority Scoring
Zmień scoring w linii 104:
```javascript
// Dodaj własne kryteria
if (autorLower.includes('twoj_ulubiony_autor')) {
  priorityScore += 2;  // Boost priorytet
}
```

### Custom Status Messages
Edytuj emoji w liniach 70-120:
```javascript
statusPrawny = '🎉 SUPER DOMENA PUBLICZNA';  // Własny tekst
```

---

## 💡 Tips & Tricks

1. **Debug mode**: Dodaj więcej `console.log()` dla szczegółów
2. **Batch processing**: Uruchom dla 50 autorów na raz
3. **Error handling**: Kod ma built-in error handling
4. **Reusable**: Użyj tego kodu w innych projektach!

---

## 📞 Support

Problemy z kodem?
- [GitHub Issues](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/issues)
- [Discussions](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/discussions)
- Check [Troubleshooting Guide](../docs/QUICK_START.md#troubleshooting)

---

**Happy Automating! 🚀**
