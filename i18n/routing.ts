export const routing = {
  locales: ["ar", "fr"] as const,
  defaultLocale: "ar" as const,
};

export type Locale = (typeof routing.locales)[number];
