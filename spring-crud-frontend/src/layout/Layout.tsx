import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DrawerList from "../components/DrawerList";

interface LayoutProps {
  children: ReactElement;
  window?: () => Window;
}

const drawerWidth = 280;

const Layout = (props: LayoutProps) => {
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    let title = "";
    switch (location.pathname) {
      case "/":
        title = "Sign In";
        break;
      case "/dashboard":
        title = "Dashboard";
        break;
      case "/customers":
        title = "Customers";
        break;
      case "/accounts":
        title = "Account Types";
        break;
      case "/users":
        title = "Users";
        break;
    }
    setTitle(title);
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            textAlign="center"
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerList />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerList />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          bgcolor: "grey.100",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
