# 🔄 WOLNE LEKTURY WORKFLOW - ANALIZA I ULEPSZENIA

## 📋 OBECNA STRUKTURA (TWOJE KOLUMNY)

```
Autor | Rok_smierci | Tlumacz | Rok_smierci_tlumacza | Zrodlo | 
Status_AUTO | Lat_do_domeny | Ostatnie_sprawdzenie | Confidence | 
Komentarz | WL_url
```

### ❌ PROBLEMY Z OBECNĄ STRUKTURĄ:
1. **Brak Roku Urodzenia** - przydatne dla weryfikacji
2. **Confidence** - mało konkretne, co to oznacza?
3. **Status_AUTO** - nie wiadomo jak jest obliczany
4. **Brak informacji o dziełach** - ile utworów można nagrać?
5. **Brak kategoryzacji** - wiersze vs bajki vs legendy

---

## ✅ NOWA ZOPTYMALIZOWANA STRUKTURA

### **PODSTAWOWE DANE (6 kolumn)**
| Kolumna | Typ | Opis | Przykład |
|---------|-----|------|----------|
| **Autor** | Text | Imię i nazwisko | Julian Tuwim |
| **WL_slug** | Text | Slug z Wolnych Lektur | julian-tuwim |
| **WL_url** | URL | Link do profilu | https://wolnelektury.pl/autor/julian-tuwim/ |
| **Rok_urodzenia** | Number | Rok narodzin | 1894 |
| **Rok_smierci** | Number | Rok śmierci | 1953 |
| **Metoda_ekstrakcji** | Text | Skąd wzięto datę | structured_html / regex_pattern / openai / manual |

### **STATUS PRAWNY (4 kolumny - KLUCZOWE!)**
| Kolumna | Typ | Formuła/Logika | Przykład |
|---------|-----|----------------|----------|
| **Lat_od_smierci** | Calculated | `=YEAR(TODAY()) - Rok_smierci` | 72 |
| **Lat_do_domeny** | Calculated | `=70 - Lat_od_smierci` | -2 (już w domenie!) |
| **Status_prawny** | Icon + Text | ✅/❌/⚠️ + tekst | ✅ DOMENA PUBLICZNA |
| **Data_domeny_publicznej** | Date | `Rok_smierci + 70` | 2023 |

### **STATUS PRAWNY - LOGIKA:**
```javascript
if (Lat_od_smierci >= 70) {
  return "✅ DOMENA PUBLICZNA";
} else if (Tlumacz && Rok_smierci_tlumacza) {
  const latOdSmierciTlumacza = currentYear - Rok_smierci_tlumacza;
  if (latOdSmierciTlumacza < 70) {
    return "⚠️ CHRONIONE (tłumacz)";
  }
} else if (Lat_od_smierci < 70) {
  return "❌ CHRONIONE (autor)";
} else {
  return "🔍 WYMAGA WERYFIKACJI";
}
```

### **TŁUMACZENIA (3 kolumny)**
| Kolumna | Typ | Opis | Przykład |
|---------|-----|------|----------|
| **Tlumacz** | Text | Nazwisko tłumacza | - (dla polskich) |
| **Rok_smierci_tlumacza** | Number | Rok śmierci tłumacza | - |
| **Tlumaczenie_status** | Calculated | Status tłumaczenia | ✅ Oryginał polski |

### **CONTENT METADATA (5 kolumn - NOWE!)**
| Kolumna | Typ | Opis | Przykład |
|---------|-----|------|----------|
| **Liczba_utworow** | Number | Ile dzieł na WL | 47 |
| **Kategoria** | Multi-select | Rodzaj twórczości | Wiersz, Bajka, Legenda |
| **Grupa_wiekowa** | Text | Dla kogo | 2-10 lat |
| **Priorytet_nagrania** | 1-5 stars | Jak ważny | ⭐⭐⭐⭐⭐ |
| **Utwory_do_nagrania** | List | Konkretne tytuły | Lokomotywa, Słoń Trąbalski |

