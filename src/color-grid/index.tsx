import * as React from "react";
import colorScheme, {
  standardPairs,
  ColorSet,
  ColorSeries,
  ValidColor,
} from "./colors";
import css from "./color-grid.module.css";
import { useState, useEffect } from "react";
import CopyableText from "../components/copyable-text";

const Series: React.FC<{
  series: ColorSeries;
  reversed?: boolean;
  className?: string;
  visible?: boolean;
}> = ({ series, reversed = false, visible = false, className }) => {
  const items = reversed ? [...series].reverse() : series;
  const container = visible ? `${className} ${css.visible}` : className;
  return (
    <div className={container}>
      {items.map((pair) => (
        <div
          key={pair.bg}
          className={css.colorPair}
          style={{ backgroundColor: pair.bg, color: pair.text }}
        >
          <CopyableText>{pair.bg}</CopyableText>
        </div>
      ))}
    </div>
  );
};

const Swatch: React.FC<{
  set: ColorSet;
  selectedId: ValidColor | undefined;
  onClick: (id: ValidColor | undefined) => void;
}> = ({ set, onClick, selectedId }) => {
  const id = set.default.bg;
  const isActive = selectedId === id;
  const click = () => {
    const val = isActive ? undefined : id;
    onClick(val);
  };
  const className = isActive
    ? `${css.colorPair} ${css.colorPairVisible}`
    : `${css.colorPair} ${css.colorPairRadius}`;

  const hasTintOrShade = Boolean(set.tint) || Boolean(set.shade);
  const border = set.default.border
    ? `1px solid ${set.default.border}`
    : undefined;

  const ref = useOnClickOutside<HTMLDivElement>(isActive, () =>
    onClick(undefined)
  );

  return (
    <div
      className={className}
      style={{
        backgroundColor: set.default.bg,
        color: set.default.text,
        border,
      }}
      ref={ref}
    >
      {set.tint && (
        <Series
          className={css.tint}
          series={set.tint}
          visible={selectedId === id}
          reversed={true}
        />
      )}
      <div className={css.colorPairInner}>
        {hasTintOrShade && (
          <button
            className={css.colorPairButton}
            style={{ color: set.default.text }}
            onClick={click}
          >
            <span role="img" aria-label="tints and shades">
              🎨
            </span>
          </button>
        )}
        <CopyableText>{set.default.bg}</CopyableText>
      </div>
      {set.shade && (
        <Series
          className={css.shade}
          series={set.shade}
          visible={selectedId === id}
        />
      )}
    </div>
  );
};

