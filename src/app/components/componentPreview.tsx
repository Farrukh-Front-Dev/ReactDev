"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button"; // ✅ to‘g‘ri import
import { Check, Copy } from "lucide-react";

type ComponentPreviewProps = {
  name: string;
  element: React.ReactNode;
  code: string;
};

export default function ComponentPreview({ name, element, code }: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Title */}
      <h2 className="text-xl font-semibold">{name}</h2>

      {/* Preview box */}
      <div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        {element}
      </div>

      {/* Code block with copy button */}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>
        <Button
  onClick={handleCopy}
  className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 text-sm"
>
  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
  {copied ? "Copied!" : "Copy"}
</Button>

      </div>
    </div>
  );
}
