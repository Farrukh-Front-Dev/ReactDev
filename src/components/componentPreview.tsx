"use client";

import { useState } from "react";
import {NeoGlassButton} from "@/components/ui/Button/NeoglassButton";
import { Check, Copy } from "lucide-react";

type ComponentPreviewProps = {
  name: string;
  element: React.ReactNode;
  install?: string;
  usage?: string;
  code: string;
  showPreview?: boolean; // preview ko‘rsatilishi kerakmi
};

export default function ComponentPreview({
  name,
  element,
  install,
  usage,
  code,
  showPreview = true, // default true
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-semibold">{name}</h2>

      {/* Component preview faqat showPreview true bo'lsa */}
      {showPreview && (
        <div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          {element}
        </div>
      )}

      {/* Installation */}
      {install && (
        <div className="relative">
          <h3 className="text-lg font-medium mb-2">Installation</h3>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm">
            <code>{install}</code>
          </pre>
          <NeoGlassButton
            onClick={() => handleCopy(install, "install")}
            className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 text-sm"
          >
            {copied === "install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied === "install" ? "Copied!" : "Copy"}
          </NeoGlassButton>
        </div>
      )}

      {/* Usage */}
      {usage && (
        <div className="relative">
          <h3 className="text-lg font-medium mb-2">Usage</h3>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm">
            <code>{usage}</code>
          </pre>
          <NeoGlassButton
            onClick={() => handleCopy(usage, "usage")}
            className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 text-sm"
          >
            {copied === "usage" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied === "usage" ? "Copied!" : "Copy"}
          </NeoGlassButton>
        </div>
      )}

      {/* Source code */}
      <div className="relative">
        <h3 className="text-lg font-medium mb-2">Source code</h3>
        <pre className="bg-gray-900 text-green-400 rounded-xl p-4 overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>
        <NeoGlassButton
          onClick={() => handleCopy(code, "code")}
          className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 text-sm"
        >
          {copied === "code" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied === "code" ? "Copied!" : "Copy"}
        </NeoGlassButton>
      </div>
    </div>
  );
}
