import { Stack, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = (props: {
  path: string;
  title: string;
  icon: React.ReactNode;
  // onSelect: () => void;
}) => {
  const { pathname } = useLocation();
  return (
    <Box>
      {/* <Link to={props.path} onClick={props.onSelect}> */}
      <Link to={props.path}>
        <Box
          paddingLeft="10px"
          paddingY="12px"
          bgcolor={`${pathname === props.path ? "#ececec" : ""}`}
          sx={{ cursor: "pointer" }}
        >
          <Stack direction="row" gap="4px" alignItems="center">
            {props.icon}
            <Typography>{props.title}</Typography>
          </Stack>
        </Box>
      </Link>
    </Box>
  );
};

export default SidebarItem;
