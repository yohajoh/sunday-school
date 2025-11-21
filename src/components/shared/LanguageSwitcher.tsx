import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Check, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "en" as const, name: "English", nativeName: "English" },
    { code: "am" as const, name: "Amharic", nativeName: "አማርኛ" },
    { code: "om" as const, name: "Oromo", nativeName: "Afaan Oromoo" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl min-w-0 p-2 lg:px-3"
        >
          <Languages className="h-4 w-4" />
          <span className="sr-only lg:not-sr-only lg:ml-2 lg:inline-block">
            {languages.find((lang) => lang.code === language)?.nativeName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl p-2 min-w-[140px] z-50"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 text-sm ${
              language === lang.code
                ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span className="font-medium">{lang.nativeName}</span>
            {language === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
