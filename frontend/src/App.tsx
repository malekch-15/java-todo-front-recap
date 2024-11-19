
import './App.css'
import Todo from "./component/Todo.tsx";
import  {useEffect, useState} from "react";
import axios from "axios";
import Done from "./component/Done.tsx";
import Inprogress from "./component/Inprogress.tsx";
import {Link,Route, Routes} from "react-router-dom";
import Details from "./component/Details.tsx";
import AddTodo from "./component/Addtodo.tsx";
import ProtectedRoute from "./ProtectedRouter.tsx";
export type Status = "OPEN" | "IN_PROGRESS" | "DONE";
export type Todolist={
    id:string,
    description:string,
    status:Status
}
function App() {
    const [todo, setTodo] = useState<Todolist[]>([]);  // For all to-dos
    const [user, setUser] = useState<string>()

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
   function login(){
       const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin

       window.open(host + '/oauth2/authorization/github', '_self')
   }
    function logout(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }
    const loadCurrentUser = () => {
        axios.get("/api/users/me")
            .then((response) => {
                console.log(response.data)
                setUser(response.data)
            }
        )
    }
    useEffect(() => {
        loadCurrentUser()
    }, []);
    useEffect(() => {
        fetchData();

    }, []);

  return (
      <>

          {!user && <button onClick={login}>Login</button>}
          <p>{user}</p>
          {user && <button onClick={logout}>Logout</button>}
          <Link to={"/"}>Home</Link>
          <Link to={"/new"}>New</Link>
          <Routes>
              <Route path={"/"} element={<>
                  <Todo lists={todo} setlists={setTodo} user={user} />
                  <Inprogress proglist={todo} setlist={setTodo}/>
                  <Done dones={todo} setDones={setTodo}/>

              </>}/>
              <Route path={"/todo/:id"} element={<Details setTodos={setTodo}/>}/>
              <Route element={<ProtectedRoute user={user}/>}>
                 <Route path={"/new"} element={<AddTodo setTodos={fetchData} todos={todo}/>}/>
                  <Route path={"/admin"} element={<AddTodo setTodos={fetchData} todos={todo} />}/>
              </Route>
          </Routes>
      </>
  )
}

export default App
