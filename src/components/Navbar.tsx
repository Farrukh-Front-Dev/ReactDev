"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

/**
 * Props interface for the Navbar component
 */
interface NavbarProps {
  onSearch: (query: string, enterPressed?: boolean) => void;
  className?: string;
}

/**
 * Professional Animated Navbar Component
 * Features: Scroll-triggered pill transformation, blur background, responsive design
 */
export default function Navbar({ onSearch, className = "" }: NavbarProps) {
  // State management
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  /**
   * Scroll effect handler - transforms navbar to pill shape when scrolling
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Cleanup listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Optimized search input change handler
   */
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
      onSearch(value, false);
    },
    [onSearch]
  );

  /**
   * Enter key handler for search submission
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSearch(searchQuery, true);
      }
    },
    [onSearch, searchQuery]
  );

  /**
   * Search focus handlers for enhanced UX
   */
  const handleSearchFocus = useCallback(() => setIsSearchFocused(true), []);
  const handleSearchBlur = useCallback(() => setIsSearchFocused(false), []);

  /**
   * Memoized navbar container classes for scroll animation
   */
  const navbarClasses = useMemo(
    () =>
      `
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${
          isScrolled
            ? // Scrolled state - pill shape
              `
              top-4 left-1/2 right-auto w-[95%] max-w-4xl -translate-x-1/2
              rounded-full
              bg-white/70 dark:bg-gray-900/70
              backdrop-blur-xl backdrop-saturate-150
              shadow-2xl shadow-black/10 dark:shadow-black/30
              border border-white/20 dark:border-gray-700/30
              `
            : // Default state - full width
              `
              top-0 left-0 right-0 w-full
              rounded-none
              bg-white/80 dark:bg-gray-900/80
              backdrop-blur-lg backdrop-saturate-150
              shadow-lg shadow-black/5 dark:shadow-black/20
              border-b border-gray-200/50 dark:border-gray-700/50
              `
        }
      `.replace(/\s+/g, " ").trim(),
    [isScrolled]
  );

  /**
   * Memoized search input classes with focus effects
   */
  const searchInputClasses = useMemo(
    () =>
      `
        w-full pl-10 pr-4 py-2.5
        text-sm font-medium
        placeholder:text-gray-500 dark:placeholder:text-gray-400
        bg-white/90 dark:bg-gray-800/90
        border border-gray-200/60 dark:border-gray-700/60
        rounded-full
        backdrop-blur-sm
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60
        dark:focus:ring-blue-400/40 dark:focus:border-blue-400/60
        hover:shadow-lg hover:bg-white/95 dark:hover:bg-gray-800/95
        hover:border-gray-300/70 dark:hover:border-gray-600/70
        text-gray-900 dark:text-gray-100
        ${
          isSearchFocused
            ? "shadow-xl scale-[1.02] bg-white dark:bg-gray-800 ring-2 ring-blue-500/40 dark:ring-blue-400/40"
            : "shadow-md"
        }
      `.replace(/\s+/g, " ").trim(),
    [isSearchFocused]
  );

  return (
    <nav className={navbarClasses} role="navigation" aria-label="Main navigation">
      <div
        className={`
          flex items-center justify-between h-16
          transition-all duration-500 ease-out
          ${
            isScrolled
              ? "px-6 sm:px-8" // Reduced padding for pill shape
              : "px-4 sm:px-6 lg:px-8" // Standard padding
          }
        `}
      >
        {/* Logo and Brand Section */}
        <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
          <Link
            href="/"
            className="
              flex items-center space-x-3 group
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 
              rounded-full px-3 py-2 -mx-1
              transition-all duration-300 ease-out
              hover:bg-gray-100/60 dark:hover:bg-gray-800/60
              hover:scale-105 active:scale-95
            "
            aria-label="Go to homepage - React Dev"
          >
            {/* Logo with hover animation */}
            <div className="
              relative overflow-hidden rounded-full p-1
              bg-gradient-to-br from-blue-500/10 to-purple-500/10
              group-hover:from-blue-500/20 group-hover:to-purple-500/20
              transition-all duration-300 ease-out
            ">
              <Image
                src="/ReactLogo.png"
                alt="React Logo"
                width={32}
                height={32}
                className="
                  object-contain
                  group-hover:rotate-180
                  transition-transform duration-700 ease-out
                "
                priority
              />
            </div>
            
            {/* Brand Text */}
            <div className={`
              min-w-0 transition-all duration-500 ease-out
              ${isScrolled ? "hidden sm:block" : "hidden xs:block sm:block"}
            `}>
              <h1 className="
                text-lg sm:text-xl font-bold font-sans
                bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                dark:from-blue-400 dark:via-purple-400 dark:to-blue-400
                bg-clip-text text-transparent bg-size-200
                group-hover:bg-position-100
                transition-all duration-500 ease-out
                truncate whitespace-nowrap
              ">
                React Dev
              </h1>
            </div>
          </Link>
        </div>

        {/* Search Section */}
        <div className={`
          flex-1 max-w-sm mx-4
          transition-all duration-500 ease-out
          ${isScrolled ? "sm:max-w-xs" : "sm:max-w-md"}
        `}>
          <div className="relative group">
            {/* Search Icon */}
            <div className="
              absolute left-3 top-1/2 -translate-y-1/2 z-10
              pointer-events-none
              transition-all duration-300 ease-out
            ">
              <Search 
                className={`
                  h-4 w-4 transition-all duration-300 ease-out
                  ${
                    isSearchFocused
                      ? "text-blue-500 dark:text-blue-400 scale-110"
                      : "text-gray-400 dark:text-gray-500"
                  }
                `}
                aria-hidden="true"
              />
            </div>

            {/* Search Input */}
            <input
              type="search"
              placeholder={isScrolled ? "Search..." : "Search components, hooks..."}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className={searchInputClasses}
              aria-label="Search components and documentation"
              aria-describedby="search-help"
              autoComplete="off"
              spellCheck="false"
            />

            {/* Search help text for screen readers */}
            <div id="search-help" className="sr-only">
              Type to search in real-time, press Enter to execute search
            </div>

            {/* Search input glow effect on focus */}
            {isSearchFocused && (
              <div className="
                absolute inset-0 rounded-full
                bg-gradient-to-r from-blue-500/10 to-purple-500/10
                blur-xl -z-10
                animate-pulse
              " />
            )}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Theme Toggle Button (placeholder) */}
          <button
            type="button"
            className="
              hidden sm:flex items-center justify-center
              w-10 h-10 rounded-full
              bg-gray-100/80 dark:bg-gray-800/80
              hover:bg-gray-200/80 dark:hover:bg-gray-700/80
              border border-gray-200/60 dark:border-gray-700/60
              backdrop-blur-sm
              transition-all duration-300 ease-out
              hover:scale-110 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              group
            "
            aria-label="Toggle theme"
          >
            <svg
              className="
                h-4 w-4 text-gray-600 dark:text-gray-300
                group-hover:text-gray-900 dark:group-hover:text-gray-100
                transition-colors duration-300
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          {/* User Avatar (placeholder) */}
          <button
            type="button"
            className="
              w-10 h-10 rounded-full
              bg-gradient-to-br from-blue-500 to-purple-600
              hover:from-blue-600 hover:to-purple-700
              p-0.5 transition-all duration-300 ease-out
              hover:scale-110 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              shadow-lg hover:shadow-xl
            "
            aria-label="User menu"
          >
            <div className="
              h-full w-full rounded-full
              bg-gray-100 dark:bg-gray-800
              flex items-center justify-center
              text-xs font-semibold text-gray-600 dark:text-gray-300
            ">
              U
            </div>
          </button>
        </div>
      </div>

      {/* Animated bottom accent line */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-blue-500/30 to-transparent
        transition-all duration-500 ease-out
        ${isScrolled ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}
      `} />
    </nav>
  );
}