import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Account } from "../types/types";

interface AccountModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  rows: Account[];
  setRows: Dispatch<SetStateAction<Account[]>>;
  selected: number;
  update: boolean;
}

const AccountModal = (props: AccountModalProps) => {
  const { open, setOpen } = props;

  const [accountName, setAccountName] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const values: Account = {
      accountName,
      interestRate: +interestRate,
    };
    try {
      const response = await axios.post("/account/add", values);
      props.setRows((rows) => [
        ...rows,
        { ...values, id: response.data as number },
      ]);
      reset();
      handleClose();
    } catch (error) {}
  };

  const handleUpdate = async () => {
    const values: Account = {
      id: props.selected,
      accountName,
      interestRate: +interestRate,
    };
    try {
      await axios.put("/account/update", values);
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
    setAccountName("");
    setInterestRate("");
  };

  useEffect(() => {
    if (props.update) {
      const account = props.rows.find((row) => row.id === props.selected);

      setAccountName(account!.accountName);
      setInterestRate(account!.interestRate.toString());
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selected]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{props.update ? "Update" : "Add"} Account Type</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Account Name"
          fullWidth
          variant="standard"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Interest Rate"
          fullWidth
          variant="standard"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
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

export default AccountModal;
