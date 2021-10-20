import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerModal from "../components/CustomerModal";
import CustomerToolbar from "../components/CustomerToolbar";
import { Customer, CustomerAccount } from "../types/types";

export const createData = (
  id: number,
  firstName: string,
  lastName: string,
  dob: Date,
  nic: string,
  phoneNumber: string,
  address: string,
  accounts: CustomerAccount[]
) => {
  return {
    id,
    firstName,
    lastName,
    dob,
    nic,
    phoneNumber,
    address,
    accounts,
  };
};

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.firstName}</TableCell>
        <TableCell align="right">{row.lastName}</TableCell>
        <TableCell align="right">{row.dob.toDateString()}</TableCell>
        <TableCell align="right">{row.nic}</TableCell>
        <TableCell align="right">{row.phoneNumber}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Accounts
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Account Number</TableCell>
                    <TableCell align="right">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.accounts.map((accountRow) => (
                    <TableRow key={accountRow.accountNumber}>
                      <TableCell component="th" scope="row">
                        {accountRow.accountNumber}
                      </TableCell>
                      <TableCell align="right">{accountRow.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Customers = () => {
  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState([
    createData(0, "", "", new Date(), "", "", "", [
      { accountId: 0, balance: 0, customerId: 0, accountNumber: 0 },
    ]),
  ]);

  useEffect(() => {
    (async () => {
      const response = await axios.get<Customer[]>("/customer/all");

      const responses = await Promise.all(
        response.data.map((customer) =>
          axios.get<CustomerAccount[]>(
            "/customeraccount/customerid/" + customer.id
          )
        )
      );
      setRows(
        response.data.map((customer, index) => {
          const { id, firstName, lastName, dob, nic, phoneNumber, address } =
            customer;
          return createData(
            id as number,
            firstName,
            lastName,
            new Date(dob),
            nic,
            phoneNumber,
            address,
            responses[index].data
          );
        })
      );
    })();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <CustomerModal
        open={open}
        setOpen={setOpen}
        rows={rows}
        setRows={setRows}
      />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CustomerToolbar setShow={setOpen} />
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Customer ID</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Date of Birth</TableCell>
                <TableCell align="right">NIC</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Customers;
