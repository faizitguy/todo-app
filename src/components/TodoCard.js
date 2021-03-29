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

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     setMyState((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };

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
                style={{ width: "350px", height: "250px" }}
              >
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Add Task"
                    name="email"
                    autoFocus
                    defaultValue={task.task_msg}
                    style={{ marginTop: "10px" }}
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
                    defaultValue={task.task_date}
                    style={{ marginTop: "30px" }}
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
                    defaultValue={secondsToHours(task.task_time)}
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
                  >
                    Add Task
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
