// ═══════════════════════════════════════
//  半糖主义 PWA — 完整 JS (修复版)
// ═══════════════════════════════════════

/* ---------- 常量 ---------- */
const RING_R = 48;
const CIRCUMFERENCE = Math.PI * RING_R * 2;

/* ---------- 全局设置（可持久化）---------- */
let userSettings = {
  caffeineMax: 400,
  sugarMax: 50,
  nickname: '',
  avatar: '☕',
  theme: 'apple',
};

const PRESETS = {
  COFFEE: [
    { t:'COFFEE', n:'美式咖啡',  c:150, s:0,  p:18 },
    { t:'COFFEE', n:'拿铁',      c:160, s:10, p:20 },
    { t:'COFFEE', n:'生椰拿铁',  c:200, s:15, p:22 },
    { t:'COFFEE', n:'柠檬美式',  c:160, s:5,  p:20 },
    { t:'COFFEE', n:'燕麦拿铁',  c:180, s:10, p:24 },
    { t:'COFFEE', n:'卡布奇诺',  c:160, s:12, p:20 },
    { t:'COFFEE', n:'摩卡',      c:170, s:20, p:25 },
    { t:'COFFEE', n:'冷萃咖啡',  c:200, s:0,  p:26 },
    { t:'COFFEE', n:'澳白',      c:210, s:8,  p:25 },
    { t:'COFFEE', n:'手冲咖啡',  c:180, s:0,  p:30 },
  ],
  MILK_TEA: [
    { t:'MILK_TEA', n:'波霸奶茶',     c:100, s:28, p:15 },
    { t:'MILK_TEA', n:'四季春茶',     c:80,  s:16, p:10 },
    { t:'MILK_TEA', n:'抹茶拿铁',     c:120, s:18, p:18 },
    { t:'MILK_TEA', n:'芋泥啵啵',     c:60,  s:22, p:16 },
    { t:'MILK_TEA', n:'杨枝甘露',     c:50,  s:25, p:18 },
    { t:'MILK_TEA', n:'黑糖珍珠奶茶', c:90,  s:30, p:16 },
    { t:'MILK_TEA', n:'柠檬茶',       c:40,  s:20, p:12 },
    { t:'MILK_TEA', n:'芝士奶盖茶',   c:100, s:24, p:20 },
  ]
};
const DAILY_QUOTES = [
  '今天也是需要咖啡因续命的一天 ☕️',
  '来杯无糖奶茶，四舍五入等于没喝 🧋',
  '生活太苦？记得给自己加点糖 🍬',
  '一杯冰美式，清醒地面对这个世界 ❄️',
  '奶茶是液体的拥抱，温柔且治愈 🫂',
  '咖啡是成年人白天的酒精，微醺不醉 🥃',
  '三分糖的克制，是对生活的温柔妥协 ✨',
  '少冰去糖，成年人最后的倔强 💪',
  '没有什么是一杯咖啡解决不了的，如果有，就两杯 ☕️☕️',
  '今天的快乐是奶茶给的，明天的体重明天再说 🎈',
  '喝咖啡的人不一定是艺术家，但一定很困 😴',
  '热饮暖手，冷饮沁心，都是生活的温度 🌡️',
  '每一杯澳白，都是对庸常生活的优雅反击 🎯',
  '手冲咖啡的仪式感，是对自己的最高礼遇 🫖',
  '低卡糖 + 燕麦奶，自律和放纵的完美平衡 ⚖️',
  '下午三点的奶茶，是打工人给自己发的勋章 🏅',
  '拉花很丑没关系，味道对了就是好咖啡 🤎',
  '人生就像抹茶拿铁，苦中带甜才够味 🍵',
];

/* ---------- 全局状态 ---------- */
let currentPage = 'home';
let records = [];
let selectedFav = null;
let confirmCallback = null;

/* ---------- 初始化 ---------- */
(function init() {
  loadSettings();
  loadRecords();
  loadFav();
  loadTheme();
  ringInit();
  updateRings();
  renderPage('home');
  bindEvents();
  console.log('半糖主义 PWA 初始化完成');
})();

/* ---------- 设置存取 ---------- */
function loadSettings() {
  try {
    var saved = JSON.parse(localStorage.getItem('bt_settings'));
    if (saved) { Object.assign(userSettings, saved); }
  } catch(e) {}
}
function saveSettings() {
  localStorage.setItem('bt_settings', JSON.stringify(userSettings));
  // 同步全局约束
  loadTheme(); // refresh theme if changed
  updateRings();
  if (currentPage === 'home' || currentPage === 'profile') { renderPage(currentPage); }
}

function bindEvents() {
  // 底部导航
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.dataset.page;
      console.log('导航点击:', page);
      switchPage(page);
    });
  });
  // FAB 记录按钮
  const fabBtn = document.getElementById('fabRecordBtn');
  if (fabBtn) {
    fabBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openRecordSheet();
    });
  }
  // 记录弹窗关闭按钮
  const sheetClose = document.getElementById('recordSheetClose');
  if (sheetClose) {
    sheetClose.addEventListener('click', function(e) {
      e.preventDefault();
      closeRecordSheet();
    });
  }
  // 点击遮罩关闭
  const sheetOverlay = document.getElementById('recordSheet');
  if (sheetOverlay) {
    sheetOverlay.addEventListener('click', function(e) {
      if (e.target === sheetOverlay) closeRecordSheet();
    });
  }
  // 删除确认弹窗
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');
  if (modalCancel) modalCancel.addEventListener('click', hideModal);
  if (modalConfirm) {
    modalConfirm.addEventListener('click', function() {
      if (confirmCallback) confirmCallback();
      hideModal();
    });
  }
}

