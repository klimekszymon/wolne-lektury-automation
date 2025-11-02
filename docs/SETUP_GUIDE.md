# 📊 GOOGLE SHEETS SETUP - INSTRUKCJE KROK PO KROKU

## 🎯 CEL
Skonfigurować Google Sheet z automatycznymi formułami, kolorami i dashboardem dla projektu Wolne Lektury.

---

## 📁 KROK 1: IMPORT CSV

### **A. Utwórz nowy Google Sheet**
1. Otwórz Google Drive
2. Kliknij "Nowy" → "Arkusz kalkulacyjny Google"
3. Nazwij: `Wolne Lektury - Autorzy do Nagrań`

### **B. Zaimportuj CSV template**
1. Plik → Importuj → Upload
2. Wybierz `Google_Sheets_Template_WL_Autorzy.csv`
3. Wybierz "Zastąp arkusz" lub "Dodaj nowy arkusz"
4. Separator: przecinek
5. Importuj!

---

## 🎨 KROK 2: CONDITIONAL FORMATTING (KOLORY)

### **KOLUMNA I: Status_prawny**

**FORMATOWANIE #1: ✅ DOMENA PUBLICZNA**
```
1. Zaznacz kolumnę I (całą)
2. Format → Formatowanie warunkowe
3. Reguła: "Tekst zawiera"
4. Wartość: ✅
5. Kolor tła: #B7E1CD (jasny zielony)
6. Kolor tekstu: #0D652D (ciemny zielony)
7. Gotowe
```

**FORMATOWANIE #2: ❌ CHRONIONE**
```
Dodaj kolejną regułę:
1. Tekst zawiera: ❌
2. Kolor tła: #F4C7C3 (jasny czerwony)
3. Kolor tekstu: #CC0000 (ciemny czerwony)
```

**FORMATOWANIE #3: ⚠️ WYMAGA SPRAWDZENIA**
```
Dodaj kolejną regułę:
1. Tekst zawiera: ⚠️
2. Kolor tła: #FCE5CD (jasny pomarańczowy)
3. Kolor tekstu: #E69138 (ciemny pomarańczowy)
```

**FORMATOWANIE #4: 🔍 WYMAGA WERYFIKACJI**
```
Dodaj kolejną regułę:
1. Tekst zawiera: 🔍
2. Kolor tła: #E0E0E0 (szary)
3. Kolor tekstu: #666666 (ciemny szary)
```

### **KOLUMNA M: Mozliwe_do_nagrania**

**FORMATOWANIE #1: TAK ✅**
```
1. Zaznacz kolumnę M
2. Format → Formatowanie warunkowe
3. Tekst zawiera: TAK
4. Kolor tła: #D9EAD3 (bardzo jasny zielony)
5. Pogrubienie: TAK
```

**FORMATOWANIE #2: NIE ❌**
```
1. Tekst zawiera: NIE
2. Kolor tła: #F4CCCC (bardzo jasny czerwony)
3. Kolor tekstu: #999999 (szary)
```

### **KOLUMNA Z: Status_nagrania**

**FORMATOWANIE według emoji:**
```
📝 Do nagrania → Biały (default)
🎙️ W trakcie → #FFF2CC (żółty)
✅ Gotowe → #D9EAD3 (zielony)
📅 Zaplanowane → #CFE2F3 (niebieski)
⏸️ Wstrzymane → #F4CCCC (czerwony)
```

---

## 📐 KROK 3: FORMUŁY (jeśli n8n nie liczy)

### **KOLUMNA G: Lat_od_smierci**

W komórce G2 (pierwsza z danymi):
```
=IF(E2<>"", YEAR(TODAY())-E2, "")
```

**Wyjaśnienie:**
- `IF(E2<>"", ...)` - jeśli Rok_smierci nie jest pusty
- `YEAR(TODAY())` - aktualny rok
- `-E2` - minus rok śmierci
- `""` - jeśli pusty, zwróć puste

**Skopiuj w dół:**
1. Zaznacz G2
2. Ctrl+C (kopiuj)
3. Zaznacz G3:G1000
4. Ctrl+V (wklej)

