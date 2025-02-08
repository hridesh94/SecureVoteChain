
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

const InputOTPSlot = React.forwardRef<React.ElementRef<"div">, InputOTPSlotProps>(
  ({ index, className, disabled, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const slots = inputOTPContext?.slots || []
    const slot = slots[index]
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    React.useEffect(() => {
      if (slot?.isActive && inputRef.current) {
        inputRef.current.focus()
      }
    }, [slot?.isActive])

    const handleInputChange = (value: string) => {
      const form = inputRef.current?.form
      if (!form) return

      const inputs = Array.from(form.elements).filter(
        (el): el is HTMLInputElement => el instanceof HTMLInputElement
      )
      const currentIndex = inputs.indexOf(inputRef.current!)
      
      if (value && /^\d$/.test(value)) {
        if (currentIndex < inputs.length - 1) {
          inputs[currentIndex + 1].focus()
        }
        // Update the value in the OTP context
        const newValue = slots.map((s, i) => (i === index ? value : s?.char || "")).join("")
        if (inputOTPContext?.onChange) {
          inputOTPContext.onChange(newValue)
        }
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedText = e.clipboardData.getData('text/plain')
      const numericOnly = pastedText.replace(/\D/g, '')
      
      if (numericOnly && inputOTPContext?.onChange) {
        inputOTPContext.onChange(numericOnly)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-14 w-14 rounded-md border-2 text-center text-2xl font-semibold",
          "transition-all duration-200 focus-within:border-primary",
          slot?.isActive && "border-primary ring-2 ring-primary ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          disabled={disabled}
          className={cn(
            "absolute inset-0 w-full h-full text-center text-2xl font-semibold text-foreground",
            "bg-transparent focus:outline-none focus:ring-0 border-none",
            disabled && "cursor-not-allowed"
          )}
          value={slot?.char || ''}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              const form = e.currentTarget.form
              if (form) {
                const inputs = Array.from(form.elements).filter(
                  (el): el is HTMLInputElement => el instanceof HTMLInputElement
                )
                const currentIndex = inputs.indexOf(e.currentTarget)
                
                if (!e.currentTarget.value && currentIndex > 0) {
                  inputs[currentIndex - 1].focus()
                  const newValue = slots.map((s, i) => (i === currentIndex - 1 ? "" : s?.char || "")).join("")
                  if (inputOTPContext?.onChange) {
                    inputOTPContext.onChange(newValue)
                  }
                }
              }
            }

            if (e.key === "ArrowLeft") {
              const form = e.currentTarget.form
              if (form) {
                const inputs = Array.from(form.elements).filter(
                  (el): el is HTMLInputElement => el instanceof HTMLInputElement
                )
                const currentIndex = inputs.indexOf(e.currentTarget)
                
                if (currentIndex > 0) {
                  inputs[currentIndex - 1].focus()
                }
              }
            }

            if (e.key === "ArrowRight") {
              const form = e.currentTarget.form
              if (form) {
                const inputs = Array.from(form.elements).filter(
                  (el): el is HTMLInputElement => el instanceof HTMLInputElement
                )
                const currentIndex = inputs.indexOf(e.currentTarget)
                
                if (currentIndex < inputs.length - 1) {
                  inputs[currentIndex + 1].focus()
                }
              }
            }
          }}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
        />
      </div>
    )
  }
)
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