/* ---------- 存储 (localStorage) ---------- */
function loadRecords() {
  try { records = JSON.parse(localStorage.getItem('bt_records') || '[]'); } catch(e) { records = []; }
  console.log('加载记录:', records.length, '条');
}
function saveRecords() {
  localStorage.setItem('bt_records', JSON.stringify(records));
  console.log('保存记录:', records.length, '条');
}
function loadFav() {
  try { selectedFav = JSON.parse(localStorage.getItem('bt_fav')); } catch(e) { selectedFav = null; }
  if (!selectedFav) {
    selectedFav = { t:'COFFEE', n:'生椰拿铁', sugar:'三分糖', ice:'去冰', c:200, s:15, p:22 };
  }
  updateFavBtn();
}
function updateFavBtn() {
  const btn = document.getElementById('favBtn');
  if (!btn || !selectedFav) return;
  const txt = btn.querySelector('.fav-text');
  if (txt) txt.textContent = `快捷记录 — ${selectedFav.n}（${selectedFav.sugar}/${selectedFav.ice} ¥${selectedFav.p}）`;
}

function loadTheme() {
  applyTheme(userSettings.theme || 'apple');
}
function applyTheme(t) {
  userSettings.theme = t;
  localStorage.setItem('bt_settings', JSON.stringify(userSettings));
  document.documentElement.setAttribute('data-theme', t);
  // 切换 CSS 文件
  const link = document.getElementById('themeStylesheet');
  const themeMap = {
    neo:    'css/themes/neo-brutalism.css',
    wabi:   'css/themes/wabi-sabi.css',
    apple:  'css/themes/apple-hig.css',
    cyber:  'css/themes/cyberpunk.css',
  };
  if (link && themeMap[t]) { link.href = themeMap[t]; }
  // 更新 PWA 状态栏颜色
  const metaColor = document.getElementById('metaThemeColor');
  const colorMap = {
    neo:   '#FFFDF5',
    wabi:  '#FDFAF5',
    apple: '#F2F2F7',
    cyber: '#0A0A0F',
  };
  if (metaColor && colorMap[t]) { metaColor.content = colorMap[t]; }
  console.log('主题切换:', t);
}

/* ---------- 环形进度 ---------- */
function ringInit() {
  document.querySelectorAll('.ring-fill').forEach(r => {
    r.style.strokeDasharray = CIRCUMFERENCE;
    r.style.strokeDashoffset = CIRCUMFERENCE;
  });
}

function updateRings() {
  const c = todayCaffeine();
  const s = todaySugar();
  const caffeineMax = userSettings.caffeineMax || 400;
  const sugarMax = userSettings.sugarMax || 50;
  const cPct = Math.min(c / caffeineMax, 1);
  const sPct = Math.min(s / sugarMax, 1);

  const cr = document.getElementById('caffeineRing');
  const sr = document.getElementById('sugarRing');
  if (cr) cr.style.strokeDashoffset = CIRCUMFERENCE * (1 - cPct);
  if (sr) sr.style.strokeDashoffset = CIRCUMFERENCE * (1 - sPct);

  const cv = document.getElementById('caffeineValue');
  if (cv) {
    cv.textContent = c === Math.floor(c) ? c : c.toFixed(1);
    cv.style.color = cPct >= 1 ? 'var(--warn)' : 'var(--black)';
  }
  const sv = document.getElementById('sugarValue');
  if (sv) {
    sv.textContent = s === Math.floor(s) ? s : s.toFixed(1);
    sv.style.color = sPct >= 1 ? 'var(--warn)' : 'var(--black)';
  }

  // 更新上限标签
  var cl = document.getElementById('caffeineLimitLabel');
  if (cl) cl.textContent = '上限 ' + caffeineMax + 'mg';
  var sl = document.getElementById('sugarLimitLabel');
  if (sl) sl.textContent = '上限 ' + sugarMax + 'g';

  // 警告
  const cwarn = document.getElementById('caffeineWarning');
  if (cwarn) {
    cwarn.classList.toggle('hidden', c <= caffeineMax);
    if (c > caffeineMax) cwarn.classList.add('alert-pulse');
  }

  const hasLateCoffee = todayRecords().some(r => r.t === 'COFFEE' && new Date(r.ts).getHours() >= 20);
  const sw = document.getElementById('sleepWarning');
  if (sw) sw.classList.toggle('hidden', !hasLateCoffee);

  // 更新液体杯
  updateDrinkCup(c, s);
}

/* ---------- 液体杯 ---------- */
function updateDrinkCup(caffeine, sugar) {
  const today = todayRecords();
  const cupLabel = document.getElementById('cupLabel');
  if (cupLabel) cupLabel.textContent = '今日 ' + today.length + ' 杯';

  // 计算液体颜色：咖啡因多→咖啡色，奶茶多→奶茶色
  const hasCoffee = today.some(r => r.t === 'COFFEE');
  const hasMilkTea = today.some(r => r.t === 'MILK_TEA');
  const liquid = document.getElementById('cupLiquid');
  const wave1 = document.getElementById('cupWave1');
  const wave2 = document.getElementById('cupWave2');

  let liquidColor, waveColor;
  if (hasCoffee && !hasMilkTea) {
    liquidColor = 'rgba(107,58,42,0.6)';
    waveColor = 'rgba(107,58,42,0.55)';
  } else if (hasMilkTea && !hasCoffee) {
    liquidColor = 'rgba(212,149,106,0.6)';
    waveColor = 'rgba(212,149,106,0.55)';
  } else if (hasCoffee && hasMilkTea) {
    liquidColor = 'rgba(155,103,74,0.6)';
    waveColor = 'rgba(155,103,74,0.55)';
  } else {
    // 没记录时是清水
    liquidColor = 'rgba(200,220,240,0.25)';
    waveColor = 'rgba(200,220,240,0.2)';
  }

  if (liquid) liquid.setAttribute('fill', liquidColor);
  if (wave1) wave1.setAttribute('fill', waveColor);
  if (wave2) wave2.setAttribute('fill', liquidColor);

  // 液体高度：按咖啡因+糖分综合计算，最高到 90%
  const total = today.length;
  const maxCups = 8; // 8杯封顶
  const pct = Math.min(total / maxCups, 1);
  // y 从 155 (满) 到 155 (空: pct=0)
  const baseY = 155;
  const maxRise = 72;
  const liquidY = baseY - (maxRise * pct);

  if (liquid) {
    liquid.setAttribute('y', liquidY);
    liquid.setAttribute('height', baseY - liquidY + 10);
  }
  // 更新波浪位置
  if (wave1) wave1.setAttribute('d', 'M30,' + (liquidY + 5) + ' Q45,' + (liquidY - 1) + ' 60,' + (liquidY + 5) + ' Q75,' + (liquidY + 11) + ' 90,' + (liquidY + 5) + ' Q105,' + (liquidY - 1) + ' 112,' + (liquidY + 5));
  if (wave2) wave2.setAttribute('d', 'M28,' + (liquidY + 10) + ' Q45,' + (liquidY + 16) + ' 62,' + (liquidY + 10) + ' Q79,' + (liquidY + 4) + ' 96,' + (liquidY + 10) + ' Q108,' + (liquidY + 14) + ' 114,' + (liquidY + 10));

  // 冰块显示/隐藏（只有冷饮才显示）
  const hasIced = today.some(r => r.ice !== '热饮');
  const ice1 = document.getElementById('cupIce1');
  const ice2 = document.getElementById('cupIce2');
  if (ice1) ice1.style.display = hasIced ? '' : 'none';
  if (ice2) ice2.style.display = hasIced ? '' : 'none';
}

