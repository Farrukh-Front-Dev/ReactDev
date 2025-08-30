"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import { componentsList } from "@/lib/componentsList";

export default function MainContent() {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = componentsList.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeComponent = filteredComponents.find(c => c.id === selected);

  // onSearch handler
  const handleSearch = (query: string, enterPressed?: boolean) => {
    setSearchQuery(query);
  
    // enterPressed undefined bo‘lishi mumkin, shuning uchun tekshirish
    if (enterPressed && filteredComponents.length > 0) {
      setSelected(filteredComponents[0].id); // birinchi mos componentni tanlaydi
    }
  };
  

  return (
    <div className="flex flex-col h-screen">
      <Navbar onSearch={handleSearch} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 h-full overflow-y-auto border-r bg-gray-100 dark:bg-gray-900">
          <Sidebar
            components={filteredComponents}
            onSelect={(id: string) => setSelected(id)}
          />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          {activeComponent ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">{activeComponent.name}</h1>
              <div>{activeComponent.element}</div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-4">
                <code>{activeComponent.code}</code>
              </pre>
            </div>
          ) : (
            <p>👈 Chap tomondan komponent tanlang yoki Enter bosing</p>
          )}
        </main>
      </div>
    </div>
  );
}
