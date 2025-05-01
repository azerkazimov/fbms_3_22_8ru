"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n/locales";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LanguageSwitcher() {
    const params = useParams();
    const locale = params.locale as Locale;
    const pathname = usePathname();
    const router = useRouter();

    
const handleLanguageChange = useCallback((value: Locale)=>{
    const url = pathname.replace(/^\/(en|ru)/, '')
    router.push(`/${value}${url}`)
}, [pathname, router])


  return (
    <Select defaultValue={locale || 'ru'} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-fix">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="ru">Русский</SelectItem>
      </SelectContent>
    </Select>
  );
}
