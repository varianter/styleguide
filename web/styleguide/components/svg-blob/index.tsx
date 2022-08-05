import * as React from 'react';
import { ValidDefaultColor } from '@variant/profile/lib/colors';
import { RefObject, useState, useEffect } from 'react';
import useDraggable from './draggable';

export type SvgBlobProps = {
  path: string;
  color: string;
  size?: number;
  stroke?: ValidDefaultColor | 'none';
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
    stroke = 'none',
    strokeWidth = 0,
    svgRef,
    image,
    imageScale = 100,
    imagePositionChanged = () => {},
  }) => {
    const { position: translation, drag } = useDraggable({
      onDragEnd: imagePositionChanged,
    });

    const { imageString, scaleDimensions } = useImageData(image);

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
              height={`${scaleDimensions.height * imageScale}%`}
              width={`${scaleDimensions.width * imageScale}%`}
              x={translation.x}
              y={translation.y}
              preserveAspectRatio="xMinYMin slice"
              xlinkHref={imageString}
              style={{ cursor: 'move' }}
            />
          </>
        )}
      </svg>
    );
  },
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
  stroke = 'none',
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
  stroke = 'none',
  strokeWidth = 0,
  image,
  imageScale = 100,
  imagePosition = { x: 0, y: 0 },
}: SvgBlobProps) {
  const imageString = await new Promise(function (res) {
    if (!image) return res('');
    const reader = new FileReader();
    reader.addEventListener('load', () => res(String(reader.result)));
    reader.readAsDataURL(image);
  });

  const imageDimensions: { height: number; width: number } = await new Promise(
    (res) => {
      let img = new Image();
      img.src = String(imageString);
      img.onload = () => {
        res({ height: img.height, width: img.width });
        img.remove();
      };
    },
  );

  const scaleDimensions = calculateScaleFromDimensions(imageDimensions);

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
        height="${scaleDimensions.height * imageScale}%"
        width="${scaleDimensions.width * imageScale}%"
        x="${imagePosition.x}"
        y="${imagePosition.y}"
        preserveAspectRatio="xMinYMin slice"
        xlink:href="${imageString}"
      />
    </svg>
`;
}

function useImageData(image: File | undefined) {
  const [imageString, setImageString] = useState<string>();
  const [scaleDimensions, setScaleDimensions] = useState({
    height: 1,
    width: 1,
  });

  useEffect(
    function () {
      if (!image) return setImageString(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImageString(String(reader.result)),
      );
      reader.readAsDataURL(image);
    },
    [image],
  );
  useEffect(() => {
    if (imageString) {
      const img = new Image();
      img.src = String(imageString);
      img.onload = () => {
        setScaleDimensions(
          calculateScaleFromDimensions({
            height: img.height,
            width: img.width,
          }),
        );
        img.remove();
      };
    }
  }, [imageString]);

  return {
    imageString,
    scaleDimensions,
  };
}

function calculateScaleFromDimensions(dimensions: {
  height: number;
  width: number;
}) {
  const { height: h, width: w } = dimensions;
  return { height: h > w ? h / w : 1, width: w > h ? w / h : 1 };
}
