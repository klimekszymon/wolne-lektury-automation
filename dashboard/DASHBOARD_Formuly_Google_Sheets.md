# 📊 GOOGLE SHEETS DASHBOARD - GOTOWE FORMUŁY

## 🎯 SETUP (5 minut)

### KROK 1: Utwórz Nowy Arkusz
1. W Google Sheets kliknij **+ na dole** (obok "AUTORZY")
2. Nazwij: **DASHBOARD**
3. Gotowe!

### KROK 2: Skopiuj Layout Poniżej

---

## 📋 FORMUŁY DO SKOPIOWANIA

### ═══════════════════════════════════════════
### SEKCJA 1: NAGŁÓWEK (A1:E3)
### ═══════════════════════════════════════════

**A1:** `📊 WOLNE LEKTURY - DASHBOARD`
**Format:** Font size 18, Bold, Center

**A2:** `Ostatnia aktualizacja:`
**B2:** `=TEXT(NOW(),"DD/MM/YYYY HH:MM")`

---

### ═══════════════════════════════════════════
### SEKCJA 2: STATYSTYKI AUTORÓW (A5:B12)
### ═══════════════════════════════════════════

**A5:** `📚 STATYSTYKI AUTORÓW`
**Format:** Font size 14, Bold, Background color #E8F0FE

**A7:** `Łącznie autorów:`
**B7:** `=COUNTA(AUTORZY!A:A)-1`

**A8:** `✅ W domenie publicznej:`
**B8:** `=COUNTIF(AUTORZY!I:I,"✅*")`

**A9:** `❌ Chronione:`
**B9:** `=COUNTIF(AUTORZY!I:I,"❌*")`

**A10:** `⚠️ Wymaga weryfikacji:`
**B10:** `=COUNTIF(AUTORZY!I:I,"⚠️*")`

**A12:** `📊 % możliwych do nagrania:`
**B12:** `=TEXT(COUNTIF(AUTORZY!M:M,"TAK*")/(COUNTA(AUTORZY!M:M)-1),"0%")`

---

### ═══════════════════════════════════════════
### SEKCJA 3: STATUS NAGRAŃ (A14:B22)
### ═══════════════════════════════════════════

**A14:** `📝 STATUS PRODUKCJI`
**Format:** Font size 14, Bold, Background color #FCE5CD

**A16:** `📝 Do nagrania:`
**B16:** `=COUNTIF(AUTORZY!Z:Z,"📝*")`

**A17:** `🎙️ W trakcie:`
**B17:** `=COUNTIF(AUTORZY!Z:Z,"🎙️*")`

**A18:** `✅ Gotowe:`
**B18:** `=COUNTIF(AUTORZY!Z:Z,"✅*")`

**A19:** `📅 Zaplanowane:`
**B19:** `=COUNTIF(AUTORZY!Z:Z,"📅*")`

**A20:** `⏸️ Wstrzymane:`
**B20:** `=COUNTIF(AUTORZY!Z:Z,"⏸️*")`

**A22:** `📊 % ukończenia:`
**B22:** `=TEXT(COUNTIF(AUTORZY!Z:Z,"✅*")/(COUNTA(AUTORZY!Z:Z)-1),"0%")`

---

### ═══════════════════════════════════════════
### SEKCJA 4: KATEGORIE (A24:B32)
### ═══════════════════════════════════════════

**A24:** `📚 ROZKŁAD KATEGORII`
**Format:** Font size 14, Bold, Background color #D9EAD3

**A26:** `📝 Wiersz:`
**B26:** `=COUNTIF(AUTORZY!R:R,"*Wiersz*")`

**A27:** `📖 Opowieść:`
**B27:** `=COUNTIF(AUTORZY!R:R,"*Opowieść*")`

**A28:** `🎭 Teatrzyk:`
**B28:** `=COUNTIF(AUTORZY!R:R,"*Teatrzyk*")`

**A29:** `🧚 Bajka:`
**B29:** `=COUNTIF(AUTORZY!R:R,"*Bajka*")`

**A30:** `✍️ Poezja:`
**B30:** `=COUNTIF(AUTORZY!R:R,"*Poezja*")`

