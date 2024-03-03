import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "../../controls/IconButton";
import { useDispatch } from "react-redux";
import { setLogout } from "src/store/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Box width="95%" mx="auto">
        <Stack direction="row" paddingY="6px">
          <Stack direction="row" alignItems="center" gap="6px">
            <AdbIcon />
            <Typography variant="h6" noWrap component="span">
              LOGO
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                sx={{ width: "30px", height: "30px" }}
                alt="Remy Sharp"
                src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseMenu}
              MenuListProps={{ sx: { py: 0 } }}
            >
              {/* <MenuItem onClick={handleCloseMenu}> */}
              <Stack
                direction="row"
                alignItems="center"
                gap="10px"
                padding="10px 16px"
              >
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20px",
                  }}
                  alt="Remy Sharp"
                  src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                />
                <Stack>
                  <Typography noWrap sx={{ fontSize: "12px" }}>
                    Superadmin
                  </Typography>
                  <Typography noWrap sx={{ fontSize: "12px" }}>
                    superadmin@yopmail.com
                  </Typography>
                </Stack>
              </Stack>
              {/* </MenuItem> */}
              <Divider />
              <MenuItem onClick={handleCloseMenu}>
                <Stack direction="row" alignItems="center" gap="10px">
                  Edit Profile
                </Stack>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>Change Password</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Box>
    </AppBar>
  );
};

export default Header;
