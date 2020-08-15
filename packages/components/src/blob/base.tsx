import React, { useMemo } from "react";
import { svgPath } from "blobs/v2";
import { colors } from "@variant/profile";

export type ImageProps = Omit<
  JSX.IntrinsicElements["img"],
  "height" | "width" | "style"
>;
export type BlobProps = {
  seed?: string;
  extraPoints?: number;
  randomness?: number;
  width: number;
  height: number;
  imageProps?: ImageProps;
  color?: colors.ColorPair;
  svgTitle?: string;
};

export const BaseBlob: React.FC<BlobProps> = React.memo(
  ({
    width,
    height,
    seed = Math.random(),
    extraPoints = 4,
    randomness = 9,
    color = colors.colorPairs.primary.default,
    imageProps,
    svgTitle,
  }) => {
    const blobPath = useMemo(
      () =>
        // Could store in session for more persistent "randomness" on blobstyle
        svgPath({
          seed,
          extraPoints,
          randomness,
          size: Math.min(width, height),
        }),

      [seed, extraPoints, randomness, width, height]
    );

    return !imageProps ? (
      <svg
        xlinkTitle={svgTitle ?? ""}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path fill={color.bg} d={blobPath} />
      </svg>
    ) : (
      <>
        <img
          height={height}
          width={width}
          style={{ clipPath: "url(#blobPath)" }}
          {...imageProps}
        />
        <svg height={0} width={0}>
          <defs>
            <clipPath id="blobPath">
              <path d={blobPath}></path>
            </clipPath>
          </defs>
        </svg>
      </>
    );
  }
);
