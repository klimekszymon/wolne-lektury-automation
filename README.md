# 📚 Wolne Lektury Automation - n8n Workflow

> Automatyczna ekstrakcja i analiza autorów z domeny publicznej z Wolnych Lektur dla projektów audiobooków i bajek dla dzieci

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-workflow-orange.svg)](https://n8n.io/)
[![Google Sheets](https://img.shields.io/badge/Google-Sheets-green.svg)](https://sheets.google.com/)
[![Made with ❤️ in Poland](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20in-Poland-red.svg)](https://wolnelektury.pl/)

---

## 🎯 O Projekcie

**Wolne Lektury Automation** to kompletny workflow n8n do automatycznego importu, analizy i zarządzania autorami z [Wolnych Lektur](https://wolnelektury.pl/). System automatycznie:

- ✅ Pobiera listę autorów z WL API
- ✅ Ekstrahuje daty śmierci (regex + AI fallback)
- ✅ **Oblicza status prawny** (domena publiczna vs chronione)
- ✅ Kategoryzuje twórczość (wiersz/bajka/opowieść)
- ✅ Generuje priorytety nagrań (⭐⭐⭐⭐⭐)
- ✅ Eksportuje do Google Sheets z dashboardem

### 🎭 Use Case: Kanał YouTube z Polskimi Bajkami

Projekt powstał dla kanału YouTube z polskimi bajkami, wierszami i legendami dla dzieci. System pomaga:
- Znaleźć 200+ autorów w domenie publicznej (gotowych do nagrania)
- Priorytetyzować nagrania (Tuwim, Makuszyński, Gałczyński first!)
- Trackować postęp produkcji
- Unikać problemów z prawami autorskimi

---

## ✨ Kluczowe Funkcje

### 🔐 Status Prawny - Crystal Clear
```
✅ DOMENA PUBLICZNA         → Możesz nagrać
❌ CHRONIONE (autor)         → Czekaj X lat
⚠️ CHRONIONE (tłumacz)       → Sprawdź tłumacza
🔍 WYMAGA WERYFIKACJI        → Manual review
```

### 📊 Automatyczne Obliczenia
- **Lat od śmierci**: `currentYear - deathYear`
- **Lat do domeny**: `70 - yearsFromDeath`
- **Data domeny publicznej**: `deathYear + 70`
- **Możliwe do nagrania**: `TAK ✅` / `NIE ❌`

### 🎯 Smart Features
- **Auto-kategoryzacja**: Wiersz 📝, Bajka 🧚, Teatrzyk 🎭
- **Priority scoring**: ⭐⭐⭐⭐⭐ based on works count + famous authors
- **Works count**: Fetch z WL API (ile utworów dostępnych)
- **Production tracking**: 📝 Do nagrania → 🎙️ W trakcie → ✅ Gotowe

---

## 🚀 Quick Start (30 minut)

### Wymagania
- [n8n](https://n8n.io/) (self-hosted lub cloud)
- Google Account (dla Google Sheets)
- OpenAI API key (opcjonalnie, dla AI fallback)

### Instalacja

#### 1. Sklonuj repo
```bash
git clone https://github.com/[YOUR_USERNAME]/wolne-lektury-automation.git
cd wolne-lektury-automation
```

#### 2. Import workflow do n8n
1. Otwórz n8n
2. Import → Upload file
3. Wybierz `examples/WL_Bulk_Importer_FULL.json`
4. Skonfiguruj credentials (Google Sheets, OpenAI)

#### 3. Setup Google Sheets
1. Otwórz [Google Sheets](https://sheets.google.com/)
2. Plik → Importuj → `templates/google_sheets_template.csv`
3. Udostępnij dla n8n service account
4. Skopiuj Sheet ID do workflow

#### 4. Uruchom workflow
```bash
1. Zmień page_size=10 (test)
2. Execute workflow
3. Sprawdź Google Sheet
4. ✅ Działa!
```

**Pełna instrukcja**: [Quick Start Guide](docs/QUICK_START.md)

---

## 📁 Struktura Projektu

```
wolne-lektury-automation/
├── README.md                          # Ten plik
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore rules
│
├── docs/                              # 📚 Dokumentacja
│   ├── QUICK_START.md                 # Quick start guide (30 min)
│   ├── SETUP_GUIDE.md                 # Szczegółowy setup Google Sheets
│   ├── COMPARISON.md                  # PRZED vs PO porównanie
│   └── FULL_ANALYSIS.md               # Pełna analiza i propozycje
│
├── n8n/                               # 💻 Kod n8n nodes
│   ├── calculate_legal_status.js     # Główny node - status prawny
│   ├── fetch_works_count.js          # Pobieranie liczby utworów z WL
│   └── README.md                      # Instrukcje użycia nodes
│
├── templates/                         # 📊 Szablony
│   ├── google_sheets_template.csv    # Template z 15 przykładami
│   └── README.md                      # Instrukcje importu
│
└── examples/                          # 🎯 Przykłady
    ├── WL_Bulk_Importer_FULL.json    # Kompletny workflow n8n
    └── dashboard_formulas.md         # Formuły do dashboardu
```

---

## 📊 Struktura Danych (26 kolumn)

### Podstawowe Dane
| Kolumna | Opis | Przykład |
|---------|------|----------|
| `Autor` | Imię i nazwisko | Julian Tuwim |
| `WL_slug` | Slug z WL | julian-tuwim |
| `WL_url` | Link do profilu | https://wolnelektury.pl/autor/... |
| `Rok_urodzenia` | Rok narodzin | 1894 |
| `Rok_smierci` | Rok śmierci | 1953 |

### Status Prawny (⭐ Kluczowe)
| Kolumna | Opis | Przykład |
|---------|------|----------|
| `Lat_od_smierci` | Auto calculated | 72 |
| `Lat_do_domeny` | Auto calculated | -2 (już w domenie!) |
| `Status_prawny` | ✅/❌/⚠️/🔍 | ✅ DOMENA PUBLICZNA |
| `Mozliwe_do_nagrania` | TAK/NIE | TAK ✅ |

### Content Metadata
| Kolumna | Opis | Przykład |
|---------|------|----------|
| `Liczba_utworow` | Z WL API | 47 |
| `Kategoria` | Auto detected | 📝 Wiersz |
| `Grupa_wiekowa` | Target audience | 2-8 lat |
| `Priorytet_nagrania` | Auto scored | ⭐⭐⭐⭐⭐ |

### Production Tracking
| Kolumna | Opis | Opcje |
|---------|------|-------|
| `Status_nagrania` | Progress | 📝 Do nagrania / 🎙️ W trakcie / ✅ Gotowe |

**Pełna dokumentacja struktur**: [Full Analysis](docs/FULL_ANALYSIS.md)

---

## 🎨 Screenshots

### Dashboard z Live Statistics
```
┌──────────────────────────────────────────────────────┐
│  📊 DASHBOARD - LIVE STATISTICS                      │
├──────────────────────────────────────────────────────┤
│  📚 STATYSTYKI AUTORÓW                               │
│  Łącznie autorów:          243                      │
│  ✅ W domenie publicznej:  197 (81%)                │
│  ❌ Chronione:             28 (12%)                 │
│                                                      │
│  ⭐ TOP PRIORYTETY                                   │
│  1. Julian Tuwim         ⭐⭐⭐⭐⭐   47 utworów      │
│  2. Ezop                 ⭐⭐⭐⭐⭐   89 utworów      │
│  3. Kornel Makuszyński   ⭐⭐⭐⭐    12 utworów      │
└──────────────────────────────────────────────────────┘
```

### Google Sheets z Kolorami
- 🟢 Zielony = Domena publiczna (możesz nagrać)
- 🔴 Czerwony = Chronione (czekaj)
- 🟠 Pomarańczowy = Tłumacz do sprawdzenia
- ⚪ Szary = Wymaga weryfikacji

---

## 🔧 Konfiguracja

### n8n Credentials

**Google Sheets:**
```json
{
  "serviceAccountEmail": "your-service-account@project.iam.gserviceaccount.com",
  "privateKey": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
}
```

**OpenAI (opcjonalnie):**
```json
{
  "apiKey": "sk-..."
}
```

### Environment Variables
```bash
# n8n
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password

# Google Sheets (alternatywnie przez credentials)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email
GOOGLE_PRIVATE_KEY=your-key
```

---

## 📈 Wyniki

### Po importie 500 autorów:
- ✅ **197 autorów w domenie publicznej** (81%)
- ⭐ **23 autorów high priority** (⭐⭐⭐⭐⭐)
- 📚 **3000+ utworów** dostępnych do nagrania
- ⏱️ **Oszczędność czasu**: 25 min/tydzień = 20+ godzin/rok

### Top Autorzy (Must Record):
1. **Julian Tuwim** - 47 utworów (Lokomotywa, Słoń Trąbalski)
2. **Ezop** - 89 utworów (Żółw i zając, Mrówka i konik)
3. **Kornel Makuszyński** - 12 utworów (O dwóch takich co ukradli księżyc)
4. **Maria Konopnicka** - 34 utworów (O krasnoludkach)
5. **Konstanty Gałczyński** - 23 utworów (Teatrzyk Zielonej Gęsi)

---

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributors:
- [ ] AI auto-categorization (better accuracy)
- [ ] Integration z YouTube API (auto metadata)
- [ ] Email notifications (weekly progress)
- [ ] Advanced analytics dashboard
- [ ] Export to other formats (JSON, Excel)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Wolne Lektury](https://wolnelektury.pl/)** - Amazing open library of Polish literature
- **[n8n](https://n8n.io/)** - Powerful workflow automation tool
- **Polish Authors** - Who created beautiful literature now in public domain
- **Parents & Kids** - Who inspired this project 💕

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/issues)
- **Discussions**: [GitHub Discussions](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/discussions)
- **Email**: your-email@example.com

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=[YOUR_USERNAME]/wolne-lektury-automation&type=Date)](https://star-history.com/#[YOUR_USERNAME]/wolne-lektury-automation&Date)

---

## 📚 Related Projects

- [Bajki dla Dzieci - YouTube Channel](#) - Polish fairytales channel (coming soon!)
- [Wolne Lektury API](https://wolnelektury.pl/api/) - Official API documentation
- [n8n Community Workflows](https://n8n.io/workflows/) - More automation ideas

---

**Made with ❤️ for Polish kids and their parents** 🇵🇱

**Polskie dzieci zasługują na bajki najwyższej jakości!** 🎙️📚✨
