import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    rounded-full
    font-medium
    transition-all
    duration-300
    outline-none
    cursor-pointer
    disabled:pointer-events-none
    disabled:opacity-50
    active:scale-[0.98]
    focus-visible:ring-2
    focus-visible:ring-cyan-400/40
    relative
    overflow-hidden
    backdrop-blur-xl
    shadow-[0_12px_44px_rgba(15,23,42,0.28)]
    before:content-['']
    before:absolute
    before:inset-0
    before:translate-x-[-120%]
    before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.26),transparent)]
    before:transition-transform
    before:duration-700
    hover:before:translate-x-[120%]
  `,
  {
    variants: {
      variant: {
        default: `
          bg-white/8
          text-white
          border
          border-white/18
          hover:bg-white/12
          hover:shadow-[0_0_42px_rgba(147,197,253,0.28)]
        `,

        primary: `
          bg-gradient-to-r
          from-blue-500/95
          via-sky-400/90
          to-indigo-400/95
          text-white
          border
          border-blue-200/30
          hover:scale-[1.02]
          hover:shadow-[0_0_48px_rgba(96,165,250,0.38)]
        `,

        secondary: `
          bg-white/5
          backdrop-blur-xl
          border
          border-white/14
          text-white
          hover:bg-white/10
          hover:border-blue-200/24
          hover:shadow-[0_0_36px_rgba(96,165,250,0.18)]
        `,

        ghost: `
          text-white/80
          hover:bg-white/5
          hover:text-white
        `,

        outline: `
          border
          border-blue-300/30
          bg-blue-400/5
          text-blue-100
          hover:bg-blue-400/10
          hover:border-blue-200/60
        `,
      },

      size: {
        sm: `
          h-10
          px-4
          text-sm
        `,

        md: `
          h-11
          px-6
          text-sm
        `,

        lg: `
          h-12
          px-8
          text-base
        `,

        xl: `
          h-14
          px-10
          text-lg
        `,

        icon: `
          h-11
          w-11
        `,
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
