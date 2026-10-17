/**
 * HuntHub — 4,889 Curated Slots Explorer
 * Instant search, provider filters, virtual pagination, and 1-click actions.
 */

class SlotsExplorerController {
  constructor() {
    this.slots = [];
    this.filteredSlots = [];
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.currentPage = 1;
    this.pageSize = 36;
  }

  init() {
    if (window.SlotResolver) {
      this.slots = window.SlotResolver.getCuratedCatalog();
    } else if (window.HUNTHUB_CURATED_SLOTS && Array.isArray(window.HUNTHUB_CURATED_SLOTS)) {
      this.slots = window.HUNTHUB_CURATED_SLOTS;
    } else {
      console.warn('HUNTHUB_CURATED_SLOTS not found on window, awaiting script load');
      this.slots = [];
    }

    this.initFilters();
    this.initSearch();
    this.applyFilters();
  }

  initFilters() {
    const filterBtns = document.querySelectorAll('.slot-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundEngine.playChip();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter') || 'all';
        this.currentPage = 1;
        this.applyFilters();
      });
    });

    const loadMoreBtn = document.getElementById('slots-btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.currentPage += 1;
        this.renderGrid(true);
      });
    }
  }

  initSearch() {
    const searchInput = document.getElementById('slots-search-input');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.currentPage = 1;
        this.applyFilters();
      }, 150);
    });

    const clearBtn = document.getElementById('slots-search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.searchQuery = '';
        this.currentPage = 1;
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    let result = this.slots;

    // Filter by category / provider
    if (this.activeFilter === 'stake') {
      result = result.filter(s => s.category === 'stake' || (s.badge && s.badge.includes('STAKE')));
    } else if (this.activeFilter === 'pragmatic') {
      result = result.filter(s => s.category === 'pragmatic' || (s.provider && s.provider.toLowerCase().includes('pragmatic')));
    } else if (this.activeFilter === 'hacksaw') {
      result = result.filter(s => s.category === 'hacksaw' || (s.provider && s.provider.toLowerCase().includes('hacksaw')));
    } else if (this.activeFilter === 'nolimit') {
      result = result.filter(s => s.category === 'nolimit' || (s.provider && s.provider.toLowerCase().includes('nolimit')));
    } else if (this.activeFilter === 'tiers') {
      result = result.filter(s => s.tier === '1' || s.tier === '2');
    }

    // Filter by search query
    if (this.searchQuery) {
      result = result.filter(s => {
        const nameMatch = s.name && s.name.toLowerCase().includes(this.searchQuery);
        const provMatch = s.provider && s.provider.toLowerCase().includes(this.searchQuery);
        return nameMatch || provMatch;
      });
    }

    this.filteredSlots = result;

    const countEl = document.getElementById('slots-count-display');
    if (countEl) {
      countEl.textContent = `${this.filteredSlots.length.toLocaleString()} SLOTS`;
    }

    this.renderGrid(false);
  }

  renderGrid(append = false) {
    const gridEl = document.getElementById('slots-grid');
    if (!gridEl) return;

    if (!append) {
      gridEl.innerHTML = '';
    }

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = this.currentPage * this.pageSize;
    const currentBatch = this.filteredSlots.slice(startIdx, endIdx);

    const esc = (s) => (window.escapeHTML ? window.escapeHTML(s || '') : (s || ''));

    if (this.filteredSlots.length === 0) {
      gridEl.innerHTML = `
        <div class="slots-empty-state">
          <span>🔍</span>
          <p>No se encontraron slots con el término "${esc(this.searchQuery)}".</p>
        </div>
      `;
      const loadMoreBtn = document.getElementById('slots-btn-load-more');
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    const fragment = document.createDocumentFragment();

    currentBatch.forEach(slot => {
      const card = document.createElement('div');
      card.className = 'slot-card';

      const providerBadge = esc(slot.badge || slot.provider || 'SLOT');
      const maxWin = esc(slot.maxWin || '5,000x');
      const imgSrc = slot.image || '';
      const safeName = esc(slot.name);
      const safeProvider = esc(slot.provider || 'Provider');

      card.innerHTML = `
        <div class="slot-card-image-wrap">
          <img class="slot-card-img" src="${imgSrc}" alt="${safeName}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'180\\' height=\\'236\\' viewBox=\\'0 0 180 236\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230e1320\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%23ffd700\\' font-family=\\'sans-serif\\' font-size=\\'14\\' text-anchor=\\'middle\\' dy=\\'.3em\\'>${encodeURIComponent(slot.name || '')}</text></svg>'">
          <span class="slot-badge-pill">${providerBadge}</span>
          <span class="slot-maxwin-pill">${maxWin}</span>
        </div>
        <div class="slot-card-info">
          <h4 class="slot-card-title" title="${safeName}">${safeName}</h4>
          <span class="slot-card-provider">${safeProvider}</span>
          <div class="slot-card-actions">
            <button type="button" class="btn-slot-action btn-add-hunt" data-slot-id="${esc(slot.id)}" data-slot-name="${safeName}" data-slot-img="${esc(slot.image || '')}">💎 +Hunt</button>
            <a href="wheel-slots/overlay/index.html?slot=${encodeURIComponent(slot.id)}" target="_blank" rel="noopener noreferrer" class="btn-slot-action btn-spin-wheel">🎰 Ruleta</a>
          </div>
        </div>
      `;

      fragment.appendChild(card);
    });

    gridEl.appendChild(fragment);

    // Bind +Hunt buttons
    gridEl.querySelectorAll('.btn-add-hunt').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-slot-id');
        const name = btn.getAttribute('data-slot-name');
        const img = btn.getAttribute('data-slot-img');
        if (window.bonusHunt) {
          window.bonusHunt.addSlotToHunt({ id, name, image: img, bet: 1.0, payout: 0, caller: '@Tú' });
        }
        window.soundEngine.playChip();
        btn.textContent = '✓ Añadido';
        setTimeout(() => { btn.textContent = '💎 +Hunt'; }, 2000);
      };
    });

    // Update Load More Button visibility
    const loadMoreBtn = document.getElementById('slots-btn-load-more');
    if (loadMoreBtn) {
      if (endIdx >= this.filteredSlots.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.textContent = `Cargar más (${(this.filteredSlots.length - endIdx).toLocaleString()} restantes)`;
      }
    }
  }
}

window.slotsExplorer = new SlotsExplorerController();
