import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function MoreIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="35" height="3" rx="1.5" />
      <rect x="9" y="8" width="26" height="3" rx="1.5" />
      <rect x="18" y="16" width="17" height="3" rx="1.5" />
    </SvgIcon>
  );
}

export default MoreIcon;
