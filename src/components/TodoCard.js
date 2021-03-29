import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { deleteTask } from "../redux/actionCreator";
import { responsiveFontSizes, TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 325,
    margin: "auto",

    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TodoCard = ({ task, handleDelete }) => {
  const [open, setOpen] = React.useState(false);
  const { task_msg, task_time, task_date } = task;

  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  setNewTask(task_msg);
  setDate(task_date);
  setTime(task_time);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const secondsToHours = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;

    return [hours, minutes]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  const newTime = (str) => {
    let time = str.split(":");
    let seconds = Number(time[0]) * 60 * 60 + Number(time[1]) * 60;
    return seconds;
  };

  const handleEdit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ margin: "15px" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {task.task_msg}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {secondsToHours(task.task_time)}
          </Typography>
          <Typography variant="body2" component="p">
            {task.task_date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleOpen()}>Edit</Button>
          <Button onClick={() => handleDelete(task.id, token)}>Delete</Button>
        </CardActions>
      </Card>

      <div>
        <div style={{ background: "grey" }}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div
                className={classes.paper}
                style={{ width: "350px", height: "320px" }}
              >
                <h2 style={{ textAlign: "center" }}>Edit Task</h2>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Add Task"
                    name="task_msg"
                    autoFocus
                    style={{ marginTop: "10px" }}
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    name="task_date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ marginTop: "30px" }}
                  />
                  <TextField
                    id="time"
                    label="Time"
                    type="time"
                    name="task_time"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    value={secondsToHours(time)}
                    onChange={(e) => setTime(setTime(e.target.value))}
                    style={{ marginLeft: "30px", marginTop: "30px" }}
                  />

                  <Button
                    label="add"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{ marginTop: "40px" }}
                    onClick={handleEdit}
                  >
                    Edit Task
                  </Button>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
