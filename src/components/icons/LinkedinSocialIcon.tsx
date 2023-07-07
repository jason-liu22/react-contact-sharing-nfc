import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function LinkedinSocialIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M44.72 90.083C69.4182 90.083 89.44 70.0834 89.44 45.4126C89.44 20.7418 69.4182 0.742218 44.72 0.742218C20.0218 0.742218 0 20.7418 0 45.4126C0 70.0834 20.0218 90.083 44.72 90.083Z"
        fill="url(#paint0_linear_6_671)"
      />
      <path
        d="M25.9694 37.1019H34.6259V64.9063H25.9694V37.1019ZM30.3129 23.2913C33.0964 23.2913 35.3294 25.5218 35.3294 28.3022C35.3294 31.0521 33.0964 33.3131 30.3129 33.3131C27.5294 33.3131 25.2964 31.0521 25.2964 28.3022C25.2659 25.5218 27.5294 23.2913 30.3129 23.2913Z"
        fill="white"
      />
      <path
        d="M40.0706 37.1019H48.36V40.8906H48.4823C49.6447 38.6907 52.4588 36.3991 56.68 36.3991C65.4282 36.3991 67.0494 42.1433 67.0494 49.6291V64.8757H58.3929V51.3707C58.3929 48.132 58.3317 44.0071 53.8964 44.0071C49.4 44.0071 48.6964 47.5209 48.6964 51.1568V64.9063H40.0706V37.1019Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_671"
          x1="76.3492"
          y1="13.8283"
          x2="13.1696"
          y2="77.078"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#007AB5" />
          <stop offset="1" stop-color="#0046E5" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}

export default LinkedinSocialIcon;
