// ---------- CONFIG ----------
  // WhatsApp number that receives order requests. Digits only, country code first, no + or leading zeros.
  const WHATSAPP_NUMBER = "962792248085";
  // Make.com webhook — pushes order data automatically to WhatsApp (no tap needed on the customer's end).
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/jeap966t1hqdf2xds48gceu7nfh8jb8o";

  let currentLang = 'en';

  // ---------- PRODUCT DATA (replace with your real products & photos) ----------
  const iconBag = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`;
  const iconContainer = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="5" y="8" width="14" height="12" rx="1"/><path d="M8 8V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/></svg>`;
  const iconFilm = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M3 15h18M8 5v14M16 5v14"/></svg>`;
  const iconPipe = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="2" y="9" width="20" height="6" rx="3"/><ellipse cx="4" cy="12" rx="2" ry="3"/></svg>`;
  const iconFitting = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><path d="M4 12h6M14 12h6M10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/><path d="M12 8v-3M12 19v-3"/></svg>`;
  const iconSheet = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 14h18"/></svg>`;

  const products = {
    fa: [
      {code:"FA-101", name:"Woven Poly Bags", name_ar:"أكياس بولي منسوجة", icon:iconBag, meta:"HDPE · 25–50kg capacity", meta_ar:"بولي إيثيلين عالي الكثافة · سعة 25–50 كجم", desc:"Durable woven bags for grain, feed, and bulk packaging.", desc_ar:"أكياس منسوجة متينة لتعبئة الحبوب والأعلاف والمواد بالجملة."},
      {code:"FA-102", name:"Storage Containers", name_ar:"عبوات تخزين", icon:iconContainer, meta:"PP · 5L / 10L / 20L", meta_ar:"بولي بروبيلين · 5 / 10 / 20 لتر", desc:"Stackable food-grade containers with snap lids.", desc_ar:"عبوات قابلة للتكديس وآمنة للأغذية مع أغطية محكمة."},
      {code:"FA-103", name:"Shrink Film Rolls", name_ar:"لفائف فيلم تغليف حراري", icon:iconFilm, meta:"LDPE · 300–1500mm width", meta_ar:"بولي إيثيلين منخفض الكثافة · عرض 300–1500 مم", desc:"Clear shrink film for pallet and product wrapping.", desc_ar:"فيلم شفاف لتغليف المنصات والمنتجات."},
      {code:"FA-104", name:"Garbage Bags", name_ar:"أكياس قمامة", icon:iconBag, meta:"HDPE/LDPE · multiple sizes", meta_ar:"بولي إيثيلين · مقاسات متعددة", desc:"Heavy-duty bags for household and commercial waste.", desc_ar:"أكياس متينة للاستخدام المنزلي والتجاري."},
      {code:"FA-105", name:"Retail Carrier Bags", name_ar:"أكياس تسوق", icon:iconBag, meta:"HDPE · printed or plain", meta_ar:"بولي إيثيلين عالي الكثافة · مطبوعة أو عادية", desc:"Custom-branded carrier bags for shops and supermarkets.", desc_ar:"أكياس تسوق قابلة للطباعة بشعار المتجر."},
      {code:"FA-106", name:"Stretch Wrap", name_ar:"فيلم لف مطاطي", icon:iconFilm, meta:"LLDPE · 17–23 micron", meta_ar:"LLDPE · 17–23 ميكرون", desc:"Pallet stretch wrap for warehousing and logistics.", desc_ar:"فيلم لف المنصات للمستودعات والشحن."}
    ],
    af: [
      {code:"AF-201", name:"PVC Pressure Pipe", name_ar:"أنابيب ضغط PVC", icon:iconPipe, meta:"PVC-U · 1/2\" – 8\"", meta_ar:"PVC-U · من 1/2 إلى 8 إنش", desc:"Pressure-rated pipe for water supply and irrigation.", desc_ar:"أنابيب مقاومة للضغط لإمدادات المياه والري."},
      {code:"AF-202", name:"HDPE Pipe Coils", name_ar:"لفائف أنابيب HDPE", icon:iconPipe, meta:"HDPE · PE80/PE100", meta_ar:"HDPE · PE80/PE100", desc:"Coiled pipe for underground and agricultural lines.", desc_ar:"أنابيب ملفوفة للخطوط الزراعية والجوفية."},
      {code:"AF-203", name:"Pipe Fittings Set", name_ar:"طقم وصلات أنابيب", icon:iconFitting, meta:"PVC/PP · elbows, tees, couplers", meta_ar:"PVC/PP · كوعات، تيات، وصلات", desc:"Standard fittings compatible with our pipe range.", desc_ar:"وصلات قياسية متوافقة مع خط الأنابيب لدينا."},
      {code:"AF-204", name:"PVC Sheet Panels", name_ar:"ألواح PVC", icon:iconSheet, meta:"PVC foam · 3–18mm", meta_ar:"رغوة PVC · 3–18 مم", desc:"Rigid sheet panels for signage, cladding and fabrication.", desc_ar:"ألواح صلبة للافتات والتكسية والتصنيع."},
      {code:"AF-205", name:"Corrugated Drainage Pipe", name_ar:"أنابيب صرف مموجة", icon:iconPipe, meta:"HDPE · double-wall", meta_ar:"HDPE · جدار مزدوج", desc:"Perforated drainage pipe for civil and agricultural works.", desc_ar:"أنابيب صرف مثقبة للأعمال المدنية والزراعية."},
      {code:"AF-206", name:"Cable Conduit &amp; Ducting", name_ar:"مواسير ومجاري كابلات", icon:iconFitting, meta:"PVC · 16–110mm", meta_ar:"PVC · 16–110 مم", desc:"Electrical conduit and ducting for cable protection.", desc_ar:"مواسير ومجاري لحماية الكابلات الكهربائية."}
    ]
  };

  function cardHTML(p, factory){
    const cls = factory === 'fa' ? 'fa-item' : 'af-item';
    const btnCls = factory === 'fa' ? 'fa-btn' : 'af-btn';
    const name = currentLang === 'ar' ? p.name_ar : p.name;
    const meta = currentLang === 'ar' ? p.meta_ar : p.meta;
    const desc = currentLang === 'ar' ? p.desc_ar : p.desc;
    const priceLabel = currentLang === 'ar' ? 'السعر عند الطلب' : 'Price on request';
    const addLabel = currentLang === 'ar' ? 'أضف إلى السلة' : 'Add to cart';
    return `
      <div class="card ${cls}">
        <div class="swatch">
          <span class="tag-pill">${p.code}</span>
          <div class="icon-circle">${p.icon}</div>
        </div>
        <div class="card-body">
          <h4>${name}</h4>
          <div class="meta">${meta}</div>
          <p class="desc">${desc}</p>
          <div class="card-foot">
            <span class="price">${priceLabel}</span>
            <button class="btn ${btnCls}" id="add-btn-${p.code}" onclick="addToCart('${p.code}')">${addLabel}</button>
          </div>
        </div>
      </div>`;
  }

  function renderGrids(){
    document.getElementById('grid-fa').innerHTML = products.fa.map(p => cardHTML(p,'fa')).join('');
    document.getElementById('grid-af').innerHTML = products.af.map(p => cardHTML(p,'af')).join('');
  }
  renderGrids();

  // Flat lookup of every product by code, used by the cart
  const allProducts = {};
  [...products.fa, ...products.af].forEach(p => { allProducts[p.code] = p; });

  // ---------- View switching ----------
  function showView(view){
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');
    document.querySelectorAll('nav.links button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
  }

  // Used by nav buttons: switches view and closes the mobile dropdown menu
  function navTo(view){
    showView(view);
    document.getElementById('nav-links').classList.remove('open');
  }

  // ---------- Mobile menu toggle ----------
  function toggleMenu(){
    document.getElementById('nav-links').classList.toggle('open');
  }
  document.addEventListener('click', function(e){
    const nav = document.getElementById('nav-links');
    const toggle = document.getElementById('menu-toggle');
    if(nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)){
      nav.classList.remove('open');
    }
  });

  // ---------- Cart ----------
  let cart = {}; // { code: qty }

  function addToCart(code){
    cart[code] = (cart[code] || 0) + 1;
    updateCartBadge();
    flashAdded(code);
  }

  function flashAdded(code){
    const btn = document.getElementById('add-btn-' + code);
    if(!btn) return;
    const original = btn.textContent;
    btn.textContent = currentLang === 'ar' ? 'أُضيف ✓' : 'Added ✓';
    setTimeout(() => { btn.textContent = original; }, 900);
  }

  function changeQty(code, delta){
    cart[code] = (cart[code] || 0) + delta;
    if(cart[code] <= 0) delete cart[code];
    updateCartBadge();
    renderCartItems();
  }

  function removeFromCart(code){
    delete cart[code];
    updateCartBadge();
    renderCartItems();
  }

  function cartCount(){
    return Object.values(cart).reduce((a,b) => a + b, 0);
  }

  function updateCartBadge(){
    const badge = document.getElementById('cart-badge');
    const count = cartCount();
    if(count > 0){
      badge.style.display = 'flex';
      badge.textContent = count;
    } else {
      badge.style.display = 'none';
    }
  }

  function cartRowHTML(code){
    const p = allProducts[code];
    const qty = cart[code];
    const name = currentLang === 'ar' ? p.name_ar : p.name;
    return `
      <div class="cart-row">
        <div class="cart-row-icon">${p.icon}</div>
        <div class="cart-row-info">
          <div class="cart-row-name">${name}</div>
          <div class="cart-row-code">${p.code}</div>
        </div>
        <div class="cart-row-qty">
          <button type="button" onclick="changeQty('${code}',-1)" aria-label="Decrease">−</button>
          <span>${qty}</span>
          <button type="button" onclick="changeQty('${code}',1)" aria-label="Increase">+</button>
        </div>
        <button type="button" class="cart-row-remove" onclick="removeFromCart('${code}')" aria-label="Remove">×</button>
      </div>`;
  }

  function renderCartItems(){
    const codes = Object.keys(cart);
    const container = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('cart-empty');
    const form = document.getElementById('order-form');
    if(codes.length === 0){
      container.innerHTML = '';
      emptyMsg.style.display = 'block';
      form.style.display = 'none';
    } else {
      emptyMsg.style.display = 'none';
      form.style.display = 'block';
      container.innerHTML = codes.map(code => cartRowHTML(code)).join('');
    }
  }

  function openCart(){
    renderCartItems();
    document.getElementById('success-box').classList.remove('show');
    document.getElementById('overlay').classList.add('open');
  }
  function closeModal(){
    document.getElementById('overlay').classList.remove('open');
  }
  document.getElementById('overlay').addEventListener('click', e => {
    if(e.target.id === 'overlay') closeModal();
  });

  document.getElementById('order-form').addEventListener('submit', async function(e){
    e.preventDefault();
    const codes = Object.keys(cart);
    if(codes.length === 0) return;

    const submitBtn = e.target.querySelector('.submit-btn');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = currentLang === 'ar' ? 'جارٍ الإرسال…' : 'Sending…'; }

    const itemLines = codes.map(code => {
      const p = allProducts[code];
      const name = currentLang === 'ar' ? p.name_ar : p.name;
      return `${p.code} - ${name} x${cart[code]}`;
    });
    const itemsStructured = codes.map(code => {
      const p = allProducts[code];
      return { code: p.code, name: p.name, qty: cart[code] };
    });

    const payload = {
      product: itemLines.join('; '),
      name: document.getElementById('f-name').value,
      company: document.getElementById('f-company').value,
      phone: document.getElementById('f-phone').value,
      email: document.getElementById('f-email').value,
      qty: itemLines.join(', '),
      notes: document.getElementById('f-notes').value
    };

    // Push the order to Make.com automatically (no tap needed on the customer's end).
    // keepalive:true lets the request finish even as the page redirects to WhatsApp below.
    fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => { /* Make.com push failed silently — WhatsApp fallback below still works */ });

    // Save the order to Firestore so it shows up in the admin dashboard (admin.html).
    // IMPORTANT: this is awaited BEFORE the WhatsApp redirect below — navigating away
    // immediately would cancel this network request before it finishes.
    if(typeof window.saveOrderToFirestore === 'function'){
      try {
        await window.saveOrderToFirestore({
          items: itemsStructured,
          name: payload.name,
          company: payload.company,
          phone: payload.phone,
          email: payload.email,
          notes: payload.notes
        });
        console.log('✅ Order saved to Firestore — should appear in admin.html');
      } catch(err) {
        console.error('❌ Firestore save failed:', err);
      }
    } else {
      console.error('❌ window.saveOrderToFirestore is not defined — firebase-init.js did not load correctly.');
    }

    // Also open a pre-filled WhatsApp chat as a backup, in case the automation is ever down.
    const L = currentLang === 'ar'
      ? {title:'طلب جديد', items:'الأصناف:', name:'الاسم:', company:'الشركة:', phone:'الهاتف:', email:'البريد الإلكتروني:', notes:'ملاحظات:'}
      : {title:'New order request', items:'Items:', name:'Name:', company:'Company:', phone:'Phone:', email:'Email:', notes:'Notes:'};

    const lines = [
      L.title,
      L.items,
      ...itemLines.map(l => ` - ${l}`),
      `${L.name} ${payload.name}`,
      payload.company ? `${L.company} ${payload.company}` : null,
      `${L.phone} ${payload.phone}`,
      `${L.email} ${payload.email}`,
      payload.notes ? `${L.notes} ${payload.notes}` : null
    ].filter(Boolean).join('\n');

    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    document.getElementById('wa-fallback-link').href = waURL;
    window.location.href = waURL;

    cart = {};
    updateCartBadge();
    showSuccess();
    if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
  });


  function showSuccess(){
    document.getElementById('order-form').style.display = 'none';
    document.getElementById('success-box').classList.add('show');
  }

  // ---------- Language switching ----------
  const translations = {
    en: {
      nav_home:'Home', nav_fa:'Fajer Alsham', nav_af:'Alfajer', nav_whatsapp:'Chat on WhatsApp',
      brand_text:'Alfajer Plastic Company',
      hero_eyebrow:'Two factories · one order desk',
      hero_title:'Plastic products,<br><span class="accent">made to your spec.</span>',
      hero_lede:"Browse the catalogues from our Fajer Alsham and Alfajer factories, and send an order request in a couple of taps — we'll confirm pricing and delivery over WhatsApp.",
      hero_btn_fa:'Browse Fajer Alsham', hero_btn_af:'Browse Alfajer',
      stat_factories_lbl:'Factories', stat_products_lbl:'Product lines', stat_reply_lbl:'Reply time',
      panel_fa_eyebrow:'Factory 01', panel_fa_title:'Fajer Alsham', panel_fa_desc:'Household &amp; packaging plasticware — bags, containers, and film products.',
      panel_af_eyebrow:'Factory 02', panel_af_title:'Alfajer', panel_af_desc:'Industrial plastics — pipes, fittings, sheets, and profile extrusions.',
      panel_explore:'Explore catalogue →',
      why_eyebrow:'Why order from us', why_title:'Two factories, one point of contact.',
      why1_title:'Consistent quality', why1_desc:'Every batch checked against spec before it ships from either factory.',
      why2_title:'Two product ranges', why2_desc:'Household &amp; packaging from Fajer Alsham, industrial plastics from Alfajer.',
      why3_title:'Fast response', why3_desc:'Order requests go straight to our sales desk — no waiting on forms.',
      why4_title:'Bulk &amp; custom sizes', why4_desc:"Tell us the quantity, color, or size you need — we'll quote it directly.",
      step1_title:'Browse the catalogue', step1_desc:"Pick the factory and product you're after.",
      step2_title:'Request the order', step2_desc:'Add quantity and delivery details — takes under a minute.',
      step3_title:'We confirm on WhatsApp', step3_desc:'Our team replies with pricing and delivery — no payment needed here.',
      footer_factories_line:'Fajer Alsham Factory &amp; Alfajer Factory', footer_orders:'Orders', footer_via_whatsapp:'Via WhatsApp',
      footer_bottom:'Fajer Plastics Group — Fajer Alsham &amp; Alfajer factories.',
      cat_fa_eyebrow:'Factory 01 · Fajer Alsham', cat_fa_title:'Fajer Alsham Catalogue', cat_fa_desc:'Household and packaging plastic products. Add items to your cart, then send your order in one go.',
      cat_af_eyebrow:'Factory 02 · Alfajer', cat_af_title:'Alfajer Catalogue', cat_af_desc:'Industrial plastic products — pipes, fittings, sheets and extrusions. Add items to your cart, then send your order in one go.',
      cart_title:'Your Cart', cart_empty:'Your cart is empty — add a product from the catalogue first.',
      form_name:'Full name', form_company:'Company (optional)', form_phone:'Phone', form_email:'Email',
      form_notes:'Notes (color, size, delivery city, etc.)', form_submit:'Send order via WhatsApp',
      form_hint:"This opens WhatsApp with your order details filled in — just hit send. We'll reply to confirm price and delivery, no payment is taken here.",
      success_title:'WhatsApp opened', success_desc:"Just hit send in WhatsApp to complete your request — we'll reply there to confirm details.",
      success_nothing:'Nothing happened?', success_taphere:'Tap here to open WhatsApp',
      page_title:'Fajer Plastics Group — Catalogue &amp; Orders',
      lang_btn:'العربية'
    },
    ar: {
      nav_home:'الرئيسية', nav_fa:'فجر الشام', nav_af:'الفجر', nav_whatsapp:'تواصل عبر واتساب',
      brand_text:'شركة الفجر للصناعات البلاستيكية',
      hero_eyebrow:'مصنعان · مكتب طلبات واحد',
      hero_title:'منتجات بلاستيكية،<br><span class="accent">حسب مواصفاتك.</span>',
      hero_lede:'تصفّح كتالوجات مصنعي فجر الشام والفجر، وأرسل طلب الشراء خلال ثوانٍ — سنؤكد السعر والتوصيل عبر واتساب.',
      hero_btn_fa:'تصفح فجر الشام', hero_btn_af:'تصفح الفجر',
      stat_factories_lbl:'مصانع', stat_products_lbl:'خطوط إنتاج', stat_reply_lbl:'مدة الرد',
      panel_fa_eyebrow:'المصنع 01', panel_fa_title:'فجر الشام', panel_fa_desc:'مستلزمات بلاستيكية منزلية وتغليف — أكياس وعبوات وأفلام.',
      panel_af_eyebrow:'المصنع 02', panel_af_title:'الفجر', panel_af_desc:'بلاستيك صناعي — أنابيب ووصلات وألواح ومقاطع بثق.',
      panel_explore:'استعرض الكتالوج ←',
      why_eyebrow:'لماذا تطلب منّا', why_title:'مصنعان، جهة تواصل واحدة.',
      why1_title:'جودة ثابتة', why1_desc:'كل دفعة تُفحص وفق المواصفات قبل شحنها من أي من المصنعين.',
      why2_title:'خطّا منتجات', why2_desc:'مستلزمات منزلية وتغليف من فجر الشام، وبلاستيك صناعي من الفجر.',
      why3_title:'رد سريع', why3_desc:'طلبات الشراء تصل مباشرة إلى فريق المبيعات — دون انتظار نماذج.',
      why4_title:'كميات ومقاسات مخصصة', why4_desc:'أخبرنا بالكمية أو اللون أو المقاس الذي تحتاجه — وسنرسل لك السعر مباشرة.',
      step1_title:'تصفّح الكتالوج', step1_desc:'اختر المصنع والمنتج الذي تريده.',
      step2_title:'أرسل طلب الشراء', step2_desc:'أضف الكمية وتفاصيل التوصيل — يستغرق أقل من دقيقة.',
      step3_title:'نؤكد عبر واتساب', step3_desc:'يرد فريقنا بالسعر والتوصيل — دون أي دفع هنا.',
      footer_factories_line:'مصنع فجر الشام ومصنع الفجر', footer_orders:'الطلبات', footer_via_whatsapp:'عبر واتساب',
      footer_bottom:'مجموعة فجر للصناعات البلاستيكية — مصنعا فجر الشام والفجر.',
      cat_fa_eyebrow:'المصنع 01 · فجر الشام', cat_fa_title:'كتالوج فجر الشام', cat_fa_desc:'منتجات بلاستيكية منزلية وتغليف. أضف الأصناف إلى سلتك ثم أرسل طلبك دفعة واحدة.',
      cat_af_eyebrow:'المصنع 02 · الفجر', cat_af_title:'كتالوج الفجر', cat_af_desc:'منتجات بلاستيكية صناعية — أنابيب ووصلات وألواح ومقاطع بثق. أضف الأصناف إلى سلتك ثم أرسل طلبك دفعة واحدة.',
      cart_title:'سلة الطلبات', cart_empty:'سلتك فارغة — أضف منتجًا من الكتالوج أولاً.',
      form_name:'الاسم الكامل', form_company:'الشركة (اختياري)', form_phone:'الهاتف', form_email:'البريد الإلكتروني',
      form_notes:'ملاحظات (اللون، المقاس، مدينة التوصيل، إلخ)', form_submit:'إرسال الطلب عبر واتساب',
      form_hint:'سيفتح هذا واتساب مع تفاصيل طلبك جاهزة — فقط اضغط إرسال. سنرد لتأكيد السعر والتوصيل، ولا يُطلب أي دفع هنا.',
      success_title:'تم فتح واتساب', success_desc:'اضغط إرسال في واتساب لإتمام طلبك — سنرد هناك لتأكيد التفاصيل.',
      success_nothing:'لم يحدث شيء؟', success_taphere:'اضغط هنا لفتح واتساب',
      page_title:'مجموعة فجر للصناعات البلاستيكية — كتالوج وطلبات',
      lang_btn:'English'
    }
  };

  function applyLanguage(lang){
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = translations[lang].page_title.replace('&amp;', '&');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = translations[lang][key];
      if(text !== undefined) el.innerHTML = text;
    });

    document.getElementById('lang-btn').textContent = translations[lang].lang_btn;

    // Re-render dynamic content (product cards + cart) in the new language
    renderGrids();
    if(document.getElementById('overlay').classList.contains('open')){
      renderCartItems();
    }
  }

  function toggleLang(){
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
  }
