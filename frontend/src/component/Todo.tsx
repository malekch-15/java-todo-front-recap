import {Todolist} from "../App.tsx";
import {useNavigate} from "react-router-dom";

import Delete from "./delete.tsx";



type TodoProps = {
    lists: Todolist[];
    setlists: React.Dispatch<React.SetStateAction<Todolist[]>>;
};

export default function Todo({ lists,setlists }: TodoProps) {

    const navigate = useNavigate();

    // Function to handle navigation to the details page
    const handleShowMore = (id: string) => {
        navigate(`/todo/${id}`);
        console.log(`Navigating to details of todo with id: ${id}`);
    };
    const handeleletbutton=(id:string)=>{
        if (setlists) {
            setlists(lists.filter((list) => list.id !== id));
        } else {
            console.error("setLists is undefined");
        }

    }
    return (
        <div>
            <h2>To ToDo List</h2>
            <ul>
                {/* Filter and display only OPEN todos */}
                {lists
                    .filter((todo) => todo.status === "OPEN")
                    .map((todo) => (
                        <li key={todo.id}>
                            <strong>{todo.description}</strong>
                            <button onClick={() => handleShowMore(todo.id)}>Show More</button>
                            <Delete id={todo.id} onDeleteSuccess={()=>handeleletbutton(todo.id)}/>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
