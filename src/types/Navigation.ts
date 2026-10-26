import type { LocalizedText } from "@/i18n";

/**
 * Gezinme çubuğu (navigation) menü öğesi modeli.
 */
export interface NavItem {
  readonly id: string;
  readonly href: string;
  readonly label: LocalizedText;
  readonly isExternal?: boolean;
}

/**
 * İletişim ve sosyal ağ bağlantıları modeli.
 */
export interface SocialLink {
  readonly platform: string;
  readonly url: string;
  readonly label: LocalizedText;
  readonly handle: string;
}
