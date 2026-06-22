const LANGUAGES = [
    {
        id: 'banjar',
        name: 'Bahasa Banjar',
        region: 'Kalimantan Selatan',
        emoji: '🏝️',
        count: 212,
        color: '#1A3A4A'
    },
    {
        id: 'jawa',
        name: 'Bahasa Jawa',
        region: 'Jawa Tengah & Timur',
        emoji: '🌾',
        count: 179,
        color: '#4A2A1A'
    },
    {
        id: 'sunda',
        name: 'Bahasa Sunda',
        region: 'Jawa Barat',
        emoji: '⛰️',
        count: 187,
        color: '#2A4A3A'
    },
    {
        id: 'batak',
        name: 'Bahasa Batak',
        region: 'Sumatera Utara',
        emoji: '🏔️',
        count: 122,
        color: '#3A2A4A'
    },
    {
        id: 'minang',
        name: 'Bahasa Minangkabau',
        region: 'Sumatera Barat',
        emoji: '🏘️',
        count: 128,
        color: '#4A3A1A'
    },
    {
        id: 'bugis',
        name: 'Bahasa Bugis',
        region: 'Sulawesi Selatan',
        emoji: '⛵',
        count: 79,
        color: '#1A4A3A'
    },
    {
        id: 'balinese',
        name: 'Bahasa Bali',
        region: 'Bali',
        emoji: '🌺',
        count: 86,
        color: '#4A1A3A'
    },
    {
        id: 'aceh',
        name: 'Bahasa Aceh',
        region: 'Aceh',
        emoji: '🕌',
        count: 67,
        color: '#2A4A4A'
    },
    {
        id: 'manado',
        name: 'Bahasa Manado',
        region: 'Sulawesi Utara',
        emoji: '🌊',
        count: 175,
        color: '#1A5A5A'
    },
    {
        id: 'gayo',
        name: 'Bahasa Gayo',
        region: 'Aceh Tengah',
        emoji: '🏔️',
        count: 88,
        color: '#3A5A2A'
    },
    {
        id: 'tidung',
        name: 'Bahasa Tidung',
        region: 'Kalimantan Utara',
        emoji: '🌲',
        count: 80,
        color: '#2A4A2A'
    },
    {
        id: 'betawi',
        name: 'Bahasa Betawi',
        region: 'DKI Jakarta',
        emoji: '🏙️',
        count: 123,
        color: '#4A3A3A'
    },
    {
        id: 'sumbawa',
        name: 'Bahasa Sumbawa',
        region: 'Nusa Tenggara Barat',
        emoji: '🏝️',
        count: 79,
        color: '#3A4A2A'
    },
    {
        id: 'rote',
        name: 'Bahasa Rote',
        region: 'Nusa Tenggara Timur',
        emoji: '🌅',
        count: 60,
        color: '#4A3A2A'
    },
    {
        id: 'nias',
        name: 'Bahasa Nias',
        region: 'Sumatera Utara',
        emoji: '🏝️',
        count: 67,
        color: '#2A3A4A'
    },
    {
        id: 'mentawai',
        name: 'Bahasa Mentawai',
        region: 'Sumatera Barat',
        emoji: '🌴',
        count: 76,
        color: '#3A4A1A'
    },
    {
        id: 'marita',
        name: 'Bahasa Marita',
        region: 'Sulawesi',
        emoji: '🏝️',
        count: 134,
        color: '#4A2A3A'
    },
    {
        id: 'mamuju',
        name: 'Bahasa Mamuju',
        region: 'Sulawesi Barat',
        emoji: '🏔️',
        count: 134,
        color: '#3A2A4A'
    },
    {
        id: 'palu',
        name: 'Bahasa Palu',
        region: 'Sulawesi Tengah',
        emoji: '🏙️',
        count: 171,
        color: '#2A5A3A'
    },
    {
        id: 'tionghoa_dki',
        name: 'Bahasa Tionghoa DKI',
        region: 'DKI Jakarta',
        emoji: '🏮',
        count: 55,
        color: '#4A1A2A'
    },
    {
        id: 'fakafuku',
        name: 'Bahasa Fakafuku',
        region: 'Maluku',
        emoji: '🏝️',
        count: 159,
        color: '#1A4A4A'
    },
    {
        id: 'bengkulu',
        name: 'Bahasa Bengkulu',
        region: 'Bengkulu',
        emoji: '🌊',
        count: 80,
        color: '#4A4A1A'
    },
    {
        id: 'bajo',
        name: 'Bahasa Bajo',
        region: 'Sulawesi & NTT',
        emoji: '⛵',
        count: 204,
        color: '#1A4A3A'
    }
];

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const languageGrid = document.getElementById('languageGrid');
const searchInput = document.getElementById('searchRegion');
const searchInfo = document.getElementById('searchInfo');
const clearSearchBtn = document.getElementById('clearSearch');

