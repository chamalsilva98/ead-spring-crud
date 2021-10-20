import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import DetailConfirmation from "../components/DetailConfirmation";

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isDeposit, setIsDeposit] = useState(false);

  const handleSubmit = (isDeposit: boolean) => {
    if (accountNumber && amount) {
      setIsDeposit(isDeposit);
      setOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <DetailConfirmation
        open={open}
        setOpen={setOpen}
        accountNumber={accountNumber}
        amount={amount}
        isDeposit={isDeposit}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <MonetizationOnIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome User
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Account Number"
            name="accountNumber"
            autoFocus
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Grid container>
            <Grid item xs>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "secondary.dark" }}
                onClick={() => handleSubmit(true)}
              >
                Deposit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "secondary.dark" }}
                onClick={() => handleSubmit(false)}
              >
                Withdraw
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default DashBoard;
