import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ViewModeProvider from "../providers/ViewModeProvider";
import SingleFieldEditProvider from "../providers/SingleFieldEditProvider";
import SingleFieldEditDrawer from "../components/SingleFieldEditDrawer";
import AuthGuard from "../guards/AuthGuard";

function MainLayout() {
  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "100vh", px: "0px !important", pb: 10 }}
    >
      <AuthGuard>
        <Header />
        <ViewModeProvider>
          <SingleFieldEditProvider>
            <Outlet />
            <SingleFieldEditDrawer />
          </SingleFieldEditProvider>
        </ViewModeProvider>
        <Footer />
      </AuthGuard>
    </Container>
  );
}

export default MainLayout;
