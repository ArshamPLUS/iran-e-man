"use strict";

const MAP_STYLES = {
  dark: "https://tiles.openfreemap.org/styles/dark",
  light: "https://tiles.openfreemap.org/styles/bright",
};

function getSavedTheme() {
  try {
    return localStorage.getItem("iran-e-man-theme") === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

let currentTheme = getSavedTheme();

function updateThemeButton() {
  const button = document.querySelector("#themeToggle");
  const icon = document.querySelector("#themeIcon");
  const label = document.querySelector("#themeLabel");

  if (!button || !icon || !label) return;

  const isDark = currentTheme === "dark";

  icon.textContent = isDark ? "☀" : "☾";
  label.textContent = isDark ? "حالت روز" : "حالت شب";
  button.setAttribute(
    "aria-label",
    isDark ? "تغییر به حالت روز" : "تغییر به حالت شب",
  );
  button.setAttribute("aria-pressed", String(!isDark));
}

function applyTheme(theme, changeMap = true) {
  currentTheme = theme === "light" ? "light" : "dark";

  document.documentElement.dataset.theme = currentTheme;
  updateThemeButton();

  try {
    localStorage.setItem("iran-e-man-theme", currentTheme);
  } catch {
    // ادامه کار بدون ذخیره‌سازی
  }
}
applyTheme(currentTheme, false);

document.querySelector("#themeToggle")?.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

const $ = (selector) => document.querySelector(selector);

const cities = [
  {
    id: "tehran",
    name: "تهران",
    province: "استان تهران",
    region: "شمال مرکزی ایران",
    description: "پایتخت ایران؛ شهری پرجنب‌وجوش در دامنه‌های جنوبی البرز.",
    image: "./assets/images/tehran.jpg",
    coordinates: [51.389, 35.689],
    zoom: 10,
    category: "پایتخت ایران",
  },
  {
    id: "isfahan",
    name: "اصفهان",
    province: "استان اصفهان",
    region: "مرکز ایران",
    description: "شهری تاریخی با معماری باشکوه، میدان نقش جهان و پل‌های دیدنی.",
    image: "./assets/images/isfahan.jpg",
    coordinates: [51.677, 32.654],
    zoom: 10,
    category: "شهر تاریخی",
  },
  {
    id: "shiraz",
    name: "شیراز",
    province: "استان فارس",
    region: "جنوب ایران",
    description:
      "شهر شعر و باغ‌های ایرانی؛ میزبان حافظیه، سعدیه و جاذبه‌های تاریخی.",
    image: "./assets/images/shiraz.jpg",
    coordinates: [52.531, 29.592],
    zoom: 10,
    category: "شهر فرهنگ و شعر",
  },
  {
    id: "yazd",
    name: "یزد",
    province: "استان یزد",
    region: "مرکز ایران",
    description:
      "شهر بادگیرها، خانه‌های خشتی و کوچه‌های تاریخی با معماری کویری.",
    image: "./assets/images/yazd.jpg",
    coordinates: [54.367, 31.897],
    zoom: 10,
    category: "شهر کویری",
  },
  {
    id: "tabriz",
    name: "تبریز",
    province: "استان آذربایجان شرقی",
    region: "شمال غرب ایران",
    description:
      "شهری با پیشینه تاریخی غنی، بازار سرپوشیده و فرهنگ آذربایجانی.",
    image: "./assets/images/tabriz.jpg",
    coordinates: [46.291, 38.08],
    zoom: 10,
    category: "شهر تاریخی",
  },
  {
    id: "rasht",
    name: "رشت",
    province: "استان گیلان",
    region: "شمال ایران",
    description: "شهری سرسبز در شمال ایران، با بازار محلی و غذاهای گیلانی.",
    image: "./assets/images/rasht.jpg",
    coordinates: [49.589, 37.28],
    zoom: 10,
    category: "شهر بارانی",
  },
  {
    id: "babol",
    name: "بابل",
    province: "استان مازندران",
    region: "شمال ایران",
    description:
      "شهری سرسبز در مازندران، نزدیک جنگل‌های هیرکانی و جاذبه‌های طبیعی شمال ایران.",
    image: "./assets/images/babol.jpg",
    coordinates: [52.687, 36.551],
    zoom: 10,
    category: "شهر شمالی",
  },
  {
    id: "kerman",
    name: "کرمان",
    province: "استان کرمان",
    region: "جنوب شرق ایران",
    description:
      "شهری تاریخی با بازار قدیمی، بناهای سنتی و دسترسی به جاذبه‌های کویری.",
    image: "./assets/images/kerman.jpg",
    coordinates: [57.078, 30.283],
    zoom: 10,
    category: "شهر تاریخی",
  },
  {
    id: "kermanshah",
    name: "کرمانشاه",
    province: "استان کرمانشاه",
    region: "غرب ایران",
    description:
      "شهری باستانی در غرب ایران، نزدیک آثار تاریخی طاق‌بستان و بیستون.",
    image: "./assets/images/kermanshah.jpg",
    coordinates: [47.065, 34.314],
    zoom: 10,
    category: "شهر تاریخی",
  },
  {
    id: "kish",
    name: "کیش",
    province: "استان هرمزگان",
    region: "جنوب ایران",
    description:
      "جزیره‌ای در خلیج فارس با سواحل زیبا، تفریحات دریایی و جاذبه‌های گردشگری.",
    image: "./assets/images/kish.jpg",
    coordinates: [53.98, 26.533],
    zoom: 11,
    category: "جزیره گردشگری",
  },
  {
    id: "mashhad",
    name: "مشهد",
    province: "خراسان رضوی",
    coordinates: [59.6168, 36.2605],
    description:
      "مشهد، شهر زیارت و فرهنگ؛ میزبان حرم امام رضا (ع) و جاذبه‌های تاریخی و طبیعی خراسان رضوی.",
    image: "assets/images/mashhad.jpg",
    attractions: [
      "حرم امام رضا (ع)",
      "آرامگاه فردوسی",
      "کوهسنگی",
      "طرقبه و شاندیز",
    ],
  },
];

// فقط این پنج شهر در فهرست «شهرهای منتخب» نمایش داده می‌شوند.
const featuredCityNames = ["تهران", "اصفهان", "شیراز", "یزد", "تبریز"];

const IRAN_BOUNDS = [
  [44.0, 25.0],
  [63.5, 40.5],
];

let selectedCityId = "tehran";
let showAllCities = false;
let map = null;
const markers = {};

// ساخت فهرست شهرهای منتخب
function renderCityList() {
  const list = $("#cityList");
  if (!list) return;

  const featuredCities = cities.filter((city) =>
    featuredCityNames.includes(city.name),
  );

  list.innerHTML = featuredCities
    .map(
      (city, index) => `
    <button
      class="city-list-item ${city.id === selectedCityId ? "active" : ""}"
      type="button"
      data-city="${city.id}"
      aria-pressed="${city.id === selectedCityId}"
    >
      <span class="list-number">${String(index + 1).padStart(2, "0")}</span>

      <span class="list-city-text">
        <strong>${city.name}</strong>
        <small>${city.province}</small>
      </span>

      <span class="list-arrow" aria-hidden="true">↙</span>
    </button>
  `,
    )
    .join("");
}

// ساخت کارت‌های همه شهرها

function renderCityCards() {
  const container = $("#cityCards");
  if (!container) return;

  container.innerHTML = cities
    .map(
      (city) => `
    <article
      class="city-card ${city.id === selectedCityId ? "active" : ""}"
      data-city="${city.id}"
      tabindex="0"
      role="button"
      aria-label="نمایش ${city.name} روی نقشه"
      aria-pressed="${city.id === selectedCityId}"
    >
      <div class="city-card-image">
        <img
          src="${city.image}"
          alt="تصویر ${city.name}"
          loading="lazy"
        >
      </div>

      <div class="city-card-content">
        <h3>${city.name}</h3>
        <p>${city.category}</p>

        <div class="city-card-link">
          <span>مشاهده روی نقشه</span>
          <span aria-hidden="true">↙</span>
        </div>
      </div>
    </article>
  `,
    )
    .join("");

  updateCityCardsVisibility();
}

function updateCityCardsVisibility() {
  const container = $("#cityCards");
  const button = $("#showMoreCities");

  if (!container || !button) return;

  const cards = Array.from(container.querySelectorAll(".city-card"));

  const gridColumns = getComputedStyle(container)
    .gridTemplateColumns.split(/\s+/)
    .filter(Boolean).length;

  const visibleCount = Math.max(1, gridColumns) * 2;
  const shouldAnimate = showAllCities;

  cards.forEach((card, index) => {
    const shouldShow = showAllCities || index < visibleCount;
    const wasHidden = card.hidden;

    if (shouldShow) {
      card.hidden = false;

      if (shouldAnimate && wasHidden) {
        card.classList.remove("show-animation");

        // شروع دوباره انیمیشن
        void card.offsetWidth;

        card.classList.add("show-animation");
      } else {
        card.classList.remove("show-animation");
      }
    } else {
      card.hidden = true;
      card.classList.remove("show-animation");
    }
  });

  button.hidden = cards.length <= visibleCount;
  button.textContent = showAllCities ? "نمایش کمتر" : "نمایش بیشتر";

  button.setAttribute("aria-expanded", String(showAllCities));
}

// به‌روزرسانی تصویر شهر انتخاب‌شده
function updateSelectedImage(city) {
  const image = $("#selectedCityImage");
  if (!image) return;

  image.style.opacity = "0";

  image.onload = () => {
    image.style.display = "block";
    image.style.opacity = "1";
  };

  image.onerror = () => {
    image.style.display = "none";
  };

  image.src = city.image;
  image.alt = `تصویر ${city.name}`;

  // برای زمانی که تصویر از حافظه مرورگر بارگذاری شده باشد
  if (image.complete && image.naturalWidth > 0) {
    image.style.display = "block";
    image.style.opacity = "1";
  }
}

// به‌روزرسانی اطلاعات شهر انتخاب‌شده
function updateSelectedCity(city) {
  const name = $("#selectedCityName");
  const description = $("#selectedCityDescription");
  const province = $("#selectedCityProvince");
  const region = $("#selectedCityRegion");
  const category = $("#selectedCityCategory");

  if (name) name.textContent = city.name;
  if (description) description.textContent = city.description;
  if (province) province.textContent = city.province;
  if (region) region.textContent = city.region;
  if (category) category.textContent = city.category;

  updateSelectedImage(city);

  document.title = `${city.name} | ایرانِ من`;

  renderCityList();
  renderCityCards();

  // فعال‌کردن نشانگر شهر انتخاب‌شده
  Object.entries(markers).forEach(([id, marker]) => {
    const element = marker.getElement();
    element.classList.toggle("active", id === city.id);
    element.setAttribute("aria-pressed", String(id === city.id));
  });
}

// انتخاب شهر
function selectCity(cityId, shouldFly = true) {
  const city = cities.find((item) => item.id === cityId);
  if (!city) return;

  selectedCityId = city.id;
  updateSelectedCity(city);

  if (shouldFly && map) {
    map.flyTo({
      center: city.coordinates,
      zoom: city.zoom,
      speed: 0.9,
      curve: 1.35,
      essential: true,
    });
  }
}

// نمایش کل ایران
function resetMapView() {
  selectedCityId = "tehran";

  const tehran = cities.find((city) => city.id === "tehran");
  if (tehran) {
    updateSelectedCity(tehran);
  }

  if (map) {
    map.fitBounds(IRAN_BOUNDS, {
      padding: {
        top: 70,
        right: 55,
        bottom: 65,
        left: 55,
      },
      duration: 1000,
      maxZoom: 5.2,
    });
  }
}

// ساخت نشانگر شهر با متن HTML
function createCityMarker(city) {
  const markerElement = document.createElement("button");

  markerElement.className = "city-marker";
  markerElement.type = "button";
  markerElement.setAttribute("aria-label", `نمایش ${city.name} روی نقشه`);
  markerElement.setAttribute(
    "aria-pressed",
    String(city.id === selectedCityId),
  );
  markerElement.title = city.name;
  markerElement.dir = "rtl";

  const label = document.createElement("span");
  label.className = "city-marker-label";
  label.textContent = city.name;
  label.dir = "rtl";

  const dot = document.createElement("span");
  dot.className = "city-marker-dot";
  dot.setAttribute("aria-hidden", "true");

  markerElement.append(label, dot);

  const marker = new maplibregl.Marker({
    element: markerElement,
    anchor: "bottom",
  })
    .setLngLat(city.coordinates)
    .addTo(map);

  markerElement.addEventListener("click", (event) => {
    event.stopPropagation();
    selectCity(city.id, true);
  });

  markers[city.id] = marker;
}

// مخفی‌کردن نوشته‌ها و آیکون‌های متنی نقشه پایه
function hideBaseMapSymbols() {
  const style = map.getStyle();
  if (!style || !Array.isArray(style.layers)) return;

  style.layers.forEach((layer) => {
    if (layer.type === "symbol") {
      try {
        map.setLayoutProperty(layer.id, "visibility", "none");
      } catch (error) {
        console.warn(`امکان مخفی‌کردن لایه ${layer.id} وجود نداشت.`, error);
      }
    }
  });
}

// ایجاد نقشه
function initializeMap() {
  const mapElement = $("#map");
  if (!mapElement) return;

  if (typeof maplibregl === "undefined") {
    mapElement.innerHTML = `
      <div style="padding:30px;color:#f5f0fc;text-align:center">
        <h3>کتابخانه نقشه بارگذاری نشد</h3>
        <p>اتصال اینترنت یا آدرس کتابخانه MapLibre را بررسی کن.</p>
      </div>
    `;
    return;
  }

  map = new maplibregl.Map({
    container: "map",
    style: MAP_STYLES[currentTheme],
    center: [53.2, 33.2],
    zoom: 4.25,
    minZoom: 3,
    maxZoom: 16,
    attributionControl: true,
  });

  map.addControl(
    new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true,
    }),
    "bottom-left",
  );

  map.on("load", () => {
    // جلوگیری از جدا نمایش‌دادن حروف فارسی در نوشته‌های نقشه پایه
    hideBaseMapSymbols();

    // اضافه‌کردن نشانگرهای تمام شهرها
    cities.forEach(createCityMarker);

    // نمایش اولیه محدوده ایران
    map.fitBounds(IRAN_BOUNDS, {
      padding: {
        top: 70,
        right: 55,
        bottom: 65,
        left: 55,
      },
      duration: 800,
      maxZoom: 5.2,
    });
  });

  map.on("error", (event) => {
    console.warn("خطای نقشه:", event.error || event);
  });
}

// کلیک روی فهرست و کارت‌های شهرها
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-city]");
  if (!target) return;

  selectCity(target.dataset.city, true);
});

// پشتیبانی از صفحه‌کلید برای کارت‌ها
document.addEventListener("keydown", (event) => {
  const card = event.target.closest(".city-card");
  if (!card) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectCity(card.dataset.city, true);
  }
});

// دکمه نمایش کل ایران
const resetButton = $("#resetMap");

if (resetButton) {
  resetButton.addEventListener("click", resetMapView);
}

const showMoreButton = $("#showMoreCities");

if (showMoreButton) {
  showMoreButton.addEventListener("click", () => {
    showAllCities = !showAllCities;
    updateCityCardsVisibility();
  });
}

// هنگام تغییر اندازه صفحه، تعداد ردیف‌ها دوباره محاسبه می‌شود.
window.addEventListener("resize", () => {
  updateCityCardsVisibility();
});

// راه‌اندازی اولیه صفحه
renderCityList();
renderCityCards();

const initialCity = cities.find((city) => city.id === selectedCityId);
if (initialCity) {
  updateSelectedCity(initialCity);
}

initializeMap();
