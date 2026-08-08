export interface LocalizedText {
  en: string;
  tr: string;
}

export interface FAQItem {
  q: LocalizedText;
  a: LocalizedText;
}

export interface RelatedConcept {
  name: LocalizedText;
  url: string;
}

export interface ProjectData {
  title: LocalizedText;
  category: LocalizedText;
  categoryColor: string;
  status: LocalizedText;
  statusColor: string;
  year: LocalizedText;
  role: LocalizedText;
  cardGradient: string;
  description: LocalizedText;
  executiveSummary?: LocalizedText;
  problem?: LocalizedText;
  solution?: LocalizedText;
  architectureText?: LocalizedText;
  tradeoffs?: LocalizedText;
  securityText?: LocalizedText;
  performanceText?: LocalizedText;
  faq?: FAQItem[];
  relatedConcepts?: RelatedConcept[];
  relatedProjects?: ProjectKey[];
  mermaidDiagram?: string;
  highlights: { en: string[]; tr: string[] };
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export type ProjectKey =
  | "mythos"
  | "osmos"
  | "chorus"
  | "gayrimenkuldunyasi"
  | "sortify"
  | "plus-tv"
  | "playsortify"
  | "sporsayfasi"
  | "worldclock"
  | "qpass"
  | "itrms";

export const PROJECT_DATA: Record<ProjectKey, ProjectData> = {
  osmos: {
    title: { en: "Osmos", tr: "Osmos" },
    category: { en: "Local-First · Version Control", tr: "Yerel-Öncelikli · Sürüm Kontrolü" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "Alpha", tr: "Alpha" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2026–", tr: "2026–" },
    role: { en: "Founder & Lead Developer", tr: "Kurucu & Baş Geliştirici" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Osmos is a local-first version control engine built on a memory-safe Rust core, content-addressable storage, and a local daemon API. A Tauri + React + TypeScript desktop client is in early development on top of it.",
      tr: "Osmos; bellek güvenli Rust çekirdeği, içerik-adresli depolama ve yerel daemon API'si üzerine kurulu, yerel-öncelikli bir sürüm kontrol motorudur. Tauri + React + TypeScript masaüstü istemcisi erken geliştirme aşamasındadır.",
    },
    executiveSummary: {
      en: "The core engine detects filesystem changes, stores BLAKE3-addressed blobs, and tracks repositories, commits, and branches in SQLite — all exposed to clients through a local daemon over a Unix domain socket using newline-delimited JSON. Local versioning, branching, and merging work today; multi-device sync is the next milestone, planned around mDNS peer discovery and a QUIC transport layer that is currently a reserved, unimplemented crate.",
      tr: "Çekirdek motor, dosya sistemi değişikliklerini algılar, BLAKE3 özetli blob'ları saklar ve repository/commit/branch verilerini SQLite üzerinde takip eder — tüm bu işlevler, satır bazlı JSON formatı kullanan bir Unix domain socket daemon'u üzerinden istemcilere sunulur. Yerel sürümleme, dallanma ve birleştirme bugün çalışıyor; çok cihazlı senkronizasyon ise mDNS eş keşfi ve şu an sadece yer tutucu (henüz uygulanmamış) bir crate olan QUIC taşıma katmanı etrafında planlanan bir sonraki kilometre taşı.",
    },
    problem: {
      en: "Cloud-centric synchronization services stream data through third-party infrastructure and lock users into vendor storage, access, and sync models — exposing privacy and control risks for creative and technical work that should stay under its owner's direct management.",
      tr: "Bulut merkezli senkronizasyon hizmetleri, veri akışını üçüncü taraf altyapılar üzerinden gerçekleştirir ve kullanıcıyı servis sağlayıcının depolama, erişim ve senkronizasyon modeline bağımlı kılar — bu durum, sahibinin doğrudan kontrolünde kalması gereken yaratıcı ve teknik çalışmalar için gizlilik ve bağımlılık riski oluşturur.",
    },
    solution: {
      en: "Osmos records file states in the monitored workspace as BLAKE3-addressed blobs in local content-addressable storage, with repository state tracked in SQLite and exposed over a local daemon socket. This local-first foundation is designed to extend to direct device-to-device sync once the planned mDNS discovery and QUIC transport layer is built.",
      tr: "Osmos, izlenen çalışma alanındaki dosya durumlarını yerel içerik-adresli depolamada BLAKE3 özetli blob'lar olarak saklar; repository durumu SQLite üzerinde tutulur ve yerel bir daemon soketi üzerinden dışa açılır. Bu yerel-öncelikli temel, planlanan mDNS keşfi ve QUIC taşıma katmanı inşa edildiğinde cihazlar arası doğrudan senkronizasyona genişletilmek üzere tasarlanmıştır.",
    },
    architectureText: {
      en: "The core is implemented in memory-safe Rust across three crates: osmos-core (change detection, blob storage, SQLite metadata), osmos-daemon (exposing a JSON wire protocol over a Unix domain socket), and osmos-transport (reserved for the future mDNS/QUIC layer). The desktop shell is an early-stage Tauri 2 + React 19 + TypeScript client.",
      tr: "Çekirdek, bellek güvenli Rust ile üç crate üzerinde uygulanmıştır: osmos-core (değişiklik algılama, blob depolama, SQLite metadata), osmos-daemon (Unix domain socket üzerinden JSON protokolü sunan daemon) ve gelecekteki mDNS/QUIC katmanı için ayrılmış osmos-transport. Masaüstü kabuğu ise erken aşamadaki bir Tauri 2 + React 19 + TypeScript istemcisidir.",
    },
    tradeoffs: {
      en: "Writing a custom content-addressable storage engine and daemon protocol from scratch — instead of wrapping an existing VCS — took longer to reach a usable local workflow, but keeps the wire protocol and storage format fully under Osmos's control, which matters once peer sync is added.",
      tr: "Mevcut bir sürüm kontrol sistemini sarmalamak yerine içerik-adresli depolama motorunu ve daemon protokolünü sıfırdan yazmak, kullanılabilir bir yerel iş akışına ulaşmayı uzattı; ancak bu tercih, eş senkronizasyonu eklendiğinde önem kazanacak şekilde protokol ve depolama formatının tamamen Osmos'un kontrolünde kalmasını sağlıyor.",
    },
    mermaidDiagram: `graph LR
    A[Tauri + React Desktop UI] -->|Unix Socket JSON| B[osmos-daemon]
    B --> C[osmos-core Rust Engine]
    C -->|BLAKE3 Blobs + SQLite| D[Local Disk]
    C -.->|Planned: mDNS/QUIC| E[osmos-transport]`,
    highlights: {
      en: [
        "Memory-safe Rust engine with content-addressable BLAKE3 blob storage and SQLite metadata.",
        "Local daemon exposing repository, commit, and branch operations over a Unix domain socket.",
        "Early-stage Tauri 2 + React 19 + TypeScript desktop client built on top of the core engine.",
        "Peer-to-peer sync over mDNS and QUIC is designed and on the roadmap, not yet implemented.",
      ],
      tr: [
        "İçerik-adresli BLAKE3 blob depolama ve SQLite metadata'ya sahip bellek güvenli Rust motoru.",
        "Repository, commit ve branch işlemlerini Unix domain socket üzerinden sunan yerel daemon.",
        "Çekirdek motor üzerine inşa edilen erken aşama Tauri 2 + React 19 + TypeScript masaüstü istemcisi.",
        "mDNS ve QUIC üzerinden eşler arası senkronizasyon tasarlandı ve yol haritasında yer alıyor, henüz uygulanmadı.",
      ],
    },
    tech: ["Rust", "Tauri", "React", "TypeScript", "SQLite", "BLAKE3", "Local-First"],
    githubUrl: "https://github.com/Osmos-App/osmos-core",
    relatedProjects: ["mythos"],
    relatedConcepts: [
      {
        name: { en: "Local-First Version Control", tr: "Yerel-Öncelikli Sürüm Kontrolü" },
        url: "/en/docs#protocols",
      },
      {
        name: { en: "Content-Addressable Storage", tr: "İçerik-Adresli Depolama" },
        url: "/en/docs#crdt",
      },
    ],
  },
  mythos: {
    title: { en: "Mythos", tr: "Mythos" },
    category: { en: "App · Tooling", tr: "Uygulama · Araçlar" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "In Development", tr: "Geliştirime Aşamasında" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2026", tr: "2026" },
    role: { en: "Creator & Developer", tr: "Kurucu & Geliştirici" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Mythos is a local-first writer's IDE for novelists building multi-book, relational fiction worlds. The engine (mythoside-core) is a standalone Rust crate that models manuscripts as plain Markdown + YAML files on disk and exposes them over JSON-RPC on stdio; the desktop client (mythoside-ts) is a Tauri 2 + React 19 + TypeScript app that runs the engine as a sidecar process.",
      tr: "Mythos; çok kitaplı ve ilişkisel kurgu dünyaları geliştiren romancılar için yerel-öncelikli bir yazar IDE'sidir. Çekirdek motor (mythoside-core), taslakları düz Markdown + YAML dosyaları olarak diskte modelleyen ve stdio üzerinden JSON-RPC protokolüyle dışa açan bağımsız bir Rust crate'idir; masaüstü istemcisi (mythoside-ts) ise motoru sidecar süreç olarak çalıştıran Tauri 2 + React 19 + TypeScript uygulamasıdır.",
    },
    executiveSummary: {
      en: "Mythos treats a manuscript as a structured narrative data model inside a Series → Book → Chapter → Scene hierarchy. This structure is represented as plain Markdown and YAML files so the source of truth always remains on the author's disk, readable independently of any tool. The Rust engine never opens a network port; it talks to the desktop client strictly over stdin/stdout via JSON-RPC. A local SQLite + FTS5 index planned for fast cross-referencing is not yet built.",
      tr: "Mythos, bir taslağı Seri → Kitap → Bölüm → Sahne hiyerarşisi içinde yapılandırılmış bir anlatı veri modeli olarak ele alır. Bu yapı düz Markdown ve YAML dosyalarıyla temsil edilir; böylece asıl veri her zaman yazarın diskinde kalır ve araçtan bağımsız olarak okunabilir durumda olur. Rust motoru hiçbir zaman ağ portu açmaz; masaüstü istemcisiyle yalnızca stdin/stdout üzerinden JSON-RPC konuşur. Hızlı çapraz referanslar için planlanan yerel SQLite + FTS5 indeksi henüz inşa edilmemiştir.",
    },
    problem: {
      en: "Standard word processors do not model relationships between characters, locations, timelines, and narrative entities as first-class data. Specialized fiction tools often operate around closed project structures and vendor data models, locking authors into specific software environments.",
      tr: "Standart kelime işlemciler karakterler, mekanlar, zaman çizelgeleri ve diğer anlatı ögeleri arasındaki ilişkileri birinci sınıf veri olarak modellemez. Özel amaçlı kurgu araçları ise çoğu zaman kendi proje yapıları ve veri modelleri etrafında çalışarak yazarı belirli bir çalışma ortamına bağımlı hâle getirir.",
    },
    solution: {
      en: "Mythos decouples the editor from data by modeling narrative structures as portable Markdown and YAML files. The Rust engine manages this data model while the Tauri/React client communicates strictly over a local stdio-based JSON-RPC pipe. Even if the application layer changes, the core narrative data remains on the filesystem. A local SQLite + FTS5 index for relational queries and fast cross-referencing is planned as the next major step.",
      tr: "Mythos, anlatı verisini taşınabilir Markdown ve YAML dosyaları olarak modelleyerek editör ile veriyi birbirinden ayırır. Rust motoru bu veri modelini yönetir; Tauri/React istemcisi motorla yalnızca yerel stdio tabanlı JSON-RPC hattı üzerinden iletişim kurar. Böylece uygulama katmanı değişse bile temel anlatı verisi dosya sisteminde kalır. İlişkisel sorgular ve hızlı çapraz referanslar için SQLite + FTS5 tabanlı yerel indeks bir sonraki büyük adım olarak planlanmaktadır.",
    },
    architectureText: {
      en: "mythoside-core is a standalone Rust crate — with no Tauri or UI dependencies — handling the manuscript data model, Markdown + YAML parsing, and filesystem watching. It is packaged as a sidecar binary in the desktop app. mythoside-ts is the Tauri 2 + React 19 + TypeScript shell that spawns this engine as a sidecar process and manages client-side communication.",
      tr: "mythoside-core, taslak veri modelini, Markdown + YAML ayrıştırmasını ve dosya izlemeyi yöneten; Tauri veya arayüz bağımlılığı bulunmayan bağımsız bir Rust crate'idir. Masaüstü uygulamasında sidecar ikili dosyası olarak paketlenir. mythoside-ts ise bu motoru sidecar süreç olarak başlatan ve istemci tarafındaki iletişimi yöneten Tauri 2 + React 19 + TypeScript kabuğudur.",
    },
    tradeoffs: {
      en: "Splitting the engine and UI into two separate processes communicating over stdio — rather than a monolithic binary — allows data handling and parsing logic to be tested independently of the UI and makes the local-first boundary structural: the engine never listens on a network port. In exchange, the IPC protocol and process lifecycle between the two processes must be managed separately.",
      tr: "Motoru ve arayüzü tek bir monolitik ikili yerine stdio üzerinden iletişim kuran iki ayrı sürece bölmek, veri işleme ve ayrıştırma mantığının arayüzden bağımsız test edilebilmesini sağlar ve yerel-öncelikli sınırı yapısal hâle getirir: motor hiçbir zaman ağ portu dinlemez. Bunun karşılığında, iki süreç arasındaki IPC protokolünün ve yaşam döngüsünün ayrıca yönetilmesi gerekir.",
    },
    mermaidDiagram: `graph TD
    A[Tauri + React UI] -->|stdio JSON-RPC| B[mythoside-core Rust Engine]
    B -->|Markdown + YAML| C[Manuscript Files on Disk]
    B -.->|Planned: SQLite FTS5 Index| D[Local Search Index]`,
    highlights: {
      en: [
        "Structured Series → Book → Chapter → Scene hierarchy for multi-book manuscripts.",
        "Local-first architecture: manuscripts are tool-independent Markdown + YAML files, always on the author's disk.",
        "Rust engine and Tauri/React client communicate over stdio — the engine never opens a network port.",
        "Local SQLite + FTS5 index for cross-referencing and fast queries is on the roadmap.",
      ],
      tr: [
        "Çok kitaplı taslaklar için Seri → Kitap → Bölüm → Sahne yapısal hiyerarşisi.",
        "Yerel-öncelikli mimari: taslaklar her zaman yazarın diskinde kalan, araçtan bağımsız düz Markdown + YAML dosyalarıdır.",
        "Rust motoru ve Tauri/React istemcisi stdio üzerinden konuşur — motor hiçbir zaman ağ portu açmaz.",
        "Çapraz referanslar ve hızlı sorgular için SQLite + FTS5 tabanlı yerel indeks yol haritasında.",
      ],
    },
    tech: ["Tauri", "Rust", "React", "TypeScript"],
    githubUrl: "https://github.com/Mythos-IDE/mythoside-core",
    relatedProjects: ["osmos"],
    relatedConcepts: [
      {
        name: { en: "Local-First Architecture", tr: "Yerel-Öncelikli Mimari" },
        url: "/en/docs#architecture",
      },
      { name: { en: "Tauri vs Electron ADR", tr: "Tauri vs Electron ADR" }, url: "/en/docs#adr" },
    ],
  },
  qpass: {
    title: { en: "Q-PASS", tr: "Q-PASS" },
    category: { en: "Hardware · IoT", tr: "Donanım · IoT" },
    categoryColor: "text-tertiary border-tertiary/20",
    status: { en: "Active Production", tr: "Aktif Üretim" },
    statusColor: "bg-tertiary/20 border border-tertiary/30 text-tertiary",
    year: { en: "Production", tr: "Üretim" },
    role: { en: "System Architect", tr: "Sistem Mimarı" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Q-PASS is a hardware-backed RFID access control and meal-tracking system deployed in active production at Haydarpaşa MTAL. Custom 3D-printed RFID reader units run C++ microcontroller firmware, bridging over RS-232/USB serial interfaces to a Python background service and a PHP/MySQL web management dashboard for access logging and meal quota tracking.",
      tr: "Q-PASS; Haydarpaşa Mesleki ve Teknik Anadolu Lisesi'nde (Haydarpaşa MTAL) aktif üretim ortamında çalışan donanım destekli RFID geçiş kontrol ve yemek takip sistemidir. Özel tasarım 3D baskı RFID okuyucu üniteleri C++ mikrodenetleyici aygıt yazılımı ile çalışır; RS-232/USB seri bağlantısı üzerinden bir Python servisine ve geçiş/yemek kotası kayıtlarını yöneten bir PHP/MySQL web paneline bağlanır.",
    },
    executiveSummary: {
      en: "Operating in an active production environment at a public educational facility, Q-PASS manages high-density physical access events and cafeteria utilization. Scanning RFID credentials triggers hardware interrupts on microcontrollers; structured serial frames are sent over dedicated serial bridges to a local Python daemon that validates authorization against the MySQL database.",
      tr: "Aktif üretim ortamında çalışan Q-PASS, kamu eğitim kurumundaki geçiş noktalarında oluşan fiziksel veri akışını ve yemekhane kullanımını yönetir. RFID kartlarının taranması mikrodenetleyici üzerinde donanımsal kesme (interrupt) tetikler; oluşturulan yapılandırılmış seri paketler yerel Python servisi tarafından doğrulanarak MySQL veritabanına işlenir.",
    },
    problem: {
      en: "Manual record-keeping and standalone card readers caused entry bottlenecks during peak hours, lacked real-time digital logging, and prevented centralized credential verification.",
      tr: "Geleneksel manuel kayıt ve bağımsız kart okuyucular, ders ve yemek saatlerinde giriş kuyruklarına yol açıyor, anlık dijital doğrulama sunamıyor ve kart doğrulamasının merkezi olarak yapılmasını zorlaştırıyordu.",
    },
    solution: {
      en: "Q-PASS automates RFID credential scanning via C++ microcontroller firmware, streaming access and meal transactions over dedicated serial bridges to background services for real-time digital logging and quota enforcement.",
      tr: "Q-PASS, C++ mikrodenetleyici aygıt yazılımı ile RFID kart okumalarını otomatikleştirmekte; geçiş ve yemekhane işlemlerini seri iletişim hattı üzerinden arka plan servisine aktararak dijital kayıt ve kota takibi sağlamaktadır.",
    },
    architectureText: {
      en: "Microcontrollers at the hardware layer run C++ firmware handling interrupts and RFID reads. Structured serial frames are transmitted over RS-232/USB interfaces to a local Python background service, which validates packets and synchronizes with the PHP/MySQL web management backend.",
      tr: "Donanım katmanındaki mikrodenetleyiciler (C++ firmware) donanımsal kesmeleri ve RFID okumalarını işler. Yapılandırılmış seri veriler RS-232/USB arabirimi üzerinden yerel Python arka plan servisine aktarılır; servis paketleri doğrulayarak PHP/MySQL web yönetim paneli ve veritabanı ile senkronize eder.",
    },
    mermaidDiagram: `graph LR
    A[RFID Scanner Hardware] -->|C++ Firmware Serial| B[Python Daemon]
    B -->|HTTP API| C[PHP Web Backend]
    C -->|SQL Queries| D[MySQL Database]
    E[Admin Dashboard UI] -->|REST| C`,
    highlights: {
      en: [
        "Active production deployment operating in a public educational institution.",
        "Heterogeneous system integration across C++ microcontrollers, Python daemons, and PHP/MySQL web dashboards.",
        "Custom structured serial communication protocol operating over RS-232/USB interfaces.",
        "Real-time student entrance logging, meal quota enforcement, and administrative reporting tools.",
      ],
      tr: [
        "Kamu eğitim kurumunda aktif üretim ortamında çalışan donanım-yazılım altyapısı.",
        "C++ mikrodenetleyiciler, Python servisleri ve PHP/MySQL web panelleri arasında heterojen sistem entegrasyonu.",
        "RS-232/USB arabirimleri üzerinden çalışan özel yapılandırılmış seri iletişim protokolü.",
        "Öğrenci geçişlerinin ve yemek kotalarının anlık dijital kaydı ve idari raporlama araçları.",
      ],
    },
    tech: ["C++ / Arduino", "Python", "PHP", "MySQL", "RFID", "Serial Protocol"],
    githubUrl: "https://github.com/barissalihbabacan/Q-PASS-RFID-Access-Control",
  },
  gayrimenkuldunyasi: {
    title: { en: "Gayrimenkul Dünyası", tr: "Gayrimenkul Dünyası" },
    category: { en: "Web · Full-Stack", tr: "Web · Full-Stack" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "Founder & Lead Architect", tr: "Kurucu & Baş Mimar" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Gayrimenkul Dünyası is a real estate data ingestion, normalization, and CRM platform. Built with Next.js App Router and TypeScript, it combines Playwright Stealth automated data collection pipelines with Google News XML/RSS parsers connected to Cloud Firestore.",
      tr: "Gayrimenkul Dünyası; gayrimenkul verilerini toplamak, yapılandırmak ve CRM süreçlerine taşımak için geliştirilen bir veri toplama ve yönetim platformudur. Next.js App Router ve TypeScript ile geliştirilen altyapı, Playwright Stealth otomatik veri toplama hatlarını Google News XML/RSS ayrıştırıcıları ile birleştirerek Cloud Firestore veritabanına bağlar.",
    },
    executiveSummary: {
      en: "Designed to automatically aggregate real estate listings, sector news, and market signals, the system ingests data across heterogeneous sources. Automated collection jobs utilize Playwright Stealth for browser-based sources while pairing with structured XML/RSS parser pipelines for news feeds.",
      tr: "Gayrimenkul ilanları, sektör haberleri ve pazar sinyallerini otomatik olarak derlemek üzere tasarlanan sistem, heterojen kaynaklardan veri akışı sağlar. Otomatik veri toplama görevleri, tarayıcı tabanlı kaynaklar için Playwright Stealth katmanını kullanırken, uygun kaynaklarda yapılandırılmış XML/RSS ayrıştırıcı hattı ile desteklenir.",
    },
    problem: {
      en: "Because real estate data is fragmented across disparate listing portals and news channels, manual monitoring slowed down data ingestion, update frequency, and operational workflows for real estate professionals.",
      tr: "Gayrimenkul verileri farklı ilan kaynakları ve haber kanallarına dağılmış durumda olduğundan, bunların manuel olarak takip edilmesi veri toplama ve güncelleme süreçlerini yavaşlatıyor ve operasyonel yük oluşturuyordu.",
    },
    solution: {
      en: "The platform automates data ingestion using Playwright Stealth crawlers and Google News RSS pipelines, centrally persisting structured real estate data on Cloud Firestore to serve the application layer.",
      tr: "Platform, Playwright Stealth ve Google News RSS hatlarını kullanarak veri toplama süreçlerini otomatikleştirmekte; yapılandırılmış gayrimenkul verilerini Cloud Firestore üzerinde merkezi olarak saklamakta ve uygulama katmanına sunmaktadır.",
    },
    architectureText: {
      en: "The application architecture is built on Next.js App Router with React Server Components. The data ingestion layer combines browser automation (Playwright Stealth), RSS parsing pipelines (Node.js), and a query-optimized Cloud Firestore database.",
      tr: "Uygulama, Next.js App Router ve React Server Components tabanlı bir mimari üzerine kurulmuştur. Veri katmanı; tarayıcı otomasyonu (Playwright Stealth), RSS ayrıştırma hattı (Node.js) ve sorgu odaklı Cloud Firestore veritabanından oluşmaktadır.",
    },
    highlights: {
      en: [
        "Application architecture built on Next.js App Router and React Server Components.",
        "Automated data ingestion pipeline using Playwright Stealth for browser automation.",
        "Structured parsing pipeline for Google News XML/RSS data feeds.",
        "Query-optimized Cloud Firestore schema designed for database cost efficiency.",
      ],
      tr: [
        "Next.js App Router ve React Server Components tabanlı uygulama mimarisi.",
        "Playwright Stealth destekli tarayıcı otomasyonu ile otomatik veri toplama altyapısı.",
        "Google News XML/RSS kaynakları için yapılandırılmış veri ayrıştırma hattı.",
        "Firestore okuma/yazma maliyetlerini gözeten, sorgu odaklı veri şeması.",
      ],
    },
    tech: ["Next.js", "Playwright Stealth", "Firestore", "TypeScript", "XML Parser"],
    liveUrl:
      "https://garage.ist/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=garage_project",
  },
  sortify: {
    title: { en: "Sortify", tr: "Sortify" },
    category: { en: "Mobile · iOS & Systems", tr: "Mobil · iOS & Sistemler" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: {
      en: "CTO · Lead Architect",
      tr: "CTO · Baş Mimar",
    },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Sortify is a native SwiftUI iOS/iPadOS educational application for children (ages 3–13+) and parents. Built with a modular Swift Package architecture, it pairs a native iOS client with Firebase backend services, server-side StoreKit purchase verification, and local network device pairing.",
      tr: "Sortify; 3–13+ yaş arası çocukların öğrenme, oyun ve gelişim süreçlerini ebeveynleriyle birlikte yöneten, SwiftUI ile geliştirilmiş native iOS/iPadOS uygulamasıdır. Modüler Swift Package mimarisi üzerine kurulu altyapı; Firebase servisleri, sunucu taraflı StoreKit satın alma doğrulaması ve yerel ağ cihaz eşleştirme protokolü ile desteklenir.",
    },
    executiveSummary: {
      en: "Architected around a modular Swift Package structure, Sortify decouples domain logic into isolated packages while structuring the presentation layer with MVVM and Swift concurrency isolation. The native SwiftUI client interfaces with Firebase Auth, Cloud Firestore, serverless Cloud Functions for StoreKit purchase validation, and local mDNS device pairing.",
      tr: "Modüler Swift Package mimarisi etrafında tasarlanan Sortify, iş mantığını izole paketlere ayırırken arayüz katmanını MVVM ve Swift concurrency izolasyonu ile yapılandırır. Native SwiftUI istemcisi; Firebase Auth, Cloud Firestore veritabanı, sunucu taraflı StoreKit satın alma doğrulama altyapısı ve mDNS tabanlı yerel cihaz eşleştirme protokolü ile entegre çalışır.",
    },
    problem: {
      en: "Managing child, parent, and teacher experiences within the same application required decoupling distinct responsibilities—such as user roles, educational content, game modules, subscriptions, and device pairing—into a sustainable mobile architecture.",
      tr: "Çocuk, ebeveyn ve öğretmen deneyimlerini aynı uygulama içinde yönetmek; farklı kullanıcı rolleri, eğitim içerikleri, oyun modülleri, abonelikler ve cihaz eşleştirme gibi farklı sorumlulukların sürdürülebilir bir mobil mimari içinde ayrıştırılmasını gerektiriyordu.",
    },
    solution: {
      en: "Sortify decouples application responsibilities through modular Swift packages and a protocol-based service layer. StoreKit 2 purchase validation is handled server-side, device pairing operates over the local network, while analytics and notification services are integrated as isolated layers.",
      tr: "Sortify, uygulama sorumluluklarını modüler Swift paketleri ve protokol tabanlı servis katmanı üzerinden ayrıştırır. StoreKit 2 satın alma doğrulaması sunucu tarafında gerçekleştirilirken, cihaz eşleştirme yerel ağ üzerinden yürütülür; analitik ve bildirim servisleri uygulama mimarisinden ayrı entegrasyon katmanları olarak ele alınır.",
    },
    architectureText: {
      en: "The client architecture is built on native SwiftUI, MVVM, and Swift concurrency isolation. Modular Swift packages separate domain boundaries, while Firebase Auth, Cloud Firestore, and Cloud Functions support backend services alongside OneSignal notification pipelines and local mDNS device pairing.",
      tr: "Uygulama katmanı native SwiftUI, MVVM ve Swift concurrency izolasyonu üzerine kuruludur. Modüler Swift paketleri işlevsel sınırları ayırırken; Firebase Auth, Cloud Firestore ve Cloud Functions backend servislerini; OneSignal bildirim altyapısını ve yerel mDNS cihaz eşleştirmesini destekler.",
    },
    mermaidDiagram: `graph TD
    A[SwiftUI Native Client] --> B[Modular Swift Packages]
    B -->|Services| C[Firebase Auth & Cloud Firestore]
    B -->|Purchase Verification| D[Cloud Functions / StoreKit 2]
    B -.->|Integrations| E[Analytics & Push Notifications]
    B -.->|Local Network| F[mDNS Device Pairing]`,
    highlights: {
      en: [
        "Native SwiftUI iOS/iPadOS application decoupled via a modular Swift Package architecture.",
        "Server-side StoreKit 2 purchase verification infrastructure via Cloud Functions.",
        "Local network mDNS-based pairing between parent and child devices.",
        "Integrated application infrastructure with Firebase, analytics, and lifecycle notification services.",
      ],
      tr: [
        "Modüler Swift Package mimarisiyle ayrıştırılmış native SwiftUI iOS/iPadOS uygulaması.",
        "StoreKit 2 ve Cloud Functions üzerinden sunucu taraflı satın alma doğrulama altyapısı.",
        "Ebeveyn ve çocuk cihazları arasında yerel ağ üzerinden mDNS tabanlı eşleştirme.",
        "Firebase, analitik ve lifecycle bildirim servisleriyle entegre uygulama altyapısı.",
      ],
    },
    tech: ["SwiftUI", "Swift", "Firebase", "Cloud Functions", "StoreKit 2", "mDNS"],
    liveUrl:
      "https://garage.ist/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=sortify_project",
  },
  "plus-tv": {
    title: { en: "+TV", tr: "+TV" },
    category: { en: "Mobile · Android", tr: "Mobil · Android" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Launched", tr: "Yayında" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "Lead Developer", tr: "Baş Geliştirici" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "+TV is an Android application developed under Garage.ist designed to discover and control Smart TV devices over the local network. Built with Java and Kotlin, the application communicates directly with TV devices over local Wi-Fi without relying on external cloud services.",
      tr: "+TV; Garage.ist bünyesinde geliştirilen, yerel ağ üzerindeki Akıllı TV cihazlarını keşfetmek ve kontrol etmek için tasarlanmış Android uygulamasıdır. Java ve Kotlin ile geliştirilen uygulama, TV cihazlarıyla doğrudan yerel ağ üzerinden iletişim kurarak kontrol akışını harici bir bulut servisine bağımlı olmadan gerçekleştirir.",
    },
    executiveSummary: {
      en: "+TV combines local network device discovery and TV control on Android. Ingesting compatible TV devices on the same subnet, the app transmits control commands directly to devices. This approach eliminates unnecessary remote service dependencies while shifting device communication directly to the local network layer.",
      tr: "+TV, Android üzerinde yerel ağ cihaz keşfi ve TV kontrolünü bir araya getirir. Uygulama, aynı ağ üzerindeki uyumlu TV cihazlarını keşfederek kontrol komutlarını doğrudan cihazlara iletir. Bu yaklaşım, kontrol akışındaki gereksiz uzak servis bağımlılıklarını ortadan kaldırırken cihaz iletişimini doğrudan yerel ağ katmanına taşır.",
    },
    problem: {
      en: "Routing Smart TV control commands through external cloud servers creates an unnecessary intermediate layer for devices that can be communicated with directly over the local network.",
      tr: "Akıllı TV kontrolünün harici servisler üzerinden gerçekleştirilmesi, yerel ağda doğrudan iletişim kurulabilecek cihazlar için gereksiz bir ara katman oluşturabilir. +TV, cihaz ve kontrol uygulaması arasındaki iletişimi doğrudan yerel ağ üzerinde gerçekleştirerek bu bağımlılığı azaltmak üzere tasarlanmıştır.",
    },
    solution: {
      en: "+TV executes device discovery and control communications over the local network within the Android application. Once compatible TV devices are discovered, control commands transmit directly to the device.",
      tr: "+TV, cihaz keşfi ve kontrol iletişimini Android uygulaması içinde yerel ağ üzerinden gerçekleştirir. Böylece uyumlu TV cihazları keşfedildikten sonra kontrol komutları doğrudan cihaza iletilir.",
    },
    architectureText: {
      en: "The Android application is developed with Java and Kotlin. Device discovery and control communications execute over the local network, where the application layer manages TV discovery, connection state, and command transmission.",
      tr: "Android uygulaması Java ve Kotlin ile geliştirilmiştir. Cihaz keşfi ve kontrol iletişimi yerel ağ üzerinden gerçekleştirilirken, uygulama katmanı TV cihazlarının bulunması, bağlantının yönetilmesi ve kontrol komutlarının iletilmesinden sorumludur.",
    },
    highlights: {
      en: [
        "Native Java and Kotlin application on Android.",
        "Smart TV device discovery and direct control over the local network.",
        "Local communication architecture independent of external cloud services.",
        "Unified management of device discovery and control workflows within a single app.",
      ],
      tr: [
        "Android üzerinde native Java + Kotlin uygulaması.",
        "Yerel ağ üzerinden Akıllı TV cihazı keşfi ve doğrudan kontrol.",
        "Harici bulut servisine ihtiyaç duymayan yerel iletişim mimarisi.",
        "Cihaz keşfi ve kontrol iletişiminin tek uygulama içinde yönetilmesi.",
      ],
    },
    tech: ["Java", "Kotlin", "Android", "Local Networking"],
    liveUrl:
      "https://garage.ist/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=garage_project",
  },
  playsortify: {
    title: { en: "Sortify Web", tr: "Sortify Web" },
    category: { en: "Web · Front-End & Canvas", tr: "Web · Önyüz & Canvas" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "Lead Developer", tr: "Baş Geliştirici" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Sortify Web is the browser client of the Sortify educational platform. Built with React 19, TypeScript, and Vite, the application brings native iOS game logic into web browsers using an HTML5 Canvas rendering architecture and responsive controls.",
      tr: "Sortify Web; Sortify eğitim platformunun web tarayıcıları için geliştirilmiş istemcisidir. React 19, TypeScript ve Vite ile geliştirilen uygulama, native iOS oyun mantığını HTML5 Canvas tabanlı bir çizim altyapısı ve duyarlı kontrollerle web ortamına taşır.",
    },
    executiveSummary: {
      en: "Sortify Web adopts a rendering architecture that decouples live game state from React UI state while porting native iOS game mechanics to the web. Operating over a requestAnimationFrame loop, mutable game state persists in refs while score, streak, and UI components are managed via React state, maintaining behavioral parity with the native Swift iOS client.",
      tr: "Sortify Web, native iOS oyun mekaniklerini tarayıcı ortamına taşırken oyun durumunu React arayüz durumundan ayıran bir render mimarisi kullanır. Oyun döngüsü requestAnimationFrame üzerinden çalışır; değişken oyun durumu mutable ref yapısında tutulurken skor, seri ve diğer arayüz bileşenleri React state üzerinden yönetilir. Native Swift oyun mantığının TypeScript'e aktarılmasıyla web ve iOS deneyimleri arasında davranışsal tutarlılık korunur.",
    },
    problem: {
      en: "Porting touch-focused native iOS game mechanics to web browsers required decoupling the rendering loop from React's component re-render lifecycle, adapting to varying screen dimensions, and unifying touch and mouse control inputs.",
      tr: "Dokunmatik odaklı native iOS oyun mekaniklerini web tarayıcılarına taşımak; oyun döngüsünü React'in bileşen yeniden oluşturma modelinden ayırmayı, farklı ekran boyutlarına uyum sağlamayı ve hem dokunmatik hem fare girdilerini desteklemeyi gerektiriyordu.",
    },
    solution: {
      en: "Sortify Web executes game rendering and animations on HTML5 Canvas while leveraging React for application chrome and high-level state management. Utilizing a requestAnimationFrame loop and ref-based game state prevents React re-render overhead during animation frames, paired with TypeScript ports of Swift game logic.",
      tr: "Sortify Web, oyun çizim ve animasyonlarını HTML5 Canvas üzerinde çalıştırırken React'i uygulama arayüzü ve durumun üst düzey yönetimi için kullanır. requestAnimationFrame tabanlı render döngüsü ve ref tabanlı oyun durumu sayesinde oyun içi animasyonların her karesinde React render zincirine girmekten kaçınılır. Native Swift oyun mantığı TypeScript'e port edilerek web istemcisine uyarlanmıştır.",
    },
    architectureText: {
      en: "Built on React 19, TypeScript, and Vite. React manages routing, UI components, and application state, while HTML5 Canvas handles real-time game rendering. A ResizeObserver-based metric architecture adapts to screen viewports, binding touch and mouse inputs to a unified control layer, with Firebase Auth and Cloud Firestore powering user state and leaderboards.",
      tr: "React 19, TypeScript ve Vite üzerine kurulan uygulamada React; yönlendirme, arayüz bileşenleri ve uygulama durumunu yönetirken HTML5 Canvas oyunların gerçek zamanlı çizim ve animasyon katmanını üstlenir. ResizeObserver tabanlı ölçüm yapısı farklı ekran boyutlarına uyum sağlarken dokunmatik ve fare girdileri aynı oyun kontrol katmanına bağlanır. Firebase servisleri ise kimlik doğrulama, kullanıcı verileri ve liderlik tabloları gibi uygulama özelliklerini destekler.",
    },
    highlights: {
      en: [
        "Native Swift game logic ported directly to TypeScript.",
        "Canvas-based game loop leveraging requestAnimationFrame and mutable ref state.",
        "Decoupled React UI layer from the real-time canvas game rendering loop.",
        "Responsive game interface supporting both touch and mouse control inputs.",
        "Firebase Auth and Cloud Firestore integration.",
      ],
      tr: [
        "Native iOS oyun mantığının TypeScript'e port edilmesi.",
        "requestAnimationFrame ve mutable ref state kullanan Canvas tabanlı oyun döngüsü.",
        "React UI katmanı ile gerçek zamanlı oyun render katmanının ayrıştırılması.",
        "Dokunmatik ve fare girdilerini destekleyen responsive oyun arayüzü.",
        "Firebase Auth ve Cloud Firestore entegrasyonu.",
      ],
    },
    tech: ["React 19", "TypeScript", "Vite", "HTML5 Canvas", "Firebase", "Tailwind CSS"],
    liveUrl:
      "https://garage.ist/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=garage_project",
  },
  sporsayfasi: {
    title: { en: "Spor Sayfası", tr: "Spor Sayfası" },
    category: { en: "Web · Infrastructure & Backend", tr: "Web · Altyapı & Arka Uç" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "Infrastructure & Backend Integration", tr: "Altyapı & Backend Entegrasyonu" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Spor Sayfası is a sports news portal developed under Garage.ist using Next.js App Router and TypeScript. My engineering contributions centered on configuring the Firebase infrastructure, hosting setup, database record persistence, and debugging news ingestion API integrations.",
      tr: "Spor Sayfası; Garage.ist bünyesinde Next.js App Router ve TypeScript ile geliştirilen bir spor haber portalıdır. Projede Firebase altyapısı, Hosting kurulumu, veritabanı kayıt süreçleri ve haber toplama API entegrasyonu tarafımdan yapılandırılmıştır.",
    },
    executiveSummary: {
      en: "Acting as the infrastructure & backend integration lead on the project, I established the Firebase Hosting deployment pipeline and resolved data synchronization errors within the sports news ingestion APIs, securing database persistence for parsed sports content.",
      tr: "Proje genelinde altyapı ve backend entegrasyonu sorumluluğu üstlenilerek, uygulamanın Firebase Hosting üzerinde sorunsuz yayınlanması sağlandı. Haber çekme API'lerindeki senkronizasyon ve veri işleme hataları giderilmiş, veritabanı kayıt ve veri sürekliliği altyapısı yapılandırılmıştır.",
    },
    problem: {
      en: "During project deployment, data ingestion bugs in external sports APIs and unconfigured database persistence routines caused content stream interruptions for the web application.",
      tr: "Uygulamanın canlıya alınması sürecinde dış spor API'lerinden haber çekme akışlarında meydana gelen hatalar ve veritabanı kayıt süreçlerindeki eksiklikler, içeriklerin kesintisiz sunulmasını engelliyordu.",
    },
    solution: {
      en: "Data fetching errors in the news collection API were debugged and resolved, database persistence pipelines were configured for incoming sports records, and deployment was automated via Firebase Hosting.",
      tr: "Haber toplama API'sindeki veri çekme hataları çözülerek veri sürekliliği sağlandı; içeriklerin veritabanına sorunsuz kaydedilmesi için veri katmanı yapılandırıldı ve uygulama Firebase Hosting üzerinde canlıya alındı.",
    },
    architectureText: {
      en: "Built on Next.js App Router, the application interfaces with news collection API services and a structured database persistence layer, backed by Firebase Hosting deployment.",
      tr: "Next.js App Router mimarisine sahip uygulama; dış haber API'lerini işleyen servis katmanı ve veri kayıt mekanizması üzerine kurulmuştur. Yayın altyapısı Firebase Hosting ile desteklenmiştir.",
    },
    highlights: {
      en: [
        "Configuration of Firebase infrastructure and hosting deployment pipelines.",
        "Debugging and resolution of data fetching errors in the sports news collection API.",
        "Backend integration of database persistence for ingested sports news records.",
        "Infrastructure support for the Next.js App Router sports web portal.",
      ],
      tr: [
        "Firebase altyapısı ve Hosting canlıya alım süreçlerinin yapılandırılması.",
        "Spor haberleri toplama API'sindeki veri çekme ve senkronizasyon hatalarının çözülmesi.",
        "İçeriklerin veritabanına sorunsuz kaydedilmesi için veri katmanı entegrasyonu.",
        "Next.js App Router tabanlı web portalı altyapı desteği.",
      ],
    },
    tech: ["Firebase", "Next.js", "TypeScript", "REST API", "Node.js"],
    liveUrl:
      "https://garage.ist/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=garage_project",
  },
  worldclock: {
    title: { en: "World Clock", tr: "World Clock" },
    category: { en: "Web · Front-End & Geo", tr: "Web · Önyüz & Geo" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Launched", tr: "Yayında" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "Lead Developer", tr: "Baş Geliştirici" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "World Clock is an interactive timezone, geographic visualization, and SEO-driven city directory application developed under Garage.ist using React 18, Vite, and D3.js. It pairs a D3 projection rendering engine with an SSG/Prerender pipeline, solar terminator calculations, and multi-city meeting planner tools.",
      tr: "World Clock; Garage.ist bünyesinde React 18, Vite ve D3.js ile geliştirilen etkileşimli zaman dilimi, coğrafi görselleştirme ve SEO odaklı şehir rehberi uygulamasıdır. D3 tabanlı projeksiyon altyapısını SSG/Prerender motoru, güneş terminatörü hesaplamaları ve çoklu şehir toplantı planlama araçlarıyla birleştirir.",
    },
    executiveSummary: {
      en: "Developed with React, D3.js, and Vite, World Clock utilizes a D3 projection rendering pipeline on HTML5 Canvas alongside an SSG/Prerender architecture for SEO optimization. The visualization morphs seamlessly between an orthographic globe view and a flat map projection, supported by real-time solar position calculations, timezone offsets, DST rules, and prerendered static city directory pages.",
      tr: "React, D3.js ve Vite ile geliştirilen World Clock, HTML5 Canvas üzerinde coğrafi verileri işleyen özel bir projeksiyon altyapısı ve arama motoru optimizasyonu için SSG/Prerender mimarisi kullanır. Ortografik küre görünümü ile düz harita arasında dönüşebilen görselleştirme katmanı; anlık güneş konumu, zaman dilimi, DST hesaplamaları ve statik pre-render edilen şehir sayfalarıyla desteklenir.",
    },
    problem: {
      en: "Tracking cross-city timezone differences, Daylight Saving Time (DST) transitions, and solar positions required intuitive spatial visualizations, while ensuring dynamic client-side geographic applications remain indexable for SEO search engines across city directory pages.",
      tr: "Şehirlerarası zaman farklarını, yaz/kış saati geçişlerini ve güneş konumunu statik saat tablolarıyla takip etmenin zorluğu yanında; dinamik istemci taraflı coğrafi uygulamaların arama motorlarında (SEO) indekslenmesi ve şehir sayfalarının hızlı sunulması gerekiyordu.",
    },
    solution: {
      en: "Engineered an interactive Canvas-based world visualization using D3.js and TopoJSON. Combined projection morphing, solar terminator calculations, and meeting planner tools into a unified calculation layer, while building a Vite + React server prerendering script (prerender.mjs) to compile SEO-optimized static city HTML pages.",
      tr: "D3.js ve TopoJSON kullanılarak Canvas tabanlı etkileşimli bir dünya görselleştirmesi geliştirildi. Projeksiyon dönüşümü, güneş terminatörü hesaplamaları ve toplantı planlama araçları tek bir hesaplama katmanında birleştirildi; Vite + React Server entry (prerender.mjs) ile tüm şehir sayfaları SEO uyumlu statik HTML olarak derlendi.",
    },
    architectureText: {
      en: "Built on React 18 and Vite, the client architecture executes geographic renderings on HTML5 Canvas via D3.js and TopoJSON. A custom Vite SSG prerender build engine (scripts/prerender.mjs) compiles city directory pages into SEO-optimized static HTML, while timezone, DST, and solar position math reside in dedicated helper modules.",
      tr: "React 18 ve Vite üzerine kurulu istemci mimarisinde coğrafi çizimler D3.js ve TopoJSON ile HTML5 Canvas üzerinde gerçekleştirilir. Vite SSR/SSG pre-render derleme motoru (scripts/prerender.mjs) tüm şehir ve rehber sayfalarını arama motorları için statik HTML çıktılarına dönüştürür; zaman dilimi, DST ve güneş konumu hesaplamaları özel modüller üzerinden yönetilir.",
    },
    highlights: {
      en: [
        "D3.js projection morphing between an orthographic globe view and a flat map.",
        "SSG/Prerender static page compilation pipeline via Vite + React for SEO indexability.",
        "Solar terminator computing and rendering real-time day/night boundaries from subsolar coordinates.",
        "Cross-timezone working hour overlap and meeting planner tools.",
        "Multilingual city directory data integration supporting 5 languages (TR, EN, DE, FR, ES).",
      ],
      tr: [
        "D3.js projeksiyon dönüşümü ile ortografik küre görünümü ve düz harita arasında akıcı geçiş.",
        "SEO ve arama motoru indekslemesi için Vite + React SSG/Prerender statik sayfa derleme mimarisi.",
        "Anlık subsolar koordinatlarından gece/gündüz sınırının hesaplanması ve görselleştirilmesi.",
        "Şehirlerarası ortak çalışma saatleri ve toplantı zamanlarının hesaplanması.",
        "5 dili (TR, EN, DE, FR, ES) destekleyen yerelleştirilmiş şehir rehberi ve veri katmanı.",
      ],
    },
    tech: ["React 18", "D3.js", "Vite", "SSG / Prerender", "TopoJSON"],
    liveUrl:
      "https://garage.ist/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=garage_project",
  },
  itrms: {
    title: { en: "IT-RMS", tr: "IT-RMS" },
    category: { en: "Web · Full-Stack & Systems", tr: "Web · Full-Stack & Sistemler" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "Archived", tr: "Arşivlendi" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2024–2026", tr: "2024–2026" },
    role: { en: "Lead Architect & Developer", tr: "Baş Mimar & Geliştirici" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "IT-RMS is a web-based IT asset, inventory, and laboratory management system originally developed for an educational institution's IT department. Initially built with PHP 8, MySQL, and Composer, the system was subsequently migrated to a modern Node.js, Express.js, and MongoDB (Mongoose) architecture. It features 2D lab layout mapping, stock threshold alerts, QR/barcode generation, and role-based access control.",
      tr: "IT-RMS; bir eğitim kurumunun BT departmanı için geliştirilen web tabanlı bir BT varlık, envanter ve laboratuvar yönetim sistemidir. İlk olarak PHP 8, MySQL ve Composer bağımlılıklarıyla inşa edilen platform, daha sonra modern Node.js, Express.js ve MongoDB (Mongoose) mimarisine taşınmıştır. 2D laboratuvar kroki yerleşimi, stok eşik uyarıları, karekod/barkod üretimi ve rol tabanlı erişim kontrolü sunar.",
    },
    executiveSummary: {
      en: "Engineered for an educational IT department, IT-RMS manages multi-branch lab hardware tracking, 2D coordinate classroom layouts, QR/barcode labeling, and critical stock threshold alerts. Originally built on PHP/MySQL and migrated to Node.js/MongoDB, the system enforces role-based access control across IT Manager, System Admin, Staff, and Intern tiers.",
      tr: "Haydarpaşa MTAL BT alanı için geliştirilen IT-RMS; kurumsal şube ve laboratuvar donanımlarının takibini, 2D kroki koordinatlarıyla cihaz konumlandırmasını, karekod/barkod etiketlemesini ve depo stok eşik uyarılarını yönetir. PHP/MySQL mirası üzerine inşa edildikten sonra Node.js/MongoDB mimarisine taşınan sistem; IT Yöneticisi, Sistem Yöneticisi, Personel ve Stajyer rolleriyle güvenli yetkilendirme sağlar.",
    },
    problem: {
      en: "Manual IT inventory tracking lacked multi-lab data partitioning, provided no 2D spatial hardware layout, lacked automated QR/barcode tagging, and failed to alert administrators when critical maintenance supplies fell below safety thresholds.",
      tr: "BT departmanındaki manuel envanter takibi; çoklu sınıf/laboratuvar ayrıştırmasından yoksundu, fiziki cihazların 2D yerleşim planını sunmuyordu, barkod/karekod etiketlemesi barındırmıyordu ve kritik stok tükenmelerinde uyarı mekanizması sağlamıyordu.",
    },
    solution: {
      en: "Centralized laboratory hardware, 2D spatial layouts, storage supplies, and QR code labeling into a unified administrative panel. Evolved from a PHP 8 codebase into a modern Node.js (Express.js), MongoDB (Mongoose), Passport, and QRCode architecture.",
      tr: "Laboratuvar donanımları, 2D kroki koordinatları, depo stokları ve karekod etiketleme süreçleri tek bir yönetim panelinde toplandı. PHP 8 mimarisinden Node.js (Express.js), MongoDB (Mongoose), Passport ve QRCode entegrasyonuna sahip modern bir mimariye dönüştürüldü.",
    },
    architectureText: {
      en: "The Node.js (Express.js) and MongoDB (Mongoose) architecture incorporates 2D lab spatial models, stock threshold warnings, Passport role-based authentication, and QR code generation, retaining its original PHP 8 and MySQL legacy heritage.",
      tr: "Node.js (Express.js) ve MongoDB (Mongoose) tabanlı mimari; 2D laboratuvar duvar/kapı koordinat modelleri, stok eşik uyarıları, Passport tabanlı rol yetkilendirmesi ve QRCode üretimi içerir. Proje geçmişi PHP 8 ve MySQL mirasını da barındırır.",
    },
    highlights: {
      en: [
        "Multi-branch hardware tracking with 2D spatial lab layout mapping.",
        "System migration from PHP 8 / MySQL legacy code to Node.js / Express.js / MongoDB (Mongoose).",
        "Automated QR code generation and critical inventory stock threshold alerts.",
        "Role-based access control (RBAC) across IT Manager, System Admin, Staff, and Intern tiers.",
      ],
      tr: [
        "Çoklu şube ve 2D laboratuvar kroki koordinatlarıyla donanım yerleşim takibi.",
        "PHP 8 / MySQL miras mimarisinden Node.js / Express.js / MongoDB (Mongoose) mimarisine dönüşüm.",
        "Karekod (QR Code) üretimi ve kritik depo stok eşik uyarı sistemleri.",
        "IT Yöneticisi, Sistem Yöneticisi, Personel ve Stajyer seviyelerinde rol tabanlı yetkilendirme (RBAC).",
      ],
    },
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "PHP", "MySQL", "QR Code", "RBAC"],
    githubUrl: "https://github.com/barissalihbabacan/IT-Department-Resource-Management-System",
  },
  chorus: {
    title: { en: "Chorus", tr: "Chorus" },
    category: { en: "Open Source · Discussion Platform", tr: "Açık Kaynak · Tartışma Platformu" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "Early Development", tr: "Erken Geliştirme" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2026–", tr: "2026–" },
    role: { en: "Founding Engineer", tr: "Kurucu Mühendis" },
    cardGradient: "linear-gradient(135deg, #18181b 0%, #121214 50%, #09090b 100%)",
    description: {
      en: "Chorus is an open-source, anonymous discussion engine built with a Go backend and a React frontend. Instead of persistent accounts, profiles, and ranking algorithms, it assigns thread-scoped temporary identities and persists every thread and message as cryptographically verifiable Git commits.",
      tr: "Chorus; Go arka ucu ve React önyüzü ile geliştirilen açık kaynaklı, anonim bir tartışma motorudur. Kalıcı hesaplar, profiller ve sıralama algoritmaları yerine, her konuya özgü geçici kimlikler atar ve her konu/mesajı kriptografik olarak doğrulanabilir Git commit'leri olarak saklar.",
    },
    executiveSummary: {
      en: "Chorus replaces conventional social mechanics (accounts, likes, followers, algorithmic feeds) with chronological, thread-scoped anonymous discourse. Every thread creation and message append is written as a native Git commit, substituting traditional opaque databases with an audit-proof, cryptographically verifiable object history.",
      tr: "Chorus, geleneksel sosyal medya mekaniklerini (hesaplar, beğeniler, takipçiler, algoritmik akışlar) kronolojik ve konuya özgü anonim tartışmayla değiştirir. Her konu oluşturma ve mesaj ekleme işlemi doğrudan Git commit'i olarak yazılır; böylece veri modeli geleneksel opak veritabanları yerine denetlenebilir ve doğrulanabilir bir nesne geçmişine dönüştürülür.",
    },
    problem: {
      en: "Conventional discussion platforms shape user behavior through persistent user identities, social graphs, upvote mechanics, and algorithmic feed loops. This prioritizes profile engagement and echo chambers over authentic topic-centric content.",
      tr: "Geleneksel tartışma platformları kalıcı kullanıcı kimlikleri, sosyal grafikler, oy sistemleri ve algoritmik sıralama üzerinden kullanıcı davranışını şekillendirir. Bu durum, içerik kalitesi yerine profil etkileşimini ve algoritmik yankı odalarını öne çıkarır.",
    },
    solution: {
      en: "Chorus decouples identity from persistent user profiles down to individual thread scopes. Thread and message histories are backed by native Git commit objects, turning conversation state into a database-independent, cryptographically verifiable history.",
      tr: "Chorus, kullanıcı kimliğini platform genelinde kalıcı hale getirmek yerine konu kapsamına indirger. Konu ve mesaj geçmişi Git commit modeliyle temsil edilerek tartışma geçmişi veritabanı bağımlılığından bağımsız, doğrulanabilir bir geçmişe dönüştürülür.",
    },
    architectureText: {
      en: "The high-performance Go (1.22+) backend service utilizes native local Git repository operations and file-system JSON structures for persistence. The frontend is a React 19, TypeScript, and Vite SPA communicating with the Go engine via TanStack Query.",
      tr: "Go (1.22+) ile yazılan yüksek performanslı arka uç servisi, veri kalıcılığı için doğrudan yerel Git deposu komutlarını ve dosya sistemini kullanır. Önyüz tarafı React 19, TypeScript ve Vite üzerine kurulu bir SPA olup, API iletişimini TanStack Query üzerinden yürütür.",
    },
    highlights: {
      en: [
        "Zero persistent accounts — temporary identities scoped exclusively to individual threads.",
        "Persistence engine leveraging Git's content-addressable and cryptographically verifiable commit history model.",
        "No likes, upvotes, follower counts, or feed ranking algorithms — pure chronological discourse.",
        "Open-source architecture built with Go 1.22 and React 19 / TypeScript.",
      ],
      tr: [
        "Kalıcı hesap veya kayıt yok — kimlikler her konuya özgü geçici takma adlardır.",
        "Git'in içerik adresli ve kriptografik olarak doğrulanabilir geçmiş modelini kullanan kalıcılık motoru.",
        "Beğeni, upvote, takipçi veya sıralama algoritması yok — saf kronolojik tartışma akışı.",
        "Go (1.22+) ve React 19 / TypeScript ile geliştirilmiş açık kaynaklı mimari.",
      ],
    },
    tech: ["Go", "React", "Git", "TypeScript", "Vite"],
    githubUrl: "https://github.com/barissalihbabacan/chorus",
    liveUrl: "https://joinchorus.app",
  },
};
