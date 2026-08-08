import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-label-md font-label-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-container text-on-primary shadow-cta hover:bg-primary",
        outline:
          "border border-border-subtle bg-white text-text-heading hover:border-outline-variant hover:bg-surface-container",
        ghost: "text-text-body hover:bg-slate-100 hover:text-text-heading",
        white: "bg-white text-primary shadow-cta hover:bg-slate-50",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        affiliate: "bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-label-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
