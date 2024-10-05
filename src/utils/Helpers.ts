import { AppConfig } from "./AppConfig";

export const formatEmailHide = (email: string) => {
  if (!email) return null;
  const [localPart = "", domain = ""] = email.split("@");
  const maskedLocal = `${localPart[0]}${"*".repeat(localPart.length - 1)}`;
  const maskedDomain = `${"*".repeat(domain.length)}`;
  return `${maskedLocal}@${maskedDomain}`;
};

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === AppConfig.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};
