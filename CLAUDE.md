# CLAUDE.md

Bu belge, bu depoda (**babacan.me**) çalışan Claude Code ve diğer yapay zeka geliştirme araçları için mimari ve operasyonel rehberdir.

**babacan.me**; **Next.js (App Router, `output: "export"`) + React 19 + TypeScript (`.tsx`) + Tailwind CSS** ile geliştirilmiş, çift dilli (TR / EN) ve Firebase Hosting üzerinde sunulan kişisel portfolyo sitesidir.

- Mühendislik, tip güvenliği, isimlendirme ve enum kuralları için **[`RULES.md`](./RULES.md)** dosyasını inceleyin.
- Görsel tasarım dili ve token değerleri için **[`DESIGN.md`](./DESIGN.md)** dosyasını inceleyin.
- Ajan iş akışı ve doğrulama kontrol listesi için **[`AGENTS.md`](./AGENTS.md)** dosyasını inceleyin.

---

## Komutlar ve Araç Zinciri

> **Not:** Projede **Vite+ (`vp`) kullanılmaz** ve `.vite` / `.vite-hooks` dizinleri oluşturulmaz. Standart `npm` ve Next.js CLI kullanılır.

```bash
npm install         # Bağımlılıkları yükler
npm run dev         # Next.js geliştirme sunucusunu başlatır (http://localhost:3000)
npm run typecheck   # TypeScript tip kontrolü (tsc --noEmit)
npm run build       # prebuild (fetch-github-data) → next build (statik dışa aktarım)
npm run start       # Statik derleme çıktısını yerel olarak önizler
npm run cv          # Markdown kaynaklarından (cv_{en,tr}_v2.md) A4 PDF CV üretir (Firefox gerekir)
```

- Dağıtım (deploy), `main` dalına yapılan push işlemlerinde (canlı kanal) ve PR'larda (önizleme kanalı) GitHub Actions üzerinden `GITHUB_TOKEN` ile `npm ci && npm run build` çalıştırılarak gerçekleştirilir.

---

## Derleme ve Dizin Düzeni

- **Next.js Statik Çıktı (`output: "export"`):** Tüm rotalar derleme zamanında (`generateStaticParams`) tam statik HTML dosyaları olarak üretilir.
- **Statik Varlıklar:** CV PDF'leri, mimari diyagramlar (`diagrams/*.svg`), kapak görselleri (`covers/*.webp`), ekran görüntüleri (`screenshots/<slug>/*.webp`), OG görselleri (`og/*.jpg`), `robots.txt`, `llms.txt` ve `llms-full.txt` statik varlık dizininde yer alır.
- **Derleme Çıktısı:** Firebase Hosting tarafından sunulan statik çıktı dizini `.gitignore` içindedir; bu dizindeki dosyalar asla elle düzenlenmez.
- **GitHub Verisi (`prebuild`):** `scripts/fetch-github-data.js` derleme öncesinde çalışarak statik `github-data.json` dosyasını üretir.
- **LLM Bağlam Dosyaları:** `llms.txt` ve `llms-full.txt` dosyaları el ile güncellenir; site içeriği, proje listesi ve CV ile her zaman tutarlı tutulmalıdır.
- **CV PDF Üretimi:** `scripts/build-cv.mjs` (headless Firefox, WebDriver BiDi `browsingContext.print`) Markdown kaynaklarını (`cv_en_v2.md`, `cv_tr_v2.md`) A4 PDF'e dönüştürür. Güncelleme yapıldığında önce `.md` dosyası düzenlenir, `npm run cv` çalıştırılır ve üretilen PDF metin katmanı `pdftotext` ile doğrulanır (Inter fontunun `calt` özelliği `+` karakterini düşürerek ATS tarayıcılarında `"C++"` ifadesini `"C"` yaptığı için script içinde `calt` devre dışı bırakılmıştır).
- **Site Haritası (`sitemap.xml`):** Tüm statik rotalardan otomatik üretilir, elle düzenlenmez.

---

## Mimari

### 1. Kod Standartları ve Tasarım Token Mimarisi (`RULES.md`)

