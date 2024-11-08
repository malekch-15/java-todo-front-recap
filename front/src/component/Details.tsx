import {useEffect, useState} from "react";
import axios from "axios";
import {Todolist} from "../App.tsx";
import {useParams} from "react-router-dom";
type DetailsProps = {
    id?: string; // Make id optional
};

export default function Details({id}:DetailsProps){
    const { id: paramId } = useParams<{ id: string }>();
    const [todo, setTodo] = useState<Todolist| null>(null);
    const todoId = id || paramId;
    useEffect(() => {
        if(todoId){
            axios.get(`/api/todo/${todoId}`)
                .then((response)=>setTodo(response.data))
                .catch((error)=>console.error("error fetching todo", error))
        }
    },[todoId]);

    if (!todo) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h2><strong>details :</strong>{todo.description}</h2>
            <p><strong>Status:</strong> {todo.status}</p>
        </div>
    );
}