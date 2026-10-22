import fs from "fs";
import path from "path";

const GITHUB_USER = "barissalihbabacan";
// Osmos, Mythos ve Chorus kisisel hesapta degil, kendi organizasyonlarinda.
const GITHUB_ORGS = ["Osmos-App", "Mythos-IDE", "joinchorus"];
// Dil dagilimina yalnizca programlama dilleri girer; isaretleme/stil dosyalari
// (ozellikle statik web siteleri) oranlari carpitiyordu.
const NON_CODE_LANGUAGES = new Set(["HTML", "CSS", "SCSS", "Dockerfile", "Makefile", "Shell"]);
// Oneksiz GITHUB_TOKEN tercih edilir; VITE_ onekli degiskenler istemci paketine
// gomulebilir, bu yuzden token icin kullanilmamalidir (geri uyumluluk icin hala okunur).
const token = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
const headers = token
  ? { Authorization: `token ${token}`, "User-Agent": "babacan.me-build-script" }
  : { "User-Agent": "babacan.me-build-script" };

async function fetchGitHubData() {
  // Statik varlik kaynagina yazilir: vite build "public/" dizinini
  // emptyOutDir ile sildigi icin dogrudan oraya yazmak sonucsuz kalirdi.
  const outputDir = path.resolve("src/public");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const targetFile = path.join(outputDir, "github-data.json");

  try {
    console.log("Fetching GitHub repository lists...");
    const owners = [`users/${GITHUB_USER}`, ...GITHUB_ORGS.map((org) => `orgs/${org}`)];
    const repoLists = await Promise.all(
      owners.map(async (owner) => {
        const res = await fetch(`https://api.github.com/${owner}/repos?per_page=100`, { headers });
        if (!res.ok) throw new Error(`Repos API failed for ${owner}: ${res.status}`);
        return res.json();
      }),
    );
    // Fork'lar baskasinin kodu; .github ve profil README repolari kod icermez.
    // Token org uyeligiyle ozel repolari da gorebilir; sitede yalnizca acik repolar sayilir.
    const repos = repoLists
      .flat()
      .filter(
        (repo) =>
          !repo.private && !repo.fork && repo.name !== ".github" && repo.name !== GITHUB_USER,
      );

    console.log(`Fetching languages for ${repos.length} repositories...`);
    const languages = {};
    // Tek bir reponun hatasi tum veriyi dusurmesin; hepsi basarisizsa (orn. hiz siniri)
    // eksik oranlar yazmak yerine mevcut dosya korunur.
    let failedRepos = 0;
    for (const repo of repos) {
      const res = await fetch(repo.languages_url, { headers });
      if (!res.ok) {
        failedRepos++;
        console.warn(`Languages API failed for ${repo.full_name}: ${res.status}`);
        continue;
      }
      for (const [name, bytes] of Object.entries(await res.json())) {
        if (!NON_CODE_LANGUAGES.has(name)) languages[name] = (languages[name] ?? 0) + bytes;
      }
    }
    if (repos.length > 0 && failedRepos === repos.length) {
      throw new Error("Languages API failed for every repository");
    }

    console.log("Fetching GitHub contribution calendar...");
    let contributions = { days: [], total: 0 };
    try {
      const contribRes = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
        headers,
      });
      if (contribRes.ok) {
        const html = await contribRes.text();
        const dayMatches = [...html.matchAll(/data-date="([^"]+)".*?data-level="(\d+)"/g)];
        // GitHub tabloyu satir satir (once tum pazarlar, sonra pazartesiler...) verir;
        // takvim gunleri sirayla 7'li haftalara boldugu icin tarihe gore siralanmali.
        const days = dayMatches
          .map((m) => ({ date: m[1], level: parseInt(m[2], 10) || 0 }))
          .sort((a, b) => a.date.localeCompare(b.date));

        const totalMatch = html.match(/([\d,]+)\s+contributions/i);
        const total = totalMatch
          ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
          : days.reduce((acc, d) => acc + (d.level > 0 ? d.level * 2 : 0), 0);
        contributions = { days, total };
      }
    } catch (cErr) {
      console.warn("Contribution fetch note:", cErr);
    }

    // Yalnizca istemcinin kullandigi alanlar (bkz. src/contexts/githubData.ts);
    // tam API yaniti ~120 KB tutuyordu.
    const data = {
      repoCount: repos.length,
      orgCount: GITHUB_ORGS.length,
      languages,
      contributions,
      timestamp: Date.now(),
    };

    fs.writeFileSync(targetFile, JSON.stringify(data));
    console.log("Successfully saved GitHub data to src/public/github-data.json");
  } catch (err) {
    console.warn("GitHub API rate limit or network warning:", err.message);
    if (!fs.existsSync(targetFile)) {
      fs.writeFileSync(targetFile, JSON.stringify({ timestamp: Date.now() }, null, 2));
    }
    console.log("Preserved src/public/github-data.json for build continuity.");
  }
}

void fetchGitHubData();
