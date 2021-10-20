import InboxIcon from "@mui/icons-material/MoveToInbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/system/Box";
import React from "react";
import { useHistory } from "react-router";
import useAuth from "../context/AuthContext";

const DrawerList = () => {
  const history = useHistory();
  const { token, setToken } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    setToken("");
    handleClose();
    history.push("/");
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm sign out?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={signOut} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Toolbar />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => history.push("/dashboard")}
          disabled={token === ""}
        >
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          onClick={() => history.push("/customers")}
          disabled={token === ""}
        >
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem
          button
          onClick={() => history.push("/accounts")}
          disabled={token === ""}
        >
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Account Types" />
        </ListItem>
        <ListItem
          button
          onClick={() => history.push("/users")}
          disabled={token !== "admin"}
        >
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={handleClickOpen} disabled={token === ""}>
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default DrawerList;
