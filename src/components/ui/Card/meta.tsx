import React from "react";
import Card from "./Card";
import { cardCode } from "./cardCode";
import { cardUsage } from "./usage";
import { cardInstall } from "./install";

export const meta = {
  id: "card",
  name: "Card",
  element: <Card title="Card Title" content="This is a card content." />,
  code: cardCode,
  usage: cardUsage,
  install: cardInstall,
};
