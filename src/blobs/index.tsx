import * as React from "react";
import * as blobs2 from "blobs/v2";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import {
  allColorRecords,
  randomColorRecord,
  allColors,
} from "../color-grid/colors";
import css from "./blobs.module.css";
import CopyableText from "../components/copyable-text";
import SvgBlob, { SvgBlobProps } from "../components/svg-blob";
import useThrottle from "@react-hook/throttle";
import DownloadGroup from "./download-group";
import ColorSelect, { ColorSelectValue } from "./color-select";

import {
  SliderInput,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle,
  SliderMarker,
} from "@reach/slider";
import "@reach/slider/styles.css";

type Range = {
  min: number;
  max: number;
};

const DEFAULTS_POINTS: Range = {
  min: 3,
  max: 15,
} as const;

const DEFAULTS_SPREAD: Range = {
  min: 1,
  max: 20,
};

const BlobGenerator: React.FC<{}> = () => {
  const [image, setImage] = useState<File | undefined>();
  const [points, setPoints] = useThrottle<number>(2);
  const [size, setSize] = useThrottle<number>(250);
  const [randomness, setRandomness] = useThrottle<number>(9);
  const [color, setColor] = useThrottle<ColorSelectValue>(allColorRecords[0]);
  const [imageScale, setScale] = useThrottle<number>(100);
  const [imagePosition, setImagePosition] = useThrottle<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [seed, setSeed] = useState(Math.random());
  const reshape = () => setSeed(Math.random());
  useEffect(reshape, [points, randomness]);

  const random = () => {
    setPoints(pickRandom(DEFAULTS_POINTS));
    setRandomness(pickRandom(DEFAULTS_POINTS));
    setColor(randomColorRecord());
    reshape();
  };

  const svgPath = blobs2.svgPath({
    seed,
    extraPoints: points,
    randomness,
    size,
  });

  const svgOpts: SvgBlobProps = {
    path: svgPath,
    color: color.value,
    size,
    image,
    imageScale,
    imagePosition,
  };

  return (
    <section className={css.container}>
      <aside className={css.options}>
        <Group name="Points">
          <Input
            min={DEFAULTS_POINTS.min}
            max={DEFAULTS_POINTS.max}
            onInput={(i) => setPoints(i - 3)}
            val={points + 3}
          />
        </Group>
        <Group name="Point spread">
          <Input
            min={DEFAULTS_SPREAD.min}
            max={DEFAULTS_SPREAD.max}
            onInput={setRandomness}
            val={randomness}
          />
        </Group>

        <div className={css.rightPos}>
          <button className={css.smallButton} onClick={reshape} type="button">
            Reshape
          </button>
        </div>

        <Group name="Size">
          <Input min={100} max={1000} step={10} onInput={setSize} val={size} />
        </Group>

        {!image && (
          <Group name="Fill color">
            <ColorSelect onChange={setColor} value={color} />
          </Group>
        )}

        <Group name="Image (optional)" className={css.imageUploadGroup}>
          <UploadFile value={image} onChange={setImage} />

          {image && (
            <div>
              <p>Image scale</p>
              <Input val={imageScale} min={10} max={200} onInput={setScale} />
            </div>
          )}
        </Group>
      </aside>

      <div className={css.canvas}>
        <SvgBlob {...svgOpts} imagePositionChanged={setImagePosition} />
      </div>

      <button className={css.randomButton} onClick={random} type="button">
        Random
      </button>

      <footer>
        <p className="caption">
          Seed: <CopyableText Component="span">{seed}</CopyableText>
        </p>
        <div className={css.downloadLinks}>
          <DownloadGroup seed={seed} {...svgOpts} />
        </div>
      </footer>
    </section>
  );
};

export default BlobGenerator;

const Group: React.FC<{
  name: string;
  className?: string;
}> = ({ name, children, className }) => {
  return (
    <div className={className}>
      <p>{name}</p>
      {children}
    </div>
  );
};

const Input: React.FC<{
  val: number;
  onInput: (val: number) => void;
  min: number;
  max: number;
  step?: number;
}> = ({ onInput, min, max, val, step = 1 }) => {
  return (
    <SliderInput
      min={min}
      max={max}
      step={step}
      onChange={(v) => onInput(v)}
      value={val}
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <SliderTrack style={{ background: allColors.secondary4__tint3 }}>
        <SliderTrackHighlight style={{ background: allColors.secondary1 }} />
        <SliderMarker value={val} />
        <SliderHandle
          style={{
            borderColor: allColors.secondary1,
            background: allColors.secondary1,
          }}
        />
      </SliderTrack>
    </SliderInput>
  );
};

const UploadFile: React.FC<{
  value?: File;
  onChange(imgBase64?: File): void;
}> = ({ value, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);

  const internalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    onChange(file);
  };

  useEffect(() => {
    if (!value && ref.current) {
      ref.current.value = "";
    }
  }, [value]);

  return (
    <div className={css.fileContainer}>
      <input
        ref={ref}
        id="file-imageupload"
        type="file"
        accept="image/png, image/jpeg"
        onChange={internalChange}
        className={css.fileInput}
      />
      <label htmlFor="file-imageupload" title={value?.name}>
        {value ? "File: " + value.name : "Choose file"}
      </label>

      {value && (
        <button
          className={css.clearIcon}
          onClick={() => onChange(undefined)}
          type="button"
        >
          <span role="img" aria-label="Clear image">
            ❌
          </span>
        </button>
      )}
    </div>
  );
};

function pickRandom({ min, max }: Range) {
  return Math.random() * (max - min) + min;
}