### **QUALITY & TRACKING (4 kolumny)**
| Kolumna | Typ | Opis | Przykład |
|---------|-----|------|----------|
| **Ostatnie_sprawdzenie** | Date | Kiedy weryfikowano | 2025-11-02 |
| **Zrodlo_danych** | Text | Skąd info | WL API (structured_html) |
| **Notatki** | Long text | Uwagi | Świetny dla 3-8 lat |
| **Status_nagrania** | Dropdown | Progress | 📝 Do nagrania |

### **STATUS NAGRANIA - OPCJE:**
- 📝 **Do nagrania** - jeszcze nie zaczęte
- 🎙️ **W trakcie** - nagrywanie trwa
- ✅ **Gotowe** - opublikowane na YouTube
- 📅 **Zaplanowane** - w harmonogramie
- ⏸️ **Wstrzymane** - problemy prawne/jakość

---

## 🎯 PORÓWNANIE: STARA vs NOWA STRUKTURA

| Aspekt | Stara (11 kolumn) | Nowa (22 kolumny) |
|--------|-------------------|-------------------|
| **Podstawowe dane** | 6 | 6 (bez zmian) |
| **Status prawny** | 2 | 4 (+ obliczenia) |
| **Content metadata** | 0 | 5 (**NOWE!**) |
| **Quality tracking** | 3 | 4 (lepsze) |
| **TOTAL** | 11 | 22 |

### **CO ZYSKUJESZ:**
1. ✅ **Automatyczne obliczanie statusu prawnego**
2. ✅ **Metadata o utworach** - ile możesz nagrać
3. ✅ **Tracking nagrań** - co już zrobione
4. ✅ **Priorytetyzacja** - co nagrać najpierw
5. ✅ **Lepsze planowanie** - grupa wiekowa + kategoria

---

## 🔧 KOD N8N - NOWY NODE "Calculate Legal Status"

