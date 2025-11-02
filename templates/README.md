# 📊 Templates - Google Sheets & More

Ten folder zawiera szablony gotowe do importu i użycia.

---

## 📄 Pliki

### **[google_sheets_template.csv](google_sheets_template.csv)** ⭐ MAIN TEMPLATE
- Template z 15 przykładowymi autorami
- Wszystkie 26 kolumn
- Prawdziwe dane (Tuwim, Makuszyński, Ezop, etc.)
- **Gotowy do importu do Google Sheets**

---

## 🚀 Jak Użyć Template CSV

### KROK 1: Import do Google Sheets

**Metoda A: Przez Web Interface (Zalecana)**
```bash
1. Otwórz https://sheets.google.com/
2. Kliknij "Blank" (Pusty arkusz)
3. Plik → Importuj
4. Wybierz zakładkę "Upload"
5. Przeciągnij plik google_sheets_template.csv
6. Import location: "Replace spreadsheet"
7. Separator: "Comma"
8. ✅ Importuj!
```

**Metoda B: Przez Google Drive**
```bash
1. Wrzuć CSV na Google Drive
2. Prawy przycisk → Otwórz przez → Google Sheets
3. Plik zostanie automatycznie skonwertowany
```

### KROK 2: Nazwij Arkusz
```
Zalecana nazwa: "Wolne Lektury - Autorzy do Nagrań"
```

### KROK 3: Basic Setup (5 min)
```bash
1. Zamróź pierwszy wiersz (nagłówki):
   Widok → Zamróź → 1 wiersz

2. Ustaw szerokości kolumn:
   - Autor: 200px
   - Status_prawny: 280px (WAŻNE - długi tekst!)
   - Kategoria: 130px
   - Reszta: auto

3. ✅ Gotowe - podstawowy setup zakończony!
```

---

## 🎨 Zaawansowany Setup (OPCJONALNIE)

Po zaimportowaniu CSV, możesz dodać:

### 1. Conditional Formatting (Kolory)
**Kolumna I: Status_prawny**
```
✅ DOMENA PUBLICZNA     → Tło: #B7E1CD (zielony)
❌ CHRONIONE            → Tło: #F4C7C3 (czerwony)
⚠️ CHRONIONE (tłumacz)  → Tło: #FCE5CD (pomarańczowy)
🔍 WYMAGA WERYFIKACJI   → Tło: #E0E0E0 (szary)
```

**Jak dodać:**
```bash
1. Zaznacz kolumnę I
2. Format → Formatowanie warunkowe
3. Reguła: "Tekst zawiera"
4. Wartość: "✅"
5. Kolor tła: #B7E1CD
6. Gotowe
7. Powtórz dla ❌, ⚠️, 🔍
```

### 2. Data Validation (Dropdowns)
**Kolumna Z: Status_nagrania**
```
Opcje:
- 📝 Do nagrania
- 🎙️ W trakcie
- ✅ Gotowe
- 📅 Zaplanowane
- ⏸️ Wstrzymane
```

**Jak dodać:**
```bash
1. Zaznacz kolumnę Z (od Z2 w dół)
2. Dane → Sprawdzanie poprawności danych
3. Kryteria: "Lista z zakresu"
4. Wprowadź opcje
5. Zapisz
```

### 3. Formuły (jeśli n8n nie wypełnia)

**G2: Lat_od_smierci**
```
=IF(E2<>"", YEAR(TODAY())-E2, "")
```

**H2: Lat_do_domeny**
```
=IF(G2<>"", 70-G2, "")
```

**L2: Data_domeny_publicznej**
```
=IF(E2<>"", E2+70, "")
```

Skopiuj formuły w dół!

---

## 📊 Co Jest w Template

### 15 Przykładowych Autorów:

