# 🚀 DASHBOARD - SUPER PROSTA INSTRUKCJA (3 minuty)

## ✅ METODA 1: IMPORT CSV (NAJSZYBSZA!)

### KROK 1: Pobierz Plik
W folderze `outputs` znajdź:
- `DASHBOARD_Layout_Ready.csv`

### KROK 2: Otwórz Swój Google Sheet
- Ten z danymi autorów (arkusz "AUTORZY")

### KROK 3: Import CSV
1. **Plik → Importuj**
2. **Upload → Wybierz** `DASHBOARD_Layout_Ready.csv`
3. **Import location:** "Insert new sheet(s)"
4. **Separator type:** Comma
5. **Import**

### KROK 4: Zmień Nazwę Arkusza
1. Prawy przycisk na nowo dodanym arkuszu (na dole)
2. **Rename** → Wpisz: **DASHBOARD**

### KROK 5: GOTOWE! 🎉
Wszystkie formuły działają automatycznie!

---

## ✅ METODA 2: RĘCZNE KOPIOWANIE (5 minut)

Jeśli import nie działa, kopiuj formuły ręcznie:

### SEKCJA 1: Podstawowe Statystyki (A7-B12)

```
A7: Łącznie autorów:
B7: =COUNTA(AUTORZY!A:A)-1

A8: ✅ W domenie publicznej:
B8: =COUNTIF(AUTORZY!I:I,"✅*")

A9: ❌ Chronione:
B9: =COUNTIF(AUTORZY!I:I,"❌*")

A10: ⚠️ Wymaga weryfikacji:
B10: =COUNTIF(AUTORZY!I:I,"⚠️*")

A12: 📊 % możliwych do nagrania:
B12: =TEXT(COUNTIF(AUTORZY!M:M,"TAK*")/(COUNTA(AUTORZY!M:M)-1),"0%")
```

### SEKCJA 2: Status Nagrań (A16-B22)

```
A16: 📝 Do nagrania:
B16: =COUNTIF(AUTORZY!Z:Z,"📝*")

A17: 🎙️ W trakcie:
B17: =COUNTIF(AUTORZY!Z:Z,"🎙️*")

A18: ✅ Gotowe:
B18: =COUNTIF(AUTORZY!Z:Z,"✅*")

A19: 📅 Zaplanowane:
B19: =COUNTIF(AUTORZY!Z:Z,"📅*")

A20: ⏸️ Wstrzymane:
B20: =COUNTIF(AUTORZY!Z:Z,"⏸️*")

A22: 📊 % ukończenia:
B22: =TEXT(COUNTIF(AUTORZY!Z:Z,"✅*")/(COUNTA(AUTORZY!Z:Z)-1),"0%")
```

### SEKCJA 3: Kategorie (A26-B32)

```
A26: 📝 Wiersz:
B26: =COUNTIF(AUTORZY!R:R,"*Wiersz*")

A27: 📖 Opowieść:
B27: =COUNTIF(AUTORZY!R:R,"*Opowieść*")

A28: 🎭 Teatrzyk:
B28: =COUNTIF(AUTORZY!R:R,"*Teatrzyk*")

A29: 🧚 Bajka:
B29: =COUNTIF(AUTORZY!R:R,"*Bajka*")

A30: ✍️ Poezja:
B30: =COUNTIF(AUTORZY!R:R,"*Poezja*")
```

### SEKCJA 4: TOP 10 Autorów (D7)

**Wklej W KOMÓRKĘ D7:**
```
=QUERY(AUTORZY!A:Z,"SELECT A, T, Q, Z WHERE M = 'TAK ✅' ORDER BY T DESC LIMIT 10",0)
```

**UWAGA:** Ta formuła rozwinie się automatycznie do D7:G16!

### SEKCJA 5: Ostatnio Dodani (D29)

**Wklej W KOMÓRKĘ D29:**
```
=QUERY(AUTORZY!A:Z,"SELECT A, I, R, V ORDER BY V DESC LIMIT 10",0)
```

**UWAGA:** Ta formuła rozwinie się automatycznie do D29:G38!

---

## 🎨 OPCJONALNE: Formatowanie

