export const allColors: AllColorNames = {
  primary: "#E61A6B",
  primary__tint1: "#EB4889",
  primary__tint2: "#F076A6",
  primary__tint3: "#F5A4C4",
  primary__tint4: "#FAD2E2",
  primary__shade1: "#B91456",
  primary__shade2: "#8B0F40",
  primary__shade3: "#5D0A2B",
  primary__shade4: "#2F0516",

  secondary1: "#423D89",
  secondary1__tint1: "#534DAC",
  secondary1__tint2: "#736EBE",
  secondary1__tint3: "#9591CE",
  secondary1__tint4: "#B7B4DE",
  secondary1__shade1: "#35316E",
  secondary1__shade2: "#282552",
  secondary1__shade3: "#1A1837",
  secondary1__shade4: "#0D0C1B",

  secondary2: "#03DAC6",
  secondary2__tint1: "#35E1D1",
  secondary2__tint2: "#68E9DD",
  secondary2__tint3: "#9AF0E8",
  secondary2__tint4: "#CDF8F4",
  secondary2__shade1: "#02AE9E",
  secondary2__shade2: "#028377",
  secondary2__shade3: "#01574F",
  secondary2__shade4: "#012C28",

  secondary3: "#FFC4BC",
  secondary3__tint1: "#FFD0C9",
  secondary3__tint2: "#FFDCD7",
  secondary3__tint3: "#FFE7E4",
  secondary3__tint4: "#FFF3F2",
  secondary3__shade1: "#CC9D96",
  secondary3__shade2: "#997671",
  secondary3__shade3: "#664E4B",
  secondary3__shade4: "#332726",

  secondary4: "#EDE8D7",
  secondary4__tint1: "#F1EDDF",
  secondary4__tint2: "#F4F1E7",
  secondary4__tint3: "#F8F6EF",
  secondary4__tint4: "#FBFAF7",
  secondary4__shade1: "#BEBAAC",
  secondary4__shade2: "#8E8B81",
  secondary4__shade3: "#5F5D56",
  secondary4__shade4: "#2F2E2B",

  standard__black: "#333333",
  standard__white: "#FFFFFF",
};
export type AllColorNames = {
  primary: "#E61A6B";
  primary__tint1: "#EB4889";
  primary__tint2: "#F076A6";
  primary__tint3: "#F5A4C4";
  primary__tint4: "#FAD2E2";
  primary__shade1: "#B91456";
  primary__shade2: "#8B0F40";
  primary__shade3: "#5D0A2B";
  primary__shade4: "#2F0516";

  secondary1: "#423D89";
  secondary1__tint1: "#534DAC";
  secondary1__tint2: "#736EBE";
  secondary1__tint3: "#9591CE";
  secondary1__tint4: "#B7B4DE";
  secondary1__shade1: "#35316E";
  secondary1__shade2: "#282552";
  secondary1__shade3: "#1A1837";
  secondary1__shade4: "#0D0C1B";

  secondary2: "#03DAC6";
  secondary2__tint1: "#35E1D1";
  secondary2__tint2: "#68E9DD";
  secondary2__tint3: "#9AF0E8";
  secondary2__tint4: "#CDF8F4";
  secondary2__shade1: "#02AE9E";
  secondary2__shade2: "#028377";
  secondary2__shade3: "#01574F";
  secondary2__shade4: "#012C28";

  secondary3: "#FFC4BC";
  secondary3__tint1: "#FFD0C9";
  secondary3__tint2: "#FFDCD7";
  secondary3__tint3: "#FFE7E4";
  secondary3__tint4: "#FFF3F2";
  secondary3__shade1: "#CC9D96";
  secondary3__shade2: "#997671";
  secondary3__shade3: "#664E4B";
  secondary3__shade4: "#332726";

  secondary4: "#EDE8D7";
  secondary4__tint1: "#F1EDDF";
  secondary4__tint2: "#F4F1E7";
  secondary4__tint3: "#F8F6EF";
  secondary4__tint4: "#FBFAF7";
  secondary4__shade1: "#BEBAAC";
  secondary4__shade2: "#8E8B81";
  secondary4__shade3: "#5F5D56";
  secondary4__shade4: "#2F2E2B";

  standard__black: "#333333";
  standard__white: "#FFFFFF";
};

export type ValidColor = AllColorNames[keyof AllColorNames];
export type ValidDefaultColor =
  | AllColorNames["primary"]
  | AllColorNames["secondary1"]
  | AllColorNames["secondary2"]
  | AllColorNames["secondary3"]
  | AllColorNames["secondary4"]
  | AllColorNames["standard__black"]
  | AllColorNames["standard__white"];

export const standardColors = {
  black: "#333333" as AllColorNames["standard__black"],
  white: "#FFFFFF" as AllColorNames["standard__white"],
};

export type ColorPair = {
  bg: ValidColor;
  text: ValidColor;
  border?: ValidColor;
};
export type DefaultColorPair = {
  bg: ValidDefaultColor;
  text: ValidColor;
  border?: ValidColor;
};

export type ColorSeries = ColorPair[];

export type ColorSet = {
  default: DefaultColorPair;
  tint?: ColorSeries;
  shade?: ColorSeries;
};

type ColorNames =
  | "primary"
  | "secondary1"
  | "secondary2"
  | "secondary3"
  | "secondary4"
  | "standardBlack"
  | "standardWhite";

type ColorNamesWithoutStandard = Exclude<
  ColorNames,
  "standardBlack" | "standardWhite"
>;

export const colorPairs: {
  [key in ColorNamesWithoutStandard]: ColorSet;
} = {
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
        text: "#333333",
      },
      {
        bg: "#B7B4DE",
        text: "#333333",
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

export function getTextColor(color: ValidColor): ValidColor {
  const res = scheme
    .concat(standardPairs)
    .reduce(function (prev: ValidColor | null, c: ColorSet) {
      if (prev) return prev;
      if (c.default.bg === color) return c.default.text;
      const tint = c.tint?.find((i) => i.bg === color)?.text;
      if (tint) return tint;
      const shade = c.shade?.find((i) => i.bg === color)?.text;
      if (shade) return shade;
      return null;
    }, null);
  if (!res) return standardColors.black;
  return res;
}
