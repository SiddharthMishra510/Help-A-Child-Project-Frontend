import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok)
            {
                setError(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            await router.push("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleLogin}>
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} required />
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} required />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </Box>
    );
}
