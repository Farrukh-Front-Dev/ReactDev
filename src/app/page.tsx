"use client";

import { useState } from "react";
import GoToMainButton from "@/components/GoToMainButton";
import MainContent from "@/app/Components/page";

export default function HomePage() {
  const [showMainContent, setShowMainContent] = useState(false);

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: "url('/miami-bayside-marketplace.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!showMainContent ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <GoToMainButton/>
        </div>
      ) : (
        <MainContent />
      )}
    </div>
  );
}
