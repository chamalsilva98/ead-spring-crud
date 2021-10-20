import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../types/types";

interface UserModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  rows: User[];
  setRows: Dispatch<SetStateAction<User[]>>;
  selected: number;
  update: boolean;
}

const UserModal = (props: UserModalProps) => {
  const { open, setOpen } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [privilege, setPrivilege] = useState("normal");
  const [status, setStatus] = useState("active");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const values: User = {
      firstName,
      lastName,
      username,
      password,
      joinedOn: new Date(),
      privilege,
      status: "active",
    };
    try {
      const response = await axios.post("/user/add", values);
      props.setRows((rows) => [
        ...rows,
        { ...values, id: response.data as number },
      ]);
      reset();
      handleClose();
    } catch (error) {}
  };

  const handleUpdate = async () => {
    const user = props.rows.find((row) => row.id === props.selected);
    const values: User = {
      id: props.selected,
      firstName,
      lastName,
      username,
      password: password ? password : (user?.password as string),
      joinedOn: user?.joinedOn,
      privilege,
      status,
    };
    try {
      await axios.put("/user/update", values);
      props.setRows((rows) =>
        rows.map((row) => {
          if (row.id === props.selected) return { ...row, ...values };
          else return row;
        })
      );
      handleClose();
    } catch (error) {}
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setPrivilege("normal");
  };

  useEffect(() => {
    if (props.update) {
      const user = props.rows.find((row) => row.id === props.selected);

      setFirstName(user!.firstName);
      setLastName(user!.lastName);
      setUsername(user!.username);
      setPrivilege(user!.privilege);
      setStatus(user!.status);
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selected]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{props.update ? "Update" : "Add"} User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          variant="standard"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          variant="standard"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="username"
          label="Username"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl component="fieldset" sx={{ marginTop: "8px" }}>
          <FormLabel component="legend">Privilege</FormLabel>
          <RadioGroup
            row
            aria-label="privilege"
            defaultValue="normal"
            name="radio-buttons-group"
            value={privilege}
            onChange={(e) => setPrivilege(e.target.value)}
          >
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="Normal"
            />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl component="fieldset" sx={{ marginTop: "8px" }}>
          <FormLabel component="legend">Deactivate</FormLabel>
          <RadioGroup
            row
            aria-label="status"
            defaultValue="active"
            name="radio-buttons-group"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel value="active" control={<Radio />} label="No" />
            <FormControlLabel
              value="inactive"
              control={<Radio />}
              label="Yes"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!props.update ? (
          <Button onClick={handleSave}>Add</Button>
        ) : (
          <Button onClick={handleUpdate}>Update</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
