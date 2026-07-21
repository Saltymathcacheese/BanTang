(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(i){if(i.ep)return;i.ep=!0;const c=n(i);fetch(i.href,c)}})();const ie="modulepreload",ae=function(e,t){return new URL(e,t).href},Y={},se=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let o=function(f){return Promise.all(f.map(r=>Promise.resolve(r).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const l=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),u=d?.nonce||d?.getAttribute("nonce");i=o(n.map(f=>{if(f=ae(f,a),f in Y)return;Y[f]=!0;const r=f.endsWith(".css"),p=r?'[rel="stylesheet"]':"";if(!!a)for(let B=l.length-1;B>=0;B--){const g=l[B];if(g.href===f&&(!r||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${p}`))return;const b=document.createElement("link");if(b.rel=r?"stylesheet":ie,r||(b.as="script"),b.crossOrigin="",b.href=f,u&&b.setAttribute("nonce",u),document.head.appendChild(b),r)return new Promise((B,g)=>{b.addEventListener("load",B),b.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${f}`)))})}))}function c(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&c(l.reason);return t().catch(c)})},ce=48,$=Math.PI*ce*2;let h={caffeineMax:400,sugarMax:50,nickname:"",avatar:"☕",theme:"apple"};const T={COFFEE:[{t:"COFFEE",n:"美式咖啡",c:150,s:0,p:18},{t:"COFFEE",n:"拿铁",c:160,s:10,p:20},{t:"COFFEE",n:"生椰拿铁",c:200,s:15,p:22},{t:"COFFEE",n:"柠檬美式",c:160,s:5,p:20},{t:"COFFEE",n:"燕麦拿铁",c:180,s:10,p:24},{t:"COFFEE",n:"卡布奇诺",c:160,s:12,p:20},{t:"COFFEE",n:"摩卡",c:170,s:20,p:25},{t:"COFFEE",n:"冷萃咖啡",c:200,s:0,p:26},{t:"COFFEE",n:"澳白",c:210,s:8,p:25},{t:"COFFEE",n:"手冲咖啡",c:180,s:0,p:30}],MILK_TEA:[{t:"MILK_TEA",n:"波霸奶茶",c:100,s:28,p:15},{t:"MILK_TEA",n:"四季春茶",c:80,s:16,p:10},{t:"MILK_TEA",n:"抹茶拿铁",c:120,s:18,p:18},{t:"MILK_TEA",n:"芋泥啵啵",c:60,s:22,p:16},{t:"MILK_TEA",n:"杨枝甘露",c:50,s:25,p:18},{t:"MILK_TEA",n:"黑糖珍珠奶茶",c:90,s:30,p:16},{t:"MILK_TEA",n:"柠檬茶",c:40,s:20,p:12},{t:"MILK_TEA",n:"芝士奶盖茶",c:100,s:24,p:20}]},U=["今天也是需要咖啡因续命的一天 ☕️","来杯无糖奶茶，四舍五入等于没喝 🧋","生活太苦？记得给自己加点糖 🍬","一杯冰美式，清醒地面对这个世界 ❄️","奶茶是液体的拥抱，温柔且治愈 🫂","咖啡是成年人白天的酒精，微醺不醉 🥃","三分糖的克制，是对生活的温柔妥协 ✨","少冰去糖，成年人最后的倔强 💪","没有什么是一杯咖啡解决不了的，如果有，就两杯 ☕️☕️","今天的快乐是奶茶给的，明天的体重明天再说 🎈","喝咖啡的人不一定是艺术家，但一定很困 😴","热饮暖手，冷饮沁心，都是生活的温度 🌡️","每一杯澳白，都是对庸常生活的优雅反击 🎯","手冲咖啡的仪式感，是对自己的最高礼遇 🫖","低卡糖 + 燕麦奶，自律和放纵的完美平衡 ⚖️","下午三点的奶茶，是打工人给自己发的勋章 🏅","拉花很丑没关系，味道对了就是好咖啡 🤎","人生就像抹茶拿铁，苦中带甜才够味 🍵"],H=["无糖","三分糖","五分糖","七分糖","全糖"],j=["去冰","少冰","正常冰","多冰","热饮"];let L="home",E=[],y=null,R=null;(function(){oe(),de(),re(),W(),ue(),M(),D("home"),z("home"),le(),console.log("半糖主义 PWA 初始化完成")})();function oe(){try{var e=JSON.parse(localStorage.getItem("bt_settings"));e&&Object.assign(h,e)}catch{}}function A(){localStorage.setItem("bt_settings",JSON.stringify(h)),W(),M(),(L==="home"||L==="profile")&&D(L)}function le(){document.querySelectorAll(".nav-item").forEach(o=>{o.addEventListener("click",function(l){l.preventDefault();const d=this.dataset.page;console.log("导航点击:",d),ve(d)})});const e=document.getElementById("favBtn");e&&e.addEventListener("click",function(o){o.preventDefault(),ye()});const t=document.getElementById("fabRecordBtn");t&&t.addEventListener("click",function(o){o.preventDefault(),X()});const n=document.getElementById("recordSheetClose");n&&n.addEventListener("click",function(o){o.preventDefault(),N()});const a=document.getElementById("recordSheet");a&&a.addEventListener("click",function(o){o.target===a&&N()});const i=document.getElementById("modalCancel"),c=document.getElementById("modalConfirm");i&&i.addEventListener("click",Q),c&&c.addEventListener("click",function(){R&&R(),Q()})}function de(){try{E=JSON.parse(localStorage.getItem("bt_records")||"[]")}catch{E=[]}console.log("加载记录:",E.length,"条")}function P(){localStorage.setItem("bt_records",JSON.stringify(E)),console.log("保存记录:",E.length,"条")}function re(){try{y=JSON.parse(localStorage.getItem("bt_fav"))}catch{y=null}y||(y={t:"COFFEE",n:"生椰拿铁",sugar:"三分糖",ice:"去冰",c:200,s:15,p:22}),q()}function q(){const e=document.getElementById("favBtn");if(!e||!y)return;const t=e.querySelector(".fav-text");t&&(t.textContent=`快捷记录 — ${y.n}（${y.sugar}/${y.ice} ¥${y.p}）`)}function W(){G(h.theme||"apple")}function G(e){var t=["apple","neo","wabi","cyber","matcha","taro","night"];t.indexOf(e)===-1&&(e="apple"),h.theme=e,localStorage.setItem("bt_settings",JSON.stringify(h)),document.documentElement.setAttribute("data-theme",e);const n=document.getElementById("themeStylesheet"),a={neo:"css/themes/neo-brutalism.css",wabi:"css/themes/wabi-sabi.css",apple:"css/themes/apple-hig.css",cyber:"css/themes/cyberpunk.css",matcha:"css/themes/matcha-mint.css",taro:"css/themes/taro-purple.css",night:"css/themes/night-brew.css"};n&&a[e]&&(n.href=a[e],document.head.appendChild(n));const i=document.getElementById("metaThemeColor"),c={neo:"#FFFDF5",wabi:"#FDFAF5",apple:"#F2F2F7",cyber:"#0A0A0F",matcha:"#FFFAF2",taro:"#FFFAF8",night:"#08080C"};i&&c[e]&&(i.content=c[e]),console.log("主题切换:",e)}function ue(){document.querySelectorAll(".ring-fill").forEach(e=>{e.style.strokeDasharray=$,e.style.strokeDashoffset=$})}function M(){const e=me(),t=pe(),n=h.caffeineMax||400,a=h.sugarMax||50,i=Math.min(e/n,1),c=Math.min(t/a,1),o=document.getElementById("caffeineRing"),l=document.getElementById("sugarRing");o&&(o.style.strokeDashoffset=$*(1-i)),l&&(l.style.strokeDashoffset=$*(1-c));const d=document.getElementById("caffeineValue");d&&(d.textContent=e===Math.floor(e)?e:e.toFixed(1),d.style.color=i>=1?"var(--warn)":"var(--black)");const u=document.getElementById("sugarValue");u&&(u.textContent=t===Math.floor(t)?t:t.toFixed(1),u.style.color=c>=1?"var(--warn)":"var(--black)");var f=document.getElementById("caffeineLimitLabel");f&&(f.textContent="上限 "+n+"mg");var r=document.getElementById("sugarLimitLabel");r&&(r.textContent="上限 "+a+"g");const p=document.getElementById("caffeineWarning");p&&(p.classList.toggle("hidden",e<=n),e>n&&p.classList.add("alert-pulse"));const w=F().some(B=>B.t==="COFFEE"&&new Date(B.ts).getHours()>=20),b=document.getElementById("sleepWarning");b&&b.classList.toggle("hidden",!w),fe()}function fe(e,t){const n=F(),a=document.getElementById("cupLabel");a&&(a.textContent="今日 "+n.length+" 杯");const i=n.some(S=>S.t==="COFFEE"),c=n.some(S=>S.t==="MILK_TEA"),o=document.getElementById("cupLiquid"),l=document.getElementById("cupWave1"),d=document.getElementById("cupWave2");let u,f;i&&!c?(u="rgba(107,58,42,0.6)",f="rgba(107,58,42,0.55)"):c&&!i?(u="rgba(212,149,106,0.6)",f="rgba(212,149,106,0.55)"):i&&c?(u="rgba(155,103,74,0.6)",f="rgba(155,103,74,0.55)"):(u="rgba(200,220,240,0.25)",f="rgba(200,220,240,0.2)"),o&&o.setAttribute("fill",u),l&&l.setAttribute("fill",f),d&&d.setAttribute("fill",u);const r=n.length,w=Math.min(r/8,1),b=155,g=b-72*w;o&&(o.setAttribute("y",g),o.setAttribute("height",b-g+10)),l&&l.setAttribute("d","M30,"+(g+5)+" Q45,"+(g-1)+" 60,"+(g+5)+" Q75,"+(g+11)+" 90,"+(g+5)+" Q105,"+(g-1)+" 112,"+(g+5)),d&&d.setAttribute("d","M28,"+(g+10)+" Q45,"+(g+16)+" 62,"+(g+10)+" Q79,"+(g+4)+" 96,"+(g+10)+" Q108,"+(g+14)+" 114,"+(g+10));const v=n.some(S=>S.ice!=="热饮"),m=document.getElementById("cupIce1"),I=document.getElementById("cupIce2");m&&(m.style.display=v?"":"none"),I&&(I.style.display=v?"":"none")}function F(){const e=J();return E.filter(t=>(t.dateStr||(t.ts||"").slice(0,10))===e)}function me(){return F().reduce((e,t)=>e+(t.c||0),0)}function pe(){return F().reduce((e,t)=>e+(t.s||0),0)}function ve(e){console.log("切换到页面:",e),L=e,document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.page===e)}),D(e),z(e)}function z(e){var t=e==="home",n=["pageHeader","drinkCupSection","ringsSection","alertsContainer","favBtn","fabRecordBtn"];n.forEach(function(a){var i=document.getElementById(a);i&&(i.style.display=t?"":"none")})}function D(e){const t=document.getElementById("mainContent");if(t){switch(t.classList.remove("main-content"),t.offsetWidth,t.classList.add("main-content"),e){case"home":ge(t);break;case"stats":Se(t);break;case"profile":O(t);break}e==="home"&&M(),requestAnimationFrame(function(){requestAnimationFrame(function(){t.querySelectorAll(".anim-item").forEach(function(a,i){a.style.animationDelay=i*80+"ms",a.classList.add("animated-in")})})})}}function ge(e){const t=F(),n=$e();let a=`
    <!-- 每日寄语 -->
    <div class="anim-item daily-quote">
      <div class="daily-quote-ornament">✦</div>
      <div class="daily-quote-body">
        <span class="daily-quote-text">${k(n)}</span>
        <span class="daily-quote-meta">— 今日寄语</span>
      </div>
      <div class="daily-quote-deco">☕</div>
    </div>

    <div class="anim-item section-header">
      <span class="section-title">今日记录</span>
      <span class="section-count">${t.length} 杯</span>
    </div>`;t.length===0&&(a+=`<div class="anim-item empty-state">
      <div class="empty-icon">☕</div>
      <div class="empty-text">今天还没记一杯呢</div>
      <div class="empty-hint">点击右下角 + 按钮快速记录</div>
    </div>`),t.forEach(function(c,o){a+='<div class="anim-item">'+V(c)+"</div>"});const i=E.filter(c=>!F().includes(c)).slice(0,15);i.length>0&&(a+=`<div class="anim-item section-header" style="margin-top:24px">
      <span class="section-title">更早记录</span>
      <span class="section-count">${i.length}+ 杯</span>
    </div>`,i.forEach(function(c){a+='<div class="anim-item">'+V(c)+"</div>"})),e.innerHTML=a}function V(e){const t=e.t==="COFFEE"?"☕":"🧋";return`
    <div class="record-item">
      ${e.image?'<img src="'+e.image+'" class="record-thumb" alt="'+k(e.n)+'" style="width:42px;height:42px;border-radius:6px;object-fit:cover;margin-right:8px;flex-shrink:0">':'<div class="record-icon">'+t+"</div>"}
      <div class="record-info">
        <div class="record-name">${k(e.n)}</div>
        <div class="record-tags">
          <span class="tag">${k(e.sugar)}</span>
          <span class="tag">${k(e.ice)}</span>
          <span class="tag price-tag">¥${e.p}</span>
        </div>
        <div class="record-meta">
          <span>${e.c}mg</span>
          <span>${e.s}g糖</span>
          <span>${Te(e.ts)}</span>
        </div>
      </div>
      <button class="btn-delete" data-id="${e.id}">✕</button>
    </div>`}document.getElementById("mainContent").addEventListener("click",function(e){const t=e.target.closest(".btn-delete");t&&t.dataset.id&&(e.stopPropagation(),he(t.dataset.id))});function ye(){if(!y)return;const e=Z(y.t,y.n,y.sugar,y.ice,y.c,y.s,y.p);E.unshift(e),P(),M(),L==="home"&&D("home");const t=new Date().getHours(),n=e.t==="COFFEE"&&t>=20?"🌙 晚8点后喝咖啡可能影响睡眠哦":`干杯！已记录 ${e.n} 🎉`;C(n)}function X(e){K(),e&&(s.dateStr=e);const t=document.getElementById("recordSheetBody");t&&x(t),document.getElementById("recordSheet").classList.remove("hidden"),document.body.style.overflow="hidden"}function N(){document.getElementById("recordSheet").classList.add("hidden"),document.body.style.overflow=""}function Z(e,t,n,a,i,c,o,l,d){const u=d?new Date(d+"T12:00:00").toISOString():new Date().toISOString();return{id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),t:e,n:t,sugar:n,ice:a,c:i,s:c,p:o,image:l||"",isTemplate:!1,ts:u,dateStr:d||J()}}function he(e){R=function(){Ee(e)},document.getElementById("confirmModal").classList.remove("hidden")}function Q(){document.getElementById("confirmModal").classList.add("hidden"),R=null}function Ee(e){E=E.filter(t=>t.id!==e),P(),M(),D(L),C("已删除"),window.dispatchEvent(new CustomEvent("drinks-updated"))}let s=null;function K(){s={type:"COFFEE",preset:null,customName:"",sugarIdx:1,iceIdx:0,caffeine:"",sugar:"",price:"",showCustom:!1,image:"",imageProcessing:!1,dateStr:J()}}K();function x(e){if(!e)return;let n=(T[s.type]||T.COFFEE).map(function(c){return'<button class="preset-chip '+(s.preset&&s.preset.n===c.n?"active":"")+'" data-preset="'+c.n+'">'+c.n+"</button>"}).join("");n+='<button class="preset-chip custom" data-action="custom">✎ 自定义</button>';const i=!(s.showCustom?s.customName:s.preset?s.preset.n:"")||!s.price;e.innerHTML=`
    <!-- 贴纸预览区 -->
    <div class="sticker-area" id="stickerArea">
      <input type="file" id="photoInput" accept="image/*" capture="environment" style="display:none">
      ${s.image?`
        <div class="sticker-preview">
          <img src="${s.image}" alt="预览" id="stickerPreviewImg">
          ${s.imageProcessing?'<div class="sticker-loading-overlay"><div class="sticker-spinner"></div><span>✨ AI 正在提取/生成贴纸...</span></div>':""}
        </div>
      `:`
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
        <div class="type-card ${s.type==="COFFEE"?"active":""}" data-type="COFFEE">
          <span class="type-icon">☕</span><span class="type-label">咖啡</span><span class="type-desc">Coffee</span>
        </div>
        <div class="type-card ${s.type==="MILK_TEA"?"active":""}" data-type="MILK_TEA">
          <span class="type-icon">🧋</span><span class="type-label">奶茶</span><span class="type-desc">Milk Tea</span>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">常见饮品</div>
      <div class="preset-grid" id="presetGrid">${n}</div>
    </div>

    ${s.showCustom?`
      <div class="form-section">
        <div class="form-label">饮品名称</div>
        <input class="input-field" id="customNameInput" placeholder="如：自制特调" value="${k(s.customName)}">
      </div>`:""}

    <div class="form-section">
      <div class="form-label">糖度 & 冰度</div>
      <div class="picker-row">
        <div class="picker-col">
          <div class="picker-title">糖度</div>
          <div class="picker-card" id="sugarPicker">${H.map(function(c,o){return'<div class="picker-option '+(s.sugarIdx===o?"active":"")+'" data-idx="'+o+'">'+c+'<span class="picker-check">✓</span></div>'}).join("")}</div>
        </div>
        <div class="picker-col">
          <div class="picker-title">冰度</div>
          <div class="picker-card" id="icePicker">${j.map(function(c,o){return'<div class="picker-option '+(s.iceIdx===o?"active":"")+'" data-idx="'+o+'">'+c+'<span class="picker-check">✓</span></div>'}).join("")}</div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">营养成分</div>
      <div class="input-row">
        <div class="input-group">
          <div class="input-label">咖啡因 (mg)</div>
          <input class="input-field" id="caffeineInput" type="number" placeholder="0" value="${s.caffeine}">
        </div>
        <div class="input-group">
          <div class="input-label">糖分 (g)</div>
          <input class="input-field" id="sugarInput" type="number" placeholder="0" value="${s.sugar}">
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">价格</div>
      <div class="input-prefix">
        <span class="prefix">¥</span>
        <input class="input-field" id="priceInput" type="number" placeholder="0" value="${s.price}">
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">记录日期</div>
      <input class="input-field" id="dateStrInput" type="date" value="${s.dateStr}">
    </div>

    <button class="btn-record" ${i?"disabled":""} id="submitBtn">🌿 干杯！记一杯</button>
  `,be(),ee()}function ee(){const e=s.showCustom?s.customName:s.preset?s.preset.n:"",t=!!(e&&s.price),n=document.getElementById("submitBtn");n&&(t?n.removeAttribute("disabled"):n.setAttribute("disabled",""));let a=document.getElementById("namePreview");if(e){if(!a){a=document.createElement("div"),a.id="namePreview",a.className="drink-name-preview";const c=document.querySelectorAll("#mainContent .form-section"),o=c[c.length-1];o&&o.parentNode.insertBefore(a,o.nextSibling)}a.textContent=e}else a&&a.remove();let i=document.getElementById("setFavBtn");e?i||(i=document.createElement("button"),i.id="setFavBtn",i.className="btn-set-fav",i.textContent="⭐ 设为快捷记录",i.addEventListener("click",function(c){c.preventDefault(),Be()}),n&&n.parentNode&&n.parentNode.insertBefore(i,n.nextSibling)):i&&i.remove()}function be(){document.querySelectorAll(".type-card").forEach(function(l){l.addEventListener("click",function(){s.type=this.dataset.type,s.preset=null,s.showCustom=!1,s.customName="",s.caffeine="",s.sugar="",s.price="",x(document.getElementById("recordSheetBody"))})}),document.querySelectorAll(".preset-chip").forEach(function(l){l.addEventListener("click",function(){if(this.dataset.action==="custom")s.showCustom=!0,s.preset=null,s.customName="",s.caffeine="",s.sugar="",s.price="";else{Ie(this.dataset.preset);return}x(document.getElementById("recordSheetBody"))})});const e=document.getElementById("sugarPicker");e&&e.querySelectorAll(".picker-option").forEach(function(l){l.addEventListener("click",function(){s.sugarIdx=parseInt(this.dataset.idx),x(document.getElementById("recordSheetBody"))})});const t=document.getElementById("icePicker");t&&t.querySelectorAll(".picker-option").forEach(function(l){l.addEventListener("click",function(){s.iceIdx=parseInt(this.dataset.idx),x(document.getElementById("recordSheetBody"))})}),["customNameInput","caffeineInput","sugarInput","priceInput"].forEach(function(l){const d=document.getElementById(l);d&&d.addEventListener("input",function(){l==="customNameInput"&&(s.customName=this.value),l==="caffeineInput"&&(s.caffeine=this.value),l==="sugarInput"&&(s.sugar=this.value),l==="priceInput"&&(s.price=this.value),ee()})});const n=document.getElementById("dateStrInput");n&&n.addEventListener("change",function(){s.dateStr=this.value});const a=document.getElementById("stickerArea"),i=document.getElementById("photoInput");a&&i&&(a.addEventListener("click",function(l){l.preventDefault(),i.click()}),i.addEventListener("change",async function(){const l=this.files&&this.files[0];if(!l)return;const d=new FileReader;d.onload=function(u){s.image=u.target.result,s.imageProcessing=!0,x(document.getElementById("recordSheetBody")),c(l)},d.readAsDataURL(l)}));async function c(l){try{const f=await(await se(()=>import("./imageProcessor-DyxZ9Tj9.js"),[],import.meta.url)).removeBackgroundFromFile(l);s.image=f,C("抠图完成 ✅")}catch(u){console.warn("抠图失败，保留原图:",u.message)}finally{s.imageProcessing=!1;var d=document.getElementById("recordSheetBody");d&&x(d)}}const o=document.getElementById("submitBtn");o&&o.addEventListener("click",function(l){l.preventDefault(),we()})}function Ie(e){s.showCustom=!1,s.customName="";const n=(T[s.type]||T.COFFEE).find(function(a){return a.n===e});n&&(s.preset=n,s.caffeine=""+n.c,s.sugar=""+n.s,s.price=""+n.p),x(document.getElementById("recordSheetBody"))}function we(){const e=s.showCustom?s.customName:s.preset?s.preset.n:"";if(!e||!s.price){C("请选择饮品并填写价格");return}const t=Z(s.type,e,H[s.sugarIdx],j[s.iceIdx],+(s.caffeine||0),+(s.sugar||0),+(s.price||0),s.image||"",s.dateStr||"");E.unshift(t),P();const n=new Date().getHours();t.t==="COFFEE"&&n>=20&&C("🌙 晚8点后喝咖啡可能影响睡眠"),K(),N(),(L==="home"||L==="stats")&&D(L),C("干杯！已记录 🎉"),window.dispatchEvent(new CustomEvent("drinks-updated"))}function Be(){const e=s.showCustom?s.customName:s.preset?s.preset.n:"";y={t:s.type,n:e,sugar:H[s.sugarIdx],ice:j[s.iceIdx],c:+(s.caffeine||0),s:+(s.sugar||0),p:+(s.price||0)},localStorage.setItem("bt_fav",JSON.stringify(y)),q(),C("快捷记录已更新 ✅")}function Se(e){let t=0,n,a;const i=new Date;n=i.getFullYear(),a=i.getMonth()+1;function c(){const o=Fe(),l=Me(),d=De(),u=t===0?l:t===1?o:l;e.innerHTML=`
      <div class="segmented">
        <button class="seg-btn ${t===0?"active":""}" data-tab="0">📅 日历</button>
        <button class="seg-btn ${t===1?"active":""}" data-tab="1">账单</button>
      </div>
      ${t===0?te(n,a):Le(o,l,d,u)}
    `,document.querySelectorAll(".seg-btn").forEach(function(f){f.addEventListener("click",function(){t=parseInt(this.dataset.tab),c()})}),t===0&&ne()}c()}(function(){var e=!1;window.addEventListener("drinks-updated",function(){if(!(e||L!=="stats")){e=!0;var t=document.querySelector(".cal-month-label");if(t){var n=t.textContent.match(/(\d+).*?(\d+)/);n&&_(+n[1],+n[2])}setTimeout(function(){e=!1},300)}})})();function te(e,t){const n=new Date(e,t-1,1),a=new Date(e,t,0),i=n.getDay(),c=a.getDate(),o=new Date().toISOString().slice(0,10),l={};E.forEach(function(r){const p=r.dateStr||(r.ts||"").slice(0,10);l[p]||(l[p]=[]),l[p].push(r)});const d=e+" 年 "+t+" 月",u=["日","一","二","三","四","五","六"];let f="";for(let r=0;r<i;r++)f+='<div class="cal-cell cal-cell-empty"></div>';for(let r=1;r<=c;r++){const p=e+"-"+String(t).padStart(2,"0")+"-"+String(r).padStart(2,"0"),w=l[p]||[],b=p===o,B=p>o,v=w.some(function(I){return I.image})?w.find(function(I){return I.image}):null,m=v?'<img class="cal-sticker" src="'+v.image+'" style="transform:rotate('+ke(p)+'deg)" alt="">':"";f+='<div class="cal-cell '+(b?"cal-today":"")+" "+(w.length>0?"cal-has-records":"")+'" data-date="'+p+'"><span class="cal-day-num">'+r+"</span>"+m+(w.length>0?'<span class="cal-dot">'+w.length+"</span>":B?"":'<button class="cal-backfill-btn" data-date="'+p+'">补记</button>')+"</div>"}return`
    <div class="cal-header">
      <button class="cal-nav-btn" id="calPrev">◀</button>
      <span class="cal-month-label">${d}</span>
      <button class="cal-nav-btn" id="calNext">▶</button>
    </div>
    <div class="cal-weekdays">${u.map(function(r){return"<span>"+r+"</span>"}).join("")}</div>
    <div class="cal-grid">${f}</div>
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
  `}function ke(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return Math.abs(t)%17-8}function ne(){var e,t,n=document.querySelector(".cal-month-label");if(n){var a=n.textContent.match(/(\d+).*?(\d+)/);a&&(e=+a[1],t=+a[2])}var i=document.getElementById("calPrev"),c=document.getElementById("calNext");i&&i.addEventListener("click",function(){t--,t<1&&(t=12,e--),_(e,t)}),c&&c.addEventListener("click",function(){t++,t>12&&(t=1,e++),_(e,t)}),document.querySelectorAll(".cal-backfill-btn").forEach(function(d){d.addEventListener("click",function(u){u.stopPropagation();var f=this.dataset.date;N(),X(f)})}),document.querySelectorAll(".cal-cell.cal-has-records").forEach(function(d){d.addEventListener("click",function(){Ce(this.dataset.date)})});var o=document.getElementById("dayDetailOverlay");if(o){o.addEventListener("click",function(d){d.target===o&&this.classList.add("hidden")});var l=document.getElementById("dayDetailClose");l&&l.addEventListener("click",function(){o.classList.add("hidden")})}}function _(e,t){var n=document.getElementById("mainContent");if(n){var a=n.querySelector(".segmented"),i=a?a.nextElementSibling:n.firstElementChild,c=document.createElement("div");if(c.innerHTML=te(e,t),i){for(;c.firstChild;)n.insertBefore(c.firstChild,i);for(;i&&i!==n.lastElementChild&&i.nextElementSibling;)i.nextElementSibling.remove();i.remove()}ne()}}function Ce(e){const t=E.filter(function(d){return(d.dateStr||(d.ts||"").slice(0,10))===e}),n=document.getElementById("dayDetailOverlay"),a=document.getElementById("dayDetailDate"),i=document.getElementById("dayDetailBody");if(!n||!a||!i)return;a.textContent=e;const c=t.reduce(function(d,u){return d+(u.c||0)},0),o=t.reduce(function(d,u){return d+(u.s||0)},0),l=t.reduce(function(d,u){return d+(u.p||0)},0);i.innerHTML=t.map(function(d){return'<div class="day-detail-item"><span class="day-detail-icon">'+(d.t==="COFFEE"?"☕":"🧋")+'</span><div class="day-detail-info"><div class="day-detail-name">'+k(d.n)+'</div><div class="day-detail-meta">'+k(d.sugar)+" / "+k(d.ice)+" · ¥"+d.p+'</div></div><div class="day-detail-nums">'+d.c+"mg · "+d.s+"g</div></div>"}).join("")+'<div class="day-detail-summary">☕ '+c+"mg &nbsp; 🍬 "+o+"g &nbsp; 💰 ¥"+l.toFixed(1)+"</div>",n.classList.remove("hidden")}function Le(e,t,n,a){return`
    <div class="finance-hero">
      <div class="finance-amount">¥${a.toFixed(1)}</div>
      <div class="finance-label">本月消费</div>
      <div class="finance-extra">共 ${n} 杯</div>
    </div>

    <div class="motivation-card">
      <span class="mot-icon">💡</span>
      <div>
        <div class="mot-title">趣味统计</div>
        <div class="mot-text">${Ae(n)}</div>
      </div>
    </div>

    <div class="section-header"><span class="section-title">消费明细</span></div>
    ${E.slice(0,20).map(function(i){return`
      <div class="record-item" style="padding:10px 12px">
        <div class="record-icon">${i.t==="COFFEE"?"☕":"🧋"}</div>
        <div class="record-info">
          <div class="record-name">${k(i.n)}</div>
          <div class="record-meta">${Re(i.ts)}</div>
        </div>
        <span style="font-weight:900;color:var(--black);">¥${i.p}</span>
      </div>`}).join("")}
  `}function O(e){const t=h.theme||"apple",n=h.nickname||"",a=h.avatar||"☕",i=h.caffeineMax||400,c=h.sugarMax||50,o=["☕","🧋","🍵","🥤","🧃","🍹","🫖","🥛","🍶","🍺"],l=[{id:"apple",name:"苹果风格",icon:"🍎",desc:"毛玻璃·大圆角·SF字体"},{id:"matcha",name:"宇治抹茶",icon:"🍵",desc:"低饱和灰绿·奶白·清新健康"},{id:"taro",name:"芋泥啵啵",icon:"🥤",desc:"梦幻淡紫·藕粉·甜美手帐"},{id:"wabi",name:"日式侘寂",icon:"🍃",desc:"大留白·柔阴影·衬线标题"},{id:"neo",name:"潮玩波普",icon:"🎨",desc:"硬阴影·粗边框·波普亮色"},{id:"night",name:"深夜限定·微醺精酿",icon:"🌆",desc:"纯黑霓虹·发光蓝绿·修仙党"},{id:"cyber",name:"赛博朋克",icon:"🌃",desc:"暗黑霓虹·网格底·等宽数字"}],d=F(),u=E.length,f=E.reduce(function(r,p){return r+(p.p||0)},0);e.innerHTML=`
    <!-- 顶部用户大卡片 -->
    <div class="profile-card anim-item">
      <div class="profile-card-bg"></div>
      <div class="profile-card-body">
        <div class="profile-avatar-wrap">
          <span class="profile-avatar-large">${a}</span>
          <div class="profile-avatar-badge">✦</div>
        </div>
        <div class="profile-user-info">
          <div class="profile-nick-row" id="profileNickRow">
            <span class="profile-nick-text">${k(n)||"点击设置昵称"}</span>
            <span class="profile-nick-edit">✎</span>
          </div>
          <div class="profile-subtitle">${n?"记录每一杯，品味每一天":"— 轻触上方编辑昵称 —"}</div>
        </div>
      </div>
      <div class="profile-stats-row">
        <div class="profile-stat">
          <span class="profile-stat-val">${d.length}</span>
          <span class="profile-stat-lbl">今日杯数</span>
        </div>
        <div class="profile-stat">
          <span class="profile-stat-val">${u}</span>
          <span class="profile-stat-lbl">总记录</span>
        </div>
        <div class="profile-stat">
          <span class="profile-stat-val">¥${f.toFixed(0)}</span>
          <span class="profile-stat-lbl">累计消费</span>
        </div>
      </div>
    </div>

    <!-- 头像选择器 -->
    <div class="profile-avatar-picker anim-item">
      ${o.map(function(r){return'<span class="avatar-chip '+(a===r?"active":"")+'" data-avatar="'+r+'">'+r+"</span>"}).join("")}
    </div>

    <!-- 卡片 A：目标管理 -->
    <div class="profile-card-section anim-item">
      <div class="profile-card-head">
        <span class="profile-card-head-icon">📊</span>
        <span class="profile-card-head-title">目标管理</span>
      </div>
      <div class="profile-card-body-inner">
        <div class="profile-row" id="caffeineRow">
          <div class="profile-row-left">
            <span class="profile-row-icon">☕</span>
            <div class="profile-row-text">
              <span class="profile-row-label">每日咖啡因上限</span>
              <span class="profile-row-val" id="caffeineMaxDisplay">${i} mg</span>
            </div>
          </div>
          <button class="profile-row-action" id="editCaffeineBtn">✎</button>
        </div>
        <div class="profile-row-divider"></div>
        <div class="profile-row" id="sugarRow">
          <div class="profile-row-left">
            <span class="profile-row-icon">🍬</span>
            <div class="profile-row-text">
              <span class="profile-row-label">每日糖分上限</span>
              <span class="profile-row-val" id="sugarMaxDisplay">${c} g</span>
            </div>
          </div>
          <button class="profile-row-action" id="editSugarBtn">✎</button>
        </div>
      </div>
    </div>

    <!-- 卡片 B：个性化 -->
    <div class="profile-card-section anim-item">
      <div class="profile-card-head">
        <span class="profile-card-head-icon">🎨</span>
        <span class="profile-card-head-title">个性化</span>
      </div>
      <div class="profile-card-body-inner">
        <div class="profile-row-label-only">应用主题</div>
        <div class="profile-theme-chips">
          ${l.map(function(r){return'<button class="theme-chip '+(t===r.id?"active":"")+'" data-theme="'+r.id+'"><span class="theme-chip-icon">'+r.icon+'</span><span class="theme-chip-name">'+r.name+"</span></button>"}).join("")}
        </div>
        <div class="profile-row-divider"></div>
        <div class="profile-row">
          <div class="profile-row-left">
            <span class="profile-row-icon">⚡</span>
            <div class="profile-row-text">
              <span class="profile-row-label">快捷记录</span>
              <span class="profile-row-val">${k(y?.n||"--")} · ¥${y?.p||0}</span>
            </div>
          </div>
          <button class="profile-row-action" id="resetFavBtn">↺</button>
        </div>
        <div class="profile-row-divider"></div>
        <div class="profile-row">
          <div class="profile-row-left">
            <span class="profile-row-icon">📤</span>
            <div class="profile-row-text">
              <span class="profile-row-label">数据备份</span>
              <span class="profile-row-val">导出 / 导入 JSON</span>
            </div>
          </div>
          <div class="profile-row-actions">
            <button class="profile-row-action-sm" id="exportBtn">导出</button>
            <button class="profile-row-action-sm" id="importBtn">导入</button>
            <input type="file" id="importFileInput" accept=".json" style="display:none">
          </div>
        </div>
      </div>
    </div>

    <!-- 卡片 C：关于 -->
    <div class="profile-card-section anim-item">
      <div class="profile-card-head">
        <span class="profile-card-head-icon">ℹ️</span>
        <span class="profile-card-head-title">关于</span>
      </div>
      <div class="profile-card-body-inner">
        <div class="profile-row">
          <div class="profile-row-left">
            <span class="profile-row-icon">📱</span>
            <div class="profile-row-text">
              <span class="profile-row-label">半糖主义 BANTANG</span>
              <span class="profile-row-val">v1.3.0</span>
            </div>
          </div>
        </div>
        <div class="profile-row-divider"></div>
        <div class="profile-row">
          <div class="profile-row-left">
            <span class="profile-row-icon">❤️</span>
            <div class="profile-row-text">
              <span class="profile-row-label">开源致谢</span>
              <span class="profile-row-val">感谢开源社区的贡献</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上限编辑弹窗 -->
    <div class="limit-edit-overlay hidden" id="limitEditOverlay">
      <div class="limit-edit-card" id="limitEditCard">
        <div class="limit-edit-header">
          <span class="limit-edit-title" id="limitEditTitle">编辑上限</span>
          <button class="limit-edit-close" id="limitEditClose">✕</button>
        </div>
        <div class="limit-edit-body">
          <div class="limit-edit-icon" id="limitEditIcon">☕</div>
          <div class="limit-edit-label" id="limitEditLabel">咖啡因 (mg)</div>
          <div class="limit-edit-slider-wrap">
            <input type="range" class="limit-edit-slider" id="limitEditSlider" min="20" max="2000" step="10">
          </div>
          <div class="limit-edit-val-wrap">
            <button class="limit-edit-btn" id="limitEditMinus">−</button>
            <span class="limit-edit-val" id="limitEditVal">400</span>
            <button class="limit-edit-btn" id="limitEditPlus">+</button>
          </div>
          <button class="limit-edit-confirm" id="limitEditConfirm">确定</button>
        </div>
      </div>
    </div>
  `,xe(),requestAnimationFrame(function(){requestAnimationFrame(function(){var r=e.querySelectorAll(".anim-item");r.forEach(function(p,w){p.style.animationDelay=w*60+"ms",p.classList.add("animated-in")})})})}function xe(e,t){var n=null,a=0,i=document.getElementById("profileNickRow");i&&i.addEventListener("click",function(){var v=h.nickname||"",m=document.createElement("input");m.type="text",m.className="profile-nick-input",m.value=v,m.placeholder="输入昵称...",m.maxLength=20,i.innerHTML="",i.appendChild(m),m.focus(),m.addEventListener("blur",function(){h.nickname=this.value.trim(),A()}),m.addEventListener("keydown",function(I){I.key==="Enter"&&this.blur()})}),document.querySelectorAll(".avatar-chip").forEach(function(v){v.addEventListener("click",function(){h.avatar=this.dataset.avatar,A()})});var c=document.getElementById("limitEditOverlay"),o=document.getElementById("limitEditSlider"),l=document.getElementById("limitEditVal"),d=document.getElementById("limitEditTitle"),u=document.getElementById("limitEditIcon"),f=document.getElementById("limitEditLabel");function r(v){n=v;var m=v==="caffeine",I=m?h.caffeineMax||400:h.sugarMax||50;a=I,d.textContent=m?"咖啡因上限":"糖分上限",u.textContent=m?"☕":"🍬",f.textContent=m?"咖啡因 (mg)":"糖分 (g)",o&&(o.min=m?"50":"10",o.max=m?"2000":"500",o.step=m?"10":"5",o.value=I),l&&(l.textContent=I),c&&c.classList.remove("hidden")}function p(){c&&c.classList.add("hidden"),n=null}document.getElementById("editCaffeineBtn")&&document.getElementById("editCaffeineBtn").addEventListener("click",function(){r("caffeine")}),document.getElementById("editSugarBtn")&&document.getElementById("editSugarBtn").addEventListener("click",function(){r("sugar")}),document.getElementById("editCaffeineBtn")&&document.getElementById("caffeineRow").addEventListener("click",function(v){v.target!==document.getElementById("editCaffeineBtn")&&r("caffeine")}),document.getElementById("sugarRow")&&document.getElementById("sugarRow").addEventListener("click",function(v){v.target!==document.getElementById("editSugarBtn")&&r("sugar")}),o&&o.addEventListener("input",function(){a=parseInt(this.value),l&&(l.textContent=a)}),document.getElementById("limitEditMinus")&&document.getElementById("limitEditMinus").addEventListener("click",function(){var v=n==="caffeine"?10:5,m=n==="caffeine"?50:10;a=Math.max(m,a-v),o&&(o.value=a),l&&(l.textContent=a)}),document.getElementById("limitEditPlus")&&document.getElementById("limitEditPlus").addEventListener("click",function(){var v=n==="caffeine"?10:5,m=n==="caffeine"?2e3:500;a=Math.min(m,a+v),o&&(o.value=a),l&&(l.textContent=a)}),document.getElementById("limitEditConfirm")&&document.getElementById("limitEditConfirm").addEventListener("click",function(){n==="caffeine"?h.caffeineMax=a:n==="sugar"&&(h.sugarMax=a),A(),p()}),document.getElementById("limitEditClose")&&document.getElementById("limitEditClose").addEventListener("click",p),c&&c.addEventListener("click",function(v){v.target===c&&p()}),document.querySelectorAll(".theme-chip").forEach(function(v){v.addEventListener("click",function(){var m=this.dataset.theme;G(m),O(document.getElementById("mainContent"))})});var w=document.getElementById("resetFavBtn");w&&w.addEventListener("click",function(){Oe(),O(document.getElementById("mainContent"))});var b=document.getElementById("exportBtn");b&&b.addEventListener("click",function(){var v=JSON.stringify({version:"1.3.0",exportedAt:new Date().toISOString(),settings:h,records:E,fav:y},null,2),m=new Blob([v],{type:"application/json"}),I=document.createElement("a");I.href=URL.createObjectURL(m),I.download="bantang-backup-"+new Date().toISOString().slice(0,10)+".json",I.click(),C("导出成功 ✅")});var B=document.getElementById("importBtn"),g=document.getElementById("importFileInput");B&&g&&(B.addEventListener("click",function(){g.click()}),g.addEventListener("change",function(){var v=this.files&&this.files[0];if(v){var m=new FileReader;m.onload=function(I){try{var S=JSON.parse(I.target.result);S.records&&(E=S.records,P()),S.settings&&(Object.assign(h,S.settings),A()),S.fav&&(y=S.fav,localStorage.setItem("bt_fav",JSON.stringify(y)),q()),O(document.getElementById("mainContent")),M(),C("导入成功 ✅ 共 "+(S.records?S.records.length:0)+" 条记录")}catch{C("导入失败：文件格式错误 ❌")}},m.readAsText(v)}}))}function Fe(){const e=new Date,t=e.getDay(),n=new Date(e);return n.setDate(e.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0),E.filter(function(a){return new Date(a.ts)>=n}).reduce(function(a,i){return a+(i.p||0)},0)}function Me(){const e=new Date;return E.filter(function(t){const n=new Date(t.ts);return n.getMonth()===e.getMonth()&&n.getFullYear()===e.getFullYear()}).reduce(function(t,n){return t+(n.p||0)},0)}function De(){const e=new Date;return E.filter(function(t){const n=new Date(t.ts);return n.getMonth()===e.getMonth()&&n.getFullYear()===e.getFullYear()}).length}function Ae(e){const t=["本月已喝 "+e+" 杯，享受每一杯 ☕️","少喝5杯，省下的钱够买一支口红 💄","少喝5杯，省下的钱够买一个游戏皮肤 🎮","少喝3杯，就是一顿火锅的钱 🍲","控制咖啡因摄入，健康第一 💪"];return t[Math.floor(Math.random()*t.length)]}function Oe(){y={t:"COFFEE",n:"生椰拿铁",sugar:"三分糖",ice:"去冰",c:200,s:15,p:22},localStorage.setItem("bt_fav",JSON.stringify(y)),q(),C("已重置为默认")}function $e(){const e=new Date().toISOString().slice(0,10);if(localStorage.getItem("bt_quote_date")===e){var n=localStorage.getItem("bt_quote_text");if(n)return n}const a=Math.floor(Math.random()*U.length),i=U[a];return localStorage.setItem("bt_quote_date",e),localStorage.setItem("bt_quote_text",i),i}function J(e){const t=new Date,n=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return n+"-"+a+"-"+i}function k(e){return e=String(e||""),e.replace(/[&<>"]/g,function(t){return t==="&"?"&amp;":t==="<"?"&lt;":t===">"?"&gt;":t==='"'?"&quot;":t})}function Te(e){try{return new Date(e).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})}catch{return""}}function Re(e){try{return new Date(e).toLocaleDateString("zh-CN",{month:"short",day:"numeric"})}catch{return""}}function C(e,t){t=t||2e3;const n=document.getElementById("toast");n&&(n.textContent=e,n.classList.remove("hidden"),clearTimeout(n._tid),n._tid=setTimeout(function(){n.classList.add("hidden")},t))}export{se as _};
