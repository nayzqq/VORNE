import { FormEvent, useEffect, useMemo, useState } from "react"

type Language = "ru" | "en"
type Page =
  | "home"
  | "models"
  | "model"
  | "configurator"
  | "technology"
  | "service"
  | "about"
  | "contacts"

type Model = {
  code: string
  name: { ru: string en: string }
  price: string
  image: string
  spec: string
  power: string
  acceleration: string
  range: string
}

const models: Model[] = [
  {
    code: "S1",
    name: { ru: "Городской седан", en: "Urban sedan" },
    price: "1 690 000 ₽",
    image: `${import.meta.env.BASE_URL}assets/vorne-s1.jpg`,
    spec: "FWD / 1.6–2.0 / AT",
    power: "150 л.с.",
    acceleration: "9,2 с",
    range: "620 км",
  },
  {
    code: "S5",
    name: { ru: "Бизнес-седан", en: "Business sedan" },
    price: "2 490 000 ₽",
    image: `${import.meta.env.BASE_URL}assets/vorne-s5.jpg`,
    spec: "AWD / 245 HP / 8AT",
    power: "245 л.с.",
    acceleration: "6,8 с",
    range: "710 км",
  },
  {
    code: "X3",
    name: { ru: "Компактный кроссовер", en: "Compact crossover" },
    price: "2 390 000 ₽",
    image: `${import.meta.env.BASE_URL}assets/vorne-x3.jpg`,
    spec: "AWD / 190 HP / 7DCT",
    power: "190 л.с.",
    acceleration: "7,9 с",
    range: "680 км",
  },
  {
    code: "X7",
    name: { ru: "Семейный SUV", en: "Family SUV" },
    price: "3 490 000 ₽",
    image: `${import.meta.env.BASE_URL}assets/vorne-x7.jpg`,
    spec: "AWD / 245 HP / 7 SEATS",
    power: "245 л.с.",
    acceleration: "7,4 с",
    range: "740 км",
  },
  {
    code: "GT",
    name: { ru: "Спортивная модель", en: "Performance model" },
    price: "3 990 000 ₽",
    image: `${import.meta.env.BASE_URL}assets/vorne-gt.jpg`,
    spec: "AWD / 300 HP / 8AT",
    power: "300 л.с.",
    acceleration: "5,1 с",
    range: "650 км",
  },
]

const configuratorChoices = {
  colors: [
    {
      id: "midnight",
      color: "#12325c",
      ru: "Полуночный синий",
      en: "Midnight blue",
    },
    {
      id: "ice",
      color: "#dedfda",
      ru: "Ледяной белый",
      en: "Ice white",
    },
    { id: "graphite", color: "#303236", ru: "Графит", en: "Graphite" },
    {
      id: "silver",
      color: "#92989d",
      ru: "Серебристый",
      en: "Silver",
    },
  ],
  interiors: [
    { id: "black", ru: "Чёрная кожа", en: "Black leather" },
    { id: "light", ru: "Светлая кожа", en: "Light leather" },
  ],
  options: [
    { id: "panorama", ru: "Панорамная крыша", en: "Panoramic roof" },
    {
      id: "audio",
      ru: "Премиальная аудиосистема",
      en: "Premium audio system",
    },
    {
      id: "winter",
      ru: "Пакет зимнего комфорта",
      en: "Winter comfort package",
    },
  ],
}