### **KOLUMNA H: Lat_do_domeny**

W komórce H2:
```
=IF(G2<>"", 70-G2, "")
```

### **KOLUMNA L: Data_domeny_publicznej**

W komórce L2:
```
=IF(E2<>"", E2+70, "")
```

### **KOLUMNA M: Mozliwe_do_nagrania (ADVANCED)**

**PEŁNA LOGIKA** (jeśli n8n nie oblicza):

```
=IF(E2="", "❓ BRAK DANYCH",
  IF(G2>=70,
    IF(AND(N2<>"", O2<>"", (YEAR(TODAY())-O2)<70),
      "NIE ❌",
      "TAK ✅"
    ),
    "NIE ❌"
  )
)
```

**Wyjaśnienie:**
1. Jeśli brak roku śmierci → "BRAK DANYCH"
2. Jeśli autor 70+ lat od śmierci:
   - Jeśli ma tłumacza i tłumacz <70 lat → NIE
   - Inaczej → TAK
3. Inaczej (autor <70 lat) → NIE

---

## 🎨 KROK 4: STYLE I WYGLĄD

### **NAGŁÓWKI (wiersz 1)**
```
1. Zaznacz wiersz 1
2. Format → Tekst → Pogrubienie
3. Format → Tekst → Wyrównanie do środka
4. Format → Kolor tła → #4A86E8 (niebieski)
5. Format → Kolor tekstu → Biały
6. Zamrożenie: Widok → Zamróź → 1 wiersz
```

### **SZEROKOŚCI KOLUMN (zalecane)**
```
A: Autor                    → 200px
B: WL_slug                  → 150px
C: WL_url                   → 300px
D: Rok_urodzenia            → 100px
E: Rok_smierci              → 100px
F: Metoda_ekstrakcji        → 130px
G: Lat_od_smierci          → 110px
H: Lat_do_domeny           → 110px
I: Status_prawny            → 280px (WAŻNE!)
J: Status_kolor             → 0px (ukryj)
K: Status_szczegoly         → 400px
L: Data_domeny_publicznej   → 150px
M: Mozliwe_do_nagrania     → 150px
N: Tlumacz                  → 150px
O: Rok_smierci_tlumacza    → 150px
P: Tlumaczenie_status       → 180px
Q: Liczba_utworow          → 110px
R: Kategoria                → 130px
S: Grupa_wiekowa           → 110px
T: Priorytet_nagrania      → 140px
U: Utwory_do_nagrania      → 350px
V: Ostatnie_sprawdzenie    → 150px
W: Zrodlo_danych           → 200px
X: Confidence               → 140px
Y: Notatki                  → 300px
Z: Status_nagrania          → 160px
```

### **UKRYJ NIEPOTRZEBNE KOLUMNY**
Prawym przyciskiem na kolumnę → Ukryj kolumnę:
- **J: Status_kolor** (tylko dla n8n, nie dla użytkownika)

---

## 📊 KROK 5: STWÓRZ DASHBOARD (nowy arkusz)

### **A. Utwórz nowy arkusz**
1. Kliknij "+" na dole (nowy arkusz)
2. Nazwij: `📊 DASHBOARD`

### **B. Sekcja 1: PODSUMOWANIE AUTORÓW**

```
┌─────────────────────────────────────────┐
│  📚 STATYSTYKI AUTORÓW                  │
├─────────────────────────────────────────┤
│                                         │
│  Łącznie autorów:          [ 15 ]      │
│  ✅ W domenie publicznej:  [ 12 ]      │
│  ❌ Chronione:             [ 2 ]       │
│  ⚠️ Wymaga weryfikacji:    [ 1 ]       │
│                                         │
│  📊 % możliwych do nagrania: [ 80% ]   │
└─────────────────────────────────────────┘
```

**FORMUŁY (zakładając dane w arkuszu "Dane"):**

```
B3: Łącznie autorów
=COUNTA(Dane!A:A)-1

B4: W domenie publicznej
=COUNTIF(Dane!I:I,"✅*")

B5: Chronione
=COUNTIF(Dane!I:I,"❌*")

B6: Wymaga weryfikacji
=COUNTIF(Dane!I:I,"*WERYFIKACJI*")

B8: % możliwych
=TEXT(COUNTIF(Dane!M:M,"TAK*")/COUNTA(Dane!M:M),"0%")
```

