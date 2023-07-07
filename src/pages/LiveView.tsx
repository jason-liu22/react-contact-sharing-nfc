import Stack from "@mui/material/Stack";
import ContactDetail from "../components/ContactDetail";
import FollowSocial from "../components/FollowSocial";
import Resume from "../components/Resume";
import UserInfo from "../components/UserInfo";
import useAuth from "../hooks/useAuth";

function LiveView() {
  const userData = useAuth();
  if (!!userData) {
    return (
      <Stack spacing={1} sx={{ px: { xs: 3, sm: 0 } }}>
        <UserInfo userData={userData} />
        <Resume resume={userData?.resume || ""} />
        <ContactDetail userData={userData} />
        <FollowSocial socials={userData.socials || []} />
      </Stack>
    );
  } else {
    return null;
  }
}

export default LiveView;
