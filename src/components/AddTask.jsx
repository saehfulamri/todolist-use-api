import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AddTask = ({ onAddTask }) => {
    const [text, setText] = useState("");

    return (
        <div className="d-flex gap-4 py-4 justify-content-center">
            <InputGroup>
                <Form.Control
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tambahkan kegiatan Anda"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <Button
                size="sm"
                onClick={() => {
                    setText("");
                    onAddTask(text);
                }}
                variant="primary">
                Tambah Kegiatan
            </Button>
        </div>
    );
};

export default AddTask;
