"use client";

import * as React from "react";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Adb as AdbIcon,
  AppsOutlined as AppsOutlinedIcon,
  Dashboard as DashboardIcon,
  Create as CreateIcon,
  Settings as SettingsIcon,
  LibraryBooks as LibraryBooksIcon,
  Groups as GroupsIcon,
  Storage as StorageIcon,
  MoreVert as MoreVertIcon,
  Book as BookIcon,
  Upload as UploadIcon,
  ListAlt as ListAltIcon,
  TrackChanges as TrackChangesIcon,
  Person as PersonIcon,
  LockReset as LockResetIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "@/redux/slices/authSlice";
import JournalsList from "./journals/JournalsList";
import { useAppNavigate } from "@/hooks/useAppNavigate";

const pages = [
  {
    name: "Journals",
    loc: "/journal",
    icon: <BookIcon fontSize="small" color="primary" />,
  },
  {
    name: "Articles",
    loc: "/search",
    icon: <StorageIcon fontSize="small" color="primary" />,
  },
  {
    name: "Community",
    loc: "/",
    icon: <GroupsIcon fontSize="small" color="primary" />,
  },

  {
    name: "Library",
    loc: "/",
    icon: <LibraryBooksIcon fontSize="small" color="primary" />,
  },
];

const appMenu = [
  {
    name: "Dashboard",
    loc: "/dashboard",
    icon: <DashboardIcon fontSize="small" color="primary" />,
  },
  {
    name: "Write",
    loc: "/write",
    icon: <CreateIcon fontSize="small" color="primary" />,
  },
  {
    name: "Settings",
    loc: "/settings",
    icon: <SettingsIcon fontSize="small" color="primary" />,
  },
];

const authorsMenu = [
  {
    name: "Submit",
    loc: "/journal",
    icon: <UploadIcon fontSize="small" color="primary" />,
  },
  {
    name: "Submissions",
    loc: "/submissions",
    icon: <ListAltIcon fontSize="small" color="primary" />,
  },
  {
    name: "Track",
    loc: "/track",
    icon: <TrackChangesIcon fontSize="small" color="primary" />,
  },
];

const personalizeMenu = [
  {
    name: "Profile",
    loc: "/user/profile",
    icon: <PersonIcon fontSize="small" color="primary" />,
  },
  {
    name: "Reset Password",
    loc: "/password/forgot",
    icon: <LockResetIcon fontSize="small" color="primary" />,
  },
  {
    name: "Sign Out",
    loc: "/signout",
    icon: <LogoutIcon fontSize="small" color="primary" />,
  },
];

export default function Header() {
  const theme = useTheme();
  const isMounted = React.useRef(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { auth } = useSelector(getAuthState);
  const router = useRouter();
  const [anchorMore, setAnchorMore] = React.useState(null);
  const [anchorApp, setAnchorApp] = React.useState(null);

  React.useEffect(() => {
    isMounted.current = true;
  }, []);

  const handleOpen = (setter) => (e) => setter(e.currentTarget);
  const handleClose = (setter) => () => setter(null);
  const dispatch = useDispatch();
  const navigate = useAppNavigate();
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <Box suppressHydrationWarning>
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0,0,0,0.5)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!isMobile && (
              <>
                <AdbIcon
                  color="primary"
                  sx={{ mr: 1, cursor: "pointer" }}
                  onClick={() => navigate()}
                />
                <Typography
                  variant="h6"
                  noWrap
                  onClick={() => navigate()}
                  sx={{
                    cursor: "pointer",
                    flexGrow: 0,
                    mr: 2,
                    display: "flex",
                    fontWeight: "bold",
                    letterSpacing: ".2rem",
                    color: "primary.main",
                  }}
                >
                  JournalHub
                </Typography>
              </>
            )}

            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <JournalsList />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {isMobile ? (
                <>
                  <IconButton onClick={handleOpen(setAnchorMore)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorMore}
                    open={Boolean(anchorMore)}
                    onClose={handleClose(setAnchorMore)}
                    PaperProps={{
                      sx: {
                        borderRadius: 3,
                        backdropFilter: "blur(10px)",
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(255,255,255,0.8)"
                            : "rgba(0,0,0,0.7)",
                        minWidth: 180,
                      },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem
                        key={page.name}
                        onClick={() => {
                          handleClose(setAnchorMore)();
                          navigate(page.loc);
                        }}
                      >
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        {page.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => navigate(page.loc)}
                    sx={{ borderRadius: 2 }}
                  >
                    {capitalize(page.name)}
                  </Button>
                ))
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
              {isMounted.current && auth ? (
                <>
                  <IconButton onClick={handleOpen(setAnchorApp)}>
                    <AppsOutlinedIcon />
                  </IconButton>
                  <IconButton>
                    <Avatar src={auth.profileImage} alt={auth.name} />
                  </IconButton>
                </>
              ) : (
                <Button onClick={() => navigate("/signin")}>Login</Button>
              )}

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <ThemeToggle />
              </Box>
            </Box>

            <Menu
              anchorEl={anchorApp}
              open={Boolean(anchorApp)}
              onClose={handleClose(setAnchorApp)}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(0,0,0,0.8)",
                  minWidth: { xs: 220, md: 600 },
                  padding: 3,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  width: "100%",
                  gap: 2,
                }}
              >
                {/* <Box flex={1}>
                  <Typography fontWeight="bold">Menu</Typography>
                  {appMenu.map((item) => (
                    <MenuItem
                      key={item.name}
                      onClick={() => {
                        handleClose(setAnchorApp)();
                        navigate(item.loc);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {item.name}
                    </MenuItem>
                  ))}
                </Box>

                <Divider
                  orientation={isMobile ? "horizontal" : "vertical"}
                  flexItem
                /> */}

                <Box flex={1}>
                  <Typography fontWeight="bold">Author</Typography>
                  {authorsMenu.map((item) => (
                    <MenuItem
                      key={item.name}
                      onClick={() => {
                        handleClose(setAnchorApp)();
                        navigate(item.loc);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {item.name}
                    </MenuItem>
                  ))}
                </Box>

                <Divider
                  orientation={isMobile ? "horizontal" : "vertical"}
                  flexItem
                />

                <Box flex={1}>
                  <Typography fontWeight="bold">Personalize</Typography>
                  {personalizeMenu.map((item) => (
                    <MenuItem
                      key={item.name}
                      onClick={() => {
                        handleClose(setAnchorApp)();
                        if (item.name === "Sign out") {
                        } else {
                          navigate(item.loc);
                        }
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {item.name}
                    </MenuItem>
                  ))}
                </Box>
              </Box>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
