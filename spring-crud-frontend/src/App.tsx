import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { ReactElement, useState } from "react";
import { Route, Switch, useHistory } from "react-router";

const Signin = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClick = () => {
    axios.post("http://localhost:8080/add", {
      firstName,
      lastName,
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        /* onClick={() => history.push("/user")} */ onClick={handleClick}
      >
        send
      </Button>
      <Button variant="contained" onClick={() => history.push("/get")}>
        get
      </Button>
    </Container>
  );
};

const Profile = () => {
  return <h1>Profile</h1>;
};

interface LayoutProps {
  children: ReactElement;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <h1>hello</h1>
      {props.children}
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Signin />
        </Route>
        <Route path="/user" exact>
          <Profile />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
