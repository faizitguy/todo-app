import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Dashboard.css";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TodoCard from "./TodoCard";
import { addTask, getTask, deleteTask } from "../redux/actionCreator";
import Pagination from "@material-ui/lab/Pagination";

// useStyles for component

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
}));

// Component Starts

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // states for component

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07:30");

  const token = useSelector((state) => state.token);

  // onload get tasks

  useState(() => {
    dispatch(getTask(token));
  }, []);

  const todos = useSelector((state) => state.tasks);

  // handle add request

  const handleTask = (e) => {
    e.preventDefault();
    dispatch(addTask(date, newTime(time), task, token))
      .then(() => dispatch(getTask(token)))
      .then(() => setTask(""));
  };

  // handle delete request

  const handleDelete = (id, token) => {
    dispatch(deleteTask(id, token));
  };

  // pagination

  const [pageNo, setPageNo] = useState(1);

  const setPageNumber = (pageNo) => {
    setPageNo(pageNo);
  };

  const limit = 3;
  const offset = (pageNo - 1) * limit;

  // convert str to seconds

  const newTime = (str) => {
    let time = str.split(":");
    let seconds = Number(time[0]) * 60 * 60 + Number(time[1]) * 60;
    return seconds;
  };

  return (
    <div className="dashboard__todo">
      <h4>Add Task </h4>
      <form
        className={classes.form}
        noValidate
        style={{ padding: "20px", border: "2px solid grey" }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Add Task"
          name="email"
          autoFocus
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue="2021-03-29"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          defaultValue="07:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ marginLeft: "20px" }}
        />

        <Button
          label="add"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleTask}
        >
          Add Task
        </Button>
      </form>

 {/* Pagination */}

      <Pagination
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          margin: "30px",
        }}
        count={todos.data && Math.ceil(todos.data.results.length / limit)}
        page={pageNo}
        onChange={(e, i) => setPageNumber(i)}
      />

    {/* Todos */}
    
      <div>
        {todos.data &&
          todos.data.results
            .filter((_, index) => index >= offset && index < offset + limit)
            .map((task) => {
              return (
                <div>
                  <TodoCard
                    task={task}
                    key={task.id}
                    handleDelete={handleDelete}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Dashboard;
