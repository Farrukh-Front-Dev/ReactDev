export type ComponentItem = {
  id: string;
  name: string;
  element: React.ReactNode;
  install?: string;   // 📦 npm install command (ixtiyoriy)
  usage?: string;     // 💻 qanday ishlatish (ixtiyoriy)
  code: string;       // 🔧 componentning o‘zi
};
