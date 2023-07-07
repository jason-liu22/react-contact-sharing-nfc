import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAuthState } from "react-firebase-hooks/auth";
import useFieldEdit from "../hooks/useFieldEdit";
import {
  auth,
  deleteSocialItemOnUserDocument,
  updateFieldOnUserDocument,
  updateSocialArrayFieldOnUserDocument,
} from "../firebase";
import useAuth from "../hooks/useAuth";
import { SingleField } from "../types";
import { SOCIAL_LINKS } from "../constant";

function SingleFieldEditDrawer() {
  const { field, updateField } = useFieldEdit();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const userData = useAuth();

  const handleDelete = async (social: SingleField) => {
    if (field && user) {
      await deleteSocialItemOnUserDocument(
        user.uid,
        social.name,
        social.value,
        social.label
      );
      handleClose();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (user && field) {
      setLoading(true);
      if (field.logo) {
        if (userData?.socials) {
          const found = userData.socials.find(
            (social) => social.name === field.name
          );
          if (found) {
            await handleDelete(found);
          }
        }
        updateSocialArrayFieldOnUserDocument(
          user?.uid,
          field.name,
          field.value.startsWith("http")
            ? field.value
            : // @ts-ignore
              SOCIAL_LINKS[field.name] + "/" + field.value,
          field.label
        ).then((res) => {
          setLoading(false);
        });
      } else {
        updateFieldOnUserDocument(user?.uid, field?.name, field.value).then(
          (res) => {
            setLoading(false);
          }
        );
      }
      handleClose();
    }
  };
  const handleClose = () => {
    updateField(null);
  };

  let placeholder;
  if (field?.logo) {
    if (field.name !== "whatsapp") {
      placeholder = "URL or Username";
    } else {
      placeholder = "Phone Number";
    }
  } else {
    placeholder = field?.label;
  }

  return (
    <Drawer
      anchor="bottom"
      open={!!field}
      PaperProps={{
        sx: {
          mx: "auto",
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
          maxWidth: 360,
          // width: "inherit",
          pb: 5,
        },
      }}
    >
      <Box sx={{ display: "flex", p: 1, justifyContent: "end" }}>
        <IconButton size="small" onClick={handleClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Stack spacing={2} sx={{ p: 1 }}>
        <Typography textAlign="center" variant="h6" fontWeight={700}>
          {field?.label}
        </Typography>
        {field?.logo && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={`/socials/png/${field.logo}.png`}
              width={83}
              height={83}
            />
          </Box>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {field && (
            <TextField
              required
              size="small"
              // type={!!field.logo ? "url" : "text"}
              // type="text"
              placeholder={placeholder}
              label={field?.label}
              name={field?.name}
              value={field.value}
              onChange={(e) => {
                updateField({ ...field, value: e.target.value });
              }}
              {...(field.name === "resume" && { multiline: true, rows: 4 })}
            />
          )}

          {field?.logo && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                component={Link}
                href={
                  field.value.startsWith("http")
                    ? field.value
                    : // @ts-ignore
                      SOCIAL_LINKS[field.name] + "/" + field.value
                }
                target="_blank"
                sx={{ flex: "1 1 0" }}
              >
                Open
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => handleDelete(field)}
                sx={{ flex: "1 1 0" }}
              >
                Delete
              </Button>
            </Box>
          )}
          <Button type="submit" variant="contained">
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
}

export default SingleFieldEditDrawer;
