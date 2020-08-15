import * as React from "react";

import sizes from "@variant/profile/lib/typography";
import css from "./typo.module.css";

const BASE_SIZE = sizes.SIZE_BASE;

const Metadata: React.FC<{
  name: string;
  size: number;
  lineHeight: string;
}> = ({ name, size, lineHeight, children }) => {
  return (
    <article className={css.metadata}>
      <div className={css.metadata__header}>
        <p className="">{name}</p>
        <p className="">
          <span>
            {size / BASE_SIZE}rem / {size}px
          </span>
          <span>{lineHeight} line height</span>
        </p>
      </div>
      {children}
    </article>
  );
};

export default function TypographyInfo() {
  return (
    <div>
      <Metadata size={sizes.SIZE_H1} name="Heading 1" lineHeight="1.2">
        <h1>En ny variant av et konsulentselskap</h1>
      </Metadata>

      <Metadata size={sizes.SIZE_H2} name="Heading 2" lineHeight="1.2">
        <h2>En ny variant av et konsulentselskap</h2>
      </Metadata>

      <Metadata size={sizes.SIZE_H3} name="Heading 3" lineHeight="1.2">
        <h3>En ny variant av et konsulentselskap</h3>
        <h3 className="fancy">En ny variant av et konsulentselskap</h3>
      </Metadata>

      <Metadata size={sizes.SIZE_H4} name="Heading 4" lineHeight="1.3">
        <h4>En ny variant av et konsulentselskap</h4>
        <h4 className="fancy">En ny variant av et konsulentselskap</h4>
      </Metadata>

      <Metadata size={sizes.SIZE_P_LEAD} name="Lead Paragraph" lineHeight="1.3">
        <p className="lead">En ny variant av et konsulentselskap</p>
      </Metadata>

      <Metadata size={sizes.SIZE_P} name="Paragraph" lineHeight="1.6">
        <p>En ny variant av et konsulentselskap</p>
      </Metadata>

      <Metadata size={sizes.SIZE_P_CAPTION} name="Caption" lineHeight="1.4">
        <p className="caption">En ny variant av et konsulentselskap</p>
      </Metadata>
    </div>
  );
}