const extraCopy = {
  ru: {
    appKicker: "VORNE / MOBILE",
    appTitle: "Конфигуратор всегда с вами",
    appLead:
      "Собирайте автомобиль, сравнивайте комплектации и сохраняйте конфигурации в приложении VORNE.",
    appScan: "Наведите камеру на QR-код",
    appOpen: "Открыть веб-конфигуратор",
    technologyTitle: "Технологии, которые чувствуют дорогу",
    technologyLead:
      "Цифровая архитектура VORNE объединяет безопасность, свет и управление в единую интуитивную систему.",
    technologyCards: [
      ["VORNE Pilot", "Комплекс ассистентов анализирует дорожную ситуацию и помогает водителю в плотном потоке."],
      ["Matrix Vision", "Адаптивный свет выделяет дорогу и не ослепляет встречных водителей."],
      ["VORNE Connect", "Единая операционная система связывает автомобиль, смартфон и облачные сервисы."],
    ],
    serviceTitle: "Внутри вашего VORNE",
    serviceLead:
      "Выберите модель и изучите ключевые узлы силовой установки, трансмиссии и шасси.",
    selectModel: "Выберите автомобиль",
    components: ["Двигатель", "Трансмиссия", "Шасси", "Электроника"],
    componentText: [
      "Алюминиевый турбированный агрегат с точным управлением подачей топлива и эффективным охлаждением.",
      "Интеллектуальное распределение тяги обеспечивает плавное ускорение и уверенность на любом покрытии.",
      "Независимая подвеска настроена для баланса между точностью управления и комфортом.",
      "Высокоскоростная архитектура объединяет ассистенты водителя, мультимедиа и диагностику.",
    ],
  },
  en: {
    appKicker: "VORNE / MOBILE",
    appTitle: "Your configurator, always with you",
    appLead:
      "Build your vehicle, compare specifications and save configurations in the VORNE app.",
    appScan: "Point your camera at the QR code",
    appOpen: "Open web configurator",
    technologyTitle: "Technology that reads the road",
    technologyLead:
      "VORNE digital architecture brings safety, lighting and control together in one intuitive system.",
    technologyCards: [
      ["VORNE Pilot", "Driver assistance systems read the road and support you in dense traffic."],
      ["Matrix Vision", "Adaptive lighting highlights the road without dazzling oncoming drivers."],
      ["VORNE Connect", "One operating system connects the car, your phone and cloud services."],
    ],
    serviceTitle: "Inside your VORNE",
    serviceLead:
      "Select a model and explore its powertrain, transmission and chassis systems.",
    selectModel: "Select a vehicle",
    components: ["Engine", "Transmission", "Chassis", "Electronics"],
    componentText: [
      "An aluminium turbocharged unit with precise fuel delivery and efficient thermal management.",
      "Intelligent torque distribution delivers smooth acceleration and confidence on every surface.",
      "Independent suspension is tuned to balance precise handling with ride comfort.",
      "High-speed architecture connects driver assistance, multimedia and diagnostics.",
    ],
  },
}

