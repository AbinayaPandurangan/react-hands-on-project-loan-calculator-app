import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Header() {
  return (
    <>
      <Box
        height="10ch"
        sx={{ backgroundColor: "#18A999", m: "auto", marginBottom: 5 }}
      >
        <Typography
          variant="h3"
          aligh="left"
          gutterBottom
          sx={{ color: "#fff", padding: 1 }}
        >
          Interest Calculator App
        </Typography>
      </Box>
    </>
  );
}
export default Header;
