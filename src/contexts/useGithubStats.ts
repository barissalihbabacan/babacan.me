/// <reference types="vite/client" />
import { useState, useEffect } from "react";

const CACHE_TTL = 1000 * 60 * 60 * 2; // 2 hours

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

async function fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as CacheEntry<T>;
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return parsed.data;
      }
    } catch {
      // Ignore parse errors
    }
  }

  const headers: Record<string, string> = {};
  // NOT: burada import.meta.env.VITE_GITHUB_TOKEN OKUNMAZ. VITE_ onekli degiskenler
  // istemci paketine gomulur; bir kisisel erisim tokenini her ziyaretciye gondermek olur.
  // Token yalnizca build sirasinda scripts/fetch-github-data.js tarafindan kullanilir ve
  // sonucu public/github-data.json olarak yayinlanir. Asagidaki localStorage yedegi
  // yalnizca gelistiricinin kendi tarayicisinda gecerlidir.
  const token = localStorage.getItem("GITHUB_TOKEN") ?? undefined;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    // If rate limited, try to use stale cache
    if (res.status === 403 || res.status === 429) {
      if (cached) {
        try {
          const stale = JSON.parse(cached) as CacheEntry<T>;
          console.warn("GitHub API rate limit exceeded. Using stale cache for", url);
          return stale.data;
        } catch {
          // fall through
        }
      }
    }
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const data = (await res.json()) as T;
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };
  localStorage.setItem(cacheKey, JSON.stringify(entry));
  return data;
}

interface GithubUser {
  followers: number;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface GithubStats {
  followers: number;
  repos: number;
  stars: number;
  forks: number;
}

export const useGithubStats = () => {
  const [stats, setStats] = useState<GithubStats>({ followers: 0, repos: 0, stars: 0, forks: 0 });
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Try local prebuilt github-data.json
      try {
        const ghRes = await fetch("/github-data.json");
        if (ghRes.ok) {
          const ghData = await ghRes.json();
          if (ghData?.user && Array.isArray(ghData?.repos) && ghData.repos.length > 0) {
            const reposData: GithubRepo[] = ghData.repos;
            const stars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
            const forks = reposData.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

            setStats({
              followers: ghData.user.followers || 0,
              repos: reposData.length,
              stars,
              forks,
            });

            const langs: Record<string, number> = {};
            reposData.forEach((repo) => {
              if (repo.language) {
                langs[repo.language] = (langs[repo.language] || 0) + 1;
              }
            });
            setLanguages(langs);
            setLoading(false);
            return;
          }
        }
      } catch {
        // fallback to direct API
      }

      const username = "barissalihbabacan";
      try {
        const userData = await fetchWithCache<GithubUser>(
          `https://api.github.com/users/${username}`,
          `gh_user_${username}`,
        );
        const reposData = await fetchWithCache<GithubRepo[]>(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          `gh_repos_full_${username}`,
        );

        if (Array.isArray(reposData)) {
          const stars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
          const forks = reposData.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

          setStats({
            followers: userData.followers || 0,
            repos: reposData.length,
            stars,
            forks,
          });

          const langs: Record<string, number> = {};
          reposData.forEach((repo) => {
            if (repo.language) {
              langs[repo.language] = (langs[repo.language] || 0) + 1;
            }
          });
          setLanguages(langs);
        }
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    void fetchStats();
  }, []);

  return { stats, languages, loading, error };
};

type RepoType = "personal" | "org-sins" | "org-osmos";

export type { GithubRepo, GithubStats, RepoType };
