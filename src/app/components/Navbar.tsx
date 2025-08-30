"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarProps = {
  onSearch: (query: string, enterPressed?: boolean) => void;
};

export default function Navbar({ onSearch }: NavbarProps) {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false); // input focus tracking

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(search, true);
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-red-600/80 border-b shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/ReactLogo.png" alt="React Logo" width={32} height={32} />
            <span className="text-xl font-bold text-white">React Dev</span>
          </Link>

        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full max-w-xs px-3 py-2 text-sm rounded-lg transition-all duration-200
            border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            outline-none bg-white/70 placeholder-gray-500
            ${focused ? "shadow-lg" : "shadow-sm"}`}
        />
      </div>
    </nav>
  );
}
