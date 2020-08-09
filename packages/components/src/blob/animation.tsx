import React, { useCallback, useEffect, useRef, memo } from "react";
import { canvasPath as animCanvasPath } from "blobs/v2/animate";
import { BlobProps } from "./base";
import { colors } from "@variant/profile";
import { useIsMountedRef } from "../utils/useMounted";
import { useReducedMotion } from "framer-motion";

type AnimatedBlobProps = BlobProps & {
  animationSpeed?: number;
};

export const AnimatedBlob: React.FC<AnimatedBlobProps> = memo(
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
    const isMountedRef = useIsMountedRef();
    const reduceMotion = useReducedMotion();

    const startAnimation = useCallback(
      (
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement | null = null
      ) => {
        const animation = animCanvasPath();
        const renderFunction = () => {
          // Abort loop if dismounted
          if (!isMountedRef.current) return;
          ctx.restore();
          ctx.clearRect(0, 0, width, height);
          if (image) {
            ctx.save();
            ctx.clip(animation.renderFrame(), "nonzero");

            ctx.drawImage(image, 0, 0, width, height);
          } else {
            ctx.fill(animation.renderFrame());
          }
          if (!reduceMotion) {
            requestAnimationFrame(renderFunction);
          }
        };
        requestAnimationFrame(renderFunction);

        const renderLoop = () => {
          animation.transition({
            duration: 3500,
            callback: renderLoop,
            blobOptions: {
              seed,
              randomness,
              extraPoints: randomize(extraPoints, 4),
              size: Math.min(width, height),
            },
          });
        };

        // Initial frame.
        animation.transition({
          duration: 0, // Render immediately.
          callback: renderLoop,
          blobOptions: {
            seed,
            extraPoints,
            randomness,
            size: Math.min(width, height),
          },
        });
      },
      [seed, extraPoints, randomness, height, width, reduceMotion]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      ctx?.clearRect(0, 0, width, height);
      if (imgSource) {
        const imgObj = new Image();
        imgObj.src = imgSource;
        imgObj.onload = () => {
          startAnimation(ctx as CanvasRenderingContext2D, imgObj);
        };
      } else if (ctx) {
        ctx.fillStyle = color;
        startAnimation(ctx);
      }
    }, [startAnimation, height, width, imgSource, color]);

    return <canvas ref={canvasRef} {...{ ...rest, height, width }} />;
  }
);

const randomize = (baseRandom: number, spread: number = 5) => {
  return Math.max(
    baseRandom + (Math.floor(Math.random() * spread * 2) - spread),
    2
  );
};
