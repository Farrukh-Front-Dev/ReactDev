import { ComponentItem } from "@/types/component";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

import { buttonCode } from "../../src/code/button";
import { cardCode } from "../../src/code/card";

export const componentsList: ComponentItem[] = [
  {
    id: "button",
    name: "Button",
    element: <Button>Click me</Button>,
    code: buttonCode,
  },
  {
    id: "card",
    name: "Card",
    element: <Card title="Card Title" content="This is a card content." />, 
    code: cardCode,
  },
];