**A32:** `📊 Łącznie skategoryzowane:`
**B32:** `=SUM(B26:B30)`

---

### ═══════════════════════════════════════════
### SEKCJA 5: TOP 10 PRIORYTETY (D5:G16)
### ═══════════════════════════════════════════

**D5:** `⭐ TOP 10 AUTORÓW DO NAGRANIA`
**Format:** Font size 14, Bold, Background color #F4CCCC, Merge D5:G5

**D6:** `Autor`
**E6:** `Priorytet`
**F6:** `Utworów`
**G6:** `Status`
**Format:** Bold, Background color #DDDDDD

**D7:G16:** 
```
=QUERY(AUTORZY!A:Z,
  "SELECT A, T, Q, Z 
   WHERE M = 'TAK ✅' 
   ORDER BY T DESC 
   LIMIT 10",
  0)
```
**Wklej to w D7** - rozwinie się automatycznie do G16!

---

### ═══════════════════════════════════════════
### SEKCJA 6: GRUPA WIEKOWA (D18:E25)
### ═══════════════════════════════════════════

**D18:** `👶 GRUPY WIEKOWE`
**Format:** Font size 14, Bold, Background color #CFE2F3

**D20:** `2-8 lat:`
**E20:** `=COUNTIF(AUTORZY!S:S,"*2-8*")`

**D21:** `3-10 lat:`
**E21:** `=COUNTIF(AUTORZY!S:S,"*3-10*")`

**D22:** `4-9 lat:`
**E22:** `=COUNTIF(AUTORZY!S:S,"*4-9*")`

**D23:** `5-12 lat:`
**E23:** `=COUNTIF(AUTORZY!S:S,"*5-12*")`

**D24:** `8-12 lat:`
**E24:** `=COUNTIF(AUTORZY!S:S,"*8-12*")`

---

### ═══════════════════════════════════════════
### SEKCJA 7: OSTATNIO DODANI (D27:G37)
### ═══════════════════════════════════════════

**D27:** `🆕 OSTATNIO DODANI (10 NAJNOWSZYCH)`
**Format:** Font size 14, Bold, Background color #E1D5E7, Merge D27:G27

**D28:** `Autor`
**E28:** `Status`
**F28:** `Kategoria`
**G28:** `Data`
**Format:** Bold, Background color #DDDDDD

**D29:G38:**
```
=QUERY(AUTORZY!A:Z,
  "SELECT A, I, R, V 
   ORDER BY V DESC 
   LIMIT 10",
  0)
```
**Wklej to w D29**

---

## 🎨 FORMATOWANIE (OPCJONALNIE)

### Kolory Sekcji:
- **Statystyki autorów** (A5): #E8F0FE (niebieski)
- **Status produkcji** (A14): #FCE5CD (pomarańczowy)
- **Kategorie** (A24): #D9EAD3 (zielony)
- **Top 10** (D5): #F4CCCC (czerwony)
- **Grupy wiekowe** (D18): #CFE2F3 (jasny niebieski)
- **Ostatnio dodani** (D27): #E1D5E7 (fioletowy)

### Wyrównanie:
- Nagłówki sekcji: **Center, Bold**
- Etykiety (kolumna A, D): **Left**
- Wartości (kolumna B, E): **Right, Bold**

### Szerokości kolumn:
- A: 250px
- B: 150px
- C: 50px (pusty - separator)
- D: 200px
- E: 120px
- F: 120px
- G: 120px

---

## 🚀 QUICK SETUP - KOPIUJ I WKLEJ

### METODA SZYBKA (Zamiast ręcznie):

Możesz skopiować wszystkie formuły na raz:

1. **Utwórz nowy arkusz DASHBOARD**
2. **Skopiuj poniższą tabelę** (Ctrl+C)
3. **Wklej w A1** (Ctrl+V)

---

## 📊 GOTOWA TABELA DO SKOPIOWANIA

