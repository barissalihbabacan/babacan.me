# DESIGN.md — Tasarım Sistemi ve Görsel Kimlik Rehberi

Bu belge, **babacan.me** portfolyo sitesinin görsel tasarım dilini, renk paletini, tipografi hiyerarşisini ve boşluk kurallarını tanımlar. Kod tabanında bu değerler doğrudan yazılmaz; `DesignSystem/` dizinindeki merkezi TypeScript enum'ları üzerinden kullanılır.

---

## 1. Marka ve Tasarım Felsefesi

- **Konsept:** "Kingsman Gold & Bespoke Charcoal" (Kişiye Özel Kömür Takım Elbise ve Altın/Pirinç Vurgular).
- **Estetik Yaklaşım:** Editoryal minimalizm, ince yapısal kenarlıklar, silik arka plan numaraları ve yüksek kontrastlı tek aralıklı (monospace) tipografi.
- **Ton ve Duygu:** Sessiz özgüven; karanlık, rafine ve profesyonel bir mühendislik atmosferi.
- **Hedef Kitle:** Açık kaynak geliştiricileri, ürünleri merak eden kullanıcılar ve teknik yöneticiler. Süsten ziyade netlik ve içerik derinliği ön plandadır.

---

## 2. Renk Paleti

Tüm yüzeyler monokromatik altın ve derin kömür tonları üzerine kuruludur.

| Rol / Token | Değer | Kullanım Amacı |
| :--- | :--- | :--- |
| **Primary** | `#C5A059` | Kingsman Gold. Aktif durumlar, bağlantılar, vurgular ve odak halkası. |
| **PrimaryContainer** | `#3A2D18` | Koyu Pirinç. Dolgulu butonlar ve etkileşimli kart alanları. |
| **OnPrimaryContainer** | `#E5CBA3` | Açık Altın. Koyu butonlar üzerindeki metinler ve vurgu etiketleri. |
| **Background** | `#111214` | Bespoke Charcoal. Sayfanın ana atmosferik zemin rengi. |
| **Surface** | `#181A1C` | Ana içerik tuvali ve bölüm zeminleri. |
| **SurfaceContainer** | `#1B1D20` | Kartlar, istatistik kutuları ve içerik blokları. |
| **SurfaceContainerHigh** | `#202225` | Vurgulu katmanlar ve açılır paneller. |
| **SurfaceContainerHighest** | `#26282D` | Üzerine gelinen (hover) kartlar ve modallar. |
| **OnSurface** | `#F1F3F5` | Beyaz Gömlek. Ana metinler ve başlıklar (göz yormayan sıcak beyaz). |
| **OnSurfaceVariant** | `#B8BDC4` | İkincil metinler, etiketler ve meta veriler. |
| **OnSurfaceMuted** | `#A0A5AB` | Silik detay metinleri ve tarih bilgileri. |
| **Outline** | `#33373D` | İnce yapısal ayırıcı çizgiler ve kart kenarlıkları. |
| **Error** | `#F87171` | Hata durumları ve uyarı mesajları. |
| **ErrorContainer** | `#7F1D1D` | Hata bildirim zeminleri. |
| **OnErrorContainer** | `#FECACA` | Hata bildirim metinleri. |

---

## 3. Tipografi Hiyerarşisi

Sitede iki ana yazı tipi ailesi kullanılır:
- **Inter:** Genel iletişim, başlıklar ve gövde metinleri için nötr ve sistemik font.
- **JetBrains Mono:** Etiketler, tarihler, bölüm numaraları ve teknik veriler için terminal fontu.

| Kademe | Yazı Tipi | Boyut | Kalınlık | Satır Yüksekliği | Harf Aralığı |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Large** | Inter | 64px | Bold (700) | 1.1 | -0.04em |
| **Display Mobile** | Inter | 40px | Bold (700) | 1.2 | -0.02em |
| **Headline Medium** | Inter | 32px | SemiBold (600) | 1.3 | -0.02em |
| **Body Large** | Inter | 18px | Regular (400) | 1.6 | 0 |
| **Body Medium** | Inter | 16px | Regular (400) | 1.6 | 0 |
| **Label Mono** | JetBrains Mono | 14px | Medium (500) | 1.4 | 0.02em |

---

## 4. Yerleşim ve Boşluk Kuralları (Layout & Spacing)

- **Temel Ölçek:** 8px doğrusal ızgara (linear scale).
- **Maksimum Kapsayıcı Genişliği:** 1530px.
- **Kenar Boşlukları (Margins):** Mobilde 12px, masaüstünde 20px (akışkan ölçekle geniş ekranlarda 40px'e kadar genişler).
- **Bölüm Boşlukları (Section Gap):** 120px (~10vh dinamik boşluk).
- **Hero Başlık Ölçeği:** Akışkan (`clamp(48px, 8.5vw, 128px)`).
- **Bölüm Hayalet Numaraları:** `30vw`, `%2` opaklık, sağ üst köşeye hizalı ve etkileşimsiz.
- **Minimum Dokunma Hedefi:** Erişilebilirlik (a11y) gereği tüm buton ve bağlantılar en az 36px dokunma alanına sahip olmalıdır.

---

## 5. Katmanlama ve Derinlik (Elevation & Depth)

Ağır gölgeler yerine **tonlama katmanları (tonal layering)** ile derinlik oluşturulur:

1. **Zemin (Base):** `#111214` — Sayfa gövdesi.
2. **Yüzey (Surface):** `#181A1C` — Bölüm zeminleri.
3. **Kapsayıcı (Container):** `#1B1D20` — Kartlar ve istatistik blokları.
4. **Yükseltilmiş (Raised):** `#26282D` — Üzerine gelinen kartlar ve modal panelleri.
5. **Buzlu Cam (Glass):** Gezinme çubuğu ve modal zeminlerinde hafif saydamlık ve arka plan bulanıklığı.

---

## 6. Biçim ve Köşe Yuvarlaklığı (Shapes & Radii)

Mimari ve ızgara odaklı havayı korumak için köşe yuvarlaklıkları kasıtlı olarak minimal tutulur:
- **Varsayılan Köşe Yuvarlaklığı:** `0.125rem` (2px). Kartlar, butonlar, etiketler ve görsel çerçeveleri bu değeri kullanır.
- **İstisnalar:** Yalnızca canlı durum gösterge noktası (pulse dot) tam yuvarlak (`9999px`) biçimindedir.

---

## 7. Temel Bileşen Standartları

- **Üst Gezinme Çubuğu (Navigation):** 64px sabit yükseklik, buzlu cam zemin, alt kenarlık çizgisi, sol tarafta logo, sağ tarafta monospace menü bağlantıları.
- **Proje Kartları:** İnce kömür kenarlık, üzerine gelindiğinde (hover) yukarı yönde 4px hafif yükselme ve altın rengi ışıma efekti.
- **Mimari Diyagramlar:** Önceden üretilmiş optimize SVG formatında satır içi sunum.
- **Görseller:** WebP formatı, tembel yükleme (lazy loading), kayma engelleme için sabit en-boy oranı.
- **Modal Panelleri:** Ekranı kaplayan yarı saydam zemin, en fazla 672px panel genişliği, dışına tıklamayla veya ESC tuşuyla kapanma.
- **İletişim Bölümü:** Kenarlıklı doğrudan bağlantı kartları ızgarası (form içermez).
