import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"
import { vi, enUS } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { motion, AnimatePresence } from "framer-motion"

interface DatePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  locale?: "vi" | "en"
  label?: string
  variant?: "default" | "light" // light for light backgrounds, default for white backgrounds
  dateFormat?: string // Custom date format (default: "PPP" for long format, can use "dd/MM/yyyy" for short)
  minDate?: Date // Minimum selectable date (to prevent selecting past dates)
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "Select date",
  disabled = false,
  className,
  locale = "en",
  label,
  variant = "default",
  dateFormat,
  minDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const dateLocale = locale === "vi" ? vi : enUS
  const isLight = variant === "light"
  // Default format: "PPP" for long format, but can be overridden
  const formatString = dateFormat || "PPP"

  return (
    <div className={cn(label ? "space-y-1.5" : "", className)}>
      {label && (
        <label className={cn(
          "text-xs font-semibold uppercase tracking-wider pl-1",
          isLight ? "text-white/80" : "text-[var(--color-dark-blue)]/70"
        )}>
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full h-11 justify-between font-normal rounded-xl transition-all min-w-0",
              isLight
                ? cn(
                    "bg-white/10 border-white/20 text-white hover:bg-white/20 focus:bg-white/20 focus:border-white/30",
                    !date && "text-white/50"
                  )
                : cn(
                    "bg-white/50 border-[var(--color-light-blue)]/30 hover:bg-white focus:bg-white focus:border-[var(--color-dark-blue)]",
                    !date && "text-muted-foreground"
                  )
            )}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <CalendarIcon className={cn(
                "h-5 w-5 flex-shrink-0",
                isLight ? "text-white/70" : "text-[var(--color-light-blue)]"
              )} />
              <AnimatePresence mode="wait">
                {date ? (
                  <motion.span
                    key={date.toISOString()}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className={cn("text-sm truncate min-w-0 flex-1", isLight && "text-white")}
                  >
                    {format(date, formatString, { locale: dateLocale })}
                  </motion.span>
                ) : (
                  <motion.span
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn("text-sm truncate min-w-0 flex-1", isLight && "text-white/50")}
                  >
                    {placeholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <ChevronDownIcon className={cn(
              "h-4 w-4",
              isLight ? "text-white/50" : "opacity-50"
            )} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-xl rounded-2xl ring-1 ring-[var(--color-dark-blue)]/10 overflow-visible z-[100] [&_.rdp-dropdown_root:has-focus]:ring-0 [&_.rdp-dropdown_root:has-focus]:shadow-none [&_.rdp-dropdown_root:has-focus]:outline-none [&_.rdp-dropdown_root:focus-within]:ring-0 [&_.rdp-dropdown_root:focus-within]:shadow-none [&_.rdp-dropdown_root:focus-within]:outline-none [&_.rdp-dropdown_root_select]:focus:outline-none [&_.rdp-dropdown_root_select]:focus:ring-0 [&_.rdp-dropdown_root_select]:focus:shadow-none [&_.rdp-dropdown_root_select]:focus-visible:outline-none [&_.rdp-dropdown_root_select]:focus-visible:ring-0 [&_.rdp-button_previous]:focus:ring-0 [&_.rdp-button_previous]:focus:outline-none [&_.rdp-button_previous]:focus-visible:ring-0 [&_.rdp-button_next]:focus:ring-0 [&_.rdp-button_next]:focus:outline-none [&_.rdp-button_next]:focus-visible:ring-0"
          align="start"
          sideOffset={8}
          side="bottom"
          avoidCollisions={true}
          collisionPadding={8}
        >
          <style>{`
            .rdp-dropdown_root:has-focus,
            .rdp-dropdown_root:focus-within,
            .rdp-dropdown_root:focus {
              ring-width: 0 !important;
              box-shadow: none !important;
              outline: none !important;
            }
            .rdp-dropdown_root select:focus,
            .rdp-dropdown_root select:focus-visible,
            .rdp-dropdown_root select:active {
              outline: none !important;
              ring-width: 0 !important;
              box-shadow: none !important;
            }
            .rdp-button_previous:focus,
            .rdp-button_previous:focus-visible,
            .rdp-button_previous:active:focus,
            .rdp-button_next:focus,
            .rdp-button_next:focus-visible,
            .rdp-button_next:active:focus {
              outline: none !important;
              ring-width: 0 !important;
              ring-offset-width: 0 !important;
              box-shadow: none !important;
            }
          `}</style>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              onSelect?.(selectedDate)
              setOpen(false)
            }}
            locale={dateLocale}
            captionLayout="dropdown"
            numberOfMonths={1}
            className="bg-transparent p-5"
            disabled={minDate ? (date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const min = minDate instanceof Date ? minDate : new Date(minDate);
              min.setHours(0, 0, 0, 0);
              const checkDate = date instanceof Date ? date : new Date(date);
              checkDate.setHours(0, 0, 0, 0);
              return checkDate < min;
            } : undefined}
            formatters={{
              formatMonthDropdown: (date: Date) =>
                date.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", { month: "long" }),
              formatYearDropdown: (date: Date) => date.getFullYear().toString(),
            }}
            classNames={{
              root: "w-fit min-w-[300px]",
              months: "gap-4",
              month: "gap-3",
              nav: "relative mb-3 flex items-center justify-between px-1",
              button_previous: cn(
                "h-9 w-9 rounded-lg transition-all duration-200 absolute left-0",
                "hover:bg-[var(--color-cream)] text-[var(--color-dark-blue)]",
                "hover:text-[var(--color-dark-blue)]",
                "focus:outline-none focus:ring-0 focus:ring-offset-0",
                "active:bg-[var(--color-cream)]/80",
                "z-10"
              ),
              button_next: cn(
                "h-9 w-9 rounded-lg transition-all duration-200 absolute right-0",
                "hover:bg-[var(--color-cream)] text-[var(--color-dark-blue)]",
                "hover:text-[var(--color-dark-blue)]",
                "focus:outline-none focus:ring-0 focus:ring-offset-0",
                "active:bg-[var(--color-cream)]/80",
                "z-10"
              ),
              month_caption: "mb-3 flex items-center justify-center relative",
              dropdowns: "flex items-center justify-center gap-2",
              dropdown_root: cn(
                "border-[var(--color-light-blue)]/40 rounded-lg",
                "hover:border-[var(--color-dark-blue)]/60 transition-all",
                "bg-white text-[var(--color-dark-blue)] px-3 py-1.5",
                "text-sm font-semibold min-w-[90px] cursor-pointer",
                "focus-within:border-[var(--color-dark-blue)]",
                "[&:has-focus]:ring-0 [&:has-focus]:shadow-none [&:has-focus]:outline-none",
                "[&:focus-within]:ring-0 [&:focus-within]:shadow-none [&:focus-within]:outline-none",
                "[&:focus]:ring-0 [&:focus]:shadow-none [&:focus]:outline-none",
                "[&_select]:focus:outline-none [&_select]:focus:ring-0 [&_select]:focus:shadow-none",
                "[&_select]:focus-visible:outline-none [&_select]:focus-visible:ring-0",
                "[&_select]:active:outline-none [&_select]:active:ring-0"
              ),
              dropdown: "text-[var(--color-dark-blue)] cursor-pointer",
              caption_label: "hidden",
              table: "mt-3 w-full",
              weekdays: "mb-2",
              weekday: cn(
                "text-[var(--color-dark-blue)]/60 font-semibold text-xs",
                "py-2 px-1 w-10 text-center"
              ),
              week: "gap-1",
              day: "h-10 w-10 p-0",
            }}
            components={{
              DayButton: ({ className, day, modifiers, ...props }) => {
                const isToday = modifiers.today
                const isSelected =
                  modifiers.selected &&
                  !modifiers.range_start &&
                  !modifiers.range_end &&
                  !modifiers.range_middle
                const isOutside = modifiers.outside
                const isDisabled = modifiers.disabled

                return (
                  <Button
                    variant="ghost"
                    size="icon"
                    data-day={day.date.toLocaleDateString()}
                    data-selected-single={isSelected}
                    data-today={isToday}
                    data-outside={isOutside}
                    data-disabled={isDisabled}
                    className={cn(
                      "h-9 w-9 rounded-lg font-medium text-sm transition-all duration-200",
                      "hover:bg-[var(--color-cream)] hover:text-[var(--color-dark-blue)]",
                      isSelected &&
                        "bg-[var(--color-dark-blue)] text-white shadow-md shadow-[var(--color-dark-blue)]/30",
                      isToday &&
                        !isSelected &&
                        "bg-[var(--color-light-blue)]/20 text-[var(--color-dark-blue)] font-semibold border-2 border-[var(--color-light-blue)]",
                      isOutside && "text-[var(--color-dark-blue)]/30",
                      isDisabled && "opacity-30 cursor-not-allowed",
                      className
                    )}
                    {...props}
                  />
                )
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

