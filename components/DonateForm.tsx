import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Child } from "../types/child";

interface DonateProps {
    childId: string;
}

const DonateForm: React.FC<DonateProps> = ({ childId }) => {
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [child, setChild] = useState<Child | null>(null);

    useEffect(() => {
        const fetchChild = async () => {
            try {
                const response = await fetch(`http://localhost:3000/children/${childId}`);
                if (!response.ok) {
                    setError("Failed to fetch child");
                    return;
                }
                const childData: Child = await response.json();
                setChild(childData);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchChild();
    }, [childId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!child) {
            setError("Child data is not loaded.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/children/${childId}/donate`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ amount }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to add donation");
                setMessage("");
                return;
            }

            setChild((prevChild) => prevChild ? { ...prevChild, amountDonated: prevChild.amountDonated + amount } : null);

            setMessage(`Donation of "${amount}" added successfully!`);
            setError("");
            setAmount(0);
        } catch (err: any) {
            setError(err.message);
            setMessage("");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom> {child ? `Donating to ${child.name}` : "Donate"} </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Donation Amount"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    sx={{ mb: 2 }}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Donate
                </Button>
            </form>

            {message && <Typography sx={{ mt: 2, color: "green" }}>{message}</Typography>}
            {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}

            {child && child.amountDonated >= child.donationRequired && (
                <Typography sx={{ mt: 2, color: "green" }}>🎉 Congrats! Donation goal reached! 🎉</Typography>
            )}
        </Box>
    );
};

export default DonateForm;
