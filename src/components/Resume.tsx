import { Box, Typography, IconButton } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import useMode from "../hooks/useMode";
import useFieldEdit from "../hooks/useFieldEdit";

function Resume({ resume }: { resume: string }) {
  const { mode } = useMode();
  const { updateField } = useFieldEdit();

  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
        Resume
        </Typography>
        {mode === "user-view" && (
          <IconButton
            size="small"
            onClick={() => {
              updateField({
                name: "resume",
                label: "Resume",
                value: resume,
              });
            }}
          >
            <BorderColorOutlinedIcon sx={{ width: 16, height: 16 }} />
          </IconButton>
        )}
      </Box>
      <Typography variant="subtitle2" fontWeight={400}>
        {resume}
      </Typography>
    </Box>
  );
}

export default Resume;
