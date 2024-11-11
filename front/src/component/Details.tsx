import {useEffect, useState} from "react";
import axios from "axios";
import {Status, Todolist} from "../App.tsx";
import {useParams} from "react-router-dom";
import Update from "./Update.tsx";
type DetailsProps = {
    id?: string; // Make id optional
};

export default function Details({id}:DetailsProps){
    const { id: paramId } = useParams<{ id: string }>();
    const [todo, setTodo] = useState<Todolist| null>(null);
    const todoId = id || paramId;
    const fetchTodoDetails = () => {
        if (todoId) {
            axios.get(`/api/todo/${todoId}`)
                .then((response) => setTodo(response.data))
                .catch((error) => console.error("error fetching todo", error));
        }
    };
    useEffect(() => {
        fetchTodoDetails();
    }, [todoId]);


    if (!todo) {
        return <div>Loading...</div>;
    }
    //const handleUpdateSuccess = () => {
      //  console.log("Todo updated successfully, refreshing details...");
     //   fetchTodoDetails();
   // };
    // Callback for handling updates after success
    const handleUpdateSuccess = (newStatus: Status) => {
        // Update the todo state directly to reflect the new status
        setTodo((prevTodo) => {
            if (prevTodo) {
                return { ...prevTodo, status: newStatus };
            }
            return prevTodo;
        });
    };

    return (
        <div>
            <h2><strong>details :</strong>{todo.description}</h2>
            <p><strong>Status:</strong> {todo.status}</p>
            <Update
                id={todo.id}
                updated={handleUpdateSuccess}
                currentStatus={todo.status}
                description={todo.description}
            />
        </div>
    );
}