function todayRecords() {
  const today = new Date().toISOString().slice(0, 10);
  return records.filter(r => r.ts && r.ts.slice(0, 10) === today);
}
function todayCaffeine() { return todayRecords().reduce((s, r) => s + (r.c || 0), 0); }
function todaySugar()    { return todayRecords().reduce((s, r) => s + (r.s || 0), 0); }

/* ---------- 页面切换 ---------- */
function switchPage(page) {
  console.log('切换到页面:', page);
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  renderPage(page);
}

function renderPage(page) {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.classList.remove('main-content');
  void main.offsetWidth;
  main.classList.add('main-content');

  switch (page) {
    case 'home': renderHome(main); break;
    case 'stats': renderStats(main); break;
    case 'profile': renderProfile(main); break;
  }
  updateRings();

  // 入场动画：对子元素逐个添加 animated-in
  const items = main.querySelectorAll('.anim-item');
  items.forEach(function(el, i) {
    el.style.animationDelay = (i * 60) + 'ms';
    el.classList.add('animated-in');
  });
}

/* ---------- 主页 ---------- */
function renderHome(main) {
  const today = todayRecords();
  const quote = getDailyQuote();

  let html = `
    <!-- 每日寄语 -->
    <div class="anim-item daily-quote">
      <span class="daily-quote-icon">💬</span>
      <span class="daily-quote-text">${esc(quote)}</span>
    </div>

    <div class="anim-item section-header">
      <span class="section-title">今日记录</span>
      <span class="section-count">${today.length} 杯</span>
    </div>`;

  if (today.length === 0) {
    html += `<div class="anim-item empty-state">
      <div class="empty-icon">☕</div>
      <div class="empty-text">今天还没记一杯呢</div>
      <div class="empty-hint">点击右下角 + 按钮快速记录</div>
    </div>`;
  }

  today.forEach(function(r, i) {
    html += '<div class="anim-item">' + recordItemHtml(r) + '</div>';
  });

  const older = records.filter(r => !todayRecords().includes(r)).slice(0, 15);
  if (older.length > 0) {
    html += `<div class="anim-item section-header" style="margin-top:24px">
      <span class="section-title">更早记录</span>
      <span class="section-count">${older.length}+ 杯</span>
    </div>`;
    older.forEach(function(r) {
      html += '<div class="anim-item">' + recordItemHtml(r) + '</div>';
    });
  }
  main.innerHTML = html;
}

function recordItemHtml(r) {
  const icon = r.t === 'COFFEE' ? '☕' : '🧋';
  const img = r.image
    ? '<img src="' + r.image + '" class="record-thumb" alt="' + esc(r.n) + '" style="width:42px;height:42px;border-radius:6px;object-fit:cover;margin-right:8px;flex-shrink:0">'
    : '<div class="record-icon">' + icon + '</div>';
  return `
    <div class="record-item">
      ${img}
      <div class="record-info">
        <div class="record-name">${esc(r.n)}</div>
        <div class="record-tags">
          <span class="tag">${esc(r.sugar)}</span>
          <span class="tag">${esc(r.ice)}</span>
          <span class="tag price-tag">¥${r.p}</span>
        </div>
        <div class="record-meta">
          <span>${r.c}mg</span>
          <span>${r.s}g糖</span>
          <span>${fmtTime(r.ts)}</span>
        </div>
      </div>
      <button class="btn-delete" data-id="${r.id}">✕</button>
    </div>`;
}

// 主页上的删除按钮 - 使用事件委托
document.getElementById('mainContent').addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-delete');
  if (btn && btn.dataset.id) {
    e.stopPropagation();
    confirmDelete(btn.dataset.id);
  }
});

/* ---------- 快捷记录 ---------- */
function quickFavorite() {
  if (!selectedFav) return;
  const r = makeRecord(selectedFav.t, selectedFav.n, selectedFav.sugar, selectedFav.ice,
                       selectedFav.c, selectedFav.s, selectedFav.p);
  records.unshift(r);
  saveRecords();
  updateRings();
  if (currentPage === 'home') renderPage('home');
  const hour = new Date().getHours();
  const msg = (r.t === 'COFFEE' && hour >= 20)
    ? '🌙 晚8点后喝咖啡可能影响睡眠哦'
    : `干杯！已记录 ${r.n} 🎉`;
  toast(msg);
}

/* ---------- 记录弹窗 Sheet ---------- */
function openRecordSheet() {
  resetRecState();
  const body = document.getElementById('recordSheetBody');
  if (body) renderRecordToContainer(body);
  document.getElementById('recordSheet').classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // 防止滚动穿透
}
function closeRecordSheet() {
  document.getElementById('recordSheet').classList.add('hidden');
  document.body.style.overflow = '';
}

function makeRecord(t, n, sugar, ice, c, s, p, img) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    t, n, sugar, ice, c, s, p,
    image: img || '',
    isTemplate: false,
    ts: new Date().toISOString()
  };
}

