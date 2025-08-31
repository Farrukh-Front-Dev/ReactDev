"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { componentsList } from "@/lib/componentsList";
import Button from "@/components/ui/Button/Button";
import { Eye, Code } from "lucide-react";
import ComponentPreview from "@/components/componentPreview";

export default function MainContent() {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreview, setShowPreview] = useState(true); // default preview ochiq
  const [showCode, setShowCode] = useState(false);

  const filteredComponents = componentsList.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeComponent = filteredComponents.find(c => c.id === selected);

  const handleSearch = (query: string, enterPressed?: boolean) => {
    setSearchQuery(query);
    if (enterPressed && filteredComponents.length > 0) {
      handleSelect(filteredComponents[0].id);
    }
  };

  // Component tanlanganda avtomatik preview ochish
  const handleSelect = (id: string) => {
    setSelected(id);
    setShowPreview(true);
    setShowCode(false);
  };

  if (!activeComponent) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar onSearch={handleSearch} />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 h-full overflow-y-auto border-r bg-gray-100 dark:bg-gray-900">
            <Sidebar
              components={filteredComponents}
              onSelect={handleSelect}
            />
          </div>
          <main className="flex-1 overflow-y-auto p-6">
            <p>👈 Chap tomondan komponent tanlang yoki Enter bosing</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar onSearch={handleSearch} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 h-full overflow-y-auto border-r bg-gray-100 dark:bg-gray-900">
          <Sidebar
            components={filteredComponents}
            onSelect={handleSelect}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Component title */}
          <h1 className="text-2xl font-bold">{activeComponent.name}</h1>

          {/* Toggle buttons */}
          <div className="flex gap-2 mt-2">
            {/* Preview toggle */}
            <Button
              onClick={() => {
                if (!showPreview) setShowPreview(true);
                setShowCode(false);
              }}
              className="flex items-center justify-center w-10 h-10 p-2 rounded-full"
              aria-label="Show Preview"
            >
              <Eye className="w-5 h-5" />
            </Button>

            {/* Code toggle */}
            <Button
              onClick={() => {
                if (!showCode) setShowCode(true);
                setShowPreview(false); // preview yo'q bo'ladi
              }}
              className="flex items-center justify-center w-10 h-10 p-2 rounded-full"
              aria-label="Show Code"
            >
              <Code className="w-5 h-5" />
            </Button>
          </div>

          {/* Component Preview */}
          {showPreview && !showCode && (
            <div className="mt-2">
              <div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
                {activeComponent.element}
              </div>
            </div>
          )}

          {/* Component Details / Code */}
          {showCode && (
            <div className="mt-2">
              <ComponentPreview
                name={activeComponent.name}
                element={activeComponent.element}
                install={activeComponent.install}
                usage={activeComponent.usage}
                code={activeComponent.code}
                showPreview={showPreview} // faqat showPreview true bo'lsa component ko'rinadi
              />

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