1. **Julian Tuwim** ⭐⭐⭐⭐⭐ - 47 utworów (Wiersz, 2-8 lat)
2. **Kornel Makuszyński** ⭐⭐⭐⭐ - 12 utworów (Opowieść, 6-12 lat)
3. **Konstanty Gałczyński** ⭐⭐⭐⭐ - 23 utworów (Teatrzyk, 4-9 lat)
4. **Maria Konopnicka** ⭐⭐⭐⭐ - 34 utworów (Bajka, 5-10 lat)
5. **Stanisław Jachowicz** ⭐⭐⭐ - 8 utworów (Wiersz, 3-7 lat)
6. **Ignacy Krasicki** ⭐⭐⭐⭐ - 42 utworów (Bajka, 6-12 lat)
7. **Hans Christian Andersen** ⭐⭐ - 67 utworów (Bajka, 4-10 lat) ⚠️ tłumacz
8. **Bracia Grimm** ⭐⭐ - 45 utworów (Bajka, 4-10 lat) ⚠️ tłumacz
9. **Ezop** ⭐⭐⭐⭐⭐ - 89 utworów (Bajka, 4-10 lat)
10. **Adam Mickiewicz** ⭐⭐⭐ - 58 utworów (Poezja, 8-12 lat)
11. **Juliusz Słowacki** ⭐⭐ - 43 utworów (Poezja, 8-12 lat)
12. **Henryk Sienkiewicz** ⭐⭐⭐ - 67 utworów (Opowieść, 9-12 lat)
13. **Bolesław Prus** ⭐⭐ - 52 utworów (Opowieść, 10-12 lat)
14. **Eliza Orzeszkowa** ⭐ - 34 utworów (Opowieść, 10-12 lat)
15. **Władysław Bełza** ⭐⭐⭐ - 5 utworów (Wiersz, 6-12 lat)

### Mix wszystkiego:
- ✅ 12 w domenie publicznej (możliwe do nagrania!)
- ⚠️ 2 wymaga sprawdzenia tłumacza
- 📝 Różne kategorie (Wiersz, Bajka, Teatrzyk, Poezja)
- ⭐ Różne priorytety (1-5 gwiazdek)
- 👶 Różne grupy wiekowe (2-8, 4-10, 8-12 lat)

---

## 🔍 Struktura Kolumn

### Wszystkie 26 kolumn:

**PODSTAWOWE (6):**
1. Autor
2. WL_slug
3. WL_url
4. Rok_urodzenia
5. Rok_smierci
6. Metoda_ekstrakcji

**STATUS PRAWNY (7):**
7. Lat_od_smierci
8. Lat_do_domeny
9. Status_prawny ⭐
10. Status_kolor
11. Status_szczegoly
12. Data_domeny_publicznej
13. Mozliwe_do_nagrania ⭐

**TŁUMACZENIA (3):**
14. Tlumacz
15. Rok_smierci_tlumacza
16. Tlumaczenie_status

**CONTENT METADATA (5):**
17. Liczba_utworow
18. Kategoria ⭐
19. Grupa_wiekowa
20. Priorytet_nagrania ⭐
21. Utwory_do_nagrania

**TRACKING (5):**
22. Ostatnie_sprawdzenie
23. Zrodlo_danych
24. Confidence
25. Notatki
26. Status_nagrania ⭐

---

## ✅ Po Imporcie

### Następne kroki:

1. **Setup n8n workflow**
   - Import workflow z `/examples/`
   - Skonfiguruj Google Sheets credentials
   - Dodaj Sheet ID do workflow

2. **Full import**
   - Zmień `page_size=500` w workflow
   - Execute!
   - Poczekaj 10-15 minut
   - 200+ autorów ready! 🎉

3. **Customizacja**
   - Dodaj conditional formatting
   - Stwórz dashboard (osobny arkusz)
   - Setup filtry i widoki

**Instrukcje szczegółowe**: [Setup Guide](../docs/SETUP_GUIDE.md)

---

## 💡 Tips

- **Backup**: Plik → Utwórz kopię (co tydzień)
- **Udostępnianie**: Share dla n8n service account
- **Version control**: Google Sheets ma built-in wersjonowanie
- **Export**: Zawsze możesz wyeksportować z powrotem do CSV

---

## 📞 Problemy?

**CSV nie importuje się?**
- Sprawdź encoding (powinien być UTF-8)
- Zmień separator na "," jeśli `;`

**Dziwne znaki (Ä, Ĺ, etc.)?**
- Import ponownie z encoding UTF-8

**Kolumny źle wyrównane?**
- Wybierz "Comma" jako separator, nie "Tab"

---

## 🎯 Ready to Use!

Po zaimportowaniu tego template masz:
- ✅ Pełną strukturę 26 kolumn
- ✅ 15 przykładów do nauki
- ✅ Gotowość do full importu z n8n
- ✅ Profesjonalny system zarządzania autorami

**Next step**: [Setup n8n workflow](../docs/QUICK_START.md) 🚀
