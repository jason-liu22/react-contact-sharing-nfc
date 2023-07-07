import { SvgIcon, SvgIconProps } from "@mui/material";

function PasswordLockIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9961 16H16.0061M11.9951 16H12.0051M7.99512 16H8.00312"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default PasswordLockIcon;
