import { NextRequest, NextResponse } from "next/server";

const locales = ["ar", "fr"];
const defaultLocale = "ar";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal/static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
