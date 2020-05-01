import * as React from "react";
import { ValidDefaultColor } from "../../color-grid/colors";
import { RefObject, useState, useEffect } from "react";
import useDraggable from "./draggable";

export type SvgBlobProps = {
  path: string;
  color: string;
  size?: number;
  stroke?: ValidDefaultColor | "none";
  strokeWidth?: number;
  svgRef?: RefObject<SVGSVGElement> | null;
  image?: File;
  imageScale?: number;
  imagePosition?: { x: number; y: number };
  imagePositionChanged?(pos: { x: number; y: number }): void;
};

const SvgBlob: React.FC<SvgBlobProps> = React.memo(
  ({
    path,
    color,
    size = 100,
    stroke = "none",
    strokeWidth = 0,
    svgRef,
    image,
    imageScale = 100,
    imagePositionChanged = () => {},
  }) => {
    const [imageString, setImageString] = useState<string>();
    const { position: translation, drag } = useDraggable({
      onDragEnd: imagePositionChanged,
    });

    useEffect(
      function () {
        if (!image) return setImageString(undefined);
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          setImageString(String(reader.result))
        );
        reader.readAsDataURL(image);
      },
      [image]
    );

    return (
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {!imageString ? (
          <path
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={color}
            d={path}
          />
        ) : (
          <>
            <clipPath id="mask">
              <path
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={color}
                d={path}
              />
            </clipPath>

            <image
              onMouseDown={drag}
              clipPath="url(#mask)"
              height={`${imageScale}%`}
              width={`${imageScale}%`}
              x={translation.x}
              y={translation.y}
              preserveAspectRatio="xMinYMin slice"
              xlinkHref={imageString}
              style={{ cursor: "move" }}
            />
          </>
        )}
      </svg>
    );
  }
);
export default SvgBlob;

export async function blobAsString(opts: SvgBlobProps) {
  if (opts.image) {
    return blobImageAsString(opts);
  }
  return blobWithoutImageString(opts);
}

function blobWithoutImageString({
  path,
  color,
  size = 100,
  stroke = "none",
  strokeWidth = 0,
}: SvgBlobProps) {
  return `
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 ${size} ${size}"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path stroke="${stroke}" stroke-width="${strokeWidth}" fill="${color}" d="${path}" />
    </svg>
`;
}

async function blobImageAsString({
  path,
  color,
  size = 100,
  stroke = "none",
  strokeWidth = 0,
  image,
  imageScale = 100,
  imagePosition = { x: 0, y: 0 },
}: SvgBlobProps) {
  const imageString = await new Promise(function (res) {
    if (!image) return res("");
    const reader = new FileReader();
    reader.addEventListener("load", () => res(String(reader.result)));
    reader.readAsDataURL(image);
  });

  return `
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 ${size} ${size}"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <clipPath id="mask">
        <path stroke="${stroke}" stroke-width="${strokeWidth}" fill="${color}" d="${path}" />
      </clipPath>
      <image
        clip-path="url(#mask)"
        height="${imageScale}%"
        width="${imageScale}%"
        x="${imagePosition.x}"
        y="${imagePosition.y}"
        preserveAspectRatio="xMinYMin slice"
        xlink:href="${imageString}"
      />
    </svg>
`;
}
