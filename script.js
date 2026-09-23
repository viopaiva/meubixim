const tabButtons = document.querySelectorAll('.tab-btn');
const formPanels = document.querySelectorAll('.form-panel');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const profileTrigger = document.querySelector('.profile-trigger');
const profileMenuWrapper = document.querySelector('.profile-menu-wrapper');
const switchProfileModal = document.getElementById('switchProfileModal');
const settingsModal = document.getElementById('settingsModal');
const toyTradeModal = document.getElementById('toyTradeModal');
const tradePageForm = document.getElementById('tradeForm');
const tradeItemsList = document.getElementById('tradeItemsList');
const tradePageButton = document.querySelector('[data-open-trade-page-form]');
const bookingForm = document.getElementById('bookingForm');
const switchButtons = document.querySelectorAll('.switch-profile-item');
const closeButtons = document.querySelectorAll('.close-modal');
const tradeAddButton = document.querySelector('[data-open-trade-modal]');
const toyTradeForm = document.getElementById('toyTradeForm');
const tradeList = document.getElementById('tradeList');

function activateTab(target) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.target === target;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  formPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `${target}Form`);
  });
}

function goToProfile(event) {
  event.preventDefault();
  window.location.href = 'profile.html';
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function updateActiveProfile(profileKey) {
  const profileNameMap = {
    lua: { name: 'Lua', handle: '@luadapet', avatar: '🐶', accent: 'linear-gradient(135deg, #ffefdf, #ffd9c4)' },
    rex: { name: 'Rex', handle: '@rexinho', avatar: '🐕', accent: 'linear-gradient(135deg, #e7f4ff, #d4e7ff)' },
    nina: { name: 'Nina', handle: '@ninagatinha', avatar: '🐱', accent: 'linear-gradient(135deg, #e8ebff, #d5e6ff)' }
  };

  const selected = profileNameMap[profileKey];
  if (!selected) return;

  const profileName = document.querySelector('.profile-head h2');
  const profileHandle = document.querySelector('.profile-head p');
  const triggerLabel = document.querySelector('.profile-trigger span:nth-of-type(2)');
  const triggerIcon = document.querySelector('.profile-trigger .mini-avatar');
  const profileAvatar = document.querySelector('.profile-avatar');

  if (profileName) profileName.textContent = selected.name;
  if (profileHandle) profileHandle.textContent = selected.handle;
  if (triggerLabel) triggerLabel.textContent = selected.name;
  if (triggerIcon) triggerIcon.textContent = selected.avatar;
  if (profileAvatar) {
    profileAvatar.textContent = selected.avatar;
    profileAvatar.style.background = selected.accent;
  }

  switchButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.profile === profileKey);
  });

  const menu = document.querySelector('.profile-menu-wrapper');
  if (menu) menu.classList.remove('open');
}

if (profileTrigger && profileMenuWrapper) {
  profileTrigger.addEventListener('click', () => {
    const isOpen = profileMenuWrapper.classList.toggle('open');
    profileTrigger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!profileMenuWrapper.contains(event.target)) {
      profileMenuWrapper.classList.remove('open');
      profileTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

const profileDropdownButtons = document.querySelectorAll('.profile-dropdown button');

profileDropdownButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const text = button.textContent.trim();

    if (text.includes('Trocar de perfil')) {
      openModal(switchProfileModal);
    }

    if (text.includes('Configurações')) {
      openModal(settingsModal);
    }

    if (text.includes('Logout')) {
      window.location.href = 'index.html';
    }
  });
});

switchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    updateActiveProfile(button.dataset.profile);
    closeModal(switchProfileModal);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal-overlay');
    closeModal(modal);
  });
});

if (tradeAddButton) {
  tradeAddButton.addEventListener('click', () => openModal(toyTradeModal));
}

if (toyTradeForm && tradeList) {
  toyTradeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(toyTradeForm);
    const toyName = (formData.get('toyName') || '').toString().trim();
    const toyCategory = (formData.get('toyCategory') || 'Brinquedo').toString();
    const toyCondition = (formData.get('toyCondition') || 'Boa').toString();
    const toyDescription = (formData.get('toyDescription') || '').toString().trim();

    if (!toyName || !toyDescription) return;

    const item = document.createElement('div');
    item.className = 'trade-item';

    const iconMap = {
      Brinquedo: '🧸',
      Acessório: '🎀',
      Objeto: '🧺',
      Petisco: '🥫'
    };

    item.innerHTML = `
      <span class="trade-icon">${iconMap[toyCategory] || '🧸'}</span>
      <div>
        <strong>${toyName}</strong>
        <small>${toyCondition} • ${toyCategory} • ${toyDescription}</small>
      </div>
    `;

    tradeList.prepend(item);
    toyTradeForm.reset();
    closeModal(toyTradeModal);
  });
}

if (tradePageForm && tradeItemsList) {
  tradePageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(tradePageForm);
    const itemName = (formData.get('itemName') || '').toString().trim();
    const itemCategory = (formData.get('itemCategory') || 'Brinquedo').toString();
    const itemCondition = (formData.get('itemCondition') || 'Boa').toString();
    const itemSwap = (formData.get('itemSwap') || '').toString().trim();
    const itemDescription = (formData.get('itemDescription') || '').toString().trim();

    if (!itemName || !itemSwap || !itemDescription) return;

    const article = document.createElement('article');
    article.className = 'trade-item-card';

    const iconMap = {
      Brinquedo: '🧸',
      Acessório: '🎀',
      Objeto: '🧺',
      Petisco: '🥫'
    };

    article.innerHTML = `
      <div class="trade-item-icon">${iconMap[itemCategory] || '🧸'}</div>
      <div>
        <h4>${itemName}</h4>
        <p>${itemCondition} • ${itemCategory}</p>
        <small>Troca por ${itemSwap}. ${itemDescription}</small>
      </div>
    `;

    tradeItemsList.prepend(article);

    const tradeCounter = document.querySelector('.trade-counter');
    if (tradeCounter) {
      const currentTotal = tradeItemsList.querySelectorAll('.trade-item-card').length;
      tradeCounter.textContent = `${currentTotal} item${currentTotal === 1 ? '' : 's'}`;
    }

    tradePageForm.reset();
  });
}

if (tradePageButton && tradePageForm) {
  tradePageButton.addEventListener('click', () => {
    tradePageForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    tradePageForm.querySelector('input')?.focus();
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'agendamento-confirmado.html';
  });
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal(event.target);
  }
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => activateTab(button.dataset.target));
});

if (loginForm) {
  loginForm.addEventListener('submit', goToProfile);
}

if (signupForm) {
  signupForm.addEventListener('submit', goToProfile);
}
