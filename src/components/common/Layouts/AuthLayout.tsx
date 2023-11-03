import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Images } from "src/constants";
// import Logo from "assets/images/logo.png";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      width="100%"
      height="100vh"
      // bgcolor={theme.palette.primary.light}
      // padding="32px"
      sx={{
        backgroundImage: `url(${Images.AUTH_BACKGROUND})`,
        backgroundPosition: "center",
      }}
    >
      <Box
        width="100%"
        height="100%"
        borderRadius="24px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Box
          display={`${matches ? "flex" : "none"}`}
          alignItems="center"
          justifyContent="center"
          borderRadius="24px"
          border={`1px solid ${theme.palette.primary.main}`}
          flex="1"
        >
          <img className="2xl:w-50" width={200} src={Logo} alt="logo-img" />
        </Box> */}
        <Box
          bgcolor="white"
          padding="30px 40px"
          borderRadius="12px"
          sx={{ opacity: 0.9 }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
