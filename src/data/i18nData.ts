export interface I18nNode {
  [key: string]: I18nNode | { en: string; tr: string };
}

export const i18nData: I18nNode = {
  nav: {
    experience: { en: "Experience", tr: "Deneyim" },
    projects: { en: "Projects", tr: "Projeler" },
    writing: { en: "Publications", tr: "Yayınlar" },
    contact: { en: "Contact", tr: "İletişim" },
    footer: { en: "Footer", tr: "Alt bilgi" },
    skipToContent: { en: "Skip to main content", tr: "Ana içeriğe geç" },
    mainNav: { en: "Main navigation", tr: "Ana gezinme" },
    switchLang: { en: "Switch language to Turkish", tr: "Dili İngilizceye çevir" },
    breadcrumb: { en: "Breadcrumb", tr: "Sayfa konumu" },
  },
  seo: {
    title: {
      en: "Barış Salih Babacan | Systems Engineer & CTO in Istanbul",
      tr: "Barış Salih Babacan | İstanbul'da Sistem Yazılımı Geliştiricisi & CTO",
    },
    description: {
      en: "Barış Salih Babacan | Systems Engineer and CTO in Istanbul. Local-first infrastructure in Rust, network protocol reverse engineering, and native iOS applications.",
      tr: "Barış Salih Babacan | İstanbul merkezli Sistem Yazılımı Geliştiricisi & CTO. Rust ile yerel-öncelikli altyapı, ağ protokolü tersine mühendisliği ve native iOS uygulamaları.",
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
      en: "Systems engineer building local-first infrastructure in Rust. Production work spans embedded systems, network protocol reverse engineering, and native iOS applications.",
      tr: "Rust ile yerel-öncelikli altyapı yazan bir sistem yazılımı geliştiricisi. Üretim deneyimim gömülü sistemler, ağ protokolü tersine mühendisliği ve native iOS uygulamalarını kapsıyor.",
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
  },
  experience: {
    sectionLabel: { en: "01 / Experience", tr: "01 / Deneyim" },
    title: { en: "Engineering & Leadership", tr: "Mühendislik & Liderlik" },
    item1_title: {
      en: "Technical Leadership & CTO",
      tr: "Teknik Liderlik & CTO",
    },
    item1_desc: {
      en: "Leading a two-developer team at Garage.ist: system architecture, stack decisions, and review discipline enforced through CI that blocks direct pushes to main.",
      tr: "Garage.ist'te iki kişilik geliştirici ekibini yönetiyorum: sistem mimarisi, teknoloji seçimleri ve main dalına doğrudan push'u engelleyen CI ile işletilen code review disiplini.",
    },
    item2_title: {
      en: "Systems Programming & Rust",
      tr: "Sistem Programlama & Rust",
    },
    item2_desc: {
      en: "Building memory-safe native engines in Rust, Go and C++ — content-addressable storage keyed by BLAKE3, SQLite-backed indexes, and Unix-socket daemons.",
      tr: "Rust, Go ve C++ ile bellek güvenli native motorlar geliştiriyorum — BLAKE3 ile içerik-adresli depolama, SQLite tabanlı indeksler ve Unix soket servisleri.",
    },
    item3_title: {
      en: "Local-First Engines",
      tr: "Yerel-Öncelikli Motorlar",
    },
    item3_desc: {
      en: "Osmos, a version control engine written as a three-crate Rust workspace with <strong>zero unsafe blocks</strong>; Mythos, a manuscript engine exposing 13 JSON-RPC methods across 82 tests.",
      tr: "Osmos: üç crate'lik Rust workspace olarak yazılmış, <strong>sıfır unsafe blok</strong> içeren sürüm kontrol motoru. Mythos: 13 JSON-RPC metodu sunan, 82 testli bir roman taslağı motoru.",
    },
    item4_title: {
      en: "Protocol Reverse Engineering",
      tr: "Protokol Tersine Mühendisliği",
    },
    item4_desc: {
      en: "Reverse-engineered Philips' undocumented JointSpace API from its own remote app's logs (CatLog) and network traffic (Wireshark): HTTP Digest auth over a 401 challenge–response flow, PIN pairing as an explicit state machine, and TLS for self-signed certificates.",
      tr: "Philips'in belgelenmemiş JointSpace API'sini kendi kumanda uygulamasının loglarından (CatLog) ve ağ trafiğinden (Wireshark) çözdüm: 401 challenge–response akışıyla HTTP Digest kimlik doğrulama, durum makinesi olarak PIN eşleştirme ve kendinden imzalı sertifikalar için TLS.",
    },
    tags: {
      localFirst: { en: "Local-First", tr: "Yerel-Öncelikli" },
      wireshark: { en: "Wireshark", tr: "Wireshark" },
      httpDigest: { en: "HTTP Digest", tr: "HTTP Digest" },
      tls: { en: "TLS", tr: "TLS" },
    },
  },
  projects: {
    sectionLabel: { en: "02 / Projects", tr: "02 / Projeler" },
    title: { en: "Selected Works", tr: "Seçilmiş Çalışmalar" },
    garageTitle: { en: "GARAGE.IST PROJECTS", tr: "GARAGE.IST PROJELERİ" },
    personalTitle: { en: "PERSONAL & OPEN SOURCE", tr: "KİŞİSEL & AÇIK KAYNAK" },
    highlights: { en: "Key Highlights", tr: "Öne Çıkan Özellikler" },
    techStack: { en: "Technologies & Stack", tr: "Kullanılan Teknolojiler" },
  },
  github: {
    sectionLabel: { en: "03 / Open Source", tr: "03 / Açık Kaynak" },
    title: { en: "Terminal", tr: "Terminal" },
    contributionsLabel: { en: "CONTRIBUTIONS", tr: "KATKILAR" },
    publicRepos: { en: "PUBLIC REPOS", tr: "AÇIK REPOLAR" },
    organizations: { en: "GITHUB ORGANIZATIONS", tr: "GITHUB ORGANİZASYONU" },
    yearContributions: { en: "CONTRIBUTIONS · LAST YEAR", tr: "KATKI · SON 1 YIL" },
    activity: { en: "CONTRIBUTION ACTIVITY", tr: "KATKI AKTİVİTESİ" },
    langDist: { en: "LANGUAGE DISTRIBUTION", tr: "DİL DAĞILIMI" },
    noLangData: { en: "No language data available", tr: "Dil verisi bulunamadı" },
  },
  writing: {
    sectionLabel: { en: "04 / Publications", tr: "04 / Yayınlar" },
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
};
