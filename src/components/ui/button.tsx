"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-full",
    "font-medium outline-none cursor-pointer select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:ring-2 focus-visible:ring-cyan-400/40",
    "relative overflow-hidden backdrop-blur-xl",
    "shadow-[0_12px_44px_rgba(15,23,42,0.28)]",
    "transition-shadow duration-300",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-blue-500/95 via-sky-400/90 to-indigo-400/95",
          "text-white border border-blue-200/30",
          "hover:shadow-[0_0_48px_rgba(96,165,250,0.38)]",
        ].join(" "),

        secondary: [
          "border",
          "hover:shadow-[0_0_36px_rgba(96,165,250,0.18)]",
        ].join(" "),

        default: [
          "border",
          "hover:shadow-[0_0_42px_rgba(147,197,253,0.28)]",
        ].join(" "),

        ghost: "hover:bg-black/5 dark:hover:bg-white/5",

        outline: [
          "border border-blue-300/30 bg-blue-400/5",
          "hover:bg-blue-400/10 hover:border-blue-200/60",
        ].join(" "),
      },

      size: {
        sm: "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm",
        md: "h-10 px-4 text-xs sm:h-11 sm:px-6 sm:text-sm",
        lg: "h-11 px-5 text-sm sm:h-12 sm:px-8 sm:text-base",
        xl: "h-12 px-6 text-sm sm:h-14 sm:px-10 sm:text-lg",
        icon: "h-9 w-9 sm:h-11 sm:w-11",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Theme-aware inline styles
const variantStyles: Record<string, React.CSSProperties> = {
  primary: {},

  secondary: {
    color: "var(--text-primary)",
    backgroundColor: "var(--card-bg)",
    borderColor: "var(--border)",
  },

  default: {
    color: "var(--text-primary)",
    backgroundColor: "var(--card-bg)",
    borderColor: "var(--border)",
  },

  ghost: {
    color: "var(--text-secondary)",
  },

  outline: {
    color: "var(--accent-color)",
  },
};

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
    asChild?: boolean;
  };

function Button({
  className,
  variant = "primary",
  size,
  asChild = false,
  children,
  style,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  // IMPORTANT:
  // Don't force React.CSSProperties here.
  // Framer Motion styles can contain MotionValues.
  const resolvedStyle = {
    ...variantStyles[variant ?? "primary"],
    ...style,
  };

  // Support Link wrappers / asChild pattern
  if (asChild && React.isValidElement(children)) {
    const child =
      children as React.ReactElement<
        React.HTMLAttributes<HTMLElement>
      >;

    return React.cloneElement(child, {
      ...child.props,
      className: cn(classes, child.props.className),

      // @ts-expect-error style works correctly here
      style: {
        ...resolvedStyle,
        ...(child.props.style ?? {}),
      },
    });
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={classes}
      style={resolvedStyle}
      {...props}
    >
      {/* Animated shimmer */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.26) 50%, transparent 80%)",
        }}
      />

      {children}
    </motion.button>
  );
}

export { Button, buttonVariants };