let currentFilteredLanguages = [];

// ─── RENDER LANGUAGE CARDS ──────────────────────────────────────────────────
function renderLanguages(languagesToRender = null) {
    // Jika tidak ada parameter, gunakan semua bahasa yang sudah diurutkan
    const dataToRender = languagesToRender || getSortedLanguages();
    currentFilteredLanguages = dataToRender;

    if (dataToRender.length === 0) {
        languageGrid.innerHTML = `
            <div class="empty-search">
                <div class="empty-icon">🔍</div>
                <h3>Tidak ditemukan</h3>
                <p>Tidak ada bahasa daerah yang cocok dengan pencarian Anda.</p>
                <p class="empty-hint">Coba cari dengan kata kunci lain atau periksa ejaan Anda.</p>
            </div>
        `;
        return;
    }

    languageGrid.innerHTML = dataToRender.map(lang => `
        <div class="language-card" data-lang="${lang.id}" role="button" tabindex="0" style="border-color: ${lang.color}44;">
            <span class="emoji">${lang.emoji}</span>
            <div class="name">${highlightMatch(lang.name)}</div>
            <div class="region">${highlightMatch(lang.region)}</div>
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

    // Update search info
    updateSearchInfo(dataToRender.length);
}

// ─── GET SORTED LANGUAGES ──────────────────────────────────────────────────
function getSortedLanguages() {
    return [...LANGUAGES].sort((a, b) => {
        return a.name.localeCompare(b.name, 'id', { sensitivity: 'base' });
    });
}

// ─── HIGHLIGHT MATCH ──────────────────────────────────────────────────────
function highlightMatch(text) {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="highlight">$1</mark>');
}

// ─── SEARCH FUNCTION ──────────────────────────────────────────────────────
function searchLanguages(query) {
    const trimmedQuery = query.trim().toLowerCase();
    
    if (!trimmedQuery) {
        // Jika kosong, tampilkan semua bahasa
        renderLanguages(getSortedLanguages());
        return;
    }

    // Filter bahasa berdasarkan nama atau daerah
    const filtered = getSortedLanguages().filter(lang => {
        const nameMatch = lang.name.toLowerCase().includes(trimmedQuery);
        const regionMatch = lang.region.toLowerCase().includes(trimmedQuery);
        return nameMatch || regionMatch;
    });

    renderLanguages(filtered);
}

// ─── UPDATE SEARCH INFO ──────────────────────────────────────────────────
function updateSearchInfo(count) {
    const total = LANGUAGES.length;
    const query = searchInput.value.trim();
    
    if (!query) {
        searchInfo.textContent = `${total} bahasa daerah tersedia`;
        searchInfo.style.display = 'block';
        return;
    }

    if (count === 0) {
        searchInfo.innerHTML = `Tidak ada hasil untuk "<strong>${query}</strong>"`;
    } else {
        searchInfo.innerHTML = `Menampilkan <strong>${count}</strong> dari ${total} bahasa daerah untuk "<strong>${query}</strong>"`;
    }
    searchInfo.style.display = 'block';
}

// ─── CLEAR SEARCH ────────────────────────────────────────────────────────
function clearSearch() {
    searchInput.value = '';
    searchInfo.style.display = 'none';
    renderLanguages(getSortedLanguages());
    searchInput.focus();
}

// ─── NAVIGATE TO DICTIONARY ──────────────────────────────────────────────
function navigateToDictionary(langData) {
    localStorage.setItem('selectedLanguage', JSON.stringify(langData));
    window.location.href = `dictionary.html?lang=${langData.id}`;
}

// ─── CHECK IF ON DICTIONARY PAGE ──────────────────────────────────────────
function isDictionaryPage() {
    return window.location.pathname.includes('dictionary.html');
}

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────
// Search input
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    searchLanguages(query);
    
    // Toggle clear button visibility
    clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
});

// Clear search button
clearSearchBtn.addEventListener('click', clearSearch);

// Keyboard shortcut: Escape to clear
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearSearch();
        searchInput.blur();
    }
});

// ─── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Tampilkan semua bahasa
    renderLanguages(getSortedLanguages());
    
    // Sembunyikan clear button awal
    clearSearchBtn.style.display = 'none';
});