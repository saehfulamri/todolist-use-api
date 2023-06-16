import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const TaskList = ({ tasks, onChangeTask, onDeleteTask }) => {
    return (
        <>
            {tasks.map((task) => (
                <>
                    <tr key={task.id}>
                        <Task
                            task={task}
                            onChange={onChangeTask}
                            onDelete={onDeleteTask}
                        />
                    </tr>
                </>
            ))}
        </>
    );
};

const Task = ({ task, onChange, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    let taskContent;

    if (isEditing) {
        taskContent = (
            <div className="d-flex justify-content-between align-items-center">
                <td>
                    <InputGroup style={{ width: "100%" }}>
                        <Form.Control
                            value={task.text}
                            onChange={(e) => {
                                onChange({ ...task, text: e.target.value });
                            }}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </td>
                <td>
                    <Button size="sm" onClick={() => setIsEditing(false)}>
                        Save
                    </Button>
                </td>
            </div>
        );
    } else {
        taskContent = (
            <div className="d-flex justify-content-between align-items-center">
                <td>{task.text}</td>
                <td>
                    <Button
                        size="sm"
                        variant="warning"
                        onClick={() => {
                            setIsEditing(true);
                        }}>
                        Edit
                    </Button>
                </td>
            </div>
        );
    }

    return (
        <>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <Form.Check
                        checked={task.done}
                        onChange={(e) => {
                            onChange({ ...task, done: e.target.checked });
                        }}
                        aria-label="option 1"
                    />
                </div>
            </td>
            <td>{taskContent}</td>

            <td>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(task.id)}>
                    Hapus
                </Button>
            </td>
        </>
    );
};

export default TaskList;
