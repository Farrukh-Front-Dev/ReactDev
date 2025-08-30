import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "premium";
}

export default function Button({ 
  children, 
  className = "", 
  variant = "primary",
  disabled = false,
  ...props 
}: ButtonProps) {
  // Variantlar bo'yicha stil sozlamalari
  const variantStyles = {
    primary: {
      base: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800",
      hover: "hover:from-blue-700 hover:to-blue-900",
      shadow: "shadow-lg shadow-blue-500/30",
      active: "active:shadow-inner active:shadow-blue-900/40",
      border: "bg-gradient-to-r from-blue-400 to-blue-600"
    },
    secondary: {
      base: "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800",
      hover: "hover:from-gray-700 hover:to-gray-900",
      shadow: "shadow-lg shadow-gray-500/30",
      active: "active:shadow-inner active:shadow-gray-900/40",
      border: "bg-gradient-to-r from-gray-400 to-gray-600"
    },
    premium: {
      base: "bg-gradient-to-br from-amber-500 via-orange-600 to-red-600",
      hover: "hover:from-amber-600 hover:to-red-700",
      shadow: "shadow-lg shadow-amber-500/40",
      active: "active:shadow-inner active:shadow-orange-900/40",
      border: "bg-gradient-to-r from-amber-400 to-red-500"
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <motion.button
      disabled={disabled}
      whileHover={{ 
        y: disabled ? 0 : -2,
        scale: disabled ? 1 : 1.02,
        transition: { duration: 0.1 }
      }}
      whileTap={{ 
        y: disabled ? 0 : 1,
        scale: disabled ? 1 : 0.98,
      }}
      className={`relative px-6 py-3 rounded-xl text-white font-semibold 
                transition-all duration-200 transform
                ${currentVariant.base}
                ${currentVariant.hover}
                ${currentVariant.shadow}
                ${currentVariant.active}
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:transform-none disabled:hover:transform-none
                group overflow-hidden
                ${className}`}
      {...props}
    >
      {/* Gradient yorqinlik efekti */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Button matni */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>

      {/* 3D pastki chegara efekti */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl ${currentVariant.border}`}
      />
    </motion.button>
  );
}