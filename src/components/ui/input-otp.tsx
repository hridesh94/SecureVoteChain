
import * as React from "react";
import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef(({ className, value = "", maxLength = 6, onChange, ...props }, ref) => {
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn("flex gap-2", className)} ref={ref} {...props}>
      {Array.from({ length: maxLength }).map((_, i) => (
        <InputOTPSlot
          key={i}
          index={i}
          value={value[i] || ""}
          onChange={(newValue) => {
            const nextValue = value.substring(0, i) + newValue + value.substring(i + 1);
            handleChange(nextValue);
          }}
        />
      ))}
    </div>
  );
});
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
});
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, value, onChange }, ref) => {
  const inputRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !value) {
      const prev = inputRef.current?.previousElementSibling;
      prev?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = inputRef.current?.previousElementSibling;
      prev?.focus();
    } else if (e.key === "ArrowRight") {
      const next = inputRef.current?.nextElementSibling;
      next?.focus();
    }
  };

  const handleInput = (e) => {
    const newValue = e.target.value.slice(-1);
    if (onChange && /^\d*$/.test(newValue)) {
      onChange(newValue);
      const next = inputRef.current?.nextElementSibling;
      next?.focus();
    }
  };

  const handlePaste = (e) => {
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
      onChange={(e) => handleInput(e)}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      maxLength={1}
    />
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

export { InputOTP, InputOTPGroup, InputOTPSlot };
