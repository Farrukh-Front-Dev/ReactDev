"use client";

import { useState } from "react";

type ComponentItem = {
  id: string;
  name: string;
  element: React.ReactNode;
  code: string;
};

type SidebarProps = {
  components: ComponentItem[];
  onSelect: (id: string) => void;
};

export default function Sidebar({ components, onSelect }: SidebarProps) {
  const [active, setActive] = useState<string>("");

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <aside className="p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <ul className="space-y-2">
        {components.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleSelect(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md ${
                active === item.id ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
