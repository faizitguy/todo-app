import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { deleteTask, editTask } from "../redux/actionCreator";
import { responsiveFontSizes, TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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

// todocard component starts

const TodoCard = ({ task, handleDelete }) => {
  const [open, setOpen] = React.useState(false);
  const { task_msg, task_time, task_date } = task;

  const dispatch = useDispatch();

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

  // convert seconds to string format

  const secondsToHours = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;

    return [hours, minutes]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  // convert str to seconds format

  const newTime = (str) => {
    let time = str.split(":");
    let seconds = Number(time[0]) * 60 * 60 + Number(time[1]) * 60;
    return seconds;
  };

  const initState = {
    task_msg: task_msg,
    task_time: secondsToHours(task_time),
    task_date: task_date,
  };

  const [state, setMyState] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handle edit request

  const handleEdit = (e, id) => {
    e.preventDefault();
    dispatch(
      editTask(
        id,
        token,
        state.task_date,
        newTime(state.task_time),
        state.task_msg
      )
    );
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  return (
    <div style={{ margin: "15px" }}>
      {/* new todo card */}

      <div style={{ marginTop: "10px" }}>
        <div className="todo_card">
          <div className="todo_image">
            <img src={task.user_icon} />
          </div>
          <div className="todo_content">
            <div style={{ fontWeight: "700" }}>{task.task_msg}</div>
            <div>{task.task_date}</div>
            <div>{secondsToHours(task.task_time)}</div>
          </div>
          <div className="todo_buttons">
            <div className="edit_icon">
              <IconButton>
                <EditIcon onClick={() => handleOpen()} />
              </IconButton>
            </div>

            <div className="edit_icon">
              <IconButton>
                <DeleteIcon onClick={() => handleDelete(task.id, token)} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* <Card className={classes.root}>
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
      </Card> */}

      <div>
        <div>
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
                    value={state.task_msg}
                    onChange={handleChange}
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
                    value={state.task_date}
                    style={{ marginTop: "30px" }}
                    onChange={handleChange}
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
                    value={state.task_time}
                    style={{ marginLeft: "30px", marginTop: "30px" }}
                    onChange={handleChange}
                  />
                  <Button
                    label="add"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{ marginTop: "40px" }}
                    onClick={(e) => handleEdit(e, task.id)}
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
