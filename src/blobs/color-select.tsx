import * as React from "react";
import { allColorRecords, randomColorRecord } from "../color-grid/colors";
import Select, { Styles } from "react-select";

export type ColorSelectValue = {
  label: string;
  value: string;
};

export type ColorSelectProps = {
  onChange(value: ColorSelectValue): void;
  value: ColorSelectValue;
};

const ColorSelect: React.FC<ColorSelectProps> = ({ value, onChange }) => {
  return (
    <>
      <Select<ColorSelectValue>
        label="Colors"
        value={value}
        onChange={(v) => onChange(v as ColorSelectValue)}
        options={allColorRecords}
        styles={colourStyles}
      />

      <input
        type="color"
        onChange={(e) => {
          const value = e.currentTarget.value;
          onChange({ value, label: value });
        }}
        value={value.value}
      />

      <button onClick={() => onChange(randomColorRecord())} type="button">
        Random color
      </button>
    </>
  );
};
export default ColorSelect;

const colorSwatch = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 3,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 15,
    width: 25,
  },
});

const colourStyles: Partial<Styles> = {
  input: (styles) => ({ ...styles, ...colorSwatch() }),
  placeholder: (styles) => ({ ...styles, ...colorSwatch() }),
  option: (styles, { data }) => ({ ...styles, ...colorSwatch(data.value) }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...colorSwatch(data.value),
  }),
};
