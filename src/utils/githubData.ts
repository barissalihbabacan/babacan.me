/**
 * Build sırasında /github-data.json dosyasından okunan GitHub istatistikleri ve katkı verisi.
 */
export interface ContributionDay {
  readonly date: string;
  readonly level: number;
}

export interface GithubData {
  /** Kişisel hesap + organizasyonlardaki fork olmayan repolar. */
  readonly repoCount?: number;
  readonly orgCount?: number;
  /** Dil -> bayt; HTML/CSS gibi işaretleme dilleri hariç. */
  readonly languages?: Readonly<Record<string, number>>;
  readonly contributions?: {
    readonly days: readonly ContributionDay[];
    readonly total: number;
  };
  readonly timestamp: number;
}

let cachedRequest: Promise<GithubData | null> | null = null;

/**
 * /github-data.json dosyasını tarayıcıda bir kez çeker ve önbelleğe alır.
 */
export function loadGithubData(): Promise<GithubData | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  cachedRequest ??= fetch("/github-data.json")
    .then((res) => (res.ok ? (res.json() as Promise<GithubData>) : null))
    .catch(() => null);

  return cachedRequest;
}
