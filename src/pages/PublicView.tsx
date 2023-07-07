import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import ContactDetail from "../components/ContactDetail";
import FollowSocial from "../components/FollowSocial";
import Resume from "../components/Resume";
import UserInfo from "../components/UserInfo";
import { getUserDocument } from "../firebase";
import { UserDataContextType } from "../providers/UserDataProvider";
import ViewModeProvider from "../providers/ViewModeProvider";
import Header from "../layouts/Header";
import LoadingScreen from "../components/LoadingScreen";

function PublicView() {
  const { uid } = useParams();
  const [userData, setUserData] = useState<UserDataContextType | undefined>(
    undefined
  );
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (uid) {
      console.log("uid: ", uid);
      setLoading(true);
      getUserDocument(uid)
        .then((res) => {
          console.log("res: ", res);
          if (!!res) {
            setUserData(res as UserDataContextType);
            setLoading(false);
          } else {
            setLoading(false);
            setNotFound(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          setNotFound(true);
        });
    }
  }, [uid]);
  if (loading) {
    return <LoadingScreen />;
  } else if (!!userData) {
    const theme = createTheme({
      palette: {
        primary: {
          // light: "#B793FD",
          main: userData?.color || "#7C4BF9",
          // dark: "#4525B3",
          contrastText: "white",
        },
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="xs"
          sx={{
            position: "relative",
            minHeight: "100vh",
            pb: 10,
          }}
        >
          <Header />
          <ViewModeProvider>
            {/* <Outlet /> */}
            <Stack spacing={1} sx={{ xs: { px: 3 } }}>
              <UserInfo userData={userData} />
              <Resume resume={userData?.resume || ""} />
              <ContactDetail userData={userData} />
              <FollowSocial socials={userData.socials || []} />
            </Stack>
          </ViewModeProvider>
        </Container>
      </ThemeProvider>
    );
  } else if (notFound) {
    return (
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography color="red" variant="h6">
            Ce profile n'existe pas
          </Typography>
        </Box>
      </Container>
    );
  } else {
    return null;
  }
}

export default PublicView;