```javascript
// ============================================
// NODE: Calculate Legal Status & Content Metadata
// MIEJSCE: Po "Merge AI and Non-AI", PRZED "Filter"
// ============================================

const items = $input.all();
const currentYear = new Date().getFullYear();
const results = [];

console.log(`\n=== CALCULATING LEGAL STATUS FOR ${items.length} AUTHORS ===`);

for (const item of items) {
  const autor = item.json.Autor || item.json.name || '';
  const rokSmierci = parseInt(item.json.Rok_smierci || item.json.deathYear || 0);
  const rokUrodzenia = parseInt(item.json.Rok_urodzenia || item.json.birthYear || 0);
  const tlumacz = item.json.Tlumacz || '';
  const rokSmierciTlumacza = parseInt(item.json.Rok_smierci_tlumacza || 0);
  
  // OBLICZENIA
  const latOdSmierci = rokSmierci ? currentYear - rokSmierci : null;
  const latDoDomeny = latOdSmierci !== null ? 70 - latOdSmierci : null;
  const dataDomenyPublicznej = rokSmierci ? rokSmierci + 70 : null;
  
  // STATUS PRAWNY - LOGIKA
  let statusPrawny = '🔍 WYMAGA WERYFIKACJI';
  let kolorStatus = 'gray';
  let mozliweDoNagrania = false;
  
  if (latOdSmierci === null || rokSmierci === 0) {
    statusPrawny = '❓ BRAK DANYCH O ŚMIERCI';
    kolorStatus = 'gray';
  } else if (latOdSmierci >= 70) {
    // AUTOR W DOMENIE PUBLICZNEJ
    if (tlumacz && rokSmierciTlumacza) {
      const latOdSmierciTlumacza = currentYear - rokSmierciTlumacza;
      if (latOdSmierciTlumacza >= 70) {
        statusPrawny = '✅ DOMENA PUBLICZNA (autor + tłumacz)';
        kolorStatus = 'green';
        mozliweDoNagrania = true;
      } else {
        statusPrawny = `⚠️ CHRONIONE (tłumacz - jeszcze ${70 - latOdSmierciTlumacza} lat)`;
        kolorStatus = 'orange';
      }
    } else {
      statusPrawny = '✅ DOMENA PUBLICZNA';
      kolorStatus = 'green';
      mozliweDoNagrania = true;
    }
  } else {
    statusPrawny = `❌ CHRONIONE (autor - jeszcze ${Math.abs(latDoDomeny)} lat)`;
    kolorStatus = 'red';
  }
  
  // QUALITY INDICATORS
  const metodaEkstrakcji = item.json.extractionMethod || item.json.Metoda_ekstrakcji || 'unknown';
  let confidence = 'medium';
  
  if (metodaEkstrakcji === 'structured_html') {
    confidence = 'high';
  } else if (metodaEkstrakcji === 'openai') {
    confidence = 'high';
  } else if (metodaEkstrakcji === 'regex_pattern') {
    confidence = 'medium';
  } else if (metodaEkstrakcji === 'manual') {
    confidence = 'very_high';
  } else {
    confidence = 'low';
  }
  
  // KATEGORIA (placeholder - będzie wypełnione ręcznie lub przez kolejny workflow)
  let kategoria = '';
  if (autor.toLowerCase().includes('tuwim')) {
    kategoria = 'Wiersz';
  } else if (autor.toLowerCase().includes('makuszyński')) {
    kategoria = 'Opowieść';
  } else if (autor.toLowerCase().includes('gałczyński')) {
    kategoria = 'Teatrzyk';
  }
  
  // BUILD RESULT
  const result = {
    // PODSTAWOWE DANE
    Autor: autor,
    WL_slug: item.json.slug || item.json.WL_slug || '',
    WL_url: item.json.WL_url || item.json.catalogUrl || '',
    Rok_urodzenia: rokUrodzenia || '',
    Rok_smierci: rokSmierci || '',
    Metoda_ekstrakcji: metodaEkstrakcji,
    
    // STATUS PRAWNY
    Lat_od_smierci: latOdSmierci !== null ? latOdSmierci : '',
    Lat_do_domeny: latDoDomeny !== null ? latDoDomeny : '',
    Status_prawny: statusPrawny,
    Kolor_statusu: kolorStatus,
    Data_domeny_publicznej: dataDomenyPublicznej || '',
    Mozliwe_do_nagrania: mozliweDoNagrania ? 'TAK' : 'NIE',
    
    // TŁUMACZENIA
    Tlumacz: tlumacz,
    Rok_smierci_tlumacza: rokSmierciTlumacza || '',
    Tlumaczenie_status: tlumacz ? '⚠️ Wymaga sprawdzenia tłumacza' : '✅ Oryginał polski',
    
    // CONTENT METADATA (do uzupełnienia ręcznie lub przez API)
    Liczba_utworow: '', // TODO: fetch from WL API
    Kategoria: kategoria,
    Grupa_wiekowa: '', // do uzupełnienia
    Priorytet_nagrania: '', // do uzupełnienia
    Utwory_do_nagrania: '', // do uzupełnienia
    
    // QUALITY & TRACKING
    Ostatnie_sprawdzenie: new Date().toISOString().split('T')[0],
    Zrodlo_danych: `WL API (${metodaEkstrakcji})`,
    Confidence: confidence,
    Notatki: '',
    Status_nagrania: '📝 Do nagrania',
    
    // LEGACY (zachowane dla kompatybilności)
    Zrodlo: item.json.Zrodlo || `WL API (${metodaEkstrakcji})`,
    Komentarz: item.json.Komentarz || '',
    Status_AUTO: statusPrawny // legacy field
  };
  
  console.log(`✓ ${autor}: ${statusPrawny} (${latOdSmierci} lat od śmierci)`);
  
  results.push({
    json: result
  });
}

console.log(`\n=== LEGAL STATUS CALCULATION COMPLETE ===`);
console.log(`Możliwe do nagrania: ${results.filter(r => r.json.Mozliwe_do_nagrania === 'TAK').length}/${results.length}`);
console.log(`W domenie publicznej: ${results.filter(r => r.json.Kolor_statusu === 'green').length}`);
console.log(`Chronione: ${results.filter(r => r.json.Kolor_statusu === 'red').length}`);
console.log(`Wymaga weryfikacji: ${results.filter(r => r.json.Kolor_statusu === 'gray').length}`);

return results;
```

