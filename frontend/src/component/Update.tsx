
import axios from "axios";
import {Status, Todolist} from "../App.tsx";
import {useState} from "react";
type updatedlist={
    id:string
   updated:(newStatus: Status)=>void
    description: string;
    currentStatus:Status;
    setTodos: React.Dispatch<React.SetStateAction<Todolist[]>>;
    setTodo:React.Dispatch<React.SetStateAction<Todolist | undefined >>;

}
export default function Update({id,updated,description,currentStatus,setTodos,setTodo}:updatedlist ){
    const [selectedStatus, setSelectedStatus] = useState<Status>(currentStatus);


    const handelupdate = () => {
        const neutodo={
            id: id,
            status: selectedStatus,
            description: description
        }
        axios.put(`/api/todo/${id}/update`, neutodo )
            .then(() => {
                console.log(`updated ${id}`)
                updated(selectedStatus);
                setTodo((prevTodo) =>
                    prevTodo ? { ...prevTodo, status: selectedStatus } : prevTodo
                );
                setTodos((prevState)=>prevState?.map(prev=>prev.id === id ? neutodo:prev ))
            })
            .catch((error) => {
                    console.log("error updating the todo " + error);
                }
            )
    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value as Status);
    };
    return(
        <>
            <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
            </select>
            <button onClick={handelupdate}>Update Status</button>
        </>
    )
}