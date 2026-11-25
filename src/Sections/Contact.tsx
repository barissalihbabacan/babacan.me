import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import Icon from "@/Components/Icon";
import ContactIconGlyph from "@/Components/ContactIconGlyph";
import Box from "@/Components/Box";
import RevealSection from "@/Components/RevealSection";
import GhostNumber from "@/Components/GhostNumber";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";
import { FontSize, HeadingVariant, TextVariant } from "@/DesignSystem";

export interface ContactProps {
  readonly currentLocale: Locale;
}

export default function Contact({ currentLocale }: ContactProps) {
  const { contact } = UI_DICTIONARY;

  const contactItems = [
    {
      icon: "mail" as const,
      label: contact.email[currentLocale],
      value: "barissalih@babacan.me",
      href: "mailto:barissalih@babacan.me",
      external: false,
    },
    {
      icon: "location_on" as const,
      label: contact.location[currentLocale],
      value: contact.locationValue[currentLocale],
      href: undefined,
      external: false,
    },
    {
      icon: "terminal" as const,
      label: "GitHub",
      value: "barissalihbabacan",
      href: "https://github.com/barissalihbabacan",
      external: true,
    },
    {
      icon: "link" as const,
      label: "LinkedIn",
      value: "barissalihbabacan",
      href: "https://linkedin.com/in/barissalihbabacan",
      external: true,
    },
  ];

  return (
    <RevealSection
      id="contact"
      className="relative border-t border-primary/30 py-16 md:py-20 overflow-hidden"
    >
      <GhostNumber>05</GhostNumber>
      <Box className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <Box className="flex items-center gap-4 mb-6">
          <Text as="span" variant={TextVariant.Label} className="text-label-xs text-on-surface-variant">
            {contact.sectionLabel[currentLocale]}
          </Text>
          <Box className="h-px flex-1 bg-primary/20" />
        </Box>

        <Box className="max-w-2xl">
          <Heading
            level={2}
            variant={HeadingVariant.Display}
            className="leading-display mb-4"
            style={{ fontSize: FontSize.SectionTitleFluid }}
          >
            {contact.title[currentLocale]}
          </Heading>
          <Text className="font-body-lg text-on-surface-variant text-sm leading-relaxed mb-8">
            {contact.desc[currentLocale]}
          </Text>
        </Box>

        {/* İletişim Kartları Izgarası */}
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 border border-primary/30 divide-y divide-primary/20 sm:border-0 sm:divide-y-0">
          {contactItems.map((item) => {
            const body = (
              <>
                <ContactIconGlyph
                  name={item.icon}
                  className="text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0"
                />
                <Box className="min-w-0 flex-1">
                  <Box className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest mb-0.5">
                    {item.label}
                  </Box>
                  <Box className="font-label-mono text-sm text-on-surface group-hover:text-primary transition-colors truncate">
                    {item.value}
                  </Box>
                </Box>
                {item.href && (
                  <Icon
                    name="arrow_forward"
                    className="w-4 h-4 text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                  />
                )}
              </>
            );

            if (item.href) {
              return (
                <TextLink
                  key={item.label}
                  href={item.href}
                  external={item.external}
                  className="group flex items-center gap-4 p-4 sm:border sm:border-primary/20 bg-surface-container/20 hover:border-primary/50 hover:bg-surface-container/40 transition-all"
                >
                  {body}
                </TextLink>
              );
            }

            return (
              <Box
                key={item.label}
                className="group flex items-center gap-4 p-4 sm:border sm:border-primary/20 bg-surface-container/20"
              >
                {body}
              </Box>
            );
          })}
        </Box>
      </Box>
    </RevealSection>
  );
}
