/// <reference types="vite/client" />
import { useState, useEffect } from "react";
import { loadGithubData } from "./githubData.ts";

interface GithubStats {
  repos: number;
  orgs: number;
  /** Son 1 yildaki katki sayisi. */
  contributions: number;
}

/**
 * Build sirasinda uretilen /github-data.json'dan repo sayisi ve dil dagilimi.
 * Canli API yedegi yok: kullanici repolari endpoint'i fork'lari ve organizasyonlari
 * ayirt etmedigi icin yaniltici oranlar uretiyordu.
 */
export const useGithubStats = () => {
  // null: veri dosyasi yok ya da eski formatta; sayilar "0" yerine "—" gosterilir.
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadGithubData().then((data) => {
      if (data?.languages) {
        setStats({
          repos: data.repoCount ?? 0,
          orgs: data.orgCount ?? 0,
          contributions: data.contributions?.total ?? 0,
        });
        setLanguages(data.languages);
      }
      setLoading(false);
    });
  }, []);

  return { stats, languages, loading };
};

export type { GithubStats };
