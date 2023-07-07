import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function LoadingScreen() {
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
        <CircularProgress color="primary" />
      </Box>
    </Container>
  );
}

export default LoadingScreen;
