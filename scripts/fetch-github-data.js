import fs from "fs";
import path from "path";

const GITHUB_USER = "barissalihbabacan";
const token = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const headers = token ? { Authorization: `token ${token}` } : {};

async function fetchGitHubData() {
  try {
    console.log("Fetching GitHub user data...");
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers });
    if (!userRes.ok) throw new Error(`User API failed: ${userRes.status}`);
    const user = await userRes.json();

    console.log("Fetching GitHub repository list...");
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=stars&per_page=100`,
      { headers },
    );
    if (!reposRes.ok) throw new Error(`Repos API failed: ${reposRes.status}`);
    const repos = await reposRes.json();

    console.log("Fetching org repositories (thesinsofthefathers)...");
    const sinsRes = await fetch(
      `https://api.github.com/orgs/thesinsofthefathers/repos?sort=stars&per_page=30`,
      { headers },
    );
    const sinsRepos = sinsRes.ok ? await sinsRes.json() : [];

    console.log("Fetching org repositories (Osmos-App)...");
    const osmosRes = await fetch(
      `https://api.github.com/orgs/Osmos-App/repos?sort=stars&per_page=30`,
      { headers },
    );
    const osmosRepos = osmosRes.ok ? await osmosRes.json() : [];

    console.log("Fetching GitHub contribution calendar...");
    let contributions = { days: [], total: 0 };
    try {
      const contribRes = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`);
      if (contribRes.ok) {
        const html = await contribRes.text();
        const dayMatches = [...html.matchAll(/data-date="([^"]+)".*?data-level="(\d+)"/g)];
        const days = dayMatches.map((m) => ({ date: m[1], level: parseInt(m[2], 10) || 0 }));

        const totalMatch = html.match(/([\d,]+)\s+contributions/i);
        const total = totalMatch
          ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
          : days.reduce((acc, d) => acc + (d.level > 0 ? d.level * 2 : 0), 0);
        contributions = { days, total };
      }
    } catch (cErr) {
      console.warn("Contribution fetch note:", cErr);
    }

    const data = {
      user,
      repos,
      orgs: {
        "org-sins": sinsRepos,
        "org-osmos": osmosRepos,
      },
      contributions,
      timestamp: Date.now(),
    };

    const outputDir = path.resolve("public");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outputDir, "github-data.json"), JSON.stringify(data, null, 2));
    console.log("Successfully saved GitHub data to public/github-data.json");
  } catch (err) {
    console.error("Failed to fetch GitHub data:", err);
    process.exit(1);
  }
}

void fetchGitHubData();
