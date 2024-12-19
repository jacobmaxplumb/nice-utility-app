import { Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { Typography } from "@mui/material";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path="" element={<Typography variant="h1" gutterBottom>Home</Typography>} />
        <Route path="todos" element={<TodoList />} />
        <Route path="other" element={<Typography variant="h1" gutterBottom>Other</Typography>} />
      </Routes>
    </div>
  );
}

export default App;
