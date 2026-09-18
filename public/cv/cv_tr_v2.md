# Barış Salih Babacan

**Sistem Mühendisi — Rust · Go · Swift**

İstanbul, Türkiye (uzaktan çalışmaya açık, AB/ABD saat dilimi örtüşmesi) | +90 543 897 5759 | barissalih@babacan.me
linkedin.com/in/barissalihbabacan | github.com/barissalihbabacan | babacan.me

---

### ÖZET

Rust ile yerel-öncelikli altyapı geliştiren; gömülü sistemler, ağ protokolü tersine mühendisliği ve native uygulamalar alanlarında üretim deneyimi olan sistem mühendisi. App Store'da 2.1 sürümüne ulaşan oyun temelli öğrenme platformu Sortify'ı yayına aldı; üç TV üreticisinin kontrol arayüzlerini tersine mühendislikle çözerek Android için bir kumanda uygulaması geliştirdi; üç eğitim-öğretim yılı boyunca günlük 120–150 kullanıcıya hizmet veren donanımlı bir geçiş kontrol sistemi teslim etti.

### YETKİNLİKLER

- **Sistemler & Protokoller:** Rust, içerik-adresli depolama (BLAKE3), Unix domain socket, JSON-RPC, IPC ve sidecar süreçler, HTTP Digest kimlik doğrulama, mDNS/DIAL cihaz keşfi, seri iletişim ve gömülü sistemler (Arduino), Git iç yapısı
- **Diller:** Rust, Swift, Go, TypeScript, JavaScript, C++, Python, SQL
- **Apple & Masaüstü:** SwiftUI, MVVM, Swift Package Manager, Tauri, App Store yayın süreci
- **Arka Uç & Web:** Node.js, Express, Go (net/http), React, Next.js, Firebase (Firestore, Functions, Auth), MongoDB, SQLite
- **Pratik & Araçlar:** Git, GitHub Actions CI, code review süreçleri, birim testi ve benchmark, Wireshark, Linux

### İŞ DENEYİMİ

**CTO & Baş Geliştirici** | _Garage.ist_ | Eki 2024 – Devam ediyor
_Tüketiciye yönelik iOS ve Android uygulamaları geliştiren ürün stüdyosu._

- 3–13 yaş arası çocuklar için veli ve öğretmen gözetim araçları içeren oyun temelli öğrenme uygulaması **Sortify**'ın geliştirilmesini yönetiyorum (SwiftUI + MVVM + Firebase); 540'ı aşkın commit ile **App Store'da v2.1** sürümünde.
- Kod tabanını core, auth, education, games, subscription ve chessboard olmak üzere altı şirket içi Swift paketine ayırdım; abonelik, push bildirim ve analitik entegrasyonlarını kurdum.
- İki kişilik geliştirici ekibiyle geliştirmeyi yönettim; main dalına doğrudan push'u ve kendi PR'ını merge etmeyi engelleyen CI kuralları ile code review disiplinini işlettim.
- Samsung (Tizen), LG (webOS) ve Philips TV'lerin kontrol arayüzlerini Wireshark ve curl ile tersine mühendislik yaparak çözümledim ve yayına alınan Android kumanda uygulaması **+TV**'yi geliştirdim.
- Hazır SDK bulunmayan Philips için istemciyi sıfırdan yazdım: 401 challenge–response akışı üzerinden HTTP Digest kimlik doğrulama, durum makinesi olarak modellenmiş PIN tabanlı cihaz eşleştirme ve kendinden imzalı sertifikalar için TLS yönetimi.
- Dört ek iOS oyununu (RuleSort, Block Nest, Water Sort, Guess the City) yayın sürümüne taşıdım.

**IT ve Sistem Entegrasyon Stajyeri** | _ENLOG, İstanbul_ | Eyl 2023 – Haz 2024

- Lise öğrenimimle birlikte ağ operasyonları, teknik destek ve kurum içi BT altyapısı süreçlerini yürüttüm.

