"use client";

interface CardProps {
  title: string;
  content: string;
}

export default function Card({ title, content }: CardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  );
}
