/**
 * HuntHub — Community Live Chat Drawer & Stream Feed
 * Real-time slide-in panel with Kick badge styling and quick command helpers.
 */

class LiveChatController {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.simTimer = null;
    this.sampleUsers = [
      { name: 'diggitybets', badge: 'broadcaster', color: '#53fc18' },
      { name: 'Mod_Gamer99', badge: 'mod', color: '#00e5ff' },
      { name: 'NachoSlotVIP', badge: 'vip', color: '#ffd700' },
      { name: 'Valen_Streamer', badge: 'viewer', color: '#ffffff' },
      { name: 'AgusKickARG', badge: 'viewer', color: '#ffffff' },
      { name: 'StakeHunter21', badge: 'vip', color: '#ffd700' }
    ];

    this.sampleTexts = [
      'Welcome everyone! What slot should we open next in the hunt?',
      '!pickwinner',
      'Wanted pays insane when the VS multipliers land! 🌵',
      '!random pragmatic',
      'Just cast my vote in the 1v1 Battle, rooting for Player A!',
      '!guess $2,850.00',
      'LET\'S GO! Gates 1000 just dropped a 250x bomb!',
      '!battle san quentin'
    ];
  }

  init() {
    this.bindDrawerEvents();
    this.bindCommandPills();
    this.bindChatForm();
    this.startSimulationFeed();
  }

  bindDrawerEvents() {
    const toggleBtns = document.querySelectorAll('#btn-open-chat-drawer, [data-chat-drawer-toggle="true"]');
    const closeBtn = document.getElementById('chat-drawer-close');
    const overlay = document.getElementById('chat-drawer-backdrop');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => this.toggleDrawer());
    });

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());
    if (overlay) overlay.addEventListener('click', () => this.closeDrawer());
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    const drawer = document.getElementById('chat-drawer');
    const overlay = document.getElementById('chat-drawer-backdrop');
    if (drawer) drawer.classList.toggle('active', this.isOpen);
    if (overlay) overlay.classList.toggle('active', this.isOpen);
    if (window.soundEngine) window.soundEngine.playChip();
  }

  closeDrawer() {
    this.isOpen = false;
    const drawer = document.getElementById('chat-drawer');
    const overlay = document.getElementById('chat-drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  bindCommandPills() {
    document.querySelectorAll('.chat-cmd-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cmd = pill.getAttribute('data-cmd');
        const input = document.getElementById('chat-composer-input');
        if (input) {
          input.value = cmd + ' ';
          input.focus();
        }
        if (window.soundEngine) window.soundEngine.playChip();
      });
    });
  }

  bindChatForm() {
    const form = document.getElementById('chat-composer-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chat-composer-input');
      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      const currentUsername = (window.userStore && window.userStore.username) || 'You';
      this.addMessage({
        user: currentUsername,
        badge: window.userStore && window.userStore.isSub ? 'vip' : 'viewer',
        color: '#ffd700',
        content: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      if (text.startsWith('!') && window.adminHub && typeof window.adminHub.processLiveChatCommand === 'function') {
        window.adminHub.processLiveChatCommand(currentUsername, text);
      }

      input.value = '';
      if (window.soundEngine) window.soundEngine.playCard();
    });
  }

  addMessage(msg) {
    this.messages.push(msg);
    if (this.messages.length > 50) this.messages.shift();

    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg-row';

    const badgeLabel = (msg.badge || 'viewer').toUpperCase();
    const badgeClass = `chat-badge-${String(msg.badge || 'viewer').replace(/[^a-z0-9_-]/gi, '')}`;
    const safeUser = this.escapeHTML(msg.user || 'Viewer');
    const safeColor = /^#[0-9a-fA-F]{3,8}$/.test(msg.color) ? msg.color : '#53fc18';
    const safeTime = this.escapeHTML(msg.time || '');

    msgEl.innerHTML = `
      <div class="chat-msg-meta">
        <span class="chat-badge ${badgeClass}">${badgeLabel}</span>
        <span class="chat-username" style="color: ${safeColor}">${safeUser}</span>
        <span class="chat-timestamp">${safeTime}</span>
      </div>
      <div class="chat-msg-text">${this.escapeHTML(msg.content || '')}</div>
    `;

    container.appendChild(msgEl);
    while (container.children.length > 50) {
      container.removeChild(container.firstChild);
    }
    container.scrollTop = container.scrollHeight;
  }

  startSimulationFeed() {
    // Initial 4 messages
    this.addMessage({ user: 'diggitybets', badge: 'broadcaster', color: '#53fc18', content: 'Welcome to the live stream! Today we have an 8-bracket tourney and bonus hunt 🔥', time: '14:20' });
    this.addMessage({ user: 'Mod_Gamer99', badge: 'mod', color: '#00e5ff', content: 'Remember participation is 100% free for all viewers in chat.', time: '14:21' });
    this.addMessage({ user: 'NachoSlotVIP', badge: 'vip', color: '#ffd700', content: '!guess $2,450', time: '14:22' });

    // Periodic simulation
    this.simTimer = setInterval(() => {
      if (document.hidden) return;
      const user = this.sampleUsers[Math.floor(Math.random() * this.sampleUsers.length)];
      const text = this.sampleTexts[Math.floor(Math.random() * this.sampleTexts.length)];
      this.addMessage({
        user: user.name,
        badge: user.badge,
        color: user.color,
        content: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 18000);
  }

  escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }
}

window.liveChat = new LiveChatController();
