export interface LocalizedText {
  en: string;
  tr: string;
}

export interface ProjectData {
  title: LocalizedText;
  /** Teknik olmayan okur icin tek cumle: proje ne ise yariyor. Kartlarda ve detay sayfasinin basinda. */
  summary: LocalizedText;
  category: LocalizedText;
  categoryColor: string;
  status: LocalizedText;
  statusColor: string;
  year: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  executiveSummary?: LocalizedText;
  problem?: LocalizedText;
  solution?: LocalizedText;
  architectureText?: LocalizedText;
  tradeoffs?: LocalizedText;
  mermaidDiagram?: string;
  highlights: { en: string[]; tr: string[] };
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  cover?: ProjectCover;
  screenshots?: ProjectScreenshot[];
  /** Gercek kullaniciya ulasan urun; ana sayfadaki "yayinlanan urun" sayisi bundan hesaplanir. */
  shipped?: boolean;
}

export interface ProjectScreenshot {
  src: string;
  fullSrc?: string;
  alt: LocalizedText;
  caption?: LocalizedText;
}

/** 1200x627 kapak: `webp`/`webp2x` sayfada (srcset); `og` paylasim onizlemesi icin
 * src/public/og/ altindaki ~45 KB JPEG (2400px PNG, WhatsApp gibi istemcilerin sinirini asiyordu). */
export interface ProjectCover {
  webp: string;
  webp2x: string;
  /** Site koku goreli yol, orn. "/og/osmos.jpg". */
  og: string;
}

// Kapaklar Firebase Storage'da (babacan-sites bucket, linkedin/ klasoru).
const STORAGE_BASE =
  "https://firebasestorage.googleapis.com/v0/b/babacan-sites.firebasestorage.app/o/linkedin%2F";

const COVERS = {
  osmos: {
    webp: `${STORAGE_BASE}osmos-featured-1200.webp?alt=media&token=35128fab-9954-4196-8e55-d7535ebe5912`,
    webp2x: `${STORAGE_BASE}osmos-featured-2400.webp?alt=media&token=97e7d8bc-52c0-4e49-ab83-ffd2e955a66b`,
    og: "/og/osmos.jpg",
  },
  mythos: {
    webp: `${STORAGE_BASE}mythos-featured-1200.webp?alt=media&token=9f38de20-3872-48a1-afc1-0026c0180d25`,
    webp2x: `${STORAGE_BASE}mythos-featured-2400.webp?alt=media&token=979d1694-eeca-49a4-85a5-8264348303cc`,
    og: "/og/mythos.jpg",
  },
  chorus: {
    webp: `${STORAGE_BASE}chorus-featured-1200.webp?alt=media&token=fdf0aa39-2a30-4626-b9de-47e81da20e6d`,
    webp2x: `${STORAGE_BASE}chorus-featured-2400.webp?alt=media&token=f0d9ea2a-2278-4df7-a67b-5cff91d9b80a`,
    og: "/og/chorus.jpg",
  },
  sortify: {
    webp: `${STORAGE_BASE}sortify-featured-1200.webp?alt=media&token=7ae596d0-590f-4997-889a-c63730309981`,
    webp2x: `${STORAGE_BASE}sortify-featured-2400.webp?alt=media&token=fb093bc2-fcd6-4282-9a72-e8973020a1aa`,
    og: "/og/sortify.jpg",
  },
  plusTv: {
    webp: `${STORAGE_BASE}plustv-featured-1200.webp?alt=media&token=c6c8280f-35db-4851-ba62-edc0666f01a0`,
    webp2x: `${STORAGE_BASE}plustv-featured-2400.webp?alt=media&token=126acffb-7c72-4d31-ac1f-cc85d2da527c`,
    og: "/og/plus-tv.jpg",
  },
  qpass: {
    webp: `${STORAGE_BASE}qpass-featured-1200.webp?alt=media&token=a01df62c-97df-466f-bcc6-f0ea321ca321`,
    webp2x: `${STORAGE_BASE}qpass-featured-2400.webp?alt=media&token=5df67c65-4fb9-4b17-94a9-9db83c313b7d`,
    og: "/og/qpass.jpg",
  },
  itrms: {
    webp: `${STORAGE_BASE}itrms-featured-1200.webp?alt=media&token=98e7fbd6-97b4-462d-b5d9-6ee35eb37895`,
    webp2x: `${STORAGE_BASE}itrms-featured-2400.webp?alt=media&token=7abfcaad-63e8-46cd-8c9d-0e273e84074e`,
    og: "/og/itrms.jpg",
  },
  rulesort: {
    webp: "/covers/rulesort-1200.webp",
    webp2x: "/covers/rulesort-2400.webp",
    og: "/og/rulesort.jpg",
  },
  blocknest: {
    webp: "/covers/blocknest-1200.webp",
    webp2x: "/covers/blocknest-2400.webp",
    og: "/og/blocknest.jpg",
  },
} satisfies Record<string, ProjectCover>;

/** liveUrl dugmesinin metni: magaza linkleri magaza adiyla gosterilir. */
export function liveLinkLabel(url: string, lang: "en" | "tr"): string {
  const host = new URL(url).hostname;
  if (host === "play.google.com")
    return lang === "tr" ? "Google Play'de Gör" : "View on Google Play";
  if (host === "apps.apple.com")
    return lang === "tr" ? "App Store'da Gör" : "View on the App Store";
  return lang === "tr" ? "Canlı Siteyi Gör" : "Visit Live";
}

export type ProjectKey =
  | "mythos"
  | "osmos"
  | "chorus"
  | "gayrimenkuldunyasi"
  | "sortify"
  | "plus-tv"
  | "playsortify"
  | "rulesort"
  | "blocknest"
  | "sporsayfasi"
  | "worldclock"
  | "garageist"
  | "qpass"
  | "itrms";

