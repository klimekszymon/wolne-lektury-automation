# 🤝 Contributing to Wolne Lektury Automation

First off, thank you for considering contributing to Wolne Lektury Automation! 🎉

It's people like you that make this project better for Polish kids and their families. 💕

---

## 🌟 How Can I Contribute?

There are many ways to contribute:

### 1. 🐛 Report Bugs
Found a bug? [Open an issue](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/issues/new?template=bug_report.md)

### 2. 💡 Suggest Features
Have an idea? [Open a feature request](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/issues/new?template=feature_request.md)

### 3. 📝 Improve Documentation
- Fix typos
- Add examples
- Clarify instructions
- Translate to English

### 4. 💻 Submit Code
- Fix bugs
- Implement features
- Optimize performance
- Add tests

### 5. 🧪 Test & Review
- Test on different setups
- Review pull requests
- Report edge cases

---

## 🚀 Getting Started

### Fork & Clone

```bash
# 1. Fork repo on GitHub (button in top right)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/wolne-lektury-automation.git
cd wolne-lektury-automation

# 3. Add upstream
git remote add upstream https://github.com/ORIGINAL_OWNER/wolne-lektury-automation.git
```

### Development Setup

```bash
# 1. Setup n8n (if not already)
npm install -g n8n
n8n start

# 2. Import workflow
# File → Import → examples/WL_Bulk_Importer_ORIGINAL.json

# 3. Setup Google Sheets test environment
# Use templates/google_sheets_template.csv

# 4. Ready to code!
```

---

## 📋 Development Process

### 1. Create Branch

```bash
# Always create from main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

**Coding Standards:**
- Use clear variable names
- Add comments for complex logic
- Follow existing code style
- Test your changes

**For JavaScript (n8n nodes):**
```javascript
// Good
const currentYear = new Date().getFullYear();
const yearsFromDeath = currentYear - deathYear;

// Bad
const y = new Date().getFullYear();
const d = y - x;
```

### 3. Test

```bash
# Test with small dataset first
1. Set page_size=5 in workflow
2. Execute workflow
3. Verify output in Google Sheets
4. Check console logs for errors

# Then test with larger dataset
1. Set page_size=50
2. Verify performance
3. Check edge cases
```

### 4. Commit

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "✨ Add feature: auto-categorization for more genres"

# Use conventional commits:
# ✨ feat: new feature
# 🐛 fix: bug fix
# 📝 docs: documentation
# 🎨 style: formatting
# ♻️ refactor: code restructuring
# ✅ test: adding tests
# 🔧 chore: maintenance
```

### 5. Push & Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Then on GitHub:
1. Go to your fork
2. Click "Compare & pull request"
3. Fill in description
4. Submit!
```

---

## 📝 Pull Request Guidelines

### Good PR Description

```markdown
## What does this PR do?
Adds auto-categorization for theater plays and poetry beyond just "Wiersz" and "Bajka".

## Why?
Current categorization only covers 2 types, but WL has 10+ types of literature.

## Changes:
- Added 5 new categories (Dramat, Proza, Esej, etc.)
- Updated categoryToAgeGroup mapping
- Added tests for new categories

## Testing:
- Tested with 100 authors
- All categories properly assigned
- No breaking changes to existing data

## Screenshots:
[If UI changes, add before/after]

Fixes #42
```

### Checklist Before Submitting:

- [ ] Code follows project style
- [ ] Tested locally with small & large datasets
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or clearly documented)
- [ ] Commit messages are clear
- [ ] PR description is detailed

---

## 🧪 Testing Guidelines

### Manual Testing:

```bash
# Minimum tests before PR:
1. Small dataset (5 authors) - verify correctness
2. Medium dataset (50 authors) - verify performance
3. Edge cases:
   - Authors without death year
   - Authors with translators
   - Very old authors (Ezop -564)
   - Recent authors (under 70 years)
```

### Test Cases to Cover:

**Legal Status:**
- ✅ Public domain (70+ years)
- ❌ Protected (under 70 years)
- ⚠️ Translator check needed
- 🔍 Unknown/needs verification

**Categorization:**
- All major categories (Wiersz, Bajka, etc.)
- Edge cases (mixed genres)
- Unknown authors

**Priority Scoring:**
- Famous authors (5 stars)
- Many works (boost)
- Low priority (1-2 stars)

---

## 🐛 Bug Reports

### Good Bug Report:

```markdown
**Describe the bug**
Calculate legal status node returns "🔍 WYMAGA WERYFIKACJI" for all authors even when they should be public domain.

