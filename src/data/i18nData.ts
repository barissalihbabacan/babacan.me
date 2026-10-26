export interface LocalizedPair {
  en: string;
  tr: string;
}

export interface NavItem {
  id: string;
  href: string;
  label: LocalizedPair;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "projects", href: "#projects", label: { en: "Projects", tr: "Projeler" } },
  { id: "experience", href: "#experience", label: { en: "About", tr: "Hakkımda" } },
  { id: "writing", href: "#writing", label: { en: "Publications", tr: "Yayınlar" } },
  { id: "contact", href: "#contact", label: { en: "Contact", tr: "İletişim" } },
];

export const i18nData = {
  nav: {
    experience: { en: "Experience", tr: "Deneyim" },
    projects: { en: "Projects", tr: "Projeler" },
    writing: { en: "Publications", tr: "Yayınlar" },
    contact: { en: "Contact", tr: "İletişim" },
    footer: { en: "Footer", tr: "Alt bilgi" },
    skipToContent: { en: "Skip to main content", tr: "Ana içeriğe geç" },
    mainNav: { en: "Main navigation", tr: "Ana gezinme" },
    switchLang: { en: "TR – Switch language to Turkish", tr: "EN – Dili İngilizceye çevir" },
    breadcrumb: { en: "Breadcrumb", tr: "Sayfa konumu" },
  },
  seo: {
    title: {
      en: "Barış Salih Babacan | Systems Engineer & CTO in Istanbul",
      tr: "Barış Salih Babacan | İstanbul'da Sistem Yazılımı Geliştiricisi & CTO",
    },
    description: {
      en: "Barış Salih Babacan | Systems Engineer and CTO in Istanbul. Local-first infrastructure in Rust, network protocol reverse engineering, and native mobile apps.",
      tr: "Barış Salih Babacan | İstanbul merkezli Sistem Yazılımı Geliştiricisi & CTO. Rust ile yerel-öncelikli altyapı, ağ protokolü tersine mühendisliği ve native mobil uygulamalar.",
    },
  },
  hero: {
    roles: {
      en: "CTO @ Garage.ist · Systems Engineer",
      tr: "Garage.ist CTO'su · Sistem Yazılımı Geliştiricisi",
    },
    title: {
      en: 'Barış Salih<br /><em class="text-on-surface-variant font-normal not-italic">Babacan</em>',
      tr: 'Barış Salih<br /><em class="text-on-surface-variant font-normal not-italic">Babacan</em>',
    },
    subtitle: {
      en: "Systems engineer building local-first infrastructure in Rust. Production work spans embedded systems, network protocol reverse engineering, and native mobile apps.",
      tr: "Rust ile yerel-öncelikli altyapı yazan bir sistem yazılımı geliştiricisi. Üretim deneyimim gömülü sistemler, ağ protokolü tersine mühendisliği ve native mobil uygulamaları kapsıyor.",
    },
    viewWork: {
      en: "Explore Work",
      tr: "Çalışmaları İncele",
    },
    getInTouch: {
      en: "Contact",
      tr: "İletişim",
    },
    stat1_lbl: { en: "SHIPPED PRODUCTS", tr: "YAYINLANAN ÜRÜN" },
    stat2_val: { en: "10K+", tr: "10K+" },
    stat2_lbl: { en: "+TV DOWNLOADS", tr: "+TV İNDİRME" },
    stat3_val: { en: "120–150", tr: "120–150" },
    stat3_lbl: {
      en: "Q-PASS DAILY USERS\n3 SCHOOL YEARS",
      tr: "Q-PASS GÜNLÜK\nKULLANICI · 3 YIL",
    },
    stat4_val: { en: "3", tr: "3" },
    stat4_lbl: { en: "OPEN-SOURCE\nPROJECTS", tr: "AÇIK KAYNAK\nPROJE" },
    downloadCV: { en: "Download CV", tr: "CV İndir" },
    scroll: { en: "SCROLL", tr: "KAYDIR" },
    pauseAnim: { en: "Pause animation", tr: "Animasyonu durdur" },
    playAnim: { en: "Play animation", tr: "Animasyonu oynat" },
  },
  experience: {
    sectionLabel: { en: "04 / About", tr: "04 / Hakkımda" },
    title: { en: "About", tr: "Hakkımda" },
    intro: {
      en: "I'm Barış, a software developer in Istanbul, and what I enjoy most is building things: apps, websites, tools, whatever the idea needs. Since October 2024 I've been CTO at Garage.ist, a small product studio, where I make iOS and Android apps with one other developer. On my own time I write local-first tools in Rust and Go and publish them as open source, and when something has no documentation, I take it apart until I understand it. I study computer programming at Istanbul University, and I've written a novel that is now under review.",
      tr: "Ben Barış; İstanbul'da yaşayan bir yazılım geliştiricisiyim ve en çok bir şeyler yapmayı seviyorum: uygulama, web sitesi, araç; fikir ne gerektiriyorsa. Ekim 2024'ten beri küçük bir ürün stüdyosu olan Garage.ist'in CTO'suyum; burada bir geliştirici arkadaşımla iOS ve Android uygulamaları yapıyorum. Kendi zamanımda Rust ve Go ile yerel-öncelikli araçlar yazıp açık kaynak olarak yayınlıyorum; belgesi olmayan bir sistemle karşılaşınca da nasıl çalıştığını anlayana kadar kurcalıyorum. İstanbul Üniversitesi'nde bilgisayar programcılığı okuyorum ve şu an değerlendirmede olan bir roman yazdım.",
    },
    purpose: {
      en: "If you'd like to talk about a project, build something together, or contribute to one of my open-source repositories, write to me. You're welcome to write just to chat, too.",
      tr: "Bir proje hakkında konuşmak, birlikte bir şey yapmak ya da açık kaynak projelerimden birine katkı vermek isterseniz yazın. Sadece sohbet etmek için de yazabilirsiniz.",
    },
    focusTitle: { en: "What I work on", tr: "Neyle uğraşıyorum" },
    item1_title: {
      en: "Technical Leadership & CTO",
      tr: "Teknik Liderlik & CTO",
    },
    item1_desc: {
      en: "Directing mobile architecture, release pipelines, and engineering standards across active products.",
      tr: "Aktif ürünlerde mobil mimariyi, sürüm süreçlerini ve mühendislik standartlarını yönetiyorum.",
    },
    item2_title: {
      en: "Systems & Local-First",
      tr: "Sistemler & Yerel-Öncelikli",
    },
    item2_desc: {
      en: "Building low-level network tools, reverse-engineered protocol clients, and terminal applications in Rust.",
      tr: "Rust ile düşük seviyeli ağ araçları, tersine mühendislikle çözülmüş protokol istemcileri ve terminal uygulamaları geliştiriyorum.",
    },
    item3_title: {
      en: "Hardware & Production Systems",
      tr: "Donanım & Üretim Sistemleri",
    },
    item3_desc: {
      en: "Designing end-to-end hardware-software systems deployed in high-throughput production environments.",
      tr: "Yoğun kullanımlı üretim ortamlarında çalışan uçtan uca donanım-yazılım sistemleri tasarlıyorum.",
    },
    protocolsTitle: {
      en: "Reverse Engineered Protocols & APIs",
      tr: "Tersine Mühendislikle Çözülen Protokoller & API'lar",
    },
    protocolsDesc: {
      en: "Production implementations built by intercepting, analyzing, and documenting undocumented network protocols:",
      tr: "Belgelenmemiş ağ protokollerini dinleyerek, analiz ederek ve belgeleyerek geliştirdiğim üretim uygulamaları:",
    },
    protocols: {
      hikvision: {
        en: "Hikvision ISAPI / CCTV Streaming",
        tr: "Hikvision ISAPI / CCTV Akışı",
      },
      mifare: {
        en: "Mifare Classic 1K RFID Protocol",
        tr: "Mifare Classic 1K RFID Protokolü",
      },
      thermalPrinter: {
        en: "ESC/POS Thermal Printer Protocol",
        tr: "ESC/POS Termal Yazıcı Protokolü",
      },
      rtsp: { en: "RTSP / RTP Video Streaming", tr: "RTSP / RTP Video Akışı" },
      httpDigest: { en: "HTTP Digest", tr: "HTTP Digest" },
      tls: { en: "TLS", tr: "TLS" },
    },
  },
  projects: {
    sectionLabel: { en: "01 / Projects", tr: "01 / Projeler" },
    title: { en: "Selected Works", tr: "Seçilmiş Çalışmalar" },
    garageTitle: { en: "GARAGE.IST PROJECTS", tr: "GARAGE.IST PROJELERİ" },
    personalTitle: { en: "SCHOOL & INSTITUTIONAL SYSTEMS", tr: "OKUL & KURUMSAL SİSTEMLER" },
    highlights: { en: "Key Highlights", tr: "Öne Çıkan Özellikler" },
    techStack: { en: "Technologies & Stack", tr: "Kullanılan Teknolojiler" },
  },
  github: {
    sectionLabel: { en: "02 / GitHub", tr: "02 / GitHub" },
    title: { en: "Open Source", tr: "Açık Kaynak" },
    featured: { en: "Open-source projects", tr: "Açık kaynak projeler" },
    viewRepo: { en: "View on GitHub", tr: "GitHub'da gör" },
    contributionsLabel: { en: "CONTRIBUTIONS", tr: "KATKILAR" },
    publicRepos: { en: "PUBLIC REPOS", tr: "AÇIK REPOLAR" },
    organizations: { en: "GITHUB ORGANIZATIONS", tr: "GITHUB ORGANİZASYONU" },
    yearContributions: { en: "CONTRIBUTIONS · LAST YEAR", tr: "KATKI · SON 1 YIL" },
    activity: { en: "CONTRIBUTION ACTIVITY", tr: "KATKI AKTİVİTESİ" },
    langDist: { en: "LANGUAGE DISTRIBUTION", tr: "DİL DAĞILIMI" },
    noLangData: { en: "No language data available", tr: "Dil verisi bulunamadı" },
  },
  writing: {
    sectionLabel: { en: "03 / Publications", tr: "03 / Yayınlar" },
    title: { en: "Publications", tr: "Yayınlar" },
    book: {
      genre: { en: "Psychological Fiction / Drama", tr: "Psikolojik Kurgu / Drama" },
      desc: {
        en: "A three-generation family saga stretching from the haunted streets of Scotland to the soulless towers of Los Angeles. A psychological family epic tracing ancestral sins, moral responsibility, and man's reckoning with his own conscience.",
        tr: "İskoçya'nın tekinsiz sokaklarından Los Angeles'ın ruhsuz kulelerine uzanan üç nesillik bir aile hikâyesi. Babadan oğula aktarılan günahların, ahlaki sorumluluğun ve insanın kendi vicdanıyla hesaplaşmasının izini süren psikolojik bir aile destanı.",
      },
      bullet1: {
        en: "The burden of ancestral legacy and moral responsibility",
        tr: "Atasal mirasın yükü ve ahlaki sorumluluk",
      },
      bullet2: {
        en: "Conscience portrayed as a spiritual labyrinth",
        tr: "Vicdanın ruhsal bir labirent olarak işlenmesi",
      },
      bullet3: {
        en: "The possibility of spiritual rebirth against existential despair",
        tr: "Varoluşsal umutsuzluğa karşı yeniden doğuş ihtimali",
      },
      visitSite: { en: "Visit Official Site", tr: "Resmi Siteyi Ziyaret Et" },
      status: {
        en: "Novel · Under Review (Everest First Novel Award)",
        tr: "Roman · Değerlendirmede (Everest İlk Roman Ödülü)",
      },
      badge: { en: "Under review", tr: "Değerlendirmede" },
    },
  },
  contact: {
    sectionLabel: { en: "05 / Contact", tr: "05 / İletişim" },
    title: { en: "Let's Connect", tr: "İletişime Geçin" },
    desc: {
      en: "Open for compelling conversations — collaboration opportunities, open source discussions, or anything worth discussing.",
      tr: "İlgi çekici sohbetlere açığım — işbirliği teklifleri, açık kaynak tartışmaları veya konuşmaya değer herhangi bir şey.",
    },
    email: { en: "Email", tr: "E-posta" },
    location: { en: "LOCATION", tr: "KONUM" },
    locationValue: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
  },
} as const;

export const UI_DICTIONARY = i18nData;
export type UiDictionary = typeof i18nData;
