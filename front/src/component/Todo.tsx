import {Todolist} from "../App.tsx";
import {useNavigate} from "react-router-dom";


type TodoProps = {
    lists: Todolist[];
};

export default function Todo({ lists }: TodoProps) {
    const navigate = useNavigate();

    // Function to handle navigation to the details page
    const handleShowMore = (id: string) => {
        navigate(`/todo/${id}`);
        console.log(`Navigating to details of todo with id: ${id}`);
    };

    return (
        <div>
            <h2>ToDo List</h2>
            <ul>
                {/* Filter and display only OPEN todos */}
                {lists
                    .filter((todo) => todo.status === "OPEN")
                    .map((todo) => (
                        <li key={todo.id}>
                            <strong>{todo.description}</strong>
                            <button onClick={() => handleShowMore(todo.id)}>Show More</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
