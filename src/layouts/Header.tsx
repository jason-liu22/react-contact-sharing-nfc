import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Link from "@mui/material/Link";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { Popper } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoreIcon from "../components/icons/MoreIcon";
import { logout } from "../firebase";
import UploadFile from "../components/UploadFile";
import useAuth from "../hooks/useAuth";

function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const userData = useAuth();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleLogout = (event: Event | React.SyntheticEvent) => {
    handleClose(event);
    logout();
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      py={2}
      sx={{ px: { xs: 3, sm: 0 } }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width="100"
          height="50"
          alt="logo"
          src="/logo.png"
          style={{ objectFit: "contain" }}
        />
      </Box>
      {pathname.includes("card") ? (
        <Button variant="contained" component={Link} href="/auth/register">
          Join the network
        </Button>
      ) : (
        <div>
          <IconButton
            ref={anchorRef}
            id="account-button"
            aria-controls={open ? "account-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreIcon sx={{ width: 30, height: 30, color: "primary.main" }} />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            sx={{ zIndex: 100 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="account-menu"
                      aria-labelledby="account-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem component={Link} href="/setting">
                        Setting
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      )}
    </Stack>
  );
}

export default Header;