/* ---------- 删除确认 ---------- */
function confirmDelete(id) {
  confirmCallback = function() { deleteRecord(id); };
  document.getElementById('confirmModal').classList.remove('hidden');
}
function hideModal() {
  document.getElementById('confirmModal').classList.add('hidden');
  confirmCallback = null;
}
function deleteRecord(id) {
  records = records.filter(r => r.id !== id);
  saveRecords();
  updateRings();
  renderPage(currentPage);
  toast('已删除');
}

/* ---------- 记录页 ---------- */
let recState = null;
function resetRecState() {
  recState = {
    type: 'COFFEE', preset: null, customName: '',
    sugarIdx: 1, iceIdx: 0, caffeine: '', sugar: '', price: '', showCustom: false,
    image: '', imageProcessing: false
  };
}
resetRecState();

function renderRecordToContainer(container) {
  if (!container) return;
  const presets = PRESETS[recState.type] || PRESETS['COFFEE'];
  let chips = presets.map(function(p) {
    const active = recState.preset && recState.preset.n === p.n;
    return '<button class="preset-chip ' + (active ? 'active' : '') + '" data-preset="' + p.n + '">' + p.n + '</button>';
  }).join('');
  chips += '<button class="preset-chip custom" data-action="custom">✎ 自定义</button>';

  const name = recState.showCustom ? recState.customName : (recState.preset ? recState.preset.n : '');
  const disabled = !name || !recState.price;

  container.innerHTML = `
    <!-- 贴纸预览区 -->
    <div class="sticker-area" id="stickerArea">
      <input type="file" id="photoInput" accept="image/*" capture="environment" style="display:none">
      ${recState.image ? `
        <div class="sticker-preview">
          <img src="${recState.image}" alt="预览" id="stickerPreviewImg">
          ${recState.imageProcessing ? '<div class="sticker-loading-overlay"><div class="sticker-spinner"></div><span>智能抠图中...</span></div>' : ''}
        </div>
      ` : `
        <div class="sticker-placeholder">
          <span class="sticker-camera-icon">📷</span>
          <span class="sticker-hint">拍照 / 上传</span>
          <span class="sticker-sub-hint">AI 自动抠图</span>
        </div>
      `}
    </div>

    <div class="form-section">
      <div class="form-label">饮品类型</div>
      <div class="type-row">
        <div class="type-card ${recState.type==='COFFEE'?'active':''}" data-type="COFFEE">
          <span class="type-icon">☕</span><span class="type-label">咖啡</span><span class="type-desc">Coffee</span>
        </div>
        <div class="type-card ${recState.type==='MILK_TEA'?'active':''}" data-type="MILK_TEA">
          <span class="type-icon">🧋</span><span class="type-label">奶茶</span><span class="type-desc">Milk Tea</span>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">常见饮品</div>
      <div class="preset-grid" id="presetGrid">${chips}</div>
    </div>

    ${recState.showCustom ? `
      <div class="form-section">
        <div class="form-label">饮品名称</div>
        <input class="input-field" id="customNameInput" placeholder="如：自制特调" value="${esc(recState.customName)}">
      </div>` : ''}

    <div class="form-section">
      <div class="form-label">糖度 & 冰度</div>
      <div class="picker-row">
        <div class="picker-col">
          <div class="picker-title">糖度</div>
          <div class="picker-card" id="sugarPicker">${SUGAR_OPTS.map(function(o,i){
            return '<div class="picker-option ' + (recState.sugarIdx===i?'active':'') + '" data-idx="' + i + '">' + o + '<span class="picker-check">✓</span></div>';
          }).join('')}</div>
        </div>
        <div class="picker-col">
          <div class="picker-title">冰度</div>
          <div class="picker-card" id="icePicker">${ICE_OPTS.map(function(o,i){
            return '<div class="picker-option ' + (recState.iceIdx===i?'active':'') + '" data-idx="' + i + '">' + o + '<span class="picker-check">✓</span></div>';
          }).join('')}</div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">营养成分</div>
      <div class="input-row">
        <div class="input-group">
          <div class="input-label">咖啡因 (mg)</div>
          <input class="input-field" id="caffeineInput" type="number" placeholder="0" value="${recState.caffeine}">
        </div>
        <div class="input-group">
          <div class="input-label">糖分 (g)</div>
          <input class="input-field" id="sugarInput" type="number" placeholder="0" value="${recState.sugar}">
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">价格</div>
      <div class="input-prefix">
        <span class="prefix">¥</span>
        <input class="input-field" id="priceInput" type="number" placeholder="0" value="${recState.price}">
      </div>
    </div>

    <button class="btn-record" ${disabled?'disabled':''} id="submitBtn">🌿 干杯！记一杯</button>
  `;

  bindRecordEvents();
  syncRecordUI();
}

function syncRecordUI() {
  const name = recState.showCustom ? recState.customName : (recState.preset ? recState.preset.n : '');
  const valid = !!(name && recState.price);

  // 提交按钮
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    if (valid) { submitBtn.removeAttribute('disabled'); }
    else { submitBtn.setAttribute('disabled', ''); }
  }

  // 名称预览
  let preview = document.getElementById('namePreview');
  if (name) {
    if (!preview) {
      preview = document.createElement('div');
      preview.id = 'namePreview';
      preview.className = 'drink-name-preview';
      const sections = document.querySelectorAll('#mainContent .form-section');
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        lastSection.parentNode.insertBefore(preview, lastSection.nextSibling);
      }
    }
    preview.textContent = name;
  } else {
    if (preview) preview.remove();
  }

  // 设快捷记录按钮
  let favBtn = document.getElementById('setFavBtn');
  if (name) {
    if (!favBtn) {
      favBtn = document.createElement('button');
      favBtn.id = 'setFavBtn';
      favBtn.className = 'btn-set-fav';
      favBtn.textContent = '⭐ 设为快捷记录';
      favBtn.addEventListener('click', function(e) {
        e.preventDefault();
        setFavorite();
      });
      if (submitBtn && submitBtn.parentNode) {
        submitBtn.parentNode.insertBefore(favBtn, submitBtn.nextSibling);
      }
    }
  } else {
    if (favBtn) favBtn.remove();
  }
}

