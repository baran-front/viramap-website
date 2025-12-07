import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import type React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validatePhoneNumber(str: string) {
  return str.length === 11 && /^09\d{9}$/.test(str);
}

export function persianNumbersToEnglish(str: string) {
  if (!str) return str;

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  let result = "";

  for (const ch of str) {
    const persianIndex = persianDigits.indexOf(ch);
    if (persianIndex !== -1) {
      result += String(persianIndex);
      continue;
    }

    const arabicIndex = arabicDigits.indexOf(ch);
    if (arabicIndex !== -1) {
      result += String(arabicIndex);
      continue;
    }

    result += ch;
  }

  return result;
}

export function justNumbers(str: string) {
  if (!str) return str;

  // First, normalize any Persian/Arabic digits to English
  const normalized = persianNumbersToEnglish(str);

  // Then, keep only ASCII digits 0-9
  return normalized.replace(/[^\d]/g, "");
}

export function numericOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  const allowedControlKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ];

  // Allow Ctrl/Cmd + A/C/V/X/Z/Y
  if (e.ctrlKey || e.metaKey || allowedControlKeys.includes(e.key)) {
    return;
  }

  // Allow only digits 0-9
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
}

export function numericOnPaste(
  e: React.ClipboardEvent<HTMLInputElement>,
  originalOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  const pasted = e.clipboardData.getData("text");
  const sanitized = justNumbers(pasted);

  if (sanitized !== pasted) {
    e.preventDefault();
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: (e.target as HTMLInputElement).value + sanitized,
      } as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>;
    originalOnChange(syntheticEvent);
  }
}

export function numericOnChange(
  e: React.ChangeEvent<HTMLInputElement>,
  originalOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  const syntheticEvent = {
    ...e,
    target: {
      ...e.target,
      value: justNumbers(e.target.value),
    } as HTMLInputElement,
  } as React.ChangeEvent<HTMLInputElement>;
  originalOnChange(syntheticEvent);
}
