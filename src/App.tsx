import React, { useEffect, useState, useRef } from "react";
import ColorSection from "./color-grid";
import css from "./app.module.css";
import TypographyInfo from "./typopgraphy-info";

function App() {
  const [val, ref] = usePercentageInView<HTMLDivElement>();
  return (
    <div className={css.container} style={{ ["--bg-opacity" as any]: 1 - val }}>
      <div className={css.hero} ref={ref}>
        <h1>Variant Styleguide</h1>
      </div>

      <div className={css.section}>
        <h2>Logo</h2>

        <div className={css.logoSection}>
          <img src="/logo/variant-bw.svg" alt="Variant" />
          <img src="/logo/variant-colors.svg" alt="Variant" />
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
    </div>
  );
}

export default App;

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
