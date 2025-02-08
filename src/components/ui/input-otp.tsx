
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<"div"> {
  index: number;
  char?: string;
  hasFakeCaret?: boolean;
  isActive?: boolean;
  disabled?: boolean;
}

interface ExtendedOTPContext {
  slots: Array<{
    char: string | undefined;
    hasFakeCaret: boolean;
    isActive: boolean;
  }>;
  handlePaste?: (pastedText: string) => void;
}

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  InputOTPSlotProps
>(({ index, className, disabled, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext) as ExtendedOTPContext;
  const slots = inputOTPContext?.slots || [];
  const slot = slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-14 w-14 items-center justify-center border-2 border-input rounded-md transition-all",
        slot?.isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          className="w-full h-full text-center text-2xl font-semibold text-foreground bg-transparent border-none focus:outline-none focus:ring-0"
          autoComplete="one-time-code"
          disabled={disabled}
          value={slot?.char || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              const form = e.target.form;
              if (form) {
                const inputs = Array.from(form.elements).filter(
                  (el): el is HTMLInputElement => el instanceof HTMLInputElement
                );
                const currentIndex = inputs.indexOf(e.target);
                
                if (value && currentIndex < inputs.length - 1) {
                  inputs[currentIndex + 1].focus();
                }
              }
            }
          }}
          onKeyDown={(e) => {
            if (!/[\d\s]/.test(e.key) && !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
              e.preventDefault();
            }

            if (e.key === "Backspace") {
              const form = e.currentTarget.form;
              if (form) {
                const inputs = Array.from(form.elements).filter(
                  (el): el is HTMLInputElement => el instanceof HTMLInputElement
                );
                const currentIndex = inputs.indexOf(e.currentTarget);
                
                if (!e.currentTarget.value && currentIndex > 0) {
                  inputs[currentIndex - 1].focus();
                  inputs[currentIndex - 1].value = '';
                }
              }
            }

            if (e.key === "ArrowLeft") {
              const form = e.currentTarget.form;
              if (form) {
                const inputs = Array.from(form.elements).filter(
                  (el): el is HTMLInputElement => el instanceof HTMLInputElement
                );
                const currentIndex = inputs.indexOf(e.currentTarget);
                
                if (currentIndex > 0) {
                  inputs[currentIndex - 1].focus();
                }
              }
            }

            if (e.key === "ArrowRight") {
              const form = e.currentTarget.form;
              if (form) {
                const inputs = Array.from(form.elements).filter(
                  (el): el is HTMLInputElement => el instanceof HTMLInputElement
                );
                const currentIndex = inputs.indexOf(e.currentTarget);
                
                if (currentIndex < inputs.length - 1) {
                  inputs[currentIndex + 1].focus();
                }
              }
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData("text/plain");
            const numericData = pastedData.replace(/\D/g, "");
            if (inputOTPContext?.handlePaste && numericData) {
              inputOTPContext.handlePaste(numericData);
            }
          }}
        />
      </div>

      {slot?.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
