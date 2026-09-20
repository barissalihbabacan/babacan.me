export interface I18nNode {
  [key: string]: I18nNode | { en: string; tr: string };
}

export const i18nData: I18nNode = {
  nav: {
    experience: { en: "Experience", tr: "Deneyim" },
    projects: { en: "Projects", tr: "Projeler" },
    writing: { en: "Publications", tr: "Yayınlar" },
    contact: { en: "Contact", tr: "İletişim" },
    techBlog: { en: "Technical Blog", tr: "Teknik Blog" },
  },
  seo: {
    title: {
      en: "Barış Salih Babacan | Systems Engineer & CTO Istanbul",
      tr: "Barış Salih Babacan | Sistem Mühendisi & CTO Istanbul",
    },
    description: {
      en: "Barış Salih Babacan | Systems Engineer and CTO in Istanbul. Local-first infrastructure in Rust, network protocol reverse engineering, and native iOS applications.",
      tr: "Barış Salih Babacan | İstanbul merkezli Sistem Mühendisi & CTO. Rust ile yerel-öncelikli altyapı, ağ protokolü tersine mühendisliği ve native iOS uygulamaları.",
    },
  },
  hero: {
    roles: {
      en: "CTO @ Garage.ist · Systems Engineer",
      tr: "Garage.ist CTO'su · Sistem Mühendisi",
    },
    title: {
      en: 'Barış Salih<br /><em className="text-on-surface-variant font-normal not-italic">Babacan</em>',
      tr: 'Barış Salih<br /><em className="text-on-surface-variant font-normal not-italic">Babacan</em>',
    },
    subtitle: {
      en: "Systems engineer building local-first infrastructure in Rust. Production work spans embedded systems, network protocol reverse engineering, and native iOS applications.",
      tr: "Rust ile yerel-öncelikli altyapı geliştiren sistem mühendisi. Üretim deneyimim gömülü sistemler, ağ protokolü tersine mühendisliği ve native iOS uygulamalarını kapsıyor.",
    },
    viewWork: {
      en: "Explore Work →",
      tr: "Çalışmaları İncele →",
    },
    getInTouch: {
      en: "Contact",
      tr: "İletişim",
    },
    stat1_val: { en: "6", tr: "6" },
    stat1_lbl: { en: "SHIPPED PRODUCTS", tr: "YAYINLANAN ÜRÜN" },
    stat2_val: { en: "3", tr: "3" },
    stat2_lbl: { en: "TV PROTOCOLS DECODED", tr: "ÇÖZÜLEN TV PROTOKOLÜ" },
    stat3_val: { en: "120–150", tr: "120–150" },
    stat3_lbl: { en: "DAILY USERS · 3 YEARS", tr: "GÜNLÜK KULLANICI · 3 YIL" },
    stat4_val: { en: "0", tr: "0" },
    stat4_lbl: { en: "UNSAFE BLOCKS", tr: "UNSAFE BLOK" },
    badge: {
      en: "Available for technical consulting & advisory",
      tr: "Teknik danışmanlık & mentörlük için uygun",
    },
    titlePrefix: { en: "Systems Engineer &", tr: "Sistem Mühendisi &" },
    titleSuffix: { en: "Developer", tr: "Geliştirici" },
    subTitle: {
      en: "CTO @ Garage.ist. Shipping native iOS applications, reverse-engineering network protocols, and building local-first engines in Rust.",
      tr: "Garage.ist CTO'su. Native iOS uygulamaları yayınlıyor, ağ protokollerini tersine mühendislikle çözüyor ve Rust ile yerel-öncelikli motorlar geliştiriyorum.",
    },
    downloadCV: { en: "Download CV", tr: "CV İndir" },
    exploreProjects: { en: "Explore Systems", tr: "Sistemleri İncele" },
    scroll: { en: "SCROLL", tr: "KAYDIR" },
  },
  experience: {
    sectionLabel: { en: "01 / Experience", tr: "01 / Deneyim" },
    title: { en: "Engineering & Leadership", tr: "Mühendislik & Liderlik" },
    techStackTitle: { en: "TECHNICAL CAPABILITIES", tr: "TEKNİK YETKİNLİKLER" },
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
      tr: "Rust, Go ve C++ ile bellek-güvenli native motorlar geliştiriyorum — BLAKE3 ile içerik-adresli depolama, SQLite tabanlı indeksler ve Unix soket servisleri.",
    },
    item3_title: {
      en: "Local-First Engines",
      tr: "Yerel-Öncelikli Motorlar",
    },
    item3_desc: {
      en: "Osmos, a version control engine written as a three-crate Rust workspace with <strong>zero unsafe blocks</strong>; Mythos, a manuscript engine exposing 13 JSON-RPC methods across 82 tests.",
      tr: "Osmos: üç crate'lik Rust workspace olarak yazılmış, <strong>sıfır unsafe blok</strong> içeren sürüm kontrol motoru. Mythos: 13 JSON-RPC metodu sunan, 82 testli manuscript motoru.",
    },
    item4_title: {
      en: "Protocol Reverse Engineering",
      tr: "Protokol Tersine Mühendisliği",
    },
    item4_desc: {
      en: "Decoded the control interfaces of Samsung (Tizen), LG (webOS) and Philips televisions off the wire: HTTP Digest auth over a 401 challenge–response flow, PIN pairing as an explicit state machine, and TLS for self-signed certificates.",
      tr: "Samsung (Tizen), LG (webOS) ve Philips televizyonların kontrol arayüzlerini ağ trafiği üzerinden çözdüm: 401 challenge–response akışıyla HTTP Digest kimlik doğrulama, durum makinesi olarak PIN eşleştirme ve kendinden imzalı sertifikalar için TLS.",
    },
    tags: {
      localFirst: { en: "Local-First", tr: "Yerel-Öncelikli" },
      wireshark: { en: "Wireshark", tr: "Wireshark" },
      httpDigest: { en: "HTTP Digest", tr: "HTTP Digest" },
      tls: { en: "TLS", tr: "TLS" },
    },
    garage: {
      role: { en: "CTO & Lead Developer", tr: "CTO & Baş Geliştirici" },
      period: { en: "Present", tr: "Halen" },
      desc: {
        en: "Leading overall technical direction, software architecture, and product development across all mobile, web, and internal projects at Garage.ist.",
        tr: "Garage.ist bünyesindeki tüm mobil, web ve dahili projelerin genel teknik yönünü, yazılım mimarisini ve ürün geliştirmesini yönetiyorum.",
      },
    },
  },
  projects: {
    sectionLabel: { en: "02 / Projects", tr: "02 / Projeler" },
    title: { en: "Selected Works", tr: "Seçilmiş Çalışmalar" },
    garageTitle: { en: "GARAGE.IST PROJECTS", tr: "GARAGE.IST PROJELERİ" },
    personalTitle: { en: "PERSONAL & OPEN SOURCE", tr: "KİŞİSEL & AÇIK KAYNAK" },
    viewProject: { en: "View Details", tr: "Detayları Gör" },
    close: { en: "Close", tr: "Kapat" },
    highlights: { en: "Key Highlights", tr: "Öne Çıkan Özellikler" },
    techStack: { en: "Technologies & Stack", tr: "Kullanılan Teknolojiler" },
    visitLive: { en: "Visit Live", tr: "Canlı Siteyi Gör" },
    sortify: {
      title: { en: "Sortify", tr: "Sortify" },
      desc: {
        en: "A Garage.ist project. CTO, Project Manager & Lead Developer — full development lifecycle and App Store launches for iOS & Android.",
        tr: "Bir Garage.ist projesi. CTO, Proje Yöneticisi & Baş Geliştirici — iOS ve Android için tüm geliştirme döngüsü ve App Store lansmanları.",
      },
      bullets: {
        en: "<li>Architected Firestore security rules for robust data integrity.</li><li>Automated multi-platform App Store Connect publishing pipelines.</li><li>Established isolated Git patch workflows for junior engineers.</li>",
        tr: "<li>Sağlam veri bütünlüğü için Firestore güvenlik kurallarını tasarladım.</li><li>Çok platformlu App Store Connect yayınlama hatlarını otomatize ettim.</li><li>Junior mühendisler için izole Git yama iş akışları oluşturdum.</li>",
      },
    },
    tv: {
      desc: {
        en: "TV remote control application that operates over a local network. Built at Garage.ist as Lead Developer — architected the control protocol and all core systems.",
        tr: "Yerel ağ üzerinden çalışan TV uzaktan kumanda uygulaması. Garage.ist'te Baş Geliştirici olarak geliştirdim — kontrol protokolü ve tüm çekirdek sistemleri tasarladım.",
      },
      bullets: {
        en: "<li>Engineered low-latency custom UDP/TCP local control protocols.</li><li>Built a resilient auto-discovery mechanism across diverse network topologies.</li>",
        tr: "<li>Düşük gecikmeli özel UDP/TCP yerel kontrol protokolleri geliştirdim.</li><li>Farklı ağ topolojileri genelinde dayanıklı bir otomatik keşif mekanizması oluşturdum.</li>",
      },
    },
    gayrimenkul: {
      desc: {
        en: "Comprehensive real estate CRM system serving thousands of property listings, built for Garage.ist.",
        tr: "Garage.ist için oluşturulmuş, binlerce emlak ilanına hizmet veren kapsamlı gayrimenkul CRM sistemi.",
      },
      bullets: {
        en: "<li>Spearheaded the migration to a highly scalable microservice architecture.</li><li>Implemented full-text search engine integration with Algolia.</li>",
        tr: "<li>Yüksek düzeyde ölçeklenebilir bir mikroservis mimarisine geçişe öncülük ettim.</li><li>Algolia ile tam metin arama motoru entegrasyonu uyguladım.</li>",
      },
    },
    playSortify: {
      desc: {
        en: "Web port of the official Sortify iOS game. Built using React, TypeScript, and Vite to deliver a seamless browser-based gaming experience for kids, parents, and teachers, hosted on Firebase Hosting.",
        tr: "Resmi Sortify iOS oyununun web portu. React, TypeScript ve Vite kullanılarak, çocuklar, ebeveynler ve öğretmenler için Firebase Hosting üzerinde barındırılan sorunsuz bir tarayıcı tabanlı oyun deneyimi sunmak üzere oluşturuldu.",
      },
      bullets: {
        en: "<li>Led the frontend architecture, focusing on component reusability and animation performance.</li><li>Developed a specialized global state management solution optimized for web-based gaming logic.</li>",
        tr: "<li>Bileşen yeniden kullanılabilirliği ve animasyon performansına odaklanarak önyüz mimarisini yönettim.</li><li>Web tabanlı oyun mantığı için optimize edilmiş özel bir küresel durum yönetimi çözümü geliştirdim.</li>",
      },
    },
    osmos: {
      desc: {
        en: "Local-first version control engine with a Rust core (osmos-core, osmos-daemon), content-addressable storage, and an early Tauri/React desktop client.",
        tr: "Bellek güvenli Rust çekirdeği (osmos-core, osmos-daemon), içerik-adresli depolama ve erken aşamadaki Tauri/React masaüstü istemcisine sahip yerel-öncelikli sürüm kontrol motoru.",
      },
      bullets: {
        en: "<li>Rust core across <code>osmos-core</code>, <code>osmos-daemon</code>, and <code>osmos-transport</code></li><li>Content-addressable storage with BLAKE3 + SQLite metadata</li><li>Early-stage Tauri 2 + React 19 desktop client</li><li>Working local versioning, branching & merging (P2P sync on roadmap)</li>",
        tr: "<li><code>osmos-core</code>, <code>osmos-daemon</code> ve <code>osmos-transport</code> Rust crate yapısı</li><li>BLAKE3 + SQLite metadata ile içerik-adresli depolama</li><li>Erken aşamadaki Tauri 2 + React 19 masaüstü istemcisi</li><li>Çalışan yerel sürümleme, dallanma ve birleştirme (P2P yol haritasında)</li>",
      },
    },
    sins: {
      desc: {
        en: "A narrative-driven, grid-based RPG exploring a world trapped in a time loop. Developed solo, focusing on deep systemic design and storytelling.",
        tr: "Zaman döngüsüne hapsolmuş bir dünyayı keşfeden anlatı odaklı, ızgara tabanlı bir RPG. Derin sistemik tasarım ve hikaye anlatımına odaklanarak tek başına geliştirildi.",
      },
      bullets: {
        en: "<li>Architected a custom dialogue engine and event scripting system.</li><li>Implemented highly modular turn-based combat mechanics.</li>",
        tr: "<li>Özel bir diyalog motoru ve olay senaryosu sistemi modelledim.</li><li>Son derece modüler sıra tabanlı savaş mekanikleri uyguladım.</li>",
      },
    },
    writersIde: {
      title: { en: "Mythos", tr: "Mythos" },
      desc: {
        en: "Local-first narrative development environment built specifically for novelists developing multi-book, relational fiction worlds.",
        tr: "Çok kitaplı ve ilişkisel kurgu dünyaları geliştiren romancılar için yerel-öncelikli anlatı geliştirme ortamı.",
      },
      bullets: {
        en: "<li>Enforces a strict Series &rarr; Book &rarr; Chapter &rarr; Scene hierarchy for scalable storytelling.</li><li>Rust engine and Tauri/React client communicate over stdio — local-first by construction.</li>",
        tr: "<li>Ölçeklenebilir hikaye anlatımı için katı bir Seri &rarr; Kitap &rarr; Bölüm &rarr; Sahne hiyerarşisi uygular.</li><li>Rust motoru ve Tauri/React istemcisi stdio üzerinden konuşur — yapısal olarak yerel-öncelikli.</li>",
      },
      tags: {
        en: '<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">Tauri</span>\n<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">Rust</span>\n<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">TypeScript</span>',
        tr: '<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">Tauri</span>\n<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">Rust</span>\n<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">TypeScript</span>',
      },
    },
  },
  github: {
    sectionLabel: { en: "03 / Open Source", tr: "03 / Açık Kaynak" },
    title: { en: "Terminal", tr: "Terminal" },
    contributionsLabel: { en: "CONTRIBUTIONS", tr: "KATKILAR" },
    publicRepos: { en: "PUBLIC REPOS", tr: "AÇIK REPOLAR" },
    totalStars: { en: "TOTAL STARS", tr: "TOPLAM YILDIZ" },
    totalForks: { en: "TOTAL FORKS", tr: "TOPLAM FORK" },
    followers: { en: "FOLLOWERS", tr: "TAKİPÇİLER" },
    activity: { en: "CONTRIBUTION ACTIVITY", tr: "KATKI AKTİVİTESİ" },
    viewOnGithub: { en: "View on GitHub", tr: "GitHub'da Gör" },
    langDist: { en: "LANGUAGE DISTRIBUTION", tr: "DİL DAĞILIMI" },
    noLangData: { en: "No language data available", tr: "Dil verisi bulunamadı" },
    personal: { en: "PERSONAL", tr: "KİŞİSEL" },
    loadingRepos: { en: "LOADING REPOSITORIES...", tr: "REPOLAR YÜKLENİYOR..." },
    errorLoading: { en: "Error loading repositories", tr: "Repolar yüklenirken hata oluştu" },
    noDescription: { en: "No description provided.", tr: "Açıklama bulunmuyor." },
    noRepos: { en: "No repositories found", tr: "Repo bulunamadı" },
    calendarTotal: {
      en: "{{count}} contributions in the last year",
      tr: "Son bir yılda {{count}} katkı",
    },
    calendarLess: { en: "Less", tr: "Az" },
    calendarMore: { en: "More", tr: "Çok" },
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
      officialSite: { en: "Official Site", tr: "Resmi Site" },
      visitSite: { en: "Visit Official Site", tr: "Resmi Siteyi Ziyaret Et" },
      status: { en: "Novel · Writing Phase", tr: "Roman · Yazım Aşamasında" },
    },
  },
  contact: {
    sectionLabel: { en: "05 / Contact", tr: "05 / İletişim" },
    title: { en: "Let's Connect", tr: "İletişime Geçin" },
    desc: {
      en: "Open for compelling conversations — collaboration opportunities, open source discussions, or anything worth discussing.",
      tr: "İlgi çekici sohbetlere açığım — işbirliği teklifleri, açık kaynak tartışmaları veya konuşmaya değer herhangi bir şey.",
    },
    location: { en: "LOCATION", tr: "KONUM" },
    locationValue: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
  },
};
