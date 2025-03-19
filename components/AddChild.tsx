import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddChild = () => {
    // State for form inputs
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    // Function to handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevents page reload

        // Construct child object
        const newChild = { id: Number(id), name };

        try {
            const response = await fetch("http://localhost:3000/children", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newChild),
            });

            if (!response.ok) throw new Error("Failed to add child");

            setMessage(`Child "${name}" added successfully!`);
            setId(""); // Reset input field
            setName("");
        } catch (error) {
            setMessage("Error adding child. Please try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Add a New Child</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Child ID"
                    type="number"
                    fullWidth
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    label="Child Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Child
                </Button>
            </form>

            {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
        </Box>
    );
};

export default AddChild;
