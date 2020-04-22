import * as React from "react";
import * as blobs2 from "blobs/v2";
import { useState, useEffect } from "react";
import { Color, colorPairs } from "../color-grid/colors";
import css from "./blobs.module.css";

const Group: React.FC<{
  name: string;
}> = ({ name, children }) => {
  return (
    <div>
      <h4>{name}</h4>

      {children}
    </div>
  );
};

const DownloadLink: React.FC<{
  svg: string;
  size: number;
  type?: "svg" | "png";
}> = ({ svg, size, type = "svg" }) => {
  const blobPngUrl = usePngBlobUrl(svg, size);
  const url =
    type === "svg" ? `data:image/svg+xml;base64,\n${btoa(svg)}` : blobPngUrl;

  return (
    <a href={url} download={`variant-blob.${type}`}>
      Download {type}
    </a>
  );
};

function usePngBlobUrl(svgString: string, size: number) {
  const [blobUrl, setBlobUrl] = useState<string | undefined>();

  useEffect(
    function () {
      var canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext("2d");
      var img = new Image();

      var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      var url = URL.createObjectURL(svg);

      img.onload = function () {
        ctx?.drawImage(img, 0, 0);
        var png = canvas.toDataURL("image/png");
        URL.revokeObjectURL(png);

        setBlobUrl(canvas.toDataURL("image/png"));
      };
      img.src = url;
    },
    [svgString, size]
  );

  return blobUrl;
}

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
      onInput={(e) => onInput(Number(e.currentTarget.value))}
    />
  );
};

const BlobGenerator: React.FC<{}> = () => {
  const [points, setPoints] = useState<number>(2);
  const [size, setSize] = useState<number>(250);
  const [randomness, setRandomness] = useState<number>(9);
  const [fill, setFill] = useState<Color>(colorPairs.primary.default.bg);
  const [seed, setSeed] = useState(Math.random());

  const random = () => setSeed(Math.random());
  useEffect(random, [points, randomness]);

  const svgString = blobs2.svg(
    {
      seed,
      extraPoints: points,
      randomness,
      size,
    },
    {
      fill,
    }
  );

  return (
    <div>
      <Group name="Points">
        <Input
          min={3}
          max={15}
          onInput={(i) => setPoints(i - 3)}
          val={points + 3}
        />
      </Group>
      <Group name="size">
        <Input min={100} max={1000} step={10} onInput={setSize} val={size} />
      </Group>
      <Group name="Point spread">
        <Input min={1} max={20} onInput={setRandomness} val={randomness} />
      </Group>

      <Group name="Fill color">
        <input
          type="color"
          onInput={(e) => setFill(e.currentTarget.value)}
          value={fill}
        />
      </Group>

      <button onClick={random} type="button">
        Random
      </button>

      <div dangerouslySetInnerHTML={{ __html: svgString }}></div>

      <p className={css.downloadLinks}>
        <DownloadLink svg={svgString} size={size} type="svg" />
        <DownloadLink svg={svgString} size={size} type="png" />
      </p>
    </div>
  );
};

export default BlobGenerator;
