import React from "react";
import "./BoxFolderAesthetic.css";

const BoxFolderAesthetic = ({
  height,
  backgroundColor,
  darkerBackgroundColor,
  children,
}) => (
  <>
    <div
      className="folder__front"
      style={{
        minHeight: height,
        backgroundColor: backgroundColor,
        borderColor: darkerBackgroundColor,
      }}
    >
      <svg
        className="folder__ribbon"
        viewBox="0 0 53 7"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
      >
        <path style={{ fill: "none" }} d="M0 0h53.535v7.705H0z" />
        <path
          d="M52.553 6.947V4.033a3 3 0 0 0-3-3h-42L3.31 5.276A6 6 0 0 1 .083 6.947h52.47Z"
          style={{ fill: backgroundColor }}
        />
      </svg>

      {children}
    </div>

    <div className="folder__paper"></div>
    <div
      className="folder__back"
      style={{ backgroundColor: darkerBackgroundColor }}
    ></div>
    <svg
      className="folder__ribbon-back"
      viewBox="0 0 39 7"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
    >
      <path
        d="m38.828 6.828-4.071-4.071A6 6 0 0 0 30.515 1H3a3 3 0 0 0-3 3v2.828h38.828Z"
        style={{ fill: darkerBackgroundColor }}
      />
    </svg>
  </>
);

export { BoxFolderAesthetic };