- **Strict TypeScript (`any` Yasağı):** Kod tabanında açık veya örtük `any` tipi, `as any` dönüşümü ve `@ts-ignore` kullanımı kesinlikle yasaktır.
- **PascalCase Zorunluluğu:** Tüm React bileşenleri ve `.tsx` dosyaları (`ProjectCard.tsx`, `ProjectScreenshots.tsx`), tüm `interface` / `type` tanımları (`ProjectData`, `LocalizedText`) ve tüm `enum` isimleri ile üyeleri **PascalCase** olmalıdır.
- **Tasarım Token Enum'ları:** Bileşenlerde sabit hex renkleri, rastgele piksel boyutları veya keyfi köşe yuvarlaklıkları kullanılmaz. `DESIGN.md` içindeki değerler merkezi TypeScript `enum` yapıları (`Colors`, `Spacing`, `CornerRoundness`, `Typography`, `Elevation`, `Motion`) üzerinden yönetilir ve Tailwind CSS sınıflarıyla eşleştirilir.

### 2. Rotalama (Next.js App Router & Firebase Hosting)

Her geçerli URL dil önekine sahiptir:

- `/` → `localStorage["site-lang"]` veya `navigator.language` değerine göre `/tr` ya da `/en` rotasına yönlendirir.
- `/{tr|en}` → Ana sayfa (Sıralama: **Hero → Projects → Open Source → Publications → About → Contact**).
- `/tr/projeler` ve `/en/projects` → Projeler dizin sayfası (`ProjectsDirectoryPage`).
- `/tr/projeler/[slug]` ve `/en/projects/[slug]` → Proje detay sayfası (`ProjectDetailPage`, `slug` değeri `ProjectKey` birliğinin bir üyesidir).
- Diğer tüm yollar → `404.html` (`NotFoundPage`).

Firebase Hosting üzerinde **SPA catch-all yönlendirmesi yoktur**. Her geçerli URL statik olarak üretilmiş bir HTML dosyasıdır (`trailingSlash: false` ile `/en/projects/osmos` doğrudan `en/projects/osmos/index.html` dosyasını sunar), tanımsız URL'ler gerçek `404` HTTP durum koduyla `404.html` döndürür. Alternatif dil/segment yazımları (`/en/projeler/*`, `/tr/projects/*`) `firebase.json` içinde `301` yönlendirmesidir.

### 3. Dil / i18n ve İçerik Kaynakları

Dil durumu ayrı bir global state olarak değil, doğrudan **URL rotasından (`[lang]`)** türetilir. Dil değiştirildiğinde mevcut sayfanın diğer dildeki eşdeğer URL'sine geçiş yapılır.

Kullanıcıya görünen her metin hem `tr` hem `en` karşılığına sahip olmalıdır (`LocalizedText`: `{ tr: string; en: string }`).

İki ana içerik kaynağı bulunur:

1. **Arayüz Metinleri (`i18nData.ts`):** Yaprak düğümleri `{ tr, en }` olan iç içe nesne ağacı. HTML içeren metinler `dangerouslySetInnerHTML` ile basıldığında içinde `className` yerine `class` özniteliği kullanılmalıdır.
2. **Proje Verileri (`projectsData.ts`):** `PROJECT_DATA: Record<ProjectKey, ProjectData>`.
   - Yeni bir proje eklendiğinde `ProjectKey` tipi genişletilir ve statik rotalar otomatik üretilir.
   - `summary`: Kartlarda ve detay sayfasının başında gösterilen, teknik olmayan okur için tek cümlelik sade özet.
   - `shipped: true`: Gerçek kullanıcılara ulaşmış ürünleri işaretler; Hero bölümündeki "yayınlanan ürün" sayısı buradan hesaplanır ve `/{lang}/{projects|projeler}?filter=shipped` adresine bağlanır.
   - `cover`: `webp` (`1200px`) ve `webp2x` (`2400px`) kapak görselleri (`ProjectCover.tsx` içinde `srcset` olarak kullanılır) ile `og` (`og/<slug>.jpg`, `1200×627`, `~45 KB` JPEG) paylaşım görselini tanımlar. Bağlantı önizleme istemcilerinin (WhatsApp vb.) boyut sınırına takılmamak için OG görselleri küçük tutulmalıdır.
   - `screenshots`: Yalnızca `.webp` formatındaki uygulama ekran görüntüleri. `ProjectScreenshots.tsx` içinde `IntersectionObserver`, `loading="lazy"`, `decoding="async"` ve sabit `aspect-ratio` ile yüklenir.

