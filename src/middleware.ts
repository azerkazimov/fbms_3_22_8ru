import { getToken } from "next-auth/jwt";
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n/locales";

const intlMiddleware = createIntlMiddleware({
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: true,
    localePrefix: 'always'
})

const authPages = [
    "/auth/signin",
    "/auth/signup",
    "/auth/register"
]


export default async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl

    const pathnameSegment = pathname.split("/").filter(Boolean)
    const locale = pathnameSegment[0]

    if (pathname === "/") {
        return NextResponse.redirect(new URL(locale, req.url))
    }

    const isValidLocale = locales.includes(locale as any)

    if (!isValidLocale && pathname !== "/") {
        return NextResponse.redirect(new URL(`/${locales[0]}`, req.url)) // default to first locale => ["en"]
    }

    if (isValidLocale) {
        const pathWithoutLocale = "/" + pathnameSegment.slice(1).join("/")
        const isAuthPage = authPages.includes(pathWithoutLocale)

        // If user is already authenticated and trying to access auth pages,
        // redirect to the homepage with the current locale
        if (isAuthPage) {
            const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

            if (session?.email) {
                if (isAuthPage) {
                    return NextResponse.redirect(new URL(`/${locale}`, req.url))
                }
            }
        }
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!api|_next|public|.*\\..*).*)'],

};