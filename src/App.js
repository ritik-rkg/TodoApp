import { useState, useEffect } from "react";
import Todoform from "./Components/Todoform";
import "./styles.css";
import ConfirmBox from "./Components/ConfirmBox";
import { Button } from "@mui/material";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: "",
    text: ""
  });
  const [edit, setEdit] = useState({
    id: null,
    value: ""
  });
  const openDelelteBox = (id, text) => {
    setOpen(true);
    console.log(id);
    setDataDelete({ ...dataDelete, id: id, text: text });

    // handleDelete(id);
  };
  const addToList = (todo) => {
    if (todo.val === "") {
      setTodos([...todos]);
      return;
    }
    setTodos([todo, ...todos]);
  };
  const handleDelete = () => {
    if (dataDelete) {
      console.log(todos);
      const newTodo = todos.filter((ele) => ele.id !== dataDelete.id);
      setTodos(newTodo);
      setDataDelete(null);
      setOpen(false);
    }
  };

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleComplete = (id) => {
    const completedTodo = todos.map((ele) => {
      if (ele.id === id) {
        ele.isCompleted = !ele.isCompleted;
      }
      return ele;
    });
    setTodos(completedTodo);
  };

  const handleEdit = ({ val, id, isCompleted }) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const oldVal = item.val;
          if (val) {
            item.val = val;
          } else {
            item.val = oldVal;
          }
          item.isCompleted = isCompleted;
          item.id = id;
        }
        return item;
      })
    );
    setEdit({
      id: null,
      value: ""
    });
  };

  if (edit.id) {
    return <Todoform edit={edit} submitq={handleEdit} />;
  }

  return (
    <>
      <div className="App">
        <Todoform edit={null} submitq={addToList} />
      </div>
      <div>
        {todos.map((todo, index) => (
          <>
            <div style={{ marginTop: "14px", marginLeft: "4px" }}>
              {todo.isCompleted ? (
                <span>
                  <s>{todo.val}</s>
                </span>
              ) : (
                <span>{todo.val}</span>
              )}
            </div>
            <div key={index}>
              <Button
                style={{ marginRight: "5px" }}
                size="small"
                variant="contained"
                onClick={() => openDelelteBox(todo.id, todo.val)}
              >
                Delete
              </Button>
              <Button
                style={{ marginRight: "5px" }}
                size="small"
                variant="contained"
                onClick={() => handleComplete(todo.id)}
              >
                {todo.isCompleted ? "Not Completed" : "Completed"}
              </Button>
              <Button
                style={{ marginRight: "5px" }}
                size="small"
                variant="contained"
                onClick={() => setEdit({ id: todo.id, value: todo.val })}
              >
                Edit
              </Button>
            </div>
          </>
        ))}
      </div>
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={dataDelete ? dataDelete.text : ""}
        deleteFunction={handleDelete}
      />
    </>
  );
}
