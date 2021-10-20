import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
import ConfirmModal from "../components/ConfirmModal";
import UserModal from "../components/UserModal";
import UsersToolbar from "../components/UsersToolbar";
import { User } from "../types/types";

const Users = () => {
  const [open, setOpen] = useState(false);

  const [delOpen, setDelOpen] = useState(false);

  const [selected, setSelected] = useState(0);

  const [rows, setRows] = useState<User[]>([]);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get<User[]>("/user/all");
      response.data.forEach((element) => {
        console.log(
          new Date(element.joinedOn as unknown as string).toDateString()
        );
      });
      setRows(response.data);
    })();
  }, []);

  const deleteUser = () => {
    axios.delete("/user/delete/" + selected);
    setRows(rows.filter((row) => row.id !== selected));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <UserModal
        open={open}
        setOpen={setOpen}
        rows={rows}
        setRows={setRows}
        selected={selected}
        update={update}
      />
      <ConfirmModal open={delOpen} setOpen={setDelOpen} action={deleteUser} />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <UsersToolbar
          setShow={setOpen}
          setUpdate={setUpdate}
          setSelected={setSelected}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Joined On</TableCell>
                <TableCell align="right">Privilege</TableCell>
                <TableCell align="right">Activated</TableCell>
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
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">
                    {new Date(row.joinedOn as unknown as string).toDateString()}
                  </TableCell>
                  <TableCell align="right">{row.privilege}</TableCell>
                  <TableCell align="right">
                    {row.status === "active" ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <BlockIcon />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Update User">
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
                    <Tooltip title="Delete User">
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

export default Users;
