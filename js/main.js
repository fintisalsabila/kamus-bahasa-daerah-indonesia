// ─── DATA BAHASA DAERAH ──────────────────────────────────────────────────────
const LANGUAGES = [
    {
        id: 'banjar',
        name: 'Bahasa Banjar',
        region: 'Kalimantan Selatan',
        emoji: '🏝️',
        count: 211,
        color: '#1A3A4A'
    },
    {
        id: 'jawa',
        name: 'Bahasa Jawa',
        region: 'Jawa Tengah & Timur',
        emoji: '🌾',
        count: 185,
        color: '#4A2A1A'
    },
    {
        id: 'sunda',
        name: 'Bahasa Sunda',
        region: 'Jawa Barat',
        emoji: '⛰️',
        count: 167,
        color: '#2A4A3A'
    },
    {
        id: 'batak',
        name: 'Bahasa Batak',
        region: 'Sumatera Utara',
        emoji: '🏔️',
        count: 143,
        color: '#3A2A4A'
    },
    {
        id: 'minang',
        name: 'Bahasa Minangkabau',
        region: 'Sumatera Barat',
        emoji: '🏘️',
        count: 129,
        color: '#4A3A1A'
    },
    {
        id: 'bugis',
        name: 'Bahasa Bugis',
        region: 'Sulawesi Selatan',
        emoji: '⛵',
        count: 118,
        color: '#1A4A3A'
    },
    {
        id: 'balinese',
        name: 'Bahasa Bali',
        region: 'Bali',
        emoji: '🌺',
        count: 156,
        color: '#4A1A3A'
    },
    {
        id: 'aceh',
        name: 'Bahasa Aceh',
        region: 'Aceh',
        emoji: '🕌',
        count: 97,
        color: '#2A4A4A'
    }
];

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const languageGrid = document.getElementById('languageGrid');

// ─── RENDER LANGUAGE CARDS ──────────────────────────────────────────────────
function renderLanguages() {
    languageGrid.innerHTML = LANGUAGES.map(lang => `
        <div class="language-card" data-lang="${lang.id}" role="button" tabindex="0">
            <span class="emoji">${lang.emoji}</span>
            <div class="name">${lang.name}</div>
            <div class="region">${lang.region}</div>
            <span class="count">${lang.count} entri</span>
        </div>
    `).join('');

    // Attach click event
    languageGrid.querySelectorAll('.language-card').forEach(card => {
        card.addEventListener('click', () => {
            const langId = card.dataset.lang;
            const langData = LANGUAGES.find(l => l.id === langId);
            if (langData) {
                navigateToDictionary(langData);
            }
        });

        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// ─── NAVIGATE TO DICTIONARY ──────────────────────────────────────────────
function navigateToDictionary(langData) {
    // Simpan data bahasa yang dipilih ke localStorage untuk digunakan di halaman kamus
    localStorage.setItem('selectedLanguage', JSON.stringify(langData));

    // Redirect ke halaman kamus
    window.location.href = `dictionary.html?lang=${langData.id}`;
}

// ─── CHECK IF ON DICTIONARY PAGE ──────────────────────────────────────────
function isDictionaryPage() {
    return window.location.pathname.includes('dictionary.html');
}

// ─── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderLanguages();
});