import { useState } from "react";
import axios from "axios";
import { Todolist, Status } from "../App.tsx";

export default function AddTodo() {
    const [description, setDescription] = useState(""); // To store the description of the new todo
    const [todos, setTodos] = useState<Todolist[]>([]); // To store the list of todos

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleAddTodo = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior

        if (description.trim() === "") {
            console.log("Description is required.");
            return;
        }

        // Create the new todo object
        const newTodo: Todolist = {
            id: Date.now().toString(), // You can use a unique identifier, here we use the current timestamp
            description: description,
            status: "OPEN" as Status, // Set the initial status to "OPEN"
        };

        // Send the new todo to the backend (for example, POST request)
        axios
            .post(`/api/todo`) // Make sure this URL matches your backend
            .then((response) => {
                console.log("Todo added successfully:", response.data);
                // Update the list of todos (You can also fetch the updated list from the backend if needed)
                setTodos((prevTodos) => [...prevTodos, response.data]);
                setDescription(""); // Clear the input field after adding
            })
            .catch((error) => {
                console.error("Error adding todo:", error);
            });
    };

    return (
        <div>
            <h2>Add a New Todo</h2>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={description}
                    onChange={handleInputChange}
                    placeholder="Enter a description"
                    required
                />
                <button type="submit">Add Todo</button>
            </form>

            {/* Optionally, you can display the list of todos here */}
            <h3>Todo List</h3>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.description} - {todo.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}