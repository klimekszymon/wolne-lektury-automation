# 🎯 Examples - Workflows & Configurations

Ten folder zawiera przykładowe workflows i konfiguracje gotowe do użycia.

---

## 📄 Pliki

### **[WL_Bulk_Importer_ORIGINAL.json](WL_Bulk_Importer_ORIGINAL.json)**
- Oryginalny workflow n8n (wersja przed upgradami)
- Podstawowa funkcjonalność:
  - Fetch authors z WL API
  - Extract death year (regex)
  - AI fallback (OpenAI)
  - Merge results
  - Filter 70+ years
  - Upsert do Google Sheet

**Użyj tego jako:**
- Reference dla oryginalnego workflow
- Backup przed zmianami
- Porównanie PRZED/PO upgradem

---

## 🚀 Jak Zaimportować Workflow

### KROK 1: Import do n8n

**Web Interface:**
```bash
1. Otwórz n8n (http://localhost:5678 lub cloud)
2. Kliknij "+" → "Import from File"
3. Wybierz WL_Bulk_Importer_ORIGINAL.json
4. ✅ Workflow zaimportowany!
```

**n8n Desktop:**
```bash
1. Workflows → Import
2. Upload file → Wybierz JSON
3. Gotowe!
```

### KROK 2: Konfiguracja Credentials

**Google Sheets:**
```bash
1. W workflow: kliknij node "Upsert to Google Sheet"
2. Credentials → Create New
3. Service Account:
   - Email: your-service-account@project.iam.gserviceaccount.com
   - Private Key: [Wklej z .json file]
4. Test connection
5. Save
```

**OpenAI (opcjonalnie):**
```bash
1. Kliknij node "AI: Extract Death Year"
2. Credentials → Create New
3. API Key: sk-...
4. Save
```

### KROK 3: Dostosuj Workflow

**Parametry do zmiany:**

**Node "Fetch WL Authors List":**
```json
{
  "queryParameters": {
    "page_size": "10"  // Zmień na 500 dla full import
  }
}
```

**Node "Upsert to Google Sheet":**
```json
{
  "documentId": "YOUR_SHEET_ID_HERE",  // ZMIEŃ!
  "sheetName": "Dane"
}
```

### KROK 4: Dodaj Nowe Nodes (UPGRADE)

**Po "Merge AI and Non-AI" dodaj:**

1. **Code Node: "Calculate Legal Status"**
   - Skopiuj kod z `/n8n/calculate_legal_status.js`
   - To doda wszystkie nowe kolumny (status prawny, kategoria, etc.)

2. **Code Node: "Fetch Works Count"** (opcjonalny)
   - Skopiuj kod z `/n8n/fetch_works_count.js`
   - To doda liczbę utworów z WL API

**Przepływ po upgrade:**
```
Merge AI → Calculate Legal Status → Fetch Works → Upsert → Summary
```

---

## 📊 Workflow Overview

### Nodes w Oryginalnym Workflow:

```
1. Manual Trigger
   ↓
2. Fetch WL Authors List (HTTP Request)
   ↓
3. Parse Authors List (Code)
   ↓
4. Fetch Author Details (HTTP Request - loop)
   ↓
5. Extract Death Year (Code - regex)
   ↓
6. Route: Needs AI? (IF)
   ├─ YES → AI: Extract Death Year (OpenAI)
   │         ↓
   │      Parse AI Response (Code)
   │         ↓
   └─ NO ──┬─ Merge AI and Non-AI (Merge)
            ↓
         Filter Public Domain (IF - 70+ years)
            ↓
         Upsert to Google Sheet (Google Sheets)
            ↓
         Build Summary (Code)
```

### Czas Wykonania:
- **10 autorów**: ~30 sekund
- **100 autorów**: ~5 minut
- **500 autorów**: ~15-20 minut

### API Calls:
- **WL API**: 1 + N (1 lista + N szczegółów)
- **OpenAI**: tylko dla niejasnych przypadków (~20%)
- **Google Sheets**: 1 (batch upsert)

---

## 🆙 Upgrade Path

### From Original → Enhanced:

**Co dodaje upgrade (2 nowe nodes):**

