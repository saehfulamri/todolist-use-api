import { useReducer, useEffect } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Table from "react-bootstrap/Table";

function tasksReducer(tasks, action) {
    switch (action.type) {
        case "added": {
            return [
                ...tasks,
                { id: action.id, text: action.text, done: false },
            ];
        }
        case "deleted": {
            return tasks.filter((t) => t.id !== action.id);
        }
        case "changed": {
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case "FETCH_SUCCESS":
            return action.payload;
        case "FETCH_ERROR":
            return tasks;
        default:
            return tasks;
    }
}

let nextId = 201;

const initialTasks = [];

console.log(initialTasks);

const Application = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://api.npoint.io/3c26ff950ba8288fc00d"
                );
                const data = await res.json();
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (error) {
                dispatch({ type: "FETCH_ERROR" });
            }
        };

        fetchData();
    }, []);

    function handleAddTask(text) {
        dispatch({
            type: "added",
            id: nextId++,
            text: text,
        });
    }

    function handleChangeTask(task) {
        dispatch({
            type: "changed",
            task: task,
        });
    }

    function handleDeleteTask(taskId) {
        dispatch({ type: "deleted", id: taskId });
    }

    return (
        <div className="container py-5">
            <h1>Jadwal Kegiatan Harian</h1>
            <AddTask onAddTask={handleAddTask} />
            <div className="d-flex flex-col justify-content-center py-10">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Check</th>
                            <th>Kegiatan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TaskList
                            tasks={tasks}
                            onChangeTask={handleChangeTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Application;
