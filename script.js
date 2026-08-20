// ---------- CONFIG ----------
  // WhatsApp number that receives order requests. Digits only, country code first, no + or leading zeros.
  const WHATSAPP_NUMBER = "962792248085";
  // Make.com webhook — pushes order data automatically to WhatsApp (no tap needed on the customer's end).
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/jeap966t1hqdf2xds48gceu7nfh8jb8o";

  // ---------- PRODUCT DATA (replace with your real products & photos) ----------
  const iconBag = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`;
  const iconContainer = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="5" y="8" width="14" height="12" rx="1"/><path d="M8 8V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/></svg>`;
  const iconFilm = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M3 15h18M8 5v14M16 5v14"/></svg>`;
  const iconPipe = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="2" y="9" width="20" height="6" rx="3"/><ellipse cx="4" cy="12" rx="2" ry="3"/></svg>`;
  const iconFitting = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><path d="M4 12h6M14 12h6M10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/><path d="M12 8v-3M12 19v-3"/></svg>`;
  const iconSheet = `<svg viewBox="0 0 24 24" fill="none" stroke="#1E2130" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 14h18"/></svg>`;

  const products = {
    fa: [
      {code:"FA-101", name:"Woven Poly Bags", icon:iconBag, meta:"HDPE · 25–50kg capacity", desc:"Durable woven bags for grain, feed, and bulk packaging."},
      {code:"FA-102", name:"Storage Containers", icon:iconContainer, meta:"PP · 5L / 10L / 20L", desc:"Stackable food-grade containers with snap lids."},
      {code:"FA-103", name:"Shrink Film Rolls", icon:iconFilm, meta:"LDPE · 300–1500mm width", desc:"Clear shrink film for pallet and product wrapping."},
      {code:"FA-104", name:"Garbage Bags", icon:iconBag, meta:"HDPE/LDPE · multiple sizes", desc:"Heavy-duty bags for household and commercial waste."},
      {code:"FA-105", name:"Retail Carrier Bags", icon:iconBag, meta:"HDPE · printed or plain", desc:"Custom-branded carrier bags for shops and supermarkets."},
      {code:"FA-106", name:"Stretch Wrap", icon:iconFilm, meta:"LLDPE · 17–23 micron", desc:"Pallet stretch wrap for warehousing and logistics."}
    ],
    af: [
      {code:"AF-201", name:"PVC Pressure Pipe", icon:iconPipe, meta:"PVC-U · 1/2\" – 8\"", desc:"Pressure-rated pipe for water supply and irrigation."},
      {code:"AF-202", name:"HDPE Pipe Coils", icon:iconPipe, meta:"HDPE · PE80/PE100", desc:"Coiled pipe for underground and agricultural lines."},
      {code:"AF-203", name:"Pipe Fittings Set", icon:iconFitting, meta:"PVC/PP · elbows, tees, couplers", desc:"Standard fittings compatible with our pipe range."},
      {code:"AF-204", name:"PVC Sheet Panels", icon:iconSheet, meta:"PVC foam · 3–18mm", desc:"Rigid sheet panels for signage, cladding and fabrication."},
      {code:"AF-205", name:"Corrugated Drainage Pipe", icon:iconPipe, meta:"HDPE · double-wall", desc:"Perforated drainage pipe for civil and agricultural works."},
      {code:"AF-206", name:"Cable Conduit &amp; Ducting", icon:iconFitting, meta:"PVC · 16–110mm", desc:"Electrical conduit and ducting for cable protection."}
    ]
  };

  function cardHTML(p, factory){
    const cls = factory === 'fa' ? 'fa-item' : 'af-item';
    const btnCls = factory === 'fa' ? 'fa-btn' : 'af-btn';
    return `
      <div class="card ${cls}">
        <div class="swatch">
          <span class="tag-pill">${p.code}</span>
          <div class="icon-circle">${p.icon}</div>
        </div>
        <div class="card-body">
          <h4>${p.name}</h4>
          <div class="meta">${p.meta}</div>
          <p class="desc">${p.desc}</p>
          <div class="card-foot">
            <span class="price">Price on request</span>
            <button class="btn ${btnCls}" id="add-btn-${p.code}" onclick="addToCart('${p.code}')">Add to cart</button>
          </div>
        </div>
      </div>`;
  }

  document.getElementById('grid-fa').innerHTML = products.fa.map(p => cardHTML(p,'fa')).join('');
  document.getElementById('grid-af').innerHTML = products.af.map(p => cardHTML(p,'af')).join('');

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
    btn.textContent = 'Added ✓';
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
    return `
      <div class="cart-row">
        <div class="cart-row-icon">${p.icon}</div>
        <div class="cart-row-info">
          <div class="cart-row-name">${p.name}</div>
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

  document.getElementById('order-form').addEventListener('submit', function(e){
    e.preventDefault();
    const codes = Object.keys(cart);
    if(codes.length === 0) return;

    const itemLines = codes.map(code => `${allProducts[code].code} - ${allProducts[code].name} x${cart[code]}`);

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

    // Also open a pre-filled WhatsApp chat as a backup, in case the automation is ever down.
    const lines = [
      `New order request`,
      `Items:`,
      ...itemLines.map(l => ` - ${l}`),
      `Name: ${payload.name}`,
      payload.company ? `Company: ${payload.company}` : null,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      payload.notes ? `Notes: ${payload.notes}` : null
    ].filter(Boolean).join('\n');

    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    document.getElementById('wa-fallback-link').href = waURL;
    window.location.href = waURL;

    cart = {};
    updateCartBadge();
    showSuccess();
  });

  function showSuccess(){
    document.getElementById('order-form').style.display = 'none';
    document.getElementById('success-box').classList.add('show');
  }
