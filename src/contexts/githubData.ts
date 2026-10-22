/**
 * Build sirasinda scripts/fetch-github-data.js tarafindan uretilen
 * /github-data.json dosyasinin bicimi. Script yalnizca bu alanlari yazar.
 */
export interface ContributionDay {
  date: string;
  level: number;
}

export interface GithubData {
  /** Kisisel hesap + organizasyonlardaki fork olmayan repolar. */
  repoCount?: number;
  orgCount?: number;
  /** Dil -> bayt; HTML/CSS gibi isaretleme dilleri haric. */
  languages?: Record<string, number>;
  contributions?: { days: ContributionDay[]; total: number };
  timestamp: number;
}

let request: Promise<GithubData | null> | null = null;

/** Dosyayi bir kez ceker; useGithubStats ve CustomGithubCalendar ayni istegi paylasir. */
export function loadGithubData(): Promise<GithubData | null> {
  request ??= fetch("/github-data.json")
    .then((res) => (res.ok ? (res.json() as Promise<GithubData>) : null))
    .catch(() => null);
  return request;
}
