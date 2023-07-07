import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

function AuthLayout({ children }: { children?: React.ReactNode }) {
  return (
    <Container
      maxWidth="xs"
      sx={{
        p: 2,
        mx: "auto",
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Stack spacing={4} sx={{ width: "100%" }}>
        <Box textAlign="center">
          <img
            src="/logo.png"
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Outlet />
        {children}
      </Stack>
    </Container>
  );
}

export default AuthLayout;
