import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { deleteTask } from "../redux/actionCreator";
const useStyles = makeStyles({
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
});

const TodoCard = ({ task, handleDelete }) => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);
  return (
    <div style={{ margin: "15px" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {task.task_msg}
          </Typography>
          {/* <Typography className={classes.pos} color="textSecondary">
            {row.status > 0 ? "completed" : "pending"}
          </Typography> */}
          <Typography variant="body2" component="p">
            {task.task_date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => console.log("editing")}>Edit</Button>
          <Button onClick={() => handleDelete(task.id, token)}>Delete</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default TodoCard;
