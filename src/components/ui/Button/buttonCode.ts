export const buttonCode = `
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "premium";
}

const ButtonSimple: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
}) => {
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    premium: "bg-amber-500 hover:bg-orange-600 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={\`
        px-4 py-2 rounded-lg font-semibold transition
        \${variantStyles[variant]}
        disabled:opacity-50 disabled:cursor-not-allowed
        \${className}
      \`}
    >
      {label}
    </button>
  );
};

export default ButtonSimple;
`;
