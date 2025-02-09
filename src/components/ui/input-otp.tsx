
import * as React from "react";
import { cn } from "@/lib/utils";

interface InputOTPProps {
  value: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  className?: string;
  slots?: React.ReactNode[];
  render?: (props: { slots: InputOTPSlotProps[] }) => React.ReactNode;
}

interface InputOTPSlotProps {
  index: number;
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, value = "", maxLength = 6, onChange, render, ...props }, ref) => {
    const handleChange = (value: string) => {
      if (onChange) {
        onChange(value);
      }
    };

    const slots = Array.from({ length: maxLength }).map((_, i) => ({
      index: i,
      value: value[i] || "",
      onChange: (newValue: string) => {
        const nextValue = value.substring(0, i) + newValue + value.substring(i + 1);
        handleChange(nextValue);
      },
    }));

    if (render) {
      return render({ slots });
    }

    return (
      <div className={cn("flex gap-2", className)} ref={ref} {...props}>
        {slots.map((slot, i) => (
          <InputOTPSlot key={i} {...slot} />
        ))}
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
});
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ index, value, onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !value) {
        const prev = inputRef.current?.previousElementSibling as HTMLInputElement;
        prev?.focus();
      } else if (e.key === "ArrowLeft") {
        const prev = inputRef.current?.previousElementSibling as HTMLInputElement;
        prev?.focus();
      } else if (e.key === "ArrowRight") {
        const next = inputRef.current?.nextElementSibling as HTMLInputElement;
        next?.focus();
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.slice(-1);
      if (onChange && /^\d*$/.test(newValue)) {
        onChange(newValue);
        const next = inputRef.current?.nextElementSibling as HTMLInputElement;
        next?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .replace(/\D/g, "")
        .slice(0, 6);
      if (onChange) {
        onChange(pastedData);
      }
    };

    return (
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        className="w-10 h-10 text-center text-2xl rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary"
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        maxLength={1}
        {...props}
      />
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

export { InputOTP, InputOTPGroup, InputOTPSlot };
