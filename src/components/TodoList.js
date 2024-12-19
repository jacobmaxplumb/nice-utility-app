import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

export const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async () => {
    if (todo.trim()) {
      const todoItem = { text: todo, completed: false };
      const { data } = await axios.post(
        "http://localhost:9000/todos",
        todoItem
      );
      setTodos([...todos, data]);
      setTodo(""); // Clear the input field
    }
  };

  const getTodos = async () => {
    const { data } = await axios.get("http://localhost:9000/todos");
    setTodos(data);
  };

  const markTodoAsCompleted = async (todo) => {
    const updatedTodo = { ...todo, completed: true };
    await axios.put(`http://localhost:9000/todos/${todo.id}`, updatedTodo);
    
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );
  };

  const deletedTodo = async (id) => {
    await axios.delete(`http://localhost:9000/todos/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box sx={{ width: "100%", p: "50px", textAlign: "center" }}>
      <Typography variant="h1" gutterBottom>
        Todo List
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          mb: "20px", // Add margin below the input and button
        }}
      >
        <TextField
          id="standard-basic"
          label="Add a todo"
          variant="outlined"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          sx={{ width: "300px" }} // Adjust the width of the input field
        />
        <Button
          variant="contained"
          onClick={addTodo}
          sx={{
            height: "56px", // Match TextField height
          }}
        >
          Add
        </Button>
      </Box>
      {todos.length > 0 && (
        <List
          sx={{
            width: "100%",
            maxWidth: "400px", // Limit the width of the list
            margin: "0 auto", // Center the list
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 3, // Add some shadow for a modern look
          }}
        >
          {todos.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <Box>
                    {!item.completed && (
                      <IconButton
                        onClick={() => markTodoAsCompleted(item)}
                        edge="end"
                        color="success"
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => deletedTodo(item.id)}
                      edge="end"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={item.text}
                  sx={{
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "gray" : "inherit", // Optional: dim the color when done
                  }}
                />
              </ListItem>
              {index < todos.length - 1 && <Divider />}{" "}
              {/* Add divider between items */}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};
