import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import useMode from "../hooks/useMode";
import useFieldEdit from "../hooks/useFieldEdit";
import { SingleField } from "../types";
import { SOCIAL_LINKS } from "../constant";

function FollowSocial({ socials }: { socials: SingleField[] }) {
  const [open, setOpen] = React.useState(true);
  const { mode } = useMode();
  const { updateField } = useFieldEdit();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickItem = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: SingleField
  ) => {
    if (mode === "user-view") {
      e.preventDefault();
      updateField(item);
    }
  };

  return (
    <List>
      <ListItemButton
        onClick={handleClick}
        sx={{
          py: 1,
          pr: 1,
          borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
        }}
      >
        <ListItemText primary="Follow me" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Container sx={{ px: 3 }}>
          <Grid container spacing={2} columns={4}>
            {socials.length > 0 &&
              socials.map((social, idx) => (
                <Grid key={idx} item>
                  <IconButton
                    color="primary"
                    component={Link}
                    href={
                      social.value.startsWith("http")
                        ? social.value
                        : // @ts-ignore
                          SOCIAL_LINKS[social.name] + "/" + social.value
                    }
                    target="_blank"
                    onClick={(e) => {
                      handleClickItem(e, { ...social, logo: social.name });
                    }}
                  >
                    {mode === "user-view" ? (
                      <Badge
                        badgeContent={
                          <BorderColorOutlinedIcon
                            sx={{ color: "gray", width: 16 }}
                          />
                        }
                      >
                        <Box
                          component="img"
                          src={`/socials/png/${social.name}.png`}
                          alt={social.name}
                          width={37}
                          height={37}
                        />
                      </Badge>
                    ) : (
                      <Box
                        component="img"
                        src={`/socials/png/${social.name}.png`}
                        alt={social.name}
                        width={37}
                        height={37}
                      />
                    )}
                  </IconButton>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Collapse>
    </List>
  );
}

export default FollowSocial;
