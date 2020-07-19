import * as React from "react";
import { allColorRecords, randomColorRecord } from "@variant/profile/colors";
import Select, { Styles } from "react-select";
import css from "./blobs.module.css";

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
    <div className={css.colorGroup}>
      <Select<ColorSelectValue>
        label="Colors"
        value={value}
        onChange={(v) => onChange(v as ColorSelectValue)}
        options={allColorRecords}
        styles={colourStyles}
      />

      <label className={css.customColorPickerContainer}>
        All colors:
        <input
          type="color"
          onChange={(e) => {
            const value = e.currentTarget.value;
            onChange({ value, label: value });
          }}
          value={value.value}
        />
      </label>

      <div className={css.rightPos}>
        <button
          className={css.smallButton}
          onClick={() => onChange(randomColorRecord())}
          type="button"
        >
          Random color
        </button>
      </div>
    </div>
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
