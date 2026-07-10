export const i18nData = {
  nav: {
    experience: { en: "Experience", tr: "Deneyim" },
    projects: { en: "Projects", tr: "Projeler" },
    writing: { en: "Writing", tr: "Yazılar" },
    contact: { en: "Contact", tr: "İletişim" },
  },
  hero: {
    roles: {
      en: "Software Engineer · Systems Architect · Narrative Designer",
      tr: "Yazılım Mühendisi · Sistem Mimarı · Anlatı Tasarımcısı",
    },
    title: {
      en: 'Architecting Systems &amp;<br />\n            <span class="text-on-surface-variant font-normal italic">Narratives.</span>',
      tr: 'Sistem & Anlatı<br />\n            <span class="text-on-surface-variant font-normal italic">Mimarı.</span>',
    },
    subtitle: {
      en: "Based in Istanbul. Building autonomous systems, P2P architectures, and immersive narratives.<br><br>Currently CTO at Garage.ist and working on a novel.",
      tr: "İstanbul'da yaşıyorum. Otonom sistemler, P2P mimarileri ve sürükleyici anlatılar inşa ediyorum.<br><br>Şu anda Garage.ist'te CTO olarak görev yapıyor ve bir roman üzerinde çalışıyorum.",
    },
    stat1_val: { en: "14+", tr: "14+" },
    stat1_lbl: { en: "Years in Tech", tr: "Yıldır Teknolojiyle İç İçe" },
    stat2_val: { en: "CTO", tr: "CTO" },
    stat2_lbl: { en: "& Lead Developer", tr: "& Baş Geliştirici" },
    stat3_val: { en: "Author", tr: "Yazar" },
    stat3_lbl: { en: "& Narrative Designer", tr: "& Anlatı Tasarımcısı" },
    stat4_val: { en: "OSS", tr: "Açık Kaynak" },
    stat4_lbl: { en: "Active Contributor", tr: "Aktif Katılımcı" },
    scroll: { en: "Scroll", tr: "Aşağı Kaydır" },
    viewWork: {
      en: 'View Work <span class="material-symbols-outlined" style="font-size: 18px">arrow_forward</span>',
      tr: 'Çalışmaları Gör <span class="material-symbols-outlined" style="font-size: 18px">arrow_forward</span>',
    },
    getInTouch: { en: "Get in Touch", tr: "İletişime Geçin" },
  },
  experience: {
    sectionLabel: { en: "01 / Core Expertise", tr: "01 / Temel Uzmanlık" },
    title: { en: "What I Build", tr: "Neler Geliştiriyorum" },
    item1_title: { en: "Full-Stack Development", tr: "Full-Stack Geliştirme" },
    item1_desc: {
      en: "High-performance React and TypeScript ecosystems built for web excellence. Node.js backends designed for resilience and throughput.",
      tr: "Web mükemmelliği için oluşturulmuş yüksek performanslı React ve TypeScript ekosistemleri. Dayanıklılık ve yüksek verim için tasarlanmış Node.js arka uçları.",
    },
    item2_title: { en: "Systems Architecture", tr: "Sistem Mimarisi" },
    item2_desc: {
      en: "Rust, Go, and C++ for bare-metal performance and distributed systems. From custom network protocols to hardware interfacing.",
      tr: "Donanım düzeyinde performans ve dağıtık sistemler için Rust, Go ve C++. Özel ağ protokollerinden donanım arayüzlerine kadar.",
    },
    item3_title: { en: "Decentralized & P2P", tr: "Merkeziyetsiz & P2P" },
    item3_desc: {
      en: "Building local-first sync systems and conflict-free replicated data types (CRDTs) for offline-capable, serverless architectures.",
      tr: "Çevrimdışı çalışabilen, sunucusuz mimariler için yerel-öncelikli senkronizasyon sistemleri ve çakışmasız kopyalanan veri tipleri (CRDT'ler) geliştirme.",
    },
    item4_title: { en: "Narrative Design", tr: "Anlatı Tasarımı" },
    item4_desc: {
      en: "Crafting immersive storytelling ecosystems, blending system mechanics with world-building in interactive and written media.",
      tr: "Etkileşimli ve yazılı medyada sistem mekaniklerini dünya inşasıyla harmanlayarak sürükleyici hikaye anlatımı ekosistemleri hazırlama.",
    },
    tags: {
      localFirst: { en: "Local-First", tr: "Yerel-Öncelikli" },
      worldbuilding: { en: "Worldbuilding", tr: "Dünya İnşası" },
      lore: { en: "Lore", tr: "Evren / Kurgu" },
      systemsDesign: { en: "Systems Design", tr: "Sistem Tasarımı" },
    },
  },
  projects: {
    sectionLabel: { en: "02 / Selected Works", tr: "02 / Seçilmiş İşler" },
    garageTitle: { en: "Garage.ist & Professional", tr: "Garage.ist & Profesyonel" },
    personalTitle: { en: "Personal", tr: "Kişisel" },
    highlights: { en: "Key Highlights", tr: "Öne Çıkan Özellikler" },
    techStack: { en: "Technologies & Stack", tr: "Kullanılan Teknolojiler" },
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
        en: "Local-first, peer-to-peer version control & sync system for the Apple ecosystem. Powered by a Rust core and a native SwiftUI layer, Osmos aims to eliminate cloud dependency — giving creators total data sovereignty through a secure, offline-first architecture.",
        tr: "Apple ekosistemi için yerel-öncelikli, eşler arası sürüm kontrol ve senkronizasyon sistemi. Rust çekirdeği ve yerel SwiftUI katmanı ile güçlendirilen Osmos, bulut bağımlılığını ortadan kaldırmayı amaçlar — güvenli, çevrimdışı öncelikli mimari aracılığıyla içerik oluşturuculara tam veri egemenliği verir.",
      },
      bullets: {
        en: "<li>Rust core for performance and memory safety</li><li>Native SwiftUI interface for macOS & iOS</li><li>Zero cloud dependency — fully offline-first</li><li>Peer-to-peer sync over local network</li>",
        tr: "<li>Performans ve bellek güvenliği için Rust çekirdeği</li><li>macOS ve iOS için yerel SwiftUI arayüzü</li><li>Sıfır bulut bağımlılığı — tamamen çevrimdışı-öncelikli</li><li>Yerel ağ üzerinden eşler arası senkronizasyon</li>",
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
      title: { en: "Mythos IDE", tr: "Mythos IDE" },
      desc: {
        en: "A specialized local-first development environment built specifically for authors and narrative designers.",
        tr: "Yazarlar ve anlatı tasarımcıları için özel olarak oluşturulmuş, yerel-öncelikli bir geliştirme ortamı.",
      },
      bullets: {
        en: "<li>Enforces a strict Series &rarr; Books &rarr; Chapters hierarchy for scalable storytelling.</li><li>Features dedicated World Builder templates and integrated AI orchestration.</li>",
        tr: "<li>Ölçeklenebilir hikaye anlatımı için katı bir Seri &rarr; Kitap &rarr; Bölüm hiyerarşisi uygular.</li><li>Özel Dünya İnşası şablonları ve entegre yapay zeka orkestrasyonu içerir.</li>",
      },
      tags: {
        en: '<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">Tauri</span>\n<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">TypeScript</span>',
        tr: '<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">Tauri</span>\n<span class="font-label-mono text-[9px] text-on-surface-variant/50 border border-primary/30 px-2 py-0.5">TypeScript</span>',
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
    sectionLabel: { en: "03 / Writing", tr: "03 / Yazılar" },
    title: { en: "Publications", tr: "Yayınlar" },
    book: {
      genre: { en: "Psychological Fiction / Drama", tr: "Psikolojik Kurgu / Drama" },
      desc: {
        en: "An anatomy of a three-generation curse stretching from the haunted streets of Scotland to the soulless towers of Los Angeles. A Dostoevskian psychological family saga exploring the inevitable repetition of bloodlines and the questioning of virtue as a modern weakness.",
        tr: "İskoçya'nın tekinsiz sokaklarından Los Angeles'ın ruhsuz kulelerine uzanan üç nesillik bir lanetin anatomisi. Kan bağlarının kaçınılmaz tekrarını ve erdemin modern bir zayıflık olarak sorgulanmasını inceleyen, Dostoyevski tarzı psikolojik bir aile destanı.",
      },
      bullet1: {
        en: "The burden of ancestral legacy and moral culpability",
        tr: "Atasal mirasın yükü ve ahlaki sorumluluk",
      },
      bullet2: {
        en: "Conscience as an inescapable labyrinth of the soul",
        tr: "Ruhun kaçınılmaz bir labirenti olarak vicdan",
      },
      bullet3: {
        en: "Existential despair versus the possibility of spiritual rebirth",
        tr: "Varoluşsal umutsuzluğa karşı ruhsal yeniden doğuş olasılığı",
      },
      officialSite: { en: "Official Site", tr: "Resmi Site" },
      status: { en: "Novel · In Progress", tr: "Roman · Yazımı Devam Ediyor" },
    },
    ecosystem: {
      title: { en: "Digital Ecosystem — Three Nodes", tr: "Dijital Ekosistem — Üç Düğüm" },
      node1: {
        tag: { en: "Node 01", tr: "Düğüm 01" },
        name: { en: "The Fortress", tr: "Kale" },
        role: { en: "Core Experience", tr: "Temel Deneyim" },
        desc: {
          en: "Main site. Vanilla JS (ES6+), Tailwind, Firebase Functions on GCP. GSAP & Lenis rendering, Howler.js audio, Mapbox GL, D3.js visual webs. Cloudflare secured, Playwright E2E, Sentry, GitHub Actions CI/CD.",
          tr: "Ana site. Vanilla JS (ES6+), Tailwind, GCP üzerinde Firebase Functions. GSAP & Lenis görüntü oluşturma, Howler.js sesleri, Mapbox GL, D3.js görsel ağlar. Cloudflare korumalı, Playwright E2E, Sentry, GitHub Actions CI/CD.",
        },
      },
      node2: {
        tag: { en: "Node 02", tr: "Düğüm 02" },
        name: { en: "The Archives", tr: "Arşivler" },
        role: { en: "Lore & Blog", tr: "Kurgu & Blog" },
        desc: {
          en: "SSR + Headless CMS stack. Astro v5 + Sanity.io. 100% Core Web Vitals score. Partytown optimized for third-party scripts.",
          tr: "SSR + Headless CMS yığını. Astro v5 + Sanity.io. %100 Core Web Vitals skoru. Üçüncü taraf komut dosyaları için Partytown optimizasyonu.",
        },
      },
      node3: {
        tag: { en: "Node 03", tr: "Düğüm 03" },
        name: { en: "Supply Depot", tr: "Tedarik Deposu" },
        role: { en: "E-Commerce Storefront", tr: "E-Ticaret Vitrini" },
        desc: {
          en: "Fourthwall infrastructure with custom domain mapping. Specialized merchandise ecosystem for the saga's universe.",
          tr: "Özel alan adı haritalamalı Fourthwall altyapısı. Destan evreni için özel ürün ekosistemi.",
        },
      },
    },
  },
  contact: {
    sectionLabel: { en: "04 / Contact", tr: "04 / İletişim" },
    title: { en: "Get in Touch.", tr: "İletişime Geçin." },
    desc: {
      en: "Open to interesting conversations — collaboration proposals, open source discussions, or anything worth talking about.",
      tr: "İlgi çekici sohbetlere açığım — işbirliği teklifleri, açık kaynak tartışmaları veya konuşmaya değer herhangi bir şey.",
    },
    location: { en: "Location", tr: "Konum" },
    locationValue: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    availability: {
      en: "Limited Availability — Open to Inquiries",
      tr: "Sınırlı Uygunluk — Görüşmelere Açık",
    },
  },
  footer: {
    connect: { en: "Let's connect.", tr: "İletişime Geçin." },
    desc: {
      en: "Open to select architectural consulting and narrative design roles.",
      tr: "Seçili mimari danışmanlık ve anlatı tasarımı rollerine açığım.",
    },
  },
};