---

## 📊 GOOGLE SHEETS - FORMATTING & CONDITIONAL FORMATTING

### **KOLORY DLA STATUS_PRAWNY:**

```
✅ DOMENA PUBLICZNA → Zielony (rgb(183, 225, 205))
❌ CHRONIONE → Czerwony (rgb(244, 199, 195))
⚠️ CHRONIONE (tłumacz) → Pomarańczowy (rgb(252, 229, 205))
🔍 WYMAGA WERYFIKACJI → Szary (rgb(224, 224, 224))
```

### **FORMUŁY GOOGLE SHEETS:**

**Lat_od_smierci (kolumna G):**
```
=IF(E2<>"", YEAR(TODAY())-E2, "")
```

**Lat_do_domeny (kolumna H):**
```
=IF(G2<>"", 70-G2, "")
```

**Data_domeny_publicznej (kolumna K):**
```
=IF(E2<>"", E2+70, "")
```

**Conditional Formatting dla Status_prawny:**
```
IF text contains "✅" → Green background
IF text contains "❌" → Red background
IF text contains "⚠️" → Orange background
IF text contains "🔍" → Gray background
```

---

## 🚀 DODATKOWE FUNKCJE DO ROZWAŻENIA

### **1. FETCH WORKS COUNT (Liczba utworów)**

**Nowy node po "Fetch Author Details":**

```javascript
// Fetch works from WL API for each author
const items = $input.all();
const results = [];

for (const item of items) {
  const catalogUrl = item.json.catalogUrl || item.json.WL_url;
  
  // WL API endpoint for author's works
  const worksUrl = catalogUrl.replace('/autor/', '/api/authors/') + '/';
  
  try {
    const response = await fetch(worksUrl);
    const data = await response.json();
    
    const worksCount = data.books ? data.books.length : 0;
    const worksList = data.books ? data.books.map(b => b.title).join(', ') : '';
    
    results.push({
      json: {
        ...item.json,
        Liczba_utworow: worksCount,
        Lista_utworow: worksList
      }
    });
  } catch (error) {
    console.error(`Error fetching works for ${item.json.Autor}:`, error);
    results.push({
      json: {
        ...item.json,
        Liczba_utworow: '',
        Lista_utworow: ''
      }
    });
  }
}

return results;
```

### **2. SMART CATEGORIZATION (AI)**

**Opcjonalny node z OpenAI:**

```javascript
// Classify author based on their works
Prompt: "Kategoryzuj polskiego autora: ${autor}. 
Wybierz TYLKO jedną z kategorii: Wiersz, Bajka, Opowieść, Legenda, Teatrzyk, Inne.
Odpowiedz jednym słowem."
```

### **3. AGE GROUP RECOMMENDATION**

**Logika oparta na kategorii:**

```javascript
const categoryToAgeGroup = {
  'Wiersz': '2-8 lat',
  'Bajka': '3-10 lat',
  'Opowieść': '6-12 lat',
  'Legenda': '5-12 lat',
  'Teatrzyk': '4-9 lat'
};

grupaWiekowa = categoryToAgeGroup[kategoria] || 'Do określenia';
```

### **4. PRIORITY SCORING (Automatyczny priorytet)**

**Formuła priorytetu:**

```javascript
let priorityScore = 0;

// Więcej utworów = wyższy priorytet
if (liczbaUtworow > 20) priorityScore += 2;
else if (liczbaUtworow > 10) priorityScore += 1;

// Domena publiczna = wyższy priorytet
if (statusPrawny.includes('DOMENA PUBLICZNA')) priorityScore += 2;

// Znani autorzy = bonus
const famousAuthors = ['tuwim', 'makuszyński', 'brzechwa', 'gałczyński'];
if (famousAuthors.some(a => autor.toLowerCase().includes(a))) {
  priorityScore += 1;
}

// Convert to stars
const stars = Math.min(priorityScore, 5);
priorytetNagrania = '⭐'.repeat(stars);
```

