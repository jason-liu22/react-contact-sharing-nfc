import React from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import useMode from "../hooks/useMode";
import useFieldEdit from "../hooks/useFieldEdit";
import { UserDataContextType } from "../providers/UserDataProvider";

function ContactDetail({ userData }: { userData: UserDataContextType }) {
  const [open, setOpen] = React.useState(true);
  const { mode } = useMode();
  const { updateField } = useFieldEdit();
  const { phone, email, location, website } = userData;

  const handleClick = () => {
    setOpen(!open);
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
        <ListItemText primary="Contact Detail" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* {email && ( */}
        <ListItem
          disablePadding
          color="#000000"
          secondaryAction={
            mode === "user-view" ? (
              <IconButton
                edge="end"
                aria-label="phone-edit"
                onClick={() => {
                  updateField({
                    name: "email",
                    label: "Email",
                    value: !!userData?.email ? userData.email : "",
                  });
                }}
              >
                <BorderColorOutlinedIcon />
              </IconButton>
            ) : null
          }
        >
          <ListItemButton component={Link} href={`mailto:${email || ""}`}>
            <ListItemIcon>
              <DraftsOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={userData?.email || ""} />
          </ListItemButton>
        </ListItem>
        {/* )} */}
        {/* {phone && ( */}
        <ListItem
          disablePadding
          color="#000000"
          secondaryAction={
            mode === "user-view" ? (
              <IconButton
                edge="end"
                aria-label="phone-edit"
                onClick={() => {
                  updateField({
                    name: "phone",
                    label: "Phone Number",
                    value: !!userData?.phone ? userData.phone : "",
                  });
                }}
              >
                <BorderColorOutlinedIcon />
              </IconButton>
            ) : null
          }
        >
          <ListItemButton component={Link} href={`tel:${phone || ""}`}>
            <ListItemIcon>
              <PhoneInTalkOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={userData?.phone || ""} />
          </ListItemButton>
        </ListItem>
        {/* )} */}
        {/* {location && ( */}
        <ListItem
          disablePadding
          secondaryAction={
            mode === "user-view" ? (
              <IconButton
                edge="end"
                aria-label="phone-edit"
                onClick={() => {
                  updateField({
                    name: "location",
                    label: "Address",
                    value: (userData?.location as string) || "",
                  });
                }}
              >
                <BorderColorOutlinedIcon />
              </IconButton>
            ) : null
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <PlaceOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={userData?.location || ""} />
          </ListItemButton>
        </ListItem>
        {/* )} */}
        {/* {website && ( */}
        <ListItem
          disablePadding
          color="#000000"
          secondaryAction={
            mode === "user-view" ? (
              <IconButton
                edge="end"
                aria-label="phone-edit"
                onClick={() => {
                  updateField({
                    name: "website",
                    label: "Website",
                    value: (userData?.website as string) || "",
                  });
                }}
              >
                <BorderColorOutlinedIcon />
              </IconButton>
            ) : null
          }
        >
          <ListItemButton
            component={Link}
            href={website?.startsWith("http") ? website : `https://${website}`}
            target="_blank"
          >
            <ListItemIcon>
              <LanguageOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={userData?.website || ""}
              sx={{ textDecoration: "underline" }}
            />
          </ListItemButton>
        </ListItem>
        {/* )} */}
      </Collapse>
    </List>
  );
}

export default ContactDetail;