const copy = {
  ru: {
    nav: ["Модели", "Конфигуратор", "Технологии", "Сервис", "Дилеры"],
    login: "Войти",
    slogan: "Движение\nвперёд.",
    from: "от",
    view: "Смотреть автомобиль",
    choose: "Выберите свой VORNE",
    allModels: "Весь модельный ряд",
    aboutTitle: "Что такое VORNE?",
    about:
      "Мы считаем, что современный автомобиль должен быть красивым, технологичным и надёжным. Поэтому мы создали VORNE — новый автомобильный бренд для тех, кто больше не хочет выбирать между ценой, дизайном и качеством.",
    aboutLink: "Узнать о бренде",
    modelsTitle: "Модельный ряд",
    modelsLead: "Пять характеров. Одна философия движения вперёд.",
    config: "Собрать свой VORNE",
    details: "Подробнее",
    modelLead: "Создан, чтобы каждый маршрут ощущался по-новому.",
    configure: "Перейти в конфигуратор",
    tech: "Технические характеристики",
    brochure: "Скачать брошюру",
    performance: ["Мощность", "0–100 км/ч", "Запас хода"],
    aboutPageTitle: "Будущее начинается с движения",
    aboutPageLead:
      "VORNE объединяет выразительный дизайн, точную инженерию и технологии, которые становятся естественной частью каждой поездки.",
    values: ["Честная инженерия", "Человек в центре", "Дизайн вне времени"],
    valuesText: [
      "Каждое решение имеет назначение. Никаких технологий ради технологий.",
      "Интерфейсы и пространство автомобиля подстраиваются под водителя.",
      "Чистые линии, выверенные пропорции и узнаваемый световой почерк.",
    ],
    awards: "Качество, подтверждённое стандартами",
    awardCards: [
      "VORNE Quality Standard",
      "Safety Excellence 2026",
      "Design Selection 2026",
    ],
    contactsTitle: "VORNE рядом",
    contactsLead: "Выберите удобный дилерский центр или свяжитесь с нами.",
    dealers: "Дилерские центры",
    hotline: "Горячая линия",
    email: "Общие вопросы",
    schedule: "Ежедневно, 09:00–21:00",
    route: "Построить маршрут",
    configTitle: "Конфигуратор",
    configLead: "Создайте VORNE, который подходит именно вам.",
    stepModel: "Модель",
    stepColor: "Цвет кузова",
    stepDrive: "Привод",
    stepInterior: "Отделка салона",
    stepOptions: "Опции",
    total: "Стоимость конфигурации",
    request: "Оформить заявку",
    loginTitle: "Личный кабинет",
    loginLead: "Войдите, чтобы сохранять конфигурации и отслеживать заявки.",
    password: "Пароль",
    enter: "Войти в кабинет",
    access: "Регистрацию и доступ предоставляет администратор VORNE.",
    requestTitle: "Заявка на VORNE",
    requestLead: "Оставьте контакты — дилер свяжется с вами и уточнит детали.",
    name: "Имя",
    phone: "Телефон",
    send: "Отправить заявку",
    sent: "Заявка принята",
    sentText: "Спасибо. Представитель VORNE скоро свяжется с вами.",
    close: "Закрыть",
    footerText: "Автомобили, созданные для движения вперёд.",
    copyright: "© 2026 VORNE. Все права защищены.",
  },
  en: {
    nav: ["Models", "Configurator", "Technology", "Service", "Dealers"],
    login: "Sign in",
    slogan: "Move\nforward.",
    from: "from",
    view: "Explore vehicle",
    choose: "Choose your VORNE",
    allModels: "View all models",
    aboutTitle: "What is VORNE?",
    about:
      "We believe a modern car should be beautiful, intelligent and dependable. That is why we created VORNE — a new automotive brand for those who no longer want to choose between value, design and quality.",
    aboutLink: "Discover the brand",
    modelsTitle: "Model range",
    modelsLead: "Five characters. One forward-thinking philosophy.",
    config: "Build your VORNE",
    details: "Explore",
    modelLead: "Created to make every journey feel new.",
    configure: "Open configurator",
    tech: "Technical specifications",
    brochure: "Download brochure",
    performance: ["Power", "0–100 km/h", "Driving range"],
    aboutPageTitle: "The future starts with motion",
    aboutPageLead:
      "VORNE unites expressive design, precise engineering and technology that becomes a natural part of every journey.",
    values: ["Honest engineering", "Human at the centre", "Timeless design"],
    valuesText: [
      "Every decision has a purpose. No technology for technology's sake.",
      "Interfaces and interior space adapt naturally to the driver.",
      "Clean lines, balanced proportions and a distinctive light signature.",
    ],
    awards: "Quality confirmed by standards",
    awardCards: [
      "VORNE Quality Standard",
      "Safety Excellence 2026",
      "Design Selection 2026",
    ],
    contactsTitle: "VORNE is near",
    contactsLead: "Choose a dealer or contact our team.",
    dealers: "Dealerships",
    hotline: "Customer line",
    email: "General enquiries",
    schedule: "Daily, 09:00–21:00",
    route: "Get directions",
    configTitle: "Configurator",
    configLead: "Create the VORNE that is right for you.",
    stepModel: "Model",
    stepColor: "Exterior colour",
    stepDrive: "Drivetrain",
    stepInterior: "Interior",
    stepOptions: "Options",
    total: "Configuration price",
    request: "Send a request",
    loginTitle: "Your account",
    loginLead: "Sign in to save configurations and track requests.",
    password: "Password",
    enter: "Sign in",
    access: "Registration and access are provided by a VORNE administrator.",
    requestTitle: "Request your VORNE",
    requestLead: "Leave your details and a dealer will contact you.",
    name: "Name",
    phone: "Phone",
    send: "Send request",
    sent: "Request received",
    sentText: "Thank you. A VORNE representative will contact you shortly.",
    close: "Close",
    footerText: "Cars created to move forward.",
    copyright: "© 2026 VORNE. All rights reserved.",
  },
}

function Arrow() {
  return <span aria-hidden="true">→</span>
}

