# RULES.md — Proje Mühendislik ve Mimari Kuralları

Bu belge, **babacan.me** projesinin yazılım mimarisi, tip güvenliği, isimlendirme standartları, çok dilli içerik yapısı ve dağıtım (deployment) kurallarını tanımlar. Projede çalışan tüm geliştiriciler ve yapay zeka ajanları bu kurallara koşulsuz uymak zorundadır.

> **Not:** Görsel tasarım dili, renk paleti, tipografik ölçekler ve estetik kararlar bu dosyada yer almaz; görsel spesifikasyonlar için `DESIGN.md` dosyası referans alınmalıdır.

---

## 1. Teknoloji Yığını ve Araç Zinciri (Tech Stack)

- **Framework:** Next.js (App Router, `output: "export"` ile tam statik çıktı / SSG) + React 19.
- **Dil:** TypeScript (`.ts`, `.tsx`). Uygulama kodunda `.js` veya `.jsx` uzantılı dosyalara izin verilmez.
- **Stil Altyapısı:** Tailwind CSS + TypeScript `enum` tabanlı tasarım token mimarisi.
- **Paket Yöneticisi ve Komutlar:** Standart `npm` ve Next.js CLI (`next dev`, `next build`, `next start`) kullanılır.
- **Yasaklı Araçlar:** **Vite+ (`vp`) kesinlikle kullanılmaz.** Depo içinde `.vite`, `.vite-hooks` gibi dizinler veya `vp` git kancaları (hooks) oluşturulmaz.

---

## 2. Strict TypeScript ve Tip Güvenliği

- **`any` Kesinlikle Yasaktır:**
  - Kod tabanının hiçbir yerinde açık (`: any`) veya örtük (`implicit any`) tip kullanılamaz.
  - `as any` tür dönüşümleri (type casting) yapılamaz.
  - `@ts-ignore` ve `@ts-nocheck` kullanımı yasaktır.
- **Derleyici Kuralları (`tsconfig.json`):**
  - `strict: true`
  - `noImplicitAny: true`
  - `strictNullChecks: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noImplicitReturns: true`
- **Veri ve Bileşen Sözleşmeleri:**
  - Her React bileşeninin `Props` yapısı açıkça tanımlanmış bir `interface` olmalıdır.
  - Harici JSON/API verileri (ör. derleme zamanı GitHub istatistikleri) çalışma zamanında doğrulanmış ve tam tiplenmiş (`interface`) olarak tüketilmelidir.

---

## 3. Tasarım Token Mimarisi (Enum Zorunluluğu)

Bileşen dosyaları (`.tsx`) içerisine doğrudan sabit renk kodları (hex/rgb), rastgele boşluk değerleri veya keyfi köşe yuvarlaklıkları (magic values) yazılamaz.

- **Merkezi Enum Yapısı:** Tüm tasarım sabitleri (`DESIGN.md` içindeki değerleri kaynak alarak) TypeScript `enum` yapılarına dönüştürülür ve merkezi token modülünden içe aktarılır:
  - `Colors` — Yüzey, metin, kenarlık ve vurgu renk tokenları
  - `Spacing` — Boşluk, kenar payı (margin/padding) ve grid ölçekleri
  - `CornerRoundness` — Köşe yuvarlaklığı (border-radius) değerleri
  - `Typography` — Yazı tipi ailesi, boyut, satır yüksekliği ve harf aralığı tokenları
  - `Elevation` — Katman, gölge ve `z-index` seviyeleri
  - `Motion` — Geçiş süreleri (duration) ve ivmelenme eğrileri (easing)
- **Tailwind Entegrasyonu:** Tailwind CSS yapılandırması ve kullanılan yardımcı sınıflar, tanımlanan bu `enum` token hiyerarşisi ile birebir uyumlu olmalıdır.
- **Tekilleştirme:** `enum` içinde aynı değere sahip mükerrer (duplicate) üyeler tanımlanamaz; her token semantik ve benzersiz karşılığa sahip olmalıdır.

---

## 4. İsimlendirme Standartları (PascalCase Zorunluluğu)

- **PascalCase (Zorunlu):**
  - **Bileşen Dosyaları ve Fonksiyonları:** `ProjectCard.tsx`, `NavigationHeader.tsx`, `ProjectScreenshots.tsx`, `ArchitectureDiagram.tsx`
  - **Enum İsimleri ve Tüm Enum Üyeleri:**
    ```ts
    export enum CornerRoundness {
      None = "0rem",
      Small = "0.125rem",
      Medium = "0.25rem",
      Large = "0.5rem",
      ExtraLarge = "0.75rem",
      Full = "9999px",
    }
    ```
  - **Interface ve Type Tanımları:** `ProjectData`, `ProjectScreenshot`, `LocalizedText`, `PageMetadataProps`
- **camelCase:**
  - Değişkenler, yardımcı fonksiyonlar, metotlar ve özel React hook'ları (`useLanguage`, `buildJsonLd`, `parseRouteLocale`).
- **UPPER_SNAKE_CASE:**
  - Yalnızca değişmez veri tabloları ve statik konfigürasyon sabitleri (`PROJECT_DATA`, `SUPPORTED_LOCALES`).

---

## 5. Çift Dilli Mimari (i18n — TR / EN)

