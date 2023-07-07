import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { SOCIAL_LIST } from "../constant";
import useAuth from "../hooks/useAuth";
import useFieldEdit from "../hooks/useFieldEdit";

function SocialList() {
  const userData = useAuth();
  const { updateField } = useFieldEdit();

  if (!!userData) {
    return (
      <Grid container columns={3}>
        {SOCIAL_LIST.map((sc, idx) => {
          const connected = userData?.socials?.find((i) => i.name === sc.name);
          return (
            <Grid
              xs
              item
              key={idx}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <IconButton
                onClick={() => {
                  if (!!connected) {
                    updateField({ ...connected, logo: connected.name });
                  } else {
                    updateField(sc);
                  }
                }}
              >
                {!!connected ? (
                  <Badge
                    badgeContent={
                      <CheckIcon sx={{ width: 8, height: 8, color: "white" }} />
                    }
                    color="primary"
                  >
                    <Box
                      component="img"
                      src={`/socials/png/${sc.name}.png`}
                      alt={sc.name}
                      width={90}
                      height={90}
                    />
                  </Badge>
                ) : (
                  <Box
                    component="img"
                    src={`/socials/png/${sc.name}.png`}
                    alt={sc.name}
                    width={90}
                    height={90}
                  />
                )}
              </IconButton>
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return null;
  }
}

export default SocialList;
