import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import io from "socket.io-client";
import { getUser } from "../middleware";
import Axios from "axios";
import jwt_decode from 'jwt-decode';


const useStyles = makeStyles((theme) => ({
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
  const [checkedB, setcheckedB] = useState(false)
  const [checkedC, setcheckedC] = useState(false)
  const [Id, setId] = useState('')
  const [Time, setTime] = useState('')
  var role = jwt_decode(getUser())
  var jwt = getUser()

  const socket = io(process.env.REACT_APP_NODE_API,{
    query: {jwt}})

  useEffect(() => {
    const jwt = getUser()
        if(!jwt){
            props.history.push('/login')
        }

    fetch(process.env.REACT_APP_NODE_API,{ headers : {authorization : `${jwt}` }})
      .then((res) => res.json())
      .then((data) => {
        data.message[0].flight_status === "SCHEDULED" &&
          setcheckedB(  true );
          data.message[0].flight_cancel === "True" &&
          setcheckedC(  true );
          setTime(data.message[0].flight_time)
          setId(data.message[0].id)
          setData(data.message);
      })
      .catch((err) => console.log(err));

    socket.on("recived_data", (data) => {
      setData(data);
    });
  }, []);


  const handleChange = (e) =>{
    setcheckedB(e.target.checked)
    setcheckedC(false)
  }
  const targetChange = e =>{
    setcheckedC(e.target.checked)
    setcheckedB(false)
  }

  const logout = (e) => {
    localStorage.removeItem("jwt-cool");
    props.history.push("/login");
  };

  const update = (data) => {
    const updateData = {
      flight_cancel: checkedC === true ? 'True' : 'False',
      flight_status: checkedC === true ?  "REINSTATE FLIGHT" : "SCHEDULED",
      flight_time: Time ,
      id: Id
    }
    const jwt = getUser()
        if(!jwt){
            props.history.push('/login')
        }
    //Update flight data
    Axios.post(process.env.REACT_APP_NODE_API+'/update' , updateData, { headers : {authorization : `${jwt}` }})
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
  }

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
              label={detail.flight_cancel === "True" ? 'REINSTATE FLIGHT' : 'SCHEDULED'}
              // label="SCHEDULED"
            />
            <h3>Flight Time</h3>
            <TextField
              id="time"
              label="Alarm clock"
              type="time"
              value={detail.flight_time}
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
              label={detail.flight_cancel === "True" ? 'CANCELLED' : 'CANCEL_FLIGHT'}
              // label="IN-FLIGHT or CANCELLED"
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
                    onChange={e => handleChange(e)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={detail.flight_cancel === "True" ? 'REINSTATE FLIGHT' : 'SCHEDULED'}
                // label="SCHEDULED"
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
                    onChange={e => targetChange(e)}
                    //  e => setcheckedC(e.target.checked)
                    name="checkedC"
                    color="primary"
                  />
                }
                // label="IN-FLIGHT or CANCELLED"
              label={detail.flight_cancel === "True" ? 'CANCELLED' : 'CANCEL_FLIGHT'}

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
