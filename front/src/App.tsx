
import './App.css'
import Todo from "./component/Todo.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Done from "./component/Done.tsx";
import Inprogress from "./component/Inprogress.tsx";
import {Route, Routes} from "react-router-dom";
import Details from "./component/Details.tsx";
import AddTodo from "./component/Addtodo.tsx";
export type Status = "OPEN" | "IN_PROGRESS" | "DONE";
export type Todolist={
    id:string,
    description:string,
    status:Status
}
function App() {
    const [todo, setTodo] = useState<Todolist[]>([]);  // For all to-dos
    // For done to-dos

    // Fetch data for todos from the API
    const fetchData = () => {
        axios.get('/api/todo')
            .then(response => {
                setTodo(response.data);  // Update 'todo' state with the fetched data

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    useEffect(() => {
        fetchData();

    }, []);

  return (
    <>
        <Routes>
           <Route path={"/"} element={ <>
               <Todo lists={todo} setlists={setTodo}/>
               <Inprogress proglist={todo} setlist={setTodo}/>
               <Done dones={todo} setDones={setTodo}/>
               <AddTodo setTodos={setTodo} todos={todo}/>
           </>} />
            <Route path={"/todo/:id"} element={<Details setTodos={setTodo}/>} />
        </Routes>

    </>
  )
}

export default App