function bindRecordEvents() {
  // 类型切换
  document.querySelectorAll('.type-card').forEach(function(el) {
    el.addEventListener('click', function() {
      recState.type = this.dataset.type;
      recState.preset = null;
      recState.showCustom = false;
      recState.customName = '';
      recState.caffeine = '';
      recState.sugar = '';
      recState.price = '';
      renderRecordToContainer(document.getElementById('recordSheetBody'));
    });
  });

  // 饮品预设
  document.querySelectorAll('.preset-chip').forEach(function(el) {
    el.addEventListener('click', function() {
      if (this.dataset.action === 'custom') {
        recState.showCustom = true;
        recState.preset = null;
        recState.customName = '';
        recState.caffeine = '';
        recState.sugar = '';
        recState.price = '';
      } else {
        selectPreset(this.dataset.preset);
        return;
      }
      renderRecordToContainer(document.getElementById('recordSheetBody'));
    });
  });

  // 糖度
  const sp = document.getElementById('sugarPicker');
  if (sp) {
    sp.querySelectorAll('.picker-option').forEach(function(el) {
      el.addEventListener('click', function() {
        recState.sugarIdx = parseInt(this.dataset.idx);
        renderRecordToContainer(document.getElementById('recordSheetBody'));
      });
    });
  }

  // 冰度
  const ip = document.getElementById('icePicker');
  if (ip) {
    ip.querySelectorAll('.picker-option').forEach(function(el) {
      el.addEventListener('click', function() {
        recState.iceIdx = parseInt(this.dataset.idx);
        renderRecordToContainer(document.getElementById('recordSheetBody'));
      });
    });
  }

  // 输入框同步 — 动态更新按钮状态，不重渲染（避免失焦）
  ['customNameInput','caffeineInput','sugarInput','priceInput'].forEach(function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function() {
      if (id === 'customNameInput') recState.customName = this.value;
      if (id === 'caffeineInput') recState.caffeine = this.value;
      if (id === 'sugarInput') recState.sugar = this.value;
      if (id === 'priceInput') recState.price = this.value;
      syncRecordUI();
    });
  });

  // 贴纸区点击 → 触发文件选择
  const stickerArea = document.getElementById('stickerArea');
  const photoInput = document.getElementById('photoInput');
  if (stickerArea && photoInput) {
    stickerArea.addEventListener('click', function(e) {
      e.preventDefault();
      photoInput.click();
    });
    photoInput.addEventListener('change', async function() {
      const file = this.files && this.files[0];
      if (!file) return;

      // 显示原图
      const reader = new FileReader();
      reader.onload = function(ev) {
        recState.image = ev.target.result;
        recState.imageProcessing = true;
        renderRecordToContainer(document.getElementById('recordSheetBody'));
        // 异步抠图
        startImageSegmentation(file);
      };
      reader.readAsDataURL(file);
    });
  }

  async function startImageSegmentation(file) {
    try {
      const mod = await import('./utils/imageProcessor.js');
      const base64 = await mod.removeBackgroundFromFile(file);
      recState.image = base64;
      toast('抠图完成 ✅');
    } catch (e) {
      console.warn('抠图失败，保留原图:', e.message);
      // image 已设为原图，直接保留
    } finally {
      recState.imageProcessing = false;
      var body = document.getElementById('recordSheetBody');
      if (body) renderRecordToContainer(body);
    }
  }

  // 提交按钮（记录页）
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      submitRecord();
    });
  }
}

function selectPreset(name) {
  recState.showCustom = false;
  recState.customName = '';
  const presets = PRESETS[recState.type] || PRESETS['COFFEE'];
  const p = presets.find(function(x) { return x.n === name; });
  if (p) {
    recState.preset = p;
    recState.caffeine = '' + p.c;
    recState.sugar = '' + p.s;
    recState.price = '' + p.p;
  }
  renderRecordToContainer(document.getElementById('recordSheetBody'));
}

function renderRecord(main) {
  // 兼容旧调用，重定向到弹窗
  renderRecordToContainer(main);
}

function submitRecord() {
  const name = recState.showCustom ? recState.customName : (recState.preset ? recState.preset.n : '');
  if (!name || !recState.price) {
    toast('请选择饮品并填写价格');
    return;
  }
  const r = makeRecord(recState.type, name, SUGAR_OPTS[recState.sugarIdx], ICE_OPTS[recState.iceIdx],
                       +(recState.caffeine || 0), +(recState.sugar || 0), +(recState.price || 0),
                       recState.image || '');
  records.unshift(r);
  saveRecords();
  const hour = new Date().getHours();
  if (r.t === 'COFFEE' && hour >= 20) toast('🌙 晚8点后喝咖啡可能影响睡眠');
  resetRecState();
  closeRecordSheet();
  if (currentPage === 'home' || currentPage === 'stats') renderPage(currentPage);
  toast('干杯！已记录 🎉');
}

function setFavorite() {
  const name = recState.showCustom ? recState.customName : (recState.preset ? recState.preset.n : '');
  selectedFav = {
    t: recState.type, n: name,
    sugar: SUGAR_OPTS[recState.sugarIdx], ice: ICE_OPTS[recState.iceIdx],
    c: +(recState.caffeine || 0), s: +(recState.sugar || 0), p: +(recState.price || 0)
  };
  localStorage.setItem('bt_fav', JSON.stringify(selectedFav));
  updateFavBtn();
  toast('快捷记录已更新 ✅');
}

