import { ComponentItem } from "@/types/component";

// Button
import Button from "@/components/ui/Button/Button";
import { buttonCode } from "@/components/ui/Button/buttonCode";
import { buttonUsage } from "@/components/ui/Button/usage";
import { buttonInstall } from "@/components/ui/Button/install";

// Card
import Card from "@/components/ui/Card/Card";
import { cardCode } from "@/components/ui/Card/cardCode";
import { cardUsage } from "@/components/ui/Card/usage";
import { cardInstall } from "@/components/ui/Card/install";

// Futuristic Carousel
import FuturisticCarousel from "@/components/ui/FuturisticCarousel/FuturisticCarousel";
import { futuristicCarouselCode } from "@/components/ui/FuturisticCarousel/futuristicCarouselCode";
import { futuristicCarouselUsage } from "@/components/ui/FuturisticCarousel/usage";
import { futuristicCarouselInstall } from "@/components/ui/FuturisticCarousel/install";

export const componentsList: ComponentItem[] = [
  {
    id: "button",
    name: "Button",
    element: <Button>Click me</Button>,
    install: buttonInstall,
    usage: buttonUsage,
    code: buttonCode,
  },
  {
    id: "card",
    name: "Card",
    element: <Card title="Card Title" content="This is a card content." />,
    install: cardInstall,
    usage: cardUsage,
    code: cardCode,
  },
  {
    id: "carousel",
    name: "Futuristic Carousel",
    element: (
      <FuturisticCarousel
        items={[
          { color: '#06b6d4', id: 'product1', data: { name: 'AI Assistant', price: '$99' } },
          { color: '#8b5cf6', id: 'product2', data: { name: 'VR Headset', price: '$599' } },
        ]}
        onItemSelect={(i, item) => console.log(item.data.name)}
      />
    ),
    install: futuristicCarouselInstall,
    usage: futuristicCarouselUsage,
    code: futuristicCarouselCode,
  },
];
