"use client";

import React from "react";
import { useRouter } from "next/navigation";

const GoToMainButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/Components")}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
    >
      Go to Components  
    </button>
  );
};

export default GoToMainButton;
