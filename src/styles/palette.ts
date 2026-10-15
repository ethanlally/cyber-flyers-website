// The only raw UI color values. BaseLayout emits these as CSS custom properties
// and reads the browser theme color from the same source, without client JS.
export const palette = {
  teal: "#63BCAE",
  rust: "#873A26",
  // Supporting Cybermindfulness colors from https://inphish.udayton.edu/.
  "deep-blue": "#264653",
  sand: "#F4F1DE",
  "supporting-teal": "#2A9D8F",
  coral: "#E76F51",
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const browserThemeColor = palette["deep-blue"];

export const paletteStyles = `:root{${Object.entries(palette)
  .map(([name, value]) => `--palette-${name}:${value}`)
  .join(";")}}`;
