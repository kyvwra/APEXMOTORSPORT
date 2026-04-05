document.addEventListener("DOMContentLoaded", () => {
  // 1. COUNTER ANIMAT (INDEX)
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const speed = 2000; 
        const increment = target / (speed / 16); 
        const update = () => {
          if(current < target) {
            current += increment;
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(update);
          } else { counter.innerText = target; }
        };
        update(); counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // 2. DYNO BARS ANIMATION (TUNING)
  const dynoFills = document.querySelectorAll('.dyno-fill');
  const dynoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width');
        dynoObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });
  dynoFills.forEach(fill => dynoObserver.observe(fill));

  // 3. LOGICĂ MODALE (PROGRAMARE, TRANSPORT, ASISTENȚĂ)
  const overlay = document.getElementById('modalOverlay');
  const transportOverlay = document.getElementById('transportOverlay');
  const bookingModal = document.getElementById('bookingModal');
  const transportModal = document.getElementById('transportModal');
  
  const closeAll = () => {
    if(bookingModal) bookingModal.classList.remove('active');
    if(transportModal) transportModal.classList.remove('active');
    if(overlay) overlay.style.display = 'none';
    if(transportOverlay) transportOverlay.style.display = 'none';
  };

  document.querySelectorAll('#openBookingBtn, #openBookingBtn2').forEach(btn => {
    btn.addEventListener('click', () => {
      if(overlay && bookingModal) {
        overlay.style.display = 'block';
        setTimeout(() => bookingModal.classList.add('active'), 10);
      }
    });
  });

  document.getElementById('openTransportBtn')?.addEventListener('click', () => {
    if(transportOverlay && transportModal) {
      transportOverlay.style.display = 'block';
      setTimeout(() => transportModal.classList.add('active'), 10);
    }
  });

  document.querySelectorAll('.close-menu, .modal-overlay, #transportOverlay').forEach(el => el.addEventListener('click', closeAll));

  // 4. MENIU HAMBURGER
  const sideMenu = document.getElementById('sideMenu');
  const sideMenuOverlay = document.getElementById('sideMenuOverlay');
  document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
    sideMenu.classList.add('active');
    if(sideMenuOverlay) sideMenuOverlay.style.display = 'block';
  });
  document.getElementById('closeMenuBtn')?.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    if(sideMenuOverlay) sideMenuOverlay.style.display = 'none';
  });

  // 5. INIȚIALIZARE SIMULATOR
  if(document.getElementById('mods-list')) window.loadCar('audi');
});

// 6. LOGICĂ CUSTOM BUILD SIMULATOR
const carData = {
  audi: { baseHp: 600, baseNm: 800, baseTime: 3.6, mods: [{ id: 'ecu', name: "Apex Stage 1 ECU", hp: 90, nm: 120, time: 0.3 }, { id: 'turbo', name: "TTE1020 Turbos", hp: 180, nm: 200, time: 0.4 }, { id: 'dp', name: "Downpipes", hp: 40, nm: 60, time: 0.1 }] },
  porsche: { baseHp: 650, baseNm: 800, baseTime: 2.7, mods: [{ id: 'ecu', name: "Apex Stage 1 ECU", hp: 70, nm: 100, time: 0.2 }, { id: 'turbo', name: "Pure Turbos", hp: 200, nm: 150, time: 0.3 }] },
  mercedes: { baseHp: 612, baseNm: 850, baseTime: 3.4, mods: [{ id: 'ecu', name: "Apex Stage 1 ECU", hp: 80, nm: 150, time: 0.3 }, { id: 'tcu', name: "CPC Mod", hp: 0, nm: 50, time: 0.1 }] }
};
let currentCar = 'audi', activeMods = [];

window.loadCar = function(carKey) {
  currentCar = carKey; activeMods = [];
  document.querySelectorAll('.btn-car').forEach(btn => {
    btn.classList.remove('active');
    if(btn.innerText.toLowerCase().includes(carKey)) btn.classList.add('active');
  });
  const modsListEl = document.getElementById('mods-list');
  if(!modsListEl) return;
  modsListEl.innerHTML = carData[carKey].mods.map(mod => `
    <div class="mod-toggle" onclick="window.toggleMod('${mod.id}', this)">
      <div><span class="mod-name">${mod.name}</span><br><small>+${mod.hp}HP / +${mod.nm}Nm</small></div>
      <div class="mod-checkbox"></div>
    </div>`).join('');
  window.updateSimulatorStats();
};

window.toggleMod = function(modId, element) {
  element.classList.toggle('active');
  activeMods.includes(modId) ? activeMods = activeMods.filter(id => id !== modId) : activeMods.push(modId);
  window.updateSimulatorStats();
};

