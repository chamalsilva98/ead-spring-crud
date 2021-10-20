import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { Dispatch, SetStateAction } from "react";

interface CustomerToolbarProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<number>>;
}

const CustomerToolbar = (props: CustomerToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Customer Details
      </Typography>
      <Tooltip title="Add New Customer">
        <IconButton
          onClick={() => {
            props.setShow(true);
            props.setUpdate(false);
            props.setSelected(0);
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default CustomerToolbar;