**To Reproduce**
1. Import workflow
2. Set page_size=10
3. Execute workflow
4. Check Google Sheet column "Status_prawny"

**Expected behavior**
Julian Tuwim (died 1953) should show "✅ DOMENA PUBLICZNA"

**Actual behavior**
Shows "🔍 WYMAGA WERYFIKACJI"

**Environment:**
- n8n version: 1.15.0
- Node.js version: 18.17.0
- OS: Windows 11

**Additional context**
This started happening after upgrading n8n to 1.15.0

**Screenshots**
[If applicable]
```

---

## 💡 Feature Requests

### Good Feature Request:

```markdown
**Feature Description**
Add integration with YouTube API to auto-generate video descriptions from author info.

**Use Case**
When uploading bajka to YouTube, automatically fill:
- Title: "{Utwór} - {Autor} | Bajka dla dzieci {grupa_wiekowa}"
- Description: Generated from author bio + legal status
- Tags: Auto from kategoria + autor

**Benefits**
- Saves 5 minutes per video
- Consistent formatting
- SEO optimization

**Proposed Implementation**
1. New node after "Calculate Legal Status"
2. Template system for titles/descriptions
3. Configuration for custom templates

**Alternatives Considered**
- Manual copying (too slow)
- External tool (breaks workflow)

**Additional Context**
Similar to how Canva API works in the project plan.
```

---

## 🌍 Translations

Currently documentation is in **Polish** (for Polish users) with some **English** (for international n8n community).

### Translation Guidelines:

**Priority files to translate:**
1. README.md (main)
2. docs/QUICK_START.md
3. n8n/README.md

**Keep in original language:**
- Polish-specific terms (Wolne Lektury, etc.)
- Author names
- Code comments (can be bilingual)

**How to contribute translations:**
```bash
1. Create: README.en.md (English version)
2. Create: docs/QUICK_START.en.md
3. Link from main README
```

---

## 📐 Code Style

### JavaScript (n8n nodes):

```javascript
// Naming
const camelCase = 'for variables';
const UPPER_CASE = 'for constants';

// Comments
// Explain WHY, not WHAT (code shows what)
// Good: "Skip API call for protected authors (saves credits)"
// Bad: "If not protected, call API"

// Emoji in commits (optional but nice):
✨ feat  | 🐛 fix  | 📝 docs
🎨 style | ♻️ refactor | ⚡ perf
✅ test  | 🔧 config | 🚀 deploy
```

### Markdown (docs):

```markdown
# Use H1 for title
## Use H2 for sections
### Use H3 for subsections

**Bold** for emphasis
*Italic* for notes
`code` for inline code

```code blocks``` for multi-line

- Lists for items
1. Numbered for steps

✅ Use emoji for status (sparingly)
```

---

## 🏆 Recognition

### Contributors Hall of Fame

All contributors will be:
- Listed in README.md
- Mentioned in release notes
- Tagged in social media posts

### Types of Contributions:

- 💻 Code
- 📝 Documentation
- 🐛 Bug reports
- 💡 Ideas
- 🧪 Testing
- 🌍 Translations
- 🎨 Design

**Everyone matters!** 🙏

---

## 📞 Questions?

**Before opening issue:**
1. Check [existing issues](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/issues)
2. Read [documentation](docs/)
3. Search [discussions](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/discussions)

**Still stuck?**
- Open [Discussion](https://github.com/[YOUR_USERNAME]/wolne-lektury-automation/discussions/new)
- Tag with `question` label
- We're here to help! 💪

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behaviors:**
- ✅ Being respectful and inclusive
- ✅ Giving and accepting constructive feedback
- ✅ Focusing on what's best for the community
- ✅ Showing empathy

**Unacceptable behaviors:**
- ❌ Harassment or discrimination
- ❌ Trolling or insulting comments
- ❌ Public or private harassment
- ❌ Publishing private information

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report to: [your-email@example.com]

---

## 🎯 Priority Areas

### We Need Help With:

**High Priority:**
- [ ] English translations of docs
- [ ] Testing on different n8n versions
- [ ] More categorization rules
- [ ] Performance optimization

**Medium Priority:**
- [ ] YouTube API integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] More examples

**Low Priority:**
- [ ] UI improvements
- [ ] Advanced features
- [ ] Video tutorials

---

## 💝 Thank You!

Every contribution, no matter how small, makes a difference.

**You're helping Polish children access their literary heritage!** 📚❤️

Together, we make education accessible for everyone! 🌟

---

**Made with ❤️ by contributors from around the world** 🌍