/* ---------- 统计页 ---------- */
function renderStats(main) {
  let statsTab = 0; // 0=日历, 1=账单
  let calYear, calMonth;
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth() + 1;

  function _render() {
    const wk = weeklySpending();
    const mo = monthlySpending();
    const cups = monthlyCups();
    const amount = statsTab === 0 ? mo : (statsTab === 1 ? wk : mo);

    main.innerHTML = `
      <div class="segmented">
        <button class="seg-btn ${statsTab===0?'active':''}" data-tab="0">📅 日历</button>
        <button class="seg-btn ${statsTab===1?'active':''}" data-tab="1">账单</button>
      </div>
      ${statsTab === 0 ? renderCalendarHTML(calYear, calMonth) : renderFinanceHTML(wk, mo, cups, amount)}
    `;

    document.querySelectorAll('.seg-btn').forEach(function(el) {
      el.addEventListener('click', function() {
        statsTab = parseInt(this.dataset.tab);
        _render();
      });
    });

    if (statsTab === 0) bindCalendarEvents();
    // 日详情弹窗
    const dayOverlay = document.getElementById('dayDetailOverlay');
    if (dayOverlay) {
      dayOverlay.addEventListener('click', function(e) {
        if (e.target === dayOverlay) this.classList.add('hidden');
      });
      const dayClose = document.getElementById('dayDetailClose');
      if (dayClose) dayClose.addEventListener('click', function() {
        dayOverlay.classList.add('hidden');
      });
    }
  }
  _render();
}

/* ---------- 日历 HTML ---------- */
function renderCalendarHTML(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startDow = firstDay.getDay(); // 0=Sun
  const daysInMonth = lastDay.getDate();
  const today = new Date().toISOString().slice(0, 10);

  // 当月记录按日期分组
  const dayMap = {};
  records.forEach(function(r) {
    const d = (r.ts || '').slice(0, 10);
    if (!dayMap[d]) dayMap[d] = [];
    dayMap[d].push(r);
  });

  const monthLabel = year + ' 年 ' + month + ' 月';
  const weekHead = ['日','一','二','三','四','五','六'];

  let cells = '';
  // 前置空白
  for (let i = 0; i < startDow; i++) { cells += '<div class="cal-cell cal-cell-empty"></div>'; }
  // 日期格子
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = year + '-' + String(month).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    const dayRecords = dayMap[dateStr] || [];
    const isToday = dateStr === today;
    const hasImg = dayRecords.some(function(r) { return r.image; });
    const firstImg = hasImg ? dayRecords.find(function(r) { return r.image; }) : null;
    const stickerHTML = firstImg
      ? '<img class="cal-sticker" src="' + firstImg.image + '" style="transform:rotate(' + stickerRotation(dateStr) + 'deg)" alt="">'
      : '';

    cells += '<div class="cal-cell ' + (isToday ? 'cal-today' : '') + ' ' + (dayRecords.length > 0 ? 'cal-has-records' : '') + '" data-date="' + dateStr + '">' +
      '<span class="cal-day-num">' + d + '</span>' +
      stickerHTML +
      (dayRecords.length > 0 ? '<span class="cal-dot">' + dayRecords.length + '</span>' : '') +
    '</div>';
  }

  return `
    <div class="cal-header">
      <button class="cal-nav-btn" id="calPrev">◀</button>
      <span class="cal-month-label">${monthLabel}</span>
      <button class="cal-nav-btn" id="calNext">▶</button>
    </div>
    <div class="cal-weekdays">${weekHead.map(function(w) { return '<span>' + w + '</span>'; }).join('')}</div>
    <div class="cal-grid">${cells}</div>
    <div class="cal-legend">
      <span>🖼️ 有贴纸</span>
      <span>🔵 有记录</span>
    </div>
    <!-- 日详情弹窗 -->
    <div class="day-detail-overlay hidden" id="dayDetailOverlay">
      <div class="day-detail-card" id="dayDetailCard">
        <div class="day-detail-header">
          <span class="day-detail-date" id="dayDetailDate"></span>
          <button class="day-detail-close" id="dayDetailClose">✕</button>
        </div>
        <div class="day-detail-body" id="dayDetailBody"></div>
      </div>
    </div>
  `;
}

function stickerRotation(dateStr) {
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) { seed = ((seed << 5) - seed) + dateStr.charCodeAt(i); seed |= 0; }
  return (Math.abs(seed) % 17) - 8; // -8 ~ +8
}

/* ---------- 日历事件 ---------- */
function bindCalendarEvents() {
  var calYear, calMonth;
  var labelEl = document.querySelector('.cal-month-label');
  if (labelEl) {
    var parts = labelEl.textContent.match(/(\d+).*?(\d+)/);
    if (parts) { calYear = +parts[1]; calMonth = +parts[2]; }
  }

  var prev = document.getElementById('calPrev');
  var next = document.getElementById('calNext');
  if (prev) prev.addEventListener('click', function() {
    calMonth--; if (calMonth < 1) { calMonth = 12; calYear--; }
    renderCalendarIntoContainer(calYear, calMonth);
  });
  if (next) next.addEventListener('click', function() {
    calMonth++; if (calMonth > 12) { calMonth = 1; calYear++; }
    renderCalendarIntoContainer(calYear, calMonth);
  });

  // 点击日期
  document.querySelectorAll('.cal-cell.cal-has-records').forEach(function(el) {
    el.addEventListener('click', function() {
      showDayDetail(this.dataset.date);
    });
  });
}

function renderCalendarIntoContainer(year, month) {
  var main = document.getElementById('mainContent');
  if (!main) return;

  // 保持 segmented 不动，替换后面的日历部分
  var seg = main.querySelector('.segmented');
  var after = seg ? seg.nextElementSibling : main.firstElementChild;
  var wrapper = document.createElement('div');
  wrapper.innerHTML = renderCalendarHTML(year, month);
  // 替换
  if (after) {
    while (wrapper.firstChild) { main.insertBefore(wrapper.firstChild, after); }
    while (after && after !== main.lastElementChild && after.nextElementSibling) {
      after.nextElementSibling.remove();
    }
    after.remove();
  }
  bindCalendarEvents();
}

