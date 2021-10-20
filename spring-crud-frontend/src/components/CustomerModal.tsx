import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Account, Customer, CustomerAccount } from "../types/types";

interface CustomerModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  rows: Customer[];
  // setRows: Dispatch<SetStateAction<Customer[]>>;
}

const CustomerModal = (props: CustomerModalProps) => {
  const { open, setOpen } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = React.useState<Date | null>(new Date());
  const [nic, setNic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState<{
    label: string;
    id: number;
  } | null>();
  const [amount, setAmount] = useState("");

  const [accountTypes, setAccountTypes] = useState([{ label: "", id: 0 }]);

  useEffect(() => {
    axios.get<Account[]>("/account/all").then((response) =>
      setAccountTypes(
        response.data.map((account) => ({
          label: account.accountName,
          id: account.id as number,
        }))
      )
    );
  }, []);

  const handleChange = (newValue: Date | null) => {
    setDob(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (
      firstName &&
      lastName &&
      nic &&
      phoneNumber &&
      address &&
      dob &&
      account &&
      amount
    ) {
      const values: Customer = {
        firstName,
        lastName,
        nic,
        phoneNumber,
        address,
        dob,
      };
      try {
        const { data } = await axios.post<number>("/customer/add", values);

        const accountValues: CustomerAccount = {
          customerId: +data,
          accountId: account.id,
          balance: +amount,
        };
        const response = await axios.post(
          "/customeraccount/add",
          accountValues
        );
        // props.setRows((rows) => [
        //   ...rows,
        //   { ...values, id: response.data as number },
        // ]);
        reset();
        handleClose();
      } catch (error) {}
    }
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setDob(new Date());
    setNic("");
    setPhoneNumber("");
    setAddress("");
    setAmount("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add User</DialogTitle>
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
        <Box sx={{ marginTop: "24px" }}>
          <DesktopDatePicker
            label="Date of Birth"
            inputFormat="MM/dd/yyyy"
            value={dob}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <TextField
          margin="dense"
          label="NIC"
          fullWidth
          variant="standard"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          fullWidth
          variant="standard"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Address"
          fullWidth
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Box sx={{ marginTop: "24px" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={accountTypes}
            sx={{ width: 300 }}
            onChange={(_, value) => setAccount(value)}
            renderInput={(params) => <TextField {...params} label="Account" />}
          />
        </Box>
        <TextField
          margin="dense"
          label="Amount"
          fullWidth
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerModal;
