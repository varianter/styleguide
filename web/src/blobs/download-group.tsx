import { SvgBlobProps, blobAsString } from "../components/svg-blob";
import React from "react";
import css from "./blobs.module.css";
import useConfirmationText from "../components/use-confirmation-text";

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

    const copyPng = async () => {
      const svgString = await blobAsString(props);
      copySvgStringAsPngOnClipboard(svgString, props.size!);
    };
    const [onCopyPngClick, confirmationIcon] = useConfirmationText(copyPng);

    return (
      <div className={css.buttonGroup}>
        <button
          className={css.saveButton}
          onClick={() => generateAndDownload("svg")}
        >
          Download svg
        </button>
        <button
          className={css.saveButton}
          onClick={() => generateAndDownload("png")}
        >
          Download png
        </button>
        <button className={css.saveButton} onClick={onCopyPngClick}>
          Copy PNG{confirmationIcon}
        </button>
      </div>
    );
  }
);

export default DownloadGroup;

function generatePngBlob(svgString: string, size: number) {
  return new Promise<Blob | null>(function (res) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svg);

    img.onload = function () {
      ctx?.drawImage(img, 0, 0, size, size);
      canvas.toBlob(function (blob) {
        res(blob);
      });
    };
    img.src = url;
  });
}
async function generatePngBlobUrl(svgString: string, size: number) {
  const blob = await generatePngBlob(svgString, size);
  return URL.createObjectURL(blob);
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

declare global {
  class ClipboardItem {
    constructor(data: { [mimeType: string]: Blob });
  }

  interface Clipboard {
    write(ClipboardItem: ClipboardItem): Promise<void>;
  }
}

async function copySvgStringAsPngOnClipboard(svgString: string, size: number) {
  try {
    const blobBlob = await generatePngBlob(svgString, size!);

    const permissionStatus = await navigator.permissions.query({
      name: "clipboard-write" as PermissionName,
    });

    if (!blobBlob || permissionStatus.state !== "granted") {
      return;
    }

    let data = new ClipboardItem({ [blobBlob.type]: blobBlob });
    navigator.clipboard.write([data]);
  } catch (error) {
    console.error(error);
  }
}