1. ✅ **Calculate Legal Status**
   - Status prawny z emoji (✅/❌/⚠️)
   - Auto-kategoryzacja (Wiersz/Bajka)
   - Priority scoring (⭐⭐⭐⭐⭐)
   - Grupa wiekowa
   - 20 nowych kolumn!

2. ✅ **Fetch Works Count**
   - Liczba utworów z WL API
   - Lista utworów (first 5)
   - Priority boost

**Wynik:**
- Z 11 kolumn → 26 kolumn
- Z ręcznego statusu → Automatic clear status
- Z guesswork → Data-driven priorities

---

## 🎯 Test Workflow

### Quick Test (5 minut):

```bash
1. Import workflow
2. Setup credentials
3. Zmień page_size=5 (tylko 5 autorów)
4. Execute workflow
5. Sprawdź Google Sheet:
   - Powinno być 5 wierszy
   - Status_prawny wypełniony
   - Kategoria automatyczna
6. ✅ Działa!
```

### Full Import:

```bash
1. Backup Google Sheet (na wszelki wypadek)
2. Zmień page_size=500
3. Execute workflow
4. Poczekaj 15-20 minut ☕
5. Sprawdź Sheet: 200+ autorów w domenie publicznej!
6. 🎉 Success!
```

---

## 🔧 Troubleshooting

### "Credentials error"
**Problem**: n8n nie może połączyć się z Google Sheets
**Rozwiązanie:**
- Sprawdź service account email
- Upewnij się że Sheet jest udostępniony
- Test connection w credentials

### "OpenAI timeout"
**Problem**: AI node trwa zbyt długo
**Rozwiązanie:**
- Zwiększ timeout (Settings → 30 seconds)
- Lub wyłącz AI node (opcjonalny)

### "No data in Sheet"
**Problem**: Workflow się wykonał, ale Sheet pusty
**Rozwiązanie:**
- Sprawdź Sheet ID
- Sprawdź nazwę arkusza ("Dane" vs "Sheet1")
- Verify filter node (może wszystko odfiltrowało)

---

## 📈 Performance Tips

### Dla Większej Wydajności:

**1. Batch Processing**
```bash
Zamiast 500 na raz:
- 100 autorów × 5 razy
- Mniej risk timeoutu
- Łatwiejszy monitoring
```

**2. Skip AI Node**
```bash
Jeśli masz dobre regex:
- Disconnect AI path
- 80% autorów i tak przez regex
- Saves OpenAI credits
```

**3. Parallel Execution**
```bash
n8n Settings:
- Max parallel: 5
- Timeout: 60s
- Przyspiesza fetch details
```

---

## 💡 Customization Ideas

### Możesz dodać:

**1. Email Notifications**
```bash
Node: Send Email
Trigger: Po zakończeniu workflow
Content: Summary + link do Sheet
```

**2. Slack Integration**
```bash
Node: Slack
Message: "✅ Import complete! 197 autorów ready!"
Channel: #automations
```

**3. Scheduled Refresh**
```bash
Trigger: Cron (zamiast Manual)
Schedule: Co niedzielę 00:00
Auto-update: Nowi autorzy co tydzień
```

**4. Error Monitoring**
```bash
Node: Error Trigger
Action: Log to file / Send alert
Helps: Debug production issues
```

---

## 📚 Więcej Przykładów

### W przyszłości dodamy:

- [ ] Advanced filtering workflows
- [ ] YouTube metadata generator
- [ ] Multi-platform export (JSON, XML)
- [ ] Analytics dashboard generator
- [ ] Auto-backup workflows

**Wkład mile widziany!** 🙏

---

## 🚀 Ready to Automate!

Po zaimportowaniu workflow masz:
- ✅ Proven automation (tested on 500+ authors)
- ✅ Easy upgrade path (add 2 nodes = huge upgrade)
- ✅ Professional setup ready for production
- ✅ Extensible (add your own nodes!)

**Next steps:**
1. Import workflow
2. Setup credentials
3. Test na 5 autorach
4. Full import 500 autorów
5. **Celebrate!** 🎉

---

**Questions?** Check [Quick Start Guide](../docs/QUICK_START.md)