window.updateSimulatorStats = function() {
  const car = carData[currentCar];
  let hp = car.baseHp, nm = car.baseNm, time = car.baseTime;
  activeMods.forEach(mId => { const m = car.mods.find(x => x.id === mId); if(m) { hp += m.hp; nm += m.nm; time -= m.time; } });
  if(document.getElementById('stat-hp-stock')) {
    document.getElementById('stat-hp-stock').innerText = car.baseHp;
    document.getElementById('stat-hp-tuned').innerText = hp;
    document.getElementById('stat-nm-tuned').innerText = nm;
    document.getElementById('stat-time-tuned').innerText = time.toFixed(1) + "s";
  }
};

// 7. ENGINE BLOG SYSTEM (TEXTE DETALIATE ÎN ROMÂNĂ)
const blogPosts = {
  stage1: { 
    title: "Mituri Stage 1: Performanță vs. Fiabilitate", 
    img: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800", 
    text: "<p>Resoftarea Stage 1 reprezintă calibrarea software-ului original al mașinii pentru a debloca potențialul ascuns al motorului, fără a schimba piese mecanice. Mulți proprietari se tem că acest proces scade durata de viață a motorului, însă în realitate, producătorii lasă marje de siguranță uriașe pentru a compensa mentenanța neglijentă sau combustibilul de slabă calitate.</p><p>La Apex Motorsport, optimizăm amestecul aer-combustibil și avansul aprinderii pentru o livrare liniară de cuplu, menținând toate protecțiile termice active. O mentenanță corectă la intervale scurte (7.000 - 10.000 km) garantează longevitatea motorului la puteri superioare.</p>" 
  },
  dyno: { 
    title: "Analiza Dyno: Precizia în cifre reale", 
    img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800", 
    text: "<p>Un stand dinamometric (Dyno) este singura cale sigură de a măsura puterea reală la roată. Dincolo de cifrele finale de HP și Nm, Dyno-ul ne permite să vizualizăm curba de putere și să logăm parametri critici sub sarcină maximă, cum ar fi presiunea turbo și temperaturile de evacuare.</p><p>Fără o analiză pe stand, tuning-ul este bazat pe estimări. La Apex, fiecare mașină trece printr-o sesiune riguroasă de testare pentru a ne asigura că softul este perfect adaptat hardware-ului, eliminând riscul de detonări sau supraîncălzire.</p>" 
  },
  engine: { 
    title: "Engine Building: Arta componentelor forjate", 
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800", 
    text: "<p>Atunci când obiectivul de putere depășește limitele mecanice ale componentelor de fabrică (peste 700-800 CP pe platforme moderne), motorul are nevoie de o reconstrucție completă. Bielele și pistoanele forjate devin obligatorii pentru a suporta presiunile masive din camera de ardere.</p><p>Asamblarea unui motor de performanță la Apex presupune măsurători de mare precizie la nivel de micron. Folosim doar componente de top și prezoane de chiulasă ARP pentru a preveni deformările sub stres termic extrem, transformând un motor de serie într-o unitate capabilă să livreze performanțe record constant.</p>" 
  },
  turbo: { 
    title: "Turbo Upgrades: Hybrid vs. Big Turbo Kits", 
    img: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800", 
    text: "<p>Alegerea sistemului de supraalimentare definește comportamentul mașinii pe stradă sau pe circuit. Turbinele Hybrid păstrează carcasele originale dar folosesc pale interioare mai mari, oferind un răspuns rapid (spool) ideal pentru condusul zilnic.</p><p>Kiturile 'Big Turbo' schimbă complet fluxul de aer, fiind dedicate celor care caută cifre extreme la turații mari. La Apex, configurăm sistemul de turbo în funcție de scopul mașinii, asigurând un management termic corect prin intercoolere supradimensionate și trasee de admisie optimizate.</p>" 
  },
  oil: { 
    title: "Racing Oils: Protecție la temperaturi extreme", 
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800", 
    text: "<p>Uleiul de serie nu este proiectat să reziste stresului termic de pe circuit, unde temperaturile pot depăși frecvent 120-130 de grade Celsius. În aceste condiții, pelicula de ungere se rupe, ducând la uzura fatală a cuzineților.</p><p>Folosim lubrifianți cu vâscozitate specifică racing care își păstrează proprietățile chimice sub stres extrem. Pentru mașinile modificate, uleiul nu este doar un consumabil, ci o barieră vitală între componentele metalice aflate în mișcare rapidă.</p>" 
  },
  brakes: { 
    title: "Sisteme de frânare: Oprirea în siguranță", 
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800", 
    text: "<p>Accelerarea este doar jumătate din ecuație; capacitatea de oprire este cea care îți permite să conduci mașina la limită. Atunci când măriți puterea, sistemul de frânare trebuie să facă față unor forțe cinetice mult mai mari.</p><p>Upgrade-ul la discuri flotante, plăcuțe de frână cu compoziție ceramică și lichid de frână cu punct de fierbere ridicat previne fenomenul de 'brake fade'. Instalăm sisteme complete Big Brake Kit (BBK) care oferă o forță de oprire constantă și predictibilă, tur după tur.</p>" 
  },
  tcu: { 
    title: "TCU Tuning: Creierul transmisiei", 
    img: "https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=800", 
    text: "<p>Multe mașini moderne sunt limitate nu de motor, ci de software-ul cutiei de viteze (TCU). Resoftarea transmisiei permite schimbări de trepte mult mai rapide, elimină limitatoarele de cuplu impuse de fabrică și mărește presiunea pe ambreiaje pentru a preveni patinarea.</p><p>Prin TCU Tuning, optimizăm logica de schimbare în modurile Sport, oferind un control total pilotului și protejând transmisia prin gestionarea corectă a cuplului instantaneu livrat de un motor modificat.</p>" 
  },
  exhaust: { 
    title: "Exhaust Flow: Managementul gazelor de evacuare", 
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800", 
    text: "<p>O evacuare bine proiectată nu este doar despre sunetul agresiv, ci despre eliminarea presiunii de retur (backpressure). Gazele de evacuare fierbinți trebuie eliminate cât mai rapid pentru a permite turbinei să funcționeze liber.</p><p>Folosim sisteme din inox sau titan care reduc considerabil greutatea mașinii și temperaturile interne ale compartimentului motor. Un flux de evacuare optimizat scade temperatura aerului în admisie și permite un avans al aprinderii mai agresiv, rezultând în cai putere suplimentari obținuți în siguranță.</p>" 
  },
  ppf: { 
    title: "Ceramic & PPF: Armura estetică", 
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800", 
    text: "<p>La viteze mari, vopseaua mașinii este constant bombardată de pietricele și resturi de pe asfalt. Folia de protecție transparentă (PPF) este singura barieră fizică reală care previne ciobiturile și zgârieturile.</p><p>Completată de o protecție ceramică multistrat, mașina devine extrem de ușor de întreținut, respingând apa și contaminanții. Estetica trebuie să se potrivească performanței, iar la Apex ne asigurăm că investiția ta arată ca noua chiar și după mii de kilometri rulați sportiv.</p>" 
  },
  cooling: { 
    title: "Cooling Mods: Inamicul căldurii (Heat Soak)", 
    img: "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=800", 
    text: "<p>Căldura este inamicul numărul unu al performanței. Când aerul de admisie devine prea fierbinte, unitatea ECU reduce puterea pentru a preveni topirea componentelor interne. Upgrade-ul la intercoolere de volum mare și radiatoare suplimentare menține performanța constantă.</p><p>În zilele de vară sau în sesiunile prelungite de circuit, sistemele de cooling optimizate permit mașinii să livreze 100% din putere constant, eliminând scăderile bruște cauzate de supraîncălzirea aerului comprimat de turbină.</p>" 
  }
};

window.openBlogModal = (id) => {
  const p = blogPosts[id];
  const container = document.getElementById('blogPostContainer');
  const overlay = document.getElementById('blogModalOverlay');
  const modal = document.getElementById('blogContentModal');

  if(p && container) {
    container.innerHTML = `
      <div style="background:url('${p.img}') center/cover; height:250px; width:100%; border-radius:4px; margin-bottom:20px;"></div>
      <h2 style="font-family: var(--font-heading); text-transform: uppercase; color: #111; font-size: 24px; line-height: 1.2;">${p.title}</h2>
      <div style="margin-top:20px; line-height:1.7; color: #444; font-size: 15px; font-family: var(--font-body);">${p.text}</div>
      <button class="btn-nav" style="width:100%; margin-top:30px;" onclick="closeBlogModal()">ÎNCHIDE ARTICOLUL</button>
    `;
    if(overlay) overlay.style.display = 'block';
    if(modal) modal.classList.add('active');
  }
};

window.closeBlogModal = () => {
  const modal = document.getElementById('blogContentModal');
  const overlay = document.getElementById('blogModalOverlay');
  if(modal) modal.classList.remove('active');
  setTimeout(() => { if(overlay) overlay.style.display = 'none'; }, 300);
};