### PROJELER

- **Chorus — anonim tartışma motoru** | _Go, React, Git_ | github.com/joinchorus/chorus
  Her konu ve mesajı değişmez bir Git commit'i olarak saklayan, bağımlılıklarında hiçbir veritabanı bulunmayan açık kaynaklı bir forum geliştirdim ve sürdürüyorum. Kullanıcı hesapları yerine konuya özgü geçici kimlikler kullanılıyor. `v0.1.0-alpha` sürümünde uç nokta bazında ayarlanmış IP token-bucket rate limiting, loglar ve hata yanıtları boyunca `X-Request-ID` korelasyonu ve devam eden Git yazma işlemlerini kesmeyen 10 saniyelik graceful shutdown yer alıyor. 24 test ve Git tabanlı depolamanın maliyetini ölçen 5 benchmark.

- **Osmos — yerel-öncelikli sürüm kontrol motoru** | _Rust, Tauri, React_ | github.com/Osmos-App/osmos-core
  Üç crate'lik bir Rust workspace tasarladım: BLAKE3 ile anahtarlanan içerik-adresli nesne deposu ve akış tabanlı dosya hash'leme, SQLite destekli ağaç indeksi ve on tipli komutu (init, status, branch, switch, merge, commit) UUID korelasyonlu istek/yanıt protokolü üzerinden sunan bir Unix-socket daemon'ı. **Sıfır `unsafe` blok.** Tauri/React masaüstü istemcisi erken aşamada; eşler arası senkronizasyon planlandı, transport crate'i hazırlandı ancak henüz uygulanmadı.

- **Mythos — romancılar için yerel-öncelikli IDE** | _Rust, Tauri, TypeScript_ | github.com/Mythos-IDE/mythoside-core
  Altı crate'e yayılan, taslakları diskte Markdown + YAML olarak modelleyen ve stdio üzerinden 13 JSON-RPC metodu sunan bağımsız bir Rust motoru geliştirdim; Tauri/React istemcisi bu motoru sidecar süreç olarak yönetiyor. Tipler Rust'tan TypeScript'e üretiliyor, böylece IPC sınırı tip güvenli kalıyor. **82 test.**

- **Q-PASS — RFID geçiş kontrol sistemi** | _C++, Arduino, Python, PHP, MySQL_
  Bir kamu kurumu için uçtan uca donanım-yazılım sistemi teslim ettim: özel tasarım 3D baskı okuyucu üniteleri içinde, seri iletişim üzerinden web arka ucuna bağlanan C++ mikrodenetleyici yazılımı. **Üç eğitim-öğretim yılı boyunca günlük 120–150 kişiye hizmet vererek** kantin geçişi ve yemek takibini sağladı.

- **IT-RMS — BT kaynak yönetim sistemi** | _Node.js, Express, MongoDB, EJS_
  Mezun olduğum meslek lisesinin BT bölümü için varlık yönetim sistemini, lise 3. sınıfta 2023'te başlayarak 249 commit boyunca geliştirdim: çok şubeli envanter ve barkod üretimi, PDF raporlama, denetim kaydı ve beş rollü kullanıcı modeli. 2026'da projeye dönerek **üretimdeki kod tabanını PHP/MySQL'den Express 5 + MongoDB'ye taşıdım**; eski sürümü ayrı bir dalda koruyarak yapıyı lint, girdi doğrulama ve güvenlik başlıkları içeren MVC mimarisine dönüştürdüm.

### EĞİTİM

**İstanbul Üniversitesi** (Açık ve Uzaktan Eğitim Fakültesi) | _Bilgisayar Programcılığı, Önlisans_ | 2024 – Devam ediyor

**Haydarpaşa Mesleki ve Teknik Anadolu Lisesi** | _Ağ İşletmenliği ve Siber Güvenlik_ | 2020 – 2024
