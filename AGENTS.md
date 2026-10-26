# AGENTS.md — Yapay Zeka Ajanları İçin Çalışma Kuralları

Bu depo (**babacan.me**), **Next.js (App Router, Static Export) + React 19 + TypeScript (`.tsx`) + Tailwind CSS** ile geliştirilen, çift dilli (TR / EN) ve Firebase Hosting üzerinde barındırılan kişisel portfolyo projesidir.

Projede görev alan tüm yapay zeka ajanları herhangi bir kod üretmeden veya değişiklik yapmadan önce aşağıdaki temel belgeleri referans almalıdır:

- **[`RULES.md`](./RULES.md):** Zorunlu mühendislik, mimari, tip güvenliği, isimlendirme ve dağıtım kuralları.
- **[`DESIGN.md`](./DESIGN.md):** Görsel tasarım dili, renk paleti, tipografi ve boşluk (spacing) spesifikasyonları.
- **[`CLAUDE.md`](./CLAUDE.md):** Depo mimarisi, veri akışı, içerik kaynakları ve derleme süreci detayları.

---

## Araç Zinciri ve Komutlar

> **Önemli:** Bu projede **Vite+ (`vp`) kesinlikle kullanılmaz.** Çalışma dizininde `.vite` veya `.vite-hooks` klasörleri oluşturulmamalıdır. Yalnızca standart `npm` ve Next.js CLI komutları kullanılır.

```bash
npm install         # Bağımlılıkları yükler
npm run dev         # Next.js geliştirme sunucusunu başlatır (next dev)
npm run typecheck   # TypeScript tip kontrolünü çalıştırır (tsc --noEmit)
npm run build       # Prebuild (GitHub verisi) + Next.js statik dışa aktarım (output: "export")
npm run cv          # Markdown kaynaklarından A4 CV PDF dosyalarını üretir
```

---

## Zorunlu Mühendislik Kuralları Özeti

1. **Strict TypeScript (`any` Yasaktır):**
   - Kod tabanında açık veya örtük `any` tipi, `as any` dönüşümü ve `@ts-ignore` / `@ts-nocheck` kullanımı kesinlikle yasaktır.
   - Tüm bileşen `Props` yapıları, veri modelleri ve fonksiyon imzaları tam tiplenmiş (`interface` / `type`) olmalıdır.

2. **Tasarım Token Enum Mimarisi:**
   - Bileşenlerin (`.tsx`) içine doğrudan sabit hex renk kodları, rastgele piksel değerleri veya keyfi köşe yuvarlaklıkları yazılamaz.
   - Tüm tasarım sabitleri (`DESIGN.md` referans alınarak) merkezi TypeScript `enum` yapıları üzerinden yönetilir:
     - `Colors`, `Spacing`, `CornerRoundness`, `Typography`, `Elevation`, `Motion`
   - Enum içinde aynı değere sahip mükerrer (duplicate) üyeler bulunmamalı ve Tailwind CSS sınıfları bu token hiyerarşisiyle uyumlu olmalıdır.

3. **PascalCase İsimlendirme Zorunluluğu:**
   - **React Bileşenleri ve `.tsx` Dosyaları:** `PascalCase` (`ProjectCard.tsx`, `NavigationHeader.tsx`)
   - **Enum İsimleri ve Üyeleri:** `PascalCase` (`Colors.SurfacePrimary`, `Spacing.SectionGap`, `CornerRoundness.Medium`)
   - **Interface ve Type Tanımları:** `PascalCase` (`ProjectData`, `LocalizedText`, `PageMetadataProps`)
   - **Değişkenler, Fonksiyonlar ve Hook'lar:** `camelCase` (`useLanguage`, `buildJsonLd`)
   - **Statik Veri Sabitleri:** `UPPER_SNAKE_CASE` (`PROJECT_DATA`, `SUPPORTED_LOCALES`)

4. **Çift Dilli İçerik (TR / EN) ve Statik SEO:**
   - Kullanıcıya gösterilen tüm metinler `LocalizedText` (`{ tr: string; en: string }`) yapısında olmalıdır.
   - Aktif dil URL rotasından (`/tr/...` veya `/en/...`) türetilir ve tüm sayfalar `generateStaticParams` ile her iki dilde statik olarak üretilir.
   - Görseller `.webp` formatında tutulur; ilk ekran dışındaki tüm görseller `loading="lazy"`, `decoding="async"` ve sabit `aspect-ratio` ile yüklenir.

5. **Güvenlik, Yorumlar ve Git:**
   - `GITHUB_TOKEN` yalnızca derleme aşamasında (`prebuild`) okunur; istemci paketine (`NEXT_PUBLIC_*`) **asla** dahil edilmez.
   - Kod içi açıklama ve yorum satırları **Türkçe** yazılır.
   - Commit mesajlarında **Conventional Commits** (`feat(scope):`, `fix(scope):`, `refactor(scope):`, `content:`, `chore:`, `docs:`) kullanılır.

---

## İnceleme Kontrol Listesi (Review Checklist)

- [ ] Hiçbir `.ts` veya `.tsx` dosyasında `any` tipi veya sabit (hardcoded) renk/boyut değeri kullanılmadı.
- [ ] Tüm bileşenler, `interface`/`type` tanımları ve `enum` isim/üyeleri `PascalCase` standardına uygun yazıldı.
- [ ] Kullanıcıya görünen her yeni metin hem `tr` hem `en` karşılığıyla eklendi.
- [ ] `npm run typecheck` sıfır hata ile geçti.
- [ ] Kod yorumları Türkçe yazıldı ve commit mesajı Conventional Commits formatına uygun hazırlandı.
