import LocaleRedirect from "@/Components/LocaleRedirect";

/**
 * Kök (/) sayfa bileşeni: ziyaretçiyi /tr ya da /en sayfasına yönlendirir.
 */
export default function RootPage() {
  return <LocaleRedirect />;
}
