"use client";

import { useState, useEffect } from "react";
import CustomGithubCalendar from "./CustomGithubCalendar";
import { loadGithubData, type GithubData } from "@/Utils/githubData";
import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import { PROJECT_DATA, type ProjectKey } from "@/Data/projectsData";
import Icon from "@/Components/Icon";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";
import List from "@/Components/List";
import ListItem from "@/Components/ListItem";
import GithubActivityContributionsGlyph from "@/Components/GithubActivityContributionsGlyph";
import GithubActivityExternalGlyph from "@/Components/GithubActivityExternalGlyph";
import LatinText from "@/Components/LatinText";
import { FontSize, HeadingVariant, TextVariant } from "@/DesignSystem";

// Kodu herkese açık projeler; kartları Projeler bölümünde, burada repo linkleri yer alır
const OPEN_SOURCE: readonly ProjectKey[] = ["osmos", "mythos"];

export interface GithubActivityProps {
  readonly currentLocale: Locale;
}

export default function GithubActivity({ currentLocale }: GithubActivityProps) {
  const isTr = currentLocale === "tr";
  const { github } = UI_DICTIONARY;
  const [data, setData] = useState<GithubData | null>(null);

  useEffect(() => {
    void loadGithubData().then((res) => {
      if (res) setData(res);
    });
  }, []);

  const languages = data?.languages ?? {};
  const langEntries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const totalBytes = langEntries.reduce((acc, [, bytes]) => acc + bytes, 0);

  return (
    <Box
      as="section"
      id="opensource"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-section-y overflow-hidden"
    >
      <Box className="section-ghost-number">02</Box>
      <Box className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <Box className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-vh-4">
          <Box className="flex-1">
            <Box className="flex items-center gap-4 mb-4">
              <Text as="span" variant={TextVariant.Label} className="text-label-xs text-on-surface-variant">
                <LatinText text={github.sectionLabel[currentLocale]} />
              </Text>
              <Box className="h-px flex-1 bg-primary/20 max-w-xs" />
            </Box>
            <Heading
              level={2}
              variant={HeadingVariant.Display}
              className="mb-2"
              style={{ fontSize: FontSize.SectionTitleFluid }}
            >
              {github.title[currentLocale]}
            </Heading>
            <Box className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2">
              <GithubActivityContributionsGlyph />
              {github.contributionsLabel[currentLocale]}
            </Box>
          </Box>
          <TextLink
            href="https://github.com/barissalihbabacan"
            external
            className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant hover:text-primary transition-colors border border-primary/20 hover:border-primary/50 px-4 py-2"
          >
            <Text as="span">github.com/barissalihbabacan</Text>
            <GithubActivityExternalGlyph />
          </TextLink>
        </Box>

        <Box className="flex flex-col gap-8">
          <Box className="space-y-8">
            <Box>
              <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-label-xs text-on-surface-variant mb-3">
                {github.featured[currentLocale]}
              </Heading>
              <List className="flex flex-wrap gap-3">
                {OPEN_SOURCE.map((slug) => {
                  const url = PROJECT_DATA[slug]?.githubUrl ?? "";
                  return (
                    <ListItem key={slug}>
                      <TextLink
                        href={url}
                        external
                        aria-label={`${url.replace("https://github.com/", "")} — ${github.viewRepo[currentLocale]}`}
                        className="inline-flex items-center gap-2 min-h-9 px-3 border border-primary/30 hover:border-primary/60 font-label-mono text-xs text-on-surface hover:text-primary transition-colors"
                      >
                        <Text as="span" lang="en">{url.replace("https://github.com/", "")}</Text>
                        <Icon name="north_east" className="w-3.5 h-3.5 text-on-surface-variant" />
                      </TextLink>
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            <Box className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Box className="p-4 border border-primary/20 bg-surface-container/20">
                <Box className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-1">
                  {github.publicRepos[currentLocale]}
                </Box>
                <Box className="text-2xl font-bold text-on-surface font-display-lg">
                  {data?.repoCount !== undefined ? data.repoCount : "—"}
                </Box>
              </Box>

              <Box className="p-4 border border-primary/20 bg-surface-container/20">
                <Box className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-1">
                  {github.organizations[currentLocale]}
                </Box>
                <Box className="text-2xl font-bold text-on-surface font-display-lg">
                  {data?.orgCount !== undefined ? data.orgCount : "—"}
                </Box>
              </Box>

              <Box className="p-4 border border-primary/20 bg-surface-container/20">
                <Box className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-1">
                  {github.yearContributions[currentLocale]}
                </Box>
                <Box className="text-2xl font-bold text-on-surface font-display-lg">
                  {data?.contributions?.total !== undefined
                    ? data.contributions.total.toLocaleString(isTr ? "tr-TR" : "en-US")
                    : "—"}
                </Box>
              </Box>
            </Box>

            {/* GitHub Katkı Takvimi */}
            <Box className="p-4 sm:p-6 border border-primary/20 bg-surface-container/20">
              <CustomGithubCalendar lang={currentLocale} />
            </Box>

            {/* Dil Dağılımı */}
            {totalBytes > 0 && (
              <Box className="p-4 sm:p-6 border border-primary/20 bg-surface-container/20">
                <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-label-xs text-on-surface-variant mb-4">
                  {github.langDist[currentLocale]}
                </Heading>

                {/* Yığılmış Dil Çubuğu */}
                <Box className="h-3 w-full rounded-xs overflow-hidden flex bg-surface-container-highest mb-4">
                  {langEntries.slice(0, 6).map(([langName, bytes]) => {
                    const percentage = (bytes / totalBytes) * 100;
                    return (
                      <Box
                        key={langName}
                        title={`${langName}: %${percentage.toFixed(1)}`}
                        style={{ width: `${percentage}%` }}
                        className="h-full border-r border-background first:rounded-l-xs last:rounded-r-xs opacity-90 transition-opacity hover:opacity-100"
                        data-lang={langName}
                      />
                    );
                  })}
                </Box>

                {/* Dil Lejantı */}
                <Box className="flex flex-wrap gap-4 text-xs font-label-mono text-on-surface-variant">
                  {langEntries.slice(0, 6).map(([langName, bytes]) => {
                    const percentage = (bytes / totalBytes) * 100;
                    return (
                      <Box key={langName} className="flex items-center gap-2">
                        <Text as="span" className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <Text as="span" className="text-on-surface font-medium">{langName}</Text>
                        <Text as="span" className="text-on-surface-variant/70">%{percentage.toFixed(1)}</Text>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