const ColorMatch: React.FC<{ first: ValidColor; second: ValidColor }> = ({
  first,
  second,
}) => {
  return (
    <div className={css.colorMatch}>
      <div className={css.colorMatch__part}>
        <div
          className={css.colorMatch__swatch}
          style={{ background: first }}
        ></div>

        <p className="caption">{first}</p>
      </div>

      <div className={css.colorMatch__part}>
        <div
          className={css.colorMatch__swatch}
          style={{ background: second }}
        ></div>
        <p className="caption">{second}</p>
      </div>
    </div>
  );
};
const ColorExample: React.FC<{ bg: ValidColor; color: ValidColor }> = ({
  bg,
  color,
  children,
}) => {
  return (
    <div className={css.colorMatch}>
      <div className={css.colorMatch__part}>
        <div
          className={css.colorMatch__swatch}
          style={{ background: bg, color }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ColorMatchSet: React.FC = ({ children }) => {
  return <div className={css.colorMatchGroup}>{children}</div>;
};

export default function ColorGrid() {
  const [index, selectIndex] = useState<ValidColor | undefined>(undefined);
  useEscapeKey(() => selectIndex(undefined));

  return (
    <div>
      <h3 className="fancy">Primary colors</h3>
      <div className={css.colorGrid}>
        {colorScheme.map((set, i) => (
          <Swatch
            set={set}
            key={set.default.bg}
            selectedId={index}
            onClick={selectIndex}
          />
        ))}
      </div>

      <div className={css.colorGrid + " " + css.colorGridMargin}>
        {standardPairs.map((set, i) => (
          <Swatch
            set={set}
            key={set.default.bg}
            selectedId={index}
            onClick={selectIndex}
          />
        ))}
      </div>

      <h3 className="fancy">Principles</h3>

      <h4>Universelt utformet</h4>
      <p>
        Farger bør alltid kombineres på en slik måte at kontrastkravene
        tilfredstilles. Minimum AA, men gjerne AAA.
      </p>
      <p>
        I WCAG 2.1 er det også nytt krav som går på kontrast mellom
        UI-komponenter og states.
      </p>
      <p>Farger skal ikke brukes alene for å formidle noe.</p>

      <h4>Fargekombinasjoner</h4>

      <p>
        Farger kan brukes som et virkemiddel for å etablere visuelt hierarki og
        rette fokus mot elementer som er viktige.
      </p>
      <p>
        Det er mulig å både bruke ulike farger for å skape dynamikk og kontrast,
        men også mer nedtonede kontraster av samme farge.
      </p>
      <p>
        Pass på at kontrastkravene er oppfylt ved bruk av tekst eller andre
        meningsbærende elementer.
      </p>

      <h5>Do</h5>
      <p>Hovedfargene kan kombineres sammen:</p>
      <ColorMatchSet>
        <ColorMatch first="#E61A6B" second="#423D89" />
        <ColorMatch first="#FFC4BC" second="#E61A6B" />
        <ColorMatch first="#03DAC6" second="#EDE8D7" />
        <ColorMatch first="#423D89" second="#03DAC6" />
      </ColorMatchSet>

      <p>Hovedfargene kan kombineres sammen med tints/shades av seg selv:</p>

      <ColorMatchSet>
        <ColorMatch first="#423D89" second="#B7B4DE" />
        <ColorMatch first="#E61A6B" second="#FAD2E2" />
      </ColorMatchSet>

      <p>
        Hovedfarger kan kombineres med tints/shades av andre hovedfarger, men
        primært er det varinter av lilla og beige som fungerer best:
      </p>

      <ColorMatchSet>
        <ColorMatch first="#423D89" second="#F8F6EF" />
        <ColorMatch first="#E61A6B" second="#35316E" />
        <ColorMatch first="#03DAC6" second="#F8F6EF" />
        <ColorMatch first="#FFC4BC" second="#35316E" />
      </ColorMatchSet>

      <h5>Don't</h5>
      <p>Ikke god nok kontrast:</p>
      <ColorMatchSet>
        <ColorExample bg="#423D89" color="#9591CE">
          Do you see me?
        </ColorExample>
        <ColorExample bg="#03DAC6" color="#F076A6">
          Do you see me?
        </ColorExample>
      </ColorMatchSet>

      <p>
        Ikke alle hovedfargene lar seg kombinere med tints og shades av andre
        hovedfarger:
      </p>

      <ColorMatchSet>
        <ColorMatch first="#E61A6B" second="#012C28" />
        <ColorMatch first="#03DAC6" second="#CC9D96" />
        <ColorMatch first="#423D89" second="#028377" />
        <ColorMatch first="#FFC4BC" second="#5F5D56" />
        <ColorMatch first="#EDE8D7" second="#5D0A2B" />
        <ColorMatch first="#333333" second="#282552" />
      </ColorMatchSet>
    </div>
  );
}

const _window = window;

const useEscapeKey = (
  callback: (e: KeyboardEvent) => void,
  { window = _window } = {}
) => {
  useEffect(() => {
    if (!window || !window.document || !callback) {
      return;
    }
    const onKeyPress = (event: KeyboardEvent) =>
      event.keyCode === 27 && callback(event);
    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  }, [callback, window]);
};

function useOnClickOutside<T extends HTMLElement>(
  isActive: boolean,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  const ref = React.useRef<T>(null);
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!isActive) return true;
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [isActive, ref, handler]);

  return ref;
}