---

## 📈 INTEGRACJA Z PROJEKTEM BAJEK

### **NOWE KOLUMNY DLA CONTENT PLANNING:**

| Kolumna | Opis | Przykład |
|---------|------|----------|
| **Dzien_tygodnia** | Kiedy publikować | Poniedziałek (Tuwim) |
| **Czas_trwania** | Długość nagrania | 3-5 min |
| **Difficulty** | Trudność nagrania | Łatwa / Średnia / Trudna |
| **YouTube_tags** | SEO tags | #tuwim #bajkidladzieci #polskiebajki |
| **Miniaturka_template** | Jaki szablon | tuwim_wiersz.png |

### **WORKFLOW INTEGRATION:**

```
1. Import z WL → 
2. Calculate Legal Status → 
3. Fetch Works Count → 
4. AI Categorization → 
5. Priority Scoring → 
6. Upsert to Google Sheet → 
7. NOWY: Create Content Plan →
8. NOWY: Generate YouTube Metadata →
9. NOWY: Schedule Publication
```

---

## ⚡ QUICK WINS - CO ZROBIĆ NAJPIERW

### **FAZA 1: MINIMUM VIABLE (30 min)**
1. ✅ Dodaj node "Calculate Legal Status" z kodem powyżej
2. ✅ Zaktualizuj kolumny w Google Sheet
3. ✅ Uruchom workflow dla 10 autorów (test)

### **FAZA 2: ENHANCED (1-2h)**
4. ✅ Dodaj Fetch Works Count
5. ✅ Setup conditional formatting w Sheets
6. ✅ Pełny import (page_size=500)

### **FAZA 3: ADVANCED (2-4h)**
7. ✅ AI Categorization
8. ✅ Priority Scoring
9. ✅ Integration z harmonogramem publikacji

---

## 🎯 KOŃCOWY REZULTAT

**Z tej struktury będziesz mógł:**

1. ✅ **Natychmiast zobaczyć** kto jest w domenie publicznej
2. ✅ **Zaplanować nagrania** na podstawie priorytetów
3. ✅ **Trackować progress** - co już nagrałeś
4. ✅ **Unikać problemów prawnych** - jasny status
5. ✅ **Skalować produkcję** - automatyczny pipeline

**PRZYKŁADOWY WIERSZ:**

```
Autor: Julian Tuwim
Status_prawny: ✅ DOMENA PUBLICZNA
Lat_od_smierci: 72
Liczba_utworow: 47
Kategoria: Wiersz
Grupa_wiekowa: 3-8 lat
Priorytet_nagrania: ⭐⭐⭐⭐⭐
Status_nagrania: ✅ Gotowe (15 utworów)
```

---

## 💡 BONUS: DASHBOARD W GOOGLE SHEETS

**Stwórz osobny arkusz "DASHBOARD" z podsumowaniem:**

```
📊 STATYSTYKI AUTORÓW

Łącznie autorów: =COUNTA(Dane!A:A)-1
W domenie publicznej: =COUNTIF(Dane!I:I,"✅*")
Chronione: =COUNTIF(Dane!I:I,"❌*")
Do weryfikacji: =COUNTIF(Dane!I:I,"🔍*")

📝 STATUS NAGRAŃ

Do nagrania: =COUNTIF(Dane!V:V,"📝*")
W trakcie: =COUNTIF(Dane!V:V,"🎙️*")
Gotowe: =COUNTIF(Dane!V:V,"✅*")

⭐ TOP PRIORYTETY

[Tabela z top 10 autorów posortowanych po priorytecie]
```

---

## 🚀 READY TO IMPLEMENT?

Chcesz żebym:
1. **Zaktualizował cały workflow n8n** z nowymi node'ami?
2. **Stworzył gotowy template Google Sheets** z formułami?
3. **Dodał advanced features** (AI, scheduling)?

Powiedz tylko co chcesz najpierw! 🎯
