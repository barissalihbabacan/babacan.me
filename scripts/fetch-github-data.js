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

    const data = {
      user,
      repos,
      orgs: {
        "org-sins": sinsRepos,
        "org-osmos": osmosRepos,
      },
      timestamp: Date.now(),
    };

    const outputDir = path.resolve("public");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(path.join(outputDir, "github-data.json"), JSON.stringify(data, null, 2));
    console.log("Successfully saved GitHub data to public/github-data.json");
  } catch (err) {
    console.error("Failed to fetch GitHub data:", err);
    process.exit(1);
  }
}

fetchGitHubData();
