"use client"; // This is a client-side theme configuration

import { createTheme, MantineColorsTuple } from "@mantine/core";

// 1. Define our custom color tuples
const fieryCoral: MantineColorsTuple = [
  "#ffeceb",
  "#fdd8d7",
  "#f8b1b0",
  "#f48887",
  "#f06665",
  "#ee514f",
  "#ed4745",
  "#d33a39",
  "#bc3232",
  "#a4282a",
];

const vibrantGold: MantineColorsTuple = [
  "#fff9e0",
  "#fff3c2",
  "#ffeda3",
  "#ffe785",
  "#ffe166",
  "#ffd83d",
  "#ffc700",
  "#e0b000",
  "#c29800",
  "#a38000",
];

// 2. Create the theme object
export const theme = createTheme({
  // Define the primary color for light and dark modes
  primaryColor: "fieryCoral",

  // Add our custom colors to the theme
  colors: {
    fieryCoral,
    vibrantGold,
  },

  // Other theme properties
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});
