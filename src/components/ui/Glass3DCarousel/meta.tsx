import React from "react";
import { Glass3DCarousel } from "./Glass3DCarousel";
import { Glass3DCarouselCode } from "./Glass3DCarouselCode";
import { Glass3DCarouselUsage } from "./usage";
import { Glass3DCarouselInstall } from "./install";

// CarouselCard interfeysi
interface CarouselCard {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
  badge?: string;
}

// Sample cards
const sampleCards: CarouselCard[] = [
  {
    id: 1,
    title: "AI Assistant",
    description: "Next-gen AI tool for productivity",
    image: "https://example.com/ai.jpg",
    category: "AI",
    badge: "Popular",
  },
  {
    id: 2,
    title: "VR Headset",
    description: "Immersive VR experience",
    image: "https://example.com/vr.jpg",
    category: "VR",
    badge: "New",
  },
];

export const meta = {
  id: "carousel",
  name: "Futuristic Carousel",
  element: (
    <Glass3DCarousel
      cards={sampleCards}
      onItemSelect={(_index, card) => console.log(card.title)}
      autoPlay={true}
      autoPlayInterval={4000}
      showControls={true}
      rotationIntensity={25}
    />
  ),
  code: Glass3DCarouselCode,
  usage: Glass3DCarouselUsage,
  install: Glass3DCarouselInstall,
};
