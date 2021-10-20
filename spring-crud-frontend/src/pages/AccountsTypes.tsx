import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/system/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountModal from "../components/AccountModal";
import AccountTypesToolbar from "../components/AccountTypeToolbar";
import ConfirmModal from "../components/ConfirmModal";
import { Account } from "../types/types";

const AccountsTypes = () => {
  const [open, setOpen] = useState(false);

  const [delOpen, setDelOpen] = useState(false);

  const [selected, setSelected] = useState(0);

  const [rows, setRows] = useState<Account[]>([]);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/account/all");
      setRows(response.data as Account[]);
    })();
  }, []);

  const deleteAccount = () => {
    axios.delete("/account/delete/" + selected);
    setRows(rows.filter((row) => row.id !== selected));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AccountModal
        open={open}
        setOpen={setOpen}
        rows={rows}
        setRows={setRows}
        selected={selected}
        update={update}
      />
      <ConfirmModal
        open={delOpen}
        setOpen={setDelOpen}
        action={deleteAccount}
      />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <AccountTypesToolbar
          setShow={setOpen}
          setUpdate={setUpdate}
          setSelected={setSelected}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Account Name</TableCell>
                <TableCell align="right">Interest Rate</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.accountName}</TableCell>
                  <TableCell align="right">{row.interestRate}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Update Account Type">
                      <IconButton
                        onClick={() => {
                          setUpdate(true);
                          setSelected(row.id as number);
                          setOpen(true);
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Account Type">
                      <IconButton
                        onClick={() => {
                          setDelOpen(true);
                          setSelected(row.id as number);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AccountsTypes;
