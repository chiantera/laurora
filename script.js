(() => {
  const EN = {
    "nav.home": "The home",
    "nav.amenities": "Amenities",
    "nav.gallery": "Gallery",
    "nav.location": "Location",
    "hero.eyebrow": "San Vito dei Normanni · Puglia",
    "hero.lede": "An intimate hideaway in the heart of Puglia, between olive groves, white stone and the Adriatic Sea.",
    "hero.cta": "See where we are",
    "hero.cta2": "View the photos",
    "facts.size": "of comfort",
    "facts.terraces": "terraces",
    "facts.ostuni": "from Ostuni",
    "facts.sea": "from the sea",
    "intro.eyebrow": "Welcome",
    "intro.title": "A small home, thoughtfully designed",
    "intro.p1": "L'Aurora is a highly rated, intimate holiday apartment in San Vito dei Normanni, a charming town in southern Italy's Puglia region. Less than a kilometre from the historic centre and the iconic Castello Dentice di Frasso, it's an excellent base for exploring both the Apulian countryside and the Adriatic coast.",
    "intro.p2": "Managed by a private host, it's tailored for couples and solo travellers looking for a quiet, self-sufficient stay — with a private entrance, balcony and panoramic terraces.",
    "am.eyebrow": "Everything you need",
    "am.title": "Amenities & comforts",
    "am.space.t": "Space",
    "am.space.d": "A cozy, efficient 23 m² with one bedroom, one bathroom and a private entrance.",
    "am.out.t": "Outdoor areas",
    "am.out.d": "A private balcony plus covered and open terraces with city or garden views.",
    "am.kit.t": "Kitchen",
    "am.kit.d": "Fully equipped with a refrigerator, stovetop, coffee machine and minibar.",
    "am.comf.t": "Comforts",
    "am.comf.d": "Private air conditioning, soundproofing, high-speed Wi-Fi fit for video calls and a flat-screen TV.",
    "am.log.t": "Self check-in",
    "am.log.d": "Arrive on your own schedule. Street parking under video surveillance.",
    "am.rules.t": "House rules",
    "am.rules.d": "No pets, no smoking and no parties, please.",
    "ft.eyebrow": "The terrace",
    "ft.title": "Breakfast in the sun, aperitivo at sunset",
    "ft.p": "The stone terraces, covered and open, are the heart of L'Aurora: an outdoor corner to relax, read or enjoy warm Apulian evenings.",
    "gal.eyebrow": "A look inside",
    "gal.title": "Gallery",
    "loc.eyebrow": "Location",
    "loc.title": "Authentic Puglia, close to everything",
    "loc.p": "Staying here puts you in an authentic, less-crowded part of Puglia, with the major landmarks just a short drive away.",
    "loc.castle.t": "Historic centre & Castle",
    "loc.castle.d": "Castello Dentice di Frasso, just a short walk",
    "loc.ostuni.t": "Ostuni & Brindisi",
    "loc.ostuni.d": "The \"White City\" and the Colonna di Sant'Oronzo, 15–20 minutes by car",
    "loc.merlata.d": "Gorgeous rocky coves and beaches",
    "loc.tg.t": "Torre Guaceto Reserve",
    "loc.tg.d": "Pristine beaches and a protected marine area",
    "loc.air.t": "Brindisi Airport",
    "loc.air.d": "Brindisi – Salento Airport, the closest hub",
    "loc.map": "Open in Google Maps ↗",
    "cta.title": "We look forward to welcoming you",
    "cta.p": "Get in touch with the host for availability and bookings.",
    "cta.btn": "Check availability",
    "foot.type": "Apartment · Holiday Home",
    "alt.bedroom": "Bedroom",
    "alt.welcome": "Welcome kit",
    "alt.terrace": "Covered terrace",
    "alt.map": "Map of San Vito dei Normanni",
    "doc.title": "L'Aurora · Holiday Apartment in San Vito dei Normanni, Puglia"
  };

  const GALLERY = [
    ["853471776", "Il monolocale", "The studio"],
    ["853471800", "Terrazza", "Terrace"],
    ["853471769", "Colazione", "Breakfast"],
    ["853471761", "Angolo cottura", "Kitchenette"],
    ["853471755", "Bagno", "Bathroom"],
    ["853471746", "Kit di benvenuto", "Welcome kit"],
    ["853471767", "Soggiorno", "Living area"],
    ["853471781", "Terrazza coperta", "Covered terrace"],
    ["853471752", "Tavolo da pranzo", "Dining table"],
    ["853471773", "Camera da letto", "Bedroom"],
    ["853471744", "Macchina del caffè", "Coffee machine"],
    ["853471759", "Terrazza al tramonto", "Terrace at sunset"],
    ["853471745", "Zona giorno", "Day area"],
    ["853471757", "Doccia", "Shower"],
    ["853471808", "Ingresso", "Entrance"]
  ];

  // Capture the Italian text already in the markup
  const IT = {};
  document.querySelectorAll("[data-i18n]").forEach(el => IT[el.dataset.i18n] = el.textContent);
  document.querySelectorAll("[data-i18n-alt]").forEach(el => IT[el.dataset.i18nAlt] = el.alt);
  IT["doc.title"] = document.title;

  // Gallery
  const masonry = document.getElementById("masonry");
  GALLERY.forEach(([id], i) => {
    const b = document.createElement("button");
    b.innerHTML = `<img src="assets/images/${id}.jpg" loading="lazy" alt="">`;
    b.addEventListener("click", () => openLb(i));
    masonry.appendChild(b);
  });

  let lang = "it";
  function setLang(l) {
    lang = l;
    const dict = l === "en" ? EN : IT;
    document.documentElement.lang = l;
    document.title = dict["doc.title"];
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = dict[el.dataset.i18n]; if (v) el.textContent = v; });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => { const v = dict[el.dataset.i18nAlt]; if (v) el.alt = v; });
    masonry.querySelectorAll("img").forEach((img, i) => img.alt = GALLERY[i][l === "en" ? 2 : 1]);
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === l));
    try { localStorage.setItem("laurora-lang", l); } catch (e) {}
  }
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

  let initial = new URLSearchParams(location.search).get("lang");
  if (!initial) { try { initial = localStorage.getItem("laurora-lang"); } catch (e) {} }
  if (!initial) initial = (navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en";
  setLang(initial === "en" ? "en" : "it");

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  let cur = 0;
  function show(i) {
    cur = (i + GALLERY.length) % GALLERY.length;
    lbImg.src = `assets/images/${GALLERY[cur][0]}.jpg`;
    lbImg.alt = GALLERY[cur][lang === "en" ? 2 : 1];
  }
  function openLb(i) { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
  lb.querySelector(".lb-close").onclick = closeLb;
  lb.querySelector(".lb-prev").onclick = e => { e.stopPropagation(); show(cur - 1); };
  lb.querySelector(".lb-next").onclick = e => { e.stopPropagation(); show(cur + 1); };
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });

  // Nav background on scroll
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  document.getElementById("year").textContent = new Date().getFullYear();
})();
