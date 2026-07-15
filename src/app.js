// ═══════════════════════════════════════
//  半糖主义 PWA — 完整 JS (修复版)
// ═══════════════════════════════════════

/* ---------- 常量 ---------- */
const CAFFEINE_MAX = 400;
const SUGAR_MAX = 50;
const RING_R = 48;
const CIRCUMFERENCE = Math.PI * RING_R * 2;

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
const SUGAR_OPTS = ['无糖','三分糖','五分糖','七分糖','全糖'];
const ICE_OPTS   = ['去冰','少冰','正常冰','多冰','热饮'];

/* ---------- 全局状态 ---------- */
let currentPage = 'home';
let records = [];
let selectedFav = null;
let confirmCallback = null;

/* ---------- 初始化 ---------- */
(function init() {
  loadRecords();
  loadFav();
  loadTheme();
  ringInit();
  updateRings();
  renderPage('home');
  bindEvents();
  console.log('半糖主义 PWA 初始化完成');
})();

function bindEvents() {
  // 底部导航 — 使用更可靠的事件绑定
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.dataset.page;
      console.log('导航点击:', page);
      switchPage(page);
    });
  });
  // 快捷记录按钮
  const favBtn = document.getElementById('favBtn');
  if (favBtn) {
    favBtn.addEventListener('click', function(e) {
      e.preventDefault();
      quickFavorite();
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
  const t = localStorage.getItem('bt_theme') || 'apple';
  applyTheme(t);
}
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('bt_theme', t);
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
  const cPct = Math.min(c / CAFFEINE_MAX, 1);
  const sPct = Math.min(s / SUGAR_MAX, 1);

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

  // 警告
  const cwarn = document.getElementById('caffeineWarning');
  if (cwarn) {
    cwarn.classList.toggle('hidden', c <= CAFFEINE_MAX);
    if (c > CAFFEINE_MAX) cwarn.classList.add('alert-pulse');
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
    case 'record': renderRecord(main); break;
    case 'finance': renderFinance(main); break;
    case 'settings': renderSettings(main); break;
  }
  updateRings();
}

/* ---------- 主页 ---------- */
function renderHome(main) {
  const today = todayRecords();
  let html = `
    <div class="section-header">
      <span class="section-title">今日记录</span>
      <span class="section-count">${today.length} 杯</span>
    </div>`;

  if (today.length === 0) {
    html += `<div class="empty-state">
      <div class="empty-icon">☕</div>
      <div class="empty-text">今天还没记一杯呢</div>
      <div class="empty-hint">点下方「记录」或「快捷记录」快速记录</div>
    </div>`;
  }

  today.forEach(r => { html += recordItemHtml(r); });

  const older = records.filter(r => !todayRecords().includes(r)).slice(0, 15);
  if (older.length > 0) {
    html += `<div class="section-header" style="margin-top:24px">
      <span class="section-title">更早记录</span>
      <span class="section-count">${older.length}+ 杯</span>
    </div>`;
    older.forEach(r => { html += recordItemHtml(r); });
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

function renderRecord(main) {
  const presets = PRESETS[recState.type] || PRESETS['COFFEE'];
  let chips = presets.map(function(p) {
    const active = recState.preset && recState.preset.n === p.n;
    return '<button class="preset-chip ' + (active ? 'active' : '') + '" data-preset="' + p.n + '">' + p.n + '</button>';
  }).join('');
  chips += '<button class="preset-chip custom" data-action="custom">✎ 自定义</button>';

  const name = recState.showCustom ? recState.customName : (recState.preset ? recState.preset.n : '');
  const disabled = !name || !recState.price;

  main.innerHTML = `
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
      <div class="form-label">拍照抠图</div>
      <input type="file" id="photoInput" accept="image/*" capture="environment" style="display:none">
      <button class="btn-set-fav" id="photoBtn" style="margin-bottom:8px">📷 拍照 / 选图（自动抠图）</button>
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
    ${recState.imageProcessing ? '<div class="info-card" style="margin-bottom:10px;text-align:center">🖼️ 正在处理图片...</div>' : ''}
    ${recState.image ? '<div class="info-card" style="margin-bottom:10px;text-align:center"><img src="' + recState.image + '" style="max-width:120px;max-height:120px;border-radius:8px;display:block;margin:0 auto"><span style="font-size:11px;color:var(--text2)">抠图预览</span></div>' : ''}
  `;

  // 绑定事件（避免 onclick 属性中的转义问题）
  bindRecordEvents();
  // 初始同步 UI（名称预览、按钮状态等）
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
      renderRecord(document.getElementById('mainContent'));
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
        return; // selectPreset 内部重新渲染
      }
      renderRecord(document.getElementById('mainContent'));
    });
  });

  // 糖度
  const sp = document.getElementById('sugarPicker');
  if (sp) {
    sp.querySelectorAll('.picker-option').forEach(function(el) {
      el.addEventListener('click', function() {
        recState.sugarIdx = parseInt(this.dataset.idx);
        renderRecord(document.getElementById('mainContent'));
      });
    });
  }

  // 冰度
  const ip = document.getElementById('icePicker');
  if (ip) {
    ip.querySelectorAll('.picker-option').forEach(function(el) {
      el.addEventListener('click', function() {
        recState.iceIdx = parseInt(this.dataset.idx);
        renderRecord(document.getElementById('mainContent'));
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

  // 拍照按钮
  const photoInput = document.getElementById('photoInput');
  const photoBtn = document.getElementById('photoBtn');
  if (photoBtn && photoInput) {
    photoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      photoInput.click();
    });
    photoInput.addEventListener('change', async function() {
      const file = this.files && this.files[0];
      if (!file) return;
      // 先显示原图预览
      const reader = new FileReader();
      reader.onload = function(ev) {
        recState.image = ev.target.result;
        renderRecord(document.getElementById('mainContent'));
      };
      reader.readAsDataURL(file);

      // 尝试抠图
      recState.imageProcessing = true;
      renderRecord(document.getElementById('mainContent'));
      try {
        const mod = await import('./utils/imageProcessor.js');
        const base64 = await mod.removeBackgroundFromFile(file);
        recState.image = base64;
        recState.imageProcessing = false;
        renderRecord(document.getElementById('mainContent'));
        toast('抠图完成 ✅');
      } catch (e) {
        console.warn('抠图失败，使用原图:', e.message);
        // 抠图失败则保留原图
        recState.imageProcessing = false;
        renderRecord(document.getElementById('mainContent'));
      }
    });
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
  renderRecord(document.getElementById('mainContent'));
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
  switchPage('home');
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

/* ---------- 账单 ---------- */
let financeTab = 0;
function renderFinance(main) {
  const wk = weeklySpending();
  const mo = monthlySpending();
  const cups = monthlyCups();
  const amount = financeTab === 0 ? wk : mo;

  main.innerHTML = `
    <div class="segmented">
      <button class="seg-btn ${financeTab===0?'active':''}" data-tab="0">本周</button>
      <button class="seg-btn ${financeTab===1?'active':''}" data-tab="1">本月</button>
    </div>

    <div class="finance-hero">
      <div class="finance-amount">¥${amount.toFixed(1)}</div>
      <div class="finance-label">${financeTab===0?'本周':'本月'}消费</div>
      <div class="finance-extra">${financeTab===1 ? '共 ' + cups + ' 杯' : ''}</div>
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

  // 绑定分段切换
  document.querySelectorAll('.seg-btn').forEach(function(el) {
    el.addEventListener('click', function() {
      financeTab = parseInt(this.dataset.tab);
      renderFinance(document.getElementById('mainContent'));
    });
  });
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

/* ---------- 设置 ---------- */
function renderSettings(main) {
  const t = localStorage.getItem('bt_theme') || 'apple';

  const themes = [
    { id:'apple', name:'苹果风格',   desc:'毛玻璃·大圆角·SF字体',   swatches:['#0071E3','#F2F2F7','#1C1C1E','#34C759'] },
    { id:'neo',   name:'潮玩波普',   desc:'硬阴影·粗边框·波普亮色', swatches:['#FFD600','#FF5E8A','#00D4C8','#1A1A1A'] },
    { id:'wabi',  name:'日式侘寂',   desc:'大留白·柔阴影·衬线标题', swatches:['#6B4D3A','#FDFAF5','#8BA88A','#D9CFC0'] },
    { id:'cyber', name:'赛博朋克',   desc:'暗黑霓虹·网格底·等宽数字', swatches:['#00F0FF','#FF00E5','#0A0A0F','#39FF14'] },
  ];

  main.innerHTML = `
    <div class="settings-group">
      <div class="settings-group-title">主题风格</div>
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

    <div class="settings-group">
      <div class="settings-group-title">快捷记录</div>
      <div class="info-card">
        ⚡ ${esc(selectedFav?.n||'--')}（${selectedFav?.sugar||''}/${selectedFav?.ice||''} ¥${selectedFav?.p||0}）
        <button id="resetFavBtn" style="margin-left:12px;font-size:12px;background:none;border:none;cursor:pointer;text-decoration:underline;font-family:inherit;color:inherit;">重置默认</button>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-group-title">健康提醒</div>
      <div class="info-card">☕ 每日咖啡因上限 400mg<br>🍬 每日糖分上限 50g<br>🌙 晚上8点后喝咖啡可能影响睡眠</div>
    </div>

    <div class="settings-group">
      <div class="settings-group-title">关于</div>
      <div class="info-card">半糖主义 v1.2<br>记录每一杯咖啡与奶茶</div>
    </div>
  `;

  // 绑定主题切换事件
  document.querySelectorAll('.theme-picker-card').forEach(function(el) {
    el.addEventListener('click', function() {
      const theme = this.dataset.theme;
      applyTheme(theme);
      renderSettings(document.getElementById('mainContent'));
    });
  });

  // 绑定重置快捷记录
  const resetBtn = document.getElementById('resetFavBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      resetFav();
      renderSettings(document.getElementById('mainContent'));
    });
  }
}

function resetFav() {
  selectedFav = { t:'COFFEE', n:'生椰拿铁', sugar:'三分糖', ice:'去冰', c:200, s:15, p:22 };
  localStorage.setItem('bt_fav', JSON.stringify(selectedFav));
  updateFavBtn();
  toast('已重置为默认');
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
