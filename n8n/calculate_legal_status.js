// ============================================
// N8N NODE: Calculate Legal Status & Enhanced Metadata
// WSTAW PO: "Merge AI and Non-AI"
// PRZED: "Filter Public Domain"
// ============================================

const items = $input.all();
const currentYear = new Date().getFullYear();
const results = [];

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`📊 CALCULATING LEGAL STATUS FOR ${items.length} AUTHORS`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

let domenaPubliczna = 0;
let chronione = 0;
let wymagaWeryfikacji = 0;

for (const item of items) {
  // EXTRACT DATA
  const autor = item.json.Autor || item.json.name || '';
  const rokSmierci = parseInt(item.json.Rok_smierci || item.json.deathYear || 0);
  const rokUrodzenia = parseInt(item.json.Rok_urodzenia || item.json.birthYear || 0);
  const tlumacz = item.json.Tlumacz || '';
  const rokSmierciTlumacza = parseInt(item.json.Rok_smierci_tlumacza || 0);
  const slug = item.json.slug || item.json.WL_slug || '';
  const url = item.json.WL_url || item.json.catalogUrl || item.json.url || '';
  
  // ========================================
  // OBLICZENIA PODSTAWOWE
  // ========================================
  const latOdSmierci = rokSmierci ? currentYear - rokSmierci : null;
  const latDoDomeny = latOdSmierci !== null ? 70 - latOdSmierci : null;
  const dataDomenyPublicznej = rokSmierci ? rokSmierci + 70 : null;
  
  // ========================================
  // STATUS PRAWNY - GŁÓWNA LOGIKA
  // ========================================
  let statusPrawny = '🔍 WYMAGA WERYFIKACJI';
  let kolorStatus = 'gray';
  let mozliweDoNagrania = false;
  let szczegoly = '';
  
  if (latOdSmierci === null || rokSmierci === 0) {
    // BRAK DANYCH
    statusPrawny = '❓ BRAK DANYCH O ŚMIERCI';
    kolorStatus = 'gray';
    szczegoly = 'Nie udało się ustalić roku śmierci autora';
    wymagaWeryfikacji++;
    
  } else if (latOdSmierci >= 70) {
    // AUTOR W DOMENIE PUBLICZNEJ
    
    if (tlumacz && rokSmierciTlumacza) {
      // MA TŁUMACZA - sprawdź obie daty
      const latOdSmierciTlumacza = currentYear - rokSmierciTlumacza;
      
      if (latOdSmierciTlumacza >= 70) {
        statusPrawny = '✅ DOMENA PUBLICZNA';
        kolorStatus = 'green';
        mozliweDoNagrania = true;
        szczegoly = `Autor: ${latOdSmierci} lat, Tłumacz: ${latOdSmierciTlumacza} lat - OBA w domenie`;
        domenaPubliczna++;
      } else {
        const zostaloLatTlumacz = 70 - latOdSmierciTlumacza;
        statusPrawny = `⚠️ CHRONIONE (tłumacz)`;
        kolorStatus = 'orange';
        szczegoly = `Autor w domenie, ale tłumacz chroniony jeszcze ${zostaloLatTlumacz} lat (do ${rokSmierciTlumacza + 70})`;
        chronione++;
      }
    } else if (tlumacz && !rokSmierciTlumacza) {
      // JEST TŁUMACZ ALE NIE ZNAMY DATY
      statusPrawny = '⚠️ WYMAGA SPRAWDZENIA TŁUMACZA';
      kolorStatus = 'orange';
      szczegoly = `Autor w domenie (${latOdSmierci} lat), ale tłumacz: ${tlumacz} - wymaga weryfikacji`;
      wymagaWeryfikacji++;
    } else {
      // ORYGINAŁ POLSKI - JASNA DOMENA PUBLICZNA
      statusPrawny = '✅ DOMENA PUBLICZNA';
      kolorStatus = 'green';
      mozliweDoNagrania = true;
      szczegoly = `Minęło ${latOdSmierci} lat od śmierci - oryginał polski`;
      domenaPubliczna++;
    }
    
  } else {
    // AUTOR CHRONIONY
    const zostaloLat = Math.abs(latDoDomeny);
    const rokDomeny = dataDomenyPublicznej;
    statusPrawny = `❌ CHRONIONE (autor)`;
    kolorStatus = 'red';
    szczegoly = `Minęło ${latOdSmierci} lat, brakuje jeszcze ${zostaloLat} lat (do roku ${rokDomeny})`;
    chronione++;
  }
  
  // ========================================
  // QUALITY & CONFIDENCE
  // ========================================
  const metodaEkstrakcji = item.json.extractionMethod || item.json.Metoda_ekstrakcji || 'unknown';
  let confidence = 'medium';
  let confidencePercent = 50;
  
  if (metodaEkstrakcji === 'structured_html') {
    confidence = 'very_high';
    confidencePercent = 95;
  } else if (metodaEkstrakcji === 'openai') {
    confidence = 'high';
    confidencePercent = 85;
  } else if (metodaEkstrakcji === 'regex_pattern') {
    confidence = 'medium';
    confidencePercent = 70;
  } else if (metodaEkstrakcji === 'manual') {
    confidence = 'very_high';
    confidencePercent = 100;
  } else {
    confidence = 'low';
    confidencePercent = 30;
  }
  
  // ========================================
  // KATEGORIA (SMART DETECTION)
  // ========================================
  let kategoria = '';
  let kategoriaIcon = '';
  const autorLower = autor.toLowerCase();
  
  if (autorLower.includes('tuwim')) {
    kategoria = 'Wiersz';
    kategoriaIcon = '📝';
  } else if (autorLower.includes('makuszyński')) {
    kategoria = 'Opowieść';
    kategoriaIcon = '📖';
  } else if (autorLower.includes('gałczyński')) {
    kategoria = 'Teatrzyk';
    kategoriaIcon = '🎭';
  } else if (autorLower.includes('brzechwa')) {
    kategoria = 'Wiersz';
    kategoriaIcon = '📝';
  } else if (autorLower.includes('konopnicka')) {
    kategoria = 'Bajka';
    kategoriaIcon = '🧚';
  } else if (autorLower.includes('mickiewicz') || autorLower.includes('słowacki')) {
    kategoria = 'Poezja';
    kategoriaIcon = '✍️';
  } else {
    // będzie wypełnione ręcznie
    kategoria = '';
    kategoriaIcon = '';
  }
  
  // ========================================
  // GRUPA WIEKOWA (na podstawie kategorii)
  // ========================================
  const categoryToAgeGroup = {
    'Wiersz': '2-8 lat',
    'Bajka': '3-10 lat',
    'Opowieść': '6-12 lat',
    'Legenda': '5-12 lat',
    'Teatrzyk': '4-9 lat',
    'Poezja': '8-12 lat'
  };
  
  const grupaWiekowa = categoryToAgeGroup[kategoria] || '';
  
  // ========================================
  // PRIORYTET (AUTO-SCORING)
  // ========================================
  let priorityScore = 0;
  
  // Domena publiczna = automatycznie +2 gwiazdki
  if (mozliweDoNagrania) {
    priorityScore += 2;
  }
  
  // Znani autorzy = +1 gwiazdka
  const famousAuthors = ['tuwim', 'makuszyński', 'brzechwa', 'gałczyński', 'konopnicka', 'krasicki', 'jachowicz'];
  if (famousAuthors.some(a => autorLower.includes(a))) {
    priorityScore += 1;
  }
  
  // Dla dzieci (kategoria) = +1 gwiazdka
  if (['Wiersz', 'Bajka', 'Teatrzyk'].includes(kategoria)) {
    priorityScore += 1;
  }
  
  const stars = Math.min(priorityScore, 5);
  const priorytetNagrania = stars > 0 ? '⭐'.repeat(stars) : '';
  
  // ========================================
  // BUILD ENHANCED RESULT
  // ========================================
  const result = {
    // ════════════════════════════════════
    // PODSTAWOWE DANE (6 kolumn)
    // ════════════════════════════════════
    Autor: autor,
    WL_slug: slug,
    WL_url: url,
    Rok_urodzenia: rokUrodzenia || '',
    Rok_smierci: rokSmierci || '',
    Metoda_ekstrakcji: metodaEkstrakcji,
    
    // ════════════════════════════════════
    // STATUS PRAWNY (6 kolumn) ⭐ GŁÓWNE
    // ════════════════════════════════════
    Lat_od_smierci: latOdSmierci !== null ? latOdSmierci : '',
    Lat_do_domeny: latDoDomeny !== null ? latDoDomeny : '',
    Status_prawny: statusPrawny,
    Status_kolor: kolorStatus,
    Status_szczegoly: szczegoly,
    Data_domeny_publicznej: dataDomenyPublicznej || '',
    Mozliwe_do_nagrania: mozliweDoNagrania ? 'TAK ✅' : 'NIE ❌',
    
    // ════════════════════════════════════
    // TŁUMACZENIA (3 kolumny)
    // ════════════════════════════════════
    Tlumacz: tlumacz,
    Rok_smierci_tlumacza: rokSmierciTlumacza || '',
    Tlumaczenie_status: tlumacz 
      ? (rokSmierciTlumacza ? `Tłumacz: ${rokSmierciTlumacza}` : '⚠️ Wymaga sprawdzenia') 
      : '✅ Oryginał polski',
    
    // ════════════════════════════════════
    // CONTENT METADATA (5 kolumn) ⭐ NOWE
    // ════════════════════════════════════
    Liczba_utworow: '', // TODO: będzie z kolejnego node'a
    Kategoria: kategoria ? `${kategoriaIcon} ${kategoria}` : '',
    Grupa_wiekowa: grupaWiekowa,
    Priorytet_nagrania: priorytetNagrania,
    Utwory_do_nagrania: '', // do ręcznego wypełnienia
    
    // ════════════════════════════════════
    // QUALITY & TRACKING (5 kolumn)
    // ════════════════════════════════════
    Ostatnie_sprawdzenie: new Date().toISOString().split('T')[0],
    Zrodlo_danych: `WL API (${metodaEkstrakcji})`,
    Confidence: `${confidence} (${confidencePercent}%)`,
    Notatki: '',
    Status_nagrania: mozliweDoNagrania ? '📝 Do nagrania' : '⏸️ Wstrzymane (prawnie)',
    
    // ════════════════════════════════════
    // LEGACY FIELDS (dla kompatybilności)
    // ════════════════════════════════════
    Zrodlo: `WL API (${metodaEkstrakcji})`,
    Komentarz: szczegoly,
    Status_AUTO: statusPrawny
  };
  
  // LOG PROGRESS
  const icon = mozliweDoNagrania ? '✅' : (kolorStatus === 'red' ? '❌' : '⚠️');
  console.log(`${icon} ${autor.padEnd(30)} | ${statusPrawny.padEnd(35)} | ${latOdSmierci !== null ? latOdSmierci + ' lat' : 'brak danych'}`);
  
  results.push({
    json: result
  });
}

// ========================================
// PODSUMOWANIE
// ========================================
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ LEGAL STATUS CALCULATION COMPLETE`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`📊 Łącznie przetworzono:     ${results.length} autorów`);
console.log(`✅ Domena publiczna:         ${domenaPubliczna} (${Math.round(domenaPubliczna/results.length*100)}%)`);
console.log(`❌ Chronione:                ${chronione} (${Math.round(chronione/results.length*100)}%)`);
console.log(`⚠️ Wymaga weryfikacji:       ${wymagaWeryfikacji} (${Math.round(wymagaWeryfikacji/results.length*100)}%)`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

return results;
