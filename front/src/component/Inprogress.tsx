import {Todolist} from "../App.tsx";
import {useNavigate} from "react-router-dom";

type Prog={
    proglist:Todolist[]
}

export default function Inprogress({proglist}:Prog){
    const navigate = useNavigate();

    // Function to handle navigation to the details page
    const handleShowMore = (id: string) => {
        navigate(`/todo/${id}`);
        console.log(`Navigating to details of todo with id: ${id}`);
    };

    return<>
        <h2> In progress</h2>
        <ul>
            {proglist.filter(p=>p.status==="IN_PROGRESS").map(prog=>(
                <li key={prog.id}>
                    <strong>{prog.description} </strong>
                    <button onClick={() => handleShowMore(prog.id)}>Show More</button>
                </li>
            ))
            }

        </ul>
    </>
}