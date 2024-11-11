
import axios from "axios";
import {Status} from "../App.tsx";
import {useState} from "react";
type updatedlist={
    id:string
   updated:(newStatus: Status)=>void
    description: string;
    currentStatus:Status

}

export default function Update({id,updated,description,currentStatus}:updatedlist){
    const [selectedStatus, setSelectedStatus] = useState<Status>(currentStatus);

    const handelupdate = () => {
        axios.put(`/api/todo/${id}/update`, {
            id: id,
            status: selectedStatus,
            description: description
        })
            .then(() => {
                console.log(`updated ${id}`)
                updated(selectedStatus);
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