export const PROJECT_DATA: Record<ProjectKey, ProjectData> = {
  osmos: {
    title: { en: "Osmos", tr: "Osmos" },
    summary: {
      en: "Version control for your own files that runs entirely on your machine; syncing between devices comes next.",
      tr: "Dosyalarınızın sürümlerini tamamen kendi bilgisayarınızda tutan bir sürüm kontrol aracı; cihazlar arası senkronizasyon sırada.",
    },
    category: { en: "Local-First · Version Control", tr: "Yerel-Öncelikli · Sürüm Kontrolü" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "Alpha", tr: "Alpha" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2026–", tr: "2026–" },
    role: { en: "Founder & Lead Developer", tr: "Kurucu & Baş Geliştirici" },
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
    cover: COVERS.osmos,
  },
  mythos: {
    title: { en: "Mythos", tr: "Mythos" },
    summary: {
      en: "A writing app for novelists that keeps characters, places and chapters organized in plain files they own.",
      tr: "Romancıların karakterleri, mekânları ve bölümleri kendilerine ait düz dosyalarda düzenlediği bir yazım uygulaması.",
    },
    category: { en: "App · Tooling", tr: "Uygulama · Araçlar" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "In Development", tr: "Geliştirme Aşamasında" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2026", tr: "2026" },
    role: { en: "Creator & Developer", tr: "Kurucu & Geliştirici" },
    description: {
      en: "Mythos is a local-first writer's IDE for novelists building multi-book, relational fiction worlds. The engine (mythoside-core) is a six-crate Rust workspace that models manuscripts as plain Markdown + YAML files on disk and exposes them over JSON-RPC on stdio; the desktop client (mythoside-ts) is a Tauri 2 + React 19 + TypeScript app that runs the engine as a sidecar process.",
      tr: "Mythos; çok kitaplı ve ilişkisel kurgu dünyaları geliştiren romancılar için yerel-öncelikli bir yazar IDE'sidir. Çekirdek motor (mythoside-core), taslakları düz Markdown + YAML dosyaları olarak diskte modelleyen ve stdio üzerinden JSON-RPC protokolüyle dışa açan altı crate'lik bir Rust workspace'idir; masaüstü istemcisi (mythoside-ts) ise motoru sidecar süreç olarak çalıştıran Tauri 2 + React 19 + TypeScript uygulamasıdır.",
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
      en: "mythoside-core is a six-crate Rust workspace (parser, narrative model, workspace, RPC and shared types) with no Tauri or UI dependencies, handling the manuscript data model, Markdown + YAML parsing, and filesystem watching. It is packaged as a sidecar binary in the desktop app. mythoside-ts is the Tauri 2 + React 19 + TypeScript shell that spawns this engine as a sidecar process and manages client-side communication.",
      tr: "mythoside-core, taslak veri modelini, Markdown + YAML ayrıştırmasını ve dosya izlemeyi yöneten; Tauri veya arayüz bağımlılığı bulunmayan altı crate'lik bir Rust workspace'idir (ayrıştırıcı, anlatı modeli, çalışma alanı, RPC ve ortak tipler). Masaüstü uygulamasında sidecar ikili dosyası olarak paketlenir. mythoside-ts ise bu motoru sidecar süreç olarak başlatan ve istemci tarafındaki iletişimi yöneten Tauri 2 + React 19 + TypeScript kabuğudur.",
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
    cover: COVERS.mythos,
  },
  qpass: {
    shipped: true,
    title: { en: "Q-PASS", tr: "Q-PASS" },
    summary: {
      en: "Card-based entry and meal tracking I built for my vocational high school; it served 120–150 people a day for three school years.",
      tr: "Mezun olduğum meslek lisesi için yaptığım kartlı geçiş ve yemek takip sistemi; üç eğitim yılı boyunca her gün 120–150 kişiye hizmet verdi.",
    },
    category: { en: "Hardware · IoT", tr: "Donanım · IoT" },
    categoryColor: "text-tertiary border-tertiary/20",
    status: { en: "Completed", tr: "Tamamlandı" },
    statusColor: "bg-tertiary/20 border border-tertiary/30 text-tertiary",
    year: { en: "3 School Years", tr: "3 Eğitim Yılı" },
    role: { en: "System Architect", tr: "Sistem Mimarı" },
    description: {
      en: "Q-PASS is a hardware-backed RFID access control and meal-tracking system that ran in production at Haydarpaşa MTAL for three school years, serving 120–150 people a day. Custom 3D-printed RFID reader units run C++ microcontroller firmware, bridging over RS-232/USB serial interfaces to a Python background service and a PHP/MySQL web management dashboard for access logging and meal quota tracking.",
      tr: "Q-PASS; Haydarpaşa Mesleki ve Teknik Anadolu Lisesi'nde (Haydarpaşa MTAL) üç eğitim yılı boyunca her gün 120–150 kişiye hizmet veren, donanım destekli bir RFID geçiş kontrol ve yemek takip sistemidir. Özel tasarım 3D baskı RFID okuyucu üniteleri C++ mikrodenetleyici aygıt yazılımı ile çalışır; RS-232/USB seri bağlantısı üzerinden bir Python servisine ve geçiş/yemek kotası kayıtlarını yöneten bir PHP/MySQL web paneline bağlanır.",
    },
    executiveSummary: {
      en: "For three school years at a public school, Q-PASS handled daily entry and cafeteria access for 120–150 people. Scanning RFID credentials triggers hardware interrupts on microcontrollers; structured serial frames are sent over dedicated serial bridges to a local Python daemon that validates authorization against the MySQL database.",
      tr: "Q-PASS, bir devlet okulunda üç eğitim yılı boyunca her gün 120–150 kişinin giriş ve yemekhane geçişlerini yönetti. RFID kartlarının taranması mikrodenetleyici üzerinde donanımsal kesme (interrupt) tetikler; oluşturulan yapılandırılmış seri paketler yerel Python servisi tarafından doğrulanarak MySQL veritabanına işlenir.",
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
        "Ran in production at a public school for three school years, serving 120–150 people a day.",
        "Heterogeneous system integration across C++ microcontrollers, Python daemons, and PHP/MySQL web dashboards.",
        "Custom structured serial communication protocol operating over RS-232/USB interfaces.",
        "Real-time student entrance logging, meal quota enforcement, and administrative reporting tools.",
      ],
      tr: [
        "Bir devlet okulunda üç eğitim yılı boyunca her gün 120–150 kişiye hizmet veren donanım-yazılım altyapısı.",
        "C++ mikrodenetleyiciler, Python servisleri ve PHP/MySQL web panelleri arasında heterojen sistem entegrasyonu.",
        "RS-232/USB arabirimleri üzerinden çalışan özel yapılandırılmış seri iletişim protokolü.",
        "Öğrenci geçişlerinin ve yemek kotalarının anlık dijital kaydı ve idari raporlama araçları.",
      ],
    },
    tech: ["C++ / Arduino", "Python", "PHP", "MySQL", "RFID", "Serial Protocol"],
    cover: COVERS.qpass,
  },
  gayrimenkuldunyasi: {
    title: { en: "Gayrimenkul Dünyası", tr: "Gayrimenkul Dünyası" },
    summary: {
      en: "Real estate news and listings gathered from many sources into one place.",
      tr: "Farklı kaynaklardaki gayrimenkul haberlerini ve ilanlarını tek yerde toplayan bir platform.",
    },
    category: { en: "Web · Full-Stack", tr: "Web · Full-Stack" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: {
      en: "Web Foundation & Firebase Infrastructure, Maintenance & Moderation",
      tr: "Web Proje Temeli & Firebase Altyapısı, Bakımı ve Moderasyonu",
    },
    description: {
      en: "Gayrimenkul Dünyası is a real estate data ingestion, normalization, and CRM platform. Built with Next.js App Router and TypeScript, it combines Playwright Stealth automated data collection pipelines with Google News XML/RSS parsers connected to Cloud Firestore. My responsibilities centered on establishing the web project foundation, building and securing the Firebase infrastructure, and handling ongoing maintenance, data moderation, and platform stability.",
      tr: "Gayrimenkul Dünyası; gayrimenkul verilerini toplamak, yapılandırmak ve CRM süreçlerine taşımak için geliştirilen bir veri toplama ve yönetim platformudur. Next.js App Router ve TypeScript ile geliştirilen altyapı, Playwright Stealth otomatik veri toplama hatlarını Google News XML/RSS ayrıştırıcıları ile birleştirerek Cloud Firestore veritabanına bağlar. Projede web proje temelinin oluşturulması, Firebase altyapı bağlantısı ve korunması, sistem moderasyonu ve veri akışı sürekliliği tarafımdan üstlenilmiştir.",
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
        "Web project scaffolding, architectural foundation, and system moderation.",
        "Application architecture built on Next.js App Router and React Server Components.",
        "Automated data ingestion pipeline using Playwright Stealth for browser automation.",
        "Structured parsing pipeline for Google News XML/RSS data feeds.",
        "Query-optimized Cloud Firestore schema designed for database cost efficiency and data security.",
      ],
      tr: [
        "Web proje temelinin oluşturulması, mimari kurulumu ve sistem moderasyonu.",
        "Next.js App Router ve React Server Components tabanlı uygulama mimarisi.",
        "Playwright Stealth destekli tarayıcı otomasyonu ile otomatik veri toplama altyapısı.",
        "Google News XML/RSS kaynakları için yapılandırılmış veri ayrıştırma hattı.",
        "Firestore okuma/yazma maliyetlerini gözeten, sorgu odaklı ve güvenli veri şeması.",
      ],
    },
    tech: ["Next.js", "Firebase", "Playwright Stealth", "Firestore", "TypeScript", "XML Parser"],
    liveUrl: "https://gayrimenkuldunyasi.com",
  },
  sortify: {
    shipped: true,
    title: { en: "Sortify", tr: "Sortify" },
    summary: {
      en: "Learning games for children aged 3–13, with tools for parents and teachers to follow their progress.",
      tr: "3–13 yaş arası çocuklar için öğrenme oyunları; ebeveynler ve öğretmenler ilerlemeyi takip edebiliyor.",
    },
    category: { en: "Mobile · iOS & Systems", tr: "Mobil · iOS & Sistemler" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: {
      en: "CTO · Lead Developer",
      tr: "CTO · Baş Geliştirici",
    },
    description: {
      en: "Sortify is a native SwiftUI iOS/iPadOS game-based learning app for children aged 3–13, with supervision tools for parents and teachers. Built with a modular Swift Package architecture, it pairs a native iOS client with Firebase backend services, server-side StoreKit purchase verification, and local network device pairing.",
      tr: "Sortify; 3–13 yaş arası çocuklar için oyun tabanlı bir öğrenme uygulamasıdır ve ebeveynlerle öğretmenlere takip araçları sunar. SwiftUI ile geliştirilmiş native bir iOS/iPadOS uygulamasıdır. Modüler Swift Package mimarisi üzerine kurulu altyapı; Firebase servisleri, sunucu taraflı StoreKit satın alma doğrulaması ve yerel ağ cihaz eşleştirme protokolü ile desteklenir.",
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
    liveUrl: "https://apps.apple.com/app/id6759790866",
    cover: COVERS.sortify,
    screenshots: [
      {
        src: "/screenshots/sortify/iphone_1.webp",
        fullSrc: "/screenshots/sortify/iphone_1.png",
        alt: {
          en: "Sortify - Everything kids love, in one app",
          tr: "Sortify - Çocukların sevdiği her şey tek bir uygulamada",
        },
        caption: {
          en: "Everything kids love, in one app.",
          tr: "Çocukların sevdiği her şey tek bir uygulamada.",
        },
      },
      {
        src: "/screenshots/sortify/iphone_2.webp",
        fullSrc: "/screenshots/sortify/iphone_2.png",
        alt: {
          en: "Sortify - A universe of learning",
          tr: "Sortify - Uçsuz bucaksız bir öğrenme evreni",
        },
        caption: {
          en: "A universe of learning",
          tr: "Uçsuz bucaksız bir öğrenme evreni",
        },
      },
      {
        src: "/screenshots/sortify/iphone_3.webp",
        fullSrc: "/screenshots/sortify/iphone_3.png",
        alt: {
          en: "Sortify - One home for the whole family",
          tr: "Sortify - Tüm aile için tek bir çatı",
        },
        caption: {
          en: "One home for the whole family.",
          tr: "Tüm aile için tek bir çatı.",
        },
      },
    ],
  },
  "plus-tv": {
    shipped: true,
    title: { en: "+TV", tr: "+TV" },
    summary: {
      en: "Turns an Android phone into a remote, cast and mirroring tool for Samsung, LG and Philips TVs; 10K+ downloads.",
      tr: "Android telefonu Samsung, LG ve Philips TV'ler için kumanda, yayın ve ekran yansıtma aracına çeviriyor; 10 binden fazla indirme.",
    },
    category: { en: "Mobile · Android & Protocols", tr: "Mobil · Android & Protokoller" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Launched", tr: "Yayında" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: {
      en: "Co-developer · Philips integration",
      tr: "Ortak geliştirici · Philips entegrasyonu",
    },
    description: {
      en: "+TV is an Android remote, cast and screen-mirroring app for smart TVs, with 10K+ downloads on Google Play. I built it with a fellow developer at Garage.ist. Samsung and LG came with SDKs; Philips had none, so I reverse-engineered its undocumented JointSpace API and wrote that integration myself.",
      tr: "+TV, akıllı TV'ler için kumanda, yansıtma ve ekran paylaşımı sunan, Google Play'de 10 binden fazla indirilen bir Android uygulamasıdır. Garage.ist'te bir geliştirici arkadaşımla birlikte geliştirdik. Samsung ve LG için SDK vardı; Philips için yoktu. Bu yüzden Philips'in belgelenmemiş JointSpace API'sini tersine mühendislikle çözdüm ve entegrasyonu tek başıma yazdım.",
    },
    executiveSummary: {
      en: "Getting a Philips TV to respond took two to five days. Mapping every endpoint took about three weeks. What documentation existed sat on old, half-abandoned pages, so most of the API came out of Philips' own remote app: its logs, read with CatLog, and the traffic it sent to the TV's IP address, captured with Wireshark. Everything was then confirmed by trial and error against a real set.",
      tr: "Bir Philips TV'yi komutlara cevap verir hâle getirmek iki ila beş gün sürdü; bütün endpoint'leri çıkarmak ise yaklaşık üç hafta. Var olan dokümantasyon eski, yarı terk edilmiş sayfalardaydı. Bu yüzden API'nin büyük kısmını Philips'in kendi kumanda uygulamasından çıkardım: loglarını CatLog ile okudum, TV'nin IP adresine giden trafiğini Wireshark ile yakaladım. Bulduğum her şeyi gerçek bir cihaz üzerinde deneme yanılmayla doğruladım.",
    },
    problem: {
      en: "Samsung (Tizen SDK) and LG (ConnectSDK) ship libraries for controlling their TVs. Philips does not. Its TitanOS sets expose JointSpace, an HTTPS API with no public reference that pairs with a PIN and presents a self-signed certificate. Until that was solved, +TV could not control a whole brand of TVs.",
      tr: "Samsung (Tizen SDK) ve LG (ConnectSDK), TV'lerini kontrol etmek için kütüphane sunuyor. Philips sunmuyor. TitanOS çalıştıran modelleri, herkese açık bir referansı olmayan, PIN ile eşleşen ve kendinden imzalı sertifika sunan JointSpace adlı bir HTTPS API'si açıyor. Bu çözülene kadar +TV koca bir markayı kontrol edemiyordu.",
    },
    solution: {
      en: "Pairing is a challenge–response flow. An empty request comes back as 401 with a nonce; the app then signs the request with HTTP Digest, using that nonce and the PIN shown on the TV screen. I modelled pairing as an explicit state machine so every failure lands in a known state, and handled the TV's self-signed certificate in the TLS layer.",
      tr: "Eşleştirme bir challenge–response akışı. Boş bir istek, bir nonce ile birlikte 401 olarak dönüyor; uygulama ardından isteği bu nonce ve TV ekranında görünen PIN ile HTTP Digest olarak imzalıyor. Eşleştirmeyi açık bir durum makinesi olarak modelledim, böylece her hata bilinen bir duruma düşüyor. TV'nin kendinden imzalı sertifikasını da TLS katmanında ele aldım.",
    },
    architectureText: {
      en: "+TV is a native Android app. Each TV brand sits behind its own integration: the Tizen SDK for Samsung, ConnectSDK for LG, and a hand-written JointSpace client for Philips that owns pairing, digest authentication and TLS. Control traffic stays on the local network.",
      tr: "+TV native bir Android uygulaması. Her TV markası kendi entegrasyonunun arkasında duruyor: Samsung için Tizen SDK, LG için ConnectSDK, Philips için ise eşleştirmeyi, digest kimlik doğrulamayı ve TLS'i yöneten, elle yazılmış bir JointSpace istemcisi. Kontrol trafiği yerel ağda kalıyor.",
    },
    tradeoffs: {
      en: "The hardest parts were not the endpoints but the plumbing around them. The nonce has a limited lifetime, so the client has to notice when it has expired and fetch a fresh one before signing again. And the TV presents a self-signed certificate, so the standard TLS path rejects the connection until the app handles it explicitly.",
      tr: "En zor kısımlar endpoint'lerin kendisi değil, etraflarındaki tesisattı. Nonce'un ömrü sınırlı; istemcinin süresinin dolduğunu fark edip yeniden imzalamadan önce yenisini alması gerekiyor. TV de kendinden imzalı bir sertifika sunuyor; uygulama bunu açıkça ele alana kadar standart TLS yolu bağlantıyı reddediyor.",
    },
    highlights: {
      en: [
        "10K+ downloads on Google Play.",
        "Samsung via the Tizen SDK, LG via ConnectSDK.",
        "Philips JointSpace API reverse-engineered with CatLog and Wireshark: working in 2–5 days, fully mapped in about 3 weeks.",
        "PIN pairing as a state machine over HTTP Digest (401 challenge–response with a nonce).",
        "Nonce expiry and the TV's self-signed certificate handled in the client.",
      ],
      tr: [
        "Google Play'de 10 binden fazla indirme.",
        "Samsung Tizen SDK ile, LG ConnectSDK ile.",
        "Philips JointSpace API'si CatLog ve Wireshark ile çözüldü: 2–5 günde çalışır hâle geldi, yaklaşık 3 haftada tamamen haritalandı.",
        "HTTP Digest üzerinde durum makinesi olarak PIN eşleştirme (nonce'lu 401 challenge–response).",
        "Nonce'un süresinin dolması ve TV'nin kendinden imzalı sertifikası istemcide ele alındı.",
      ],
    },
    tech: ["Kotlin", "Java", "Android", "Wireshark", "HTTP Digest", "ConnectSDK"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.plus.plustvv001",
    cover: COVERS.plusTv,
    screenshots: [
      {
        src: "/screenshots/plustv/screen_1.webp",
        fullSrc: "/screenshots/plustv/screen_1.png",
        alt: {
          en: "+TV - Connect TV and app integration",
          tr: "+TV - TV bağlantısı ve uygulama entegrasyonu",
        },
        caption: {
          en: "Connect TV and app integration.",
          tr: "TV ve uygulama entegrasyonu.",
        },
      },
      {
        src: "/screenshots/plustv/screen_2.webp",
        fullSrc: "/screenshots/plustv/screen_2.png",
        alt: {
          en: "+TV - The hub of your TV experience",
          tr: "+TV - TV deneyiminizin merkezi",
        },
        caption: {
          en: "The hub of your TV experience",
          tr: "TV deneyiminizin merkezi",
        },
      },
      {
        src: "/screenshots/plustv/screen_3.webp",
        fullSrc: "/screenshots/plustv/screen_3.png",
        alt: {
          en: "+TV - Customize your app experience",
          tr: "+TV - Uygulama deneyiminizi özelleştirin",
        },
        caption: {
          en: "Customize your app experience.",
          tr: "Uygulama deneyiminizi özelleştirin.",
        },
      },
      {
        src: "/screenshots/plustv/screen_4.webp",
        fullSrc: "/screenshots/plustv/screen_4.png",
        alt: {
          en: "+TV - Touchpad and intuitive navigation",
          tr: "+TV - Dokunmatik yönlendirme alanı ve kontroller",
        },
        caption: {
          en: "Touchpad & intuitive navigation",
          tr: "Dokunmatik touchpad ve sezgisel kontrol",
        },
      },
      {
        src: "/screenshots/plustv/screen_5.webp",
        fullSrc: "/screenshots/plustv/screen_5.png",
        alt: {
          en: "+TV - Simple and secure cross-platform file transfer",
          tr: "+TV - Güvenli ve basit çapraz platform dosya aktarımı",
        },
        caption: {
          en: "Simple and Secure Cross-Platform File Transfer",
          tr: "Basit ve güvenli platformlar arası dosya aktarımı",
        },
      },
      {
        src: "/screenshots/plustv/screen_6.webp",
        fullSrc: "/screenshots/plustv/screen_6.png",
        alt: {
          en: "+TV - Discover and manage your favorite apps and channels",
          tr: "+TV - Favori uygulama ve kanalları keşfedin ve yönetin",
        },
        caption: {
          en: "Discover and manage your favorite apps and channels.",
          tr: "Favori uygulama ve kanallarınızı keşfedin ve yönetin.",
        },
      },
    ],
  },
  playsortify: {
    title: { en: "Sortify Web", tr: "Sortify Web" },
    summary: {
      en: "Sortify's games in the browser, for classrooms and devices without the app.",
      tr: "Uygulamanın olmadığı sınıflar ve cihazlar için Sortify oyunlarının tarayıcı sürümü.",
    },
    category: { en: "Web · Front-End & Canvas", tr: "Web · Önyüz & Canvas" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: {
      en: "Web Foundation & Firebase Infrastructure, Maintenance & Moderation",
      tr: "Web Proje Temeli & Firebase Altyapısı, Bakımı ve Moderasyonu",
    },
    description: {
      en: "Sortify Web is the browser client of the Sortify educational platform. Built with React 19, TypeScript, and Vite, the application brings native iOS game logic into web browsers using an HTML5 Canvas rendering architecture and responsive controls. I established the web project foundation, built and secured the Firebase connection infrastructure, and maintained platform stability, security, and content moderation.",
      tr: "Sortify Web; Sortify eğitim platformunun web tarayıcıları için geliştirilmiş istemcisidir. React 19, TypeScript ve Vite ile geliştirilen uygulama, native iOS oyun mantığını HTML5 Canvas tabanlı bir çizim altyapısı ve duyarlı kontrollerle web ortamına taşır. Projede web proje temelinin kurulması, Firebase bağlantı altyapısının inşası, sistemin korunması, sürekliliği ve moderasyonu tarafımdan yürütülmüştür.",
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
        "Web project foundation, architectural setup, and continuous moderation/maintenance.",
        "Native Swift game logic ported directly to TypeScript.",
        "Canvas-based game loop leveraging requestAnimationFrame and mutable ref state.",
        "Decoupled React UI layer from the real-time canvas game rendering loop.",
        "Responsive game interface supporting both touch and mouse control inputs.",
        "Firebase Auth and Cloud Firestore infrastructure integration and security.",
      ],
      tr: [
        "Web proje temeli ve mimari kurulumunun yapılması, sürekli moderasyon ve sistem bakımı.",
        "Native iOS oyun mantığının TypeScript'e port edilmesi.",
        "requestAnimationFrame ve mutable ref state kullanan Canvas tabanlı oyun döngüsü.",
        "React UI katmanı ile gerçek zamanlı oyun render katmanının ayrıştırılması.",
        "Dokunmatik ve fare girdilerini destekleyen responsive oyun arayüzü.",
        "Firebase Auth ve Cloud Firestore altyapı entegrasyonu ve güvenliği.",
      ],
    },
    tech: ["React 19", "TypeScript", "Vite", "HTML5 Canvas", "Firebase", "Tailwind CSS"],
    liveUrl: "https://play.sortify.com",
  },
  // Magaza bilgilerinden (App Store, Ekim 2026); ayni yayinci hesabinda Sortify ile birlikte.
  rulesort: {
    shipped: true,
    title: { en: "Rule Sort", tr: "Rule Sort" },
    summary: {
      en: "A fast reflex game: sort falling objects by a rule that keeps changing.",
      tr: "Hızlı bir refleks oyunu: düşen nesneleri sürekli değişen bir kurala göre ayırın.",
    },
    category: { en: "Mobile · iOS Game", tr: "Mobil · iOS Oyunu" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Launched", tr: "Yayında" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: {
      en: "iOS Foundation, Firebase Infrastructure & AdMob Integration",
      tr: "iOS Proje Temeli, Firebase Altyapısı & AdMob Entegrasyonu",
    },
    description: {
      en: "Rule Sort is an endless reflex game for iPhone and iPad, written in Swift and SwiftUI. Objects fall one by one and a rule card decides which side each one goes: warm or cool, round or angular, small or big. I established the iOS project foundation, built and maintained the Firebase backend infrastructure, and integrated Google AdMob with complete Ad Unit ID configuration and rewarded-ad monetization flows.",
      tr: "Rule Sort, iPhone ve iPad için Swift ve SwiftUI ile yazılmış sonsuz bir refleks oyunudur. Nesneler tek tek düşer ve bir kural kartı her birinin hangi tarafa gideceğini belirler: sıcak ya da soğuk, yuvarlak ya da köşeli, küçük ya da büyük. Projede iOS proje temelinin oluşturulması, Firebase altyapı bağlantısı ve korunması, Google AdMob kurulumu, reklam ID'lerinin ayarlanması ve gelir modeli entegrasyonu tarafımdan üstlenilmiştir.",
    },
    executiveSummary: {
      en: "Each run is a swipe-left, swipe-right sort against the current rule. A wrong swipe costs a heart; storms double the points in fast bursts, and mines must be left to fall. Easy, Medium and Hard levels speed up the falls and add trickier rules, while Legendary is a memory mode where you sort by what you remember seeing. Players unlock new rules, complete missions and protect a daily streak. Everyone gets the same Daily Challenge, ranked on a global Game Center leaderboard, and a weekly Weekend Sprint adds new mutations to the rules.",
      tr: "Her oyun, o anki kurala göre sola ya da sağa kaydırarak yapılan bir sıralamadır. Yanlış kaydırma bir can götürür; fırtınalar kısa ve hızlı dalgalarla puanı ikiye katlar, mayınlar ise düşmeye bırakılmalıdır. Kolay, Orta ve Zor seviyeleri düşüşü hızlandırıp kuralları zorlaştırır; Efsane ise görüleni hatırlayarak sıralanan bir hafıza modudur. Oyuncular yeni kurallar açar, görevleri tamamlar ve günlük serilerini korur. Herkes aynı Günlük Meydan Okuma'yı oynar ve Game Center'daki küresel sıralamada yarışır; haftalık Weekend Sprint ise kurallara yeni varyasyonlar ekler.",
    },
    highlights: {
      en: [
        "iOS project scaffolding and architectural foundation.",
        "Firebase infrastructure setup, security, and ongoing maintenance.",
        "Google AdMob SDK integration, ad unit ID configuration, and rewarded-ad flows.",
        "Endless reflex sorting where the active rule, and sometimes the controls, flip mid-run.",
        "Easy, Medium and Hard levels plus Legendary, a memory-based mode.",
        "Shared Daily Challenge with a global Game Center leaderboard, and a rotating Weekend Sprint.",
      ],
      tr: [
        "iOS proje temelinin oluşturulması ve mimari altyapının kurulması.",
        "Firebase altyapı bağlantısı, güvenliği ve sistemin korunması.",
        "Google AdMob kurulumu, reklam birimi kimliklerinin (Ad Unit ID) ayarlanması ve ödüllü reklam entegrasyonu.",
        "Etkin kuralın, bazen de kontrollerin oyun ortasında değiştiği sonsuz refleks sıralaması.",
        "Kolay, Orta ve Zor seviyeleri ile hafızaya dayalı Efsane modu.",
        "Herkese aynı Günlük Meydan Okuma, Game Center'da küresel sıralama ve dönüşümlü Weekend Sprint.",
      ],
    },
    tech: [
      "Swift",
      "SwiftUI",
      "iOS",
      "Firebase",
      "AdMob",
      "Game Center",
      "In-App Purchase",
      "Rewarded Ads",
    ],
    liveUrl: "https://apps.apple.com/app/id6807764876",
    cover: COVERS.rulesort,
    screenshots: [
      {
        src: "/screenshots/rulesort/iphone_1.webp",
        fullSrc: "/screenshots/rulesort/iphone_1.png",
        alt: {
          en: "Rule Sort - Storms double points. Mines: let them fall.",
          tr: "Rule Sort - Fırtınalarda çifte puan. Mayınları düşmeye bırakın.",
        },
        caption: {
          en: "Storms double points. Mines: let them fall.",
          tr: "Fırtınalarda çifte puan. Mayınları düşmeye bırakın.",
        },
      },
      {
        src: "/screenshots/rulesort/iphone_2.webp",
        fullSrc: "/screenshots/rulesort/iphone_2.png",
        alt: {
          en: "Rule Sort - Read the rule. Swipe the object.",
          tr: "Rule Sort - Kuralı okuyun. Nesneyi kaydırın.",
        },
        caption: {
          en: "Read the rule. Swipe the object.",
          tr: "Kuralı okuyun. Nesneyi kaydırın.",
        },
      },
      {
        src: "/screenshots/rulesort/iphone_3.webp",
        fullSrc: "/screenshots/rulesort/iphone_3.png",
        alt: {
          en: "Rule Sort - Build streaks. Multiply your score.",
          tr: "Rule Sort - Seri yakalayın. Puanınızı katlayın.",
        },
        caption: {
          en: "Build streaks. Multiply your score.",
          tr: "Seri yakalayın. Puanınızı katlayın.",
        },
      },
      {
        src: "/screenshots/rulesort/iphone_4.webp",
        fullSrc: "/screenshots/rulesort/iphone_4.png",
        alt: {
          en: "Rule Sort - A new rule every few seconds",
          tr: "Rule Sort - Her birkaç saniyede bir yeni kural",
        },
        caption: {
          en: "A new rule every few seconds",
          tr: "Her birkaç saniyede bir yeni kural",
        },
      },
      {
        src: "/screenshots/rulesort/iphone_5.webp",
        fullSrc: "/screenshots/rulesort/iphone_5.png",
        alt: {
          en: "Rule Sort - Beat your best. Train your reflexes.",
          tr: "Rule Sort - En iyi skorunuzu geçin. Reflekslerinizi geliştirin.",
        },
        caption: {
          en: "Beat your best. Train your reflexes.",
          tr: "En iyi skorunuzu geçin. Reflekslerinizi geliştirin.",
        },
      },
      {
        src: "/screenshots/rulesort/iphone_6.webp",
        fullSrc: "/screenshots/rulesort/iphone_6.png",
        alt: {
          en: "Rule Sort - Daily runs, missions, weekend sprints",
          tr: "Rule Sort - Günlük yarışlar, görevler ve hafta sonu sprintleri",
        },
        caption: {
          en: "Daily runs, missions, weekend sprints",
          tr: "Günlük yarışlar, görevler, hafta sonu sprintleri",
        },
      },
      {
        src: "/screenshots/rulesort/iphone_7.webp",
        fullSrc: "/screenshots/rulesort/iphone_7.png",
        alt: {
          en: "Rule Sort - Three levels. Plus a memory mode.",
          tr: "Rule Sort - Üç farklı zorluk seviyesi ve hafıza modu.",
        },
        caption: {
          en: "Three levels. Plus a memory mode.",
          tr: "Üç farklı seviye. Artı bir hafıza modu.",
        },
      },
    ],
  },
  blocknest: {
    shipped: true,
    title: { en: "Block Nest", tr: "Block Nest" },
    summary: {
      en: "A block puzzle with a twist: tilt the board into a diamond or spin it with a gravity wheel.",
      tr: "Farklı bir blok bulmacası: tahtayı karo biçimine döndürün ya da yerçekimi çarkıyla karıştırın.",
    },
    category: { en: "Mobile · iOS Game", tr: "Mobil · iOS Oyunu" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Launched", tr: "Yayında" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "iOS Developer", tr: "iOS Geliştirici" },
    description: {
      en: "Block Nest is a native block-fitting puzzle game for iPhone and iPad, written in Swift and SwiftUI. Played on an 8×8 grid, it introduces three unique gameplay twists: Karo Mode tilts the board 45° into a diamond, the Gravity Wheel reshuffles the board dynamically, and custom diagonal pieces challenge spatial reasoning.",
      tr: "Block Nest, iPhone ve iPad için Swift ve SwiftUI ile geliştirilen native bir blok yerleştirme bulmaca oyunudur. 8×8'lik ızgara üzerinde oynanan oyun, klasik formüle üç özgün mekanik getirir: Tahtayı 45° döndüren Karo Modu, parçaları yeni bir yöne savuran Yerçekimi Çarkı ve alışılagelmiş ızgara düzenini bozan özel çapraz bloklar.",
    },
    executiveSummary: {
      en: "Block Nest operates completely offline without network requirements. It features custom grid algorithms, a smooth touch interaction engine, and a Casual Mode without time limits. The game integrates Game Center leaderboards and achievements, rewarded-ad boosts, and full localization into 13 languages including Turkish, Arabic, Japanese, and Chinese.",
      tr: "Block Nest, uçak modu dahil tamamen çevrimdışı çalışabilen bağımsız bir mimariye sahiptir. Özel ızgara algoritmaları, dokunmatik etkileşim motoru ve zaman kısıtlamasız Rahat Mod sıfırdan tasarlandı. Oyun; Game Center küresel sıralamaları, başarımlar, ödüllü reklam destekleri ve Türkçe, Arapça, Japonca ve Çince dahil 13 dile tam yerelleştirme içerir.",
    },
    highlights: {
      en: [
        "Native iOS puzzle game designed and built with Swift and SwiftUI.",
        "8×8 block-fitting puzzle with Karo Mode (a 45° diamond board), a Gravity Wheel and diagonal pieces.",
        "Fully offline play, plus a Casual Mode without timers or offers.",
        "Game Center leaderboards, achievements and friend challenges.",
        "Complete internationalization localized into 13 languages.",
      ],
      tr: [
        "Swift ve SwiftUI ile uçtan uca tasarlanan ve geliştirilen native iOS oyunu.",
        "Karo Modu (45° döndürülmüş tahta), Yerçekimi Çarkı ve çapraz parçalarla 8×8 blok yerleştirme bulmacası.",
        "Tamamen çevrimdışı oyun ve süre ya da teklif içermeyen Rahat Mod.",
        "Game Center sıralamaları, başarımlar ve arkadaşla meydan okuma.",
        "13 dile eksiksiz yerelleştirme altyapısı.",
      ],
    },
    tech: ["Swift", "SwiftUI", "iOS", "Game Center", "In-App Purchase", "Localization"],
    liveUrl: "https://apps.apple.com/app/id6808679766",
    cover: COVERS.blocknest,
    screenshots: [
      {
        src: "/screenshots/blocknest/iphone_1.webp",
        fullSrc: "/screenshots/blocknest/iphone_1.png",
        alt: {
          en: "Block Nest - Tilt & Spin Bonuses",
          tr: "Block Nest - Eğim ve Döndürme Bonusları",
        },
        caption: {
          en: "Tilt & Spin Bonuses",
          tr: "Eğim ve Döndürme Bonusları",
        },
      },
      {
        src: "/screenshots/blocknest/iphone_2.webp",
        fullSrc: "/screenshots/blocknest/iphone_2.png",
        alt: {
          en: "Block Nest - Rotate Any Piece",
          tr: "Block Nest - İstediğin Parçayı Döndür",
        },
        caption: {
          en: "Rotate Any Piece",
          tr: "İstediğin Parçayı Döndür",
        },
      },
      {
        src: "/screenshots/blocknest/iphone_3.webp",
        fullSrc: "/screenshots/blocknest/iphone_3.png",
        alt: {
          en: "Block Nest - Clear the Lines",
          tr: "Block Nest - Satırları Temizle",
        },
        caption: {
          en: "Clear the Lines",
          tr: "Satırları Temizle",
        },
      },
      {
        src: "/screenshots/blocknest/iphone_4.webp",
        fullSrc: "/screenshots/blocknest/iphone_4.png",
        alt: {
          en: "Block Nest - Beat Your Best",
          tr: "Block Nest - Kendi En İyi Skorunu Geç",
        },
        caption: {
          en: "Beat Your Best",
          tr: "Kendi En İyi Skorunu Geç",
        },
      },
      {
        src: "/screenshots/blocknest/iphone_5.webp",
        fullSrc: "/screenshots/blocknest/iphone_5.png",
        alt: {
          en: "Block Nest - Challenge a Friend",
          tr: "Block Nest - Bir Arkadaşına Meydan Oku",
        },
        caption: {
          en: "Challenge a Friend",
          tr: "Bir Arkadaşına Meydan Oku",
        },
      },
    ],
  },
  sporsayfasi: {
    title: { en: "Spor Sayfası", tr: "Spor Sayfası" },
    summary: {
      en: "A sports news site with scores, stats and live data feeds.",
      tr: "Skorlar, istatistikler ve canlı veri akışlarıyla spor haberleri sunan bir spor portalı.",
    },
    category: { en: "Web · Full-Stack", tr: "Web · Full-Stack" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Active", tr: "Aktif" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: {
      en: "Web Foundation, Firebase Infrastructure & Sports API Integration",
      tr: "Web Proje Temeli, Firebase Altyapısı & Spor API Entegrasyonu",
    },
    description: {
      en: "Spor Sayfası is a sports news and live scores portal developed under Garage.ist using Next.js App Router and TypeScript. Sharing the same architectural foundation as Gayrimenkul Dünyası, I established the web project scaffolding and Firebase infrastructure, while additionally implementing external sports data and scores REST API integrations with database persistence and ongoing system maintenance.",
      tr: "Spor Sayfası; Garage.ist bünyesinde Next.js App Router ve TypeScript ile geliştirilen bir spor haber ve canlı skor portalıdır. Gayrimenkul Dünyası ile aynı mimari temeli paylaşır: Web proje temelinin kurulması, Firebase altyapı bağlantısı, korunması ve sürekliliği tarafımdan üstlenilmiş; bunlara ek olarak dış spor haberleri ve skorları çeken REST API entegrasyonu ile veritabanı kayıt süreçleri yapılandırılmıştır.",
    },
    executiveSummary: {
      en: "Sharing architectural patterns with Gayrimenkul Dünyası, the platform is built on Next.js App Router and Firebase. In addition to setting up the project baseline and Firebase Hosting/Firestore pipeline, I integrated third-party sports news and scores APIs, resolved synchronization issues, and ensured reliable database persistence and system moderation.",
      tr: "Gayrimenkul Dünyası ile benzer mimari yapıyı paylaşan platform, Next.js App Router ve Firebase üzerine kuruludur. Web proje temelinin ve Firebase Hosting/Firestore hattının kurulmasına ek olarak; dış kaynaklı spor haberleri ve skor API'lerinin entegrasyonunu gerçekleştirdim, senkronizasyon hatalarını giderdim ve veritabanı kayıt sürekliliği ile sistem moderasyonunu sağladım.",
    },
    problem: {
      en: "Real-time sports content and score feeds require dependable external API ingestion paired with reliable database caching to prevent service interruptions during match traffic spikes.",
      tr: "Canlı spor içerikleri ve skor akışları, maç yoğunluğu anlarında kesinti yaşanmaması için güvenilir bir dış API entegrasyonu ve kararlı bir veritabanı önbellekleme/kayıt altyapısı gerektiriyordu.",
    },
    solution: {
      en: "Built a solid Next.js web foundation with Firebase infrastructure, integrated live sports REST APIs with resilient error handling, and configured Firestore database persistence for incoming sports records.",
      tr: "Firebase altyapısı üzerine kurulu sağlam bir Next.js web temeli oluşturuldu, hata toleranslı canlı spor REST API entegrasyonu eklendi ve gelen spor verilerinin Firestore veritabanına kesintisiz kaydedilmesi sağlandı.",
    },
    architectureText: {
      en: "Built on Next.js App Router and Firebase. The data layer integrates external sports REST APIs with automated ingestion and Cloud Firestore persistence, deployed and served via Firebase Hosting.",
      tr: "Next.js App Router ve Firebase mimarisi üzerine inşa edilmiştir. Veri katmanı, dış spor REST API'lerini otomatik veri toplama hattı ve Cloud Firestore veritabanı ile birleştirir; yayın altyapısı Firebase Hosting ile sağlanır.",
    },
    highlights: {
      en: [
        "Web project scaffolding, architectural foundation, and system moderation.",
        "Firebase infrastructure setup, hosting deployment, and security.",
        "External sports news and live scores REST API integration and synchronization.",
        "Structured Cloud Firestore persistence pipeline for parsed sports content.",
      ],
      tr: [
        "Web proje temelinin oluşturulması, mimari kurulumu ve sistem moderasyonu.",
        "Firebase altyapı bağlantısı, Hosting kurulumu ve sistemin korunması.",
        "Dış spor haberleri ve canlı skorlar REST API entegrasyonu ve senkronizasyonu.",
        "Spor içerikleri ve skor verileri için yapılandırılmış Cloud Firestore kayıt hattı.",
      ],
    },
    tech: ["Next.js", "Firebase", "TypeScript", "REST API", "Firestore"],
    liveUrl: "https://sporsayfasi.com",
  },
  garageist: {
    title: { en: "Garage.ist Website", tr: "Garage.ist Web Sitesi" },
    summary: {
      en: "The studio's home page, showing its apps and where to get them.",
      tr: "Stüdyonun uygulamalarını ve nereden indirileceklerini gösteren tanıtım sitesi.",
    },
    category: { en: "Web · Studio Site", tr: "Web · Stüdyo Sitesi" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Live", tr: "Yayında" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "Developer", tr: "Geliştirici" },
    description: {
      en: "The public website of Garage.ist, the product studio behind Sortify, +TV, World Clock, Gayrimenkul Dünyası and Spor Sayfası. A hand-written static site in HTML, CSS and vanilla JavaScript that presents the studio's active and earlier projects with links to each product, served from Firebase Hosting.",
      tr: "Sortify, +TV, World Clock, Gayrimenkul Dünyası ve Spor Sayfası'nın arkasındaki ürün stüdyosu Garage.ist'in web sitesi. Stüdyonun güncel ve önceki projelerini, her ürüne giden linklerle tanıtan; HTML, CSS ve sade JavaScript ile elle yazılmış, Firebase Hosting üzerinden sunulan statik bir site.",
    },
    highlights: {
      en: [
        "Hand-written static site with no framework or build step: HTML, CSS and vanilla JavaScript.",
        "Project showcase linking to each Garage.ist product, including the +TV Google Play listing.",
        "Firebase Hosting with clean URLs, plus robots.txt and a sitemap for search engines.",
      ],
      tr: [
        "Çatı ya da derleme adımı olmadan elle yazılmış statik site: HTML, CSS ve sade JavaScript.",
        "Her Garage.ist ürününe, +TV için Google Play sayfasına bağlanan proje vitrini.",
        "Temiz URL'lerle Firebase Hosting; arama motorları için robots.txt ve site haritası.",
      ],
    },
    tech: ["HTML", "CSS", "JavaScript", "Firebase Hosting"],
    liveUrl: "https://garage.ist",
  },
  worldclock: {
    shipped: true,
    title: { en: "World Clock", tr: "World Clock" },
    summary: {
      en: "See the time anywhere on a live day-and-night map and find meeting times across cities.",
      tr: "Canlı gece-gündüz haritasında her yerin saatini görün, şehirler arası toplantı saati bulun.",
    },
    category: { en: "Web · Front-End & Geo", tr: "Web · Önyüz & Geo" },
    categoryColor: "text-secondary border-secondary/20",
    status: { en: "Launched", tr: "Yayında" },
    statusColor: "bg-secondary/20 border border-secondary/30 text-secondary",
    year: { en: "Garage.ist", tr: "Garage.ist" },
    role: { en: "Co-Lead Developer (first version)", tr: "Ortak Baş Geliştirici (ilk sürüm)" },
    description: {
      en: "World Clock is an interactive timezone, geographic visualization, and SEO-driven city directory application developed under Garage.ist using React 18, Vite, and D3.js. It pairs a D3 projection rendering engine with an SSG/Prerender pipeline, solar terminator calculations, and multi-city meeting planner tools. I co-led the first version; another developer at the startup has carried it on since.",
      tr: "World Clock; Garage.ist bünyesinde React 18, Vite ve D3.js ile geliştirilen etkileşimli zaman dilimi, coğrafi görselleştirme ve SEO odaklı şehir rehberi uygulamasıdır. D3 tabanlı projeksiyon altyapısını SSG/Prerender motoru, güneş terminatörü hesaplamaları ve çoklu şehir toplantı planlama araçlarıyla birleştirir. İlk sürümün ortak baş geliştiricisiydim; sonrasında girişimden başka bir geliştirici projeyi sürdürdü.",
    },
    executiveSummary: {
      en: "Developed with React, D3.js, and Vite, World Clock utilizes a D3 projection rendering pipeline on HTML5 Canvas alongside an SSG/Prerender architecture for SEO optimization. The visualization morphs between an orthographic globe view and a flat map projection, supported by real-time solar position calculations, timezone offsets, DST rules, and prerendered static city directory pages.",
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
    liveUrl: "https://worldclock.info",
  },
  itrms: {
    title: { en: "IT-RMS", tr: "IT-RMS" },
    summary: {
      en: "Inventory and lab management for a school IT department: what is where, who has it, and what is running low.",
      tr: "Bir okul BT bölümü için envanter ve laboratuvar yönetimi: hangi cihaz nerede, kimde ve hangi malzeme azalıyor.",
    },
    category: { en: "Web · Full-Stack & Systems", tr: "Web · Full-Stack & Sistemler" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "Migration in Progress", tr: "Geçiş Sürüyor" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2023–", tr: "2023–" },
    role: { en: "Lead Architect & Developer", tr: "Baş Mimar & Geliştirici" },
    description: {
      en: "IT-RMS is a web-based IT asset, inventory, and laboratory management system originally developed for an educational institution's IT department. Built with PHP 8, MySQL, and Composer starting in 2023, it is now being migrated to Node.js, Express 5, and MongoDB (Mongoose); the PHP version is preserved on a branch. It features 2D lab layout mapping, stock threshold alerts, QR/barcode generation, and role-based access control.",
      tr: "IT-RMS; bir eğitim kurumunun BT departmanı için geliştirilen web tabanlı bir BT varlık, envanter ve laboratuvar yönetim sistemidir. 2023'te PHP 8, MySQL ve Composer ile geliştirilmeye başlanan platform şu anda Node.js, Express 5 ve MongoDB (Mongoose) mimarisine taşınıyor; PHP sürümü ayrı bir dalda korunuyor. 2D laboratuvar kroki yerleşimi, stok eşik uyarıları, karekod/barkod üretimi ve rol tabanlı erişim kontrolü sunar.",
    },
    executiveSummary: {
      en: "Engineered for an educational IT department, IT-RMS manages multi-branch lab hardware tracking, 2D coordinate classroom layouts, QR/barcode labeling, and critical stock threshold alerts. Originally built on PHP/MySQL and now being migrated to Node.js/MongoDB, the system enforces role-based access control through a five-role user model.",
      tr: "Haydarpaşa MTAL BT alanı için geliştirilen IT-RMS; kurumsal şube ve laboratuvar donanımlarının takibini, 2D kroki koordinatlarıyla cihaz konumlandırmasını, karekod/barkod etiketlemesini ve depo stok eşik uyarılarını yönetir. PHP/MySQL üzerine inşa edilen ve şu anda Node.js/MongoDB mimarisine taşınan sistem, beş rollü bir kullanıcı modeliyle yetkilendirme sağlar.",
    },
    problem: {
      en: "Manual IT inventory tracking lacked multi-lab data partitioning, provided no 2D spatial hardware layout, lacked automated QR/barcode tagging, and failed to alert administrators when critical maintenance supplies fell below safety thresholds.",
      tr: "BT departmanındaki manuel envanter takibi; çoklu sınıf/laboratuvar ayrıştırmasından yoksundu, fiziki cihazların 2D yerleşim planını sunmuyordu, barkod/karekod etiketlemesi barındırmıyordu ve kritik stok tükenmelerinde uyarı mekanizması sağlamıyordu.",
    },
    solution: {
      en: "Centralized laboratory hardware, 2D spatial layouts, storage supplies, and QR code labeling into a unified administrative panel. The PHP 8 codebase is being moved to Node.js (Express 5), MongoDB (Mongoose), Passport, and QRCode, restructured into an MVC layout with linting, input validation, and security headers.",
      tr: "Laboratuvar donanımları, 2D kroki koordinatları, depo stokları ve karekod etiketleme süreçleri tek bir yönetim panelinde toplandı. PHP 8 kod tabanı; Node.js (Express 5), MongoDB (Mongoose), Passport ve QRCode kullanan, lint, girdi doğrulama ve güvenlik başlıkları eklenmiş MVC yapısına taşınıyor.",
    },
    architectureText: {
      en: "The production version runs on PHP 8 and MySQL. The Node.js (Express 5) and MongoDB (Mongoose) version under migration carries over the 2D lab spatial models, stock threshold warnings, Passport role-based authentication, and QR code generation.",
      tr: "Üretimdeki sürüm PHP 8 ve MySQL üzerinde çalışıyor. Taşıma sürecindeki Node.js (Express 5) ve MongoDB (Mongoose) sürümü; 2D laboratuvar duvar/kapı koordinat modellerini, stok eşik uyarılarını, Passport tabanlı rol yetkilendirmesini ve QRCode üretimini devralıyor.",
    },
    highlights: {
      en: [
        "Multi-branch hardware tracking with 2D spatial lab layout mapping.",
        "Ongoing migration from PHP 8 / MySQL to Node.js / Express 5 / MongoDB (Mongoose), with the PHP version kept on a branch.",
        "Automated QR code generation and critical inventory stock threshold alerts.",
        "Role-based access control (RBAC) with a five-role user model.",
      ],
      tr: [
        "Çoklu şube ve 2D laboratuvar kroki koordinatlarıyla donanım yerleşim takibi.",
        "PHP 8 / MySQL sürümünden Node.js / Express 5 / MongoDB (Mongoose) mimarisine süren geçiş; PHP sürümü ayrı dalda korunuyor.",
        "Karekod (QR Code) üretimi ve kritik depo stok eşik uyarı sistemleri.",
        "Beş rollü kullanıcı modeliyle rol tabanlı yetkilendirme (RBAC).",
      ],
    },
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "PHP", "MySQL", "QR Code", "RBAC"],
    cover: COVERS.itrms,
  },
  chorus: {
    title: { en: "Chorus", tr: "Chorus" },
    summary: {
      en: "An anonymous discussion board with no accounts, where every message is saved as a Git commit.",
      tr: "Hesap gerektirmeyen, her mesajın bir Git commit'i olarak saklandığı anonim bir tartışma platformu.",
    },
    category: { en: "Open Source · Discussion Platform", tr: "Açık Kaynak · Tartışma Platformu" },
    categoryColor: "text-primary border-primary/20",
    status: { en: "Early Development", tr: "Erken Geliştirme" },
    statusColor: "bg-primary/20 border border-primary/30 text-primary",
    year: { en: "2026–", tr: "2026–" },
    role: { en: "Founding Engineer", tr: "Kurucu Geliştirici" },
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
      en: "The Go (1.22+) backend uses native local Git repository operations and file-system JSON structures for persistence. The frontend is a React 19, TypeScript, and Vite SPA communicating with the Go engine via TanStack Query.",
      tr: "Go (1.22+) ile yazılan arka uç servisi, veri kalıcılığı için doğrudan yerel Git deposu komutlarını ve dosya sistemini kullanır. Önyüz tarafı React 19, TypeScript ve Vite üzerine kurulu bir SPA olup, API iletişimini TanStack Query üzerinden yürütür.",
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
    githubUrl: "https://github.com/joinchorus/chorus",
    liveUrl: "https://joinchorus.app",
    cover: COVERS.chorus,
  },
};
