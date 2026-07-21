(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const te="modulepreload",ne=function(e,t){return new URL(e,t).href},K={},ie=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(f){return Promise.all(f.map(r=>Promise.resolve(r).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};const l=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");i=s(n.map(f=>{if(f=ne(f,a),f in K)return;K[f]=!0;const r=f.endsWith(".css"),m=r?'[rel="stylesheet"]':"";if(!!a)for(let C=l.length-1;C>=0;C--){const v=l[C];if(v.href===f&&(!r||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${m}`))return;const b=document.createElement("link");if(b.rel=r?"stylesheet":te,r||(b.as="script"),b.crossOrigin="",b.href=f,p&&b.setAttribute("nonce",p),document.head.appendChild(b),r)return new Promise((C,v)=>{b.addEventListener("load",C),b.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${f}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})},se=48,$=Math.PI*se*2;let h={caffeineMax:400,sugarMax:50,nickname:"",avatar:"☕",theme:"apple"};const R={COFFEE:[{t:"COFFEE",n:"美式咖啡",c:150,s:0,p:18},{t:"COFFEE",n:"拿铁",c:160,s:10,p:20},{t:"COFFEE",n:"生椰拿铁",c:200,s:15,p:22},{t:"COFFEE",n:"柠檬美式",c:160,s:5,p:20},{t:"COFFEE",n:"燕麦拿铁",c:180,s:10,p:24},{t:"COFFEE",n:"卡布奇诺",c:160,s:12,p:20},{t:"COFFEE",n:"摩卡",c:170,s:20,p:25},{t:"COFFEE",n:"冷萃咖啡",c:200,s:0,p:26},{t:"COFFEE",n:"澳白",c:210,s:8,p:25},{t:"COFFEE",n:"手冲咖啡",c:180,s:0,p:30}],MILK_TEA:[{t:"MILK_TEA",n:"波霸奶茶",c:100,s:28,p:15},{t:"MILK_TEA",n:"四季春茶",c:80,s:16,p:10},{t:"MILK_TEA",n:"抹茶拿铁",c:120,s:18,p:18},{t:"MILK_TEA",n:"芋泥啵啵",c:60,s:22,p:16},{t:"MILK_TEA",n:"杨枝甘露",c:50,s:25,p:18},{t:"MILK_TEA",n:"黑糖珍珠奶茶",c:90,s:30,p:16},{t:"MILK_TEA",n:"柠檬茶",c:40,s:20,p:12},{t:"MILK_TEA",n:"芝士奶盖茶",c:100,s:24,p:20}]},J=["今天也是需要咖啡因续命的一天 ☕️","来杯无糖奶茶，四舍五入等于没喝 🧋","生活太苦？记得给自己加点糖 🍬","一杯冰美式，清醒地面对这个世界 ❄️","奶茶是液体的拥抱，温柔且治愈 🫂","咖啡是成年人白天的酒精，微醺不醉 🥃","三分糖的克制，是对生活的温柔妥协 ✨","少冰去糖，成年人最后的倔强 💪","没有什么是一杯咖啡解决不了的，如果有，就两杯 ☕️☕️","今天的快乐是奶茶给的，明天的体重明天再说 🎈","喝咖啡的人不一定是艺术家，但一定很困 😴","热饮暖手，冷饮沁心，都是生活的温度 🌡️","每一杯澳白，都是对庸常生活的优雅反击 🎯","手冲咖啡的仪式感，是对自己的最高礼遇 🫖","低卡糖 + 燕麦奶，自律和放纵的完美平衡 ⚖️","下午三点的奶茶，是打工人给自己发的勋章 🏅","拉花很丑没关系，味道对了就是好咖啡 🤎","人生就像抹茶拿铁，苦中带甜才够味 🍵"],q=["无糖","三分糖","五分糖","七分糖","全糖"],H=["去冰","少冰","正常冰","多冰","热饮"];let L="home",E=[],y=null,N=null;(function(){ae(),oe(),le(),Q(),re(),M(),D("home"),G("home"),ce(),console.log("半糖主义 PWA 初始化完成")})();function ae(){try{var e=JSON.parse(localStorage.getItem("bt_settings"));e&&Object.assign(h,e)}catch{}}function A(){localStorage.setItem("bt_settings",JSON.stringify(h)),Q(),M(),(L==="home"||L==="profile")&&D(L)}function ce(){document.querySelectorAll(".nav-item").forEach(s=>{s.addEventListener("click",function(l){l.preventDefault();const d=this.dataset.page;console.log("导航点击:",d),me(d)})});const e=document.getElementById("favBtn");e&&e.addEventListener("click",function(s){s.preventDefault(),ve()});const t=document.getElementById("fabRecordBtn");t&&t.addEventListener("click",function(s){s.preventDefault(),ge()});const n=document.getElementById("recordSheetClose");n&&n.addEventListener("click",function(s){s.preventDefault(),_()});const a=document.getElementById("recordSheet");a&&a.addEventListener("click",function(s){s.target===a&&_()});const i=document.getElementById("modalCancel"),o=document.getElementById("modalConfirm");i&&i.addEventListener("click",U),o&&o.addEventListener("click",function(){N&&N(),U()})}function oe(){try{E=JSON.parse(localStorage.getItem("bt_records")||"[]")}catch{E=[]}console.log("加载记录:",E.length,"条")}function T(){localStorage.setItem("bt_records",JSON.stringify(E)),console.log("保存记录:",E.length,"条")}function le(){try{y=JSON.parse(localStorage.getItem("bt_fav"))}catch{y=null}y||(y={t:"COFFEE",n:"生椰拿铁",sugar:"三分糖",ice:"去冰",c:200,s:15,p:22}),P()}function P(){const e=document.getElementById("favBtn");if(!e||!y)return;const t=e.querySelector(".fav-text");t&&(t.textContent=`快捷记录 — ${y.n}（${y.sugar}/${y.ice} ¥${y.p}）`)}function Q(){W(h.theme||"apple")}function W(e){var t=["apple","neo","wabi","cyber","matcha","taro","night"];t.indexOf(e)===-1&&(e="apple"),h.theme=e,localStorage.setItem("bt_settings",JSON.stringify(h)),document.documentElement.setAttribute("data-theme",e);const n=document.getElementById("themeStylesheet"),a={neo:"css/themes/neo-brutalism.css",wabi:"css/themes/wabi-sabi.css",apple:"css/themes/apple-hig.css",cyber:"css/themes/cyberpunk.css",matcha:"css/themes/matcha-mint.css",taro:"css/themes/taro-purple.css",night:"css/themes/night-brew.css"};n&&a[e]&&(n.href=a[e],document.head.appendChild(n));const i=document.getElementById("metaThemeColor"),o={neo:"#FFFDF5",wabi:"#FDFAF5",apple:"#F2F2F7",cyber:"#0A0A0F",matcha:"#FFFAF2",taro:"#FFFAF8",night:"#08080C"};i&&o[e]&&(i.content=o[e]),console.log("主题切换:",e)}function re(){document.querySelectorAll(".ring-fill").forEach(e=>{e.style.strokeDasharray=$,e.style.strokeDashoffset=$})}function M(){const e=ue(),t=fe(),n=h.caffeineMax||400,a=h.sugarMax||50,i=Math.min(e/n,1),o=Math.min(t/a,1),s=document.getElementById("caffeineRing"),l=document.getElementById("sugarRing");s&&(s.style.strokeDashoffset=$*(1-i)),l&&(l.style.strokeDashoffset=$*(1-o));const d=document.getElementById("caffeineValue");d&&(d.textContent=e===Math.floor(e)?e:e.toFixed(1),d.style.color=i>=1?"var(--warn)":"var(--black)");const p=document.getElementById("sugarValue");p&&(p.textContent=t===Math.floor(t)?t:t.toFixed(1),p.style.color=o>=1?"var(--warn)":"var(--black)");var f=document.getElementById("caffeineLimitLabel");f&&(f.textContent="上限 "+n+"mg");var r=document.getElementById("sugarLimitLabel");r&&(r.textContent="上限 "+a+"g");const m=document.getElementById("caffeineWarning");m&&(m.classList.toggle("hidden",e<=n),e>n&&m.classList.add("alert-pulse"));const I=F().some(C=>C.t==="COFFEE"&&new Date(C.ts).getHours()>=20),b=document.getElementById("sleepWarning");b&&b.classList.toggle("hidden",!I),de()}function de(e,t){const n=F(),a=document.getElementById("cupLabel");a&&(a.textContent="今日 "+n.length+" 杯");const i=n.some(B=>B.t==="COFFEE"),o=n.some(B=>B.t==="MILK_TEA"),s=document.getElementById("cupLiquid"),l=document.getElementById("cupWave1"),d=document.getElementById("cupWave2");let p,f;i&&!o?(p="rgba(107,58,42,0.6)",f="rgba(107,58,42,0.55)"):o&&!i?(p="rgba(212,149,106,0.6)",f="rgba(212,149,106,0.55)"):i&&o?(p="rgba(155,103,74,0.6)",f="rgba(155,103,74,0.55)"):(p="rgba(200,220,240,0.25)",f="rgba(200,220,240,0.2)"),s&&s.setAttribute("fill",p),l&&l.setAttribute("fill",f),d&&d.setAttribute("fill",p);const r=n.length,I=Math.min(r/8,1),b=155,v=b-72*I;s&&(s.setAttribute("y",v),s.setAttribute("height",b-v+10)),l&&l.setAttribute("d","M30,"+(v+5)+" Q45,"+(v-1)+" 60,"+(v+5)+" Q75,"+(v+11)+" 90,"+(v+5)+" Q105,"+(v-1)+" 112,"+(v+5)),d&&d.setAttribute("d","M28,"+(v+10)+" Q45,"+(v+16)+" 62,"+(v+10)+" Q79,"+(v+4)+" 96,"+(v+10)+" Q108,"+(v+14)+" 114,"+(v+10));const g=n.some(B=>B.ice!=="热饮"),u=document.getElementById("cupIce1"),w=document.getElementById("cupIce2");u&&(u.style.display=g?"":"none"),w&&(w.style.display=g?"":"none")}function F(){const e=new Date().toISOString().slice(0,10);return E.filter(t=>t.ts&&t.ts.slice(0,10)===e)}function ue(){return F().reduce((e,t)=>e+(t.c||0),0)}function fe(){return F().reduce((e,t)=>e+(t.s||0),0)}function me(e){console.log("切换到页面:",e),L=e,document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.page===e)}),D(e),G(e)}function G(e){var t=e==="home",n=["pageHeader","drinkCupSection","ringsSection","alertsContainer","favBtn","fabRecordBtn"];n.forEach(function(a){var i=document.getElementById(a);i&&(i.style.display=t?"":"none")})}function D(e){const t=document.getElementById("mainContent");if(t){switch(t.classList.remove("main-content"),t.offsetWidth,t.classList.add("main-content"),e){case"home":pe(t);break;case"stats":Be(t);break;case"profile":O(t);break}e==="home"&&M(),requestAnimationFrame(function(){requestAnimationFrame(function(){t.querySelectorAll(".anim-item").forEach(function(a,i){a.style.animationDelay=i*80+"ms",a.classList.add("animated-in")})})})}}function pe(e){const t=F(),n=Oe();let a=`
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
    </div>`),t.forEach(function(o,s){a+='<div class="anim-item">'+Y(o)+"</div>"});const i=E.filter(o=>!F().includes(o)).slice(0,15);i.length>0&&(a+=`<div class="anim-item section-header" style="margin-top:24px">
      <span class="section-title">更早记录</span>
      <span class="section-count">${i.length}+ 杯</span>
    </div>`,i.forEach(function(o){a+='<div class="anim-item">'+Y(o)+"</div>"})),e.innerHTML=a}function Y(e){const t=e.t==="COFFEE"?"☕":"🧋";return`
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
          <span>${$e(e.ts)}</span>
        </div>
      </div>
      <button class="btn-delete" data-id="${e.id}">✕</button>
    </div>`}document.getElementById("mainContent").addEventListener("click",function(e){const t=e.target.closest(".btn-delete");t&&t.dataset.id&&(e.stopPropagation(),ye(t.dataset.id))});function ve(){if(!y)return;const e=z(y.t,y.n,y.sugar,y.ice,y.c,y.s,y.p);E.unshift(e),T(),M(),L==="home"&&D("home");const t=new Date().getHours(),n=e.t==="COFFEE"&&t>=20?"🌙 晚8点后喝咖啡可能影响睡眠哦":`干杯！已记录 ${e.n} 🎉`;S(n)}function ge(){j();const e=document.getElementById("recordSheetBody");e&&x(e),document.getElementById("recordSheet").classList.remove("hidden"),document.body.style.overflow="hidden"}function _(){document.getElementById("recordSheet").classList.add("hidden"),document.body.style.overflow=""}function z(e,t,n,a,i,o,s,l){return{id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),t:e,n:t,sugar:n,ice:a,c:i,s:o,p:s,image:l||"",isTemplate:!1,ts:new Date().toISOString()}}function ye(e){N=function(){he(e)},document.getElementById("confirmModal").classList.remove("hidden")}function U(){document.getElementById("confirmModal").classList.add("hidden"),N=null}function he(e){E=E.filter(t=>t.id!==e),T(),M(),D(L),S("已删除")}let c=null;function j(){c={type:"COFFEE",preset:null,customName:"",sugarIdx:1,iceIdx:0,caffeine:"",sugar:"",price:"",showCustom:!1,image:"",imageProcessing:!1}}j();function x(e){if(!e)return;let n=(R[c.type]||R.COFFEE).map(function(o){return'<button class="preset-chip '+(c.preset&&c.preset.n===o.n?"active":"")+'" data-preset="'+o.n+'">'+o.n+"</button>"}).join("");n+='<button class="preset-chip custom" data-action="custom">✎ 自定义</button>';const i=!(c.showCustom?c.customName:c.preset?c.preset.n:"")||!c.price;e.innerHTML=`
    <!-- 贴纸预览区 -->
    <div class="sticker-area" id="stickerArea">
      <input type="file" id="photoInput" accept="image/*" capture="environment" style="display:none">
      ${c.image?`
        <div class="sticker-preview">
          <img src="${c.image}" alt="预览" id="stickerPreviewImg">
          ${c.imageProcessing?'<div class="sticker-loading-overlay"><div class="sticker-spinner"></div><span>智能抠图中...</span></div>':""}
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
        <div class="type-card ${c.type==="COFFEE"?"active":""}" data-type="COFFEE">
          <span class="type-icon">☕</span><span class="type-label">咖啡</span><span class="type-desc">Coffee</span>
        </div>
        <div class="type-card ${c.type==="MILK_TEA"?"active":""}" data-type="MILK_TEA">
          <span class="type-icon">🧋</span><span class="type-label">奶茶</span><span class="type-desc">Milk Tea</span>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">常见饮品</div>
      <div class="preset-grid" id="presetGrid">${n}</div>
    </div>

    ${c.showCustom?`
      <div class="form-section">
        <div class="form-label">饮品名称</div>
        <input class="input-field" id="customNameInput" placeholder="如：自制特调" value="${k(c.customName)}">
      </div>`:""}

    <div class="form-section">
      <div class="form-label">糖度 & 冰度</div>
      <div class="picker-row">
        <div class="picker-col">
          <div class="picker-title">糖度</div>
          <div class="picker-card" id="sugarPicker">${q.map(function(o,s){return'<div class="picker-option '+(c.sugarIdx===s?"active":"")+'" data-idx="'+s+'">'+o+'<span class="picker-check">✓</span></div>'}).join("")}</div>
        </div>
        <div class="picker-col">
          <div class="picker-title">冰度</div>
          <div class="picker-card" id="icePicker">${H.map(function(o,s){return'<div class="picker-option '+(c.iceIdx===s?"active":"")+'" data-idx="'+s+'">'+o+'<span class="picker-check">✓</span></div>'}).join("")}</div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">营养成分</div>
      <div class="input-row">
        <div class="input-group">
          <div class="input-label">咖啡因 (mg)</div>
          <input class="input-field" id="caffeineInput" type="number" placeholder="0" value="${c.caffeine}">
        </div>
        <div class="input-group">
          <div class="input-label">糖分 (g)</div>
          <input class="input-field" id="sugarInput" type="number" placeholder="0" value="${c.sugar}">
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label">价格</div>
      <div class="input-prefix">
        <span class="prefix">¥</span>
        <input class="input-field" id="priceInput" type="number" placeholder="0" value="${c.price}">
      </div>
    </div>

    <button class="btn-record" ${i?"disabled":""} id="submitBtn">🌿 干杯！记一杯</button>
  `,Ee(),X()}function X(){const e=c.showCustom?c.customName:c.preset?c.preset.n:"",t=!!(e&&c.price),n=document.getElementById("submitBtn");n&&(t?n.removeAttribute("disabled"):n.setAttribute("disabled",""));let a=document.getElementById("namePreview");if(e){if(!a){a=document.createElement("div"),a.id="namePreview",a.className="drink-name-preview";const o=document.querySelectorAll("#mainContent .form-section"),s=o[o.length-1];s&&s.parentNode.insertBefore(a,s.nextSibling)}a.textContent=e}else a&&a.remove();let i=document.getElementById("setFavBtn");e?i||(i=document.createElement("button"),i.id="setFavBtn",i.className="btn-set-fav",i.textContent="⭐ 设为快捷记录",i.addEventListener("click",function(o){o.preventDefault(),we()}),n&&n.parentNode&&n.parentNode.insertBefore(i,n.nextSibling)):i&&i.remove()}function Ee(){document.querySelectorAll(".type-card").forEach(function(s){s.addEventListener("click",function(){c.type=this.dataset.type,c.preset=null,c.showCustom=!1,c.customName="",c.caffeine="",c.sugar="",c.price="",x(document.getElementById("recordSheetBody"))})}),document.querySelectorAll(".preset-chip").forEach(function(s){s.addEventListener("click",function(){if(this.dataset.action==="custom")c.showCustom=!0,c.preset=null,c.customName="",c.caffeine="",c.sugar="",c.price="";else{be(this.dataset.preset);return}x(document.getElementById("recordSheetBody"))})});const e=document.getElementById("sugarPicker");e&&e.querySelectorAll(".picker-option").forEach(function(s){s.addEventListener("click",function(){c.sugarIdx=parseInt(this.dataset.idx),x(document.getElementById("recordSheetBody"))})});const t=document.getElementById("icePicker");t&&t.querySelectorAll(".picker-option").forEach(function(s){s.addEventListener("click",function(){c.iceIdx=parseInt(this.dataset.idx),x(document.getElementById("recordSheetBody"))})}),["customNameInput","caffeineInput","sugarInput","priceInput"].forEach(function(s){const l=document.getElementById(s);l&&l.addEventListener("input",function(){s==="customNameInput"&&(c.customName=this.value),s==="caffeineInput"&&(c.caffeine=this.value),s==="sugarInput"&&(c.sugar=this.value),s==="priceInput"&&(c.price=this.value),X()})});const n=document.getElementById("stickerArea"),a=document.getElementById("photoInput");n&&a&&(n.addEventListener("click",function(s){s.preventDefault(),a.click()}),a.addEventListener("change",async function(){const s=this.files&&this.files[0];if(!s)return;const l=new FileReader;l.onload=function(d){c.image=d.target.result,c.imageProcessing=!0,x(document.getElementById("recordSheetBody")),i(s)},l.readAsDataURL(s)}));async function i(s){try{const p=await(await ie(()=>import("./imageProcessor-BVvEjePF.js"),[],import.meta.url)).removeBackgroundFromFile(s);c.image=p,S("抠图完成 ✅")}catch(d){console.warn("抠图失败，保留原图:",d.message)}finally{c.imageProcessing=!1;var l=document.getElementById("recordSheetBody");l&&x(l)}}const o=document.getElementById("submitBtn");o&&o.addEventListener("click",function(s){s.preventDefault(),Ie()})}function be(e){c.showCustom=!1,c.customName="";const n=(R[c.type]||R.COFFEE).find(function(a){return a.n===e});n&&(c.preset=n,c.caffeine=""+n.c,c.sugar=""+n.s,c.price=""+n.p),x(document.getElementById("recordSheetBody"))}function Ie(){const e=c.showCustom?c.customName:c.preset?c.preset.n:"";if(!e||!c.price){S("请选择饮品并填写价格");return}const t=z(c.type,e,q[c.sugarIdx],H[c.iceIdx],+(c.caffeine||0),+(c.sugar||0),+(c.price||0),c.image||"");E.unshift(t),T();const n=new Date().getHours();t.t==="COFFEE"&&n>=20&&S("🌙 晚8点后喝咖啡可能影响睡眠"),j(),_(),(L==="home"||L==="stats")&&D(L),S("干杯！已记录 🎉")}function we(){const e=c.showCustom?c.customName:c.preset?c.preset.n:"";y={t:c.type,n:e,sugar:q[c.sugarIdx],ice:H[c.iceIdx],c:+(c.caffeine||0),s:+(c.sugar||0),p:+(c.price||0)},localStorage.setItem("bt_fav",JSON.stringify(y)),P(),S("快捷记录已更新 ✅")}function Be(e){let t=0,n,a;const i=new Date;n=i.getFullYear(),a=i.getMonth()+1;function o(){const s=xe(),l=Fe(),d=Me(),p=t===0?l:t===1?s:l;e.innerHTML=`
      <div class="segmented">
        <button class="seg-btn ${t===0?"active":""}" data-tab="0">📅 日历</button>
        <button class="seg-btn ${t===1?"active":""}" data-tab="1">账单</button>
      </div>
      ${t===0?Z(n,a):Se(s,l,d,p)}
    `,document.querySelectorAll(".seg-btn").forEach(function(r){r.addEventListener("click",function(){t=parseInt(this.dataset.tab),o()})}),t===0&&ee();const f=document.getElementById("dayDetailOverlay");if(f){f.addEventListener("click",function(m){m.target===f&&this.classList.add("hidden")});const r=document.getElementById("dayDetailClose");r&&r.addEventListener("click",function(){f.classList.add("hidden")})}}o()}function Z(e,t){const n=new Date(e,t-1,1),a=new Date(e,t,0),i=n.getDay(),o=a.getDate(),s=new Date().toISOString().slice(0,10),l={};E.forEach(function(r){const m=(r.ts||"").slice(0,10);l[m]||(l[m]=[]),l[m].push(r)});const d=e+" 年 "+t+" 月",p=["日","一","二","三","四","五","六"];let f="";for(let r=0;r<i;r++)f+='<div class="cal-cell cal-cell-empty"></div>';for(let r=1;r<=o;r++){const m=e+"-"+String(t).padStart(2,"0")+"-"+String(r).padStart(2,"0"),I=l[m]||[],b=m===s,v=I.some(function(u){return u.image})?I.find(function(u){return u.image}):null,g=v?'<img class="cal-sticker" src="'+v.image+'" style="transform:rotate('+Ce(m)+'deg)" alt="">':"";f+='<div class="cal-cell '+(b?"cal-today":"")+" "+(I.length>0?"cal-has-records":"")+'" data-date="'+m+'"><span class="cal-day-num">'+r+"</span>"+g+(I.length>0?'<span class="cal-dot">'+I.length+"</span>":"")+"</div>"}return`
    <div class="cal-header">
      <button class="cal-nav-btn" id="calPrev">◀</button>
      <span class="cal-month-label">${d}</span>
      <button class="cal-nav-btn" id="calNext">▶</button>
    </div>
    <div class="cal-weekdays">${p.map(function(r){return"<span>"+r+"</span>"}).join("")}</div>
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
  `}function Ce(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return Math.abs(t)%17-8}function ee(){var e,t,n=document.querySelector(".cal-month-label");if(n){var a=n.textContent.match(/(\d+).*?(\d+)/);a&&(e=+a[1],t=+a[2])}var i=document.getElementById("calPrev"),o=document.getElementById("calNext");i&&i.addEventListener("click",function(){t--,t<1&&(t=12,e--),V(e,t)}),o&&o.addEventListener("click",function(){t++,t>12&&(t=1,e++),V(e,t)}),document.querySelectorAll(".cal-cell.cal-has-records").forEach(function(s){s.addEventListener("click",function(){ke(this.dataset.date)})})}function V(e,t){var n=document.getElementById("mainContent");if(n){var a=n.querySelector(".segmented"),i=a?a.nextElementSibling:n.firstElementChild,o=document.createElement("div");if(o.innerHTML=Z(e,t),i){for(;o.firstChild;)n.insertBefore(o.firstChild,i);for(;i&&i!==n.lastElementChild&&i.nextElementSibling;)i.nextElementSibling.remove();i.remove()}ee()}}function ke(e){const t=E.filter(function(d){return(d.ts||"").slice(0,10)===e}),n=document.getElementById("dayDetailOverlay"),a=document.getElementById("dayDetailDate"),i=document.getElementById("dayDetailBody");if(!n||!a||!i)return;a.textContent=e;const o=t.reduce(function(d,p){return d+(p.c||0)},0),s=t.reduce(function(d,p){return d+(p.s||0)},0),l=t.reduce(function(d,p){return d+(p.p||0)},0);i.innerHTML=t.map(function(d){return'<div class="day-detail-item"><span class="day-detail-icon">'+(d.t==="COFFEE"?"☕":"🧋")+'</span><div class="day-detail-info"><div class="day-detail-name">'+k(d.n)+'</div><div class="day-detail-meta">'+k(d.sugar)+" / "+k(d.ice)+" · ¥"+d.p+'</div></div><div class="day-detail-nums">'+d.c+"mg · "+d.s+"g</div></div>"}).join("")+'<div class="day-detail-summary">☕ '+o+"mg &nbsp; 🍬 "+s+"g &nbsp; 💰 ¥"+l.toFixed(1)+"</div>",n.classList.remove("hidden")}function Se(e,t,n,a){return`
    <div class="finance-hero">
      <div class="finance-amount">¥${a.toFixed(1)}</div>
      <div class="finance-label">本月消费</div>
      <div class="finance-extra">共 ${n} 杯</div>
    </div>

    <div class="motivation-card">
      <span class="mot-icon">💡</span>
      <div>
        <div class="mot-title">趣味统计</div>
        <div class="mot-text">${De(n)}</div>
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
  `}function O(e){const t=h.theme||"apple",n=h.nickname||"",a=h.avatar||"☕",i=h.caffeineMax||400,o=h.sugarMax||50,s=["☕","🧋","🍵","🥤","🧃","🍹","🫖","🥛","🍶","🍺"],l=[{id:"apple",name:"苹果风格",icon:"🍎",desc:"毛玻璃·大圆角·SF字体"},{id:"matcha",name:"宇治抹茶",icon:"🍵",desc:"低饱和灰绿·奶白·清新健康"},{id:"taro",name:"芋泥啵啵",icon:"🥤",desc:"梦幻淡紫·藕粉·甜美手帐"},{id:"wabi",name:"日式侘寂",icon:"🍃",desc:"大留白·柔阴影·衬线标题"},{id:"neo",name:"潮玩波普",icon:"🎨",desc:"硬阴影·粗边框·波普亮色"},{id:"night",name:"深夜限定·微醺精酿",icon:"🌆",desc:"纯黑霓虹·发光蓝绿·修仙党"},{id:"cyber",name:"赛博朋克",icon:"🌃",desc:"暗黑霓虹·网格底·等宽数字"}],d=F(),p=E.length,f=E.reduce(function(r,m){return r+(m.p||0)},0);e.innerHTML=`
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
          <span class="profile-stat-val">${p}</span>
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
      ${s.map(function(r){return'<span class="avatar-chip '+(a===r?"active":"")+'" data-avatar="'+r+'">'+r+"</span>"}).join("")}
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
              <span class="profile-row-val" id="sugarMaxDisplay">${o} g</span>
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
  `,Le(),requestAnimationFrame(function(){requestAnimationFrame(function(){var r=e.querySelectorAll(".anim-item");r.forEach(function(m,I){m.style.animationDelay=I*60+"ms",m.classList.add("animated-in")})})})}function Le(e,t){var n=null,a=0,i=document.getElementById("profileNickRow");i&&i.addEventListener("click",function(){var g=h.nickname||"",u=document.createElement("input");u.type="text",u.className="profile-nick-input",u.value=g,u.placeholder="输入昵称...",u.maxLength=20,i.innerHTML="",i.appendChild(u),u.focus(),u.addEventListener("blur",function(){h.nickname=this.value.trim(),A()}),u.addEventListener("keydown",function(w){w.key==="Enter"&&this.blur()})}),document.querySelectorAll(".avatar-chip").forEach(function(g){g.addEventListener("click",function(){h.avatar=this.dataset.avatar,A()})});var o=document.getElementById("limitEditOverlay"),s=document.getElementById("limitEditSlider"),l=document.getElementById("limitEditVal"),d=document.getElementById("limitEditTitle"),p=document.getElementById("limitEditIcon"),f=document.getElementById("limitEditLabel");function r(g){n=g;var u=g==="caffeine",w=u?h.caffeineMax||400:h.sugarMax||50;a=w,d.textContent=u?"咖啡因上限":"糖分上限",p.textContent=u?"☕":"🍬",f.textContent=u?"咖啡因 (mg)":"糖分 (g)",s&&(s.min=u?"50":"10",s.max=u?"2000":"500",s.step=u?"10":"5",s.value=w),l&&(l.textContent=w),o&&o.classList.remove("hidden")}function m(){o&&o.classList.add("hidden"),n=null}document.getElementById("editCaffeineBtn")&&document.getElementById("editCaffeineBtn").addEventListener("click",function(){r("caffeine")}),document.getElementById("editSugarBtn")&&document.getElementById("editSugarBtn").addEventListener("click",function(){r("sugar")}),document.getElementById("editCaffeineBtn")&&document.getElementById("caffeineRow").addEventListener("click",function(g){g.target!==document.getElementById("editCaffeineBtn")&&r("caffeine")}),document.getElementById("sugarRow")&&document.getElementById("sugarRow").addEventListener("click",function(g){g.target!==document.getElementById("editSugarBtn")&&r("sugar")}),s&&s.addEventListener("input",function(){a=parseInt(this.value),l&&(l.textContent=a)}),document.getElementById("limitEditMinus")&&document.getElementById("limitEditMinus").addEventListener("click",function(){var g=n==="caffeine"?10:5,u=n==="caffeine"?50:10;a=Math.max(u,a-g),s&&(s.value=a),l&&(l.textContent=a)}),document.getElementById("limitEditPlus")&&document.getElementById("limitEditPlus").addEventListener("click",function(){var g=n==="caffeine"?10:5,u=n==="caffeine"?2e3:500;a=Math.min(u,a+g),s&&(s.value=a),l&&(l.textContent=a)}),document.getElementById("limitEditConfirm")&&document.getElementById("limitEditConfirm").addEventListener("click",function(){n==="caffeine"?h.caffeineMax=a:n==="sugar"&&(h.sugarMax=a),A(),m()}),document.getElementById("limitEditClose")&&document.getElementById("limitEditClose").addEventListener("click",m),o&&o.addEventListener("click",function(g){g.target===o&&m()}),document.querySelectorAll(".theme-chip").forEach(function(g){g.addEventListener("click",function(){var u=this.dataset.theme;W(u),O(document.getElementById("mainContent"))})});var I=document.getElementById("resetFavBtn");I&&I.addEventListener("click",function(){Ae(),O(document.getElementById("mainContent"))});var b=document.getElementById("exportBtn");b&&b.addEventListener("click",function(){var g=JSON.stringify({version:"1.3.0",exportedAt:new Date().toISOString(),settings:h,records:E,fav:y},null,2),u=new Blob([g],{type:"application/json"}),w=document.createElement("a");w.href=URL.createObjectURL(u),w.download="bantang-backup-"+new Date().toISOString().slice(0,10)+".json",w.click(),S("导出成功 ✅")});var C=document.getElementById("importBtn"),v=document.getElementById("importFileInput");C&&v&&(C.addEventListener("click",function(){v.click()}),v.addEventListener("change",function(){var g=this.files&&this.files[0];if(g){var u=new FileReader;u.onload=function(w){try{var B=JSON.parse(w.target.result);B.records&&(E=B.records,T()),B.settings&&(Object.assign(h,B.settings),A()),B.fav&&(y=B.fav,localStorage.setItem("bt_fav",JSON.stringify(y)),P()),O(document.getElementById("mainContent")),M(),S("导入成功 ✅ 共 "+(B.records?B.records.length:0)+" 条记录")}catch{S("导入失败：文件格式错误 ❌")}},u.readAsText(g)}}))}function xe(){const e=new Date,t=e.getDay(),n=new Date(e);return n.setDate(e.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0),E.filter(function(a){return new Date(a.ts)>=n}).reduce(function(a,i){return a+(i.p||0)},0)}function Fe(){const e=new Date;return E.filter(function(t){const n=new Date(t.ts);return n.getMonth()===e.getMonth()&&n.getFullYear()===e.getFullYear()}).reduce(function(t,n){return t+(n.p||0)},0)}function Me(){const e=new Date;return E.filter(function(t){const n=new Date(t.ts);return n.getMonth()===e.getMonth()&&n.getFullYear()===e.getFullYear()}).length}function De(e){const t=["本月已喝 "+e+" 杯，享受每一杯 ☕️","少喝5杯，省下的钱够买一支口红 💄","少喝5杯，省下的钱够买一个游戏皮肤 🎮","少喝3杯，就是一顿火锅的钱 🍲","控制咖啡因摄入，健康第一 💪"];return t[Math.floor(Math.random()*t.length)]}function Ae(){y={t:"COFFEE",n:"生椰拿铁",sugar:"三分糖",ice:"去冰",c:200,s:15,p:22},localStorage.setItem("bt_fav",JSON.stringify(y)),P(),S("已重置为默认")}function Oe(){const e=new Date().toISOString().slice(0,10);if(localStorage.getItem("bt_quote_date")===e){var n=localStorage.getItem("bt_quote_text");if(n)return n}const a=Math.floor(Math.random()*J.length),i=J[a];return localStorage.setItem("bt_quote_date",e),localStorage.setItem("bt_quote_text",i),i}function k(e){return e=String(e||""),e.replace(/[&<>"]/g,function(t){return t==="&"?"&amp;":t==="<"?"&lt;":t===">"?"&gt;":t==='"'?"&quot;":t})}function $e(e){try{return new Date(e).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})}catch{return""}}function Re(e){try{return new Date(e).toLocaleDateString("zh-CN",{month:"short",day:"numeric"})}catch{return""}}function S(e,t){t=t||2e3;const n=document.getElementById("toast");n&&(n.textContent=e,n.classList.remove("hidden"),clearTimeout(n._tid),n._tid=setTimeout(function(){n.classList.add("hidden")},t))}export{ie as _};
