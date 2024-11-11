import {Todolist} from "../App.tsx";
import {useNavigate} from "react-router-dom";
import Delete from "./delete.tsx";
type Prog={
    proglist:Todolist[]
    setlist: React.Dispatch<React.SetStateAction<Todolist[]>>;
}

export default function Inprogress({proglist,setlist}:Prog){
    const navigate = useNavigate();

    // Function to handle navigation to the details page
    const handleShowMore = (id: string) => {
        navigate(`/todo/${id}`);
        console.log(`Navigating to details of todo with id: ${id}`);
    };
    const handeldelet=(id:string)=>{
        if(setlist){
            setlist(proglist.filter((set)=>set.id!==id))
        }else{
            console.log("set not updated")
        }

    }
    return<>
        <h2> In progress</h2>
        <ul>
            {proglist.filter(p=>p.status==="IN_PROGRESS").map(prog=>(
                <li key={prog.id}>
                    <strong>{prog.description} </strong>
                    <button onClick={() => handleShowMore(prog.id)}>Show More</button>
                    <Delete id={prog.id} onDeleteSuccess={()=>handeldelet(prog.id)}/>
                 

                </li>
            ))
            }

        </ul>
    </>
}