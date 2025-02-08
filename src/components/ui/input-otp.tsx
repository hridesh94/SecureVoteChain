
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

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  InputOTPSlotProps
>(({ index, className, disabled, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const slots = inputOTPContext?.slots || []
  const slot = slots[index]

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
      <div 
        className={cn(
          "absolute inset-0 w-full h-full flex items-center justify-center text-2xl font-semibold",
          slot?.char ? "text-black" : "text-gray-400"
        )}
      >
        {slot?.char || "0"}
      </div>
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={1}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        autoComplete="one-time-code"
        disabled={disabled}
        onKeyDown={(e) => {
          if (!/[\d\s]/.test(e.key) && !["Backspace", "Delete", "Tab"].includes(e.key)) {
            e.preventDefault()
          }
        }}
        onPaste={(e) => {
          e.preventDefault()
          const pastedData = e.clipboardData.getData("text/plain")
          const numericData = pastedData.replace(/\D/g, "")
          if (inputOTPContext?.handlePaste && numericData) {
            inputOTPContext.handlePaste(numericData)
          }
        }}
      />
      {slot?.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-black duration-1000" />
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
