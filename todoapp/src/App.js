import './App.css';
import Home from './components/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoList from './components/todolist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       
          <Route index element={<Home />} />
          <Route path="ToDoList/:user" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
