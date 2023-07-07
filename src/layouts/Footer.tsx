import { useLocation } from "react-router-dom";
import {
  IconButton,
  Link,
  // Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import SellIcon from "@mui/icons-material/Sell";

function Footer() {
  const { pathname } = useLocation();
  return (
    <AppBar
      position="fixed"
      sx={{
        bottom: 0,
        top: "auto",
        left: "auto",
        right: "auto",
        bgcolor: "white",
        width: "inherit",
        maxWidth: "inherit",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/live-view">
          <IconButton aria-label="preview">
            <OndemandVideoIcon
              sx={{
                width: 32,
                height: 32,
                color: pathname.includes("live-view")
                  ? "primary.main"
                  : "gray.main",
              }}
            />
          </IconButton>
        </Link>
        <Link href="/user-view">
          <IconButton aria-label="edit">
            <EditIcon
              sx={{
                width: 32,
                height: 32,
                color: pathname.includes("user-view")
                  ? "primary.main"
                  : "gray.main",
              }}
            />
          </IconButton>
        </Link>
        <Link href="/add-social-links">
          <IconButton aria-label="setting">
            <PeopleIcon
              sx={{
                width: 32,
                height: 32,
                color: pathname.includes("add-social-links")
                  ? "primary.main"
                  : "gray.main",
              }}
            />
          </IconButton>
        </Link>
        <Link href="/edit">
          <IconButton aria-label="pin">
            <SellIcon
              sx={{
                width: 32,
                height: 32,
                color: pathname.includes("edit") ? "primary.main" : "gray.main",
              }}
            />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
    // <Stack
    //   direction="row"
    //   justifyContent="space-between"
    //   alignItems="center"
    //   sx={{
    //     display: "flex",
    //     bgcolor: "white",
    //     borderTopLeftRadius: "4px",
    //     borderTopRightRadius: "4px",
    //     boxShadow: (theme) => theme.shadows[1],
    //     position: "fixed",
    //     bottom: 0,
    //     left: 32,
    //     right: 32,
    //   }}
    // >
    //   <Link href="/live-view">
    //     <IconButton aria-label="preview">
    //       <OndemandVideoIcon
    //         sx={{
    //           width: 32,
    //           height: 32,
    //           color: pathname.includes("live-view")
    //             ? "primary.main"
    //             : "gray.main",
    //         }}
    //       />
    //     </IconButton>
    //   </Link>
    //   <Link href="/user-view">
    //     <IconButton aria-label="edit">
    //       <EditIcon
    //         sx={{
    //           width: 32,
    //           height: 32,
    //           color: pathname.includes("user-view")
    //             ? "primary.main"
    //             : "gray.main",
    //         }}
    //       />
    //     </IconButton>
    //   </Link>
    //   <Link href="/add-social-links">
    //     <IconButton aria-label="setting">
    //       <PeopleIcon
    //         sx={{
    //           width: 32,
    //           height: 32,
    //           color: pathname.includes("add-social-links")
    //             ? "primary.main"
    //             : "gray.main",
    //         }}
    //       />
    //     </IconButton>
    //   </Link>
    //   <Link href="/edit">
    //     <IconButton aria-label="pin">
    //       <SellIcon
    //         sx={{
    //           width: 32,
    //           height: 32,
    //           color: pathname.includes("edit") ? "primary.main" : "gray.main",
    //         }}
    //       />
    //     </IconButton>
    //   </Link>
    // </Stack>
  );
}

export default Footer;
