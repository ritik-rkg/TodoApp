import React, { useState } from "react";
import "./../styles.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
export default function Todoform(props) {
  const [todoInput, setTodoInput] = useState(
    props.edit ? props.edit.value : ""
  );
  const handleChange = (event) => {
    const data = event.target.value;
    setTodoInput(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.edit != null) {
      props.submitq({ val: todoInput, id: props.edit.id, isCompleted: false });
      setTodoInput("");
      return;
    }
    props.submitq({
      val: todoInput,
      id: Math.random() * 100000,
      isCompleted: false
    });
    setTodoInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        name="task"
        onChange={handleChange}
        value={todoInput}
        style={{ width: "100%" }}
        placeholder="Enter your task"
        type="text"
        id="outlined-basic"
        label="Enter Your Task"
        variant="outlined"
      />
      <Button style={{ marginTop: "5px" }} variant="contained" type="submit">
        Add Task
      </Button>
    </form>
  );
}
