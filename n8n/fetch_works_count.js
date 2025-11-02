// ============================================
// N8N NODE: Fetch Works Count from Wolne Lektury API
// WSTAW PO: "Calculate Legal Status"
// PRZED: "Upsert to Google Sheet"
// ============================================
// UWAGA: Ten node działa TYLKO dla autorów którzy są możliwi do nagrania
// Oszczędza API calls dla autorów chronionych
// ============================================

const items = $input.all();
const results = [];

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`📚 FETCHING WORKS COUNT FROM WL API`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

// Counter dla statystyk
let successCount = 0;
let errorCount = 0;
let skippedCount = 0;

for (const item of items) {
  const autor = item.json.Autor || '';
  const slug = item.json.WL_slug || '';
  const url = item.json.WL_url || '';
  const mozliweDoNagrania = item.json.Mozliwe_do_nagrania;
  
  // SKIP jeśli nie można nagrać (oszczędzamy API calls)
  if (mozliweDoNagrania !== 'TAK ✅') {
    console.log(`⏭️ SKIP: ${autor.padEnd(30)} | Nie można nagrać`);
    skippedCount++;
    
    results.push({
      json: {
        ...item.json,
        Liczba_utworow: '',
        Lista_utworow: '',
        Utwory_API_status: 'Pominięto (chronione)'
      }
    });
    continue;
  }
  
  // BUILD API URL
  // WL API format: https://wolnelektury.pl/api/authors/julian-tuwim/
  let apiUrl = '';
  
  if (slug) {
    apiUrl = `https://wolnelektury.pl/api/authors/${slug}/`;
  } else if (url) {
    // Convert profile URL to API URL
    apiUrl = url.replace('/autor/', '/api/authors/') + '/';
  } else {
    console.log(`⚠️ WARN: ${autor.padEnd(30)} | Brak slug/URL`);
    results.push({
      json: {
        ...item.json,
        Liczba_utworow: '',
        Lista_utworow: '',
        Utwory_API_status: 'Brak URL'
      }
    });
    errorCount++;
    continue;
  }
  
  // FETCH FROM API
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // EXTRACT WORKS
    const books = data.books || [];
    const worksCount = books.length;
    
    // Build lista utworów (pierwsze 5 + ...)
    let worksList = '';
    if (worksCount > 0) {
      const first5 = books.slice(0, 5).map(b => b.title).join(', ');
      worksList = worksCount > 5 
        ? `${first5} ... i ${worksCount - 5} więcej`
        : first5;
    }
    
    // PRIORYTET BOOST na podstawie liczby utworów
    let priorytetBonus = '';
    if (worksCount > 30) {
      priorytetBonus = ' (⭐ BARDZO PRODUKTYWNY!)';
    } else if (worksCount > 15) {
      priorytetBonus = ' (⭐ Dużo utworów)';
    } else if (worksCount < 3) {
      priorytetBonus = ' (⚠️ Mało utworów)';
    }
    
    console.log(`✅ ${autor.padEnd(30)} | ${worksCount} utworów${priorytetBonus}`);
    successCount++;
    
    results.push({
      json: {
        ...item.json,
        Liczba_utworow: worksCount,
        Lista_utworow: worksList,
        Utwory_API_status: 'Pobrano z WL API'
      }
    });
    
  } catch (error) {
    console.log(`❌ ERROR: ${autor.padEnd(30)} | ${error.message}`);
    errorCount++;
    
    results.push({
      json: {
        ...item.json,
        Liczba_utworow: '',
        Lista_utworow: '',
        Utwory_API_status: `Błąd API: ${error.message}`
      }
    });
  }
  
  // Rate limiting - czekaj 100ms między requestami
  await new Promise(resolve => setTimeout(resolve, 100));
}

// ========================================
// PODSUMOWANIE
// ========================================
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ WORKS COUNT FETCH COMPLETE`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`📊 Łącznie:          ${results.length} autorów`);
console.log(`✅ Sukces:           ${successCount}`);
console.log(`⏭️ Pominięto:        ${skippedCount} (chronione)`);
console.log(`❌ Błędy:            ${errorCount}`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

return results;