### Kolory (Select komórki → Format → Fill color):
- A5 (📚 STATYSTYKI): #E8F0FE (niebieski)
- A14 (📝 STATUS): #FCE5CD (pomarańczowy)
- A24 (📚 KATEGORIE): #D9EAD3 (zielony)
- D5 (⭐ TOP 10): #F4CCCC (czerwony)

### Pogrubienie:
- Wszystkie nagłówki sekcji: **Bold**
- Wartości w kolumnie B: **Bold**

---

## 🐛 TROUBLESHOOTING

### Problem: #REF! Error
**Przyczyna:** Arkusz nie nazywa się "AUTORZY"

**Rozwiązanie:**
1. Sprawdź nazwę arkusza z danymi (na dole)
2. Jeśli nazywa się np. "Sheet1", zmień na "AUTORZY"
3. Lub zamień "AUTORZY" w formułach na "Sheet1"

**Szybka zamiana:**
1. Ctrl + H (Find & Replace)
2. Find: `AUTORZY!`
3. Replace: `Sheet1!` (lub jaka jest nazwa)
4. Replace all

### Problem: #N/A w QUERY
**Przyczyna:** Brak danych lub złe kolumny

**Rozwiązanie:**
1. Execute workflow w n8n (dodaj dane)
2. Sprawdź czy kolumny istnieją (I, M, Z, T, Q, R, S, V)

### Problem: Wszystko pokazuje 0
**Przyczyna:** Brak danych w arkuszu

**Rozwiązanie:**
1. Wróć do n8n
2. Execute workflow (minimum 5 autorów)
3. Sprawdź czy dane są w arkuszu AUTORZY
4. Dashboard zaktualizuje się automatycznie

### Problem: QUERY rozwija się w złe miejsce
**Rozwiązanie:**
1. Upewnij się że komórki D8:G16 są PUSTE
2. Usuń zawartość tych komórek
3. Wklej QUERY ponownie w D7

---

## 📊 CO ZOBACZYSZ PO SETUPIE

```
📊 DASHBOARD
├── Łącznie autorów: 562
├── ✅ W domenie publicznej: 197 (35%)
├── ❌ Chronione: 310 (55%)
├── ⚠️ Wymaga weryfikacji: 55 (10%)
│
├── 📝 Do nagrania: 187
├── 🎙️ W trakcie: 8
├── ✅ Gotowe: 2
│
├── TOP 10:
│   1. Julian Tuwim ⭐⭐⭐⭐⭐ (47 utworów)
│   2. Ezop ⭐⭐⭐⭐⭐ (89 utworów)
│   ...
│
└── Kategorie:
    ├── 📝 Wiersz: 45
    ├── 📖 Opowieść: 67
    └── 🧚 Bajka: 89
```

---

## ✅ CHECKLIST

Po setupie sprawdź:

- [ ] Arkusz nazywa się "DASHBOARD"
- [ ] Wszystkie liczby się wyświetlają (nie #REF!)
- [ ] TOP 10 pokazuje 10 autorów
- [ ] Ostatnio dodani pokazuje 10 wpisów
- [ ] Procenty są między 0-100%
- [ ] Kategorie sumują się prawidłowo

---

## 🎉 GOTOWE!

**Dashboard live aktualizuje się automatycznie!**

Każdy raz gdy wykonasz workflow w n8n:
- ✅ Liczby aktualizują się
- ✅ TOP 10 się zmienia
- ✅ Ostatnio dodani pokazuje nowych
- ✅ Procenty przeliczają się

**Nie musisz nic robić ręcznie!** 🚀

---

## 💡 PROTIP

Po pierwszym execute workflow (5 autorów test):
1. Odśwież Google Sheet (F5)
2. Zobacz jak dashboard się wypełnia
3. Execute ponownie z większą liczbą (50 autorów)
4. Zobacz jak liczby rosną w real-time!

**Dashboard jest REACTIVE - aktualizuje się instantly!** ⚡

---

## 🎯 NASTĘPNY KROK

Po setupie dashboardu:
1. **Full import** - Execute workflow z page_size=500
2. **Zobacz magic** - Dashboard pokazuje 200+ autorów w domenie!
3. **Filtruj** - Używaj dashboardu do priorytetyzacji nagrań
4. **Celebrate!** 🎉

**Masz teraz profesjonalny system zarządzania autorami!** 🌟