### **C. Sekcja 2: STATUS NAGRAŃ**

```
┌─────────────────────────────────────────┐
│  📝 STATUS PRODUKCJI                    │
├─────────────────────────────────────────┤
│                                         │
│  📝 Do nagrania:           [ 10 ]      │
│  🎙️ W trakcie:            [ 3 ]       │
│  ✅ Gotowe:                [ 2 ]       │
│  📅 Zaplanowane:           [ 0 ]       │
│  ⏸️ Wstrzymane:            [ 0 ]       │
│                                         │
│  📊 % ukończenia:          [ 13% ]     │
└─────────────────────────────────────────┘
```

**FORMUŁY:**

```
B12: Do nagrania
=COUNTIF(Dane!Z:Z,"📝*")

B13: W trakcie
=COUNTIF(Dane!Z:Z,"🎙️*")

B14: Gotowe
=COUNTIF(Dane!Z:Z,"✅*")

B15: Zaplanowane
=COUNTIF(Dane!Z:Z,"📅*")

B16: Wstrzymane
=COUNTIF(Dane!Z:Z,"⏸️*")

B18: % ukończenia
=TEXT(COUNTIF(Dane!Z:Z,"✅*")/COUNTA(Dane!Z:Z),"0%")
```

### **D. Sekcja 3: TOP PRIORYTETY**

```
┌─────────────────────────────────────────┐
│  ⭐ TOP 10 DO NAGRANIA                  │
├─────────────────────────────────────────┤
│  Autor              | Priorytet | Status│
│  Julian Tuwim       | ⭐⭐⭐⭐⭐  | 📝    │
│  Ezop               | ⭐⭐⭐⭐⭐  | 📝    │
│  ...                                    │
└─────────────────────────────────────────┘
```

**FORMUŁA (ADVANCED - wymaga QUERY):**

```
A22:C32 = 
=QUERY(Dane!A:Z,
  "SELECT A, T, Z 
   WHERE M = 'TAK ✅' 
   ORDER BY T DESC 
   LIMIT 10",
  1)
```

### **E. Sekcja 4: KATEGORIE**

```
┌─────────────────────────────────────────┐
│  📚 ROZKŁAD KATEGORII                   │
├─────────────────────────────────────────┤
│                                         │
│  📝 Wiersz:                [ 3 ]       │
│  📖 Opowieść:              [ 4 ]       │
│  🎭 Teatrzyk:              [ 1 ]       │
│  🧚 Bajka:                 [ 5 ]       │
│  ✍️ Poezja:                [ 2 ]       │
└─────────────────────────────────────────┘
```

**FORMUŁY:**

```
B36: Wiersz
=COUNTIF(Dane!R:R,"*Wiersz*")

B37: Opowieść
=COUNTIF(Dane!R:R,"*Opowieść*")

B38: Teatrzyk
=COUNTIF(Dane!R:R,"*Teatrzyk*")

B39: Bajka
=COUNTIF(Dane!R:R,"*Bajka*")

B40: Poezja
=COUNTIF(Dane!R:R,"*Poezja*")
```

---

## 🎯 KROK 6: FILTRY I SORTOWANIE

### **DODAJ FILTER VIEW**

1. Zaznacz nagłówki (wiersz 1)
2. Dane → Utwórz filtr
3. Kliknij małą ikonę filtra na nagłówkach

### **PRESET FILTERS (zapisz jako widoki)**

**WIDOK 1: "✅ Możliwe do nagrania"**
```
1. Dane → Widoki filtrów → Utwórz nowy widok filtrów
2. Nazwa: "✅ Możliwe do nagrania"
3. Kolumna M (Mozliwe_do_nagrania): Filtruj = "TAK ✅"
4. Sortuj według: T (Priorytet_nagrania) - malejąco
5. Zapisz
```

