import * as React from "react";
import * as blobs2 from "blobs/v2";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import { allColorRecords, randomColorRecord } from "../color-grid/colors";
import css from "./blobs.module.css";
import CopyableText from "../components/copyable-text";
import SvgBlob, { SvgBlobProps } from "../components/svg-blob";
import useThrottle from "@react-hook/throttle";
import DownloadGroup from "./download-group";
import ColorSelect, { ColorSelectValue } from "./color-select";

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
        <button onClick={reshape} type="button">
          Reshape
        </button>

        <Group name="Size">
          <Input min={100} max={1000} step={10} onInput={setSize} val={size} />
        </Group>

        {!image && (
          <Group name="Fill color">
            <ColorSelect onChange={setColor} value={color} />
          </Group>
        )}

        <Group name="Image (optional)">
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
}> = ({ name, children }) => {
  return (
    <div>
      <h5>{name}</h5>

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
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={val}
      onChange={(e) => onInput(Number(e.currentTarget.value))}
    />
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