```
📊 WOLNE LEKTURY - DASHBOARD				⭐ TOP 10 AUTORÓW DO NAGRANIA			
Ostatnia aktualizacja:	=TEXT(NOW(),"DD/MM/YYYY HH:MM")			Autor	Priorytet	Utworów	Status
					=QUERY(AUTORZY!A:Z,"SELECT A, T, Q, Z WHERE M = 'TAK ✅' ORDER BY T DESC LIMIT 10",0)			
					
📚 STATYSTYKI AUTORÓW				
				
Łącznie autorów:	=COUNTA(AUTORZY!A:A)-1			
✅ W domenie publicznej:	=COUNTIF(AUTORZY!I:I,"✅*")			
❌ Chronione:	=COUNTIF(AUTORZY!I:I,"❌*")			
⚠️ Wymaga weryfikacji:	=COUNTIF(AUTORZY!I:I,"⚠️*")			
					👶 GRUPY WIEKOWE		
📊 % możliwych do nagrania:	=TEXT(COUNTIF(AUTORZY!M:M,"TAK*")/(COUNTA(AUTORZY!M:M)-1),"0%")				
					2-8 lat:	=COUNTIF(AUTORZY!S:S,"*2-8*")	
📝 STATUS PRODUKCJI				3-10 lat:	=COUNTIF(AUTORZY!S:S,"*3-10*")	
					4-9 lat:	=COUNTIF(AUTORZY!S:S,"*4-9*")	
📝 Do nagrania:	=COUNTIF(AUTORZY!Z:Z,"📝*")			5-12 lat:	=COUNTIF(AUTORZY!S:S,"*5-12*")	
🎙️ W trakcie:	=COUNTIF(AUTORZY!Z:Z,"🎙️*")			8-12 lat:	=COUNTIF(AUTORZY!S:S,"*8-12*")	
✅ Gotowe:	=COUNTIF(AUTORZY!Z:Z,"✅*")				
📅 Zaplanowane:	=COUNTIF(AUTORZY!Z:Z,"📅*")			🆕 OSTATNIO DODANI (10 NAJNOWSZYCH)			
⏸️ Wstrzymane:	=COUNTIF(AUTORZY!Z:Z,"⏸️*")			Autor	Status	Kategoria	Data
					=QUERY(AUTORZY!A:Z,"SELECT A, I, R, V ORDER BY V DESC LIMIT 10",0)			
📊 % ukończenia:	=TEXT(COUNTIF(AUTORZY!Z:Z,"✅*")/(COUNTA(AUTORZY!Z:Z)-1),"0%")				
					
📚 ROZKŁAD KATEGORII				
					
📝 Wiersz:	=COUNTIF(AUTORZY!R:R,"*Wiersz*")			
📖 Opowieść:	=COUNTIF(AUTORZY!R:R,"*Opowieść*")			
🎭 Teatrzyk:	=COUNTIF(AUTORZY!R:R,"*Teatrzyk*")			
🧚 Bajka:	=COUNTIF(AUTORZY!R:R,"*Bajka*")			
✍️ Poezja:	=COUNTIF(AUTORZY!R:R,"*Poezja*")			
					
📊 Łącznie skategoryzowane:	=SUM(B26:B30)			
```

---

## ✅ CHECKLIST

Po skopiowaniu sprawdź:

- [ ] Wszystkie formuły działają (brak #REF!)
- [ ] Liczby się wyświetlają
- [ ] TOP 10 pokazuje autorów
- [ ] Ostatnio dodani wyświetla 10 wpisów
- [ ] Procenty są poprawne

---

## 🐛 TROUBLESHOOTING

### Problem: #REF! Error
**Rozwiązanie:** Arkusz z danymi nazywa się **AUTORZY** (nie "Dane" ani "Sheet1")

### Problem: #N/A w QUERY
**Rozwiązanie:** 
- Sprawdź czy kolumny istnieją (I, M, Z, T, Q, R, S)
- Zmień `"TAK ✅"` na `"TAK*"` jeśli nie działa

### Problem: 0 wszędzie
**Rozwiązanie:** Execute workflow w n8n - brak danych w arkuszu AUTORZY

---

## 🎯 GOTOWE!

Po wklejeniu masz **live dashboard** który automatycznie aktualizuje się gdy dodajesz autorów! 🎉

**Każdy execute workflow w n8n = automatyczny update dashboardu!** 🚀
