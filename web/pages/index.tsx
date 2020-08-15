import React, { useEffect, useState, useRef } from "react";
import ColorSection from "@variant/styleguide/color-grid";
import TypographyInfo from "@variant/styleguide/typopgraphy-info";
import BlobGenerator from "@variant/styleguide/blobs";
import { BaseBlob, AnimatedBlob, CSSAnimated } from "@variant/components/blob";
import Head from "next/head";

import css from "@variant/styleguide/pages/app.module.css";

const favicon = require("@variant/profile/logo/favicon.png");
const logoBw = require("@variant/profile/logo/variant-bw.svg");
const logoColors = require("@variant/profile/logo/variant-colors.svg");

const Home = () => {
  const [val, ref] = usePercentageInView<HTMLDivElement>();

  return (
    <div className={css.container} style={{ ["--bg-opacity" as any]: 1 - val }}>
      <Head>
        <title>Styleguide – Variant</title>
        <link rel="icon" href={favicon} />
      </Head>

      <div className={css.hero} ref={ref}>
        <h1>Variant Styleguide</h1>
      </div>

      <div className={css.section}>
        <h2>Logo</h2>

        <div className={css.logoSection}>
          <img src={logoBw} alt="Variant" />
          <img src={logoColors} alt="Variant" />
        </div>

        <p>
          For the color version you are encouraged to make your own twist with
          cliped illustration. Make sure to check the contrast where you use it.
        </p>
      </div>

      <div className={css.section}>
        <h2>Typography</h2>

        <TypographyInfo />
      </div>

      <div className={css.section}>
        <h2>Colors</h2>

        <ColorSection />
      </div>

      <div className={css.section}>
        <h2>Blobs</h2>

        <BlobGenerator />
      </div>
      <div className={css.section}>
        <h2>Components</h2>
        <h3>Blob</h3>
        <p>
          Using the same seed, points, and pointSpread values as generator
          above.
        </p>
        <p>Size of blob is calcuated as min(width, height).</p>
        <BaseBlob height={150} width={150} seed="Variant" />
        <pre>
          <code>{`<BaseBlob height={150} width={150} seed="Variant" />`}</code>
        </pre>
        <BaseBlob
          height={150}
          width={150}
          seed="Variant"
          imageProps={{ src: "/logo-192.png", alt: "Variant Logo" }}
        />
        <pre>
          <code>
            {`<VariantBlob
  height={150}
  width={150}
  seed="Variant"
  imageProps={{ src: "/logo-192.png", alt: "Variant Logo" }}
  />`}
          </code>
        </pre>
        <AnimatedBlob height={150} width={150} seed="Variant" />
        <pre>
          <code>
            {`<AnimatedBlob height={150} width={150} seed="Variant" />`}
          </code>
        </pre>
        <AnimatedBlob
          height={150}
          width={150}
          seed="Variant"
          imageProps={{ src: "/logo-192.png", alt: "Variant Logo" }}
        />
        <pre>
          <code>
            {`<AnimatedBlob
  height={150}
  width={150}
  seed="Variant"
  imgSource={"/logo-192.png"}
/>`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Home;

const usePercentageInView = <T extends HTMLElement>(): [
  number,
  React.RefObject<T>
] => {
  const [value, setValue] = useState<number>(1);
  const ref = useRef<T>(null);

  useEffect(() => {
    const percentageSeen = throttle(() => {
      if (!ref.current) return;
      const node = ref.current;
      const scrollTop = window.scrollY;
      const elementOffsetTop = node.offsetTop;
      const elementHeight = node.offsetHeight;
      const distance = scrollTop - elementOffsetTop;

      const percentage = Math.round(distance / (elementHeight / 100));
      const newValue = Number(
        (Math.min(100, Math.max(0, percentage)) / 100).toPrecision(1)
      );
      setValue(newValue);
    }, 30);

    percentageSeen();
    window.addEventListener("scroll", percentageSeen, {
      passive: true,
    });
    return () => window.addEventListener("scroll", percentageSeen);
  }, [ref]);

  return [value, ref];
};

function throttle(func: () => void, timeout: number) {
  let ready: boolean = true;
  return () => {
    if (!ready) {
      return;
    }

    ready = false;
    func();
    setTimeout(() => {
      ready = true;
    }, timeout);
  };
}
