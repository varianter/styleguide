export type Color = string;
export type ColorPair = {
  bg: Color;
  text: Color;
  border?: Color;
};

export type ColorSeries = ColorPair[];

export type ColorSet = {
  default: ColorPair;
  tint?: ColorSeries;
  shade?: ColorSeries;
};

export const standardColors = {
  black: "#333333",
  white: "#FFFFFF",
};

export const standardPairs: ColorScheme = [
  {
    default: {
      bg: standardColors.black,
      text: standardColors.white,
    },
  },
  {
    default: {
      bg: standardColors.white,
      text: standardColors.black,
      border: standardColors.black,
    },
  },
];

export const colorPairs = {
  primary: {
    default: {
      bg: "#E61A6B",
      text: standardColors.white,
    },
    tint: [
      {
        bg: "#EB4889",
        text: standardColors.black,
      },

      {
        bg: "#F076A6",
        text: standardColors.black,
      },

      {
        bg: "#F5A4C4",
        text: standardColors.black,
      },

      {
        bg: "#FAD2E2",
        text: standardColors.black,
      },
    ],
    shade: [
      {
        bg: "#B91456",
        text: standardColors.white,
      },
      {
        bg: "#8B0F40",
        text: standardColors.white,
      },
      {
        bg: "#5D0A2B",
        text: standardColors.white,
      },
      {
        bg: "#2F0516",
        text: standardColors.white,
      },
    ],
  },
  secondary1: {
    default: {
      bg: "#423D89",
      text: standardColors.white,
    },
    tint: [
      {
        bg: "#534DAC",
        text: standardColors.white,
      },
      {
        bg: "#736EBE",
        text: standardColors.white,
      },
      {
        bg: "#9591CE",
        text: "#333",
      },
      {
        bg: "#B7B4DE",
        text: "#333",
      },
    ],
    shade: [
      {
        bg: "#35316E",
        text: standardColors.white,
      },
      {
        bg: "#282552",
        text: standardColors.white,
      },
      {
        bg: "#1A1837",
        text: standardColors.white,
      },
      {
        bg: "#0D0C1B",
        text: standardColors.white,
      },
    ],
  },
  secondary2: {
    default: {
      bg: "#03DAC6",
      text: standardColors.black,
    },
    tint: [
      {
        bg: "#35E1D1",
        text: standardColors.black,
      },
      {
        bg: "#68E9DD",
        text: standardColors.black,
      },
      {
        bg: "#9AF0E8",
        text: standardColors.black,
      },
      {
        bg: "#CDF8F4",
        text: standardColors.black,
      },
    ],
    shade: [
      {
        bg: "#02AE9E",
        text: standardColors.black,
      },
      {
        bg: "#028377",
        text: standardColors.white,
      },
      {
        bg: "#01574F",
        text: standardColors.white,
      },
      {
        bg: "#012C28",
        text: standardColors.white,
      },
    ],
  },
  secondary3: {
    default: {
      bg: "#FFC4BC",
      text: standardColors.black,
    },
    tint: [
      {
        bg: "#FFD0C9",
        text: standardColors.black,
      },
      {
        bg: "#FFDCD7",
        text: standardColors.black,
      },
      {
        bg: "#FFE7E4",
        text: standardColors.black,
      },
      {
        bg: "#FFF3F2",
        text: standardColors.black,
      },
    ],
    shade: [
      {
        bg: "#CC9D96",
        text: standardColors.black,
      },
      {
        bg: "#997671",
        text: standardColors.white,
      },
      {
        bg: "#664E4B",
        text: standardColors.white,
      },
      {
        bg: "#332726",
        text: standardColors.white,
      },
    ],
  },
  secondary4: {
    default: {
      bg: "#EDE8D7",
      text: standardColors.black,
    },
    tint: [
      {
        bg: "#F1EDDF",
        text: standardColors.black,
      },
      {
        bg: "#F4F1E7",
        text: standardColors.black,
      },
      {
        bg: "#F8F6EF",
        text: standardColors.black,
      },
      {
        bg: "#FBFAF7",
        text: standardColors.black,
      },
    ],
    shade: [
      {
        bg: "#BEBAAC",
        text: standardColors.black,
      },
      {
        bg: "#8E8B81",
        text: standardColors.white,
      },
      {
        bg: "#5F5D56",
        text: standardColors.white,
      },
      {
        bg: "#2F2E2B",
        text: standardColors.white,
      },
    ],
  },
};

export type ColorScheme = ColorSet[];

const scheme: ColorScheme = Object.values(colorPairs);

export default scheme;

export function getTextColor(color: Color): Color {
  const res = scheme.concat(standardPairs).reduce(function (prev, c) {
    if (prev) return prev;
    if (c.default.bg === color) return c.default.text;
    const tint = c.tint?.find((i) => i.bg === color)?.text;
    if (tint) return tint;
    const shade = c.shade?.find((i) => i.bg === color)?.text;
    if (shade) return shade;
    return "";
  }, "");
  if (!res) return standardColors.black;
  return res;
}
