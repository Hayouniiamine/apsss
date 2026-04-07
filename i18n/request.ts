import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestLocaleValue = await requestLocale;
  const locale =
    requestLocaleValue && routing.locales.includes(requestLocaleValue as any)
      ? requestLocaleValue
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Africa/Algiers',
    now: new Date(),
  };
});
