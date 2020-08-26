import React, { useMemo } from "react";
import { svgPath } from "blobs/v2";
import { colors } from "@variant/profile/lib";

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
  color?: colors.ValidColor;
  alt?: string;
} & JSX.IntrinsicAttributes;

export const BaseBlob: React.FC<BlobProps> = React.memo(
  ({
    width,
    height,
    seed = Math.random(),
    extraPoints = 4,
    randomness = 9,
    color = colors.colorPairs.primary.default.bg,
    imageProps,
    alt,
    ...rest
  }) => {
    const blobID = useMemo(
      () => genHashString(seed, extraPoints, randomness, width, height),
      [seed, extraPoints, randomness, width, height]
    );
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
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...rest}
      >
        {alt && <title>{alt}</title>}
        <path fill={color} d={blobPath} />
      </svg>
    ) : (
      <>
        <img
          height={height}
          width={width}
          style={{ clipPath: `url(#${blobID})` }}
          alt={alt}
          {...imageProps}
          {...rest}
        />
        <svg height={0} width={0}>
          <defs>
            <clipPath id={blobID}>
              <path d={blobPath}></path>
            </clipPath>
          </defs>
        </svg>
      </>
    );
  }
);

// Could be unstable when string is large
const genHashString = (...args: any[]): string => {
  const baseString = args.map((a) => a.toString()).join("-");
  let hash = 0,
    i,
    chr;
  for (i = 0; i < baseString.length; i++) {
    chr = baseString.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};