function QrCode() {
  const size = 21
  const isFinder = (row: number, column: number, top: number, left: number) => {
    const y = row - top
    const x = column - left
    if (x < 0 || x > 6 || y < 0 || y > 6) return false
    return (
      x === 0 ||
      x === 6 ||
      y === 0 ||
      y === 6 ||
      (x >= 2 && x <= 4 && y >= 2 && y <= 4)
    )
  }

  return (
    <div className="fake-qr" aria-label="QR-код приложения VORNE">
      {Array.from({ length: size * size }, (_, index) => {
        const row = Math.floor(index / size)
        const column = index % size
        const finder =
          isFinder(row, column, 0, 0) ||
          isFinder(row, column, 0, size - 7) ||
          isFinder(row, column, size - 7, 0)
        const pattern =
          (row * 7 + column * 11 + row * column) % 5 < 2 &&
          !(
            (row < 8 && column < 8) ||
            (row < 8 && column > size - 9) ||
            (row > size - 9 && column < 8)
          )

        return (
          <span
            className={finder || pattern ? "is-dark" : ""}
            key={index}
          />
        )
      })}
    </div>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>("ru")
  const [page, setPage] = useState<Page>("home")
  const [selected, setSelected] = useState(models[1])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [requestOpen, setRequestOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [config, setConfig] = useState({
    color: "midnight",
    drive: "AWD",
    interior: "black",
    options: ["panorama"],
  })
  const t = copy[language]
  const x = extraCopy[language]
  const selectedColor =
    configuratorChoices.colors.find((color) => color.id === config.color) ??
    configuratorChoices.colors[0]
  const contactEmail =
    language === "ru" ? "vorne-ru@yandex.ru" : "vorne-eng@gmail.com"

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMobileOpen(false)
  }, [page])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal-up")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [page])

  const go = (next: Page) => setPage(next)
  const openModel = (model: Model) => {
    setSelected(model)
    setPage("model")
  }
  const openConfigurator = (model = selected) => {
    setSelected(model)
    setPage("configurator")
  }

  const extra = useMemo(() => config.options.length * 95000, [config.options])
  const price = Number(selected.price.replace(/\D/g, "")) + extra

  const handlePrimaryNav = (index: number) => {
    if (index === 0) go("models")
    if (index === 1) go("configurator")
    if (index === 2) go("technology")
    if (index === 3) go("service")
    if (index === 4) go("contacts")
  }

  const submitRequest = (event: FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => go("home")}
          aria-label="VORNE — главная"
        >
          <img src={`${import.meta.env.BASE_URL}assets/vorne-logo.png`} alt="VORNE" />
        </button>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {t.nav.map((item, index) => (
            <div className={index === 0 ? "nav-models" : ""} key={item}>
              <button onClick={() => handlePrimaryNav(index)}>
                {item}
                {index === 0 && <span className="chevron">⌄</span>}
              </button>
              {index === 0 && (
                <div className="models-dropdown">
                  <div className="dropdown-title">{t.modelsTitle}</div>
                  {models.map((model) => (
                    <button key={model.code} onClick={() => openModel(model)}>
                      <span>VORNE {model.code}</span>
                      <small>{model.name[language]}</small>
                    </button>
                  ))}
                  <button className="dropdown-all" onClick={() => go("models")}>
                    {t.allModels} <Arrow />
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="language"
            onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
            aria-label="Сменить язык"
          >
            {language.toUpperCase()}
          </button>
          <button className="login-button" onClick={() => setLoginOpen(true)}>
            {t.login}
          </button>
          <button
            className={`menu-button ${mobileOpen ? "is-open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        {t.nav.map((item, index) => (
          <button key={item} onClick={() => handlePrimaryNav(index)}>
            <span>0{index + 1}</span>
            {item}
          </button>
        ))}
        <button onClick={() => go("about")}>
          <span>06</span>
          {language === "ru" ? "О бренде" : "About"}
        </button>
      </div>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-orbit" />
              <div className="eyebrow">VORNE / 02</div>
              <h1>
                {t.slogan.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="hero-spec">VORNE S5 · S5 / AWD / 245 HP / 8AT</p>
              <div className="hero-price">{t.from} 2 490 000 ₽</div>
              <button
                className="hero-image"
                onClick={() => openModel(models[1])}
              >
                <img src={`${import.meta.env.BASE_URL}assets/vorne-s5-hero.jpg`} alt="VORNE S5" />
                <span className="image-index">01 / 05</span>
              </button>
              <button
                className="primary-button light"
                onClick={() => openModel(models[1])}
              >
                {t.view} <Arrow />
              </button>
            </section>

            <section className="model-section reveal-up">
              <div className="section-heading">
                <div>
                  <div className="eyebrow dark">VORNE / RANGE</div>
                  <h2>{t.choose}</h2>
                </div>
                <button className="text-button" onClick={() => go("models")}>
                  {t.allModels} <Arrow />
                </button>
              </div>
              <div className="model-grid">
                {models.map((model) => (
                  <ModelCard
                    key={model.code}
                    model={model}
                    language={language}
                    from={t.from}
                    view={t.view}
                    onClick={() => openModel(model)}
                  />
                ))}
              </div>
            </section>

            <section className="mobile-app-section reveal-up">
              <div className="mobile-app-copy">
                <div className="eyebrow">{x.appKicker}</div>
                <h2>{x.appTitle}</h2>
                <p>{x.appLead}</p>
                <button
                  className="primary-button light"
                  onClick={() => go("configurator")}
                >
                  {x.appOpen} <Arrow />
                </button>
              </div>
              <div className="qr-panel">
                <QrCode />
                <div>
                  <strong>VORNE</strong>
                  <span>{x.appScan}</span>
                </div>
              </div>
            </section>

            <section className="about-strip reveal-up">
              <div className="about-mark">V</div>
              <div className="eyebrow">VORNE / MANIFESTO</div>
              <h2>{t.aboutTitle}</h2>
              <p>{t.about}</p>
              <button
                className="text-button inverse"
                onClick={() => go("about")}
              >
                {t.aboutLink} <Arrow />
              </button>
            </section>
          </>
        )}

        {page === "models" && (
          <section className="page models-page">
            <PageIntro
              kicker="VORNE / MODELS"
              title={t.modelsTitle}
              lead={t.modelsLead}
            />
            <div className="models-list">
              {models.map((model, index) => (
                <article className="wide-model reveal-up" key={model.code}>
                  <button
                    className="wide-model-image"
                    onClick={() => openModel(model)}
                  >
                    <img src={model.image} alt={`VORNE ${model.code}`} />
                    <span>0{index + 1}</span>
                  </button>
                  <div className="wide-model-copy">
                    <div className="model-number">VORNE / {model.code}</div>
                    <h2>{model.code}</h2>
                    <p>{model.name[language]}</p>
                    <div className="wide-spec">{model.spec}</div>
                    <strong>
                      {t.from} {model.price}
                    </strong>
                    <div className="wide-actions">
                      <button
                        className="primary-button dark"
                        onClick={() => openModel(model)}
                      >
                        {t.details} <Arrow />
                      </button>
                      <button
                        className="text-button"
                        onClick={() => openConfigurator(model)}
                      >
                        {t.config}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "model" && (
          <>
            <section className="model-hero">
              <div className="model-hero-copy">
                <div className="eyebrow">VORNE / {selected.code}</div>
                <h1>{selected.code}</h1>
                <p>
                  {selected.name[language]}. {t.modelLead}
                </p>
                <strong>
                  {t.from} {selected.price}
                </strong>
                <button
                  className="primary-button light"
                  onClick={() => openConfigurator(selected)}
                >
                  {t.configure} <Arrow />
                </button>
              </div>
              <img src={selected.image} alt={`VORNE ${selected.code}`} />
            </section>
            <section className="performance reveal-up">
              {[selected.power, selected.acceleration, selected.range].map(
                (value, index) => (
                  <div key={value}>
                    <span>{t.performance[index]}</span>
                    <strong>{value}</strong>
                  </div>
                ),
              )}
            </section>
            <section className="design-story reveal-up">
              <div>
                <div className="eyebrow dark">VORNE / DESIGN</div>
                <h2>
                  {language === "ru"
                    ? "Сила чистых линий"
                    : "The power of clean lines"}
                </h2>
              </div>
              <p>
                {language === "ru"
                  ? "Выверенные пропорции, стремительный силуэт и фирменная световая графика создают образ, который невозможно спутать."
                  : "Balanced proportions, a dynamic silhouette and signature lighting create an unmistakable presence."}
              </p>
            </section>
            <section className="documents reveal-up">
              <button>
                <span>PDF</span>
                {t.tech}
                <Arrow />
              </button>
              <button>
                <span>PDF</span>
                {t.brochure}
                <Arrow />
              </button>
            </section>
          </>
        )}

        {page === "configurator" && (
          <section className="page configurator-page">
            <PageIntro
              kicker="VORNE / CONFIGURE"
              title={t.configTitle}
              lead={t.configLead}
            />
            <div className="config-layout reveal-up">
              <div className="config-preview">
                <img src={selected.image} alt={`VORNE ${selected.code}`} />
                <div className="config-preview-meta">
                  <span>VORNE</span>
                  <strong>{selected.code}</strong>
                  <small>
                    {selectedColor[language]} / {config.drive}
                  </small>
                </div>
              </div>
              <div className="config-controls">
                <ConfigGroup title={`01 — ${t.stepModel}`}>
                  <div className="choice-row compact">
                    {models.map((model) => (
                      <button
                        className={
                          selected.code === model.code ? "selected" : ""
                        }
                        onClick={() => setSelected(model)}
                        key={model.code}
                      >
                        {model.code}
                      </button>
                    ))}
                  </div>
                </ConfigGroup>
                <ConfigGroup title={`02 — ${t.stepColor}`}>
                  <div className="color-row">
                    {configuratorChoices.colors.map((choice) => (
                      <button
                        key={choice.id}
                        title={choice[language]}
                        aria-label={choice[language]}
                        className={
                          config.color === choice.id ? "selected" : ""
                        }
                        onClick={() =>
                          setConfig({ ...config, color: choice.id })
                        }
                      >
                        <span style={{ background: choice.color }} />
                      </button>
                    ))}
                  </div>
                </ConfigGroup>
                <ConfigGroup title={`03 — ${t.stepDrive}`}>
                  <div className="choice-row">
                    {["FWD", "AWD"].map((drive) => (
                      <button
                        className={config.drive === drive ? "selected" : ""}
                        onClick={() => setConfig({ ...config, drive })}
                        key={drive}
                      >
                        {drive}
                      </button>
                    ))}
                  </div>
                </ConfigGroup>
                <ConfigGroup title={`04 — ${t.stepInterior}`}>
                  <div className="choice-row">
                    {configuratorChoices.interiors.map((interior) => (
                      <button
                        className={
                          config.interior === interior.id ? "selected" : ""
                        }
                        onClick={() =>
                          setConfig({ ...config, interior: interior.id })
                        }
                        key={interior.id}
                      >
                        {interior[language]}
                      </button>
                    ))}
                  </div>
                </ConfigGroup>
                <ConfigGroup title={`05 — ${t.stepOptions}`}>
                  <div className="option-list">
                    {configuratorChoices.options.map((option) => (
                      <label key={option.id}>
                        <input
                          type="checkbox"
                          checked={config.options.includes(option.id)}
                          onChange={() =>
                            setConfig({
                              ...config,
                              options: config.options.includes(option.id)
                                ? config.options.filter(
                                    (item) => item !== option.id,
                                  )
                                : [...config.options, option.id],
                            })
                          }
                        />
                        <span>{option[language]}</span>
                        <small>+ 95 000 ₽</small>
                      </label>
                    ))}
                  </div>
                </ConfigGroup>
                <div className="config-total">
                  <span>{t.total}</span>
                  <strong>{price.toLocaleString("ru-RU")} ₽</strong>
                  <button
                    className="primary-button blue"
                    onClick={() => setRequestOpen(true)}
                  >
                    {t.request} <Arrow />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "technology" && (
          <section className="page technology-page">
            <PageIntro
              kicker="VORNE / TECHNOLOGY"
              title={x.technologyTitle}
              lead={x.technologyLead}
            />
            <div className="technology-showcase reveal-up">
              <div className="technology-image">
                <img src={`${import.meta.env.BASE_URL}assets/vorne-gt.jpg`} alt="VORNE technology" />
                <span>VORNE / INTELLIGENCE</span>
              </div>
              <div className="technology-grid">
                {x.technologyCards.map(([title, text], index) => (
                  <article key={title}>
                    <span>0{index + 1}</span>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {page === "service" && (
          <section className="page service-page">
            <PageIntro
              kicker="VORNE / ENGINEERING"
              title={x.serviceTitle}
              lead={x.serviceLead}
            />
            <div className="service-selector reveal-up">
              <span>{x.selectModel}</span>
              <div>
                {models.map((model) => (
                  <button
                    key={model.code}
                    className={selected.code === model.code ? "selected" : ""}
                    onClick={() => setSelected(model)}
                  >
                    {model.code}
                  </button>
                ))}
              </div>
            </div>
            <div className="service-overview reveal-up">
              <div className="service-vehicle">
                <img src={selected.image} alt={`VORNE ${selected.code}`} />
                <div>
                  <span>VORNE</span>
                  <strong>{selected.code}</strong>
                  <small>{selected.name[language]}</small>
                </div>
              </div>
              <div className="component-grid">
                {x.components.map((component, index) => (
                  <article key={component}>
                    <span>0{index + 1}</span>
                    <h2>{component}</h2>
                    <strong>
                      {index === 0
                        ? selected.power
                        : index === 1
                          ? selected.spec
                          : index === 2
                            ? language === "ru"
                              ? "Независимая подвеска"
                              : "Independent suspension"
                            : "VORNE Core OS"}
                    </strong>
                    <p>{x.componentText[index]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {page === "about" && (
          <section className="page about-page">
            <PageIntro
              kicker="VORNE / ABOUT"
              title={t.aboutPageTitle}
              lead={t.aboutPageLead}
            />
            <div className="about-visual reveal-up">
              <img src={`${import.meta.env.BASE_URL}assets/vorne-gt.jpg`} alt="VORNE GT" />
              <div className="about-visual-word">VORNE</div>
            </div>
            <div className="values-grid reveal-up">
              {t.values.map((value, index) => (
                <article key={value}>
                  <span>0{index + 1}</span>
                  <h3>{value}</h3>
                  <p>{t.valuesText[index]}</p>
                </article>
              ))}
            </div>
            <section className="awards reveal-up">
              <div>
                <div className="eyebrow">VORNE / RECOGNITION</div>
                <h2>{t.awards}</h2>
              </div>
              <div className="award-grid">
                {t.awardCards.map((award, index) => (
                  <div key={award}>
                    <span>V</span>
                    <strong>{award}</strong>
                    <small>Certificate 0{index + 1} / 2026</small>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {page === "contacts" && (
          <section className="page contacts-page">
            <PageIntro
              kicker="VORNE / CONTACTS"
              title={t.contactsTitle}
              lead={t.contactsLead}
            />
            <div className="contact-cards reveal-up">
              <article>
                <span>01</span>
                <h3>{t.hotline}</h3>
                <a href="tel:88005501010">8 800 550-10-10</a>
                <p>{t.schedule}</p>
              </article>
              <article>
                <span>02</span>
                <h3>{t.email}</h3>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                <p>VORNE Customer Care</p>
              </article>
            </div>
            <h2 className="dealers-title reveal-up">{t.dealers}</h2>
            <div className="dealer-list reveal-up">
              {[
                {
                  name: "VORNE Москва",
                  address: "Ленинградское шоссе, 39А",
                  phone: "+7 495 120-02-02",
                  image: `${import.meta.env.BASE_URL}assets/dealer-moscow.jpg`,
                },
                {
                  name: "VORNE Санкт-Петербург",
                  address: "Пулковское шоссе, 14",
                  phone: "+7 812 120-02-02",
                  image: `${import.meta.env.BASE_URL}assets/dealer-saint-petersburg.jpg`,
                },
                {
                  name: "VORNE Казань",
                  address: "Проспект Победы, 194",
                  phone: "+7 843 120-02-02",
                  image: `${import.meta.env.BASE_URL}assets/dealer-kazan.jpg`,
                },
              ].map((dealer, index) => (
                <article key={dealer.name}>
                  <div className="dealer-image">
                    <img
                      src={dealer.image}
                      alt={`${dealer.name} — ${dealer.address}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="dealer-content">
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{dealer.name}</h3>
                      <p>{dealer.address}</p>
                    </div>
                    <a href={`tel:${dealer.phone.replace(/\D/g, "")}`}>
                      {dealer.phone}
                    </a>
                    <button>
                      {t.route} <Arrow />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <button onClick={() => go("home")}>VORNE</button>
          <p>{t.footerText}</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>{language === "ru" ? "Навигация" : "Explore"}</strong>
            <button onClick={() => go("models")}>{t.modelsTitle}</button>
            <button onClick={() => go("configurator")}>{t.configTitle}</button>
            <button onClick={() => go("technology")}>{t.nav[2]}</button>
            <button onClick={() => go("service")}>{t.nav[3]}</button>
            <button onClick={() => go("about")}>
              {language === "ru" ? "О бренде" : "About"}
            </button>
          </div>
          <div>
            <strong>{language === "ru" ? "Контакты" : "Contacts"}</strong>
            <a href="tel:88005501010">8 800 550-10-10</a>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <button onClick={() => go("contacts")}>{t.dealers}</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.copyright}</span>
          <span>RU / 2026</span>
        </div>
      </footer>

      {loginOpen && (
        <Modal onClose={() => setLoginOpen(false)}>
          <div className="modal-kicker">VORNE / ID</div>
          <h2>{t.loginTitle}</h2>
          <p>{t.loginLead}</p>
          <form
            className="modal-form"
            onSubmit={(event) => {
              event.preventDefault()
              setLoginOpen(false)
            }}
          >
            <label>
              Email
              <input type="email" required placeholder="name@example.com" />
            </label>
            <label>
              {t.password}
              <input type="password" required placeholder="••••••••" />
            </label>
            <button className="primary-button blue">
              {t.enter} <Arrow />
            </button>
          </form>
          <small className="access-note">{t.access}</small>
        </Modal>
      )}

      {requestOpen && (
        <Modal
          onClose={() => {
            setRequestOpen(false)
            setSent(false)
          }}
        >
          {!sent ? (
            <>
              <div className="modal-kicker">VORNE / REQUEST</div>
              <h2>{t.requestTitle}</h2>
              <p>{t.requestLead}</p>
              <div className="request-summary">
                VORNE {selected.code}
                <span>{price.toLocaleString("ru-RU")} ₽</span>
              </div>
              <form className="modal-form" onSubmit={submitRequest}>
                <label>
                  {t.name}
                  <input required />
                </label>
                <label>
                  {t.phone}
                  <input required type="tel" placeholder="+7 900 000-00-00" />
                </label>
                <button className="primary-button blue">
                  {t.send} <Arrow />
                </button>
              </form>
            </>
          ) : (
            <div className="success-state">
              <span>V</span>
              <h2>{t.sent}</h2>
              <p>{t.sentText}</p>
              <button
                className="primary-button dark"
                onClick={() => {
                  setRequestOpen(false)
                  setSent(false)
                }}
              >
                {t.close}
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

function ModelCard({
  model,
  language,
  from,
  view,
  onClick,
}: {
  model: Model
  language: Language
  from: string
  view: string
  onClick: () => void
}) {
  return (
    <article className="model-card reveal-up">
      <button className="model-card-image" onClick={onClick}>
        <img src={model.image} alt={`VORNE ${model.code}`} />
      </button>
      <div className="model-card-body">
        <div>
          <h3>{model.code}</h3>
          <span>
            {from} {model.price}
          </span>
        </div>
        <p>{model.name[language]}</p>
        <small>
          {model.code} / {model.spec}
        </small>
        <button className="card-link" onClick={onClick}>
          {view} <Arrow />
        </button>
      </div>
    </article>
  )
}

function PageIntro({
  kicker,
  title,
  lead,
}: {
  kicker: string
  title: string
  lead: string
}) {
  return (
    <div className="page-intro reveal-up">
      <div className="eyebrow dark">{kicker}</div>
      <h1>{title}</h1>
      <p>{lead}</p>
    </div>
  )
}

function ConfigGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="config-group">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function Modal({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        {children}
      </section>
    </div>
  )
}
