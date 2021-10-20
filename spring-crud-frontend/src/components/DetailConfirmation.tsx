import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Customer, CustomerAccount } from "../types/types";

interface DetailConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  accountNumber: string;
  amount: string;
  isDeposit: boolean;
}

const DetailConfirmation = (props: DetailConfirmationProps) => {
  const { open, setOpen } = props;

  const [error, setError] = useState("");

  const [customerDetails, setCustomerDetails] = useState<Customer>({
    address: "",
    dob: new Date(),
    firstName: "",
    lastName: "",
    nic: "",
    phoneNumber: "",
    id: 0,
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setError("");

      (async () => {
        const response = await axios.get<CustomerAccount>(
          "/customeraccount/get/" + props.accountNumber
        );

        if (response.data === null) {
          setError("Invalid Account Number");
          return;
        }
        if (!props.isDeposit && response.data.balance < +props.amount) {
          setError("Low Blanace");
          return;
        }

        const customer = await axios.get<Customer>(
          "/customer/get/" + response.data.customerId
        );
        customer.data.dob = new Date(customer.data.dob);
        setCustomerDetails(customer.data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSave = () => {
    axios.put("/customeraccount/update", {
      accountNumber: props.accountNumber,
      balance: props.isDeposit ? +props.amount : -props.amount,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {error ? (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      ) : (
        <>
          <DialogTitle id="alert-dialog-title">
            Please confirm the details?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <table>
                <tr>
                  <td>
                    <Typography>ID </Typography>
                  </td>
                  <td>
                    <Typography>: {customerDetails.id}</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>First Name </Typography>
                  </td>
                  <td>
                    <Typography>: {customerDetails.firstName}</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Last Name </Typography>
                  </td>
                  <td>
                    <Typography>: {customerDetails.lastName}</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Date of Birth </Typography>
                  </td>
                  <td>
                    <Typography>
                      : {customerDetails.dob.toDateString()}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>NIC </Typography>
                  </td>
                  <td>
                    <Typography>: {customerDetails.nic}</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Phone Number </Typography>
                  </td>
                  <td>
                    <Typography>: {customerDetails.phoneNumber}</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Address </Typography>
                  </td>
                  <td>
                    <Typography>: {customerDetails.address}</Typography>
                  </td>
                </tr>
              </table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Reject</Button>
            <Button onClick={handleSave} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default DetailConfirmation;
