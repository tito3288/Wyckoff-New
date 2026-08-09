/** Official Wyckoff Consulting brand tokens. */
export const theme = {
  colors: {
    // Primary and monochromatic green range.
    primary: "#5B7F71",
    ink: "#1F2D27",
    forest: "#3B5249",
    sageMid: "#5D7F72",
    sage: "#5B7F71",
    sageLight: "#91B0A4",
    sagePale: "#BCD0C8",

    // Accent range.
    orange: "#D08847",
    gold: "#D0A85A",
    terracotta: "#B35533",
    rust: "#96562B",
    amber: "#D08847",

    // Background range.
    cream: "#ECE6DE",
    tan: "#E6D1BC",
  },
  fonts: {
    primary: '"Avenir Next", Avenir, Arial, sans-serif',
    secondary: 'Arial, Helvetica, sans-serif',
    sans: '"Avenir Next", Avenir, Arial, sans-serif',
  },
  radius: {
    // The design is intentionally square — no rounded corners anywhere.
    none: "0",
  },
  layout: {
    maxWidth: "1560px",
    gutter: "clamp(1.25rem,5vw,6rem)",
  },
} as const;

export type Theme = typeof theme;
