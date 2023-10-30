import { Box, useTheme, useMediaQuery } from "@mui/material";
import Logo from "assets/images/logo.png";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      width="100%"
      height="100vh"
      bgcolor={theme.palette.primary.main}
      padding="32px"
    >
      <Box
        width="100%"
        height="100%"
        borderRadius="24px"
        display="flex"
        bgcolor="white"
        padding="32px"
      >
        <Box
          display={`${!matches ? "none" : "flex"}`}
          alignItems="center"
          justifyContent="center"
          borderRadius="24px"
          border={`1px solid ${theme.palette.primary.main}`}
          flex="1"
        >
          <img className="2xl:w-50" width={200} src={Logo} alt="logo-img" />
        </Box>
        <Box flex="1">{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
