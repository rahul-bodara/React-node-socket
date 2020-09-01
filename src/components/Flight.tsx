import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import io from "socket.io-client";
import { getUser } from "../middleware";
import Axios from "axios";

const socket = io(process.env.REACT_APP_NODE_API);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(3, 0, 2),
    marginRight: theme.spacing(3, 0, 2),
    width: 200,
  },
}));

export default function Flight(props) {
  const [Data, setData]: any = useState([]);
  const classes = useStyles();
  const [checkedA, setcheckedA] = useState(false)
  const [checkedB, setcheckedB] = useState(false)
  const [checkedC, setcheckedC] = useState(false)
  const [Time, setTime] = useState('')
  const role = getUser();

  useEffect(() => {
    fetch(process.env.REACT_APP_NODE_API)
      .then((res) => res.json())
      .then((data) => {
        data.message[0].flight_status === "CANCELLED" &&
        setcheckedA( true);
          data.message[0].flight_status === "SCHEDULED" &&
          setcheckedB(  true );
          data.message[0].flight_cancel === "True" &&
          setcheckedC(  true );
          setTime(data.message[0].time)
        setData(data.message);
      })
      .catch((err) => console.log(err));

    socket.on("recived_data", (data) => {
      console.log(data);
    });
  }, []);



  const logout = (e) => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    props.history.push("/login");
  };

  const update = (data) => {
    const updateData = {
      flight_cancel: checkedC,
      flight_status: checkedA === true ?  "CANCELLED" : "SCHEDULED",
      flight_time: Time ,
      id: 1
    }

    console.log(updateData);


    Axios.post(process.env.REACT_APP_NODE_API+'/update')

    // socket.emit("insert data", data)
  };

  return (
    <Container component="main" maxWidth="xs">
      {role.role === "User" && Data.length > 0 &&
        Data.map((detail, index) => (
          <div key={index}>
            <h1>Users</h1>
            <h3>Flight Status</h3>

            <FormControlLabel
              control={
                <Checkbox
                  checked={detail.flight_status === "SCHEDULED" ? true : false}
                  name="checkedB"
                  color="primary"
                />
              }
              label="SCHEDULED"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={detail.flight_status === "CANCELLED" ? true : false}

                  name="checkedA"
                  color="primary"
                />
              }
              label="IN-FLIGHT or CANCELLED"
            />

            <h3>Flight Time</h3>
            <TextField
              id="time"
              label="Alarm clock"
              type="time"
              defaultValue={detail.flight_time}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <h3>CANCEL FLIGHT</h3>
            <FormControlLabel
              control={
                <Checkbox
                  checked={detail.flight_cancel === "True" ? true : false}

                  name="checkedC"
                  color="primary"
                />
              }
              label="IN-FLIGHT or CANCELLED"
            />
          </div>
        ))}

      {role.role === "Admin"
        ? Data.length > 0 &&
          Data.map((detail, index) => (
            <div key={index}>
              <h1>Admin</h1>
              <h3>Flight Status</h3>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedB}
                    onChange={ e => setcheckedB(e.target.checked)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="SCHEDULED"
              />
              <FormControlLabel
                control={
                  <Checkbox
                  checked={checkedA}
                    onChange={ e => setcheckedA(e.target.checked)}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="IN-FLIGHT or CANCELLED"
              />

              <h3>Flight Time</h3>
              <TextField
                id="time"
                label="Time"
                type="time"
                name="time"
                onChange={e => setTime(e.target.value)}
                defaultValue={detail.flight_time}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <h3>CANCEL FLIGHT</h3>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      checkedC
                    }
                    onChange={ e => setcheckedC(e.target.checked)}
                    name="checkedC"
                    color="primary"
                  />
                }
                label="IN-FLIGHT or CANCELLED"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => update(e)}
              >
                Update
              </Button>
            </div>
          ))
        : ""}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={(e) => logout(e)}
      >
        Logout
      </Button>
    </Container>
  );
}