- **Tam Çift Dillilik:** Kullanıcıya görünen hiçbir metin bileşen içine tek dilde sabit olarak gömülemez. Tüm metinler aşağıdaki sözleşmeye uymalıdır:
  ```ts
  export interface LocalizedText {
    tr: string;
    en: string;
  }
  ```
- **URL Tabanlı Dil Yönetimi:**
  - Aktif dil her zaman URL rotasından (`/tr/...` veya `/en/...`) türetilir; URL dışında bağımsız bir dil durumu tutulmaz.
  - Kök dizin (`/`) tarayıcı diline veya kayıtlı tercihe göre `/tr` ya da `/en` rotasına yönlendirilir.
  - Sayfa ve proje rotaları her iki dilde kendi yerel yollarıyla statik olarak üretilir (`generateStaticParams`):
    - Türkçe: `/tr`, `/tr/projeler`, `/tr/projeler/[slug]`
    - İngilizce: `/en`, `/en/projects`, `/en/projects/[slug]`

---

## 6. Statik SEO, Performans ve Medya Kuralları

- **Statik SEO Üretimi:**
  - Her rota için `title`, `description`, `canonical`, `alternate` (`hreflang="tr"`, `hreflang="en"`, `hreflang="x-default"`), Open Graph ve Twitter Card meta etiketleri tek bir merkezi SEO modülünden üretilir.
  - Her sayfa için uygun Schema.org JSON-LD (`Person`, `WebSite`, `SoftwareApplication` / `CreativeWork`, `BreadcrumbList`) çıktısı statik HTML içinde yer almalıdır.
  - Paylaşım önizleme görselleri (`og:image`) bağlantı önizleme sınırlarını aşmamak için `1200×627` boyutunda ve optimize edilmiş (`~45 KB` JPEG) olmalıdır.
- **Görsel ve Varlık Yönetimi:**
  - Uygulama içi ekran görüntüleri ve kapak görselleri yalnızca `.webp` formatında tutulur; depoda gereksiz `.png` kopyaları veya kullanılmayan çözünürlük varyantları barındırılmaz.
  - İlk ekran (above-the-fold) dışındaki tüm görseller `loading="lazy"`, `decoding="async"` ve sabit en-boy oranı (`aspect-ratio`) ile yüklenerek **CLS (Cumulative Layout Shift) = 0** garanti altına alınır.
  - Diyagramlar çalışma zamanında ağır kütüphanelerle çizilmez; önceden üretilmiş optimize `.svg` dosyaları olarak sunulur.
- **Erişilebilirlik (a11y):**
  - Klavye navigasyonu için görünür global `:focus-visible` çerçevesi zorunludur (`outline: none` ile odak halkası silinemez).
  - `prefers-reduced-motion: reduce` medya sorgusunda tüm sürekli animasyonlar ve yumuşak kaydırmalar devre dışı bırakılmalı; 5 saniyeden uzun süren animasyonlar durdurulabilir olmalıdır.
  - Tüm tıklanabilir/dokunulabilir öğeler en az `36×36px` (`2.25rem`) etkileşim alanına sahip olmalıdır.

---

## 7. Güvenlik, Veri Çekme ve Firebase Hosting

- **Gizli Anahtarlar (Secrets):**
  - `GITHUB_TOKEN` gibi kimlik bilgileri **yalnızca derleme zamanında (build-time / prebuild)** çalışır.
  - Hiçbir gizli anahtar `NEXT_PUBLIC_*` önekiyle istemci paketine (client bundle) dahil edilemez.
- **GitHub Verileri:**
  - GitHub istatistikleri ve katkı takvimi derleme öncesinde (`prebuild`) çekilip yalnızca gerekli alanları içeren statik bir JSON dosyasına yazılır; istemci tarafında canlı GitHub API çağrısı yapılmaz.
- **Analitik:**
  - Yalnızca Google Tag Manager (`GTM`) kullanılır. Mükerrer veri sayımını önlemek için istemciye ayrıca Firebase Analytics SDK eklenmez.
- **Firebase Hosting:**
  - Proje yalnızca statik dosya sunumu için Firebase Hosting kullanır.
  - `firebase.json` içerisindeki Content Security Policy (CSP) başlıkları korunmalı, `'unsafe-eval'` eklenmemeli ve yeni bir dış kaynak gerektiğinde CSP açıkça güncellenmelidir.
  - Derleme çıktısı klasörü (`out/` veya `public/` build hedefi) `.gitignore` içinde tutulur ve asla elle düzenlenmez.

---

## 8. Kod Yorumları ve Git Standartları

- **Türkçe Yorum Satırları:**
  - Kod içindeki tüm açıklama satırları, mimari notlar ve TSDoc açıklamaları **Türkçe** olarak yazılır.
  - Yorumlar "kodun ne yaptığını" değil, **"neden öyle yapıldığını"** ve uç durumları (edge-case) açıklamalıdır.
- **Conventional Commits:**
  - Tüm git commit mesajları Conventional Commits formatına uymalıdır:
    - `feat(scope): yeni özellik`
    - `fix(scope): hata düzeltmesi`
    - `refactor(scope): davranış değiştirmeyen kod iyileştirmesi`
    - `content(scope): metin, CV veya proje verisi güncellemesi`
    - `chore: yapılandırma, bağımlılık veya derleme süreci değişikliği`
    - `docs: dokümantasyon güncellemesi`
