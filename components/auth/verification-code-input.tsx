"use client";

import { useRef, useState, useCallback } from "react";

interface VerificationCodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
}

export function VerificationCodeInput({
  length = 6,
  onComplete,
  disabled = false,
}: VerificationCodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
      const digit = value.slice(-1);
      const newValues = [...values];
      newValues[index] = digit;
      setValues(newValues);
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      const code = newValues.join("");
      if (code.length === length && !newValues.includes("")) {
        onComplete(code);
      }
    },
    [values, length, onComplete]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [values]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (!pasted) return;
      const newValues = [...values];
      for (let i = 0; i < pasted.length; i++) {
        newValues[i] = pasted[i];
      }
      setValues(newValues);
      const nextEmpty = newValues.findIndex((v) => !v);
      const focusIndex = nextEmpty === -1 ? length - 1 : nextEmpty;
      inputRefs.current[focusIndex]?.focus();
      if (!newValues.includes("")) {
        onComplete(newValues.join(""));
      }
    },
    [values, length, onComplete]
  );

  return (
    <div role="group" aria-label="Verification code" className="flex gap-2 md:gap-3">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          autoFocus={i === 0}
          className="h-[48px] w-[48px] md:h-[52px] md:w-[52px] flex-1 rounded-lg border border-[#E2E8F0] bg-transparent text-center font-display text-lg md:text-xl font-semibold text-[#1C2434] outline-none transition-colors focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 disabled:opacity-50"
        />
      ))}
    </div>
  );
}