Site bir "beni işe alın" sayfası değil, sahibini ve geliştirdiği açık kaynak / stüdyo projelerini tanıtan kişisel bir portfolyodur (`DESIGN.md` → Brand & Style); CV indirme bağlantısı ikincil bir eylemdir.

### 4. Mimari Diyagramlar

`ProjectData.mermaidDiagram` diyagramın kaynak tanımını tutar ancak diyagramlar çalışma zamanında `mermaid` ile **çizilmez**. Önceden üretilmiş `diagrams/<slug>.svg` dosyaları `ArchitectureDiagram.tsx` tarafından çekilip satır içi (inline) olarak DOM'a yerleştirilir (SVG'ler `<foreignObject>` kullandığı için `<img>` yerine inline kullanılmalıdır). Bir projenin `mermaidDiagram` tanımı değişirse ilgili `.svg` dosyası da güncellenmelidir.

### 5. GitHub Verileri ve Güvenlik

`prebuild` script'i kişisel hesabı ve `Osmos-App`, `Mythos-IDE`, `joinchorus` organizasyonlarını (fork'ları atlayarak) tarar; katkı günlerini tarihe göre sıralanmış şekilde ve repo başına dil baytlarını (HTML/CSS vb. hariç) toplayarak `/github-data.json` dosyasına yazar. İstemci tarafında canlı API yedeklemesi (fallback) yoktur; dosya eksikse istatistikler tire (`-`) ve takvim "kullanılamıyor" mesajı gösterir.

- **Güvenlik Kuralı:** İstemci kodu **asla** bir GitHub anahtarını okumamalıdır (`NEXT_PUBLIC_*` değişkenleri istemci paketine gömülür). `GITHUB_TOKEN` yalnızca `prebuild` script'i tarafından derleme zamanında kullanılır (yerelde `.env.local` içinde tanımlanır, şablonu `.env.example` dosyasıdır).

### 6. SEO, Analitik ve Erişilebilirlik

- **Merkezi SEO (`seo.ts`):** Sayfa başlığı, açıklama, `canonical`, `hreflang` (`tr`, `en`, `x-default`), Open Graph ve Schema.org JSON-LD verileri tek bir merkezden üretilir.
- **Analitik:** Yalnızca **Google Tag Manager (`GTM-5XX6K3J5`)** kullanılır (GA4 `G-YJJS8RBN8E` verisini GTM iletir). Mükerrer sayımı önlemek için Firebase Analytics SDK eklenmemelidir. Firebase yalnızca Hosting için kullanılır. `firebase.json` içindeki CSP başlığı yeni dış kaynaklar eklendiğinde güncellenmeli ve `'unsafe-eval'` içermemelidir.
- **Erişilebilirlik ve Hareket:**
  - Global `:focus-visible` odak çerçevesi korunmalıdır (`focus-visible:outline-none` veya aynı renkte görünmez odak halkaları eklenmemelidir).
  - `prefers-reduced-motion` etkin olduğunda tüm sürekli animasyonlar ve yumuşak kaydırmalar durmalıdır; 5 saniyeden uzun süren hareketler durdurulabilir olmalıdır (Hero grafiğinde duraklatma düğmesi bulunur).
  - Hero grafiği (`NetworkGraphic.tsx`) üçüncü parti 3B kütüphane (`three.js` vb.) kullanmadan Canvas 2D ile çizilen bir dodekahedrondur; yalnızca `≥1024px` ekranlarda yüklenir ve ekran dışındayken duraklatılır.
  - Tüm etkileşimli öğeler en az `36px` (`min-h-9`) dokunma yüksekliğine sahip olmalıdır.

### 7. Kod Yorumları ve Git Kuralları

- Kod içi açıklama ve yorum satırları **Türkçe** olarak yazılır.
- Commit mesajlarında **Conventional Commits** (`feat(scope):`, `fix(scope):`, `refactor(scope):`, `content:`, `chore:`, `docs:`) standardı kullanılır.
