import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { Dispatch, SetStateAction } from "react";

interface ConfirmModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { open, setOpen } = props;

  const handleClose = () => setOpen(false);

  const handleYes = () => {
    props.action();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete?
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
