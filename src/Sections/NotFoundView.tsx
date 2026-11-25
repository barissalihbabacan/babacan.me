import { ButtonSize, ButtonVariant, HeadingVariant, TextVariant } from "@/DesignSystem";
import Button from "@/Components/Button";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";

/**
 * 404 sayfasının içeriği. Dil öneki olmayan bir adreste açıldığı için metinler iki dilde birlikte yazılır.
 */
export default function NotFoundView() {
  return (
    <Box className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      <Box
        as="nav"
        aria-label="Breadcrumb"
        className="mb-8 font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2"
      >
        <TextLink href="/tr" className="hover:text-primary transition-colors">
          Ana Sayfa
        </TextLink>
        <Text as="span" aria-hidden="true">/</Text>
        <Text as="span" className="text-primary">404</Text>
      </Box>

      <Box as="header" className="border-b border-primary/30 pb-10 mb-12">
        <Text variant={TextVariant.Label} className="text-sm text-primary mb-4">
          404 — Sayfa Bulunamadı / Page Not Found
        </Text>
        <Heading level={1} variant={HeadingVariant.PageTitle} className="mb-6">
          Bu adres mevcut değil / Page Not Found
        </Heading>
        <Text variant={TextVariant.Lead} className="max-w-2xl">
          Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.
        </Text>
      </Box>

      <Box className="flex flex-wrap gap-4">
        <Button href="/tr" variant={ButtonVariant.Filled} size={ButtonSize.Large}>
          Ana Sayfa
        </Button>
        <Button href="/tr/projeler" variant={ButtonVariant.Muted} size={ButtonSize.Large}>
          Projeler
        </Button>
      </Box>
    </Box>
  );
}
