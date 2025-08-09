<<<<<<< HEAD

import * as React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  variant?: "default" | "subtle" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      required,
      disabled,
      variant = "default",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "text-foreground",
      subtle: "text-muted-foreground",
      danger: "text-destructive",
      success: "text-success",
      warning: "text-warning",
    };

    const sizes = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          "font-medium leading-none",
          variants[variant],
          sizes[size],
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          disabled && "cursor-not-allowed opacity-70",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span
            className={cn(
              "ml-1",
              variant === "danger"
                ? "text-destructive"
                : "text-muted-foreground"
            )}
          >
            *
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";

=======
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

>>>>>>> fc545f6e955f4fca4c0cdecfa8f54643c5b16bad
export { Label }
