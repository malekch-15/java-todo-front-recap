import axios from "axios";


type DeleteButtonProps = {
    id: string;
    onDeleteSuccess: () => void; // Function to update the UI after successful deletion
}
export default function Delete({id,onDeleteSuccess}:DeleteButtonProps){
const handelbuttondelete=()=> {
    axios.delete(`/api/todo/${id}`)
        .then(() => {
            console.log(`Todo with id ${id} deleted successfully.`);
            onDeleteSuccess(); // Update the parent component after deletion
        })
        .catch((error:string) => {
            console.error("Error deleting todo:", error);
        });
}
return <button onClick={handelbuttondelete}>Delete</button>

}