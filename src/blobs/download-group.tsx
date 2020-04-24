import { SvgBlobProps, blobAsString } from "../components/svg-blob";
import React from "react";
import css from "./blobs.module.css";

const DownloadGroup: React.FC<{ seed: number } & SvgBlobProps> = React.memo(
  ({ seed, ...props }) => {
    const generateAndDownload = async (type: "svg" | "png") => {
      const svgString = await blobAsString(props);
      const filename = `${String(seed).substr(2)}.${type}`;

      const url =
        type === "svg"
          ? `data:image/svg+xml;base64,\n${btoa(svgString)}`
          : await generatePngBlobUrl(svgString, props.size!);

      return download(filename, url);
    };
    return (
      <div className={css.buttonGroup}>
        <button
          className={css.button}
          onClick={() => generateAndDownload("svg")}
        >
          Download svg
        </button>
        <button
          className={css.button}
          onClick={() => generateAndDownload("png")}
        >
          Download png
        </button>
      </div>
    );
  }
);

export default DownloadGroup;

function generatePngBlobUrl(svgString: string, size: number) {
  return new Promise<string>(function (res) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svg);

    img.onload = function () {
      ctx?.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png", 100);
      URL.revokeObjectURL(png);
      res(png);
    };
    img.src = url;
  });
}

function download(filename: string, content: string) {
  var element = document.createElement("a");
  element.setAttribute("href", content);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
