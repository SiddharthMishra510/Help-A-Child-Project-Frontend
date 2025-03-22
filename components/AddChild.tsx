import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddChild = () => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [careerGoal, setCareerGoal] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newChild = {name, photo, careerGoal, amountDonated: 0};

        try {
            const response = await fetch("http://localhost:3000/children", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newChild),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to add child");
                setMessage("");
                return;
            }

            setMessage(`Child "${name}" added successfully!`);
            setError("");
            setName("");
        } catch (err: any) {
            setError(err.message);
            setMessage("");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Add a New Child</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Child Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    label="Child Photo (Url)"
                    fullWidth
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    label="Career Goal"
                    fullWidth
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                />

                <Button type="submit" variant="contained" color="primary">
                    Add Child
                </Button>
            </form>

            {message && <Typography sx={{ mt: 2, color: "green" }}>{message}</Typography>}
            {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}
        </Box>
    );
};

export default AddChild;
