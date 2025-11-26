import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', shortCode: 'VN' },
  { code: 'en', label: 'English', flag: '🇺🇸', shortCode: 'US' },
] as const;

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language || 'vi';
  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center",
            "px-3 py-1.5 h-9 text-sm font-medium transition-all",
            "text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]",
            "hover:bg-[rgba(143,171,212,0.1)]",
            "border border-transparent hover:border-[rgba(143,171,212,0.3)]",
            "rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
          aria-label={t('common.language')}
        >
          <span className="font-semibold text-[var(--color-dark-blue)]">{currentLang.shortCode}</span>
          <svg
            className="ml-2 h-3.5 w-3.5 text-[var(--color-dark-blue)] transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={cn(
          "w-44 bg-white border border-gray-200 shadow-xl",
          "rounded-lg p-1.5",
          "min-w-[11rem]"
        )}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "cursor-pointer px-3 py-2.5 text-sm rounded-md",
              "transition-colors duration-150",
              "hover:bg-[var(--color-light-blue)]/15",
              "focus:bg-[var(--color-light-blue)]/15",
              "focus:outline-none",
              currentLanguage === lang.code && cn(
                "bg-[var(--color-light-blue)]/20",
                "font-medium"
              )
            )}
          >
            <span className="mr-3 text-lg leading-none flex-shrink-0">{lang.flag}</span>
            <span className={cn(
              "flex-1 text-[var(--color-dark-blue)]",
              currentLanguage === lang.code && "font-semibold"
            )}>
              {lang.label}
            </span>
            {currentLanguage === lang.code && (
              <svg
                className="ml-auto h-4 w-4 text-[var(--color-dark-blue)] flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

