import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function YoutubeSocialIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M45.24 90.2272C69.9382 90.2272 89.96 70.2276 89.96 45.5568C89.96 20.886 69.9382 0.886383 45.24 0.886383C20.5419 0.886383 0.52002 20.886 0.52002 45.5568C0.52002 70.2276 20.5419 90.2272 45.24 90.2272Z"
        fill="url(#paint0_linear_6_659)"
      />
      <path
        d="M69.1906 39.0487C69.1906 33.1212 64.3882 28.3242 58.4541 28.3242H30.9859C25.0517 28.3242 20.2494 33.1212 20.2494 39.0487V51.8204C20.2494 57.748 25.0517 62.545 30.9859 62.545H58.4541C64.3882 62.545 69.1906 57.748 69.1906 51.8204V39.0487ZM53.04 46.3818L40.7129 52.4621C40.2235 52.7371 38.6023 52.3704 38.6023 51.8204V39.3543C38.6023 38.8043 40.2541 38.4376 40.7435 38.7126L52.52 45.129C53.0094 45.404 53.5294 46.1068 53.04 46.3818Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_659"
          x1="76.8576"
          y1="13.9523"
          x2="13.678"
          y2="77.202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF0000" />
          <stop offset="1" stop-color="#850000" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}

export default YoutubeSocialIcon;
