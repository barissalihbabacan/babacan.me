import { useState, useEffect } from "react";

const CACHE_TTL = 1000 * 60 * 60 * 2; // 2 hours

async function fetchWithCache(url, cacheKey) {
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  const headers = {};
  const token = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem("GITHUB_TOKEN");
  console.log("GitHub Token loaded:", token ? "YES (hidden)" : "NO");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    // If rate limited, try to use stale cache
    if (res.status === 403 || res.status === 429) {
      if (cached) {
        try {
          const { data } = JSON.parse(cached);
          console.warn("GitHub API rate limit exceeded. Using stale cache for", url);
          return data;
        } catch (e) {}
      }
    }
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const data = await res.json();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}

export const useGithubStats = () => {
  const [stats, setStats] = useState({ followers: 0, repos: 0, stars: 0, forks: 0 });
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const username = "barissalihbabacan";
      try {
        const userData = await fetchWithCache(
          `https://api.github.com/users/${username}`,
          `gh_user_${username}`,
        );
        const reposData = await fetchWithCache(
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

          const langs = {};
          reposData.forEach((repo) => {
            if (repo.language) {
              langs[repo.language] = (langs[repo.language] || 0) + 1;
            }
          });
          setLanguages(langs);
        }
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, languages, loading, error };
};

export const useGithubRepos = (type) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(false);

      let url = "";
      if (type === "personal") {
        url = "https://api.github.com/users/barissalihbabacan/repos?sort=updated&per_page=6";
      } else if (type === "org-sins") {
        url = "https://api.github.com/orgs/thesinsofthefathers/repos?sort=updated&per_page=6";
      } else if (type === "org-osmos") {
        url = "https://api.github.com/orgs/Osmos-App/repos?sort=updated&per_page=6";
      }

      if (!url) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchWithCache(url, `gh_repos_${type}`);
        if (Array.isArray(data)) {
          setRepos(data.slice(0, 6));
        } else {
          setRepos([]);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [type]);

  return { repos, loading, error };
};
