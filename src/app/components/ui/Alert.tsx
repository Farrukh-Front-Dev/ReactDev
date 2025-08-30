"use client";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning";
}

export default function Alert({ message, type = "success" }: AlertProps) {
  const colors = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
  };

  return (
    <div className={`border-l-4 p-4 rounded ${colors[type]}`}>
      {message}
    </div>
  );
}
