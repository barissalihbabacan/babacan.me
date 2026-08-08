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
      en: "Barış Salih Babacan | Systems Architect & CTO",
      tr: "Barış Salih Babacan | Sistem Mimarı & CTO",
    },
    description: {
      en: "Barış Salih Babacan | Systems Architect & CTO based in Istanbul. Specializing in distributed P2P systems, offline-first architectures, and interactive digital experiences.",
      tr: "Barış Salih Babacan | İstanbul merkezli Sistem Mimarı & CTO. Dağıtık P2P sistemleri, çevrimdışı-öncelikli mimariler ve etkileşimli dijital deneyimler geliştirir.",
    },
  },
  hero: {
    roles: {
      en: "CTO @ Garage.ist · Systems Architect",
      tr: "Garage.ist CTO'su · Sistem Mimarı",
    },
    title: {
      en: 'Barış Salih<br /><em className="text-on-surface-variant font-normal not-italic">Babacan</em>',
      tr: 'Barış Salih<br /><em className="text-on-surface-variant font-normal not-italic">Babacan</em>',
    },
    subtitle: {
      en: "Systems Architect & CTO. Building distributed P2P systems, resilient offline-first architectures, and interactive digital experiences.",
      tr: "Sistem Mimarı & CTO. Dağıtık P2P sistemleri, çevrimdışı-öncelikli mimariler ve etkileşimli dijital deneyimler geliştiriyorum.",
    },
    viewWork: {
      en: "Explore Work →",
      tr: "Çalışmaları İncele →",
    },
    getInTouch: {
      en: "Contact",
      tr: "İletişim",
    },
    stat1_val: { en: "5+", tr: "5+" },
    stat1_lbl: { en: "YEARS EXP.", tr: "YIL DENEYİM" },
    stat2_val: { en: "10+", tr: "10+" },
    stat2_lbl: { en: "PROJECTS", tr: "PROJE" },
    stat3_val: { en: "100%", tr: "%100" },
    stat3_lbl: { en: "OFFLINE-FIRST", tr: "ÇEVRİMDİŞİ-ÖNCELİKLİ" },
    stat4_val: { en: "P2P", tr: "P2P" },
    stat4_lbl: { en: "ARCHITECTURE", tr: "MİMARİ" },
    badge: {
      en: "Available for technical consulting & advisory",
      tr: "Teknik danışmanlık & mentörlük için uygun",
    },
    titlePrefix: { en: "Systems Architect &", tr: "Sistem Mimarı &" },
    titleSuffix: { en: "Developer", tr: "Geliştirici" },
    subTitle: {
      en: "CTO @ Garage.ist. Building resilient, offline-first P2P systems, high-throughput backend pipelines, and interactive digital narrative experiences.",
      tr: "Garage.ist CTO'su. Dayanıklı, çevrimdışı-öncelikli P2P sistemler, yüksek verimli arka uç veri hatları ve etkileşimli dijital anlatı deneyimleri geliştiriyorum.",
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
      en: "Orchestrating system architecture, technology stack selection, and product engineering teams at Garage.ist.",
      tr: "Garage.ist bünyesinde sistem mimarisi, teknoloji yığını seçimi ve ürün mühendisliği ekiplerini yönetiyorum.",
    },
    item2_title: {
      en: "Systems Programming & Rust",
      tr: "Sistem Programlama & Rust",
    },
    item2_desc: {
      en: "Building memory-safe, low-latency, and high-performance native engines using Rust, Go, and C++.",
      tr: "Rust, Go ve C++ kullanarak bellek güvenli, düşük gecikmeli ve yüksek performanslı çekirdek motorlar geliştiriyorum.",
    },
    item3_title: {
      en: "Local-First & P2P Protocols",
      tr: "Çevrimdışı-Öncelikli & P2P Protokolleri",
    },
    item3_desc: {
      en: "Designing conflict-free data structures (CRDTs) and local network synchronization algorithms for data sovereignty.",
      tr: "Veri egemenliği için çakışmasız veri yapıları (CRDT'ler) ve yerel ağ senkronizasyon algoritmaları tasarlıyorum.",
    },
    item4_title: {
      en: "Narrative & Systems Design",
      tr: "Anlatı & Sistem Tasarımı",
    },
    item4_desc: {
      en: "Architecting interactive worldbuilding tools, storytelling engines, and complex world logic.",
      tr: "Etkileşimli dünya inşası araçları, hikaye anlatım motorları ve karmaşık kurgusal dünya mantıkları tasarlıyorum.",
    },
    tags: {
      localFirst: { en: "Local-First", tr: "Yerel-Öncelikli" },
      worldbuilding: { en: "Worldbuilding", tr: "Dünya İnşası" },
      lore: { en: "Lore & Narrative", tr: "Anlatı" },
      systemsDesign: { en: "Systems Design", tr: "Sistem Tasarımı" },
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
      status: { en: "Novel · Under Publication Review", tr: "Roman · Yayın Değerlendirmesinde" },
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