/* ---------- 日详情弹窗 ---------- */
function showDayDetail(dateStr) {
  const dayRecords = records.filter(function(r) { return (r.ts || '').slice(0, 10) === dateStr; });
  const overlay = document.getElementById('dayDetailOverlay');
  const dateEl = document.getElementById('dayDetailDate');
  const body = document.getElementById('dayDetailBody');
  if (!overlay || !dateEl || !body) return;

  dateEl.textContent = dateStr;
  const totalC = dayRecords.reduce(function(s, r) { return s + (r.c || 0); }, 0);
  const totalS = dayRecords.reduce(function(s, r) { return s + (r.s || 0); }, 0);
  const totalP = dayRecords.reduce(function(s, r) { return s + (r.p || 0); }, 0);

  body.innerHTML = dayRecords.map(function(r) {
    return '<div class="day-detail-item">' +
      '<span class="day-detail-icon">' + (r.t === 'COFFEE' ? '☕' : '🧋') + '</span>' +
      '<div class="day-detail-info">' +
        '<div class="day-detail-name">' + esc(r.n) + '</div>' +
        '<div class="day-detail-meta">' + esc(r.sugar) + ' / ' + esc(r.ice) + ' · ¥' + r.p + '</div>' +
      '</div>' +
      '<div class="day-detail-nums">' + r.c + 'mg · ' + r.s + 'g</div>' +
    '</div>';
  }).join('') + '<div class="day-detail-summary">☕ ' + totalC + 'mg &nbsp; 🍬 ' + totalS + 'g &nbsp; 💰 ¥' + totalP.toFixed(1) + '</div>';

  overlay.classList.remove('hidden');
}

/* ---------- 账单 HTML (从统计页抽取) ---------- */
function renderFinanceHTML(wk, mo, cups, amount) {
  return `
    <div class="finance-hero">
      <div class="finance-amount">¥${amount.toFixed(1)}</div>
      <div class="finance-label">本月消费</div>
      <div class="finance-extra">共 ${cups} 杯</div>
    </div>

    <div class="motivation-card">
      <span class="mot-icon">💡</span>
      <div>
        <div class="mot-title">趣味统计</div>
        <div class="mot-text">${randomMotivation(cups)}</div>
      </div>
    </div>

    <div class="section-header"><span class="section-title">消费明细</span></div>
    ${records.slice(0, 20).map(function(r) { return `
      <div class="record-item" style="padding:10px 12px">
        <div class="record-icon">${r.t==='COFFEE'?'☕':'🧋'}</div>
        <div class="record-info">
          <div class="record-name">${esc(r.n)}</div>
          <div class="record-meta">${fmtDate(r.ts)}</div>
        </div>
        <span style="font-weight:900;color:var(--black);">¥${r.p}</span>
      </div>`; }).join('')}
  `;
}

