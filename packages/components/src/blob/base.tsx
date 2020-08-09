import React, { useRef, useEffect, useCallback } from "react";
import { canvasPath } from "blobs/v2";
import { colors } from "@variant/profile";

export type BlobProps = {
  seed?: string;
  extraPoints?: number;
  randomness?: number;
  width: number;
  height: number;
  imgSource?: string;
  color?: colors.ValidDefaultColor;
} & JSX.IntrinsicElements["canvas"];

export const BaseBlob: React.FC<BlobProps> = React.memo(
  ({
    width,
    height,
    seed = Math.random(),
    extraPoints = 4,
    randomness = 9,
    color = colors.colorPairs.primary.default.bg.toString(),
    imgSource,
    ...rest
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateBlob = useCallback(
      (
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement | null = null
      ) => {
        // Could store in session for more persistent "randomness" on blobstyle
        const blob = canvasPath({
          seed,
          extraPoints,
          randomness,
          size: Math.min(width, height),
        });
        ctx.clearRect(0, 0, width, height);
        if (image) {
          ctx.clip(blob);
          ctx.drawImage(image, 0, 0, width, height);
        } else {
          ctx?.fill(blob);
        }
      },
      [seed, extraPoints, randomness, width, height]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      ctx?.clearRect(0, 0, width, height);
      if (imgSource) {
        const imgObj = new Image();
        imgObj.src = imgSource;
        imgObj.onload = () => {
          generateBlob(ctx as CanvasRenderingContext2D, imgObj);
        };
      } else if (ctx) {
        ctx.fillStyle = color;
        generateBlob(ctx);
      }
    }, [generateBlob]);

    return <canvas ref={canvasRef} {...rest} />;
  }
);
