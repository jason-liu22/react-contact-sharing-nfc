import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function FacebookSocialIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M89.44 44.6704C89.44 20.0131 69.4353 0 44.72 0C20.0047 0 0 20.0131 0 44.6704C0 66.9751 16.3647 85.4604 37.7459 88.7908V57.5949H26.3671V44.6704H37.7153V34.8319C37.7153 23.649 44.3835 17.4465 54.6 17.4465C59.4941 17.4465 64.6024 18.3326 64.6024 18.3326V29.3321H58.9741C53.4071 29.3321 51.6941 32.7848 51.6941 36.2985V44.6704H64.1129L62.1247 57.5949H51.6941V88.8214C73.1059 85.4604 89.44 66.9751 89.44 44.6704Z"
        fill="url(#paint0_linear_6_667)"
      />
      <path
        d="M62.1247 57.5949L64.1129 44.6704H51.6941V36.2985C51.6941 32.7542 53.4377 29.3321 58.9741 29.3321H64.6024V18.3326C64.6024 18.3326 59.4941 17.4465 54.6 17.4465C44.3835 17.4465 37.7153 23.6185 37.7153 34.8319V44.6704H26.3671V57.5949H37.7153V88.8214C39.9788 89.188 42.3341 89.3714 44.6894 89.3714C47.0447 89.3714 49.4 89.188 51.6635 88.8214V57.5949H62.1247Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_667"
          x1="13.0997"
          y1="13.0849"
          x2="76.2787"
          y2="76.3343"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#4676ED" />
          <stop offset="0.1854" stop-color="#436DE4" />
          <stop offset="0.487" stop-color="#3C55CD" />
          <stop offset="0.8651" stop-color="#302EA8" />
          <stop offset="1" stop-color="#2B1E99" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}

export default FacebookSocialIcon;