**WIDOK 2: "📝 Do nagrania HIGH PRIORITY"**
```
1. Nowy widok: "📝 Do nagrania HIGH PRIORITY"
2. Kolumna M: TAK ✅
3. Kolumna Z: 📝 Do nagrania
4. Kolumna T: Zawiera ⭐⭐⭐⭐ lub więcej
5. Sortuj: Priorytet malejąco
```

**WIDOK 3: "🎙️ W PRODUKCJI"**
```
1. Nowy widok: "🎙️ W PRODUKCJI"
2. Kolumna Z: 🎙️ W trakcie LUB ✅ Gotowe
3. Sortuj: Data ostatniego sprawdzenia - malejąco
```

**WIDOK 4: "⚠️ PROBLEMY PRAWNE"**
```
1. Nowy widok: "⚠️ PROBLEMY PRAWNE"
2. Kolumna I: Zawiera ⚠️ lub 🔍
3. Pokaż wszystkich którzy wymagają weryfikacji tłumacza
```

---

## 🔍 KROK 7: VALIDACJA DANYCH (Dropdowns)

### **KOLUMNA Z: Status_nagrania**

```
1. Zaznacz kolumnę Z (od Z2 w dół)
2. Dane → Sprawdzanie poprawności danych
3. Kryteria: Lista z zakresu
4. Wprowadź ręcznie opcje:
   📝 Do nagrania
   🎙️ W trakcie
   ✅ Gotowe
   📅 Zaplanowane
   ⏸️ Wstrzymane
5. W przypadku nieprawidłowych: Pokaż ostrzeżenie
6. Zapisz
```

### **KOLUMNA R: Kategoria**

```
Dodaj dropdown:
📝 Wiersz
📖 Opowieść
🎭 Teatrzyk
🧚 Bajka
✍️ Poezja
📚 Inne
```

---

## 📲 KROK 8: UDOSTĘPNIANIE & PERMISSIONS

### **Dla n8n (Service Account):**
```
1. Udostępnij → Uzyskaj link
2. Edytor: "Każdy kto ma link"
3. Lub: dodaj service account email z n8n credentials
```

### **Dla współpracowników:**
```
1. Udostępnij → Dodaj osoby
2. Wybierz poziom: Edytor / Komentator / Przeglądający
```

---

## 🎨 KROK 9: ZAAWANSOWANE - WYKRESY (OPCJONALNIE)

### **WYKRES 1: PIE CHART - Status Prawny**

```
1. Wstaw → Wykres
2. Typ: Kołowy
3. Zakres danych: Dashboard!B4:B7
4. Etykiety: Dashboard!A4:A7
5. Kolory:
   - Zielony dla "W domenie"
   - Czerwony dla "Chronione"
   - Szary dla "Weryfikacji"
```

### **WYKRES 2: BAR CHART - Kategorie**

```
1. Typ: Słupkowy
2. Zakres: Dashboard!A36:B40
3. Poziomy (horizontal bar)
4. Kolory: różne dla każdej kategorii
```

---

## ✅ CHECKLIST - CO MUSI BYĆ ZROBIONE

- [ ] Import CSV do Google Sheets
- [ ] Conditional formatting (4 reguły dla Status_prawny)
- [ ] Conditional formatting (2 reguły dla Mozliwe_do_nagrania)
- [ ] Zamrożenie wiersza nagłówków
- [ ] Formuły w kolumnach G, H, L (jeśli n8n nie liczy)
- [ ] Dashboard z 4 sekcjami statystyk
- [ ] Filtry podstawowe
- [ ] 4 zapisane widoki filtrów
- [ ] Validacja danych (dropdowny)
- [ ] Udostępnienie dla n8n Service Account

---

## 🚀 GOTOWE!

Po wykonaniu wszystkich kroków masz:
- ✅ Profesjonalny arkusz z danymi autorów
- ✅ Automatyczne obliczenia statusu prawnego
- ✅ Kolorowe oznaczenia dla łatwej nawigacji
- ✅ Dashboard z kluczowymi statystykami
- ✅ Zapisane filtry dla szybkiego dostępu
- ✅ Integrację z n8n workflow

**Czas na automatyczne wypełnianie danymi z Wolnych Lektur! 🎉**