/* ---------- 我的页 ---------- */
function renderProfile(main) {
  const t = userSettings.theme || 'apple';
  const nick = userSettings.nickname || '';
  const av = userSettings.avatar || '☕';
  const cMax = userSettings.caffeineMax || 400;
  const sMax = userSettings.sugarMax || 50;

  const AVATARS = ['☕','🧋','🍵','🥤','🧃','🍹','🫖','🥛','🍶','🍺'];
  const themes = [
    { id:'apple', name:'苹果风格',   desc:'毛玻璃·大圆角·SF字体',   swatches:['#0071E3','#F2F2F7','#1C1C1E','#34C759'] },
    { id:'neo',   name:'潮玩波普',   desc:'硬阴影·粗边框·波普亮色', swatches:['#FFD600','#FF5E8A','#00D4C8','#1A1A1A'] },
    { id:'wabi',  name:'日式侘寂',   desc:'大留白·柔阴影·衬线标题', swatches:['#6B4D3A','#FDFAF5','#8BA88A','#D9CFC0'] },
    { id:'cyber', name:'赛博朋克',   desc:'暗黑霓虹·网格底·等宽数字', swatches:['#00F0FF','#FF00E5','#0A0A0F','#39FF14'] },
  ];

  main.innerHTML = `
    <!-- 用户卡片 -->
    <div class="settings-group">
      <div class="user-card">
        <div class="user-avatar-row">
          <span class="user-avatar-large">${av}</span>
          <div class="user-avatar-picker">
            ${AVATARS.map(function(a) {
              return '<span class="avatar-chip ' + (av===a?'active':'') + '" data-avatar="' + a + '">' + a + '</span>';
            }).join('')}
          </div>
        </div>
        <div class="user-nick-row">
          <input class="input-field" id="nicknameInput" placeholder="输入昵称..." value="${esc(nick)}" maxlength="20">
        </div>
      </div>
    </div>

    <!-- 每日上限设置 -->
    <div class="settings-group">
      <div class="settings-group-title">⚖️ 每日上限</div>
      <div class="limit-row">
        <div class="limit-item">
          <span class="limit-label">☕ 咖啡因</span>
          <input class="input-field limit-input" id="caffeineMaxInput" type="number" value="${cMax}" min="50" max="2000" step="10">
          <span class="limit-unit">mg</span>
        </div>
        <div class="limit-item">
          <span class="limit-label">🍬 糖分</span>
          <input class="input-field limit-input" id="sugarMaxInput" type="number" value="${sMax}" min="10" max="500" step="5">
          <span class="limit-unit">g</span>
        </div>
      </div>
    </div>

    <!-- 主题切换 -->
    <div class="settings-group">
      <div class="settings-group-title">🎨 主题风格</div>
      <div class="theme-picker-grid">
        ${themes.map(function(th) {
          return '<div class="theme-picker-card ' + (t===th.id?'active':'') + '" data-theme="' + th.id + '">' +
            '<div class="tp-swatches">' +
              th.swatches.map(function(c) { return '<span class="tp-swatch" style="background:' + c + '"></span>'; }).join('') +
            '</div>' +
            '<div class="tp-name">' + th.name + '</div>' +
            '<div class="tp-desc">' + th.desc + '</div>' +
          '</div>';
        }).join('')}
      </div>
    </div>

    <!-- 快捷记录 -->
    <div class="settings-group">
      <div class="settings-group-title">⚡ 快捷记录</div>
      <div class="info-card">
        ${esc(selectedFav?.n||'--')}（${selectedFav?.sugar||''}/${selectedFav?.ice||''} ¥${selectedFav?.p||0}）
        <button id="resetFavBtn" style="margin-left:12px;font-size:12px;background:none;border:none;cursor:pointer;text-decoration:underline;font-family:inherit;color:inherit;">重置默认</button>
      </div>
    </div>

    <!-- 数据备份 -->
    <div class="settings-group">
      <div class="settings-group-title">💾 数据管理</div>
      <div class="backup-row">
        <button class="btn-set-fav" id="exportBtn">📤 导出 JSON</button>
        <button class="btn-set-fav" id="importBtn">📥 导入 JSON</button>
        <input type="file" id="importFileInput" accept=".json" style="display:none">
      </div>
    </div>

    <!-- 页脚 -->
    <div class="profile-footer">
      <div class="pf-name">半糖主义 BANTANG</div>
      <div class="pf-version">v1.3.0</div>
      <div class="pf-thanks">❤️ 记录每一杯咖啡与奶茶<br>感谢开源社区的贡献</div>
    </div>
  `;

  // 头像选择
  document.querySelectorAll('.avatar-chip').forEach(function(el) {
    el.addEventListener('click', function() {
      userSettings.avatar = this.dataset.avatar;
      saveSettings();
    });
  });
  // 昵称
  var nickInput = document.getElementById('nicknameInput');
  if (nickInput) {
    nickInput.addEventListener('input', function() {
      userSettings.nickname = this.value;
      saveSettings();
    });
  }
  // 上限
  var cInput = document.getElementById('caffeineMaxInput');
  var sInput = document.getElementById('sugarMaxInput');
  if (cInput) cInput.addEventListener('change', function() {
    userSettings.caffeineMax = parseInt(this.value) || 400;
    saveSettings();
  });
  if (sInput) sInput.addEventListener('change', function() {
    userSettings.sugarMax = parseInt(this.value) || 50;
    saveSettings();
  });
  // 主题
  document.querySelectorAll('.theme-picker-card').forEach(function(el) {
    el.addEventListener('click', function() {
      var theme = this.dataset.theme;
      applyTheme(theme);
      renderProfile(document.getElementById('mainContent'));
    });
  });
  // 快捷记录重置
  var resetBtn = document.getElementById('resetFavBtn');
  if (resetBtn) resetBtn.addEventListener('click', function() {
    resetFav();
    renderProfile(document.getElementById('mainContent'));
  });
  // 导出
  var exportBtn = document.getElementById('exportBtn');
  if (exportBtn) exportBtn.addEventListener('click', function() {
    var data = JSON.stringify({
      version: '1.3.0',
      exportedAt: new Date().toISOString(),
      settings: userSettings,
      records: records,
      fav: selectedFav,
    }, null, 2);
    var blob = new Blob([data], {type:'application/json'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bantang-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    toast('导出成功 ✅');
  });
  // 导入
  var importBtn = document.getElementById('importBtn');
  var importInput = document.getElementById('importFileInput');
  if (importBtn && importInput) {
    importBtn.addEventListener('click', function() { importInput.click(); });
    importInput.addEventListener('change', function() {
      var file = this.files && this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        try {
          var data = JSON.parse(ev.target.result);
          if (data.records) { records = data.records; saveRecords(); }
          if (data.settings) { Object.assign(userSettings, data.settings); saveSettings(); }
          if (data.fav) { selectedFav = data.fav; localStorage.setItem('bt_fav', JSON.stringify(selectedFav)); updateFavBtn(); }
          renderProfile(document.getElementById('mainContent'));
          updateRings();
          toast('导入成功 ✅ 共 ' + (data.records ? data.records.length : 0) + ' 条记录');
        } catch(e) {
          toast('导入失败：文件格式错误 ❌');
        }
      };
      reader.readAsText(file);
    });
  }
}

function weeklySpending() {
  const now = new Date();
  const day = now.getDay();
  const mon = new Date(now); mon.setDate(now.getDate() - (day === 0 ? 6 : day - 1)); mon.setHours(0,0,0,0);
  return records.filter(function(r) { return new Date(r.ts) >= mon; }).reduce(function(s, r) { return s + (r.p || 0); }, 0);
}
function monthlySpending() {
  const now = new Date();
  return records.filter(function(r) {
    const d = new Date(r.ts);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce(function(s, r) { return s + (r.p || 0); }, 0);
}
function monthlyCups() {
  const now = new Date();
  return records.filter(function(r) {
    const d = new Date(r.ts);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}
function randomMotivation(cups) {
  const msgs = [
    '本月已喝 ' + cups + ' 杯，享受每一杯 ☕️',
    '少喝5杯，省下的钱够买一支口红 💄',
    '少喝5杯，省下的钱够买一个游戏皮肤 🎮',
    '少喝3杯，就是一顿火锅的钱 🍲',
    '控制咖啡因摄入，健康第一 💪',
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

/* ---------- 设置（已合并到我的页）---------- */
// renderSettings 已弃用，内容合并到 renderProfile

function resetFav() {
  selectedFav = { t:'COFFEE', n:'生椰拿铁', sugar:'三分糖', ice:'去冰', c:200, s:15, p:22 };
  localStorage.setItem('bt_fav', JSON.stringify(selectedFav));
  updateFavBtn();
  toast('已重置为默认');
}

/* ---------- 每日寄语 ---------- */
function getDailyQuote() {
  // 基于当日日期 (YYYY-MM-DD) 确定性选择，同一天不会变
  const today = new Date().toISOString().slice(0, 10);
  let seed = 0;
  for (let i = 0; i < today.length; i++) { seed = ((seed << 5) - seed) + today.charCodeAt(i); seed |= 0; }
  const idx = Math.abs(seed) % DAILY_QUOTES.length;
  return DAILY_QUOTES[idx];
}

/* ---------- 工具 ---------- */
function esc(s) {
  s = String(s || '');
  return s.replace(/[&<>"]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '"') return '&quot;';
    return m;
  });
}
function fmtTime(ts) { try { return new Date(ts).toLocaleTimeString('zh-CN', {hour:'2-digit',minute:'2-digit'}); } catch(e) { return ''; } }
function fmtDate(ts)  { try { return new Date(ts).toLocaleDateString('zh-CN', {month:'short',day:'numeric'}); } catch(e) { return ''; } }
function toast(msg, dur) {
  dur = dur || 2000;
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(el._tid);
  el._tid = setTimeout(function() { el.classList.add('hidden'); }, dur);
}
