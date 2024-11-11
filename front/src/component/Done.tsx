import {Todolist} from "../App.tsx";
import {useState} from "react";
import Details from "./Details.tsx";
import Delete from "./delete.tsx";

type Done={
    dones:Todolist[]
    setDones: React.Dispatch<React.SetStateAction<Todolist[]>>;
}

export default function Done ({dones,setDones}:Done){
    const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

    // Handler to show details
    const handleShowDetails = (id: string) => {
        setSelectedTodoId(prevState => (prevState === id ? null:id));
    };
    const handeldelete=()=>{
        if (setDones) {
            setDones(dones.filter((todo)=>todo.id !== selectedTodoId));
            setSelectedTodoId(null);
        } else {
            console.error("setLists is undefined");
        }
    }
    return(
        <>
            <h2> Done</h2>
            <ul>
                {dones.filter(p=>p.status==="DONE").map(prog=>(
                        <li key={prog.id}>
                            <strong>{prog.description}</strong>
                            <button onClick={() => handleShowDetails(prog.id)}>Details</button>
                            <Delete id={prog.id} onDeleteSuccess={() => handeldelete()} />
                        </li>
                    )
                )}
            </ul>
            {selectedTodoId && (
                <div>
                    <Details id={selectedTodoId} />

                </div>
            )}

        </>
    )
}