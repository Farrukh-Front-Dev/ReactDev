import React from "react";
import Button from "./Button";
import { buttonCode } from "./buttonCode";
import { buttonUsage } from "./usage";
import { buttonInstall } from "./install";

export const meta = {
  id: "button",
  name: "Button",
  element: <Button>Click me</Button>,
  code: buttonCode,
  usage: buttonUsage,
  install: buttonInstall,
};
