
import './App.css'
import Todo from "./component/Todo.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Done from "./component/Done.tsx";
import Inprogress from "./component/Inprogress.tsx";
import {Route, Routes} from "react-router-dom";
import Details from "./component/Details.tsx";

export type Todolist={
    id:string,
    description:string,
    status:string
}
function App() {
    const [todo,settodo]=useState<Todolist[]>([]);
    const  fetchData= () =>{ axios.get('/api/todo')
        .then(response => {
            settodo(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    useEffect(() => {
        fetchData();

    }, []);

  return (
    <>
        <Routes>
           <Route path={"/"} element={ <>
               <Todo lists={todo}/>
               <Done dones={todo}/>
               <Inprogress proglist={todo}/>
           </>} />
            <Route path={"/todo/:id"} element={<Details/>} />
        </Routes>

    </>
  )
}

export default App
