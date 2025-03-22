import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface DonateProps {
    childId: string;
}

const Donate: React.FC<DonateProps> = ({ childId }) => {
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/children/${childId}/donate`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to add donation");
                setMessage("");
                return;
            }

            setMessage(`Donation "${amount}" added successfully!`);
            setError("");
            setAmount(0);
        } catch (err: any) {
            setError(err.message);
            setMessage("");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Donate</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Donation Amount"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    sx={{ mb: 2 }}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Donate
                </Button>
            </form>

            {message && <Typography sx={{ mt: 2, color: "green" }}>{message}</Typography>}
            {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}
        </Box>
    );
};

export default Donate;
