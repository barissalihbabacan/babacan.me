import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import Button from "@/Components/Button";
import Tag from "@/Components/Tag";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";
import LineBreak from "@/Components/LineBreak";
import WritingExternalGlyph from "@/Components/WritingExternalGlyph";
import {
  AspectRatio,
  ButtonSize,
  ButtonVariant,
  Colors,
  DotPattern,
  FontSize,
  HeadingVariant,
  LayoutWidth,
  LetterSpacing,
  LineHeight,
  Opacity,
  TagSize,
  TagVariant,
  TextVariant,
  withOpacity,
} from "@/DesignSystem";

/** Kapak gradyanı: aydınlıktan en koyu yüzeye */
const COVER_GRADIENT = `linear-gradient(160deg, ${Colors.SurfaceBright} 0%, ${Colors.SurfaceContainerHigh} 30%, ${Colors.SurfaceContainer} 60%, ${Colors.SurfaceContainerLowest} 100%)`;

/** 20px karoda tek beyaz nokta; DotPattern.TileSize ile döşenir */
const DOT_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='1' fill='white'/%3E%3C/svg%3E\")";

export interface WritingProps {
  readonly currentLocale: Locale;
}

/**
 * Yayınlar / Roman Bölümü (Writing).
 * "Babaların Günahları / The Sins of the Fathers" romanı ve Everest İlk Roman Ödülü adaylığı detaylarını içerir.
 */
export default function Writing({ currentLocale }: WritingProps) {
  const isTr = currentLocale === "tr";
  const { writing } = UI_DICTIONARY;
  const book = writing.book;

  return (
    <Box
      as="section"
      id="writing"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-section-y overflow-hidden"
    >
      <Box className="section-ghost-number">03</Box>
      <Box className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <Box className="flex items-center gap-4 mb-vh-5">
          <Text as="span" variant={TextVariant.Label} className="text-label-xs text-on-surface-variant">
            {writing.sectionLabel[currentLocale]}
          </Text>
          <Box className="h-px flex-1 bg-primary/20" />
        </Box>

        <Heading
          level={2}
          variant={HeadingVariant.Display}
          className="mb-vh-5"
          style={{ fontSize: FontSize.SectionTitleFluid }}
        >
          {writing.title[currentLocale]}
        </Heading>

        <Box className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          {/* Kitap Kapağı Çizimi (Dekoratif) */}
          <Box className="relative max-w-xs" aria-hidden="true">
            <Box
              className="relative border border-primary/30 overflow-hidden rounded-sm"
              style={{ aspectRatio: AspectRatio.BookCover }}
            >
              {/* Gradyan Kapak */}
              <Box className="absolute inset-0" style={{ background: COVER_GRADIENT }} />
              {/* Noktalı Doku */}
              <Box
                className="absolute inset-0"
                style={{ backgroundImage: DOT_TEXTURE, backgroundSize: DotPattern.TileSize, opacity: DotPattern.Opacity }}
              />
              {/* Kapak İçeriği */}
              <Box className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <Box className="w-6 h-px mb-6" style={{ background: withOpacity(Colors.White, Opacity.Medium) }} />
                <Box
                  className="font-label-mono uppercase mb-3"
                  style={{
                    fontSize: FontSize.BookCoverCaption,
                    letterSpacing: LetterSpacing.Widest,
                    color: withOpacity(Colors.White, Opacity.Visible),
                  }}
                >
                  {isTr ? "Babaların" : "The Sins of"}
                </Box>
                <Box
                  className="font-bold leading-tight"
                  style={{
                    fontSize: FontSize.BookCoverTitleFluid,
                    color: Colors.White,
                    letterSpacing: LetterSpacing.Tight,
                  }}
                >
                  {isTr ? "Günahları" : "the Fathers"}
                </Box>
                <Box className="w-10 h-px my-5" style={{ background: withOpacity(Colors.White, Opacity.Soft) }} />
                <Box
                  className="font-label-mono uppercase"
                  style={{
                    fontSize: FontSize.BookCoverMicro,
                    letterSpacing: LetterSpacing.Spaced,
                    color: withOpacity(Colors.White, Opacity.Strong),
                    lineHeight: LineHeight.Loose,
                  }}
                >
                  {book.genre[currentLocale].split(" / ")[0]}
                  <LineBreak />
                  {book.genre[currentLocale].split(" / ")[1]}
                </Box>
                <Box
                  className="absolute bottom-10 font-label-mono uppercase tracking-widest"
                  style={{ fontSize: FontSize.BookCoverCaption, color: withOpacity(Colors.White, Opacity.Moderate) }}
                >
                  Barış Salih Babacan
                </Box>
              </Box>
            </Box>
            <Tag variant={TagVariant.Solid} size={TagSize.Medium} className="absolute -bottom-2 -right-2 shadow-md">
              {book.badge[currentLocale]}
            </Tag>
          </Box>

          {/* Kitap Bilgileri */}
          <Box className="space-y-6 pt-2">
            <Text as="span" variant={TextVariant.Label} className="text-label-xs text-primary">
              {book.genre[currentLocale]} · {book.status[currentLocale]}
            </Text>

            <Heading
              level={3}
              variant={HeadingVariant.Display}
              style={{ fontSize: FontSize.BookTitleFluid, lineHeight: LineHeight.Tight }}
            >
              {isTr ? (
                <>
                  Babaların
                  <LineBreak />
                  <Text as="em" className="text-on-surface-variant font-normal not-italic">Günahları</Text>
                </>
              ) : (
                <>
                  The Sins of
                  <LineBreak />
                  <Text as="em" className="text-on-surface-variant font-normal not-italic">the Fathers</Text>
                </>
              )}
            </Heading>

            <Text
              className="font-body-lg text-on-surface-variant leading-relaxed"
              style={{ maxWidth: LayoutWidth.ReadingMeasure }}
            >
              {book.desc[currentLocale]}
            </Text>

            <Box className="space-y-3">
              <Box className="flex items-center gap-3 text-on-surface-variant">
                <Box className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <Text as="span" className="text-sm font-body-md">{book.bullet1[currentLocale]}</Text>
              </Box>
              <Box className="flex items-center gap-3 text-on-surface-variant">
                <Box className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <Text as="span" className="text-sm font-body-md">{book.bullet2[currentLocale]}</Text>
              </Box>
              <Box className="flex items-center gap-3 text-on-surface-variant">
                <Box className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <Text as="span" className="text-sm font-body-md">{book.bullet3[currentLocale]}</Text>
              </Box>
            </Box>

            <Box className="flex flex-wrap gap-4 pt-2">
              <Button
                href="https://thesinsofthefathers.com/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=portfolio_direct"
                external
                variant={ButtonVariant.Filled}
                size={ButtonSize.Medium}
                icon={<WritingExternalGlyph />}
              >
                {book.visitSite[currentLocale]}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
